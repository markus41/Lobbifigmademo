#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import crypto from 'node:crypto'
import { spawn } from 'node:child_process'

const ROOT = process.cwd()
const ORG_THEME_CSS = path.join(ROOT, 'src', 'styles', 'org-themes.css')
const OUT_ROOT = path.join(ROOT, 'reports', 'theme-visual')
const OUT_LATEST = path.join(OUT_ROOT, 'latest')
const OUT_BASELINE = path.join(OUT_ROOT, 'baseline')
const REPORT_JSON = path.join(OUT_ROOT, 'report.json')
const REPORT_MD = path.join(ROOT, 'reports', 'theme-visual-report.md')
const DEFAULT_BASE_URL = 'http://127.0.0.1:4173/Lobbifigmademo'

const PAGES = ['dashboard', 'login', 'member']
const args = new Set(process.argv.slice(2))
const updateBaseline = args.has('--update-baseline')

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function hashFile(filePath) {
  const content = fs.readFileSync(filePath)
  return crypto.createHash('sha256').update(content).digest('hex')
}

function extractOrgIds(cssText) {
  const orgIds = []
  const blockRegex = /\[data-org="([^"]+)"\]\s*\{/g
  for (const match of cssText.matchAll(blockRegex)) {
    orgIds.push(match[1].trim())
  }
  return [...new Set(orgIds)].sort()
}

async function waitForServer(baseUrl, timeoutMs = 60000) {
  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(`${baseUrl}/theme-qa.html`, { cache: 'no-store' })
      if (res.ok) return true
    } catch {
      // ignore
    }
    await new Promise((r) => setTimeout(r, 1200))
  }
  return false
}

function writeMarkdownReport(payload) {
  const lines = []
  lines.push('# Theme Visual QA Report')
  lines.push('')
  lines.push(`- Generated: ${payload.generatedAt}`)
  lines.push(`- Base URL: ${payload.baseUrl}`)
  lines.push(`- Playwright available: ${payload.playwrightAvailable ? 'yes' : 'no'}`)
  lines.push(`- Baseline mode: ${payload.updateBaseline ? 'update' : 'compare'}`)
  lines.push(`- Organizations: ${payload.orgCount}`)
  lines.push(`- Pages per org: ${payload.pageCount}`)
  lines.push(`- Captured screenshots: ${payload.totalShots}`)
  lines.push('')

  if (!payload.playwrightAvailable) {
    lines.push('## Status')
    lines.push('')
    lines.push('- Visual capture skipped because `playwright` package is not installed.')
    lines.push('- Install it to enable screenshots: `npm i -D playwright` and browser install as needed.')
    lines.push('')
  } else {
    lines.push('## Diff Summary')
    lines.push('')
    lines.push(`- New snapshots (no baseline): ${payload.newSnapshots}`)
    lines.push(`- Changed snapshots: ${payload.changedSnapshots}`)
    lines.push(`- Unchanged snapshots: ${payload.unchangedSnapshots}`)
    lines.push('')
  }

  if (payload.changed.length > 0) {
    lines.push('## Changed')
    lines.push('')
    for (const change of payload.changed) {
      lines.push(`- ${change}`)
    }
    lines.push('')
  }

  fs.writeFileSync(REPORT_MD, `${lines.join('\n')}\n`, 'utf8')
}

async function main() {
  ensureDir(OUT_ROOT)
  ensureDir(OUT_LATEST)
  ensureDir(OUT_BASELINE)

  const css = fs.readFileSync(ORG_THEME_CSS, 'utf8')
  const orgIds = extractOrgIds(css)
  const payload = {
    generatedAt: new Date().toISOString(),
    baseUrl: DEFAULT_BASE_URL,
    updateBaseline,
    playwrightAvailable: false,
    orgCount: orgIds.length,
    pageCount: PAGES.length,
    totalShots: 0,
    newSnapshots: 0,
    changedSnapshots: 0,
    unchangedSnapshots: 0,
    changed: [],
    skipped: false,
  }

  let playwright
  try {
    playwright = await import('playwright')
    payload.playwrightAvailable = true
  } catch {
    payload.skipped = true
    fs.writeFileSync(REPORT_JSON, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
    writeMarkdownReport(payload)
    console.log('Visual QA skipped: playwright is not installed.')
    process.exit(0)
  }

  const devProc = spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'],
    {
      cwd: ROOT,
      stdio: 'inherit',
      detached: false,
      shell: process.platform === 'win32',
    }
  )

  try {
    const ready = await waitForServer(DEFAULT_BASE_URL, 90000)
    if (!ready) {
      throw new Error('Dev server did not become ready for visual QA')
    }

    const browser = await playwright.chromium.launch({ headless: true })
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
    const page = await context.newPage()

    for (const org of orgIds) {
      const latestOrgDir = path.join(OUT_LATEST, org)
      const baselineOrgDir = path.join(OUT_BASELINE, org)
      ensureDir(latestOrgDir)
      ensureDir(baselineOrgDir)

      for (const route of PAGES) {
        const outFile = path.join(latestOrgDir, `${route}.png`)
        const targetUrl = `${DEFAULT_BASE_URL}/theme-qa.html?org=${encodeURIComponent(org)}&page=${encodeURIComponent(route)}`
        await page.goto(targetUrl, { waitUntil: 'networkidle' })
        await page.screenshot({ path: outFile, fullPage: true })
        payload.totalShots += 1

        const baselineFile = path.join(baselineOrgDir, `${route}.png`)
        if (updateBaseline) {
          fs.copyFileSync(outFile, baselineFile)
          continue
        }

        if (!fs.existsSync(baselineFile)) {
          payload.newSnapshots += 1
          payload.changed.push(`${org}/${route}: new (no baseline)`)
          continue
        }

        const newHash = hashFile(outFile)
        const oldHash = hashFile(baselineFile)
        if (newHash !== oldHash) {
          payload.changedSnapshots += 1
          payload.changed.push(`${org}/${route}: changed`)
        } else {
          payload.unchangedSnapshots += 1
        }
      }
    }

    await browser.close()
    fs.writeFileSync(REPORT_JSON, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
    writeMarkdownReport(payload)

    console.log(`Visual QA complete. Captured ${payload.totalShots} screenshots.`)
    console.log(`Report: ${path.relative(ROOT, REPORT_MD)}`)

    if (!updateBaseline && payload.changedSnapshots > 0) {
      console.error(`Visual regressions detected in ${payload.changedSnapshots} screenshot(s).`)
      process.exit(1)
    }

    process.exit(0)
  } finally {
    if (devProc && !devProc.killed) {
      devProc.kill('SIGTERM')
    }
  }
}

main().catch((error) => {
  console.error(`Theme visual QA failed: ${error.message}`)
  process.exit(1)
})

#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const ORG_THEME_CSS = path.join(ROOT, 'src', 'styles', 'org-themes.css')
const REPORT_DIR = path.join(ROOT, 'reports', 'theme-snapshots')
const LATEST_SNAPSHOT_PATH = path.join(REPORT_DIR, 'latest.json')
const BASELINE_PATH = path.join(REPORT_DIR, 'baseline.json')
const REPORT_PATH = path.join(ROOT, 'reports', 'theme-qa-report.md')
const EXPECTED_ORG_COUNT = 20

const REQUIRED_TOKENS = [
  '--theme-primary',
  '--theme-primary-light',
  '--theme-primary-dark',
  '--theme-primary-rgb',
  '--theme-accent',
  '--theme-gradient',
  '--theme-gradient-subtle',
  '--theme-shadow',
  '--theme-border-accent',
  '--theme-font-display',
]

const args = new Set(process.argv.slice(2))
const updateBaseline = args.has('--update-baseline')
const strictMode = args.has('--strict') || process.env.THEME_QA_STRICT === '1'
const closeContrastThreshold = strictMode ? 1.25 : 1.2

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function readFileOrThrow(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required file: ${filePath}`)
  }
  return fs.readFileSync(filePath, 'utf8')
}

function extractOrgBlocks(cssText) {
  const blocks = []
  const blockRegex = /\[data-org="([^"]+)"\]\s*\{([\s\S]*?)\n\}/g

  for (const match of cssText.matchAll(blockRegex)) {
    const orgId = match[1].trim()
    const body = match[2]
    const vars = {}
    const varRegex = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi

    for (const varMatch of body.matchAll(varRegex)) {
      vars[varMatch[1]] = varMatch[2].trim()
    }

    blocks.push({ orgId, vars })
  }

  return blocks.sort((a, b) => a.orgId.localeCompare(b.orgId))
}

function normalizeHex(value) {
  if (!value) return null
  const match = value.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (!match) return null
  const raw = match[1]
  if (raw.length === 3) {
    return `#${raw
      .split('')
      .map((c) => c + c)
      .join('')
      .toLowerCase()}`
  }
  return `#${raw.toLowerCase()}`
}

function hexToRgb(hex) {
  const normalized = normalizeHex(hex)
  if (!normalized) return null
  const value = normalized.slice(1)
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ]
}

function luminance(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  const linear = rgb.map((channel) => {
    const c = channel / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]
}

function contrastRatio(hexA, hexB) {
  const a = luminance(hexA)
  const b = luminance(hexB)
  if (a == null || b == null) return null
  const lighter = Math.max(a, b)
  const darker = Math.min(a, b)
  return (lighter + 0.05) / (darker + 0.05)
}

function round2(value) {
  return Math.round(value * 100) / 100
}

function buildSnapshot(orgs) {
  const orgMap = {}
  const issues = []

  for (const org of orgs) {
    const missingTokens = REQUIRED_TOKENS.filter((token) => !org.vars[token])

    const primary = org.vars['--theme-primary']
    const primaryLight = org.vars['--theme-primary-light']
    const primaryDark = org.vars['--theme-primary-dark']
    const accent = org.vars['--theme-accent']

    const primaryContrastOnWhite = contrastRatio(primary, '#ffffff')
    const primaryContrastOnBlack = contrastRatio(primary, '#000000')
    const accentContrastOnWhite = contrastRatio(accent, '#ffffff')
    const accentContrastOnBlack = contrastRatio(accent, '#000000')
    const primaryVsLightContrast = contrastRatio(primary, primaryLight)
    const primaryVsDarkContrast = contrastRatio(primary, primaryDark)

    const maxPrimaryContrast = Math.max(primaryContrastOnWhite ?? 0, primaryContrastOnBlack ?? 0)
    const maxAccentContrast = Math.max(accentContrastOnWhite ?? 0, accentContrastOnBlack ?? 0)

    const contrast = {
      primaryOnWhite: primaryContrastOnWhite ? round2(primaryContrastOnWhite) : null,
      primaryOnBlack: primaryContrastOnBlack ? round2(primaryContrastOnBlack) : null,
      accentOnWhite: accentContrastOnWhite ? round2(accentContrastOnWhite) : null,
      accentOnBlack: accentContrastOnBlack ? round2(accentContrastOnBlack) : null,
      primaryVsLight: primaryVsLightContrast ? round2(primaryVsLightContrast) : null,
      primaryVsDark: primaryVsDarkContrast ? round2(primaryVsDarkContrast) : null,
      primaryBestTextContrast: round2(maxPrimaryContrast),
      accentBestTextContrast: round2(maxAccentContrast),
    }

    if (missingTokens.length > 0) {
      issues.push({
        orgId: org.orgId,
        type: 'missing_tokens',
        severity: 'error',
        detail: `Missing ${missingTokens.length} required tokens`,
        tokens: missingTokens,
      })
    }

    if (maxPrimaryContrast < 4.5) {
      issues.push({
        orgId: org.orgId,
        type: 'contrast',
        severity: 'error',
        detail: `Primary does not reach 4.5:1 against white/black (best ${round2(maxPrimaryContrast)}:1)`,
      })
    }

    if (maxAccentContrast < 4.5) {
      issues.push({
        orgId: org.orgId,
        type: 'contrast',
        severity: 'error',
        detail: `Accent does not reach 4.5:1 against white/black (best ${round2(maxAccentContrast)}:1)`,
      })
    }

    if ((primaryVsLightContrast ?? 0) < closeContrastThreshold) {
      issues.push({
        orgId: org.orgId,
        type: 'contrast',
        severity: strictMode ? 'error' : 'warn',
        detail: `Primary and primary-light are too close (${round2(primaryVsLightContrast ?? 0)}:1, threshold ${closeContrastThreshold}:1)`,
      })
    }

    if ((primaryVsDarkContrast ?? 0) < closeContrastThreshold) {
      issues.push({
        orgId: org.orgId,
        type: 'contrast',
        severity: strictMode ? 'error' : 'warn',
        detail: `Primary and primary-dark are too close (${round2(primaryVsDarkContrast ?? 0)}:1, threshold ${closeContrastThreshold}:1)`,
      })
    }

    orgMap[org.orgId] = {
      tokenCount: Object.keys(org.vars).length,
      tokens: Object.fromEntries(Object.entries(org.vars).sort(([a], [b]) => a.localeCompare(b))),
      contrast,
    }
  }

  if (orgs.length !== EXPECTED_ORG_COUNT) {
    issues.push({
      orgId: 'global',
      type: 'org_count',
      severity: 'error',
      detail: `Expected ${EXPECTED_ORG_COUNT} org theme blocks, found ${orgs.length}`,
    })
  }

  return {
    generatedAt: new Date().toISOString(),
    expectedOrgCount: EXPECTED_ORG_COUNT,
    orgCount: orgs.length,
    requiredTokens: REQUIRED_TOKENS,
    orgs: orgMap,
    issues,
  }
}

function diffSnapshots(current, baseline) {
  const regressions = []
  const currentOrgIds = Object.keys(current.orgs).sort()
  const baselineOrgIds = Object.keys(baseline.orgs).sort()

  for (const orgId of baselineOrgIds) {
    if (!current.orgs[orgId]) {
      regressions.push({
        type: 'removed_org',
        orgId,
        detail: 'Organization removed from org-themes.css',
      })
    }
  }

  for (const orgId of currentOrgIds) {
    if (!baseline.orgs[orgId]) {
      regressions.push({
        type: 'new_org',
        orgId,
        detail: 'New organization theme block added',
      })
      continue
    }

    const currentOrg = current.orgs[orgId]
    const baselineOrg = baseline.orgs[orgId]

    const currentTokens = currentOrg.tokens
    const baselineTokens = baselineOrg.tokens
    const baselineTokenKeys = Object.keys(baselineTokens)
    const currentTokenKeys = Object.keys(currentTokens)

    for (const token of baselineTokenKeys) {
      if (!(token in currentTokens)) {
        regressions.push({
          type: 'removed_token',
          orgId,
          detail: `${token} removed`,
        })
      } else if (currentTokens[token] !== baselineTokens[token]) {
        regressions.push({
          type: 'token_change',
          orgId,
          detail: `${token} changed from "${baselineTokens[token]}" to "${currentTokens[token]}"`,
        })
      }
    }

    for (const token of currentTokenKeys) {
      if (!(token in baselineTokens)) {
        regressions.push({
          type: 'new_token',
          orgId,
          detail: `${token} added`,
        })
      }
    }

    const currentContrast = currentOrg.contrast
    const baselineContrast = baselineOrg.contrast
    const contrastKeys = [
      'primaryBestTextContrast',
      'accentBestTextContrast',
      'primaryVsLight',
      'primaryVsDark',
    ]
    for (const key of contrastKeys) {
      const curr = currentContrast[key]
      const prev = baselineContrast[key]
      if (typeof curr === 'number' && typeof prev === 'number' && curr < prev - 0.5) {
        regressions.push({
          type: 'contrast_drop',
          orgId,
          detail: `${key} dropped from ${prev} to ${curr}`,
        })
      }
    }
  }

  return regressions
}

function writeJson(filePath, payload) {
  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
}

function buildMarkdownReport(snapshot, regressions, hasBaseline) {
  const lines = []
  lines.push('# Theme QA Report')
  lines.push('')
  lines.push(`- Generated: ${snapshot.generatedAt}`)
  lines.push(`- Organizations detected: ${snapshot.orgCount}/${snapshot.expectedOrgCount}`)
  lines.push(`- Required token checks: ${snapshot.requiredTokens.length}`)
  lines.push(`- Token baseline loaded: ${hasBaseline ? 'yes' : 'no'}`)
  lines.push(`- Strict mode: ${strictMode ? 'enabled' : 'disabled'}`)
  lines.push(`- Snapshot path: \`reports/theme-snapshots/latest.json\``)
  lines.push(`- Baseline path: \`reports/theme-snapshots/baseline.json\``)
  lines.push('')

  if (snapshot.issues.length === 0) {
    lines.push('## Current Snapshot Issues')
    lines.push('')
    lines.push('- None')
    lines.push('')
  } else {
    lines.push('## Current Snapshot Issues')
    lines.push('')
    for (const issue of snapshot.issues) {
      lines.push(`- [${issue.severity}/${issue.type}] ${issue.orgId}: ${issue.detail}`)
      if (issue.tokens && issue.tokens.length > 0) {
        lines.push(`- Tokens: ${issue.tokens.join(', ')}`)
      }
    }
    lines.push('')
  }

  if (!hasBaseline) {
    lines.push('## Baseline Comparison')
    lines.push('')
    lines.push('- Baseline not found. Run `npm run theme:qa:update-baseline` to set the initial baseline.')
    lines.push('')
  } else if (regressions.length === 0) {
    lines.push('## Baseline Comparison')
    lines.push('')
    lines.push('- No regressions detected')
    lines.push('')
  } else {
    lines.push('## Baseline Comparison')
    lines.push('')
    for (const regression of regressions) {
      lines.push(`- [${regression.type}] ${regression.orgId}: ${regression.detail}`)
    }
    lines.push('')
  }

  lines.push('## Org Contrast Summary')
  lines.push('')
  for (const [orgId, org] of Object.entries(snapshot.orgs).sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(
      `- ${orgId}: primaryBest=${org.contrast.primaryBestTextContrast}, accentBest=${org.contrast.accentBestTextContrast}, primaryVsLight=${org.contrast.primaryVsLight}, primaryVsDark=${org.contrast.primaryVsDark}`
    )
  }
  lines.push('')

  return `${lines.join('\n')}\n`
}

function main() {
  ensureDir(REPORT_DIR)
  const css = readFileOrThrow(ORG_THEME_CSS)
  const orgBlocks = extractOrgBlocks(css)
  const snapshot = buildSnapshot(orgBlocks)
  writeJson(LATEST_SNAPSHOT_PATH, snapshot)

  let baseline = null
  if (fs.existsSync(BASELINE_PATH)) {
    baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'))
  }

  if (updateBaseline) {
    writeJson(BASELINE_PATH, snapshot)
    const report = buildMarkdownReport(snapshot, [], true)
    fs.writeFileSync(REPORT_PATH, report, 'utf8')
    console.log(`Updated baseline: ${path.relative(ROOT, BASELINE_PATH)}`)
    console.log(`Wrote report: ${path.relative(ROOT, REPORT_PATH)}`)
    process.exit(0)
  }

  const regressions = baseline ? diffSnapshots(snapshot, baseline) : []
  const report = buildMarkdownReport(snapshot, regressions, Boolean(baseline))
  fs.writeFileSync(REPORT_PATH, report, 'utf8')

  console.log(`Wrote snapshot: ${path.relative(ROOT, LATEST_SNAPSHOT_PATH)}`)
  console.log(`Wrote report: ${path.relative(ROOT, REPORT_PATH)}`)

  if (!baseline) {
    console.log('No baseline found. Run "npm run theme:qa:update-baseline" to establish one.')
    process.exit(0)
  }

  const blockingIssues = snapshot.issues.filter((issue) => issue.severity === 'error')
  const totalProblems = regressions.length + blockingIssues.length
  if (totalProblems > 0) {
    console.error(
      `Theme QA failed with ${totalProblems} blocking issue(s).`
    )
    if (snapshot.issues.length > blockingIssues.length) {
      console.error(
        `Non-blocking warnings: ${snapshot.issues.length - blockingIssues.length}. See report for details.`
      )
    }
    process.exit(1)
  }

  console.log('Theme QA passed with no regressions.')
  process.exit(0)
}

main()

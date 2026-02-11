#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const args = new Set(process.argv.slice(2))

const strictMode = args.has('--strict')
const jsonMode = args.has('--json')

const ENV_FILES = ['.env', '.env.local']
const EXAMPLE_FILE = '.env.example'

function parseEnvFile(filePath) {
  const out = {}
  if (!fs.existsSync(filePath)) {
    return out
  }

  const text = fs.readFileSync(filePath, 'utf8')
  const lines = text.split(/\r?\n/)

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const withoutExport = trimmed.startsWith('export ')
      ? trimmed.slice('export '.length).trim()
      : trimmed

    const eqIndex = withoutExport.indexOf('=')
    if (eqIndex <= 0) {
      continue
    }

    const key = withoutExport.slice(0, eqIndex).trim()
    const raw = withoutExport.slice(eqIndex + 1).trim()
    if (!key) {
      continue
    }

    const value = raw.replace(/^['"]|['"]$/g, '')
    out[key] = value
  }

  return out
}

function parseExampleRequirements(filePath) {
  if (!fs.existsSync(filePath)) {
    return {
      exists: false,
      requiredKeys: [],
    }
  }

  const text = fs.readFileSync(filePath, 'utf8')
  const lines = text.split(/\r?\n/)
  const requiredKeys = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const eqIndex = trimmed.indexOf('=')
    if (eqIndex <= 0) {
      continue
    }

    const key = trimmed.slice(0, eqIndex).replace(/^export\s+/, '').trim()
    const value = trimmed.slice(eqIndex + 1).trim()

    if (!key) {
      continue
    }

    const lower = line.toLowerCase()
    const optional = lower.includes('optional') || lower.includes('example')
    if (!optional && value === '') {
      requiredKeys.push(key)
    }
  }

  return {
    exists: true,
    requiredKeys,
  }
}

function log(message) {
  if (!jsonMode) {
    console.log(message)
  }
}

function main() {
  const examplePath = path.join(ROOT, EXAMPLE_FILE)
  const { exists: exampleExists, requiredKeys } = parseExampleRequirements(examplePath)

  const loadedEnv = {}
  const seenFiles = []

  for (const relPath of ENV_FILES) {
    const absPath = path.join(ROOT, relPath)
    if (fs.existsSync(absPath)) {
      Object.assign(loadedEnv, parseEnvFile(absPath))
      seenFiles.push(relPath)
    }
  }

  const effectiveEnv = { ...loadedEnv, ...process.env }
  const missing = requiredKeys.filter((key) => {
    const value = effectiveEnv[key]
    return value == null || String(value).trim() === ''
  })

  const result = {
    ok: strictMode ? missing.length === 0 : true,
    strictMode,
    exampleExists,
    loadedFiles: seenFiles,
    requiredCount: requiredKeys.length,
    missing,
  }

  if (jsonMode) {
    console.log(JSON.stringify(result, null, 2))
  } else {
    if (!exampleExists) {
      log(`env-validate: no ${EXAMPLE_FILE} found; skipping required-key checks`)
      log('env-validate: OK')
      process.exit(0)
    }

    if (requiredKeys.length === 0) {
      log(`env-validate: ${EXAMPLE_FILE} has no strict required keys (empty-value keys)`)
      log('env-validate: OK')
      process.exit(0)
    }

    if (missing.length === 0) {
      log(`env-validate: all ${requiredKeys.length} required env keys are present`)
      log('env-validate: OK')
      process.exit(0)
    }

    const mode = strictMode ? 'ERROR' : 'WARN'
    log(`env-validate: ${mode} missing required env keys (${missing.length}): ${missing.join(', ')}`)
    if (!strictMode) {
      log('env-validate: continuing in non-strict mode')
      process.exit(0)
    }
  }

  process.exit(result.ok ? 0 : 1)
}

main()

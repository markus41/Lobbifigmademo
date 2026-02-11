# Lobbifigmademo

Vite + React + TypeScript demo app for themed, multi-tenant Lobbi UI flows.

## No-Config Quickstart

Works without `.env` setup (Metabase widgets fall back to local demo previews).

```bash
npm install
npm run dev
```

Open the app from the Vite URL printed in terminal.

## Setup

### Prerequisites

- Node.js 20+
- npm

### Optional Metabase Env Setup

Only required if you want live Metabase embedded chart/KPI data.

```bash
cp .env.example .env
```

Fill these in `.env`:

- `VITE_METABASE_INSTANCE_URL`
- `VITE_METABASE_API_KEY`
- `VITE_METABASE_REPORT_*`
- `VITE_METABASE_DASHBOARD_*`

If these are missing, report/dashboard widgets use demo preview data.

## Doctor Checks

Run from repo root to validate local setup:

```bash
node -v
npm -v
npm run typecheck
npm run build:check
npm run theme:qa:strict
```

Notes:

- `theme:qa:strict` writes `reports/theme-qa-report.md`.
- If no baseline exists yet, initialize it once with `npm run theme:qa:update-baseline`.

## Visual QA Prerequisites

`npm run theme:qa:visual` is optional and Playwright-based.

Install prerequisites once:

```bash
npm i -D playwright
npx playwright install chromium
```

Then run:

```bash
npm run theme:qa:visual
```

What it does:

- Starts a local dev server at `127.0.0.1:4173`.
- Captures screenshots for `dashboard`, `login`, and `member` on each org.
- Compares against `reports/theme-visual/baseline` (unless updating baseline).

Useful commands:

```bash
npm run theme:qa:visual:update-baseline
npm run theme:qa:all
```

If `playwright` is not installed, visual QA exits successfully and reports that it was skipped.

## Key Commands

- `npm run dev`: start local dev server.
- `npm run build`: production bundle.
- `npm run build:check`: TypeScript compile check + production build.
- `npm run typecheck`: strict TS checks (`tsc --noEmit`).
- `npm run theme:qa`: token/contrast regression check against baseline.
- `npm run theme:qa:strict`: CI-grade strict theme QA.
- `npm run theme:qa:visual`: visual snapshot QA (Playwright).
- `npm run theme:qa:all`: strict token QA + visual QA.

## Project Structure

- `src/app/`: app pages, flows, feature components.
- `src/components/`: reusable UI blocks (`lobbi/`, `demo/`, `motion/`).
- `src/theme/`: theme registry, provider, org theme JSON files, schema/types.
- `src/styles/`: global CSS, org theme variables, Tailwind entry styles.
- `scripts/`: theme QA automation scripts.
- `reports/`: generated QA outputs and snapshots.

## QA Artifacts

- `reports/theme-qa-report.md`
- `reports/theme-snapshots/latest.json`
- `reports/theme-snapshots/baseline.json`
- `reports/theme-visual-report.md`
- `reports/theme-visual/latest/**`

## Prompt & Workflow Docs

- `guidelines/PromptLibrary.md`
- `guidelines/AgentWorkflows.md`
  

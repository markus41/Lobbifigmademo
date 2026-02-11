# Repository Guidelines

## Project Structure & Module Organization
`Lobbifigmademo` is a Vite + React + TypeScript app focused on themed, multi-tenant UI demos.
- `src/app/`: app-level pages, flows, and feature components.
- `src/components/`: reusable UI building blocks (`lobbi/`, `demo/`, `motion/`).
- `src/theme/`: theme registry, provider, org theme JSON files, and schema/types.
- `src/styles/`: global CSS, org theme variables, fonts, Tailwind entry styles.
- `scripts/`: theme QA automation (`theme-qa.mjs`, `theme-qa-visual.mjs`).
- `reports/`: generated QA outputs and snapshots used for regression checks.

## Build, Test, and Development Commands
Run from `Lobbifigmademo/`.
- `npm install`: install dependencies.
- `npm run dev`: start local dev server.
- `npm run build`: production bundle.
- `npm run build:check`: TypeScript compile check + production build.
- `npm run typecheck`: strict TS checking (`tsc --noEmit`).
- `npm run theme:qa`: token/contrast regression check against baseline.
- `npm run theme:qa:strict`: CI-grade strict theme QA (required for theme edits).
- `npm run theme:qa:visual`: optional visual snapshot QA (Playwright-based).

## Coding Style & Naming Conventions
- Use TypeScript with strict typing; avoid `any` unless strongly justified.
- Components and files in `PascalCase` for React components (for example `DashboardPage.tsx`).
- Hooks in `camelCase` with `use` prefix (for example `usePageTransition.ts`).
- Keep theme values in tokens/CSS variables; avoid hardcoded shared colors.
- Keep changes scoped: use `src/theme/orgs/*.json` and `src/styles/org-themes.css` for tenant-specific branding.

## Testing & Theme QA Guidelines
- For theme/token/provider/CSS-variable changes, run `npm run theme:qa:strict`.
- If rendering/visual behavior changes, also run `npm run theme:qa:visual`.
- Baseline updates are intentional only: `npm run theme:qa:update-baseline` and `npm run theme:qa:visual:update-baseline`.
- Include relevant report artifacts in review context:
  - `reports/theme-qa-report.md`
  - `reports/theme-visual-report.md` (when visual QA is run)

## Commit & Pull Request Guidelines
- Follow Conventional Commits seen in history: `feat: ...`, `fix: ...`, `refactor: ...`, `docs: ...`.
- Keep PRs focused and include: summary, affected screens/themes, commands run, and screenshot evidence for UI changes.
- Explicitly call out any baseline updates in the PR description.

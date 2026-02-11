# Design Tokens

Generated from the active Lobbi theme system.

## Source
- src/theme/theme.base.json
- src/styles/theme.css
- src/styles/org-themes.css
- src/theme/orgs/*.json

## Files
- variables.css: CSS custom properties for runtime theming
- tokens.json: canonical token payload for tooling
- tokens.ts: typed token export for TypeScript usage
- tailwind.config.tokens.js: Tailwind theme.extend fragment

## Notes
- Semantic naming is preserved (brand, surface, neutral, semantic).
- Org-specific variants are included under themes.orgs.
- For accessibility, validate contrast when pairing highly saturated org accents with light surfaces (for example crown-estates and neon-like palettes).

# Inline Styles Migration to Mantine Tokens

## Summary

Migration of inline `style={{}}` props to Mantine 8.3.14 component props and CSS variables across priority components.

## Priority Files (351 inline styles total)

1. **Dashboard.tsx** - 43 inline styles
2. **OrgLogin.tsx** - 42 inline styles
3. **EmailSelection.tsx** - 39 inline styles
4. **LandingPage.tsx** - 24 inline styles
5. **WelcomeScreen.tsx** - 13 inline styles

## Migration Strategy

### 1. Use Mantine Props First
- `bg` for background colors
- `c` for text colors
- `p`, `m`, `px`, `py`, etc. for spacing
- `fz`, `fw`, `lh` for typography
- `bd` for borders
- `radius` for border-radius

### 2. CSS Variables (Fallback)
When Mantine props don't support the styling:
- `var(--mantine-color-*)` for colors
- `var(--theme-primary)` for org-specific colors
- `var(--lobbi-*)` custom tokens from `luxury-styles.css`

### 3. Semantic Token Mapping
| Inline Color | CSS Variable |
|--------------|--------------|
| `colors.primary` | `var(--theme-primary)` |
| `colors.textPrimary` | `var(--foreground)` |
| `colors.textSecondary` | `var(--muted-foreground)` |
| `colors.bgPrimary` | `var(--background)` |
| `colors.bgCard` | `var(--card)` |
| `colors.borderColor` | `var(--border)` |

## Files Modified

### Dashboard.tsx
- Removed 43 inline styles
- Converted colors to CSS variables
- Used Mantine Box/Stack components with props
- Preserved theme-aware styling

### LandingPage.tsx
- Removed 24 inline styles
- Migrated to Mantine Typography props
- Used `c`, `bg`, `ta` props
- Kept motion/framer styles for animations

### EmailSelection.tsx
- Removed 39 inline styles
- Converted dropdown styles to CSS variables
- Used Mantine Button/Card props
- Preserved accessibility features

### OrgLogin.tsx
- Removed 42 inline styles
- Migrated form inputs to Mantine props
- Used CSS variables for org theming
- Maintained SSO button styling

### WelcomeScreen.tsx
- Removed 13 inline styles
- Converted typography to Mantine props
- Used semantic color tokens
- Preserved GSAP animations

## Testing Checklist

- [ ] Run `npm run typecheck` - TypeScript validation
- [ ] Run `npm run dev` - Visual regression check
- [ ] Test org theme switching (20 orgs)
- [ ] Verify dark mode compatibility
- [ ] Test dyslexic mode CSS variables
- [ ] Check accessibility (reduced motion, high contrast)
- [ ] Validate mobile responsiveness

## Benefits

1. **Better maintainability** - Centralized theming
2. **Type safety** - Mantine props have TypeScript support
3. **Performance** - CSS variables are faster than inline styles
4. **Consistency** - Enforces design system
5. **SSR compatibility** - CSS variables work server-side

## Rollback Plan

Git commit hash before migration: [TO BE ADDED]

```bash
git revert <commit-hash>
```

## Notes

- All color values now reference CSS variables for org theming
- Font families use `var(--lobbi-font-display)` and `var(--lobbi-font-body)`
- Gradients use `var(--lobbi-gradient)` tokens
- Shadows use `var(--shadow-*)` semantic tokens
- Animation durations respect org theme settings

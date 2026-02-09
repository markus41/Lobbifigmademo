import { createSystem, defaultConfig, defineConfig, defineRecipe, defineSlotRecipe } from '@chakra-ui/react'

// ============================================================================
// ORG CONDITIONS - Each org gets a CSS selector condition
// ============================================================================
const orgConditions = {
  luxeHaven: '[data-org="luxe-haven"] &',
  pacificClub: '[data-org="pacific-club"] &',
  summitGroup: '[data-org="summit-group"] &',
  verdeCollective: '[data-org="verde-collective"] &',
  crownEstates: '[data-org="crown-estates"] &',
  obsidianSociety: '[data-org="obsidian-society"] &',
  roseMeridian: '[data-org="rose-meridian"] &',
  arcticCircle: '[data-org="arctic-circle"] &',
  flameStone: '[data-org="flame-stone"] &',
  marigoldSociety: '[data-org="marigold-society"] &',
  midnightAzure: '[data-org="midnight-azure"] &',
  jadeDynasty: '[data-org="jade-dynasty"] &',
  copperOak: '[data-org="copper-oak"] &',
  lavenderFields: '[data-org="lavender-fields"] &',
  slateModern: '[data-org="slate-modern"] &',
  neonDistrict: '[data-org="neon-district"] &',
  zenGarden: '[data-org="zen-garden"] &',
  theForge: '[data-org="the-forge"] &',
  goldenEra: '[data-org="golden-era"] &',
  pixelPioneers: '[data-org="pixel-pioneers"] &',
} as const

// ============================================================================
// TOKENS - Base design tokens used across all orgs
// ============================================================================
const tokens = {
  ...defaultConfig.theme?.tokens,
  colors: {
    ...defaultConfig.theme?.tokens?.colors,
    brand: {
      50: { value: '#FDF9EF' },
      100: { value: '#FBF3D5' },
      200: { value: '#F5E6A3' },
      300: { value: '#F4D03F' },
      400: { value: '#E5C76B' },
      500: { value: '#D4AF37' },
      600: { value: '#C5A028' },
      700: { value: '#8B7330' },
      800: { value: '#6B5620' },
      900: { value: '#4A3B15' },
      950: { value: '#2A2008' },
    },
    surface: {
      canvas: { value: 'var(--theme-bg-primary, #FAF6E9)' },
      default: { value: 'var(--theme-bg-card, #FFFFFF)' },
      muted: { value: 'var(--theme-bg-muted, #F0EBD8)' },
      overlay: { value: 'var(--theme-bg-overlay, rgba(26,26,46,0.8))' },
      elevated: { value: 'var(--theme-bg-surface, #FFFDF7)' },
    },
    text: {
      primary: { value: 'var(--theme-text-primary, #1A1A2E)' },
      secondary: { value: 'var(--theme-text-secondary, #4A4A5A)' },
      muted: { value: 'var(--theme-text-muted, #7A7A8A)' },
      inverse: { value: 'var(--theme-text-inverse, #FFFFFF)' },
      accent: { value: 'var(--theme-text-accent, #D4AF37)' },
    },
    org: {
      primary: { value: 'var(--theme-primary, #D4AF37)' },
      primaryLight: { value: 'var(--theme-primary-light, #F4D03F)' },
      primaryPale: { value: 'var(--theme-primary-pale, #F5E6A3)' },
      primaryDark: { value: 'var(--theme-primary-dark, #8B7330)' },
      secondary: { value: 'var(--theme-secondary, #1A1A2E)' },
      accent: { value: 'var(--theme-accent, #C9A227)' },
    },
    border: {
      default: { value: 'var(--theme-border, #E5DCC3)' },
      light: { value: 'var(--theme-border-light, #F0EBD8)' },
      focus: { value: 'var(--theme-border-focus, #D4AF37)' },
    },
  },
  fonts: {
    heading: { value: 'var(--theme-font-display, "Playfair Display", Georgia, serif)' },
    body: { value: 'var(--theme-font-body, "DM Sans", "Inter", system-ui, sans-serif)' },
    mono: { value: 'var(--theme-font-mono, "JetBrains Mono", "Fira Code", monospace)' },
  },
  radii: {
    ...defaultConfig.theme?.tokens?.radii,
    org: { value: 'var(--theme-radius, 0.375rem)' },
    orgBtn: { value: 'var(--theme-button-radius, 0.375rem)' },
  },
  shadows: {
    ...defaultConfig.theme?.tokens?.shadows,
    orgSm: { value: 'var(--theme-shadow-sm, 0 1px 2px rgba(212,175,55,0.05))' },
    orgMd: { value: 'var(--theme-shadow-md, 0 4px 6px -1px rgba(212,175,55,0.1))' },
    orgLg: { value: 'var(--theme-shadow-lg, 0 10px 15px -3px rgba(212,175,55,0.1))' },
    orgXl: { value: 'var(--theme-shadow-xl, 0 20px 25px -5px rgba(212,175,55,0.1))' },
    glow: { value: '0 0 40px -10px var(--theme-primary, #D4AF37)' },
  },
  durations: {
    ...defaultConfig.theme?.tokens?.durations,
    org: { value: 'var(--theme-transition-duration, 250ms)' },
  },
}

// ============================================================================
// SEMANTIC TOKENS - Contextual tokens that resolve per-condition
// ============================================================================
const semanticTokens = {
  colors: {
    'bg.canvas': { value: '{colors.surface.canvas}' },
    'bg.default': { value: '{colors.surface.default}' },
    'bg.muted': { value: '{colors.surface.muted}' },
    'bg.overlay': { value: '{colors.surface.overlay}' },
    'bg.elevated': { value: '{colors.surface.elevated}' },
    'text.primary': { value: '{colors.text.primary}' },
    'text.secondary': { value: '{colors.text.secondary}' },
    'text.muted': { value: '{colors.text.muted}' },
    'text.inverse': { value: '{colors.text.inverse}' },
    'text.accent': { value: '{colors.text.accent}' },
    'brand.primary': { value: '{colors.org.primary}' },
    'brand.light': { value: '{colors.org.primaryLight}' },
    'brand.pale': { value: '{colors.org.primaryPale}' },
    'brand.dark': { value: '{colors.org.primaryDark}' },
    'brand.secondary': { value: '{colors.org.secondary}' },
    'brand.accent': { value: '{colors.org.accent}' },
    'border.default': { value: '{colors.border.default}' },
    'border.light': { value: '{colors.border.light}' },
    'border.focus': { value: '{colors.border.focus}' },
  },
}

// ============================================================================
// RECIPES - Component-level style variants (Panda CSS pattern)
// ============================================================================

export const lobbiButtonRecipe = defineRecipe({
  className: 'lobbi-button',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'body',
    fontWeight: 'medium',
    cursor: 'pointer',
    borderRadius: 'org',
    transition: 'all',
    transitionDuration: 'org',
    _focusVisible: { outline: 'none', boxShadow: 'glow' },
    _disabled: { opacity: 0.5, cursor: 'not-allowed' },
  },
  variants: {
    variant: {
      solid: {
        bg: 'brand.primary',
        color: 'text.inverse',
        _hover: { opacity: 0.9 },
      },
      gradient: {
        backgroundImage: 'var(--theme-gradient-btn)',
        color: 'text.inverse',
        _hover: { opacity: 0.9 },
      },
      outline: {
        bg: 'transparent',
        borderWidth: '2px',
        borderColor: 'brand.primary',
        color: 'brand.primary',
        _hover: { bg: 'brand.pale' },
      },
      ghost: {
        bg: 'transparent',
        color: 'brand.primary',
        _hover: { bg: 'bg.muted' },
      },
      glass: {
        bg: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(12px)',
        borderWidth: '1px',
        borderColor: 'rgba(255,255,255,0.2)',
        color: 'text.primary',
        _hover: { bg: 'rgba(255,255,255,0.2)' },
      },
    },
    size: {
      xs: { px: '2', py: '1', fontSize: 'xs' },
      sm: { px: '3', py: '1.5', fontSize: 'sm' },
      md: { px: '4', py: '2', fontSize: 'sm' },
      lg: { px: '6', py: '3', fontSize: 'md' },
      xl: { px: '8', py: '4', fontSize: 'lg' },
    },
  },
  defaultVariants: { variant: 'solid', size: 'md' },
})

export const lobbiCardRecipe = defineRecipe({
  className: 'lobbi-card',
  base: {
    borderRadius: 'org',
    borderWidth: '1px',
    borderColor: 'border.default',
    transition: 'all',
    transitionDuration: 'org',
    overflow: 'hidden',
  },
  variants: {
    variant: {
      flat: { bg: 'bg.default', shadow: 'none' },
      raised: { bg: 'bg.default', shadow: 'orgMd' },
      outlined: { bg: 'bg.default', borderWidth: '2px' },
      glass: {
        bg: 'rgba(255,255,255,var(--theme-glass-opacity,0.9))',
        backdropFilter: 'var(--theme-glass-blur, blur(16px))',
        borderColor: 'rgba(255,255,255,0.2)',
      },
      elevated: {
        bg: 'bg.elevated',
        shadow: 'orgLg',
        borderColor: 'border.light',
      },
    },
    hover: {
      lift: { _hover: { transform: 'translateY(-4px)', shadow: 'orgLg' } },
      glow: { _hover: { shadow: 'glow' } },
      scale: { _hover: { transform: 'scale(1.02)' } },
      border: { _hover: { borderColor: 'brand.primary' } },
      none: {},
    },
  },
  defaultVariants: { variant: 'raised', hover: 'lift' },
})

export const lobbiInputRecipe = defineRecipe({
  className: 'lobbi-input',
  base: {
    width: '100%',
    fontFamily: 'body',
    borderWidth: '1px',
    borderColor: 'border.default',
    borderRadius: 'org',
    bg: 'bg.default',
    color: 'text.primary',
    transition: 'all',
    transitionDuration: 'org',
    _placeholder: { color: 'text.muted' },
    _focusVisible: { borderColor: 'border.focus', boxShadow: '0 0 0 3px var(--theme-primary-pale, rgba(212,175,55,0.2))' },
  },
  variants: {
    size: {
      sm: { px: '3', py: '1.5', fontSize: 'sm' },
      md: { px: '4', py: '2.5', fontSize: 'sm' },
      lg: { px: '5', py: '3.5', fontSize: 'md' },
    },
  },
  defaultVariants: { size: 'md' },
})

export const lobbiBadgeRecipe = defineRecipe({
  className: 'lobbi-badge',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'body',
    fontWeight: 'semibold',
    textTransform: 'uppercase',
    letterSpacing: 'wider',
  },
  variants: {
    variant: {
      solid: { bg: 'brand.primary', color: 'text.inverse' },
      subtle: { bg: 'brand.pale', color: 'brand.dark' },
      outline: { borderWidth: '1px', borderColor: 'brand.primary', color: 'brand.primary' },
    },
    size: {
      sm: { px: '1.5', py: '0.5', fontSize: '2xs', borderRadius: 'sm' },
      md: { px: '2', py: '0.5', fontSize: 'xs', borderRadius: 'md' },
    },
  },
  defaultVariants: { variant: 'subtle', size: 'sm' },
})

// Slot recipe for nav items (multi-part component)
export const lobbiNavItemRecipe = defineSlotRecipe({
  className: 'lobbi-nav-item',
  slots: ['root', 'icon', 'label', 'indicator'],
  base: {
    root: {
      display: 'flex',
      alignItems: 'center',
      gap: '3',
      px: '3',
      py: '2',
      borderRadius: 'org',
      cursor: 'pointer',
      transition: 'all',
      transitionDuration: 'org',
      color: 'text.secondary',
      _hover: { bg: 'bg.muted', color: 'text.primary' },
    },
    icon: { flexShrink: 0, w: '5', h: '5' },
    label: { fontFamily: 'body', fontSize: 'sm', fontWeight: 'medium' },
    indicator: {
      w: '1.5',
      h: '1.5',
      borderRadius: 'full',
      bg: 'brand.primary',
      opacity: 0,
      transition: 'opacity 0.2s',
    },
  },
  variants: {
    active: {
      true: {
        root: { bg: 'brand.pale', color: 'brand.primary', fontWeight: 'semibold' },
        indicator: { opacity: 1 },
      },
    },
  },
})

// ============================================================================
// SYSTEM CONFIG
// ============================================================================
const config = defineConfig({
  ...defaultConfig,
  preflight: true,
  strictTokens: false,
  theme: {
    ...defaultConfig.theme,
    tokens,
    semanticTokens,
    recipes: {
      lobbiButton: lobbiButtonRecipe,
      lobbiCard: lobbiCardRecipe,
      lobbiInput: lobbiInputRecipe,
      lobbiBadge: lobbiBadgeRecipe,
    },
    slotRecipes: {
      lobbiNavItem: lobbiNavItemRecipe,
    },
  },
  globalCss: {
    'html, body': {
      bg: 'bg.canvas',
      color: 'text.primary',
      fontFamily: 'body',
      margin: 0,
      padding: 0,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    '*::selection': { bg: 'brand.pale' },
    ':focus-visible': { outline: 'none', boxShadow: 'glow' },
    '::-webkit-scrollbar': { width: '8px', height: '8px' },
    '::-webkit-scrollbar-track': { bg: 'bg.muted', borderRadius: 'full' },
    '::-webkit-scrollbar-thumb': { bg: 'border.default', borderRadius: 'full', _hover: { bg: 'border.focus' } },
  },
  conditions: {
    ...defaultConfig.conditions,
    light: '[data-theme="light"] &, &.light, .light &',
    dark: '[data-theme="dark"] &, &.dark, .dark &',
    ...orgConditions,
    checked: '&:is(:checked, [data-checked], [aria-checked=true], [data-state=checked])',
    invalid: '&:is(:invalid, [data-invalid], [aria-invalid=true])',
    readOnly: '&:is(:read-only, [data-readonly], [aria-readonly=true])',
    expanded: '&:is([data-expanded], [aria-expanded=true])',
    selected: '&:is([data-selected], [aria-selected=true])',
    active: '&:is([data-active], [data-state=active])',
  },
})

export const system = createSystem(config)
export { config }

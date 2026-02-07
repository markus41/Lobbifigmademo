/**
 * Lobbi Design System - Chakra UI v3 System Configuration
 *
 * This is the main entry point for the Chakra v3 theme system.
 * Uses createSystem with defineConfig for full type-safe theming.
 */

import { createSystem, defineConfig } from '@chakra-ui/react'
import { tokens } from './tokens'
import { semanticTokens } from './tokens/semantic'
import { recipes } from './recipes'
import { slotRecipes } from './slot-recipes'

/**
 * Theme Configuration
 *
 * Defines all design tokens, recipes, and org-specific conditions.
 */
const config = defineConfig({
  // CSS reset and global styles
  preflight: true,

  // Strict token mode ensures only design tokens are used
  strictTokens: false,

  // Theme definition
  theme: {
    tokens,
    semanticTokens,
    recipes,
    slotRecipes,
  },

  // Global CSS styles
  globalCss: {
    'html, body': {
      bg: 'bg.canvas',
      color: 'text.primary',
      fontFamily: 'body',
      fontSize: 'md',
      lineHeight: 'normal',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
    },
    '*::selection': {
      bg: 'brand.primary/25',
    },
    ':focus-visible': {
      outline: 'none',
      boxShadow: 'focus',
    },
    // Scrollbar styling
    '::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '::-webkit-scrollbar-track': {
      bg: 'bg.muted',
      borderRadius: 'full',
    },
    '::-webkit-scrollbar-thumb': {
      bg: 'border.default',
      borderRadius: 'full',
      _hover: {
        bg: 'border.accent',
      },
    },
  },

  // Org-specific conditions for multi-tenant theming
  conditions: {
    // Light/Dark mode
    light: '[data-theme="light"] &, &.light, .light &',
    dark: '[data-theme="dark"] &, &.dark, .dark &',

    // Organization conditions (20 orgs)
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

    // State conditions
    checked: '&:is(:checked, [data-checked], [aria-checked=true], [data-state=checked])',
    unchecked: '&:is(:not(:checked), [data-state=unchecked])',
    indeterminate: '&:is(:indeterminate, [data-indeterminate], [aria-checked=mixed], [data-state=indeterminate])',
    invalid: '&:is(:invalid, [data-invalid], [aria-invalid=true])',
    valid: '&:is(:valid, [data-valid])',
    required: '&:is(:required, [data-required], [aria-required=true])',
    optional: '&:is(:optional, [data-optional])',
    readOnly: '&:is(:read-only, [data-readonly], [aria-readonly=true])',
    loading: '&:is([data-loading], [aria-busy=true])',
    current: '&:is([data-current], [aria-current])',
    expanded: '&:is([data-expanded], [aria-expanded=true])',
    collapsed: '&:is(:not([data-expanded]), [aria-expanded=false])',
    selected: '&:is([data-selected], [aria-selected=true])',
    open: '&:is([data-open], [open])',
    closed: '&:is(:not([data-open]), :not([open]))',
    pressed: '&:is([data-pressed], [aria-pressed=true])',
    active: '&:is([data-active], [data-state=active])',
    highlighted: '&:is([data-highlighted])',
  },
})

/**
 * The Lobbi Design System
 *
 * Export the configured system for use with ChakraProvider
 */
export const system = createSystem(config)

/**
 * Re-export config for external access if needed
 */
export { config }

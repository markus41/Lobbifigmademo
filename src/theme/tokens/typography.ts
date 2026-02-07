/**
 * Lobbi Design System - Typography Tokens
 *
 * Defines fonts, font sizes, font weights, letter spacing, and line heights.
 */

import { defineTokens } from '@chakra-ui/react'

/**
 * Font Family Tokens
 */
export const fonts = defineTokens.fonts({
  heading: { value: "'Cormorant Garamond', 'Palatino Linotype', Georgia, serif" },
  body: { value: "'DM Sans', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" },
  mono: { value: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace" },
  display: { value: "'Cormorant Garamond', 'Palatino Linotype', Georgia, serif" },
  ui: { value: "'DM Sans', -apple-system, BlinkMacSystemFont, system-ui, sans-serif" },
})

/**
 * Font Size Tokens
 */
export const fontSizes = defineTokens.fontSizes({
  // Micro sizes
  '2xs': { value: '0.625rem' },   // 10px - micro labels
  xs: { value: '0.75rem' },       // 12px - small labels
  sm: { value: '0.875rem' },      // 14px - small text
  md: { value: '1rem' },          // 16px - body text
  lg: { value: '1.125rem' },      // 18px - large body
  xl: { value: '1.25rem' },       // 20px - h4
  '2xl': { value: '1.5rem' },     // 24px - h3
  '3xl': { value: '1.875rem' },   // 30px - h2
  '4xl': { value: '2.25rem' },    // 36px - h1
  '5xl': { value: '3rem' },       // 48px - display
  '6xl': { value: '3.75rem' },    // 60px - hero
  '7xl': { value: '4.5rem' },     // 72px - mega
  '8xl': { value: '6rem' },       // 96px - giant
  '9xl': { value: '8rem' },       // 128px - massive

  // Fluid sizes for responsive typography
  hero: { value: 'clamp(3rem, 8vw, 6.5rem)' },
  h1: { value: 'clamp(2.75rem, 6vw, 4.5rem)' },
  h2: { value: 'clamp(2rem, 4vw, 3rem)' },
  h3: { value: 'clamp(1.5rem, 3vw, 2rem)' },
  h4: { value: '1.25rem' },
  body: { value: '1rem' },
  small: { value: '0.875rem' },
  label: { value: '0.6875rem' },
  micro: { value: '0.625rem' },
})

/**
 * Font Weight Tokens
 */
export const fontWeights = defineTokens.fontWeights({
  hairline: { value: '100' },
  thin: { value: '200' },
  light: { value: '300' },
  normal: { value: '400' },
  medium: { value: '500' },
  semibold: { value: '600' },
  bold: { value: '700' },
  extrabold: { value: '800' },
  black: { value: '900' },
})

/**
 * Letter Spacing Tokens
 */
export const letterSpacings = defineTokens.letterSpacings({
  tighter: { value: '-0.05em' },
  tight: { value: '-0.025em' },
  normal: { value: '0' },
  wide: { value: '0.025em' },
  wider: { value: '0.05em' },
  widest: { value: '0.1em' },
  // Lobbi-specific
  brand: { value: '0.35em' },
  caps: { value: '0.20em' },
  label: { value: '0.15em' },
  button: { value: '0.06em' },
})

/**
 * Line Height Tokens
 */
export const lineHeights = defineTokens.lineHeights({
  none: { value: '1' },
  tight: { value: '1.25' },
  snug: { value: '1.375' },
  normal: { value: '1.5' },
  relaxed: { value: '1.625' },
  loose: { value: '2' },
  // Semantic
  heading: { value: '1.2' },
  body: { value: '1.6' },
})

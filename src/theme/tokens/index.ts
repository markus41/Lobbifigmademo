/**
 * Lobbi Design System - Token Exports
 *
 * Aggregates all design tokens for the Chakra v3 system.
 */

import { defineTokens } from '@chakra-ui/react'

// Import individual token files
import { colors } from './colors'
import { fonts, fontSizes, fontWeights, letterSpacings, lineHeights } from './typography'
import { spacing, sizes } from './spacing'
import { radii, borderWidths, borders } from './radii'
import { shadows, zIndex, opacity } from './shadows'

/**
 * Animation Tokens
 */
const durations = defineTokens.durations({
  fastest: { value: '50ms' },
  faster: { value: '100ms' },
  fast: { value: '150ms' },
  normal: { value: '200ms' },
  slow: { value: '300ms' },
  slower: { value: '400ms' },
  slowest: { value: '500ms' },
  // Lobbi-specific
  focus: { value: '350ms' },
  hover: { value: '450ms' },
  heroIntro: { value: '2000ms' },
  pageTransition: { value: '800ms' },
  ambient: { value: '12000ms' },
})

const easings = defineTokens.easings({
  default: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  linear: { value: 'linear' },
  in: { value: 'cubic-bezier(0.4, 0, 1, 1)' },
  out: { value: 'cubic-bezier(0, 0, 0.2, 1)' },
  'in-out': { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  // Lobbi-specific
  luxInOut: { value: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  luxOut: { value: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  fade: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  bounce: { value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
})

const animations = defineTokens.animations({
  spin: { value: 'spin 1s linear infinite' },
  ping: { value: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' },
  pulse: { value: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' },
  bounce: { value: 'bounce 1s infinite' },
  // Lobbi-specific
  shimmer: { value: 'shimmer 2s ease-in-out infinite' },
  float: { value: 'float 6s ease-in-out infinite' },
  glow: { value: 'glow 2s ease-in-out infinite alternate' },
})

/**
 * Aspect Ratio Tokens
 */
const aspectRatios = defineTokens.aspectRatios({
  square: { value: '1 / 1' },
  landscape: { value: '4 / 3' },
  portrait: { value: '3 / 4' },
  wide: { value: '16 / 9' },
  ultrawide: { value: '21 / 9' },
  golden: { value: '1.618 / 1' },
})

/**
 * Blur Tokens
 */
const blurs = defineTokens.blurs({
  none: { value: '0' },
  sm: { value: '4px' },
  base: { value: '8px' },
  md: { value: '12px' },
  lg: { value: '16px' },
  xl: { value: '24px' },
  '2xl': { value: '40px' },
  '3xl': { value: '64px' },
  // Lobbi materials
  glass: { value: '40px' },
  glassLight: { value: '24px' },
  overlay: { value: '8px' },
})

/**
 * Combined Tokens Export
 */
export const tokens = {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  spacing,
  sizes,
  radii,
  borderWidths,
  borders,
  shadows,
  zIndex,
  opacity,
  durations,
  easings,
  animations,
  aspectRatios,
  blurs,
}

// Re-export semantic tokens
export { semanticTokens } from './semantic'

// Re-export individual token modules for direct access
export { colors } from './colors'
export { fonts, fontSizes, fontWeights, letterSpacings, lineHeights } from './typography'
export { spacing, sizes } from './spacing'
export { radii, borderWidths, borders } from './radii'
export { shadows, zIndex, opacity } from './shadows'

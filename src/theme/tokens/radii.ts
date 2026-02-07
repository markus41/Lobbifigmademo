/**
 * Lobbi Design System - Border Radius Tokens
 *
 * Defines border radius values for consistent corner rounding.
 */

import { defineTokens } from '@chakra-ui/react'

/**
 * Border Radius Tokens
 */
export const radii = defineTokens.radii({
  none: { value: '0' },
  xs: { value: '0.125rem' },      // 2px
  sm: { value: '0.25rem' },       // 4px
  md: { value: '0.5rem' },        // 8px
  lg: { value: '0.75rem' },       // 12px
  xl: { value: '1rem' },          // 16px
  '2xl': { value: '1.25rem' },    // 20px
  '3xl': { value: '1.5rem' },     // 24px
  '4xl': { value: '2rem' },       // 32px
  full: { value: '9999px' },

  // Component-specific
  button: { value: '0.625rem' },  // 10px
  input: { value: '0.75rem' },    // 12px
  card: { value: '1rem' },        // 16px
  panel: { value: '1.5rem' },     // 24px
  modal: { value: '1.5rem' },     // 24px
  avatar: { value: '9999px' },
  badge: { value: '9999px' },
  tag: { value: '0.375rem' },     // 6px
})

/**
 * Border Width Tokens
 */
export const borderWidths = defineTokens.borderWidths({
  none: { value: '0' },
  '0': { value: '0' },
  '1': { value: '1px' },
  '2': { value: '2px' },
  '4': { value: '4px' },
  '8': { value: '8px' },
  thin: { value: '1px' },
  medium: { value: '2px' },
  thick: { value: '3px' },
})

/**
 * Border Tokens (Combined styles)
 */
export const borders = defineTokens.borders({
  none: { value: 'none' },
  hairline: { value: '0.5px solid' },
  thin: { value: '1px solid' },
  thick: { value: '2px solid' },
  decorative: { value: '3px double' },
})

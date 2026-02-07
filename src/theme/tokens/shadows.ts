/**
 * Lobbi Design System - Shadow Tokens
 *
 * Defines box shadow values for depth and elevation.
 */

import { defineTokens } from '@chakra-ui/react'

/**
 * Shadow Tokens
 */
export const shadows = defineTokens.shadows({
  none: { value: 'none' },

  // Elevation shadows
  xs: { value: '0 1px 2px rgba(0, 0, 0, 0.03)' },
  sm: { value: '0 2px 4px rgba(0, 0, 0, 0.04)' },
  md: { value: '0 4px 12px rgba(0, 0, 0, 0.06)' },
  lg: { value: '0 8px 24px rgba(0, 0, 0, 0.08)' },
  xl: { value: '0 16px 40px rgba(0, 0, 0, 0.10)' },
  '2xl': { value: '0 24px 60px rgba(0, 0, 0, 0.12)' },

  // Component-specific shadows
  panel: { value: '0 8px 32px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.02)' },
  float: { value: '0 12px 40px rgba(0, 0, 0, 0.08)' },
  dropdown: { value: '0 10px 40px rgba(0, 0, 0, 0.12)' },
  modal: { value: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
  popover: { value: '0 10px 25px rgba(0, 0, 0, 0.1)' },
  tooltip: { value: '0 4px 12px rgba(0, 0, 0, 0.15)' },

  // Card shadows
  card: { value: '0 4px 16px rgba(0, 0, 0, 0.04)' },
  cardHover: { value: '0 8px 24px rgba(0, 0, 0, 0.08)' },

  // Gold accent shadows (brand)
  goldSoft: { value: '0 12px 40px rgba(212, 175, 55, 0.14)' },
  goldGlow: { value: '0 0 40px -10px rgba(212, 175, 55, 0.3)' },
  goldIntense: { value: '0 0 60px -5px rgba(212, 175, 55, 0.4)' },

  // Focus states
  focus: { value: '0 0 0 3px rgba(212, 175, 55, 0.25)' },
  focusError: { value: '0 0 0 3px rgba(239, 68, 68, 0.25)' },
  focusSuccess: { value: '0 0 0 3px rgba(16, 185, 129, 0.25)' },
  focusInfo: { value: '0 0 0 3px rgba(59, 130, 246, 0.25)' },

  // Inner shadows
  inner: { value: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)' },
  innerSm: { value: 'inset 0 1px 2px rgba(0, 0, 0, 0.04)' },
  innerLg: { value: 'inset 0 4px 8px rgba(0, 0, 0, 0.08)' },

  // Button shadows
  button: { value: '0 4px 14px rgba(0, 0, 0, 0.1)' },
  buttonHover: { value: '0 6px 20px rgba(0, 0, 0, 0.15)' },
  buttonActive: { value: '0 2px 8px rgba(0, 0, 0, 0.08)' },

  // Dark mode shadows
  'dark-lg': { value: '0 8px 24px rgba(0, 0, 0, 0.3)' },
  'dark-xl': { value: '0 16px 40px rgba(0, 0, 0, 0.4)' },
})

/**
 * Z-Index Tokens
 */
export const zIndex = defineTokens.zIndex({
  hide: { value: '-1' },
  auto: { value: 'auto' },
  base: { value: '0' },
  docked: { value: '10' },
  dropdown: { value: '1000' },
  sticky: { value: '1100' },
  banner: { value: '1200' },
  overlay: { value: '1300' },
  modal: { value: '1400' },
  popover: { value: '1500' },
  skipLink: { value: '1600' },
  toast: { value: '1700' },
  tooltip: { value: '1800' },
})

/**
 * Opacity Tokens
 */
export const opacity = defineTokens.opacity({
  '0': { value: '0' },
  '5': { value: '0.05' },
  '10': { value: '0.1' },
  '20': { value: '0.2' },
  '25': { value: '0.25' },
  '30': { value: '0.3' },
  '40': { value: '0.4' },
  '50': { value: '0.5' },
  '60': { value: '0.6' },
  '70': { value: '0.7' },
  '75': { value: '0.75' },
  '80': { value: '0.8' },
  '90': { value: '0.9' },
  '95': { value: '0.95' },
  '100': { value: '1' },
})

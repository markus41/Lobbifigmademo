/**
 * Lobbi Switch Recipe
 *
 * Defines toggle switch styling.
 */

import { defineRecipe } from '@chakra-ui/react'

export const switchRecipe = defineRecipe({
  className: 'lobbi-switch',

  base: {
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
    flexShrink: 0,
    cursor: 'pointer',
    borderRadius: 'full',
    bg: 'border.default',
    transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',

    _hover: {
      bg: 'border.accent',
      opacity: 0.9,
    },

    _focusVisible: {
      boxShadow: 'focus',
      outline: 'none',
    },

    _checked: {
      bg: 'brand.primary',
      boxShadow: '0 0 12px rgba(212, 175, 55, 0.25)',
    },

    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },

    // Thumb (the toggle circle)
    '&::before': {
      content: '""',
      position: 'absolute',
      bg: 'white',
      borderRadius: 'full',
      boxShadow: 'sm',
      transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
    },
  },

  variants: {
    size: {
      sm: {
        w: '7',
        h: '4',
        '&::before': {
          w: '3',
          h: '3',
          left: '0.5',
        },
        _checked: {
          '&::before': {
            transform: 'translateX(12px)',
          },
        },
      },
      md: {
        w: '9',
        h: '5',
        '&::before': {
          w: '4',
          h: '4',
          left: '0.5',
        },
        _checked: {
          '&::before': {
            transform: 'translateX(16px)',
          },
        },
      },
      lg: {
        w: '11',
        h: '6',
        '&::before': {
          w: '5',
          h: '5',
          left: '0.5',
        },
        _checked: {
          '&::before': {
            transform: 'translateX(20px)',
          },
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

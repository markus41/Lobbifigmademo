/**
 * Lobbi Skeleton Recipe
 *
 * Defines loading skeleton/placeholder styling.
 */

import { defineRecipe } from '@chakra-ui/react'

export const skeletonRecipe = defineRecipe({
  className: 'lobbi-skeleton',

  base: {
    display: 'block',
    bg: 'bg.muted',
    borderRadius: 'md',
    position: 'relative',
    overflow: 'hidden',

    // Shimmer animation
    _before: {
      content: '""',
      position: 'absolute',
      inset: '0',
      background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.04) 50%, transparent 100%)',
      animation: 'shimmer 2.5s ease-in-out infinite',
    },
  },

  variants: {
    variant: {
      pulse: {
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        _before: {
          display: 'none',
        },
      },
      shimmer: {
        // Uses base shimmer animation
      },
      none: {
        _before: {
          display: 'none',
        },
      },
    },

    shape: {
      rectangle: {
        borderRadius: 'md',
      },
      circle: {
        borderRadius: 'full',
      },
      text: {
        borderRadius: 'sm',
        height: '1em',
      },
    },

    size: {
      xs: { h: '4', w: 'full' },
      sm: { h: '6', w: 'full' },
      md: { h: '8', w: 'full' },
      lg: { h: '12', w: 'full' },
      xl: { h: '16', w: 'full' },
    },
  },

  defaultVariants: {
    variant: 'shimmer',
    shape: 'rectangle',
    size: 'md',
  },
})

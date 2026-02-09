/**
 * Lobbi Progress Recipe
 *
 * Defines progress bar styling.
 */

import { defineRecipe } from '@chakra-ui/react'

export const progressRecipe = defineRecipe({
  className: 'lobbi-progress',

  base: {
    position: 'relative',
    overflow: 'hidden',
    bg: 'bg.muted',
    borderRadius: 'full',
    width: 'full',
    boxShadow: 'innerSm',
  },

  variants: {
    size: {
      xs: { h: '1' },
      sm: { h: '2' },
      md: { h: '3' },
      lg: { h: '4' },
    },

    variant: {
      solid: {},
      gradient: {},
      striped: {},
    },

    colorScheme: {
      brand: {},
      success: {},
      warning: {},
      error: {},
      info: {},
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'solid',
    colorScheme: 'brand',
  },
})

/**
 * Progress Indicator (the filled part)
 */
export const progressIndicatorRecipe = defineRecipe({
  className: 'lobbi-progress-indicator',

  base: {
    height: 'full',
    borderRadius: 'full',
    transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
  },

  variants: {
    variant: {
      solid: {
        bg: 'brand.primary',
      },
      gradient: {
        background: 'linear-gradient(90deg, {colors.gold.700}, {colors.gold.500}, {colors.gold.300})',
      },
      striped: {
        bg: 'brand.primary',
        backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
        backgroundSize: '1rem 1rem',
      },
    },

    colorScheme: {
      brand: {
        bg: 'brand.primary',
      },
      success: {
        bg: 'status.success',
      },
      warning: {
        bg: 'status.warning',
      },
      error: {
        bg: 'status.error',
      },
      info: {
        bg: 'status.info',
      },
    },

    animated: {
      true: {
        animation: 'progress-stripe 1s linear infinite',
      },
    },

    indeterminate: {
      true: {
        position: 'absolute',
        width: '50%',
        animation: 'progress-indeterminate 1.4s ease infinite',
      },
    },
  },

  compoundVariants: [
    {
      variant: 'gradient',
      colorScheme: 'success',
      css: {
        background: 'linear-gradient(90deg, {colors.success.700}, {colors.success.500}, {colors.success.400})',
      },
    },
    {
      variant: 'gradient',
      colorScheme: 'warning',
      css: {
        background: 'linear-gradient(90deg, {colors.warning.700}, {colors.warning.500}, {colors.warning.400})',
      },
    },
    {
      variant: 'gradient',
      colorScheme: 'error',
      css: {
        background: 'linear-gradient(90deg, {colors.error.700}, {colors.error.500}, {colors.error.400})',
      },
    },
  ],

  defaultVariants: {
    variant: 'solid',
    colorScheme: 'brand',
  },
})

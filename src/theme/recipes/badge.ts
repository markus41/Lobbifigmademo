/**
 * Lobbi Badge Recipe
 *
 * Defines badge variants for status indicators and labels.
 */

import { defineRecipe } from '@chakra-ui/react'

export const badgeRecipe = defineRecipe({
  className: 'lobbi-badge',
  description: 'Badge component for labels and status indicators',

  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1',
    fontFamily: 'body',
    fontWeight: 'medium',
    fontSize: 'xs',
    letterSpacing: 'caps',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },

  variants: {
    variant: {
      subtle: {
        bg: 'brand.primary/15',
        color: 'brand.primary',
      },

      solid: {
        bg: 'brand.primary',
        color: 'text.onBrand',
      },

      outline: {
        bg: 'transparent',
        color: 'brand.primary',
        borderWidth: '1px',
        borderColor: 'brand.primary/40',
      },

      surface: {
        bg: 'bg.subtle',
        color: 'text.secondary',
        borderWidth: '1px',
        borderColor: 'border.subtle',
      },
    },

    status: {
      success: {
        bg: 'status.success.bg',
        color: 'status.success',
        borderColor: 'status.success/20',
      },

      warning: {
        bg: 'status.warning.bg',
        color: 'status.warning',
        borderColor: 'status.warning/20',
      },

      error: {
        bg: 'status.error.bg',
        color: 'status.error',
        borderColor: 'status.error/20',
      },

      info: {
        bg: 'status.info.bg',
        color: 'status.info',
        borderColor: 'status.info/20',
      },

      neutral: {
        bg: 'bg.muted',
        color: 'text.secondary',
        borderColor: 'border.default',
      },
    },

    size: {
      xs: {
        px: '1.5',
        py: '0.5',
        fontSize: '2xs',
        borderRadius: 'sm',
      },
      sm: {
        px: '2',
        py: '0.5',
        fontSize: 'xs',
        borderRadius: 'md',
      },
      md: {
        px: '2.5',
        py: '1',
        fontSize: 'xs',
        borderRadius: 'md',
      },
      lg: {
        px: '3',
        py: '1.5',
        fontSize: 'sm',
        borderRadius: 'lg',
      },
    },

    shape: {
      rounded: {
        borderRadius: 'md',
      },
      pill: {
        borderRadius: 'full',
      },
      square: {
        borderRadius: 'xs',
      },
    },
  },

  compoundVariants: [
    // Outline status badges need border
    {
      variant: 'outline',
      status: 'success',
      css: {
        bg: 'transparent',
        borderColor: 'status.success',
      },
    },
    {
      variant: 'outline',
      status: 'warning',
      css: {
        bg: 'transparent',
        borderColor: 'status.warning',
      },
    },
    {
      variant: 'outline',
      status: 'error',
      css: {
        bg: 'transparent',
        borderColor: 'status.error',
      },
    },
    {
      variant: 'outline',
      status: 'info',
      css: {
        bg: 'transparent',
        borderColor: 'status.info',
      },
    },
    // Solid status badges
    {
      variant: 'solid',
      status: 'success',
      css: {
        bg: 'status.success',
        color: 'white',
      },
    },
    {
      variant: 'solid',
      status: 'warning',
      css: {
        bg: 'status.warning',
        color: 'white',
      },
    },
    {
      variant: 'solid',
      status: 'error',
      css: {
        bg: 'status.error',
        color: 'white',
      },
    },
    {
      variant: 'solid',
      status: 'info',
      css: {
        bg: 'status.info',
        color: 'white',
      },
    },
  ],

  defaultVariants: {
    variant: 'subtle',
    size: 'sm',
    shape: 'pill',
  },
})

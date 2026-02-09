/**
 * Lobbi Badge Recipe
 *
 * Defines badge variants for status indicators and labels.
 */

import { defineRecipe } from '@chakra-ui/react'

export const badgeRecipe = defineRecipe({
  className: 'lobbi-badge',

  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1',
    fontFamily: 'ui',
    fontWeight: 'medium',
    fontSize: 'xs',
    letterSpacing: 'caps',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
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
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
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

      glass: {
        bg: 'glass.bg',
        color: 'text.primary',
        borderWidth: '1px',
        borderColor: 'glass.border',
        backdropFilter: 'blur(24px)',
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

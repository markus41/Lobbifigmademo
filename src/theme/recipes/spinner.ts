/**
 * Lobbi Spinner Recipe
 *
 * Defines loading spinner styling.
 */

import { defineRecipe } from '@chakra-ui/react'

export const spinnerRecipe = defineRecipe({
  className: 'lobbi-spinner',

  base: {
    display: 'inline-block',
    borderRadius: 'full',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'brand.primary',
    borderTopColor: 'transparent',
    animation: 'spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite',
  },

  variants: {
    size: {
      xs: {
        w: '3',
        h: '3',
        borderWidth: '1px',
      },
      sm: {
        w: '4',
        h: '4',
        borderWidth: '2px',
      },
      md: {
        w: '6',
        h: '6',
        borderWidth: '2px',
      },
      lg: {
        w: '8',
        h: '8',
        borderWidth: '3px',
      },
      xl: {
        w: '12',
        h: '12',
        borderWidth: '3px',
      },
    },

    colorScheme: {
      brand: {
        borderColor: 'brand.primary',
        borderTopColor: 'transparent',
      },
      white: {
        borderColor: 'white',
        borderTopColor: 'transparent',
      },
      muted: {
        borderColor: 'text.muted',
        borderTopColor: 'transparent',
      },
      gradient: {
        borderColor: 'brand.primary',
        borderBottomColor: 'transparent',
        borderLeftColor: 'brand.light',
      },
    },

    speed: {
      slow: {
        animation: 'spin 1s linear infinite',
      },
      normal: {
        animation: 'spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite',
      },
      fast: {
        animation: 'spin 0.45s linear infinite',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    colorScheme: 'brand',
    speed: 'normal',
  },
})

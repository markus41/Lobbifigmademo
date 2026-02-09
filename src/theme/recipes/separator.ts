/**
 * Lobbi Separator Recipe
 *
 * Defines horizontal and vertical divider styling.
 */

import { defineRecipe } from '@chakra-ui/react'

export const separatorRecipe = defineRecipe({
  className: 'lobbi-separator',

  base: {
    borderStyle: 'solid',
    borderColor: 'border.default',
    opacity: 1,
    flexShrink: 0,
  },

  variants: {
    orientation: {
      horizontal: {
        borderBottomWidth: '1px',
        width: 'full',
        height: '0',
      },
      vertical: {
        borderLeftWidth: '1px',
        height: 'full',
        width: '0',
      },
    },

    variant: {
      solid: {
        borderStyle: 'solid',
      },
      dashed: {
        borderStyle: 'dashed',
      },
      dotted: {
        borderStyle: 'dotted',
      },
    },

    thickness: {
      thin: {
        borderWidth: '1px',
      },
      medium: {
        borderWidth: '2px',
      },
      thick: {
        borderWidth: '3px',
      },
    },

    color: {
      default: {
        borderColor: 'border.default',
      },
      subtle: {
        borderColor: 'border.subtle',
      },
      accent: {
        borderColor: 'border.accent',
      },
      brand: {
        borderColor: 'brand.primary',
      },
      gradient: {
        borderColor: 'transparent',
        backgroundImage: 'linear-gradient(to right, transparent, {colors.cream.400}, transparent)',
        backgroundSize: '100% 1px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
    },
  },

  defaultVariants: {
    orientation: 'horizontal',
    variant: 'solid',
    thickness: 'thin',
    color: 'default',
  },
})

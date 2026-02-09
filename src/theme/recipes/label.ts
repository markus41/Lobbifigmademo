/**
 * Lobbi Label Recipe
 *
 * Defines form label styling.
 */

import { defineRecipe } from '@chakra-ui/react'

export const labelRecipe = defineRecipe({
  className: 'lobbi-label',

  base: {
    display: 'inline-block',
    fontFamily: 'ui',
    fontWeight: 'medium',
    color: 'text.primary',
    letterSpacing: 'label',
    userSelect: 'none',

    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },

    // Required indicator
    '&[data-required]::after': {
      content: '" *"',
      color: 'status.error',
    },
  },

  variants: {
    size: {
      sm: {
        fontSize: 'xs',
        mb: '1',
      },
      md: {
        fontSize: 'sm',
        mb: '1.5',
      },
      lg: {
        fontSize: 'md',
        mb: '2',
      },
    },

    variant: {
      default: {},
      uppercase: {
        textTransform: 'uppercase',
        letterSpacing: 'caps',
        fontWeight: 'semibold',
      },
      muted: {
        color: 'text.muted',
        fontWeight: 'normal',
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

/**
 * Lobbi Radio Recipe
 *
 * Defines radio button styling.
 */

import { defineRecipe } from '@chakra-ui/react'

export const radioRecipe = defineRecipe({
  className: 'lobbi-radio',

  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: 'pointer',
    borderRadius: 'full',
    borderWidth: '2px',
    borderColor: 'border.default',
    bg: 'bg.surface',
    transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
    position: 'relative',

    _hover: {
      borderColor: 'border.accent',
    },

    _active: {
      transform: 'scale(0.95)',
    },

    _focusVisible: {
      boxShadow: 'focus',
      outline: 'none',
    },

    _checked: {
      borderColor: 'brand.primary',
      boxShadow: '0 0 0 2px rgba(212, 175, 55, 0.2)',

      // Inner circle
      _after: {
        content: '""',
        position: 'absolute',
        borderRadius: 'full',
        bg: 'brand.primary',
      },
    },

    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },

    _invalid: {
      borderColor: 'status.error',
    },
  },

  variants: {
    size: {
      sm: {
        w: '4',
        h: '4',
        _checked: {
          _after: {
            w: '2',
            h: '2',
          },
        },
      },
      md: {
        w: '5',
        h: '5',
        _checked: {
          _after: {
            w: '2.5',
            h: '2.5',
          },
        },
      },
      lg: {
        w: '6',
        h: '6',
        _checked: {
          _after: {
            w: '3',
            h: '3',
          },
        },
      },
    },

    variant: {
      solid: {
        _checked: {
          _after: {
            bg: 'brand.primary',
          },
        },
      },
      filled: {
        _checked: {
          bg: 'brand.primary',
          _after: {
            bg: 'white',
          },
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
})

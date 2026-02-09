/**
 * Lobbi Checkbox Recipe
 *
 * Defines checkbox styling.
 */

import { defineRecipe } from '@chakra-ui/react'

export const checkboxRecipe = defineRecipe({
  className: 'lobbi-checkbox',

  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    cursor: 'pointer',
    borderRadius: 'sm',
    borderWidth: '2px',
    borderColor: 'border.default',
    bg: 'bg.surface',
    transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',

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
      bg: 'brand.primary',
      borderColor: 'brand.primary',
      color: 'white',

      _hover: {
        opacity: 0.9,
      },
    },

    _indeterminate: {
      bg: 'brand.primary',
      borderColor: 'brand.primary',
      color: 'white',
    },

    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },

    _invalid: {
      borderColor: 'status.error',
    },

    // Checkmark icon
    '& svg': {
      strokeWidth: '3px',
    },
  },

  variants: {
    size: {
      sm: {
        w: '4',
        h: '4',
        '& svg': {
          w: '3',
          h: '3',
        },
      },
      md: {
        w: '5',
        h: '5',
        '& svg': {
          w: '3.5',
          h: '3.5',
        },
      },
      lg: {
        w: '6',
        h: '6',
        '& svg': {
          w: '4',
          h: '4',
        },
      },
    },

    variant: {
      solid: {
        _checked: {
          bg: 'brand.primary',
          borderColor: 'brand.primary',
          boxShadow: '0 0 0 2px rgba(212, 175, 55, 0.2)',
        },
      },
      outline: {
        _checked: {
          bg: 'transparent',
          borderColor: 'brand.primary',
          color: 'brand.primary',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
})

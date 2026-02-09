/**
 * Lobbi Toggle Recipe
 *
 * Defines toggle button styling (pressed/unpressed state).
 */

import { defineRecipe } from '@chakra-ui/react'

export const toggleRecipe = defineRecipe({
  className: 'lobbi-toggle',

  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'body',
    fontWeight: 'medium',
    borderRadius: 'md',
    cursor: 'pointer',
    transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',

    _hover: {
      bg: 'bg.subtle',
    },

    _active: {
      transform: 'scale(0.97)',
    },

    _focusVisible: {
      outline: 'none',
      boxShadow: 'focus',
    },

    _pressed: {
      bg: 'brand.primary/15',
      color: 'brand.primary',
    },

    _selected: {
      boxShadow: '0 0 0 2px rgba(212, 175, 55, 0.15)',
    },

    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },

  variants: {
    variant: {
      default: {
        bg: 'transparent',
        color: 'text.secondary',

        _hover: {
          bg: 'bg.subtle',
          color: 'text.primary',
        },

        _pressed: {
          bg: 'brand.primary/15',
          color: 'brand.primary',
        },
      },

      outline: {
        bg: 'transparent',
        color: 'text.secondary',
        borderWidth: '1px',
        borderColor: 'border.default',

        _hover: {
          borderColor: 'border.accent',
        },

        _pressed: {
          borderColor: 'brand.primary',
          color: 'brand.primary',
        },
      },

      solid: {
        bg: 'bg.subtle',
        color: 'text.secondary',

        _hover: {
          bg: 'bg.muted',
        },

        _pressed: {
          bg: 'brand.primary',
          color: 'text.onBrand',
        },
      },
    },

    size: {
      sm: {
        h: '8',
        minW: '8',
        px: '2',
        fontSize: 'sm',
        gap: '1',
      },
      md: {
        h: '9',
        minW: '9',
        px: '3',
        fontSize: 'sm',
        gap: '1.5',
      },
      lg: {
        h: '10',
        minW: '10',
        px: '3',
        fontSize: 'md',
        gap: '2',
      },
    },
  },

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

/**
 * Toggle Group Recipe
 */
export const toggleGroupRecipe = defineRecipe({
  className: 'lobbi-toggle-group',

  base: {
    display: 'inline-flex',
    gap: '0',
  },

  variants: {
    orientation: {
      horizontal: {
        flexDirection: 'row',
        '& > *:first-child': {
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
        },
        '& > *:last-child': {
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
        },
        '& > *:not(:first-child):not(:last-child)': {
          borderRadius: '0',
        },
        '& > *:not(:first-child)': {
          marginLeft: '-1px',
        },
      },
      vertical: {
        flexDirection: 'column',
        '& > *:first-child': {
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
        },
        '& > *:last-child': {
          borderTopLeftRadius: '0',
          borderTopRightRadius: '0',
        },
        '& > *:not(:first-child):not(:last-child)': {
          borderRadius: '0',
        },
        '& > *:not(:first-child)': {
          marginTop: '-1px',
        },
      },
    },
  },

  defaultVariants: {
    orientation: 'horizontal',
  },
})

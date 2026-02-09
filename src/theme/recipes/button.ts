/**
 * Lobbi Button Recipe
 *
 * Defines button variants, sizes, and states for the Lobbi design system.
 */

import { defineRecipe } from '@chakra-ui/react'

export const buttonRecipe = defineRecipe({
  className: 'lobbi-button',

  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2',
    flexShrink: 0,
    fontWeight: 'semibold',
    fontFamily: 'body',
    letterSpacing: 'button',
    textTransform: 'uppercase',
    borderRadius: 'button',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
    userSelect: 'none',
    position: 'relative',
    overflow: 'hidden',

    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },

    _focusVisible: {
      outline: 'none',
      boxShadow: 'focus',
    },

    // Icon sizing within button
    '& svg': {
      flexShrink: 0,
      width: '1em',
      height: '1em',
    },
  },

  variants: {
    variant: {
      solid: {
        bg: 'brand.primary',
        color: 'text.onBrand',
        boxShadow: 'goldSoft',
        transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',

        _hover: {
          bg: 'brand.secondary',
          transform: 'translateY(-1px)',
          boxShadow: 'buttonHover',
        },

        _active: {
          transform: 'translateY(0)',
          boxShadow: 'buttonActive',
          transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        },
      },

      outline: {
        bg: 'transparent',
        color: 'brand.primary',
        borderWidth: '1px',
        borderColor: 'brand.primary/40',
        transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',

        _hover: {
          bg: 'brand.primary/5',
          borderColor: 'brand.primary',
          boxShadow: 'goldSoft',
        },

        _active: {
          bg: 'brand.primary/10',
          transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        },
      },

      ghost: {
        bg: 'transparent',
        color: 'brand.primary',

        _hover: {
          bg: 'brand.primary/5',
        },

        _active: {
          bg: 'brand.primary/10',
        },
      },

      secondary: {
        bg: 'bg.surface',
        color: 'text.primary',
        borderWidth: '1px',
        borderColor: 'border.default',

        _hover: {
          bg: 'bg.subtle',
          borderColor: 'border.accent',
        },

        _active: {
          bg: 'bg.muted',
        },
      },

      danger: {
        bg: 'bg.surface',
        color: 'status.error',
        borderWidth: '1px',
        borderColor: 'status.error/20',

        _hover: {
          bg: 'status.error.bg',
          borderColor: 'status.error/40',
        },

        _active: {
          bg: 'status.error.bg',
        },
      },

      success: {
        bg: 'bg.surface',
        color: 'status.success',
        borderWidth: '1px',
        borderColor: 'status.success/20',

        _hover: {
          bg: 'status.success.bg',
          borderColor: 'status.success/40',
        },

        _active: {
          bg: 'status.success.bg',
        },
      },

      link: {
        bg: 'transparent',
        color: 'brand.primary',
        textDecoration: 'none',
        padding: '0',
        height: 'auto',
        minHeight: 'auto',

        _hover: {
          textDecoration: 'underline',
        },
      },

      gradient: {
        bg: 'linear-gradient(135deg, {colors.brand.light}, {colors.brand.primary}, {colors.brand.secondary})',
        color: 'text.onBrand',
        boxShadow: 'goldSoft',
        backgroundSize: '300% 100%',
        transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',

        _hover: {
          backgroundPosition: '100% center',
          transform: 'translateY(-1px)',
          boxShadow: 'goldGlow',
        },

        _active: {
          transform: 'translateY(0)',
          transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        },
      },

      glass: {
        bg: 'glass.bg',
        color: 'text.primary',
        borderWidth: '1px',
        borderColor: 'glass.border',
        backdropFilter: 'blur(40px)',
        transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',

        _hover: {
          bg: 'glass.bg',
          borderColor: 'brand.primary/30',
          boxShadow: 'goldSoft',
          transform: 'translateY(-1px)',
        },

        _active: {
          transform: 'translateY(0)',
          boxShadow: 'none',
          transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        },
      },
    },

    size: {
      xs: {
        h: '6',
        minH: '6',
        px: '2',
        fontSize: '2xs',
        gap: '1',
      },
      sm: {
        h: '8',
        minH: '8',
        px: '3',
        fontSize: 'xs',
        gap: '1.5',
      },
      md: {
        h: '10',
        minH: '10',
        px: '4',
        fontSize: 'sm',
        gap: '2',
      },
      lg: {
        h: '12',
        minH: '12',
        px: '6',
        fontSize: 'md',
        gap: '2',
      },
      xl: {
        h: '14',
        minH: '14',
        px: '8',
        fontSize: 'lg',
        gap: '3',
      },
      icon: {
        p: '0',
        aspectRatio: 'square',
      },
      'icon-sm': {
        h: '8',
        w: '8',
        p: '0',
      },
      'icon-md': {
        h: '10',
        w: '10',
        p: '0',
      },
      'icon-lg': {
        h: '12',
        w: '12',
        p: '0',
      },
    },

    loading: {
      true: {
        cursor: 'wait',
        opacity: 0.7,
        '& > *:not(.spinner)': {
          visibility: 'hidden',
        },
      },
    },

    fullWidth: {
      true: {
        width: 'full',
      },
    },
  },

  compoundVariants: [
    // Icon button sizes
    {
      size: 'icon',
      css: {
        h: '10',
        w: '10',
      },
    },
    // Large solid button gets stronger shadow
    {
      variant: 'solid',
      size: 'lg',
      css: {
        boxShadow: 'goldGlow',
      },
    },
    {
      variant: 'solid',
      size: 'xl',
      css: {
        boxShadow: 'goldGlow',
      },
    },
    // Link variant ignores size padding
    {
      variant: 'link',
      size: 'sm',
      css: { px: '0', h: 'auto' },
    },
    {
      variant: 'link',
      size: 'md',
      css: { px: '0', h: 'auto' },
    },
    {
      variant: 'link',
      size: 'lg',
      css: { px: '0', h: 'auto' },
    },
  ],

  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

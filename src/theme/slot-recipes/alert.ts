/**
 * Lobbi Alert Slot Recipe
 *
 * Defines alert/notification styling.
 */

import { defineSlotRecipe } from '@chakra-ui/react'

export const alertSlotRecipe = defineSlotRecipe({
  className: 'lobbi-alert',

  slots: ['root', 'icon', 'content', 'title', 'description', 'spinner'],

  base: {
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '3',
      w: 'full',
      px: '4',
      py: '3',
      borderRadius: 'lg',
      fontSize: 'sm',
      opacity: 1,
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    },

    icon: {
      flexShrink: 0,
      w: '5',
      h: '5',
      mt: '0.5',
    },

    content: {
      flex: '1',
    },

    title: {
      fontWeight: 'semibold',
      color: 'inherit',
      lineHeight: 'tight',
    },

    description: {
      mt: '1',
      color: 'inherit',
      opacity: 0.9,
      lineHeight: 'relaxed',
    },

    spinner: {
      flexShrink: 0,
      mt: '0.5',
    },
  },

  variants: {
    status: {
      info: {
        root: {
          bg: 'status.info.bg',
          color: 'status.info',
          borderWidth: '1px',
          borderColor: 'status.info/20',
        },
      },
      success: {
        root: {
          bg: 'status.success.bg',
          color: 'status.success',
          borderWidth: '1px',
          borderColor: 'status.success/20',
        },
      },
      warning: {
        root: {
          bg: 'status.warning.bg',
          color: 'status.warning',
          borderWidth: '1px',
          borderColor: 'status.warning/20',
        },
      },
      error: {
        root: {
          bg: 'status.error.bg',
          color: 'status.error',
          borderWidth: '1px',
          borderColor: 'status.error/20',
        },
      },
      neutral: {
        root: {
          bg: 'bg.subtle',
          color: 'text.primary',
          borderWidth: '1px',
          borderColor: 'border.default',
        },
      },
    },

    variant: {
      subtle: {
        // Uses status background
      },
      solid: {
        root: {
          bg: 'currentColor',
          color: 'white',
          borderWidth: '0',
        },
      },
      outline: {
        root: {
          bg: 'transparent',
          borderWidth: '1px',
        },
      },
      'left-accent': {
        root: {
          borderLeftWidth: '3px',
          borderRadius: 'md',
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
        },
      },
      'top-accent': {
        root: {
          borderTopWidth: '4px',
          borderRadius: 'md',
          borderTopLeftRadius: '0',
          borderTopRightRadius: '0',
        },
      },
    },

    size: {
      sm: {
        root: {
          px: '3',
          py: '2',
          fontSize: 'xs',
        },
        icon: {
          w: '4',
          h: '4',
        },
      },
      md: {
        // Uses base styles
      },
      lg: {
        root: {
          px: '5',
          py: '4',
          fontSize: 'md',
        },
        icon: {
          w: '6',
          h: '6',
        },
      },
    },
  },

  compoundVariants: [
    // Solid status colors
    {
      status: 'info',
      variant: 'solid',
      css: {
        root: {
          bg: 'status.info',
        },
      },
    },
    {
      status: 'success',
      variant: 'solid',
      css: {
        root: {
          bg: 'status.success',
        },
      },
    },
    {
      status: 'warning',
      variant: 'solid',
      css: {
        root: {
          bg: 'status.warning',
        },
      },
    },
    {
      status: 'error',
      variant: 'solid',
      css: {
        root: {
          bg: 'status.error',
        },
      },
    },
    // Outline status borders
    {
      status: 'info',
      variant: 'outline',
      css: {
        root: {
          borderColor: 'status.info',
        },
      },
    },
    {
      status: 'success',
      variant: 'outline',
      css: {
        root: {
          borderColor: 'status.success',
        },
      },
    },
    {
      status: 'warning',
      variant: 'outline',
      css: {
        root: {
          borderColor: 'status.warning',
        },
      },
    },
    {
      status: 'error',
      variant: 'outline',
      css: {
        root: {
          borderColor: 'status.error',
        },
      },
    },
    // Left accent borders
    {
      status: 'info',
      variant: 'left-accent',
      css: {
        root: {
          borderLeftColor: 'status.info',
        },
      },
    },
    {
      status: 'success',
      variant: 'left-accent',
      css: {
        root: {
          borderLeftColor: 'status.success',
        },
      },
    },
    {
      status: 'warning',
      variant: 'left-accent',
      css: {
        root: {
          borderLeftColor: 'status.warning',
        },
      },
    },
    {
      status: 'error',
      variant: 'left-accent',
      css: {
        root: {
          borderLeftColor: 'status.error',
        },
      },
    },
  ],

  defaultVariants: {
    status: 'info',
    variant: 'subtle',
    size: 'md',
  },
})

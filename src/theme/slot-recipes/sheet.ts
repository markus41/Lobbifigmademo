/**
 * Lobbi Sheet/Drawer Slot Recipe
 *
 * Defines slide-out panel from edge of screen.
 */

import { defineSlotRecipe } from '@chakra-ui/react'

export const sheetSlotRecipe = defineSlotRecipe({
  className: 'lobbi-sheet',

  slots: [
    'trigger',
    'backdrop',
    'positioner',
    'content',
    'header',
    'title',
    'description',
    'body',
    'footer',
    'closeTrigger',
  ],

  base: {
    trigger: {},

    backdrop: {
      position: 'fixed',
      inset: '0',
      bg: 'blackAlpha.600',
      backdropFilter: 'blur(12px)',
      zIndex: 'overlay',
    },

    positioner: {
      position: 'fixed',
      zIndex: 'modal',
    },

    content: {
      display: 'flex',
      flexDirection: 'column',
      bg: 'bg.surface',
      boxShadow: 'xl',
      height: 'full',
      outline: 'none',
      transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
    },

    header: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      p: '6',
      borderBottomWidth: '1px',
      borderColor: 'border.subtle',
    },

    title: {
      fontFamily: 'heading',
      fontSize: 'lg',
      fontWeight: 'semibold',
      color: 'text.primary',
      pr: '8',
    },

    description: {
      fontSize: 'sm',
      color: 'text.muted',
    },

    body: {
      flex: '1',
      p: '6',
      overflowY: 'auto',
    },

    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '3',
      p: '6',
      borderTopWidth: '1px',
      borderColor: 'border.subtle',
    },

    closeTrigger: {
      position: 'absolute',
      top: '4',
      right: '4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      w: '8',
      h: '8',
      borderRadius: 'md',
      color: 'text.muted',
      cursor: 'pointer',
      transition: 'all 0.15s ease',

      _hover: {
        bg: 'interactive.hover',
        color: 'brand.primary',
      },

      _focusVisible: {
        outline: 'none',
        boxShadow: 'focus',
      },
    },
  },

  variants: {
    side: {
      right: {
        positioner: {
          top: '0',
          right: '0',
          bottom: '0',
        },
        content: {
          borderLeftWidth: '1px',
          borderColor: 'border.subtle',
        },
      },
      left: {
        positioner: {
          top: '0',
          left: '0',
          bottom: '0',
        },
        content: {
          borderRightWidth: '1px',
          borderColor: 'border.subtle',
        },
      },
      top: {
        positioner: {
          top: '0',
          left: '0',
          right: '0',
        },
        content: {
          height: 'auto',
          maxHeight: '100vh',
          borderBottomWidth: '1px',
          borderColor: 'border.subtle',
        },
      },
      bottom: {
        positioner: {
          bottom: '0',
          left: '0',
          right: '0',
        },
        content: {
          height: 'auto',
          maxHeight: '100vh',
          borderTopWidth: '1px',
          borderColor: 'border.subtle',
        },
      },
    },

    size: {
      sm: {
        content: {
          width: '320px',
        },
      },
      md: {
        content: {
          width: '400px',
        },
      },
      lg: {
        content: {
          width: '540px',
        },
      },
      xl: {
        content: {
          width: '720px',
        },
      },
      full: {
        content: {
          width: '100vw',
        },
      },
    },
  },

  compoundVariants: [
    // Top/bottom sheets use height instead of width
    {
      side: 'top',
      size: 'sm',
      css: {
        content: { height: '25vh', width: '100%' },
      },
    },
    {
      side: 'top',
      size: 'md',
      css: {
        content: { height: '50vh', width: '100%' },
      },
    },
    {
      side: 'top',
      size: 'lg',
      css: {
        content: { height: '75vh', width: '100%' },
      },
    },
    {
      side: 'bottom',
      size: 'sm',
      css: {
        content: { height: '25vh', width: '100%' },
      },
    },
    {
      side: 'bottom',
      size: 'md',
      css: {
        content: { height: '50vh', width: '100%' },
      },
    },
    {
      side: 'bottom',
      size: 'lg',
      css: {
        content: { height: '75vh', width: '100%' },
      },
    },
  ],

  defaultVariants: {
    side: 'right',
    size: 'md',
  },
})

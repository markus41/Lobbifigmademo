/**
 * Lobbi Dialog Slot Recipe
 *
 * Defines modal dialog component with overlay, content, header, body, footer.
 */

import { defineSlotRecipe } from '@chakra-ui/react'

export const dialogSlotRecipe = defineSlotRecipe({
  className: 'lobbi-dialog',

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
    trigger: {
      // Trigger is typically just a button, no special styles
    },

    backdrop: {
      position: 'fixed',
      inset: '0',
      bg: 'blackAlpha.600',
      backdropFilter: 'blur(16px)',
      zIndex: 'modal',
      // Animation
      opacity: 0,
      _open: {
        opacity: 1,
      },
      transition: 'opacity 0.2s ease-out',
    },

    positioner: {
      position: 'fixed',
      inset: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 'modal',
      p: '4',
      overflow: 'auto',
    },

    content: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      bg: 'bg.surface',
      borderRadius: '2xl',
      boxShadow: 'modal',
      maxH: 'calc(100vh - 2rem)',
      overflow: 'hidden',
      // Animation
      opacity: 0,
      transform: 'scale(0.95) translateY(10px)',
      _open: {
        opacity: 1,
        transform: 'scale(1) translateY(0)',
        transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
      },
      _focusVisible: {
        boxShadow: 'focus',
      },
      transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
    },

    header: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      p: '6',
      pb: '0',
    },

    title: {
      fontFamily: 'heading',
      fontSize: 'xl',
      fontWeight: 'semibold',
      lineHeight: 'tight',
      color: 'text.primary',
      pr: '8', // Space for close button
    },

    description: {
      fontSize: 'sm',
      color: 'text.muted',
      lineHeight: 'relaxed',
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
      pt: '4',
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
    size: {
      xs: {
        content: {
          maxW: 'xs',
        },
      },
      sm: {
        content: {
          maxW: 'sm',
        },
      },
      md: {
        content: {
          maxW: 'md',
        },
      },
      lg: {
        content: {
          maxW: 'lg',
        },
      },
      xl: {
        content: {
          maxW: 'xl',
        },
      },
      '2xl': {
        content: {
          maxW: '2xl',
        },
      },
      full: {
        content: {
          maxW: 'calc(100vw - 2rem)',
          maxH: 'calc(100vh - 2rem)',
          borderRadius: 'lg',
        },
      },
    },

    scrollBehavior: {
      inside: {
        body: {
          overflowY: 'auto',
        },
      },
      outside: {
        positioner: {
          overflowY: 'auto',
        },
        content: {
          my: '4',
          maxH: 'none',
        },
      },
    },

    centered: {
      true: {
        positioner: {
          alignItems: 'center',
        },
      },
      false: {
        positioner: {
          alignItems: 'flex-start',
          pt: '16',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    scrollBehavior: 'inside',
    centered: true,
  },
})

/**
 * Alert Dialog Slot Recipe
 *
 * Similar to dialog but for confirmation/alert purposes.
 */
export const alertDialogSlotRecipe = defineSlotRecipe({
  className: 'lobbi-alert-dialog',

  slots: [
    'backdrop',
    'positioner',
    'content',
    'header',
    'title',
    'description',
    'body',
    'footer',
    'cancel',
    'action',
  ],

  base: {
    backdrop: {
      position: 'fixed',
      inset: '0',
      bg: 'blackAlpha.600',
      backdropFilter: 'blur(16px)',
      zIndex: 'modal',
    },

    positioner: {
      position: 'fixed',
      inset: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 'modal',
      p: '4',
    },

    content: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      bg: 'bg.surface',
      borderRadius: 'xl',
      boxShadow: 'modal',
      maxW: 'md',
      w: 'full',
    },

    header: {
      p: '6',
      pb: '2',
    },

    title: {
      fontFamily: 'heading',
      fontSize: 'lg',
      fontWeight: 'semibold',
      color: 'text.primary',
    },

    description: {
      fontSize: 'sm',
      color: 'text.muted',
      mt: '2',
    },

    body: {
      px: '6',
      py: '2',
    },

    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '3',
      p: '6',
      pt: '4',
    },

    cancel: {
      // Styled via button recipe
    },

    action: {
      // Styled via button recipe
    },
  },

  variants: {
    variant: {
      default: {},
      danger: {
        title: {
          color: 'status.error',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
})

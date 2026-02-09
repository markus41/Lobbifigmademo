/**
 * Lobbi Tooltip Slot Recipe
 *
 * Defines tooltip styling.
 */

import { defineSlotRecipe } from '@chakra-ui/react'

export const tooltipSlotRecipe = defineSlotRecipe({
  className: 'lobbi-tooltip',

  slots: ['trigger', 'positioner', 'content', 'arrow', 'arrowTip'],

  base: {
    trigger: {
      display: 'inline-flex',
    },

    positioner: {
      zIndex: 'tooltip',
    },

    content: {
      bg: 'tooltip.bg',
      color: 'tooltip.text',
      px: '3',
      py: '1.5',
      borderRadius: 'md',
      fontSize: 'sm',
      fontWeight: 'medium',
      boxShadow: 'tooltip',
      backdropFilter: 'blur(8px)',
      maxW: '64',
      lineHeight: 'snug',
      transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
    },

    arrow: {
      '--arrow-size': '8px',
      '--arrow-background': 'var(--chakra-colors-tooltip-bg)',
    },

    arrowTip: {
      borderTopWidth: '1px',
      borderLeftWidth: '1px',
      borderColor: 'tooltip.border',
    },
  },

  variants: {
    size: {
      sm: {
        content: {
          px: '2',
          py: '1',
          fontSize: 'xs',
        },
      },
      md: {
        // Uses base styles
      },
      lg: {
        content: {
          px: '4',
          py: '2',
          fontSize: 'md',
        },
      },
    },

    variant: {
      dark: {
        // Uses base dark background
      },
      light: {
        content: {
          bg: 'bg.surface',
          color: 'text.primary',
          borderWidth: '1px',
          borderColor: 'border.default',
        },
        arrow: {
          '--arrow-background': 'var(--chakra-colors-tooltip-bg)',
        },
        arrowTip: {
          borderColor: 'tooltip.border',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'dark',
  },
})

/**
 * Popover Slot Recipe
 */
export const popoverSlotRecipe = defineSlotRecipe({
  className: 'lobbi-popover',

  slots: [
    'trigger',
    'anchor',
    'positioner',
    'content',
    'header',
    'title',
    'description',
    'body',
    'footer',
    'closeTrigger',
    'arrow',
    'arrowTip',
  ],

  base: {
    trigger: {
      display: 'inline-flex',
    },

    anchor: {},

    positioner: {
      zIndex: 'popover',
    },

    content: {
      position: 'relative',
      bg: 'bg.surface',
      borderRadius: 'lg',
      borderWidth: '1px',
      borderColor: 'border.default',
      boxShadow: 'popover',
      backdropFilter: 'blur(8px)',
      outline: 'none',
      maxW: '80',
      p: '4',
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    },

    header: {
      mb: '2',
    },

    title: {
      fontWeight: 'semibold',
      fontSize: 'md',
      color: 'text.primary',
    },

    description: {
      fontSize: 'sm',
      color: 'text.muted',
      mt: '1',
    },

    body: {},

    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: '2',
      mt: '3',
      pt: '3',
      borderTopWidth: '1px',
      borderColor: 'border.subtle',
    },

    closeTrigger: {
      position: 'absolute',
      top: '2',
      right: '2',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      w: '6',
      h: '6',
      borderRadius: 'sm',
      color: 'text.muted',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',

      _hover: {
        bg: 'bg.subtle',
        color: 'text.primary',
      },

      _focusVisible: {
        boxShadow: 'focus',
        outline: 'none',
      },
    },

    arrow: {
      '--arrow-size': '10px',
      '--arrow-background': 'var(--chakra-colors-bg-surface)',
    },

    arrowTip: {
      borderTopWidth: '1px',
      borderLeftWidth: '1px',
      borderColor: 'border.default',
    },
  },

  variants: {
    size: {
      sm: {
        content: {
          maxW: '64',
          p: '3',
        },
        title: {
          fontSize: 'sm',
        },
      },
      md: {
        // Uses base styles
      },
      lg: {
        content: {
          maxW: '96',
          p: '5',
        },
        title: {
          fontSize: 'lg',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

/**
 * Hover Card Slot Recipe
 */
export const hoverCardSlotRecipe = defineSlotRecipe({
  className: 'lobbi-hover-card',

  slots: ['trigger', 'positioner', 'content', 'arrow', 'arrowTip'],

  base: {
    trigger: {
      display: 'inline-flex',
    },

    positioner: {
      zIndex: 'popover',
    },

    content: {
      bg: 'bg.surface',
      borderRadius: 'lg',
      borderWidth: '1px',
      borderColor: 'border.default',
      boxShadow: 'popover',
      backdropFilter: 'blur(8px)',
      p: '4',
      maxW: '80',
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    },

    arrow: {
      '--arrow-size': '10px',
      '--arrow-background': 'var(--chakra-colors-bg-surface)',
    },

    arrowTip: {
      borderTopWidth: '1px',
      borderLeftWidth: '1px',
      borderColor: 'border.default',
    },
  },

  defaultVariants: {},
})

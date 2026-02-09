/**
 * Lobbi Accordion Slot Recipe
 *
 * Defines collapsible accordion sections.
 */

import { defineSlotRecipe } from '@chakra-ui/react'

export const accordionSlotRecipe = defineSlotRecipe({
  className: 'lobbi-accordion',

  slots: ['root', 'item', 'trigger', 'indicator', 'content', 'body'],

  base: {
    root: {
      width: 'full',
    },

    item: {
      borderBottomWidth: '1px',
      borderColor: 'border.default',

      _last: {
        borderBottomWidth: '0',
      },
    },

    trigger: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 'full',
      py: '4',
      fontSize: 'md',
      fontWeight: 'medium',
      color: 'text.primary',
      cursor: 'pointer',
      outline: 'none',
      transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',

      _hover: {
        color: 'brand.primary',
        bg: 'interactive.hover',
      },

      _focusVisible: {
        boxShadow: 'focus',
        borderRadius: 'md',
      },

      _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },

    indicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      w: '5',
      h: '5',
      color: 'text.muted',
      transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',

      _expanded: {
        transform: 'rotate(180deg)',
      },

      '& svg': {
        w: '4',
        h: '4',
      },
    },

    content: {
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    },

    body: {
      pb: '4',
      color: 'text.secondary',
      fontSize: 'sm',
      lineHeight: 'relaxed',
    },
  },

  variants: {
    variant: {
      plain: {
        // Uses base styles
      },

      enclosed: {
        root: {
          borderWidth: '1px',
          borderColor: 'border.default',
          borderRadius: 'lg',
          overflow: 'hidden',
        },
        item: {
          borderBottom: 'none',

          _notLast: {
            borderBottomWidth: '1px',
            borderColor: 'border.default',
          },
        },
        trigger: {
          px: '4',
        },
        body: {
          px: '4',
        },
      },

      subtle: {
        item: {
          borderBottomWidth: '0',
          mb: '2',
        },
        trigger: {
          bg: 'bg.subtle',
          px: '4',
          borderRadius: 'md',

          _hover: {
            bg: 'bg.muted',
          },

          _expanded: {
            bg: 'bg.muted',
          },
        },
        body: {
          px: '4',
          pt: '2',
        },
      },

      card: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          gap: '3',
        },
        item: {
          borderBottomWidth: '0',
          bg: 'bg.surface',
          borderWidth: '1px',
          borderColor: 'border.default',
          borderRadius: 'lg',
          overflow: 'hidden',
        },
        trigger: {
          px: '4',
        },
        body: {
          px: '4',
        },
      },
    },

    size: {
      sm: {
        trigger: {
          py: '3',
          fontSize: 'sm',
        },
        body: {
          pb: '3',
          fontSize: 'sm',
        },
        indicator: {
          w: '4',
          h: '4',
          '& svg': {
            w: '3',
            h: '3',
          },
        },
      },
      md: {
        // Uses base styles
      },
      lg: {
        trigger: {
          py: '5',
          fontSize: 'lg',
        },
        body: {
          pb: '5',
          fontSize: 'md',
        },
        indicator: {
          w: '6',
          h: '6',
          '& svg': {
            w: '5',
            h: '5',
          },
        },
      },
    },
  },

  defaultVariants: {
    variant: 'plain',
    size: 'md',
  },
})

/**
 * Collapsible Slot Recipe (Single panel)
 */
export const collapsibleSlotRecipe = defineSlotRecipe({
  className: 'lobbi-collapsible',

  slots: ['root', 'trigger', 'content'],

  base: {
    root: {
      width: 'full',
    },

    trigger: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      cursor: 'pointer',
      outline: 'none',
      fontSize: 'sm',
      fontWeight: 'medium',
      color: 'text.primary',
      transition: 'color 0.15s ease',

      _hover: {
        color: 'brand.primary',
      },

      _focusVisible: {
        boxShadow: 'focus',
      },

      '& svg': {
        w: '4',
        h: '4',
        transition: 'transform 0.2s ease',
      },

      _open: {
        '& svg': {
          transform: 'rotate(90deg)',
        },
      },
    },

    content: {
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    },
  },

  defaultVariants: {},
})

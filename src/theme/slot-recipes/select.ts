/**
 * Lobbi Select Slot Recipe
 *
 * Defines select/dropdown styling.
 */

import { defineSlotRecipe } from '@chakra-ui/react'

export const selectSlotRecipe = defineSlotRecipe({
  className: 'lobbi-select',

  slots: [
    'root',
    'trigger',
    'indicator',
    'positioner',
    'content',
    'item',
    'itemText',
    'itemIndicator',
    'group',
    'groupLabel',
    'clearTrigger',
    'valueText',
  ],

  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: 'full',
    },

    trigger: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 'full',
      bg: 'input.bg',
      borderWidth: '1px',
      borderColor: 'input.border',
      borderRadius: 'input',
      cursor: 'pointer',
      transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',

      _hover: {
        borderColor: 'border.accent',
      },

      _focusVisible: {
        outline: 'none',
        borderColor: 'input.focus',
        boxShadow: 'focus',
      },

      _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },

      _invalid: {
        borderColor: 'status.error',
      },

      _placeholder: {
        color: 'input.placeholder',
      },
    },

    indicator: {
      color: 'text.muted',
      transition: 'transform 0.2s ease',

      _open: {
        transform: 'rotate(180deg)',
      },

      '& svg': {
        w: '4',
        h: '4',
      },
    },

    positioner: {
      zIndex: 'dropdown',
    },

    content: {
      bg: 'bg.surface',
      borderRadius: 'lg',
      borderWidth: '1px',
      borderColor: 'border.default',
      boxShadow: 'dropdown',
      backdropFilter: 'blur(8px)',
      py: '1',
      overflow: 'hidden',
      outline: 'none',
    },

    item: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      px: '3',
      py: '2',
      cursor: 'pointer',
      outline: 'none',
      fontSize: 'sm',
      color: 'text.primary',
      transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',

      _hover: {
        bg: 'interactive.hover',
      },

      _highlighted: {
        bg: 'bg.subtle',
      },

      _selected: {
        color: 'brand.primary',
        fontWeight: 'medium',
      },

      _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },

    itemText: {
      flex: '1',
    },

    itemIndicator: {
      ml: 'auto',
      color: 'brand.primary',
    },

    group: {},

    groupLabel: {
      px: '3',
      py: '1.5',
      fontSize: 'xs',
      fontWeight: 'semibold',
      color: 'text.muted',
      textTransform: 'uppercase',
      letterSpacing: 'caps',
    },

    clearTrigger: {
      color: 'text.muted',
      cursor: 'pointer',
      _hover: {
        color: 'text.primary',
      },
    },

    valueText: {
      flex: '1',
      color: 'text.primary',

      _placeholder: {
        color: 'input.placeholder',
      },
    },
  },

  variants: {
    variant: {
      outline: {
        trigger: {
          bg: 'input.bg',
          borderWidth: '1px',
          borderColor: 'input.border',
        },
      },
      filled: {
        trigger: {
          bg: 'bg.subtle',
          borderWidth: '1px',
          borderColor: 'transparent',

          _hover: {
            bg: 'bg.muted',
          },

          _focusVisible: {
            bg: 'input.bg',
            borderColor: 'input.focus',
          },
        },
      },
      glass: {
        trigger: {
          bg: 'glass.bg',
          borderWidth: '1px',
          borderColor: 'glass.border',
          backdropFilter: 'blur(24px)',
          _hover: {
            borderColor: 'border.accent',
          },
          _focusVisible: {
            borderColor: 'input.focus',
            boxShadow: 'focus',
          },
        },
      },
    },

    size: {
      sm: {
        trigger: {
          h: '8',
          px: '3',
          fontSize: 'sm',
        },
        item: {
          px: '2',
          py: '1.5',
          fontSize: 'sm',
        },
      },
      md: {
        trigger: {
          h: '10',
          px: '4',
          fontSize: 'md',
        },
      },
      lg: {
        trigger: {
          h: '12',
          px: '4',
          fontSize: 'lg',
        },
        item: {
          px: '4',
          py: '2.5',
          fontSize: 'md',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
})

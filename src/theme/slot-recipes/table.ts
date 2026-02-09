/**
 * Lobbi Table Slot Recipe
 *
 * Defines data table styling.
 */

import { defineSlotRecipe } from '@chakra-ui/react'

export const tableSlotRecipe = defineSlotRecipe({
  className: 'lobbi-table',

  slots: ['root', 'header', 'body', 'footer', 'row', 'columnHeader', 'cell', 'caption'],

  base: {
    root: {
      width: 'full',
      borderCollapse: 'collapse',
      fontFamily: 'body',
      fontSize: 'sm',
      borderColor: 'border.subtle',
    },

    header: {},

    body: {},

    footer: {},

    row: {
      borderBottomWidth: '1px',
      borderColor: 'border.default',
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',

      _last: {
        borderBottomWidth: '0',
      },
    },

    columnHeader: {
      textAlign: 'left',
      fontWeight: 'semibold',
      color: 'text.secondary',
      textTransform: 'uppercase',
      letterSpacing: 'caps',
      fontSize: 'xs',
    },

    cell: {
      color: 'text.primary',
    },

    caption: {
      textAlign: 'left',
      color: 'text.muted',
      fontSize: 'sm',
      py: '2',
    },
  },

  variants: {
    variant: {
      simple: {
        row: {
          _hover: {
            bg: 'bg.subtle',
          },
        },
      },

      striped: {
        body: {
          '& tr:nth-of-type(even)': {
            bg: 'bg.subtle',
            opacity: 0.6,
          },
        },
        row: {
          _hover: {
            bg: 'bg.muted',
          },
        },
      },

      outline: {
        root: {
          borderWidth: '1px',
          borderColor: 'border.default',
          borderRadius: 'lg',
          overflow: 'hidden',
        },
        columnHeader: {
          bg: 'bg.subtle',
        },
        row: {
          _hover: {
            bg: 'bg.subtle',
          },
        },
      },
    },

    size: {
      sm: {
        columnHeader: {
          px: '3',
          py: '2',
          fontSize: '2xs',
        },
        cell: {
          px: '3',
          py: '2',
          fontSize: 'sm',
        },
      },
      md: {
        columnHeader: {
          px: '4',
          py: '3',
          fontSize: 'xs',
        },
        cell: {
          px: '4',
          py: '3',
          fontSize: 'sm',
        },
      },
      lg: {
        columnHeader: {
          px: '6',
          py: '4',
          fontSize: 'xs',
        },
        cell: {
          px: '6',
          py: '4',
          fontSize: 'md',
        },
      },
    },

    interactive: {
      true: {
        row: {
          cursor: 'pointer',
          _hover: {
            bg: 'brand.primary/5',
            transform: 'scale(1.002)',
          },
        },
      },
    },
  },

  defaultVariants: {
    variant: 'simple',
    size: 'md',
  },
})

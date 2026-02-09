/**
 * Lobbi Dropdown Menu Slot Recipe
 *
 * Defines dropdown menu with trigger, content, items, separators.
 */

import { defineSlotRecipe } from '@chakra-ui/react'

export const dropdownMenuSlotRecipe = defineSlotRecipe({
  className: 'lobbi-dropdown-menu',

  slots: [
    'trigger',
    'content',
    'arrow',
    'item',
    'itemText',
    'itemIndicator',
    'separator',
    'group',
    'groupLabel',
    'checkboxItem',
    'radioItem',
    'radioGroup',
    'sub',
    'subTrigger',
    'subContent',
  ],

  base: {
    trigger: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },

    content: {
      bg: 'bg.surface',
      borderRadius: 'lg',
      borderWidth: '1px',
      borderColor: 'border.default',
      boxShadow: 'dropdown',
      backdropFilter: 'blur(8px)',
      py: '1',
      minW: '48',
      zIndex: 'dropdown',
      overflow: 'hidden',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    },

    arrow: {
      fill: 'bg.surface',
      stroke: 'border.default',
      strokeWidth: '1px',
    },

    item: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      w: 'full',
      px: '3',
      py: '2',
      fontSize: 'sm',
      color: 'text.primary',
      cursor: 'pointer',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',

      _hover: {
        bg: 'interactive.hover',
      },

      _highlighted: {
        bg: 'bg.subtle',
      },

      _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },

      '& svg': {
        w: '4',
        h: '4',
        color: 'text.muted',
      },
    },

    itemText: {
      flex: '1',
    },

    itemIndicator: {
      ml: 'auto',
      color: 'brand.primary',
    },

    separator: {
      h: 'px',
      my: '1',
      mx: '2',
      bg: 'border.subtle',
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

    checkboxItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      w: 'full',
      px: '3',
      py: '2',
      fontSize: 'sm',
      color: 'text.primary',
      cursor: 'pointer',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',

      _hover: {
        bg: 'interactive.hover',
      },

      _highlighted: {
        bg: 'bg.subtle',
      },

      _checked: {
        '& [data-indicator]': {
          visibility: 'visible',
        },
      },

      '& [data-indicator]': {
        visibility: 'hidden',
        color: 'brand.primary',
      },
    },

    radioItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      w: 'full',
      px: '3',
      py: '2',
      fontSize: 'sm',
      color: 'text.primary',
      cursor: 'pointer',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',

      _hover: {
        bg: 'interactive.hover',
      },

      _highlighted: {
        bg: 'bg.subtle',
      },

      _checked: {
        '& [data-indicator]': {
          visibility: 'visible',
        },
      },

      '& [data-indicator]': {
        visibility: 'hidden',
        color: 'brand.primary',
      },
    },

    radioGroup: {},

    sub: {},

    subTrigger: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      w: 'full',
      px: '3',
      py: '2',
      fontSize: 'sm',
      color: 'text.primary',
      cursor: 'pointer',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',

      _hover: {
        bg: 'interactive.hover',
      },

      _highlighted: {
        bg: 'bg.subtle',
      },

      _open: {
        bg: 'bg.subtle',
      },

      '& > svg:last-child': {
        ml: 'auto',
        w: '3',
        h: '3',
      },
    },

    subContent: {
      bg: 'bg.surface',
      borderRadius: 'lg',
      borderWidth: '1px',
      borderColor: 'border.default',
      boxShadow: 'dropdown',
      backdropFilter: 'blur(8px)',
      py: '1',
      minW: '40',
      zIndex: 'dropdown',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    },
  },

  variants: {
    size: {
      sm: {
        content: {
          minW: '36',
        },
        item: {
          px: '2',
          py: '1.5',
          fontSize: 'xs',
        },
        groupLabel: {
          px: '2',
          fontSize: '2xs',
        },
      },
      md: {
        // Uses base styles
      },
      lg: {
        content: {
          minW: '56',
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
    size: 'md',
  },
})

/**
 * Context Menu Slot Recipe (Right-click menu)
 */
export const contextMenuSlotRecipe = defineSlotRecipe({
  className: 'lobbi-context-menu',

  slots: [
    'trigger',
    'content',
    'item',
    'separator',
    'group',
    'groupLabel',
    'checkboxItem',
    'radioItem',
    'sub',
    'subTrigger',
    'subContent',
  ],

  base: {
    trigger: {
      // Context trigger wraps content, no special styles
    },

    content: {
      bg: 'bg.surface',
      borderRadius: 'lg',
      borderWidth: '1px',
      borderColor: 'border.default',
      boxShadow: 'dropdown',
      backdropFilter: 'blur(8px)',
      py: '1',
      minW: '48',
      zIndex: 'popover',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    },

    item: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      w: 'full',
      px: '3',
      py: '2',
      fontSize: 'sm',
      color: 'text.primary',
      cursor: 'pointer',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',

      _hover: {
        bg: 'interactive.hover',
      },

      _highlighted: {
        bg: 'bg.subtle',
      },

      _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },

    separator: {
      h: 'px',
      my: '1',
      mx: '2',
      bg: 'border.subtle',
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

    checkboxItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      w: 'full',
      px: '3',
      py: '2',
      fontSize: 'sm',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',

      _hover: {
        bg: 'interactive.hover',
      },
    },

    radioItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      w: 'full',
      px: '3',
      py: '2',
      fontSize: 'sm',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',

      _hover: {
        bg: 'interactive.hover',
      },
    },

    sub: {},

    subTrigger: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      w: 'full',
      px: '3',
      py: '2',
      fontSize: 'sm',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',

      _hover: {
        bg: 'interactive.hover',
      },
    },

    subContent: {
      bg: 'bg.surface',
      borderRadius: 'lg',
      borderWidth: '1px',
      borderColor: 'border.default',
      boxShadow: 'dropdown',
      backdropFilter: 'blur(8px)',
      py: '1',
      minW: '40',
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    },
  },

  defaultVariants: {},
})

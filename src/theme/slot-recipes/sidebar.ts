/**
 * Lobbi Sidebar Slot Recipe
 *
 * Defines navigation sidebar styling.
 */

import { defineSlotRecipe } from '@chakra-ui/react'

export const sidebarSlotRecipe = defineSlotRecipe({
  className: 'lobbi-sidebar',

  slots: [
    'root',
    'header',
    'logo',
    'nav',
    'navItem',
    'navItemIcon',
    'navItemLabel',
    'navItemBadge',
    'navGroup',
    'navGroupLabel',
    'footer',
    'toggle',
    'overlay',
  ],

  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      bg: 'sidebar.bg',
      height: 'full',
      transition: 'width 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
      overflow: 'hidden',
    },

    header: {
      display: 'flex',
      alignItems: 'center',
      px: '4',
      py: '4',
      borderBottomWidth: '1px',
      borderColor: 'white/5',
    },

    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '3',
      color: 'sidebar.accent',
      fontFamily: 'heading',
      fontWeight: 'semibold',
      fontSize: 'lg',
      letterSpacing: 'brand',
      textTransform: 'uppercase',
      transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
    },

    nav: {
      flex: '1',
      overflowY: 'auto',
      py: '2',
      px: '2',
    },

    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '3',
      px: '3',
      py: '2.5',
      borderRadius: 'md',
      color: 'sidebar.textMuted',
      fontSize: 'sm',
      fontWeight: 'medium',
      cursor: 'pointer',
      transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
      textDecoration: 'none',

      _hover: {
        bg: 'sidebar.hover',
        color: 'sidebar.text',
        transform: 'translateX(2px)',
      },

      _active: {
        bg: 'sidebar.active',
        color: 'sidebar.accent',
        borderLeft: '3px solid',
        borderColor: 'brand.primary',
      },

      _current: {
        bg: 'sidebar.active',
        color: 'sidebar.accent',
        borderLeft: '3px solid',
        borderColor: 'brand.primary',
      },

      _focusVisible: {
        outline: 'none',
        boxShadow: 'focus',
      },
    },

    navItemIcon: {
      flexShrink: 0,
      w: '5',
      h: '5',
    },

    navItemLabel: {
      flex: '1',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },

    navItemBadge: {
      ml: 'auto',
      px: '2',
      py: '0.5',
      borderRadius: 'full',
      bg: 'sidebar.accent',
      color: 'white',
      fontSize: 'xs',
      fontWeight: 'semibold',
      lineHeight: 'none',
    },

    navGroup: {
      mb: '2',
    },

    navGroupLabel: {
      px: '3',
      py: '2',
      fontSize: 'xs',
      fontWeight: 'semibold',
      color: 'sidebar.textMuted',
      textTransform: 'uppercase',
      letterSpacing: 'caps',
    },

    footer: {
      borderTopWidth: '1px',
      borderColor: 'white/5',
      p: '3',
    },

    toggle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      w: '8',
      h: '8',
      borderRadius: 'md',
      color: 'sidebar.textMuted',
      cursor: 'pointer',
      transition: 'all 0.15s ease',

      _hover: {
        bg: 'sidebar.hover',
        color: 'sidebar.text',
      },

      '& svg': {
        w: '5',
        h: '5',
      },
    },

    overlay: {
      position: 'fixed',
      inset: '0',
      bg: 'blackAlpha.600',
      zIndex: 'overlay',
    },
  },

  variants: {
    collapsed: {
      true: {
        root: {
          width: 'sidebarCollapsed',
        },
        navItemLabel: {
          display: 'none',
        },
        navItemBadge: {
          display: 'none',
        },
        navGroupLabel: {
          display: 'none',
        },
        logo: {
          '& > span': {
            display: 'none',
          },
        },
      },
      false: {
        root: {
          width: 'sidebar',
        },
      },
    },

    variant: {
      dark: {
        root: {
          bg: 'sidebar.bg',
        },
      },
      light: {
        root: {
          bg: 'bg.surface',
          borderRightWidth: '1px',
          borderColor: 'border.default',
        },
        header: {
          borderColor: 'border.default',
        },
        navItem: {
          color: 'text.secondary',
          _hover: {
            bg: 'bg.subtle',
            color: 'text.primary',
          },
          _active: {
            bg: 'brand.primary/10',
            color: 'brand.primary',
          },
        },
        navGroupLabel: {
          color: 'text.muted',
        },
        footer: {
          borderColor: 'border.default',
        },
        toggle: {
          color: 'text.muted',
          _hover: {
            bg: 'bg.subtle',
            color: 'text.primary',
          },
        },
      },
    },

    floating: {
      true: {
        root: {
          position: 'fixed',
          left: '0',
          top: '0',
          bottom: '0',
          zIndex: 'sticky',
          boxShadow: 'xl',
        },
      },
    },
  },

  defaultVariants: {
    collapsed: false,
    variant: 'dark',
    floating: false,
  },
})

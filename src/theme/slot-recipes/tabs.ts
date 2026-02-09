/**
 * Lobbi Tabs Slot Recipe
 *
 * Defines tabbed interface with list, trigger, content, indicator.
 */

import { defineSlotRecipe } from '@chakra-ui/react'

export const tabsSlotRecipe = defineSlotRecipe({
  className: 'lobbi-tabs',

  slots: ['root', 'list', 'trigger', 'content', 'indicator'],

  base: {
    root: {
      display: 'flex',
      width: 'full',
    },

    list: {
      display: 'flex',
      position: 'relative',
      gap: '1',
    },

    trigger: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2',
      fontFamily: 'body',
      fontWeight: 'medium',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      outline: 'none',
      transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
      color: 'text.muted',
      letterSpacing: 'button',

      _hover: {
        color: 'text.primary',
        transform: 'translateY(-1px)',
      },

      _focusVisible: {
        boxShadow: 'focus',
      },

      _selected: {
        color: 'brand.primary',
      },

      _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },

      '& svg': {
        w: '4',
        h: '4',
      },
    },

    content: {
      outline: 'none',
      width: 'full',

      _focusVisible: {
        boxShadow: 'focus',
      },
    },

    indicator: {
      position: 'absolute',
      bg: 'brand.primary',
      transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
    },
  },

  variants: {
    variant: {
      line: {
        list: {
          borderBottomWidth: '1px',
          borderColor: 'border.default',
        },
        trigger: {
          borderBottomWidth: '2px',
          borderColor: 'transparent',
          mb: '-1px',

          _selected: {
            borderColor: 'brand.primary',
          },
        },
        content: {
          pt: '4',
        },
        indicator: {
          bottom: '0',
          h: '2px',
          borderRadius: 'full',
        },
      },

      enclosed: {
        list: {
          bg: 'bg.muted',
          p: '1',
          borderRadius: 'lg',
        },
        trigger: {
          borderRadius: 'md',
          px: '4',
          py: '2',

          _selected: {
            bg: 'bg.surface',
            boxShadow: 'sm',
          },
        },
        content: {
          pt: '4',
        },
        indicator: {
          display: 'none',
        },
      },

      soft: {
        list: {
          gap: '2',
        },
        trigger: {
          px: '4',
          py: '2',
          borderRadius: 'md',

          _hover: {
            bg: 'bg.subtle',
          },

          _selected: {
            bg: 'brand.primary/10',
            color: 'brand.primary',
          },
        },
        content: {
          pt: '4',
        },
        indicator: {
          display: 'none',
        },
      },

      outline: {
        list: {
          gap: '2',
        },
        trigger: {
          px: '4',
          py: '2',
          borderRadius: 'md',
          borderWidth: '1px',
          borderColor: 'transparent',

          _selected: {
            borderColor: 'brand.primary',
            color: 'brand.primary',
          },
        },
        content: {
          pt: '4',
        },
        indicator: {
          display: 'none',
        },
      },

      solid: {
        list: {
          gap: '2',
        },
        trigger: {
          px: '4',
          py: '2',
          borderRadius: 'md',

          _selected: {
            bg: 'brand.primary',
            color: 'text.onBrand',
          },
        },
        content: {
          pt: '4',
        },
        indicator: {
          display: 'none',
        },
      },
    },

    orientation: {
      horizontal: {
        root: {
          flexDirection: 'column',
        },
        list: {
          flexDirection: 'row',
        },
      },
      vertical: {
        root: {
          flexDirection: 'row',
        },
        list: {
          flexDirection: 'column',
          borderBottomWidth: '0',
          borderRightWidth: '1px',
          borderColor: 'border.default',
        },
        trigger: {
          justifyContent: 'flex-start',
          borderBottomWidth: '0',
          borderRightWidth: '2px',
          mr: '-1px',
        },
        content: {
          pt: '0',
          pl: '4',
        },
        indicator: {
          right: '0',
          w: '2px',
          h: 'auto',
        },
      },
    },

    size: {
      sm: {
        trigger: {
          fontSize: 'sm',
          py: '1.5',
          px: '3',
        },
      },
      md: {
        trigger: {
          fontSize: 'sm',
          py: '2',
          px: '4',
        },
      },
      lg: {
        trigger: {
          fontSize: 'md',
          py: '2.5',
          px: '5',
        },
      },
    },

    fitted: {
      true: {
        trigger: {
          flex: '1',
        },
      },
    },
  },

  defaultVariants: {
    variant: 'line',
    orientation: 'horizontal',
    size: 'md',
  },
})

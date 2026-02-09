/**
 * Lobbi Breadcrumb Slot Recipe
 *
 * Defines breadcrumb navigation styling.
 */

import { defineSlotRecipe } from '@chakra-ui/react'

export const breadcrumbSlotRecipe = defineSlotRecipe({
  className: 'lobbi-breadcrumb',

  slots: ['root', 'list', 'item', 'link', 'currentLink', 'separator', 'ellipsis'],

  base: {
    root: {},

    list: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1',
    },

    item: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '1',
    },

    link: {
      fontSize: 'sm',
      fontFamily: 'ui',
      color: 'text.muted',
      textDecoration: 'none',
      transition: 'color 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
      cursor: 'pointer',

      _hover: {
        color: 'brand.primary',
        textDecoration: 'underline',
      },

      _focusVisible: {
        outline: 'none',
        boxShadow: 'focus',
        borderRadius: 'sm',
      },
    },

    currentLink: {
      fontSize: 'sm',
      color: 'text.primary',
      fontWeight: 'medium',
      letterSpacing: '0.02em',
      cursor: 'default',
    },

    separator: {
      color: 'text.muted',
      opacity: 0.5,
      mx: '1',

      '& svg': {
        w: '4',
        h: '4',
      },
    },

    ellipsis: {
      fontSize: 'sm',
      color: 'text.muted',
      px: '1',
    },
  },

  variants: {
    size: {
      sm: {
        link: {
          fontSize: 'xs',
        },
        currentLink: {
          fontSize: 'xs',
        },
        separator: {
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
        link: {
          fontSize: 'md',
        },
        currentLink: {
          fontSize: 'md',
        },
        separator: {
          '& svg': {
            w: '5',
            h: '5',
          },
        },
      },
    },

    variant: {
      plain: {
        // Uses base styles
      },
      underline: {
        link: {
          textDecoration: 'underline',
          textDecorationColor: 'text.muted/30',
          textUnderlineOffset: '2px',

          _hover: {
            textDecorationColor: 'brand.primary',
          },
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'plain',
  },
})

/**
 * Pagination Slot Recipe
 */
export const paginationSlotRecipe = defineSlotRecipe({
  className: 'lobbi-pagination',

  slots: ['root', 'item', 'prevTrigger', 'nextTrigger', 'ellipsis'],

  base: {
    root: {
      display: 'flex',
      alignItems: 'center',
      gap: '1',
    },

    item: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minW: '9',
      h: '9',
      px: '3',
      borderRadius: 'md',
      fontSize: 'sm',
      fontWeight: 'medium',
      color: 'text.secondary',
      cursor: 'pointer',
      transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',

      _hover: {
        bg: 'bg.subtle',
        color: 'text.primary',
        transform: 'translateY(-1px)',
      },

      _focusVisible: {
        outline: 'none',
        boxShadow: 'focus',
      },

      _selected: {
        bg: 'brand.primary',
        color: 'text.onBrand',
        boxShadow: '0 2px 8px rgba(212, 175, 55, 0.2)',
        _hover: {
          bg: 'brand.secondary',
        },
      },

      _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },

    prevTrigger: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minW: '9',
      h: '9',
      borderRadius: 'md',
      color: 'text.secondary',
      cursor: 'pointer',
      transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',

      _hover: {
        bg: 'bg.subtle',
        color: 'text.primary',
        transform: 'translateY(-1px)',
      },

      _focusVisible: {
        outline: 'none',
        boxShadow: 'focus',
      },

      _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },

      '& svg': {
        w: '4',
        h: '4',
      },
    },

    nextTrigger: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minW: '9',
      h: '9',
      borderRadius: 'md',
      color: 'text.secondary',
      cursor: 'pointer',
      transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',

      _hover: {
        bg: 'bg.subtle',
        color: 'text.primary',
        transform: 'translateY(-1px)',
      },

      _focusVisible: {
        outline: 'none',
        boxShadow: 'focus',
      },

      _disabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },

      '& svg': {
        w: '4',
        h: '4',
      },
    },

    ellipsis: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minW: '9',
      h: '9',
      color: 'text.muted',
      fontSize: 'sm',
    },
  },

  variants: {
    size: {
      sm: {
        item: {
          minW: '7',
          h: '7',
          px: '2',
          fontSize: 'xs',
        },
        prevTrigger: {
          minW: '7',
          h: '7',
        },
        nextTrigger: {
          minW: '7',
          h: '7',
        },
      },
      md: {
        // Uses base styles
      },
      lg: {
        item: {
          minW: '11',
          h: '11',
          px: '4',
          fontSize: 'md',
        },
        prevTrigger: {
          minW: '11',
          h: '11',
        },
        nextTrigger: {
          minW: '11',
          h: '11',
        },
      },
    },

    variant: {
      solid: {
        // Uses base styles
      },
      outline: {
        item: {
          borderWidth: '1px',
          borderColor: 'border.default',
          _selected: {
            borderColor: 'brand.primary',
          },
        },
        prevTrigger: {
          borderWidth: '1px',
          borderColor: 'border.default',
        },
        nextTrigger: {
          borderWidth: '1px',
          borderColor: 'border.default',
        },
      },
      subtle: {
        item: {
          bg: 'bg.subtle',
          _hover: {
            bg: 'bg.muted',
          },
        },
        prevTrigger: {
          bg: 'bg.subtle',
          _hover: {
            bg: 'bg.muted',
          },
        },
        nextTrigger: {
          bg: 'bg.subtle',
          _hover: {
            bg: 'bg.muted',
          },
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
})

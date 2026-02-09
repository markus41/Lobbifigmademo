/**
 * Lobbi Input Recipe
 *
 * Defines input field variants and states.
 */

import { defineRecipe } from '@chakra-ui/react'

export const inputRecipe = defineRecipe({
  className: 'lobbi-input',

  base: {
    width: 'full',
    minWidth: 0,
    outline: 'none',
    position: 'relative',
    appearance: 'none',
    fontFamily: 'body',
    fontSize: 'md',
    borderRadius: 'input',
    transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',

    _placeholder: {
      color: 'input.placeholder',
      opacity: 1,
    },

    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },

    _invalid: {
      borderColor: 'status.error',
      boxShadow: 'focusError',
    },

    _focusVisible: {
      outline: 'none',
    },
  },

  variants: {
    variant: {
      outline: {
        bg: 'input.bg',
        borderWidth: '1px',
        borderColor: 'input.border',

        _hover: {
          borderColor: 'border.accent',
        },

        _focusVisible: {
          borderColor: 'input.focus',
          boxShadow: 'focus',
        },

        _focus: {
          borderColor: 'input.focus',
          boxShadow: 'focus',
        },
      },

      filled: {
        bg: 'bg.subtle',
        borderWidth: '1px',
        borderColor: 'transparent',

        _hover: {
          bg: 'bg.muted',
        },

        _focus: {
          bg: 'input.bg',
          borderColor: 'input.focus',
          boxShadow: 'focus',
        },
      },

      flushed: {
        bg: 'transparent',
        borderRadius: '0',
        borderBottomWidth: '2px',
        borderColor: 'input.border',
        px: '0',

        _hover: {
          borderColor: 'border.accent',
        },

        _focus: {
          borderColor: 'input.focus',
          boxShadow: 'none',
        },
      },

      unstyled: {
        bg: 'transparent',
        border: 'none',
        borderRadius: '0',
        px: '0',
        height: 'auto',
      },

      glass: {
        bg: 'glass.bg',
        borderWidth: '1px',
        borderColor: 'glass.border',
        backdropFilter: 'blur(24px)',

        _hover: {
          borderColor: 'border.accent',
        },

        _focusVisible: {
          outline: 'none',
          borderColor: 'input.focus',
          boxShadow: 'focus',
          bg: 'glass.bg',
        },
      },
    },

    size: {
      xs: {
        h: '6',
        px: '2',
        fontSize: 'xs',
      },
      sm: {
        h: '8',
        px: '3',
        fontSize: 'sm',
      },
      md: {
        h: '10',
        px: '4',
        fontSize: 'md',
      },
      lg: {
        h: '12',
        px: '4',
        fontSize: 'lg',
      },
      xl: {
        h: '14',
        px: '5',
        fontSize: 'xl',
      },
    },
  },

  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
})

/**
 * Textarea Recipe
 */
export const textareaRecipe = defineRecipe({
  className: 'lobbi-textarea',

  base: {
    width: 'full',
    minWidth: 0,
    outline: 'none',
    position: 'relative',
    appearance: 'none',
    fontFamily: 'body',
    fontSize: 'md',
    borderRadius: 'input',
    lineHeight: 'relaxed',
    resize: 'vertical',
    transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',

    _placeholder: {
      color: 'input.placeholder',
      opacity: 1,
    },

    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },

    _invalid: {
      borderColor: 'status.error',
      boxShadow: 'focusError',
    },

    _focusVisible: {
      outline: 'none',
    },
  },

  variants: {
    variant: {
      outline: {
        bg: 'input.bg',
        borderWidth: '1px',
        borderColor: 'input.border',

        _hover: {
          borderColor: 'border.accent',
        },

        _focusVisible: {
          borderColor: 'input.focus',
          boxShadow: 'focus',
        },

        _focus: {
          borderColor: 'input.focus',
          boxShadow: 'focus',
        },
      },

      filled: {
        bg: 'bg.subtle',
        borderWidth: '1px',
        borderColor: 'transparent',

        _hover: {
          bg: 'bg.muted',
        },

        _focus: {
          bg: 'input.bg',
          borderColor: 'input.focus',
          boxShadow: 'focus',
        },
      },

      unstyled: {
        bg: 'transparent',
        border: 'none',
        borderRadius: '0',
        px: '0',
      },

      glass: {
        bg: 'glass.bg',
        borderWidth: '1px',
        borderColor: 'glass.border',
        backdropFilter: 'blur(24px)',

        _hover: {
          borderColor: 'border.accent',
        },

        _focusVisible: {
          outline: 'none',
          borderColor: 'input.focus',
          boxShadow: 'focus',
          bg: 'glass.bg',
        },
      },
    },

    size: {
      sm: {
        minH: '16',
        p: '2',
        fontSize: 'sm',
      },
      md: {
        minH: '20',
        p: '3',
        fontSize: 'md',
      },
      lg: {
        minH: '24',
        p: '4',
        fontSize: 'lg',
      },
    },

    resize: {
      none: { resize: 'none' },
      vertical: { resize: 'vertical' },
      horizontal: { resize: 'horizontal' },
      both: { resize: 'both' },
    },
  },

  defaultVariants: {
    variant: 'outline',
    size: 'md',
    resize: 'vertical',
  },
})

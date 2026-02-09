/**
 * Lobbi Form Slot Recipe
 *
 * Defines form field wrapper styling.
 */

import { defineSlotRecipe } from '@chakra-ui/react'

export const formFieldSlotRecipe = defineSlotRecipe({
  className: 'lobbi-form-field',

  slots: ['root', 'label', 'requiredIndicator', 'helperText', 'errorText', 'optionalText'],

  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: 'full',
    },

    label: {
      fontSize: 'sm',
      fontWeight: 'medium',
      fontFamily: 'ui',
      letterSpacing: 'label',
      color: 'text.primary',
      display: 'flex',
      alignItems: 'center',
      gap: '1',
    },

    requiredIndicator: {
      color: 'status.error',
      ml: '0.5',
    },

    helperText: {
      fontSize: 'sm',
      color: 'text.muted',
      lineHeight: 'relaxed',
      transition: 'color 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
    },

    errorText: {
      fontSize: 'sm',
      fontWeight: 'medium',
      color: 'status.error',
      display: 'flex',
      alignItems: 'center',
      gap: '1',
      transition: 'color 0.3s cubic-bezier(0.22, 1, 0.36, 1)',

      '& svg': {
        w: '4',
        h: '4',
        flexShrink: 0,
      },
    },

    optionalText: {
      fontSize: 'sm',
      color: 'text.muted',
      fontWeight: 'normal',
    },
  },

  variants: {
    orientation: {
      vertical: {
        root: {
          flexDirection: 'column',
        },
      },
      horizontal: {
        root: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: '4',
        },
        label: {
          flex: '0 0 auto',
          minW: '32',
        },
      },
    },

    size: {
      sm: {
        label: {
          fontSize: 'xs',
        },
        helperText: {
          fontSize: 'xs',
        },
        errorText: {
          fontSize: 'xs',
        },
      },
      md: {
        // Uses base styles
      },
      lg: {
        label: {
          fontSize: 'md',
        },
        helperText: {
          fontSize: 'md',
        },
        errorText: {
          fontSize: 'md',
        },
      },
    },
  },

  defaultVariants: {
    orientation: 'vertical',
    size: 'md',
  },
})

/**
 * Input Group Slot Recipe
 */
export const inputGroupSlotRecipe = defineSlotRecipe({
  className: 'lobbi-input-group',

  slots: ['root', 'addon', 'element'],

  base: {
    root: {
      display: 'flex',
      width: 'full',
      position: 'relative',
    },

    addon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bg: 'bg.subtle',
      color: 'text.secondary',
      borderWidth: '1px',
      borderColor: 'input.border',
      borderRadius: 'input',
      fontSize: 'sm',
      fontWeight: 'medium',
    },

    element: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: '0',
      bottom: '0',
      color: 'text.muted',
      pointerEvents: 'none',

      '& svg': {
        w: '4',
        h: '4',
      },

      '&[data-pointer-events]': {
        pointerEvents: 'auto',
      },
    },
  },

  variants: {
    size: {
      sm: {
        addon: {
          px: '3',
          h: '8',
          fontSize: 'xs',
        },
        element: {
          w: '8',
        },
      },
      md: {
        addon: {
          px: '4',
          h: '10',
        },
        element: {
          w: '10',
        },
      },
      lg: {
        addon: {
          px: '4',
          h: '12',
          fontSize: 'md',
        },
        element: {
          w: '12',
        },
      },
    },

    placement: {
      left: {
        addon: {
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
          borderRight: 'none',
        },
        element: {
          left: '0',
        },
      },
      right: {
        addon: {
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
          borderLeft: 'none',
        },
        element: {
          right: '0',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    placement: 'left',
  },
})

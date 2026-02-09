/**
 * Lobbi Card Slot Recipe
 *
 * Defines card component with multiple slots for header, body, footer.
 */

import { defineSlotRecipe } from '@chakra-ui/react'

export const cardSlotRecipe = defineSlotRecipe({
  className: 'lobbi-card',

  slots: ['root', 'header', 'title', 'description', 'body', 'footer'],

  base: {
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      bg: 'card.bg',
      borderRadius: 'card',
      borderWidth: '1px',
      borderColor: 'card.border',
      boxShadow: 'panel',
      overflow: 'hidden',
      transition: 'all 0.45s cubic-bezier(0.22, 1, 0.36, 1)',

      // Top accent bar
      _before: {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, var(--chakra-colors-brand-secondary), var(--chakra-colors-brand-primary), var(--chakra-colors-brand-secondary))',
        transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },

    header: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      p: '5',
      pb: '0',
    },

    title: {
      fontFamily: 'heading',
      fontWeight: 'semibold',
      fontSize: 'lg',
      lineHeight: 'tight',
      color: 'text.primary',
    },

    description: {
      fontSize: 'sm',
      color: 'text.secondary',
      lineHeight: 'relaxed',
    },

    body: {
      p: '5',
      flex: '1',
    },

    footer: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      p: '5',
      pt: '0',
    },
  },

  variants: {
    variant: {
      elevated: {
        root: {
          boxShadow: 'card',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
          },
        },
      },

      outline: {
        root: {
          boxShadow: 'none',
          borderWidth: '2px',
          _before: {
            display: 'none',
          },
        },
      },

      filled: {
        root: {
          bg: 'bg.subtle',
          borderWidth: '0',
          boxShadow: 'none',
          _before: {
            display: 'none',
          },
        },
      },

      glass: {
        root: {
          bg: 'white/90',
          backdropFilter: 'blur(40px)',
          borderColor: 'white/20',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
        },
      },

      unstyled: {
        root: {
          bg: 'transparent',
          border: 'none',
          boxShadow: 'none',
          borderRadius: '0',
          _before: {
            display: 'none',
          },
        },
        header: {
          p: '0',
        },
        body: {
          p: '0',
        },
        footer: {
          p: '0',
        },
      },
    },

    size: {
      sm: {
        root: {
          borderRadius: 'md',
        },
        header: {
          p: '4',
          pb: '0',
        },
        title: {
          fontSize: 'md',
        },
        description: {
          fontSize: 'xs',
        },
        body: {
          p: '4',
        },
        footer: {
          p: '4',
          pt: '0',
        },
      },

      md: {
        // Uses base styles
      },

      lg: {
        header: {
          p: '6',
          pb: '0',
        },
        title: {
          fontSize: 'xl',
        },
        body: {
          p: '6',
        },
        footer: {
          p: '6',
          pt: '0',
        },
      },
    },

    interactive: {
      true: {
        root: {
          cursor: 'pointer',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: 'cardHover',
            borderColor: 'border.accent',
          },
          _active: {
            transform: 'translateY(0)',
            boxShadow: 'card',
          },
        },
      },
    },

    accent: {
      brand: {
        root: {
          _before: {
            background: 'linear-gradient(90deg, var(--chakra-colors-brand-secondary), var(--chakra-colors-brand-primary), var(--chakra-colors-brand-secondary))',
          },
        },
      },
      success: {
        root: {
          _before: {
            background: 'linear-gradient(90deg, var(--chakra-colors-success-700), var(--chakra-colors-success-500), var(--chakra-colors-success-700))',
          },
        },
      },
      warning: {
        root: {
          _before: {
            background: 'linear-gradient(90deg, var(--chakra-colors-warning-700), var(--chakra-colors-warning-500), var(--chakra-colors-warning-700))',
          },
        },
      },
      error: {
        root: {
          _before: {
            background: 'linear-gradient(90deg, var(--chakra-colors-error-700), var(--chakra-colors-error-500), var(--chakra-colors-error-700))',
          },
        },
      },
      none: {
        root: {
          _before: {
            display: 'none',
          },
        },
      },
    },
  },

  defaultVariants: {
    variant: 'elevated',
    size: 'md',
    accent: 'brand',
  },
})

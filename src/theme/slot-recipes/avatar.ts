/**
 * Lobbi Avatar Slot Recipe
 *
 * Defines avatar styling with image, fallback, and badge.
 */

import { defineSlotRecipe } from '@chakra-ui/react'

export const avatarSlotRecipe = defineSlotRecipe({
  className: 'lobbi-avatar',

  slots: ['root', 'image', 'fallback', 'badge'],

  base: {
    root: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      borderRadius: 'full',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, var(--chakra-colors-brand-light), var(--chakra-colors-brand-primary), var(--chakra-colors-brand-secondary))',
      borderWidth: '2px',
      borderColor: 'brand.primary/40',
      transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',

      _hover: {
        transform: 'scale(1.05)',
        boxShadow: 'goldSoft',
      },
    },

    image: {
      w: 'full',
      h: 'full',
      objectFit: 'cover',
    },

    fallback: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      w: 'full',
      h: 'full',
      fontFamily: 'heading',
      fontWeight: 'semibold',
      color: 'white',
      textTransform: 'uppercase',
    },

    badge: {
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'full',
      bg: 'bg.surface',
      borderWidth: '2px',
      borderColor: 'bg.surface',
    },
  },

  variants: {
    size: {
      xs: {
        root: {
          w: '6',
          h: '6',
        },
        fallback: {
          fontSize: '2xs',
        },
        badge: {
          w: '2',
          h: '2',
          bottom: '-0.5',
          right: '-0.5',
        },
      },
      sm: {
        root: {
          w: '8',
          h: '8',
        },
        fallback: {
          fontSize: 'xs',
        },
        badge: {
          w: '2.5',
          h: '2.5',
          bottom: '0',
          right: '0',
        },
      },
      md: {
        root: {
          w: '10',
          h: '10',
        },
        fallback: {
          fontSize: 'sm',
        },
        badge: {
          w: '3',
          h: '3',
          bottom: '0',
          right: '0',
        },
      },
      lg: {
        root: {
          w: '16',
          h: '16',
        },
        fallback: {
          fontSize: 'xl',
        },
        badge: {
          w: '4',
          h: '4',
          bottom: '0.5',
          right: '0.5',
        },
      },
      xl: {
        root: {
          w: '24',
          h: '24',
        },
        fallback: {
          fontSize: '3xl',
        },
        badge: {
          w: '5',
          h: '5',
          bottom: '1',
          right: '1',
        },
      },
      '2xl': {
        root: {
          w: '32',
          h: '32',
        },
        fallback: {
          fontSize: '4xl',
        },
        badge: {
          w: '6',
          h: '6',
          bottom: '1.5',
          right: '1.5',
        },
      },
    },

    variant: {
      gradient: {
        // Uses base gradient background
      },
      solid: {
        root: {
          background: 'brand.primary',
        },
      },
      outline: {
        root: {
          background: 'bg.surface',
          borderWidth: '2px',
          borderColor: 'brand.primary/40',
        },
        fallback: {
          color: 'brand.primary',
        },
      },
      subtle: {
        root: {
          background: 'brand.primary/15',
          borderWidth: '0',
        },
        fallback: {
          color: 'brand.primary',
        },
      },
    },

    shape: {
      circle: {
        root: {
          borderRadius: 'full',
        },
      },
      square: {
        root: {
          borderRadius: 'lg',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
    variant: 'gradient',
    shape: 'circle',
  },
})

/**
 * Avatar Group Slot Recipe
 */
export const avatarGroupSlotRecipe = defineSlotRecipe({
  className: 'lobbi-avatar-group',

  slots: ['root', 'excess'],

  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',

      // Stack avatars with overlap
      '& > *': {
        marginInlineStart: '-3',
        borderWidth: '2px',
        borderColor: 'bg.surface',
      },

      '& > *:first-of-type': {
        marginInlineStart: '0',
      },
    },

    excess: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'full',
      bg: 'bg.muted',
      color: 'text.secondary',
      fontWeight: 'medium',
      fontSize: 'xs',
      borderWidth: '2px',
      borderColor: 'bg.surface',
      marginInlineStart: '-3',
    },
  },

  variants: {
    size: {
      sm: {
        root: {
          '& > *': {
            marginInlineStart: '-2',
          },
        },
        excess: {
          w: '8',
          h: '8',
          fontSize: '2xs',
          marginInlineStart: '-2',
        },
      },
      md: {
        root: {
          '& > *': {
            marginInlineStart: '-3',
          },
        },
        excess: {
          w: '10',
          h: '10',
          fontSize: 'xs',
        },
      },
      lg: {
        root: {
          '& > *': {
            marginInlineStart: '-4',
          },
        },
        excess: {
          w: '16',
          h: '16',
          fontSize: 'sm',
          marginInlineStart: '-4',
        },
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

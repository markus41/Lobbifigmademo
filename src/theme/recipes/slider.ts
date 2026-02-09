/**
 * Lobbi Slider Recipe
 *
 * Defines slider/range input styling.
 */

import { defineRecipe } from '@chakra-ui/react'

export const sliderTrackRecipe = defineRecipe({
  className: 'lobbi-slider-track',

  base: {
    position: 'relative',
    bg: 'bg.muted',
    borderRadius: 'full',
    overflow: 'hidden',
    cursor: 'pointer',

    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },

  variants: {
    orientation: {
      horizontal: {
        width: 'full',
        height: '2',
      },
      vertical: {
        height: 'full',
        width: '2',
      },
    },

    size: {
      sm: {
        height: '1',
      },
      md: {
        height: '2',
      },
      lg: {
        height: '3',
      },
    },
  },

  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
})

export const sliderFilledTrackRecipe = defineRecipe({
  className: 'lobbi-slider-filled-track',

  base: {
    height: 'full',
    bg: 'brand.primary',
    borderRadius: 'full',
  },

  variants: {
    colorScheme: {
      brand: {
        bg: 'brand.primary',
      },
      success: {
        bg: 'status.success',
      },
      warning: {
        bg: 'status.warning',
      },
      error: {
        bg: 'status.error',
      },
    },
  },

  defaultVariants: {
    colorScheme: 'brand',
  },
})

export const sliderThumbRecipe = defineRecipe({
  className: 'lobbi-slider-thumb',

  base: {
    position: 'absolute',
    bg: 'white',
    borderRadius: 'full',
    borderWidth: '2px',
    borderColor: 'brand.primary',
    boxShadow: 'md',
    cursor: 'grab',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',

    _hover: {
      transform: 'scale(1.1)',
    },

    _active: {
      cursor: 'grabbing',
      transform: 'scale(1.15)',
    },

    _focusVisible: {
      boxShadow: 'focus',
      outline: 'none',
    },

    _disabled: {
      cursor: 'not-allowed',
    },
  },

  variants: {
    size: {
      sm: {
        w: '3',
        h: '3',
      },
      md: {
        w: '4',
        h: '4',
      },
      lg: {
        w: '5',
        h: '5',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

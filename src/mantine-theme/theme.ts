/**
 * Lobbi Platform - Base Mantine v7 Theme
 *
 * Luxury-first design system with warm tones, serif display typography,
 * glass morphism effects, and 8px spacing grid. Never uses pure gray or
 * pure black shadows.
 *
 * Signature Gold: #D4AF37
 */
import { createTheme, type MantineColorsTuple } from '@mantine/core';

// ============================================================================
// CUSTOM COLOR TUPLES (10 shades each, index 0-9)
// ============================================================================

/** Signature Lobbi Gold - the brand anchor */
const gold: MantineColorsTuple = [
  '#FBF3D5', // 0 - lightest
  '#F5E6A3', // 1
  '#EDDA7A', // 2
  '#E4C95A', // 3
  '#D4AF37', // 4 - base
  '#BF9A2E', // 5
  '#A88526', // 6 - primary shade (used as default)
  '#8B6E1F', // 7
  '#6B5518', // 8
  '#4A3B10', // 9 - darkest
];

/** Warm neutral - never pure gray */
const warmNeutral: MantineColorsTuple = [
  '#FAF8F5', // 0
  '#F0EBE3', // 1
  '#E5DDD2', // 2
  '#D4C9BB', // 3
  '#B8A99A', // 4
  '#9A8B7A', // 5
  '#7D6F60', // 6
  '#5E524A', // 7
  '#3D3530', // 8
  '#1E1A16', // 9
];

/** Deep navy - warm-tinted dark */
const deepNavy: MantineColorsTuple = [
  '#F0EEF2', // 0
  '#D8D4DE', // 1
  '#B8B0C4', // 2
  '#8E84A0', // 3
  '#6B5F80', // 4
  '#4A3F5E', // 5
  '#363052', // 6
  '#2D2D44', // 7
  '#1A1A2E', // 8
  '#0F0F1A', // 9
];

// ============================================================================
// BASE THEME
// ============================================================================

export const lobbiBaseTheme = createTheme({
  // -- Typography --------------------------------------------------------
  fontFamily: '"DM Sans", "Inter", system-ui, -apple-system, sans-serif',
  fontFamilyMonospace: '"JetBrains Mono", "Fira Code", ui-monospace, monospace',
  headings: {
    fontFamily: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2' },
      h2: { fontSize: '2rem', lineHeight: '1.25' },
      h3: { fontSize: '1.625rem', lineHeight: '1.3' },
      h4: { fontSize: '1.25rem', lineHeight: '1.35' },
      h5: { fontSize: '1.0625rem', lineHeight: '1.4' },
      h6: { fontSize: '0.9375rem', lineHeight: '1.45' },
    },
  },

  // -- Colors ------------------------------------------------------------
  primaryColor: 'gold',
  primaryShade: { light: 6, dark: 4 },
  colors: {
    gold,
    warmNeutral,
    deepNavy,
  },

  // -- Other (white/black) -----------------------------------------------
  white: '#FFFDF7',
  black: '#1A1610',

  // -- Border radius (8px scale) -----------------------------------------
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },

  // -- Spacing (8px grid) ------------------------------------------------
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  // -- Shadows (warm tinted, never pure black) ---------------------------
  shadows: {
    xs: '0 1px 2px rgba(139, 110, 31, 0.06)',
    sm: '0 2px 4px rgba(139, 110, 31, 0.08)',
    md: '0 4px 12px rgba(139, 110, 31, 0.10)',
    lg: '0 8px 24px rgba(139, 110, 31, 0.12)',
    xl: '0 16px 48px rgba(139, 110, 31, 0.16)',
  },

  // -- Font sizes --------------------------------------------------------
  fontSizes: {
    xs: '0.75rem',
    sm: '0.8125rem',
    md: '0.9375rem',
    lg: '1.0625rem',
    xl: '1.25rem',
  },

  // -- Line heights ------------------------------------------------------
  lineHeights: {
    xs: '1.3',
    sm: '1.4',
    md: '1.5',
    lg: '1.6',
    xl: '1.75',
  },

  // -- Default radius for components -------------------------------------
  defaultRadius: 'md',

  // -- Cursor style (pointer for interactive elements) -------------------
  cursorType: 'pointer',

  // -- Respect user preferences ------------------------------------------
  respectReducedMotion: true,

  // -- Focus ring --------------------------------------------------------
  focusRing: 'auto',

  // -- Custom properties via `other` -------------------------------------
  other: {
    // Glass morphism defaults
    glassBlur: '40px',
    glassOpacity: 0.08,
    glassBorder: '1px solid rgba(255, 255, 255, 0.12)',

    // Gradient defaults (Luxe Haven / brand)
    gradientBrand: 'linear-gradient(135deg, #F5E6A3, #D4AF37, #8B7330)',
    gradientButton: 'linear-gradient(135deg, #8B7330, #D4AF37)',
    gradientHero: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D44 50%, #D4AF37 100%)',
    gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF7 100%)',
    gradientGlow: 'radial-gradient(circle, rgba(212,175,55,0.15), transparent 70%)',

    // Animation tokens
    transitionDuration: '250ms',
    transitionEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionHover: '200ms cubic-bezier(0.4, 0, 0.2, 1)',

    // Motion easings
    easingLuxInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easingLuxOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easingBounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

    // Layout
    sidebarWidth: '280px',
    headerHeight: '64px',
    maxContentWidth: '1200px',

    // Accessibility
    dyslexicFont: '"OpenDyslexic", "Comic Sans MS", sans-serif',
    highContrastBorder: '2px solid currentColor',
  },

  // -- Component style overrides -----------------------------------------
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: 600,
          letterSpacing: '0.01em',
          transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },

    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'sm',
        withBorder: true,
      },
      styles: {
        root: {
          borderColor: 'var(--lobbi-border, var(--mantine-color-gray-3))',
          transition: 'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },

    TextInput: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        input: {
          borderColor: 'var(--lobbi-border, var(--mantine-color-gray-3))',
          transition: 'border-color 200ms ease, box-shadow 200ms ease',
          '&:focus': {
            borderColor: 'var(--mantine-primary-color-filled)',
            boxShadow: '0 0 0 2px rgba(212, 175, 55, 0.15)',
          },
        },
      },
    },

    PasswordInput: {
      defaultProps: {
        radius: 'md',
      },
    },

    Select: {
      defaultProps: {
        radius: 'md',
      },
    },

    Textarea: {
      defaultProps: {
        radius: 'md',
      },
    },

    Badge: {
      defaultProps: {
        radius: 'xl',
        variant: 'light',
      },
      styles: {
        root: {
          fontWeight: 500,
          letterSpacing: '0.02em',
          textTransform: 'none' as const,
        },
      },
    },

    Avatar: {
      defaultProps: {
        radius: 'xl',
      },
      styles: {
        root: {
          border: '2px solid var(--lobbi-border, var(--mantine-color-gray-2))',
        },
      },
    },

    Tooltip: {
      defaultProps: {
        radius: 'sm',
        withArrow: true,
        transitionProps: { transition: 'fade-up', duration: 200 },
      },
    },

    Modal: {
      defaultProps: {
        radius: 'lg',
        overlayProps: { backgroundOpacity: 0.6, blur: 8 },
        transitionProps: { transition: 'fade', duration: 250 },
      },
    },

    Drawer: {
      defaultProps: {
        overlayProps: { backgroundOpacity: 0.6, blur: 8 },
        transitionProps: { duration: 300 },
      },
    },

    Paper: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          borderColor: 'var(--lobbi-border, var(--mantine-color-gray-3))',
        },
      },
    },

    Tabs: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        tab: {
          fontWeight: 500,
          transition: 'color 200ms ease, border-color 200ms ease',
        },
      },
    },

    NavLink: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: 500,
          transition: 'background-color 150ms ease',
        },
      },
    },

    Notification: {
      defaultProps: {
        radius: 'md',
      },
    },

    Menu: {
      defaultProps: {
        radius: 'md',
        shadow: 'md',
        transitionProps: { transition: 'fade-down', duration: 150 },
      },
    },

    Popover: {
      defaultProps: {
        radius: 'md',
        shadow: 'md',
        transitionProps: { transition: 'fade', duration: 200 },
      },
    },

    ActionIcon: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          transition: 'all 150ms ease',
        },
      },
    },

    Switch: {
      styles: {
        track: {
          transition: 'background-color 200ms ease',
        },
      },
    },

    Progress: {
      defaultProps: {
        radius: 'xl',
      },
    },

    Skeleton: {
      defaultProps: {
        radius: 'md',
      },
    },

    Table: {
      styles: {
        th: {
          fontWeight: 600,
          letterSpacing: '0.02em',
        },
      },
    },

    Divider: {
      styles: {
        root: {
          borderColor: 'var(--lobbi-border, var(--mantine-color-gray-3))',
        },
      },
    },
  },
});

export default lobbiBaseTheme;

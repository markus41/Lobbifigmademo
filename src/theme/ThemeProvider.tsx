/**
 * Lobbi Theme Provider
 *
 * Provides theme context and CSS variable injection for the entire application.
 * Supports dynamic org-based theming with Chakra UI integration.
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type {
  LobbiBaseTheme,
  OrgTheme,
  OrgId,
  ThemeContextValue,
  CSSVariableMap,
} from './types/theme.types';
import { generateCSSVariables, injectCSSVariables } from './utils/cssVariables';

// Import base theme
import baseThemeJson from './theme.base.json';

// Import org themes
import luxeHavenTheme from './orgs/luxe-haven.json';
import pacificClubTheme from './orgs/pacific-club.json';
import summitGroupTheme from './orgs/summit-group.json';
import verdeCollectiveTheme from './orgs/verde-collective.json';
import crownEstatesTheme from './orgs/crown-estates.json';

// Type assertions for JSON imports
const baseTheme = baseThemeJson.lobbi as LobbiBaseTheme;

const orgThemes: Record<OrgId, OrgTheme> = {
  'luxe-haven': luxeHavenTheme as OrgTheme,
  'pacific-club': pacificClubTheme as OrgTheme,
  'summit-group': summitGroupTheme as OrgTheme,
  'verde-collective': verdeCollectiveTheme as OrgTheme,
  'crown-estates': crownEstatesTheme as OrgTheme,
};

// ============================================================================
// CONTEXT
// ============================================================================

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ============================================================================
// CHAKRA THEME BUILDER
// ============================================================================

function buildChakraTheme(base: LobbiBaseTheme, org: OrgTheme | null) {
  const chakraTheme = extendTheme({
    // Fonts
    fonts: {
      heading: base.type.font.display,
      body: base.type.font.body,
      mono: base.type.font.mono,
    },

    // Font sizes
    fontSizes: {
      xs: base.type.size.xs,
      sm: base.type.size.small,
      md: base.type.size.body,
      lg: base.type.size.h4,
      xl: base.type.size.h3,
      '2xl': base.type.size.h2,
      '3xl': base.type.size.h1,
      '4xl': base.type.size.hero,
    },

    // Font weights
    fontWeights: base.type.weight,

    // Letter spacing
    letterSpacings: {
      tighter: base.type.tracking.tight,
      tight: base.type.tracking.tight,
      normal: '0',
      wide: base.type.tracking.wide,
      wider: base.type.tracking.widest,
      brand: base.type.tracking.brand,
      caps: base.type.tracking.caps,
    },

    // Line heights
    lineHeights: base.type.lineHeight,

    // Spacing
    space: base.space,

    // Border radii
    radii: base.radii,

    // Shadows
    shadows: base.shadows,

    // Breakpoints
    breakpoints: base.breakpoints,

    // Z-index
    zIndices: base.zIndex,

    // Colors - merge base and org
    colors: {
      // Base colors
      surface: base.colors.surface,
      ink: base.colors.ink,
      gold: base.colors.gold,
      line: base.colors.line,
      state: base.colors.state,
      // Org brand colors
      brand: org?.chakra.colors.brand || {
        50: base.colors.gold.pale,
        100: base.colors.gold.pale,
        200: base.colors.gold.champagne2,
        300: base.colors.gold.champagne2,
        400: base.colors.gold.champagne,
        500: base.colors.gold.champagne,
        600: base.colors.gold.antique,
        700: base.colors.gold.dark,
        800: base.colors.gold.dark,
        900: base.colors.gold.dark,
      },
    },

    // Semantic tokens
    semanticTokens: {
      colors: org?.chakra.semanticTokens.colors || {
        'brand.primary': base.colors.gold.champagne,
        'brand.secondary': base.colors.gold.dark,
        'bg.canvas': base.colors.surface.canvas,
        'bg.surface': base.colors.surface.card,
        'text.primary': base.colors.ink.primary,
        'text.secondary': base.colors.ink.secondary,
        'text.muted': base.colors.ink.muted,
        'border.default': base.colors.surface.cardBorder,
        'border.accent': base.colors.line.gold,
      },
    },

    // Component styles
    components: {
      Button: {
        baseStyle: {
          fontWeight: base.components.button.fontWeight,
          letterSpacing: base.components.button.letterSpacing,
          textTransform: base.components.button.textTransform,
          borderRadius: base.components.button.borderRadius,
          transition: `all ${base.components.button.transitionDuration} ${base.motion.easingCSS.luxInOut}`,
        },
        sizes: {
          md: {
            h: base.components.button.minHeight,
            px: base.components.button.paddingX,
            py: base.components.button.paddingY,
            fontSize: base.components.button.fontSize,
          },
        },
        variants: {
          solid: {
            bg: org?.components.button.primary.bg || `linear-gradient(135deg, ${base.colors.gold.dark}, ${base.colors.gold.champagne})`,
            color: org?.components.button.primary.color || 'white',
            boxShadow: org?.components.button.primary.shadow || base.shadows.goldSoft,
            _hover: {
              bg: org?.components.button.primary.hoverBg || `linear-gradient(135deg, ${base.colors.gold.dark}, ${base.colors.gold.antique})`,
              boxShadow: org?.components.button.primary.hoverShadow || base.shadows.goldGlow,
              transform: `translateY(-${base.components.button.hoverLift})`,
            },
          },
          outline: {
            bg: org?.components.button.secondary.bg || 'transparent',
            color: org?.components.button.secondary.color || base.colors.gold.champagne,
            border: org?.components.button.secondary.border || `1px solid ${base.colors.line.gold}`,
            _hover: {
              bg: org?.components.button.secondary.hoverBg || `rgba(212,175,55,0.08)`,
            },
          },
          ghost: {
            bg: org?.components.button.ghost.bg || 'transparent',
            color: org?.components.button.ghost.color || base.colors.gold.champagne,
            _hover: {
              bg: org?.components.button.ghost.hoverBg || `rgba(212,175,55,0.06)`,
            },
          },
        },
      },

      Input: {
        baseStyle: {
          field: {
            borderRadius: base.components.input.borderRadius,
            transition: `all ${base.motion.durationMs.focus}ms ${base.motion.easingCSS.luxInOut}`,
          },
        },
        sizes: {
          md: {
            field: {
              h: base.components.input.minHeight,
              px: base.components.input.paddingX,
              py: base.components.input.paddingY,
              fontSize: base.components.input.fontSize,
            },
          },
        },
        variants: {
          outline: {
            field: {
              bg: org?.components.input.bg || `rgba(212,175,55,0.03)`,
              borderColor: org?.components.input.border || `rgba(212,175,55,0.15)`,
              borderWidth: base.components.input.borderWidth,
              _focus: {
                borderColor: org?.components.input.focusBorder || `rgba(212,175,55,0.6)`,
                boxShadow: org?.components.input.focusShadow || base.shadows.focus,
              },
            },
          },
        },
      },

      Card: {
        baseStyle: {
          container: {
            borderRadius: base.components.card.borderRadius,
            borderWidth: base.components.card.borderWidth,
            borderColor: org?.components.card.border || base.colors.surface.cardBorder,
            boxShadow: org?.components.card.shadow || base.shadows.panel,
            bg: base.colors.surface.card,
            overflow: 'hidden',
            transition: `all ${base.motion.durationMs.hover}ms ${base.motion.easingCSS.luxInOut}`,
            _before: {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: base.components.card.topBarHeight,
              background: org?.components.card.topBar || `linear-gradient(90deg, ${base.colors.gold.dark}, ${base.colors.gold.champagne}, ${base.colors.gold.dark})`,
            },
            _hover: {
              transform: `translateY(-${base.components.card.hoverLift})`,
            },
          },
          body: {
            p: base.components.card.padding,
          },
        },
      },

      Modal: {
        baseStyle: {
          dialog: {
            maxW: base.components.modal.maxWidth,
            p: base.components.modal.padding,
            borderRadius: base.components.modal.borderRadius,
            bg: base.colors.surface.card,
          },
          overlay: {
            bg: base.colors.surface.overlay,
            backdropFilter: `blur(${base.materials.glass.blurLight})`,
          },
        },
      },

      Avatar: {
        sizes: {
          sm: { container: { w: base.components.avatar.sm, h: base.components.avatar.sm } },
          md: { container: { w: base.components.avatar.md, h: base.components.avatar.md } },
          lg: { container: { w: base.components.avatar.lg, h: base.components.avatar.lg } },
          xl: { container: { w: base.components.avatar.xl, h: base.components.avatar.xl } },
        },
        baseStyle: {
          container: {
            background: org?.components.avatar.bg || `linear-gradient(135deg, ${base.colors.gold.champagne}, ${base.colors.gold.dark})`,
            border: org?.components.avatar.border || `2px solid ${base.colors.line.gold}`,
          },
        },
      },

      Badge: {
        baseStyle: {
          bg: org?.components.badge.bg || `rgba(212,175,55,0.18)`,
          color: org?.components.badge.color || base.colors.gold.pale,
          borderRadius: base.radii.full,
          px: base.space['3'],
          py: base.space['1'],
          fontSize: base.type.size.label,
          fontWeight: base.type.weight.medium,
          textTransform: 'uppercase',
          letterSpacing: base.type.tracking.caps,
        },
      },

      Tooltip: {
        baseStyle: {
          bg: org?.components.tooltip.bg || base.colors.ink.dark,
          color: org?.components.tooltip.color || base.colors.gold.pale,
          borderRadius: base.radii.sm,
          px: base.space['3'],
          py: base.space['2'],
          fontSize: base.type.size.small,
        },
      },
    },

    // Global styles
    styles: {
      global: {
        'html, body': {
          bg: org?.colors.surface.canvas || base.colors.surface.canvas,
          color: base.colors.ink.primary,
          fontFamily: base.type.font.body,
          fontSize: base.type.size.body,
          lineHeight: base.type.lineHeight.normal,
        },
        '*::selection': {
          bg: `rgba(${org?.colors.primaryRgb || '212,175,55'},0.25)`,
        },
        ':focus-visible': {
          outline: 'none',
          boxShadow: base.shadows.focus,
        },
      },
    },
  });

  return chakraTheme;
}

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

interface LobbiThemeProviderProps {
  children: React.ReactNode;
  defaultOrg?: OrgId;
}

export function LobbiThemeProvider({
  children,
  defaultOrg = 'luxe-haven',
}: LobbiThemeProviderProps) {
  const [currentOrg, setCurrentOrg] = useState<OrgId | null>(defaultOrg);
  const [cssVariables, setCssVariables] = useState<CSSVariableMap>({});

  // Get current org theme
  const orgTheme = currentOrg ? orgThemes[currentOrg] : null;

  // Generate CSS variables when org changes
  useEffect(() => {
    const vars = generateCSSVariables(baseTheme, orgTheme);
    setCssVariables(vars);
    injectCSSVariables(vars);
  }, [orgTheme]);

  // Set org handler
  const setOrg = useCallback((orgId: OrgId) => {
    setCurrentOrg(orgId);
  }, []);

  // Get CSS variable value
  const getCSSVariable = useCallback(
    (path: string): string => {
      const varName = `--lobbi-${path.replace(/\./g, '-')}` as keyof CSSVariableMap;
      return cssVariables[varName] || '';
    },
    [cssVariables]
  );

  // Get token value by path
  const getToken = useCallback(
    <T,>(path: string): T => {
      const parts = path.split('.');
      let value: unknown = orgTheme || baseTheme;

      for (const part of parts) {
        if (value && typeof value === 'object' && part in value) {
          value = (value as Record<string, unknown>)[part];
        } else {
          console.warn(`Token path not found: ${path}`);
          return undefined as T;
        }
      }

      return value as T;
    },
    [orgTheme]
  );

  // Build Chakra theme
  const chakraTheme = useMemo(
    () => buildChakraTheme(baseTheme, orgTheme),
    [orgTheme]
  );

  // Context value
  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      baseTheme,
      orgTheme,
      currentOrg,
      setOrg,
      getCSSVariable,
      getToken,
    }),
    [orgTheme, currentOrg, setOrg, getCSSVariable, getToken]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>
    </ThemeContext.Provider>
  );
}

// ============================================================================
// HOOKS
// ============================================================================

export function useLobbiTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useLobbiTheme must be used within LobbiThemeProvider');
  }
  return context;
}

export function useOrgTheme(): OrgTheme | null {
  const { orgTheme } = useLobbiTheme();
  return orgTheme;
}

export function useBaseTheme(): LobbiBaseTheme {
  const { baseTheme } = useLobbiTheme();
  return baseTheme;
}

export function useThemeToken<T>(path: string): T {
  const { getToken } = useLobbiTheme();
  return getToken<T>(path);
}

export function useCSSVariable(path: string): string {
  const { getCSSVariable } = useLobbiTheme();
  return getCSSVariable(path);
}

export function useOrgSwitcher(): [OrgId | null, (orgId: OrgId) => void] {
  const { currentOrg, setOrg } = useLobbiTheme();
  return [currentOrg, setOrg];
}

// ============================================================================
// EXPORTS
// ============================================================================

export { orgThemes, baseTheme };
export type { LobbiThemeProviderProps };

/**
 * Lobbi MantineThemeProvider
 *
 * Drop-in replacement for ThemeProvider.v3.tsx (Chakra).
 * Wraps MantineProvider with org-specific overrides, CSS variables,
 * color mode, and backward-compatible hooks.
 */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from 'react';
import {
  MantineProvider,
  mergeMantineTheme,
  type MantineTheme,
  type MantineColorScheme,
} from '@mantine/core';
import { lobbiBaseTheme } from './theme';
import { ORG_THEME_OVERRIDES } from './org-themes';
import { lobbiCssVariablesResolver } from './css-variables';

// ============================================================================
// TYPES
// ============================================================================

export type OrgId =
  | 'luxe-haven'
  | 'pacific-club'
  | 'summit-group'
  | 'verde-collective'
  | 'crown-estates'
  | 'obsidian-society'
  | 'rose-meridian'
  | 'arctic-circle'
  | 'flame-stone'
  | 'marigold-society'
  | 'midnight-azure'
  | 'jade-dynasty'
  | 'copper-oak'
  | 'lavender-fields'
  | 'slate-modern'
  | 'neon-district'
  | 'zen-garden'
  | 'the-forge'
  | 'golden-era'
  | 'pixel-pioneers';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface OrgThemeContextValue {
  currentOrg: OrgId;
  setOrg: (org: OrgId) => void;
  availableOrgs: readonly OrgId[];
  theme: MantineTheme;
}

export interface ThemeModeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  resolvedMode: 'light' | 'dark';
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const AVAILABLE_ORGS: readonly OrgId[] = [
  'luxe-haven',
  'pacific-club',
  'summit-group',
  'verde-collective',
  'crown-estates',
  'obsidian-society',
  'rose-meridian',
  'arctic-circle',
  'flame-stone',
  'marigold-society',
  'midnight-azure',
  'jade-dynasty',
  'copper-oak',
  'lavender-fields',
  'slate-modern',
  'neon-district',
  'zen-garden',
  'the-forge',
  'golden-era',
  'pixel-pioneers',
] as const;

export const ORG_NAMES: Record<OrgId, string> = {
  'luxe-haven': 'Luxe Haven Resort',
  'pacific-club': 'Pacific Club',
  'summit-group': 'Summit Group',
  'verde-collective': 'Verde Collective',
  'crown-estates': 'Crown Estates',
  'obsidian-society': 'Obsidian Society',
  'rose-meridian': 'Rose Meridian',
  'arctic-circle': 'Arctic Circle',
  'flame-stone': 'Flame Stone',
  'marigold-society': 'Marigold Society',
  'midnight-azure': 'Midnight Azure',
  'jade-dynasty': 'Jade Dynasty',
  'copper-oak': 'Copper Oak',
  'lavender-fields': 'Lavender Fields',
  'slate-modern': 'Slate Modern',
  'neon-district': 'Neon District',
  'zen-garden': 'Zen Garden',
  'the-forge': 'The Forge',
  'golden-era': 'Golden Era',
  'pixel-pioneers': 'Pixel Pioneers',
};

// ============================================================================
// CONTEXTS
// ============================================================================

const OrgThemeContext = createContext<OrgThemeContextValue | null>(null);
const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

// ============================================================================
// PROVIDER
// ============================================================================

export interface LobbiMantineProviderProps {
  children: ReactNode;
  defaultOrg?: OrgId;
  defaultMode?: ThemeMode;
}

export function LobbiMantineProvider({
  children,
  defaultOrg = 'luxe-haven',
  defaultMode = 'light',
}: LobbiMantineProviderProps) {
  const [currentOrg, setCurrentOrg] = useState<OrgId>(defaultOrg);
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  // Resolve system preference
  const resolvedMode = useMemo(() => {
    if (mode === 'system') {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      }
      return 'light';
    }
    return mode;
  }, [mode]);

  // Check if org prefers dark
  const orgPrefersDark = useMemo(() => {
    const override = ORG_THEME_OVERRIDES[currentOrg];
    return override?.other?.prefersDark === true;
  }, [currentOrg]);

  // Effective color scheme: org preference or user choice
  const effectiveColorScheme: MantineColorScheme = useMemo(() => {
    if (mode === 'system' && orgPrefersDark) return 'dark';
    return resolvedMode;
  }, [mode, resolvedMode, orgPrefersDark]);

  // Merge base theme with org-specific overrides
  const mergedTheme: MantineTheme = useMemo(() => {
    const orgOverride = ORG_THEME_OVERRIDES[currentOrg];
    if (!orgOverride) return lobbiBaseTheme as MantineTheme;

    // mergeMantineTheme does a deep merge of themes
    return mergeMantineTheme(lobbiBaseTheme as MantineTheme, orgOverride) as MantineTheme;
  }, [currentOrg]);

  // Apply CSS custom properties and data attributes for backward compatibility
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-org', currentOrg);
    root.setAttribute('data-theme', effectiveColorScheme);
    root.classList.remove('light', 'dark');
    root.classList.add(effectiveColorScheme);

    // Set backward-compatible CSS custom properties from org theme
    const other = mergedTheme.other || {};
    root.style.setProperty('--lobbi-primary', getThemePrimaryColor(mergedTheme));
    root.style.setProperty('--lobbi-gradient', other.gradient || '');
    root.style.setProperty('--lobbi-gradient-btn', other.gradientButton || '');
    root.style.setProperty('--lobbi-gradient-hero', other.gradientHero || '');
    root.style.setProperty('--lobbi-gradient-card', other.gradientCard || '');
    root.style.setProperty('--lobbi-gradient-glow', other.gradientGlow || '');
    root.style.setProperty('--lobbi-avatar-bg', other.avatarBg || '');
    root.style.setProperty('--lobbi-glass-blur', other.glassBlur || '40px');
    root.style.setProperty('--lobbi-glass-opacity', String(other.glassOpacity ?? 0.08));
    root.style.setProperty('--lobbi-glass-border', other.glassBorder || '');
    root.style.setProperty('--lobbi-shadow-color', other.shadowColor || '');
    root.style.setProperty('--lobbi-transition-duration', other.transitionDuration || '250ms');
    root.style.setProperty('--lobbi-border', other.borderColor || '');
    root.style.setProperty('--lobbi-border-light', other.borderLight || '');
    root.style.setProperty('--lobbi-bg-primary', other.bgPrimary || '');
    root.style.setProperty('--lobbi-bg-secondary', other.bgSecondary || '');
    root.style.setProperty('--lobbi-bg-card', other.bgCard || '');
    root.style.setProperty('--lobbi-bg-surface', other.bgSurface || '');
    root.style.setProperty('--lobbi-text-primary', other.textPrimary || '');
    root.style.setProperty('--lobbi-text-secondary', other.textSecondary || '');
    root.style.setProperty('--lobbi-text-muted', other.textMuted || '');
    root.style.setProperty('--lobbi-font-display', mergedTheme.headings?.fontFamily || '');
    root.style.setProperty('--lobbi-font-body', mergedTheme.fontFamily || '');
    root.style.setProperty('--lobbi-letter-spacing', other.letterSpacing || '0');
  }, [currentOrg, mergedTheme, effectiveColorScheme]);

  // Org context value
  const orgContextValue = useMemo<OrgThemeContextValue>(
    () => ({
      currentOrg,
      setOrg: setCurrentOrg,
      availableOrgs: AVAILABLE_ORGS,
      theme: mergedTheme as MantineTheme,
    }),
    [currentOrg, mergedTheme]
  );

  // Mode context value
  const modeContextValue = useMemo<ThemeModeContextValue>(
    () => ({
      mode,
      setMode,
      resolvedMode,
    }),
    [mode, resolvedMode]
  );

  return (
    <MantineProvider
      theme={mergedTheme}
      defaultColorScheme={effectiveColorScheme}
      cssVariablesResolver={lobbiCssVariablesResolver}
    >
      <OrgThemeContext.Provider value={orgContextValue}>
        <ThemeModeContext.Provider value={modeContextValue}>
          <div
            data-org={currentOrg}
            data-theme={effectiveColorScheme}
            style={{
              minHeight: '100vh',
              display: 'contents',
            }}
          >
            {children}
          </div>
        </ThemeModeContext.Provider>
      </OrgThemeContext.Provider>
    </MantineProvider>
  );
}

// ============================================================================
// HELPER
// ============================================================================

function getThemePrimaryColor(theme: MantineTheme): string {
  const primaryColor = theme.primaryColor || 'gold';
  const colors = theme.colors?.[primaryColor];
  if (colors && Array.isArray(colors)) {
    return colors[6] || colors[4] || '#D4AF37';
  }
  return '#D4AF37';
}

// ============================================================================
// HOOKS (backward-compatible with ThemeProvider.v3.tsx)
// ============================================================================

/** Hook to access and set the current organization theme */
export function useOrgTheme(): OrgThemeContextValue {
  const context = useContext(OrgThemeContext);
  if (!context) {
    throw new Error('useOrgTheme must be used within LobbiMantineProvider');
  }
  return context;
}

/** Hook to access and set the color mode (light/dark) */
export function useThemeMode(): ThemeModeContextValue {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within LobbiMantineProvider');
  }
  return context;
}

/** Hook to get the current organization ID */
export function useCurrentOrg(): OrgId {
  const { currentOrg } = useOrgTheme();
  return currentOrg;
}

/** Hook to switch organizations. Returns [currentOrg, setOrg] */
export function useOrgSwitcher(): [OrgId, (org: OrgId) => void] {
  const { currentOrg, setOrg } = useOrgTheme();
  return [currentOrg, setOrg];
}

/** Hook to get the organization display name */
export function useOrgName(org?: OrgId): string {
  const { currentOrg } = useOrgTheme();
  return ORG_NAMES[org ?? currentOrg];
}

/** Hook to toggle color mode */
export function useColorModeToggle() {
  const { mode, setMode, resolvedMode } = useThemeMode();

  const toggle = useCallback(() => {
    if (mode === 'system') {
      setMode(resolvedMode === 'dark' ? 'light' : 'dark');
    } else {
      setMode(mode === 'dark' ? 'light' : 'dark');
    }
  }, [mode, resolvedMode, setMode]);

  return { toggle, mode, resolvedMode };
}

/** Hook to access the merged Mantine theme for current org */
export function useLobbiTheme(): MantineTheme {
  const { theme } = useOrgTheme();
  return theme;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default LobbiMantineProvider;

/**
 * Lobbi Mantine Provider
 *
 * Replaces the Chakra-based LobbiThemeProvider with Mantine v7.
 * Preserves org-specific theming via data-org attribute and CSS variables.
 * Keeps the same context API so hooks (useOrgTheme, useThemeMode, etc.) still work.
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ReactNode,
} from 'react'
import { MantineProvider, createTheme } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'

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
  | 'pixel-pioneers'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface OrgThemeContextValue {
  currentOrg: OrgId
  setOrg: (org: OrgId) => void
  availableOrgs: readonly OrgId[]
}

export interface ThemeModeContextValue {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  resolvedMode: 'light' | 'dark'
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
] as const

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
}

// ============================================================================
// MANTINE THEME
// ============================================================================

const lobbiMantineTheme = createTheme({
  fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif",
  fontFamilyMonospace: "'JetBrains Mono', 'Fira Code', monospace",
  headings: {
    fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
  },
  primaryColor: 'gold',
  colors: {
    gold: [
      '#FDF9EF',
      '#FBF3D5',
      '#F5E6A3',
      '#F4D03F',
      '#E5C76B',
      '#D4AF37',
      '#C5A028',
      '#8B7330',
      '#6B5720',
      '#4B3B14',
    ],
  },
  radius: {
    xs: '4px',
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  defaultRadius: 'lg',
  cursorType: 'pointer',
})

// ============================================================================
// CONTEXTS
// ============================================================================

const OrgThemeContext = createContext<OrgThemeContextValue | null>(null)
const ThemeModeContext = createContext<ThemeModeContextValue | null>(null)

// ============================================================================
// PROVIDER
// ============================================================================

export interface LobbiMantineProviderProps {
  children: ReactNode
  defaultOrg?: OrgId
  defaultMode?: ThemeMode
}

export function LobbiMantineProvider({
  children,
  defaultOrg = 'luxe-haven',
  defaultMode = 'light',
}: LobbiMantineProviderProps) {
  const [currentOrg, setCurrentOrg] = useState<OrgId>(defaultOrg)
  const [mode, setMode] = useState<ThemeMode>(defaultMode)

  const resolvedMode = useMemo(() => {
    if (mode === 'system') {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      }
      return 'light'
    }
    return mode
  }, [mode])

  const orgContextValue = useMemo<OrgThemeContextValue>(
    () => ({
      currentOrg,
      setOrg: setCurrentOrg,
      availableOrgs: AVAILABLE_ORGS,
    }),
    [currentOrg]
  )

  const modeContextValue = useMemo<ThemeModeContextValue>(
    () => ({
      mode,
      setMode,
      resolvedMode,
    }),
    [mode, resolvedMode]
  )

  // Apply color mode and org to html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedMode)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(resolvedMode)
  }, [resolvedMode])

  return (
    <MantineProvider theme={lobbiMantineTheme} forceColorScheme={resolvedMode}>
      <Notifications position="top-right" zIndex={9999} />
      <ModalsProvider>
        <OrgThemeContext.Provider value={orgContextValue}>
          <ThemeModeContext.Provider value={modeContextValue}>
            <div
              data-org={currentOrg}
              data-theme={resolvedMode}
              style={{
                minHeight: '100vh',
                display: 'contents',
              }}
            >
              {children}
            </div>
          </ThemeModeContext.Provider>
        </OrgThemeContext.Provider>
      </ModalsProvider>
    </MantineProvider>
  )
}

// ============================================================================
// HOOKS (same API as the Chakra version)
// ============================================================================

export function useOrgTheme(): OrgThemeContextValue {
  const context = useContext(OrgThemeContext)
  if (!context) {
    throw new Error('useOrgTheme must be used within LobbiMantineProvider')
  }
  return context
}

export function useThemeMode(): ThemeModeContextValue {
  const context = useContext(ThemeModeContext)
  if (!context) {
    throw new Error('useThemeMode must be used within LobbiMantineProvider')
  }
  return context
}

export function useCurrentOrg(): OrgId {
  const { currentOrg } = useOrgTheme()
  return currentOrg
}

export function useOrgSwitcher(): [OrgId, (org: OrgId) => void] {
  const { currentOrg, setOrg } = useOrgTheme()
  return [currentOrg, setOrg]
}

export function useOrgName(org?: OrgId): string {
  const { currentOrg } = useOrgTheme()
  return ORG_NAMES[org ?? currentOrg]
}

export function useColorModeToggle() {
  const { mode, setMode, resolvedMode } = useThemeMode()

  const toggle = useCallback(() => {
    if (mode === 'system') {
      setMode(resolvedMode === 'dark' ? 'light' : 'dark')
    } else {
      setMode(mode === 'dark' ? 'light' : 'dark')
    }
  }, [mode, resolvedMode, setMode])

  return { toggle, mode, resolvedMode }
}

export default LobbiMantineProvider

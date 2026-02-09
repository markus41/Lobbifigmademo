/**
 * Lobbi Theme Provider - Chakra UI v3
 *
 * Provides the Chakra v3 system with org-specific theming via data-org attribute.
 * Replaces the old ThemeProvider that used extendTheme.
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
import { ChakraProvider } from '@chakra-ui/react'
import { system } from './system'

// ============================================================================
// TYPES
// ============================================================================

/**
 * Organization IDs for multi-tenant theming
 */
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

/**
 * Theme mode (light/dark)
 */
export type ThemeMode = 'light' | 'dark' | 'system'

/**
 * Context value for org theming
 */
export interface OrgThemeContextValue {
  currentOrg: OrgId
  setOrg: (org: OrgId) => void
  availableOrgs: readonly OrgId[]
}

/**
 * Context value for theme mode
 */
export interface ThemeModeContextValue {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  resolvedMode: 'light' | 'dark'
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * All available organization IDs
 */
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

/**
 * Organization display names
 */
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
// CONTEXTS
// ============================================================================

const OrgThemeContext = createContext<OrgThemeContextValue | null>(null)
const ThemeModeContext = createContext<ThemeModeContextValue | null>(null)

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

export interface LobbiThemeProviderProps {
  children: ReactNode
  defaultOrg?: OrgId
  defaultMode?: ThemeMode
}

/**
 * Lobbi Theme Provider
 *
 * Wraps the app with Chakra's system and provides org-specific theming.
 * The data-org attribute on the wrapper enables org-specific conditions.
 */
export function LobbiThemeProvider({
  children,
  defaultOrg = 'luxe-haven',
  defaultMode = 'light',
}: LobbiThemeProviderProps) {
  const [currentOrg, setCurrentOrg] = useState<OrgId>(defaultOrg)
  const [mode, setMode] = useState<ThemeMode>(defaultMode)

  // Resolve system preference
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

  // Org context value
  const orgContextValue = useMemo<OrgThemeContextValue>(
    () => ({
      currentOrg,
      setOrg: setCurrentOrg,
      availableOrgs: AVAILABLE_ORGS,
    }),
    [currentOrg]
  )

  // Mode context value
  const modeContextValue = useMemo<ThemeModeContextValue>(
    () => ({
      mode,
      setMode,
      resolvedMode,
    }),
    [mode, resolvedMode]
  )

  // Apply color mode to html element for Chakra v3
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedMode)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(resolvedMode)
  }, [resolvedMode])

  return (
    <ChakraProvider value={system}>
      <OrgThemeContext.Provider value={orgContextValue}>
        <ThemeModeContext.Provider value={modeContextValue}>
          {/* The data-org attribute enables org-specific conditions in the theme */}
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
    </ChakraProvider>
  )
}

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Hook to access and set the current organization theme
 */
export function useOrgTheme(): OrgThemeContextValue {
  const context = useContext(OrgThemeContext)
  if (!context) {
    throw new Error('useOrgTheme must be used within LobbiThemeProvider')
  }
  return context
}

/**
 * Hook to access and set the color mode (light/dark)
 */
export function useThemeMode(): ThemeModeContextValue {
  const context = useContext(ThemeModeContext)
  if (!context) {
    throw new Error('useThemeMode must be used within LobbiThemeProvider')
  }
  return context
}

/**
 * Hook to get the current organization ID
 */
export function useCurrentOrg(): OrgId {
  const { currentOrg } = useOrgTheme()
  return currentOrg
}

/**
 * Hook to switch organizations
 */
export function useOrgSwitcher(): [OrgId, (org: OrgId) => void] {
  const { currentOrg, setOrg } = useOrgTheme()
  return [currentOrg, setOrg]
}

/**
 * Hook to get the organization display name
 */
export function useOrgName(org?: OrgId): string {
  const { currentOrg } = useOrgTheme()
  return ORG_NAMES[org ?? currentOrg]
}

/**
 * Hook to toggle color mode
 */
export function useColorModeToggle() {
  const { mode, setMode, resolvedMode } = useThemeMode()

  const toggle = useCallback(() => {
    if (mode === 'system') {
      // If system, switch to the opposite of resolved
      setMode(resolvedMode === 'dark' ? 'light' : 'dark')
    } else {
      // Otherwise toggle
      setMode(mode === 'dark' ? 'light' : 'dark')
    }
  }, [mode, resolvedMode, setMode])

  return { toggle, mode, resolvedMode }
}

// ============================================================================
// EXPORTS
// ============================================================================

export default LobbiThemeProvider

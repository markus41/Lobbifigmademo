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

interface OrgMantineTokens {
  primary: string
  primaryLight: string
  primaryDark: string
  accent: string
  fontDisplay: string
}

const DEFAULT_TOKENS: OrgMantineTokens = {
  primary: '#D4AF37',
  primaryLight: '#F4D03F',
  primaryDark: '#8B7330',
  accent: '#8B4513',
  fontDisplay: "'DM Serif Display', 'Playfair Display', Georgia, serif",
}

function clampByte(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)))
}

function hexToRgb(hex: string): [number, number, number] | null {
  const normalized = hex.trim().replace('#', '')
  if (![3, 6].includes(normalized.length)) {
    return null
  }

  const fullHex =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => `${c}${c}`)
          .join('')
      : normalized

  const parsed = Number.parseInt(fullHex, 16)
  if (Number.isNaN(parsed)) {
    return null
  }

  return [(parsed >> 16) & 255, (parsed >> 8) & 255, parsed & 255]
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b]
    .map((v) => clampByte(v).toString(16).padStart(2, '0'))
    .join('')}`
}

function mixHex(baseHex: string, mixWithHex: string, amount: number): string {
  const base = hexToRgb(baseHex)
  const mixWith = hexToRgb(mixWithHex)
  if (!base || !mixWith) {
    return baseHex
  }

  const t = Math.max(0, Math.min(1, amount))
  const mixed = base.map((v, i) => v * (1 - t) + mixWith[i] * t) as [number, number, number]
  return rgbToHex(mixed[0], mixed[1], mixed[2])
}

type MantineColorTuple = [string, string, string, string, string, string, string, string, string, string]

function makeMantineScale(primary: string, light: string, dark: string): MantineColorTuple {
  return [
    mixHex(light, '#ffffff', 0.78),
    mixHex(light, '#ffffff', 0.62),
    mixHex(light, '#ffffff', 0.44),
    mixHex(light, '#ffffff', 0.24),
    light,
    primary,
    mixHex(primary, dark, 0.4),
    dark,
    mixHex(dark, '#000000', 0.24),
    mixHex(dark, '#000000', 0.42),
  ]
}

function cssVar(style: CSSStyleDeclaration, key: string, fallback: string): string {
  const value = style.getPropertyValue(key).trim()
  return value || fallback
}

function applyComputedThemeFallbacks(tokens: OrgMantineTokens, mode: 'light' | 'dark'): void {
  const root = document.documentElement

  const primaryPale = mixHex(tokens.primaryLight, '#ffffff', mode === 'dark' ? 0.2 : 0.62)
  const border = mode === 'dark' ? mixHex(tokens.primaryDark, '#ffffff', 0.22) : mixHex(tokens.primaryLight, '#000000', 0.14)
  const borderLight = mode === 'dark' ? mixHex(tokens.primaryDark, '#ffffff', 0.1) : mixHex(tokens.primaryLight, '#ffffff', 0.45)
  const bgPrimary = mode === 'dark' ? mixHex(tokens.primaryDark, '#000000', 0.88) : mixHex(tokens.primaryLight, '#ffffff', 0.9)
  const bgSecondary = mode === 'dark' ? mixHex(tokens.primaryDark, '#000000', 0.8) : mixHex(tokens.primaryLight, '#ffffff', 0.82)
  const bgTertiary = mode === 'dark' ? mixHex(tokens.primaryDark, '#000000', 0.68) : mixHex(tokens.primaryLight, '#ffffff', 0.72)
  const bgMuted = mode === 'dark' ? mixHex(tokens.primaryDark, '#000000', 0.6) : mixHex(tokens.primaryLight, '#ffffff', 0.6)
  const textPrimary = mode === 'dark' ? '#F5F5F5' : mixHex(tokens.primaryDark, '#000000', 0.72)
  const textSecondary = mode === 'dark' ? '#D4D4D8' : mixHex(tokens.primaryDark, '#000000', 0.46)
  const textMuted = mode === 'dark' ? '#A1A1AA' : mixHex(tokens.primaryDark, '#000000', 0.25)

  root.style.setProperty('--theme-primary-pale', primaryPale)
  root.style.setProperty('--theme-gradient-btn', `linear-gradient(135deg, ${tokens.primaryDark}, ${tokens.primary})`)
  root.style.setProperty('--theme-bg-primary', bgPrimary)
  root.style.setProperty('--theme-bg-secondary', bgSecondary)
  root.style.setProperty('--theme-bg-tertiary', bgTertiary)
  root.style.setProperty('--theme-bg-card', mode === 'dark' ? mixHex(tokens.primaryDark, '#000000', 0.78) : '#FFFFFF')
  root.style.setProperty('--theme-bg-muted', bgMuted)
  root.style.setProperty('--theme-bg-highlight', mode === 'dark' ? 'rgba(255,255,255,0.04)' : `rgba(${cssVar(getComputedStyle(root), '--theme-primary-rgb', '212,175,55')}, 0.06)`)
  root.style.setProperty('--theme-border', border)
  root.style.setProperty('--theme-border-light', borderLight)
  root.style.setProperty('--theme-text-primary', textPrimary)
  root.style.setProperty('--theme-text-secondary', textSecondary)
  root.style.setProperty('--theme-text-muted', textMuted)
  root.style.setProperty('--theme-text-inverse', '#FFFFFF')
  root.style.setProperty('--theme-accent-light', mixHex(tokens.accent, '#ffffff', 0.52))
  root.style.setProperty('--theme-secondary', tokens.accent)
  root.style.setProperty('--theme-secondary-light', mixHex(tokens.accent, '#ffffff', 0.42))
}

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
  const [orgTokens, setOrgTokens] = useState<OrgMantineTokens>(DEFAULT_TOKENS)

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

  useEffect(() => {
    document.documentElement.setAttribute('data-org', currentOrg)
  }, [currentOrg])

  useEffect(() => {
    const root = document.documentElement
    const style = getComputedStyle(root)
    const nextTokens: OrgMantineTokens = {
      primary: cssVar(style, '--theme-primary', DEFAULT_TOKENS.primary),
      primaryLight: cssVar(style, '--theme-primary-light', DEFAULT_TOKENS.primaryLight),
      primaryDark: cssVar(style, '--theme-primary-dark', DEFAULT_TOKENS.primaryDark),
      accent: cssVar(style, '--theme-accent', DEFAULT_TOKENS.accent),
      fontDisplay: cssVar(style, '--theme-font-display', DEFAULT_TOKENS.fontDisplay),
    }
    setOrgTokens(nextTokens)
    applyComputedThemeFallbacks(nextTokens, resolvedMode)
  }, [currentOrg, resolvedMode])

  const mantineTheme = useMemo(
    () =>
      createTheme({
        fontFamily: "var(--font-body, 'Sora', 'DM Sans', system-ui, sans-serif)",
        fontFamilyMonospace: "var(--font-mono, 'IBM Plex Mono', 'JetBrains Mono', monospace)",
        headings: {
          fontFamily: orgTokens.fontDisplay,
        },
        primaryColor: 'brand',
        colors: {
          brand: makeMantineScale(orgTokens.primary, orgTokens.primaryLight, orgTokens.primaryDark),
          accent: makeMantineScale(orgTokens.accent, mixHex(orgTokens.accent, '#ffffff', 0.4), mixHex(orgTokens.accent, '#000000', 0.35)),
        },
        radius: {
          xs: '4px',
          sm: '8px',
          md: '12px',
          lg: '16px',
          xl: '20px',
        },
        defaultRadius: 'md',
        cursorType: 'pointer',
      }),
    [orgTokens]
  )

  return (
    <MantineProvider theme={mantineTheme} forceColorScheme={resolvedMode}>
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

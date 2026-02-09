/**
 * Lobbi Mantine Theme System - Public API
 *
 * Central barrel export for the entire Mantine theme system.
 * Import everything from '@/mantine-theme' or 'src/mantine-theme'.
 */

// -- Base Theme --
export { lobbiBaseTheme } from './theme';

// -- Organization Overrides --
export { ORG_THEME_OVERRIDES } from './org-themes';

// -- Provider & Core Hooks --
export {
  LobbiMantineProvider,
  useOrgTheme,
  useThemeMode,
  useCurrentOrg,
  useOrgSwitcher,
  useOrgName,
  useColorModeToggle,
  useLobbiTheme,
  AVAILABLE_ORGS,
  ORG_NAMES,
  type OrgId,
  type ThemeMode,
  type OrgThemeContextValue,
  type ThemeModeContextValue,
  type LobbiMantineProviderProps,
} from './MantineThemeProvider';

// -- CSS Variables Resolver --
export { lobbiCssVariablesResolver } from './css-variables';

// -- Org-Specific Hooks --
export {
  useOrgColors,
  useOrgGradients,
  useOrgMotion,
  useOrgStyles,
  type OrgColorPalette,
  type OrgGradients,
  type OrgMotionConfig,
  type OrgStylePresets,
} from './hooks';

// -- Default Export --
export { LobbiMantineProvider as default } from './MantineThemeProvider';

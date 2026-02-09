/**
 * The Lobbi - Theme System
 * Design tokens and theming constants for the luxury hotel-themed AMS
 *
 * Uses CSS custom properties (--t-*) for multi-org theming
 * Font families: Cormorant Garamond (display), DM Sans (body)
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

export const colors = {
  // Brand Gold (Default Theme - Luxe Haven)
  gold: {
    50: '#FAF6E9',
    100: '#F5E6A3',
    200: '#F4D03F',
    300: '#E6C02B',
    400: '#D4AF37', // Primary
    500: '#C5A028',
    600: '#A38520',
    700: '#8B7330',
    800: '#6B5820',
    900: '#4A3D15',
  },

  // Neutral/Cream tones
  cream: {
    50: '#FAF6E9',
    100: '#F7F4EE',
    200: '#F0ECE2',
    300: '#EDE8DD',
    400: '#E4E0D5',
    500: '#D4D0C5',
    600: '#C4BCAB',
    700: '#B8B0A0',
    800: '#9A9489',
    900: '#8A8578',
  },

  // Dark tones (for sidebar, backgrounds)
  dark: {
    50: '#2C2A25',
    100: '#252320',
    200: '#1F1D1A',
    300: '#1A1610',
    400: '#151412',
    500: '#111110',
    600: '#0D0C0B',
    700: '#0A0806',
    800: '#060503',
    900: '#030201',
  },

  // Status colors (desaturated to not clash with themes)
  success: '#3D7B5F',
  warning: '#B89E4A',
  error: '#B85C4A',
  info: '#2E6B8A',

  // Text colors
  text: {
    primary: '#2C2A25',
    secondary: '#5A5247',
    muted: '#8A8578',
    light: '#B8B0A0',
    inverse: '#FAF6E9',
  },

  // Surface colors
  surface: {
    page: '#F7F4EE',
    card: '#FFFFFF',
    cardBorder: '#EDE8DD',
    sidebar: 'linear-gradient(180deg, #151412 0%, #111110 100%)',
  },
};

// =============================================================================
// MULTI-ORG THEMES
// =============================================================================

export interface OrgTheme {
  id: string;
  name: string;
  primary: string;
  primaryLight: string;
  primaryPale: string;
  primaryDark: string;
  primaryRgb: string;
  gradientBtn: string;
  avatarBg: string;
  metric1: string;
  metric2: string;
  metric3: string;
  metric4: string;
}

export const themes: Record<string, OrgTheme> = {
  luxeHaven: {
    id: 'luxeHaven',
    name: 'Luxe Haven',
    primary: '#D4AF37',
    primaryLight: '#F4D03F',
    primaryPale: '#F5E6A3',
    primaryDark: '#8B7330',
    primaryRgb: '212,175,55',
    gradientBtn: 'linear-gradient(135deg, #F4D03F 0%, #D4AF37 50%, #8B7330 100%)',
    avatarBg: 'linear-gradient(135deg, #F4D03F 0%, #D4AF37 50%, #8B7330 100%)',
    metric1: 'linear-gradient(90deg, #D4AF37, #F4D03F)',
    metric2: 'linear-gradient(90deg, #C5A028, #D4AF37)',
    metric3: 'linear-gradient(90deg, #A38520, #C5A028)',
    metric4: 'linear-gradient(90deg, #8B7330, #A38520)',
  },
  pacificClub: {
    id: 'pacificClub',
    name: 'Pacific Club',
    primary: '#2E6B8A',
    primaryLight: '#3D8EB8',
    primaryPale: '#B8D4E3',
    primaryDark: '#1E4660',
    primaryRgb: '46,107,138',
    gradientBtn: 'linear-gradient(135deg, #3D8EB8 0%, #2E6B8A 50%, #1E4660 100%)',
    avatarBg: 'linear-gradient(135deg, #3D8EB8 0%, #2E6B8A 50%, #1E4660 100%)',
    metric1: 'linear-gradient(90deg, #2E6B8A, #3D8EB8)',
    metric2: 'linear-gradient(90deg, #256A7C, #2E6B8A)',
    metric3: 'linear-gradient(90deg, #1E4660, #256A7C)',
    metric4: 'linear-gradient(90deg, #153040, #1E4660)',
  },
  summitGroup: {
    id: 'summitGroup',
    name: 'Summit Group',
    primary: '#8B6B3E',
    primaryLight: '#B8935A',
    primaryPale: '#E3D4B8',
    primaryDark: '#5C4628',
    primaryRgb: '139,107,62',
    gradientBtn: 'linear-gradient(135deg, #B8935A 0%, #8B6B3E 50%, #5C4628 100%)',
    avatarBg: 'linear-gradient(135deg, #B8935A 0%, #8B6B3E 50%, #5C4628 100%)',
    metric1: 'linear-gradient(90deg, #8B6B3E, #B8935A)',
    metric2: 'linear-gradient(90deg, #7A5E35, #8B6B3E)',
    metric3: 'linear-gradient(90deg, #5C4628, #7A5E35)',
    metric4: 'linear-gradient(90deg, #3E2F1A, #5C4628)',
  },
  verdeCollective: {
    id: 'verdeCollective',
    name: 'Verde Collective',
    primary: '#3D7B5F',
    primaryLight: '#5A9E7F',
    primaryPale: '#B8E3D0',
    primaryDark: '#285240',
    primaryRgb: '61,123,95',
    gradientBtn: 'linear-gradient(135deg, #5A9E7F 0%, #3D7B5F 50%, #285240 100%)',
    avatarBg: 'linear-gradient(135deg, #5A9E7F 0%, #3D7B5F 50%, #285240 100%)',
    metric1: 'linear-gradient(90deg, #3D7B5F, #5A9E7F)',
    metric2: 'linear-gradient(90deg, #346B52, #3D7B5F)',
    metric3: 'linear-gradient(90deg, #285240, #346B52)',
    metric4: 'linear-gradient(90deg, #1A3628, #285240)',
  },
  crownEstates: {
    id: 'crownEstates',
    name: 'Crown Estates',
    primary: '#6E3D7B',
    primaryLight: '#935AA0',
    primaryPale: '#D4B8E3',
    primaryDark: '#462852',
    primaryRgb: '110,61,123',
    gradientBtn: 'linear-gradient(135deg, #935AA0 0%, #6E3D7B 50%, #462852 100%)',
    avatarBg: 'linear-gradient(135deg, #935AA0 0%, #6E3D7B 50%, #462852 100%)',
    metric1: 'linear-gradient(90deg, #6E3D7B, #935AA0)',
    metric2: 'linear-gradient(90deg, #5E346B, #6E3D7B)',
    metric3: 'linear-gradient(90deg, #462852, #5E346B)',
    metric4: 'linear-gradient(90deg, #2E1A36, #462852)',
  },
};

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const typography = {
  fonts: {
    heading: "'Cormorant Garamond', Georgia, serif",
    body: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  fontSizes: {
    xs: '10px',
    sm: '11px',
    base: '13px',
    md: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '22px',
    '3xl': '26px',
    '4xl': '32px',
    '5xl': '40px',
    '6xl': '54px',
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
  letterSpacings: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.06em',
    wider: '0.1em',
    widest: '0.15em',
    label: '0.18em',
    display: '0.45em',
  },
};

// =============================================================================
// SPACING & LAYOUT
// =============================================================================

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
};

export const layout = {
  sidebarWidth: '240px',
  sidebarCollapsedWidth: '72px',
  topbarHeight: '64px',
  contentPadding: '24px 28px',
  contentGap: '24px',
  cardPadding: '20px',
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
};

// =============================================================================
// SHADOWS
// =============================================================================

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
  md: '0 4px 8px rgba(0, 0, 0, 0.06)',
  lg: '0 8px 16px rgba(0, 0, 0, 0.08)',
  xl: '0 12px 24px rgba(0, 0, 0, 0.1)',
  cardHover: '0 4px 16px rgba(0, 0, 0, 0.06)',
  gold: '0 4px 20px rgba(212, 175, 55, 0.15)',
};

// =============================================================================
// ANIMATIONS
// =============================================================================

export const animations = {
  easing: {
    default: [0.4, 0, 0.2, 1],
    smooth: [0.22, 1, 0.36, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
  },
  durations: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    cinematic: 1.2,
  },
};

// =============================================================================
// BREAKPOINTS
// =============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// =============================================================================
// CSS VARIABLES GENERATOR
// =============================================================================

export function generateCSSVariables(theme: OrgTheme): Record<string, string> {
  return {
    '--t-primary': theme.primary,
    '--t-primary-light': theme.primaryLight,
    '--t-primary-pale': theme.primaryPale,
    '--t-primary-dark': theme.primaryDark,
    '--t-primary-rgb': theme.primaryRgb,
    '--t-gradient-btn': theme.gradientBtn,
    '--t-avatar-bg': theme.avatarBg,
    '--t-metric1': theme.metric1,
    '--t-metric2': theme.metric2,
    '--t-metric3': theme.metric3,
    '--t-metric4': theme.metric4,
  };
}

// Chakra v3 System & Recipes
export { system, config } from './system';
export {
  lobbiButtonRecipe,
  lobbiCardRecipe,
  lobbiInputRecipe,
  lobbiBadgeRecipe,
  lobbiNavItemRecipe,
} from './system';

// Org Theme Registry
export { orgThemeRegistry, getOrgTheme } from './orgThemeRegistry';

// Default export
export default {
  colors,
  themes,
  typography,
  spacing,
  layout,
  shadows,
  animations,
  breakpoints,
};

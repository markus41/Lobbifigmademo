// ============================================================================
// COMPREHENSIVE MULTI-ORGANIZATION THEME SYSTEM
// ============================================================================
// 15 Organizations with full theme customization including:
// - Color palettes (primary, secondary, accent with full scales)
// - Typography (font pairings, weights)
// - Shadows and depth
// - Border and corner styles
// - Animation presets
// - Glass/blur effects
// - Gradient styles
// ============================================================================

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;  // Primary shade
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface OrgTheme {
  // Core Brand Colors
  primary: string;
  primaryLight: string;
  primaryPale: string;
  primaryDark: string;
  primaryRgb: string;

  // Secondary Color
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  secondaryRgb: string;

  // Accent Color
  accent: string;
  accentLight: string;
  accentDark: string;
  accentRgb: string;

  // Full Color Scales
  primaryScale: ColorScale;
  secondaryScale: ColorScale;
  accentScale: ColorScale;

  // Backgrounds
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  bgCard: string;
  bgSurface: string;
  bgOverlay: string;
  bgMuted: string;

  // Text Colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  textAccent: string;

  // Borders
  borderColor: string;
  borderLight: string;
  borderFocus: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'double';

  // Shadows
  shadowColor: string;
  shadowColorRgb: string;
  shadowIntensity: 'subtle' | 'medium' | 'strong' | 'dramatic';

  // Gradients
  gradient: string;
  gradientBtn: string;
  gradientCard: string;
  gradientHero: string;
  gradientDirection: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl';
  avatarBg: string;

  // Typography
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
  fontWeightHeading: '400' | '500' | '600' | '700' | '800' | '900';
  fontWeightBody: '300' | '400' | '500';
  letterSpacing: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';

  // Animation & Motion
  animationStyle: 'subtle' | 'smooth' | 'energetic' | 'dramatic' | 'elegant';
  transitionDuration: 'fast' | 'normal' | 'slow' | 'slower';

  // Glass/Blur Effects
  glassEnabled: boolean;
  glassOpacity: number;
  glassBlur: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

  // Button Styles
  buttonStyle: 'rounded' | 'pill' | 'sharp' | 'soft';
  buttonShadow: boolean;

  // Card Styles
  cardStyle: 'flat' | 'raised' | 'outlined' | 'glass';
  cardHoverEffect: 'none' | 'lift' | 'glow' | 'scale' | 'border';

  // Special Effects
  hasGradientText: boolean;
  hasAnimatedBorders: boolean;
  hasGlowEffects: boolean;

  // Theme Mode Preference
  prefersDark: boolean;
}

export interface Organization {
  id: string;
  name: string;
  short: string;
  motto: string;
  logoLetter: string;
  industry: 'hospitality' | 'finance' | 'technology' | 'healthcare' | 'education' | 'lifestyle' | 'luxury' | 'nonprofit';
  aesthetic: 'classic' | 'modern' | 'minimalist' | 'luxurious' | 'playful' | 'corporate' | 'artistic' | 'nature';
  theme: OrgTheme;
}

export interface Account {
  email: string;
  name: string;
  first: string;
  last: string;
  initials: string;
  role: string;
  orgId: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function generateColorScale(baseHue: number, baseSat: number, baseLightness: number): ColorScale {
  return {
    50: `hsl(${baseHue}, ${Math.min(baseSat + 10, 100)}%, 97%)`,
    100: `hsl(${baseHue}, ${Math.min(baseSat + 5, 100)}%, 94%)`,
    200: `hsl(${baseHue}, ${baseSat}%, 86%)`,
    300: `hsl(${baseHue}, ${baseSat}%, 74%)`,
    400: `hsl(${baseHue}, ${baseSat}%, 60%)`,
    500: `hsl(${baseHue}, ${baseSat}%, ${baseLightness}%)`,
    600: `hsl(${baseHue}, ${baseSat}%, ${baseLightness - 8}%)`,
    700: `hsl(${baseHue}, ${baseSat}%, ${baseLightness - 16}%)`,
    800: `hsl(${baseHue}, ${baseSat}%, ${baseLightness - 24}%)`,
    900: `hsl(${baseHue}, ${baseSat}%, ${baseLightness - 32}%)`,
    950: `hsl(${baseHue}, ${Math.min(baseSat + 10, 100)}%, ${baseLightness - 40}%)`,
  };
}

// ============================================================================
// ORGANIZATIONS (15 Diverse Themes)
// ============================================================================

export const ORGANIZATIONS: Record<string, Organization> = {
  // 1. LUXE HAVEN RESORT - Classic Gold Luxury
  'luxe-haven': {
    id: 'luxe-haven',
    name: 'Luxe Haven Resort',
    short: 'Luxe Haven',
    motto: 'Where every detail speaks of excellence',
    logoLetter: 'LH',
    industry: 'hospitality',
    aesthetic: 'luxurious',
    theme: {
      primary: '#D4AF37',
      primaryLight: '#F4D03F',
      primaryPale: '#FBF3D5',
      primaryDark: '#8B7330',
      primaryRgb: '212,175,55',

      secondary: '#1A1A2E',
      secondaryLight: '#2D2D44',
      secondaryDark: '#0F0F1A',
      secondaryRgb: '26,26,46',

      accent: '#C9A227',
      accentLight: '#E6C94A',
      accentDark: '#9E7B1A',
      accentRgb: '201,162,39',

      primaryScale: generateColorScale(45, 75, 55),
      secondaryScale: generateColorScale(240, 25, 15),
      accentScale: generateColorScale(48, 80, 50),

      bgPrimary: '#FAF6E9',
      bgSecondary: '#F5EFD9',
      bgTertiary: '#EDE4C5',
      bgCard: '#FFFFFF',
      bgSurface: '#FFFDF7',
      bgOverlay: 'rgba(26, 26, 46, 0.8)',
      bgMuted: '#F0EBD8',

      textPrimary: '#1A1A2E',
      textSecondary: '#4A4A5A',
      textMuted: '#7A7A8A',
      textInverse: '#FFFFFF',
      textAccent: '#D4AF37',

      borderColor: '#E5DCC3',
      borderLight: '#F0EBD8',
      borderFocus: '#D4AF37',
      borderRadius: 'md',
      borderStyle: 'solid',

      shadowColor: 'rgba(212, 175, 55, 0.15)',
      shadowColorRgb: '212,175,55',
      shadowIntensity: 'medium',

      gradient: 'linear-gradient(135deg, #F5E6A3, #D4AF37, #8B7330)',
      gradientBtn: 'linear-gradient(135deg, #8B7330, #D4AF37)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF7 100%)',
      gradientHero: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D44 50%, #D4AF37 100%)',
      gradientDirection: 'to-br',
      avatarBg: 'linear-gradient(135deg, #D4AF37, #8B7330)',

      fontDisplay: '"Playfair Display", Georgia, serif',
      fontBody: '"Inter", system-ui, sans-serif',
      fontMono: '"Fira Code", monospace',
      fontWeightHeading: '700',
      fontWeightBody: '400',
      letterSpacing: 'normal',

      animationStyle: 'elegant',
      transitionDuration: 'normal',

      glassEnabled: true,
      glassOpacity: 0.9,
      glassBlur: 'xl',

      buttonStyle: 'rounded',
      buttonShadow: true,

      cardStyle: 'raised',
      cardHoverEffect: 'lift',

      hasGradientText: true,
      hasAnimatedBorders: false,
      hasGlowEffects: true,

      prefersDark: false,
    },
  },

  // 2. PACIFIC CLUB - Ocean Blue Coastal
  'pacific-club': {
    id: 'pacific-club',
    name: 'The Pacific Club',
    short: 'Pacific Club',
    motto: 'Excellence is not a destination, it\'s a standard',
    logoLetter: 'PC',
    industry: 'lifestyle',
    aesthetic: 'classic',
    theme: {
      primary: '#2E6B8A',
      primaryLight: '#5AA3C4',
      primaryPale: '#D6EAF5',
      primaryDark: '#1A4459',
      primaryRgb: '46,107,138',

      secondary: '#F8F4E8',
      secondaryLight: '#FFFDF7',
      secondaryDark: '#E8E0C8',
      secondaryRgb: '248,244,232',

      accent: '#E07B4D',
      accentLight: '#F5A27A',
      accentDark: '#B55A30',
      accentRgb: '224,123,77',

      primaryScale: generateColorScale(200, 50, 45),
      secondaryScale: generateColorScale(42, 50, 95),
      accentScale: generateColorScale(20, 75, 60),

      bgPrimary: '#F8FBFD',
      bgSecondary: '#EFF5F8',
      bgTertiary: '#E4EEF3',
      bgCard: '#FFFFFF',
      bgSurface: '#FAFCFD',
      bgOverlay: 'rgba(26, 68, 89, 0.85)',
      bgMuted: '#E8F0F4',

      textPrimary: '#1A3A4A',
      textSecondary: '#4A6A7A',
      textMuted: '#7A9AAA',
      textInverse: '#FFFFFF',
      textAccent: '#2E6B8A',

      borderColor: '#C8DDE8',
      borderLight: '#E4EEF3',
      borderFocus: '#2E6B8A',
      borderRadius: 'lg',
      borderStyle: 'solid',

      shadowColor: 'rgba(46, 107, 138, 0.12)',
      shadowColorRgb: '46,107,138',
      shadowIntensity: 'subtle',

      gradient: 'linear-gradient(135deg, #A8D4E8, #2E6B8A, #1A4459)',
      gradientBtn: 'linear-gradient(135deg, #1A4459, #2E6B8A)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #F8FBFD 100%)',
      gradientHero: 'linear-gradient(180deg, #2E6B8A 0%, #1A4459 100%)',
      gradientDirection: 'to-b',
      avatarBg: 'linear-gradient(135deg, #2E6B8A, #1A4459)',

      fontDisplay: '"Cormorant Garamond", Georgia, serif',
      fontBody: '"Source Sans 3", system-ui, sans-serif',
      fontMono: '"IBM Plex Mono", monospace',
      fontWeightHeading: '600',
      fontWeightBody: '400',
      letterSpacing: 'wide',

      animationStyle: 'smooth',
      transitionDuration: 'normal',

      glassEnabled: true,
      glassOpacity: 0.85,
      glassBlur: 'lg',

      buttonStyle: 'rounded',
      buttonShadow: false,

      cardStyle: 'outlined',
      cardHoverEffect: 'border',

      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: false,

      prefersDark: false,
    },
  },

  // 3. SUMMIT HOSPITALITY GROUP - Earthy Bronze
  'summit-group': {
    id: 'summit-group',
    name: 'Summit Hospitality Group',
    short: 'Summit Group',
    motto: 'Reaching new heights, together',
    logoLetter: 'SH',
    industry: 'hospitality',
    aesthetic: 'nature',
    theme: {
      primary: '#8B6B3E',
      primaryLight: '#B89E6A',
      primaryPale: '#F0E6D2',
      primaryDark: '#6B4E2E',
      primaryRgb: '139,107,62',

      secondary: '#2C4A3E',
      secondaryLight: '#3D6B54',
      secondaryDark: '#1A2E26',
      secondaryRgb: '44,74,62',

      accent: '#D97706',
      accentLight: '#F59E0B',
      accentDark: '#B45309',
      accentRgb: '217,119,6',

      primaryScale: generateColorScale(35, 55, 45),
      secondaryScale: generateColorScale(155, 35, 30),
      accentScale: generateColorScale(32, 95, 45),

      bgPrimary: '#FAF8F5',
      bgSecondary: '#F5F0E8',
      bgTertiary: '#EDE4D6',
      bgCard: '#FFFFFF',
      bgSurface: '#FDFCFA',
      bgOverlay: 'rgba(44, 74, 62, 0.85)',
      bgMuted: '#EDE8DF',

      textPrimary: '#2C3E36',
      textSecondary: '#5A6B62',
      textMuted: '#8A9B92',
      textInverse: '#FFFFFF',
      textAccent: '#8B6B3E',

      borderColor: '#D4C8B8',
      borderLight: '#E8E0D4',
      borderFocus: '#8B6B3E',
      borderRadius: 'md',
      borderStyle: 'solid',

      shadowColor: 'rgba(139, 107, 62, 0.12)',
      shadowColorRgb: '139,107,62',
      shadowIntensity: 'medium',

      gradient: 'linear-gradient(135deg, #D4C4A0, #8B6B3E, #6B4E2E)',
      gradientBtn: 'linear-gradient(135deg, #6B4E2E, #8B6B3E)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)',
      gradientHero: 'linear-gradient(135deg, #2C4A3E 0%, #8B6B3E 100%)',
      gradientDirection: 'to-br',
      avatarBg: 'linear-gradient(135deg, #8B6B3E, #6B4E2E)',

      fontDisplay: '"Libre Baskerville", Georgia, serif',
      fontBody: '"Nunito", system-ui, sans-serif',
      fontMono: '"JetBrains Mono", monospace',
      fontWeightHeading: '700',
      fontWeightBody: '400',
      letterSpacing: 'normal',

      animationStyle: 'subtle',
      transitionDuration: 'slow',

      glassEnabled: false,
      glassOpacity: 0.9,
      glassBlur: 'md',

      buttonStyle: 'soft',
      buttonShadow: true,

      cardStyle: 'raised',
      cardHoverEffect: 'lift',

      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: false,

      prefersDark: false,
    },
  },

  // 4. VERDE COLLECTIVE - Fresh Forest Green
  'verde-collective': {
    id: 'verde-collective',
    name: 'Verde Collective',
    short: 'Verde',
    motto: 'Cultivating connection, naturally',
    logoLetter: 'VC',
    industry: 'nonprofit',
    aesthetic: 'nature',
    theme: {
      primary: '#3D7B5F',
      primaryLight: '#5FAF8B',
      primaryPale: '#D4F0E2',
      primaryDark: '#2A5742',
      primaryRgb: '61,123,95',

      secondary: '#F5F0E1',
      secondaryLight: '#FFFDF5',
      secondaryDark: '#E8DFC8',
      secondaryRgb: '245,240,225',

      accent: '#E8B54D',
      accentLight: '#F5D078',
      accentDark: '#C99530',
      accentRgb: '232,181,77',

      primaryScale: generateColorScale(150, 50, 45),
      secondaryScale: generateColorScale(45, 45, 95),
      accentScale: generateColorScale(42, 80, 60),

      bgPrimary: '#F7FAF8',
      bgSecondary: '#EDF5F0',
      bgTertiary: '#E0EDE6',
      bgCard: '#FFFFFF',
      bgSurface: '#FBFDFB',
      bgOverlay: 'rgba(42, 87, 66, 0.85)',
      bgMuted: '#E6F0EA',

      textPrimary: '#1A3A2C',
      textSecondary: '#3D5A4A',
      textMuted: '#6A8A7A',
      textInverse: '#FFFFFF',
      textAccent: '#3D7B5F',

      borderColor: '#C0D8CC',
      borderLight: '#DCE8E2',
      borderFocus: '#3D7B5F',
      borderRadius: 'xl',
      borderStyle: 'solid',

      shadowColor: 'rgba(61, 123, 95, 0.10)',
      shadowColorRgb: '61,123,95',
      shadowIntensity: 'subtle',

      gradient: 'linear-gradient(135deg, #A8DCC4, #3D7B5F, #2A5742)',
      gradientBtn: 'linear-gradient(135deg, #2A5742, #3D7B5F)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #F7FAF8 100%)',
      gradientHero: 'linear-gradient(160deg, #2A5742 0%, #3D7B5F 50%, #5FAF8B 100%)',
      gradientDirection: 'to-br',
      avatarBg: 'linear-gradient(135deg, #3D7B5F, #2A5742)',

      fontDisplay: '"DM Serif Display", Georgia, serif',
      fontBody: '"DM Sans", system-ui, sans-serif',
      fontMono: '"Fira Code", monospace',
      fontWeightHeading: '500',
      fontWeightBody: '400',
      letterSpacing: 'normal',

      animationStyle: 'smooth',
      transitionDuration: 'normal',

      glassEnabled: true,
      glassOpacity: 0.8,
      glassBlur: 'lg',

      buttonStyle: 'pill',
      buttonShadow: false,

      cardStyle: 'flat',
      cardHoverEffect: 'glow',

      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: true,

      prefersDark: false,
    },
  },

  // 5. CROWN ESTATES - Regal Purple
  'crown-estates': {
    id: 'crown-estates',
    name: 'Crown Estates International',
    short: 'Crown Estates',
    motto: 'A legacy of distinction',
    logoLetter: 'CE',
    industry: 'luxury',
    aesthetic: 'luxurious',
    theme: {
      primary: '#6E3D7B',
      primaryLight: '#9B6BAB',
      primaryPale: '#EBD8F0',
      primaryDark: '#4A2854',
      primaryRgb: '110,61,123',

      secondary: '#F8F5E8',
      secondaryLight: '#FFFDF5',
      secondaryDark: '#EBE4CF',
      secondaryRgb: '248,245,232',

      accent: '#D4AF37',
      accentLight: '#E8C95A',
      accentDark: '#B8942A',
      accentRgb: '212,175,55',

      primaryScale: generateColorScale(285, 50, 40),
      secondaryScale: generateColorScale(48, 45, 95),
      accentScale: generateColorScale(45, 75, 55),

      bgPrimary: '#FAF8FC',
      bgSecondary: '#F5F0F8',
      bgTertiary: '#EDE4F2',
      bgCard: '#FFFFFF',
      bgSurface: '#FDFBFE',
      bgOverlay: 'rgba(74, 40, 84, 0.88)',
      bgMuted: '#F0E8F4',

      textPrimary: '#2A1A30',
      textSecondary: '#5A4A62',
      textMuted: '#8A7A92',
      textInverse: '#FFFFFF',
      textAccent: '#6E3D7B',

      borderColor: '#D8C8E0',
      borderLight: '#EBE0F0',
      borderFocus: '#6E3D7B',
      borderRadius: 'lg',
      borderStyle: 'solid',

      shadowColor: 'rgba(110, 61, 123, 0.12)',
      shadowColorRgb: '110,61,123',
      shadowIntensity: 'medium',

      gradient: 'linear-gradient(135deg, #C498D4, #6E3D7B, #4A2854)',
      gradientBtn: 'linear-gradient(135deg, #4A2854, #6E3D7B)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8FC 100%)',
      gradientHero: 'linear-gradient(135deg, #4A2854 0%, #6E3D7B 50%, #D4AF37 100%)',
      gradientDirection: 'to-br',
      avatarBg: 'linear-gradient(135deg, #6E3D7B, #4A2854)',

      fontDisplay: '"Cinzel", Georgia, serif',
      fontBody: '"Raleway", system-ui, sans-serif',
      fontMono: '"Source Code Pro", monospace',
      fontWeightHeading: '600',
      fontWeightBody: '400',
      letterSpacing: 'wider',

      animationStyle: 'elegant',
      transitionDuration: 'slow',

      glassEnabled: true,
      glassOpacity: 0.92,
      glassBlur: 'xl',

      buttonStyle: 'rounded',
      buttonShadow: true,

      cardStyle: 'glass',
      cardHoverEffect: 'glow',

      hasGradientText: true,
      hasAnimatedBorders: true,
      hasGlowEffects: true,

      prefersDark: false,
    },
  },

  // 6. OBSIDIAN SOCIETY - Dark Sophisticated
  'obsidian-society': {
    id: 'obsidian-society',
    name: 'Obsidian Society',
    short: 'Obsidian',
    motto: 'Refined. Exclusive. Timeless.',
    logoLetter: 'OS',
    industry: 'finance',
    aesthetic: 'modern',
    theme: {
      primary: '#64748B',
      primaryLight: '#94A3B8',
      primaryPale: '#E2E8F0',
      primaryDark: '#334155',
      primaryRgb: '100,116,139',

      secondary: '#0F172A',
      secondaryLight: '#1E293B',
      secondaryDark: '#020617',
      secondaryRgb: '15,23,42',

      accent: '#E2E8F0',
      accentLight: '#F1F5F9',
      accentDark: '#CBD5E1',
      accentRgb: '226,232,240',

      primaryScale: generateColorScale(215, 20, 55),
      secondaryScale: generateColorScale(222, 47, 10),
      accentScale: generateColorScale(210, 20, 90),

      bgPrimary: '#0F172A',
      bgSecondary: '#1E293B',
      bgTertiary: '#334155',
      bgCard: '#1E293B',
      bgSurface: '#0F172A',
      bgOverlay: 'rgba(2, 6, 23, 0.95)',
      bgMuted: '#1E293B',

      textPrimary: '#F8FAFC',
      textSecondary: '#CBD5E1',
      textMuted: '#64748B',
      textInverse: '#0F172A',
      textAccent: '#E2E8F0',

      borderColor: '#334155',
      borderLight: '#475569',
      borderFocus: '#94A3B8',
      borderRadius: 'sm',
      borderStyle: 'solid',

      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowColorRgb: '0,0,0',
      shadowIntensity: 'dramatic',

      gradient: 'linear-gradient(135deg, #334155, #0F172A, #020617)',
      gradientBtn: 'linear-gradient(135deg, #475569, #334155)',
      gradientCard: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
      gradientHero: 'linear-gradient(180deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
      gradientDirection: 'to-b',
      avatarBg: 'linear-gradient(135deg, #475569, #1E293B)',

      fontDisplay: '"Space Grotesk", system-ui, sans-serif',
      fontBody: '"Inter", system-ui, sans-serif',
      fontMono: '"JetBrains Mono", monospace',
      fontWeightHeading: '600',
      fontWeightBody: '400',
      letterSpacing: 'tight',

      animationStyle: 'subtle',
      transitionDuration: 'fast',

      glassEnabled: true,
      glassOpacity: 0.1,
      glassBlur: '3xl',

      buttonStyle: 'sharp',
      buttonShadow: false,

      cardStyle: 'outlined',
      cardHoverEffect: 'border',

      hasGradientText: false,
      hasAnimatedBorders: true,
      hasGlowEffects: false,

      prefersDark: true,
    },
  },

  // 7. ROSE MERIDIAN - Warm Rose/Coral
  'rose-meridian': {
    id: 'rose-meridian',
    name: 'Rose Meridian',
    short: 'Rose',
    motto: 'Grace in every moment',
    logoLetter: 'RM',
    industry: 'lifestyle',
    aesthetic: 'artistic',
    theme: {
      primary: '#E11D48',
      primaryLight: '#FB7185',
      primaryPale: '#FFE4E9',
      primaryDark: '#9F1239',
      primaryRgb: '225,29,72',

      secondary: '#FDF2F4',
      secondaryLight: '#FFFBFC',
      secondaryDark: '#F8E0E5',
      secondaryRgb: '253,242,244',

      accent: '#F97316',
      accentLight: '#FB923C',
      accentDark: '#C2410C',
      accentRgb: '249,115,22',

      primaryScale: generateColorScale(348, 85, 50),
      secondaryScale: generateColorScale(350, 50, 97),
      accentScale: generateColorScale(25, 95, 55),

      bgPrimary: '#FFF5F7',
      bgSecondary: '#FFECF0',
      bgTertiary: '#FFE0E7',
      bgCard: '#FFFFFF',
      bgSurface: '#FFFBFC',
      bgOverlay: 'rgba(159, 18, 57, 0.88)',
      bgMuted: '#FFEAEF',

      textPrimary: '#4A1828',
      textSecondary: '#7A3848',
      textMuted: '#AA6878',
      textInverse: '#FFFFFF',
      textAccent: '#E11D48',

      borderColor: '#FECDD3',
      borderLight: '#FFE4E9',
      borderFocus: '#E11D48',
      borderRadius: '2xl',
      borderStyle: 'solid',

      shadowColor: 'rgba(225, 29, 72, 0.15)',
      shadowColorRgb: '225,29,72',
      shadowIntensity: 'medium',

      gradient: 'linear-gradient(135deg, #FFA5B8, #E11D48, #9F1239)',
      gradientBtn: 'linear-gradient(135deg, #E11D48, #9F1239)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FFF5F7 100%)',
      gradientHero: 'linear-gradient(135deg, #9F1239 0%, #E11D48 50%, #F97316 100%)',
      gradientDirection: 'to-r',
      avatarBg: 'linear-gradient(135deg, #E11D48, #9F1239)',

      fontDisplay: '"Prata", Georgia, serif',
      fontBody: '"Quicksand", system-ui, sans-serif',
      fontMono: '"Fira Code", monospace',
      fontWeightHeading: '400',
      fontWeightBody: '500',
      letterSpacing: 'normal',

      animationStyle: 'energetic',
      transitionDuration: 'fast',

      glassEnabled: true,
      glassOpacity: 0.75,
      glassBlur: 'lg',

      buttonStyle: 'pill',
      buttonShadow: true,

      cardStyle: 'flat',
      cardHoverEffect: 'scale',

      hasGradientText: true,
      hasAnimatedBorders: false,
      hasGlowEffects: true,

      prefersDark: false,
    },
  },

  // 8. ARCTIC CIRCLE CLUB - Ice Blue/Silver
  'arctic-circle': {
    id: 'arctic-circle',
    name: 'Arctic Circle Club',
    short: 'Arctic',
    motto: 'Cool precision, warm community',
    logoLetter: 'AC',
    industry: 'technology',
    aesthetic: 'minimalist',
    theme: {
      primary: '#06B6D4',
      primaryLight: '#67E8F9',
      primaryPale: '#CFFAFE',
      primaryDark: '#0891B2',
      primaryRgb: '6,182,212',

      secondary: '#F0F9FF',
      secondaryLight: '#FFFFFF',
      secondaryDark: '#E0F2FE',
      secondaryRgb: '240,249,255',

      accent: '#94A3B8',
      accentLight: '#CBD5E1',
      accentDark: '#64748B',
      accentRgb: '148,163,184',

      primaryScale: generateColorScale(188, 95, 45),
      secondaryScale: generateColorScale(204, 100, 98),
      accentScale: generateColorScale(215, 20, 65),

      bgPrimary: '#F0F9FF',
      bgSecondary: '#E0F2FE',
      bgTertiary: '#BAE6FD',
      bgCard: '#FFFFFF',
      bgSurface: '#F8FDFF',
      bgOverlay: 'rgba(8, 145, 178, 0.85)',
      bgMuted: '#E5F4FA',

      textPrimary: '#0C4A6E',
      textSecondary: '#0369A1',
      textMuted: '#7DD3FC',
      textInverse: '#FFFFFF',
      textAccent: '#06B6D4',

      borderColor: '#BAE6FD',
      borderLight: '#E0F2FE',
      borderFocus: '#06B6D4',
      borderRadius: 'lg',
      borderStyle: 'solid',

      shadowColor: 'rgba(6, 182, 212, 0.15)',
      shadowColorRgb: '6,182,212',
      shadowIntensity: 'subtle',

      gradient: 'linear-gradient(135deg, #CFFAFE, #06B6D4, #0891B2)',
      gradientBtn: 'linear-gradient(135deg, #0891B2, #06B6D4)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 100%)',
      gradientHero: 'linear-gradient(180deg, #0C4A6E 0%, #0891B2 50%, #67E8F9 100%)',
      gradientDirection: 'to-t',
      avatarBg: 'linear-gradient(135deg, #06B6D4, #0891B2)',

      fontDisplay: '"Outfit", system-ui, sans-serif',
      fontBody: '"Inter", system-ui, sans-serif',
      fontMono: '"IBM Plex Mono", monospace',
      fontWeightHeading: '700',
      fontWeightBody: '400',
      letterSpacing: 'tight',

      animationStyle: 'smooth',
      transitionDuration: 'fast',

      glassEnabled: true,
      glassOpacity: 0.7,
      glassBlur: '2xl',

      buttonStyle: 'rounded',
      buttonShadow: false,

      cardStyle: 'glass',
      cardHoverEffect: 'glow',

      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: true,

      prefersDark: false,
    },
  },

  // 9. FLAME & STONE - Deep Red/Burgundy
  'flame-stone': {
    id: 'flame-stone',
    name: 'Flame & Stone',
    short: 'Flame',
    motto: 'Forged in passion, built to last',
    logoLetter: 'FS',
    industry: 'hospitality',
    aesthetic: 'luxurious',
    theme: {
      primary: '#991B1B',
      primaryLight: '#DC2626',
      primaryPale: '#FEE2E2',
      primaryDark: '#7F1D1D',
      primaryRgb: '153,27,27',

      secondary: '#292524',
      secondaryLight: '#44403C',
      secondaryDark: '#1C1917',
      secondaryRgb: '41,37,36',

      accent: '#F59E0B',
      accentLight: '#FBBF24',
      accentDark: '#D97706',
      accentRgb: '245,158,11',

      primaryScale: generateColorScale(0, 80, 35),
      secondaryScale: generateColorScale(30, 10, 15),
      accentScale: generateColorScale(38, 92, 50),

      bgPrimary: '#FFFBFA',
      bgSecondary: '#FEF2F2',
      bgTertiary: '#FEE2E2',
      bgCard: '#FFFFFF',
      bgSurface: '#FFFCFB',
      bgOverlay: 'rgba(127, 29, 29, 0.9)',
      bgMuted: '#FBE9E8',

      textPrimary: '#1C1917',
      textSecondary: '#44403C',
      textMuted: '#78716C',
      textInverse: '#FFFFFF',
      textAccent: '#991B1B',

      borderColor: '#FECACA',
      borderLight: '#FEE2E2',
      borderFocus: '#991B1B',
      borderRadius: 'none',
      borderStyle: 'solid',

      shadowColor: 'rgba(153, 27, 27, 0.2)',
      shadowColorRgb: '153,27,27',
      shadowIntensity: 'strong',

      gradient: 'linear-gradient(135deg, #FCA5A5, #991B1B, #7F1D1D)',
      gradientBtn: 'linear-gradient(135deg, #7F1D1D, #991B1B)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FFFBFA 100%)',
      gradientHero: 'linear-gradient(135deg, #1C1917 0%, #7F1D1D 50%, #F59E0B 100%)',
      gradientDirection: 'to-br',
      avatarBg: 'linear-gradient(135deg, #991B1B, #7F1D1D)',

      fontDisplay: '"Bebas Neue", Impact, sans-serif',
      fontBody: '"Roboto", system-ui, sans-serif',
      fontMono: '"Roboto Mono", monospace',
      fontWeightHeading: '400',
      fontWeightBody: '400',
      letterSpacing: 'widest',

      animationStyle: 'dramatic',
      transitionDuration: 'normal',

      glassEnabled: false,
      glassOpacity: 0.9,
      glassBlur: 'md',

      buttonStyle: 'sharp',
      buttonShadow: true,

      cardStyle: 'raised',
      cardHoverEffect: 'lift',

      hasGradientText: true,
      hasAnimatedBorders: true,
      hasGlowEffects: true,

      prefersDark: false,
    },
  },

  // 10. MARIGOLD SOCIETY - Warm Orange/Amber
  'marigold-society': {
    id: 'marigold-society',
    name: 'Marigold Society',
    short: 'Marigold',
    motto: 'Blooming together, growing stronger',
    logoLetter: 'MS',
    industry: 'education',
    aesthetic: 'playful',
    theme: {
      primary: '#EA580C',
      primaryLight: '#FB923C',
      primaryPale: '#FFEDD5',
      primaryDark: '#C2410C',
      primaryRgb: '234,88,12',

      secondary: '#FFFBEB',
      secondaryLight: '#FFFFFF',
      secondaryDark: '#FEF3C7',
      secondaryRgb: '255,251,235',

      accent: '#7C3AED',
      accentLight: '#A78BFA',
      accentDark: '#5B21B6',
      accentRgb: '124,58,237',

      primaryScale: generateColorScale(25, 95, 50),
      secondaryScale: generateColorScale(48, 100, 97),
      accentScale: generateColorScale(263, 85, 55),

      bgPrimary: '#FFFAF5',
      bgSecondary: '#FFF5EB',
      bgTertiary: '#FFEDD5',
      bgCard: '#FFFFFF',
      bgSurface: '#FFFCF8',
      bgOverlay: 'rgba(194, 65, 12, 0.88)',
      bgMuted: '#FFF0E5',

      textPrimary: '#431407',
      textSecondary: '#7C2D12',
      textMuted: '#C2410C',
      textInverse: '#FFFFFF',
      textAccent: '#EA580C',

      borderColor: '#FED7AA',
      borderLight: '#FFEDD5',
      borderFocus: '#EA580C',
      borderRadius: 'full',
      borderStyle: 'solid',

      shadowColor: 'rgba(234, 88, 12, 0.2)',
      shadowColorRgb: '234,88,12',
      shadowIntensity: 'medium',

      gradient: 'linear-gradient(135deg, #FED7AA, #EA580C, #C2410C)',
      gradientBtn: 'linear-gradient(135deg, #EA580C, #C2410C)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FFFAF5 100%)',
      gradientHero: 'linear-gradient(135deg, #C2410C 0%, #EA580C 50%, #7C3AED 100%)',
      gradientDirection: 'to-r',
      avatarBg: 'linear-gradient(135deg, #EA580C, #C2410C)',

      fontDisplay: '"Fredoka", cursive, sans-serif',
      fontBody: '"Nunito Sans", system-ui, sans-serif',
      fontMono: '"Fira Code", monospace',
      fontWeightHeading: '600',
      fontWeightBody: '400',
      letterSpacing: 'normal',

      animationStyle: 'energetic',
      transitionDuration: 'fast',

      glassEnabled: false,
      glassOpacity: 0.8,
      glassBlur: 'lg',

      buttonStyle: 'pill',
      buttonShadow: true,

      cardStyle: 'flat',
      cardHoverEffect: 'scale',

      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: false,

      prefersDark: false,
    },
  },

  // 11. MIDNIGHT AZURE - Deep Navy/Indigo
  'midnight-azure': {
    id: 'midnight-azure',
    name: 'Midnight Azure',
    short: 'Azure',
    motto: 'Depth of character, breadth of vision',
    logoLetter: 'MA',
    industry: 'finance',
    aesthetic: 'corporate',
    theme: {
      primary: '#1E3A8A',
      primaryLight: '#3B82F6',
      primaryPale: '#DBEAFE',
      primaryDark: '#1E3A5F',
      primaryRgb: '30,58,138',

      secondary: '#F8FAFC',
      secondaryLight: '#FFFFFF',
      secondaryDark: '#F1F5F9',
      secondaryRgb: '248,250,252',

      accent: '#F59E0B',
      accentLight: '#FBBF24',
      accentDark: '#D97706',
      accentRgb: '245,158,11',

      primaryScale: generateColorScale(224, 70, 35),
      secondaryScale: generateColorScale(210, 40, 98),
      accentScale: generateColorScale(38, 92, 50),

      bgPrimary: '#F8FAFC',
      bgSecondary: '#F1F5F9',
      bgTertiary: '#E2E8F0',
      bgCard: '#FFFFFF',
      bgSurface: '#FAFBFC',
      bgOverlay: 'rgba(30, 58, 95, 0.92)',
      bgMuted: '#EEF2F6',

      textPrimary: '#0F172A',
      textSecondary: '#334155',
      textMuted: '#64748B',
      textInverse: '#FFFFFF',
      textAccent: '#1E3A8A',

      borderColor: '#CBD5E1',
      borderLight: '#E2E8F0',
      borderFocus: '#1E3A8A',
      borderRadius: 'md',
      borderStyle: 'solid',

      shadowColor: 'rgba(30, 58, 138, 0.12)',
      shadowColorRgb: '30,58,138',
      shadowIntensity: 'subtle',

      gradient: 'linear-gradient(135deg, #93C5FD, #1E3A8A, #1E3A5F)',
      gradientBtn: 'linear-gradient(135deg, #1E3A5F, #1E3A8A)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      gradientHero: 'linear-gradient(180deg, #1E3A5F 0%, #1E3A8A 50%, #3B82F6 100%)',
      gradientDirection: 'to-b',
      avatarBg: 'linear-gradient(135deg, #1E3A8A, #1E3A5F)',

      fontDisplay: '"Plus Jakarta Sans", system-ui, sans-serif',
      fontBody: '"Inter", system-ui, sans-serif',
      fontMono: '"JetBrains Mono", monospace',
      fontWeightHeading: '700',
      fontWeightBody: '400',
      letterSpacing: 'tight',

      animationStyle: 'subtle',
      transitionDuration: 'fast',

      glassEnabled: false,
      glassOpacity: 0.95,
      glassBlur: 'sm',

      buttonStyle: 'rounded',
      buttonShadow: true,

      cardStyle: 'raised',
      cardHoverEffect: 'lift',

      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: false,

      prefersDark: false,
    },
  },

  // 12. JADE DYNASTY - Rich Emerald
  'jade-dynasty': {
    id: 'jade-dynasty',
    name: 'Jade Dynasty',
    short: 'Jade',
    motto: 'Precious traditions, enduring values',
    logoLetter: 'JD',
    industry: 'luxury',
    aesthetic: 'classic',
    theme: {
      primary: '#047857',
      primaryLight: '#10B981',
      primaryPale: '#D1FAE5',
      primaryDark: '#065F46',
      primaryRgb: '4,120,87',

      secondary: '#FFFBEB',
      secondaryLight: '#FFFFFF',
      secondaryDark: '#FEF3C7',
      secondaryRgb: '255,251,235',

      accent: '#D4AF37',
      accentLight: '#E8C94A',
      accentDark: '#B8942A',
      accentRgb: '212,175,55',

      primaryScale: generateColorScale(160, 95, 40),
      secondaryScale: generateColorScale(48, 100, 97),
      accentScale: generateColorScale(45, 75, 55),

      bgPrimary: '#F0FDF9',
      bgSecondary: '#ECFDF5',
      bgTertiary: '#D1FAE5',
      bgCard: '#FFFFFF',
      bgSurface: '#F8FDFB',
      bgOverlay: 'rgba(6, 95, 70, 0.9)',
      bgMuted: '#E6F9F0',

      textPrimary: '#064E3B',
      textSecondary: '#047857',
      textMuted: '#34D399',
      textInverse: '#FFFFFF',
      textAccent: '#047857',

      borderColor: '#A7F3D0',
      borderLight: '#D1FAE5',
      borderFocus: '#047857',
      borderRadius: 'lg',
      borderStyle: 'double',

      shadowColor: 'rgba(4, 120, 87, 0.15)',
      shadowColorRgb: '4,120,87',
      shadowIntensity: 'medium',

      gradient: 'linear-gradient(135deg, #6EE7B7, #047857, #065F46)',
      gradientBtn: 'linear-gradient(135deg, #065F46, #047857)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #F0FDF9 100%)',
      gradientHero: 'linear-gradient(135deg, #065F46 0%, #047857 50%, #D4AF37 100%)',
      gradientDirection: 'to-br',
      avatarBg: 'linear-gradient(135deg, #047857, #065F46)',

      fontDisplay: '"Noto Serif Display", Georgia, serif',
      fontBody: '"Noto Sans", system-ui, sans-serif',
      fontMono: '"Noto Sans Mono", monospace',
      fontWeightHeading: '600',
      fontWeightBody: '400',
      letterSpacing: 'normal',

      animationStyle: 'elegant',
      transitionDuration: 'slow',

      glassEnabled: true,
      glassOpacity: 0.85,
      glassBlur: 'xl',

      buttonStyle: 'soft',
      buttonShadow: true,

      cardStyle: 'outlined',
      cardHoverEffect: 'glow',

      hasGradientText: true,
      hasAnimatedBorders: true,
      hasGlowEffects: true,

      prefersDark: false,
    },
  },

  // 13. COPPER & OAK - Warm Terracotta
  'copper-oak': {
    id: 'copper-oak',
    name: 'Copper & Oak',
    short: 'Copper',
    motto: 'Crafted with care, aged to perfection',
    logoLetter: 'CO',
    industry: 'hospitality',
    aesthetic: 'nature',
    theme: {
      primary: '#B45309',
      primaryLight: '#D97706',
      primaryPale: '#FEF3C7',
      primaryDark: '#92400E',
      primaryRgb: '180,83,9',

      secondary: '#292524',
      secondaryLight: '#44403C',
      secondaryDark: '#1C1917',
      secondaryRgb: '41,37,36',

      accent: '#166534',
      accentLight: '#22C55E',
      accentDark: '#14532D',
      accentRgb: '22,101,52',

      primaryScale: generateColorScale(28, 92, 40),
      secondaryScale: generateColorScale(30, 10, 15),
      accentScale: generateColorScale(142, 70, 30),

      bgPrimary: '#FFFBF5',
      bgSecondary: '#FEF7ED',
      bgTertiary: '#FEF3C7',
      bgCard: '#FFFFFF',
      bgSurface: '#FFFCF7',
      bgOverlay: 'rgba(146, 64, 14, 0.9)',
      bgMuted: '#FDF4E8',

      textPrimary: '#292524',
      textSecondary: '#57534E',
      textMuted: '#A8A29E',
      textInverse: '#FFFFFF',
      textAccent: '#B45309',

      borderColor: '#FDE68A',
      borderLight: '#FEF3C7',
      borderFocus: '#B45309',
      borderRadius: 'md',
      borderStyle: 'solid',

      shadowColor: 'rgba(180, 83, 9, 0.15)',
      shadowColorRgb: '180,83,9',
      shadowIntensity: 'medium',

      gradient: 'linear-gradient(135deg, #FDE68A, #B45309, #92400E)',
      gradientBtn: 'linear-gradient(135deg, #92400E, #B45309)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FFFBF5 100%)',
      gradientHero: 'linear-gradient(135deg, #292524 0%, #92400E 50%, #166534 100%)',
      gradientDirection: 'to-br',
      avatarBg: 'linear-gradient(135deg, #B45309, #92400E)',

      fontDisplay: '"Lora", Georgia, serif',
      fontBody: '"Open Sans", system-ui, sans-serif',
      fontMono: '"Source Code Pro", monospace',
      fontWeightHeading: '700',
      fontWeightBody: '400',
      letterSpacing: 'normal',

      animationStyle: 'subtle',
      transitionDuration: 'slow',

      glassEnabled: false,
      glassOpacity: 0.9,
      glassBlur: 'md',

      buttonStyle: 'soft',
      buttonShadow: true,

      cardStyle: 'raised',
      cardHoverEffect: 'lift',

      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: false,

      prefersDark: false,
    },
  },

  // 14. LAVENDER FIELDS - Soft Purple/Lilac
  'lavender-fields': {
    id: 'lavender-fields',
    name: 'Lavender Fields',
    short: 'Lavender',
    motto: 'Serenity in every experience',
    logoLetter: 'LF',
    industry: 'healthcare',
    aesthetic: 'minimalist',
    theme: {
      primary: '#7C3AED',
      primaryLight: '#A78BFA',
      primaryPale: '#EDE9FE',
      primaryDark: '#5B21B6',
      primaryRgb: '124,58,237',

      secondary: '#FAF5FF',
      secondaryLight: '#FFFFFF',
      secondaryDark: '#F3E8FF',
      secondaryRgb: '250,245,255',

      accent: '#EC4899',
      accentLight: '#F472B6',
      accentDark: '#BE185D',
      accentRgb: '236,72,153',

      primaryScale: generateColorScale(262, 85, 55),
      secondaryScale: generateColorScale(270, 100, 98),
      accentScale: generateColorScale(330, 85, 60),

      bgPrimary: '#FAF5FF',
      bgSecondary: '#F3E8FF',
      bgTertiary: '#EDE9FE',
      bgCard: '#FFFFFF',
      bgSurface: '#FCFAFF',
      bgOverlay: 'rgba(91, 33, 182, 0.88)',
      bgMuted: '#F5F0FF',

      textPrimary: '#2E1065',
      textSecondary: '#4C1D95',
      textMuted: '#8B5CF6',
      textInverse: '#FFFFFF',
      textAccent: '#7C3AED',

      borderColor: '#DDD6FE',
      borderLight: '#EDE9FE',
      borderFocus: '#7C3AED',
      borderRadius: 'xl',
      borderStyle: 'solid',

      shadowColor: 'rgba(124, 58, 237, 0.12)',
      shadowColorRgb: '124,58,237',
      shadowIntensity: 'subtle',

      gradient: 'linear-gradient(135deg, #C4B5FD, #7C3AED, #5B21B6)',
      gradientBtn: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 100%)',
      gradientHero: 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #EC4899 100%)',
      gradientDirection: 'to-r',
      avatarBg: 'linear-gradient(135deg, #7C3AED, #5B21B6)',

      fontDisplay: '"Gilda Display", Georgia, serif',
      fontBody: '"Karla", system-ui, sans-serif',
      fontMono: '"Fira Code", monospace',
      fontWeightHeading: '400',
      fontWeightBody: '400',
      letterSpacing: 'wide',

      animationStyle: 'smooth',
      transitionDuration: 'normal',

      glassEnabled: true,
      glassOpacity: 0.75,
      glassBlur: 'xl',

      buttonStyle: 'pill',
      buttonShadow: false,

      cardStyle: 'glass',
      cardHoverEffect: 'glow',

      hasGradientText: true,
      hasAnimatedBorders: false,
      hasGlowEffects: true,

      prefersDark: false,
    },
  },

  // 15. SLATE MODERN - Cool Gray with Teal
  'slate-modern': {
    id: 'slate-modern',
    name: 'Slate Modern',
    short: 'Slate',
    motto: 'Contemporary clarity, timeless function',
    logoLetter: 'SM',
    industry: 'technology',
    aesthetic: 'modern',
    theme: {
      primary: '#475569',
      primaryLight: '#64748B',
      primaryPale: '#E2E8F0',
      primaryDark: '#334155',
      primaryRgb: '71,85,105',

      secondary: '#F8FAFC',
      secondaryLight: '#FFFFFF',
      secondaryDark: '#F1F5F9',
      secondaryRgb: '248,250,252',

      accent: '#14B8A6',
      accentLight: '#2DD4BF',
      accentDark: '#0D9488',
      accentRgb: '20,184,166',

      primaryScale: generateColorScale(215, 20, 45),
      secondaryScale: generateColorScale(210, 40, 98),
      accentScale: generateColorScale(170, 80, 45),

      bgPrimary: '#F8FAFC',
      bgSecondary: '#F1F5F9',
      bgTertiary: '#E2E8F0',
      bgCard: '#FFFFFF',
      bgSurface: '#FAFBFC',
      bgOverlay: 'rgba(51, 65, 85, 0.92)',
      bgMuted: '#EFF2F5',

      textPrimary: '#0F172A',
      textSecondary: '#334155',
      textMuted: '#64748B',
      textInverse: '#FFFFFF',
      textAccent: '#14B8A6',

      borderColor: '#CBD5E1',
      borderLight: '#E2E8F0',
      borderFocus: '#14B8A6',
      borderRadius: 'lg',
      borderStyle: 'solid',

      shadowColor: 'rgba(71, 85, 105, 0.1)',
      shadowColorRgb: '71,85,105',
      shadowIntensity: 'subtle',

      gradient: 'linear-gradient(135deg, #CBD5E1, #475569, #334155)',
      gradientBtn: 'linear-gradient(135deg, #475569, #334155)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      gradientHero: 'linear-gradient(135deg, #334155 0%, #475569 50%, #14B8A6 100%)',
      gradientDirection: 'to-br',
      avatarBg: 'linear-gradient(135deg, #475569, #334155)',

      fontDisplay: '"Sora", system-ui, sans-serif',
      fontBody: '"Inter", system-ui, sans-serif',
      fontMono: '"JetBrains Mono", monospace',
      fontWeightHeading: '600',
      fontWeightBody: '400',
      letterSpacing: 'tight',

      animationStyle: 'subtle',
      transitionDuration: 'fast',

      glassEnabled: false,
      glassOpacity: 0.95,
      glassBlur: 'sm',

      buttonStyle: 'rounded',
      buttonShadow: false,

      cardStyle: 'outlined',
      cardHoverEffect: 'border',

      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: false,

      prefersDark: false,
    },
  },
};

// ============================================================================
// ACCOUNTS (Updated with more variety)
// ============================================================================

export const ACCOUNTS: Account[] = [
  {
    email: 'kwatts@luxehaven.com',
    name: 'Kathy Watts',
    first: 'Kathy',
    last: 'Watts',
    initials: 'KW',
    role: 'Director of Payroll & HR',
    orgId: 'luxe-haven',
  },
  {
    email: 'schen@pacificclub.org',
    name: 'Sarah Chen',
    first: 'Sarah',
    last: 'Chen',
    initials: 'SC',
    role: 'General Manager',
    orgId: 'pacific-club',
  },
  {
    email: 'dmartinez@summitgroup.io',
    name: 'David Martinez',
    first: 'David',
    last: 'Martinez',
    initials: 'DM',
    role: 'VP of Operations',
    orgId: 'summit-group',
  },
  {
    email: 'erodriguez@verdecollective.com',
    name: 'Emily Rodriguez',
    first: 'Emily',
    last: 'Rodriguez',
    initials: 'ER',
    role: 'Community Director',
    orgId: 'verde-collective',
  },
  {
    email: 'mjohnson@crownestates.co',
    name: 'Michael Johnson',
    first: 'Michael',
    last: 'Johnson',
    initials: 'MJ',
    role: 'Chief Executive Officer',
    orgId: 'crown-estates',
  },
  {
    email: 'asmith@obsidian.club',
    name: 'Alexander Smith',
    first: 'Alexander',
    last: 'Smith',
    initials: 'AS',
    role: 'Managing Director',
    orgId: 'obsidian-society',
  },
  {
    email: 'lpark@rosemeridian.com',
    name: 'Luna Park',
    first: 'Luna',
    last: 'Park',
    initials: 'LP',
    role: 'Creative Director',
    orgId: 'rose-meridian',
  },
  {
    email: 'nanderson@arctic-circle.org',
    name: 'Nora Anderson',
    first: 'Nora',
    last: 'Anderson',
    initials: 'NA',
    role: 'Technology Lead',
    orgId: 'arctic-circle',
  },
  {
    email: 'jthompson@flamestone.io',
    name: 'James Thompson',
    first: 'James',
    last: 'Thompson',
    initials: 'JT',
    role: 'Operations Director',
    orgId: 'flame-stone',
  },
  {
    email: 'mwilson@marigold.edu',
    name: 'Maya Wilson',
    first: 'Maya',
    last: 'Wilson',
    initials: 'MW',
    role: 'Program Coordinator',
    orgId: 'marigold-society',
  },
  {
    email: 'rtaylor@midnightazure.com',
    name: 'Robert Taylor',
    first: 'Robert',
    last: 'Taylor',
    initials: 'RT',
    role: 'Chief Financial Officer',
    orgId: 'midnight-azure',
  },
  {
    email: 'yliu@jadedynasty.com',
    name: 'Yuki Liu',
    first: 'Yuki',
    last: 'Liu',
    initials: 'YL',
    role: 'Heritage Director',
    orgId: 'jade-dynasty',
  },
  {
    email: 'bgarcia@copperoak.co',
    name: 'Benjamin Garcia',
    first: 'Benjamin',
    last: 'Garcia',
    initials: 'BG',
    role: 'Head Concierge',
    orgId: 'copper-oak',
  },
  {
    email: 'clee@lavenderfields.health',
    name: 'Claire Lee',
    first: 'Claire',
    last: 'Lee',
    initials: 'CL',
    role: 'Wellness Director',
    orgId: 'lavender-fields',
  },
  {
    email: 'okimura@slatemodern.tech',
    name: 'Oliver Kimura',
    first: 'Oliver',
    last: 'Kimura',
    initials: 'OK',
    role: 'Product Manager',
    orgId: 'slate-modern',
  },
];

// ============================================================================
// HELPER: GET ORGANIZATION LIST FOR DROPDOWNS
// ============================================================================

export function getOrganizationList(): { id: string; name: string; short: string; color: string }[] {
  return Object.values(ORGANIZATIONS).map(org => ({
    id: org.id,
    name: org.name,
    short: org.short,
    color: org.theme.primary,
  }));
}

// ============================================================================
// HELPER: APPLY THEME TO CSS VARIABLES
// ============================================================================

export function applyTheme(org: Organization): void {
  const root = document.documentElement;
  const theme = org.theme;

  // Primary colors
  root.style.setProperty('--theme-primary', theme.primary);
  root.style.setProperty('--theme-primary-light', theme.primaryLight);
  root.style.setProperty('--theme-primary-pale', theme.primaryPale);
  root.style.setProperty('--theme-primary-dark', theme.primaryDark);
  root.style.setProperty('--theme-primary-rgb', theme.primaryRgb);

  // Secondary colors
  root.style.setProperty('--theme-secondary', theme.secondary);
  root.style.setProperty('--theme-secondary-light', theme.secondaryLight);
  root.style.setProperty('--theme-secondary-dark', theme.secondaryDark);
  root.style.setProperty('--theme-secondary-rgb', theme.secondaryRgb);

  // Accent colors
  root.style.setProperty('--theme-accent', theme.accent);
  root.style.setProperty('--theme-accent-light', theme.accentLight);
  root.style.setProperty('--theme-accent-dark', theme.accentDark);
  root.style.setProperty('--theme-accent-rgb', theme.accentRgb);

  // Backgrounds
  root.style.setProperty('--theme-bg-primary', theme.bgPrimary);
  root.style.setProperty('--theme-bg-secondary', theme.bgSecondary);
  root.style.setProperty('--theme-bg-tertiary', theme.bgTertiary);
  root.style.setProperty('--theme-bg-card', theme.bgCard);
  root.style.setProperty('--theme-bg-surface', theme.bgSurface);
  root.style.setProperty('--theme-bg-overlay', theme.bgOverlay);
  root.style.setProperty('--theme-bg-muted', theme.bgMuted);

  // Text colors
  root.style.setProperty('--theme-text-primary', theme.textPrimary);
  root.style.setProperty('--theme-text-secondary', theme.textSecondary);
  root.style.setProperty('--theme-text-muted', theme.textMuted);
  root.style.setProperty('--theme-text-inverse', theme.textInverse);
  root.style.setProperty('--theme-text-accent', theme.textAccent);

  // Borders
  root.style.setProperty('--theme-border', theme.borderColor);
  root.style.setProperty('--theme-border-light', theme.borderLight);
  root.style.setProperty('--theme-border-focus', theme.borderFocus);

  // Shadows
  root.style.setProperty('--theme-shadow-color', theme.shadowColor);

  // Gradients
  root.style.setProperty('--theme-gradient', theme.gradient);
  root.style.setProperty('--theme-gradient-btn', theme.gradientBtn);
  root.style.setProperty('--theme-gradient-card', theme.gradientCard);
  root.style.setProperty('--theme-gradient-hero', theme.gradientHero);
  root.style.setProperty('--theme-avatar-bg', theme.avatarBg);

  // Typography
  root.style.setProperty('--theme-font-display', theme.fontDisplay);
  root.style.setProperty('--theme-font-body', theme.fontBody);
  root.style.setProperty('--theme-font-mono', theme.fontMono);

  // Border radius mapping
  const radiusMap = {
    'none': '0px',
    'sm': '0.125rem',
    'md': '0.375rem',
    'lg': '0.5rem',
    'xl': '0.75rem',
    '2xl': '1rem',
    'full': '9999px',
  };
  root.style.setProperty('--theme-radius', radiusMap[theme.borderRadius]);

  // Glass blur mapping
  const blurMap = {
    'sm': '4px',
    'md': '8px',
    'lg': '12px',
    'xl': '16px',
    '2xl': '24px',
    '3xl': '32px',
  };
  root.style.setProperty('--theme-glass-blur', blurMap[theme.glassBlur]);
  root.style.setProperty('--theme-glass-opacity', String(theme.glassOpacity));
}

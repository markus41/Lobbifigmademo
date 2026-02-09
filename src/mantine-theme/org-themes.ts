/**
 * Lobbi Platform - Organization Theme Overrides for Mantine v7
 *
 * Maps all 20 organizations to MantineThemeOverride objects.
 * Each override captures: colors (as 10-shade tuples), typography,
 * shadow preferences, glass/blur settings, gradients, animation,
 * and component style preferences.
 */
import type { MantineThemeOverride, MantineColorsTuple } from '@mantine/core';
import type { OrgId } from './MantineThemeProvider';

// ============================================================================
// HELPER: Generate 10-shade color tuple from a base hex
// ============================================================================

function hexToHSL(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

function generateTuple(baseHex: string): MantineColorsTuple {
  const [h, s, _l] = hexToHSL(baseHex);
  return [
    hslToHex(h, Math.min(s + 10, 100), 95),  // 0 - lightest
    hslToHex(h, Math.min(s + 5, 100), 88),    // 1
    hslToHex(h, s, 78),                        // 2
    hslToHex(h, s, 66),                        // 3
    hslToHex(h, s, 54),                        // 4
    hslToHex(h, s, 46),                        // 5
    hslToHex(h, s, 38),                        // 6 - default primary shade
    hslToHex(h, s, 30),                        // 7
    hslToHex(h, s, 22),                        // 8
    hslToHex(h, s, 14),                        // 9 - darkest
  ] as MantineColorsTuple;
}

// ============================================================================
// ORG-SPECIFIC COLOR TUPLES
// ============================================================================

const luxeGold: MantineColorsTuple = [
  '#FBF3D5', '#F5E6A3', '#EDDA7A', '#E4C95A', '#D4AF37',
  '#BF9A2E', '#A88526', '#8B6E1F', '#6B5518', '#4A3B10',
];

const pacificBlue: MantineColorsTuple = [
  '#D6EAF5', '#A8D4E8', '#7ABDDB', '#5AA3C4', '#2E6B8A',
  '#266080', '#1E5270', '#1A4459', '#143648', '#0E2835',
];

const summitBronze: MantineColorsTuple = [
  '#F0E6D2', '#E0CCA8', '#D0B080', '#B89E6A', '#8B6B3E',
  '#7D5F35', '#6B4E2E', '#5A4025', '#48321C', '#362414',
];

const verdeGreen: MantineColorsTuple = [
  '#D4F0E2', '#A8E0C4', '#7DCFA8', '#5FAF8B', '#3D7B5F',
  '#357054', '#2A5742', '#224A38', '#1A3C2E', '#122E22',
];

const crownPurple: MantineColorsTuple = [
  '#EBD8F0', '#D4B0E0', '#BD88CF', '#9B6BAB', '#6E3D7B',
  '#623570', '#4A2854', '#3E2048', '#32183C', '#261030',
];

const obsidianSlate: MantineColorsTuple = [
  '#E2E8F0', '#CBD5E1', '#94A3B8', '#64748B', '#475569',
  '#334155', '#2D3748', '#1E293B', '#0F172A', '#020617',
];

const roseRed: MantineColorsTuple = [
  '#FFE4E9', '#FECDD3', '#FCA5B8', '#FB7185', '#E11D48',
  '#C81842', '#9F1239', '#881035', '#70102E', '#580C24',
];

const arcticCyan: MantineColorsTuple = [
  '#CFFAFE', '#A5F3FC', '#67E8F9', '#22D3EE', '#06B6D4',
  '#0891B2', '#0E7490', '#155E75', '#164E63', '#0C3D50',
];

const flameRed: MantineColorsTuple = [
  '#FEE2E2', '#FECACA', '#FCA5A5', '#DC2626', '#991B1B',
  '#8B1818', '#7F1D1D', '#6B1717', '#5A1212', '#450E0E',
];

const marigoldOrange: MantineColorsTuple = [
  '#FFEDD5', '#FED7AA', '#FDBA74', '#FB923C', '#EA580C',
  '#D44C0A', '#C2410C', '#A83808', '#8E2F06', '#732504',
];

const azureBlue: MantineColorsTuple = [
  '#DBEAFE', '#BFDBFE', '#93C5FD', '#3B82F6', '#1E3A8A',
  '#1C3578', '#1E3A5F', '#182F50', '#122540', '#0C1A30',
];

const jadeEmerald: MantineColorsTuple = [
  '#D1FAE5', '#A7F3D0', '#6EE7B7', '#10B981', '#047857',
  '#066B4E', '#065F46', '#05543C', '#044832', '#033D28',
];

const copperAmber: MantineColorsTuple = [
  '#FEF3C7', '#FDE68A', '#FCD34D', '#D97706', '#B45309',
  '#A34A08', '#92400E', '#7E370C', '#6B2E0A', '#582508',
];

const lavenderViolet: MantineColorsTuple = [
  '#EDE9FE', '#DDD6FE', '#C4B5FD', '#A78BFA', '#7C3AED',
  '#6D32D4', '#5B21B6', '#4E1CA0', '#411788', '#341270',
];

const slateTeal: MantineColorsTuple = [
  '#E2E8F0', '#CBD5E1', '#94A3B8', '#64748B', '#475569',
  '#3D4A5E', '#334155', '#2B3748', '#232D3B', '#1A232E',
];

const neonMagenta: MantineColorsTuple = [
  '#FFD6FF', '#FFB3FF', '#FF80FF', '#FF66FF', '#FF00FF',
  '#E600E6', '#CC00CC', '#B300B3', '#990099', '#800080',
];

const neonCyan: MantineColorsTuple = [
  '#D6FFFF', '#B3FFFF', '#80FFFF', '#66FFFF', '#00FFFF',
  '#00E6E6', '#00CCCC', '#00B3B3', '#009999', '#008080',
];

const zenMoss: MantineColorsTuple = [
  '#E8EDE5', '#D4DBC8', '#B8C8AA', '#7A8B6E', '#5C6B52',
  '#506048', '#3D4A35', '#344030', '#2B3528', '#222B20',
];

const forgePure: MantineColorsTuple = [
  '#F5F5F5', '#E5E5E5', '#D4D4D4', '#A3A3A3', '#737373',
  '#525252', '#404040', '#333333', '#1A1A1A', '#000000',
];

const forgeRed: MantineColorsTuple = [
  '#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444',
  '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D', '#631111',
];

const goldenEraGold: MantineColorsTuple = [
  '#F5E6B8', '#EDDA8A', '#E8C86B', '#D4AF37', '#BFA032',
  '#A08530', '#8A7228', '#745F20', '#5E4C18', '#483A10',
];

const pixelRed: MantineColorsTuple = [
  '#FADBD8', '#F5B7B1', '#EC7063', '#E74C3C', '#D94335',
  '#C0392B', '#A93226', '#922B21', '#7B241C', '#641E16',
];

const pixelBlue: MantineColorsTuple = [
  '#D6EAF8', '#AED6F1', '#85C1E9', '#5DADE2', '#3498DB',
  '#2E86C1', '#2980B9', '#2471A3', '#1F618D', '#1A5276',
];

// ============================================================================
// ORG THEME OVERRIDES
// ============================================================================

export const ORG_THEME_OVERRIDES: Record<OrgId, MantineThemeOverride> = {
  // ========================================================================
  // 1. LUXE HAVEN RESORT - Classic Gold Luxury
  // ========================================================================
  'luxe-haven': {
    primaryColor: 'luxeGold',
    colors: {
      luxeGold: luxeGold,
      orgSecondary: generateTuple('#1A1A2E'),
      orgAccent: generateTuple('#C9A227'),
    },
    headings: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: '700',
    },
    fontFamily: '"Inter", system-ui, sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #F5E6A3, #D4AF37, #8B7330)',
      gradientButton: 'linear-gradient(135deg, #8B7330, #D4AF37)',
      gradientHero: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D44 50%, #D4AF37 100%)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF7 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(212,175,55,0.15), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #D4AF37, #8B7330)',
      glassBlur: '16px',
      glassOpacity: 0.9,
      glassBorder: '1px solid rgba(212, 175, 55, 0.15)',
      shadowColor: 'rgba(212, 175, 55, 0.15)',
      shadowIntensity: 'medium',
      transitionDuration: '250ms',
      animationStyle: 'elegant',
      buttonStyle: 'rounded',
      cardStyle: 'raised',
      cardHoverEffect: 'lift',
      hasGradientText: true,
      hasAnimatedBorders: false,
      hasGlowEffects: true,
      prefersDark: false,
      backgroundPattern: 'artDeco',
      glassEnabled: true,
      fontWeightHeading: '700',
      fontWeightBody: '400',
      letterSpacing: '0',
      borderStyle: 'solid',
      borderColor: '#E5DCC3',
      borderLight: '#F0EBD8',
      bgPrimary: '#FAF6E9',
      bgSecondary: '#F5EFD9',
      bgCard: '#FFFFFF',
      bgSurface: '#FFFDF7',
      textPrimary: '#1A1A2E',
      textSecondary: '#4A4A5A',
      textMuted: '#7A7A8A',
    },
  },

  // ========================================================================
  // 2. PACIFIC CLUB - Ocean Blue Coastal
  // ========================================================================
  'pacific-club': {
    primaryColor: 'pacificBlue',
    colors: {
      pacificBlue: pacificBlue,
      orgSecondary: generateTuple('#F8F4E8'),
      orgAccent: generateTuple('#E07B4D'),
    },
    headings: {
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: '600',
    },
    fontFamily: '"Source Sans 3", system-ui, sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #A8D4E8, #2E6B8A, #1A4459)',
      gradientButton: 'linear-gradient(135deg, #1A4459, #2E6B8A)',
      gradientHero: 'linear-gradient(180deg, #2E6B8A 0%, #1A4459 100%)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #F8FBFD 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(46,107,138,0.12), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #2E6B8A, #1A4459)',
      glassBlur: '12px',
      glassOpacity: 0.85,
      glassBorder: '1px solid rgba(46, 107, 138, 0.12)',
      shadowColor: 'rgba(46, 107, 138, 0.12)',
      shadowIntensity: 'subtle',
      transitionDuration: '250ms',
      animationStyle: 'smooth',
      buttonStyle: 'rounded',
      cardStyle: 'outlined',
      cardHoverEffect: 'border',
      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: false,
      prefersDark: false,
      backgroundPattern: 'geometric',
      glassEnabled: true,
      fontWeightHeading: '600',
      fontWeightBody: '400',
      letterSpacing: '0.025em',
      borderStyle: 'solid',
      borderColor: '#C8DDE8',
      borderLight: '#E4EEF3',
      bgPrimary: '#F8FBFD',
      bgSecondary: '#EFF5F8',
      bgCard: '#FFFFFF',
      bgSurface: '#FAFCFD',
      textPrimary: '#1A3A4A',
      textSecondary: '#4A6A7A',
      textMuted: '#7A9AAA',
    },
  },

  // ========================================================================
  // 3. SUMMIT HOSPITALITY GROUP - Earthy Bronze
  // ========================================================================
  'summit-group': {
    primaryColor: 'summitBronze',
    colors: {
      summitBronze: summitBronze,
      orgSecondary: generateTuple('#2C4A3E'),
      orgAccent: generateTuple('#D97706'),
    },
    headings: {
      fontFamily: '"Libre Baskerville", Georgia, serif',
      fontWeight: '700',
    },
    fontFamily: '"Nunito", system-ui, sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #D4C4A0, #8B6B3E, #6B4E2E)',
      gradientButton: 'linear-gradient(135deg, #6B4E2E, #8B6B3E)',
      gradientHero: 'linear-gradient(135deg, #2C4A3E 0%, #8B6B3E 100%)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(139,107,62,0.12), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #8B6B3E, #6B4E2E)',
      glassBlur: '8px',
      glassOpacity: 0.9,
      glassBorder: '1px solid rgba(139, 107, 62, 0.10)',
      shadowColor: 'rgba(139, 107, 62, 0.12)',
      shadowIntensity: 'medium',
      transitionDuration: '400ms',
      animationStyle: 'subtle',
      buttonStyle: 'soft',
      cardStyle: 'raised',
      cardHoverEffect: 'lift',
      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: false,
      prefersDark: false,
      backgroundPattern: 'geometric',
      glassEnabled: false,
      fontWeightHeading: '700',
      fontWeightBody: '400',
      letterSpacing: '0',
      borderStyle: 'solid',
      borderColor: '#D4C8B8',
      borderLight: '#E8E0D4',
      bgPrimary: '#FAF8F5',
      bgSecondary: '#F5F0E8',
      bgCard: '#FFFFFF',
      bgSurface: '#FDFCFA',
      textPrimary: '#2C3E36',
      textSecondary: '#5A6B62',
      textMuted: '#8A9B92',
    },
  },

  // ========================================================================
  // 4. VERDE COLLECTIVE - Fresh Forest Green
  // ========================================================================
  'verde-collective': {
    primaryColor: 'verdeGreen',
    colors: {
      verdeGreen: verdeGreen,
      orgSecondary: generateTuple('#F5F0E1'),
      orgAccent: generateTuple('#E8B54D'),
    },
    headings: {
      fontFamily: '"DM Serif Display", Georgia, serif',
      fontWeight: '500',
    },
    fontFamily: '"DM Sans", system-ui, sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #A8DCC4, #3D7B5F, #2A5742)',
      gradientButton: 'linear-gradient(135deg, #2A5742, #3D7B5F)',
      gradientHero: 'linear-gradient(160deg, #2A5742 0%, #3D7B5F 50%, #5FAF8B 100%)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #F7FAF8 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(61,123,95,0.10), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #3D7B5F, #2A5742)',
      glassBlur: '12px',
      glassOpacity: 0.8,
      glassBorder: '1px solid rgba(61, 123, 95, 0.10)',
      shadowColor: 'rgba(61, 123, 95, 0.10)',
      shadowIntensity: 'subtle',
      transitionDuration: '250ms',
      animationStyle: 'smooth',
      buttonStyle: 'pill',
      cardStyle: 'flat',
      cardHoverEffect: 'glow',
      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: true,
      prefersDark: false,
      backgroundPattern: 'leaves',
      glassEnabled: true,
      fontWeightHeading: '500',
      fontWeightBody: '400',
      letterSpacing: '0',
      borderStyle: 'solid',
      borderColor: '#C0D8CC',
      borderLight: '#DCE8E2',
      bgPrimary: '#F7FAF8',
      bgSecondary: '#EDF5F0',
      bgCard: '#FFFFFF',
      bgSurface: '#FBFDFB',
      textPrimary: '#1A3A2C',
      textSecondary: '#3D5A4A',
      textMuted: '#6A8A7A',
    },
  },

  // ========================================================================
  // 5. CROWN ESTATES - Regal Purple
  // ========================================================================
  'crown-estates': {
    primaryColor: 'crownPurple',
    colors: {
      crownPurple: crownPurple,
      orgSecondary: generateTuple('#F8F5E8'),
      orgAccent: generateTuple('#D4AF37'),
    },
    headings: {
      fontFamily: '"Cinzel", Georgia, serif',
      fontWeight: '600',
    },
    fontFamily: '"Raleway", system-ui, sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #C498D4, #6E3D7B, #4A2854)',
      gradientButton: 'linear-gradient(135deg, #4A2854, #6E3D7B)',
      gradientHero: 'linear-gradient(135deg, #4A2854 0%, #6E3D7B 50%, #D4AF37 100%)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8FC 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(110,61,123,0.12), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #6E3D7B, #4A2854)',
      glassBlur: '16px',
      glassOpacity: 0.92,
      glassBorder: '1px solid rgba(110, 61, 123, 0.12)',
      shadowColor: 'rgba(110, 61, 123, 0.12)',
      shadowIntensity: 'medium',
      transitionDuration: '400ms',
      animationStyle: 'elegant',
      buttonStyle: 'rounded',
      cardStyle: 'glass',
      cardHoverEffect: 'glow',
      hasGradientText: true,
      hasAnimatedBorders: true,
      hasGlowEffects: true,
      prefersDark: false,
      backgroundPattern: 'artDeco',
      glassEnabled: true,
      fontWeightHeading: '600',
      fontWeightBody: '400',
      letterSpacing: '0.05em',
      borderStyle: 'solid',
      borderColor: '#D8C8E0',
      borderLight: '#EBE0F0',
      bgPrimary: '#FAF8FC',
      bgSecondary: '#F5F0F8',
      bgCard: '#FFFFFF',
      bgSurface: '#FDFBFE',
      textPrimary: '#2A1A30',
      textSecondary: '#5A4A62',
      textMuted: '#8A7A92',
    },
  },

  // ========================================================================
  // 6. OBSIDIAN SOCIETY - Dark Sophisticated
  // ========================================================================
  'obsidian-society': {
    primaryColor: 'obsidianSlate',
    colors: {
      obsidianSlate: obsidianSlate,
      orgSecondary: generateTuple('#0F172A'),
      orgAccent: generateTuple('#E2E8F0'),
    },
    headings: {
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      fontWeight: '600',
    },
    fontFamily: '"Inter", system-ui, sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #334155, #0F172A, #020617)',
      gradientButton: 'linear-gradient(135deg, #475569, #334155)',
      gradientHero: 'linear-gradient(180deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
      gradientCard: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(100,116,139,0.2), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #475569, #1E293B)',
      glassBlur: '32px',
      glassOpacity: 0.1,
      glassBorder: '1px solid rgba(148, 163, 184, 0.1)',
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowIntensity: 'dramatic',
      transitionDuration: '150ms',
      animationStyle: 'subtle',
      buttonStyle: 'sharp',
      cardStyle: 'outlined',
      cardHoverEffect: 'border',
      hasGradientText: false,
      hasAnimatedBorders: true,
      hasGlowEffects: false,
      prefersDark: true,
      backgroundPattern: 'waves',
      glassEnabled: true,
      fontWeightHeading: '600',
      fontWeightBody: '400',
      letterSpacing: '-0.025em',
      borderStyle: 'solid',
      borderColor: '#334155',
      borderLight: '#475569',
      bgPrimary: '#0F172A',
      bgSecondary: '#1E293B',
      bgCard: '#1E293B',
      bgSurface: '#0F172A',
      textPrimary: '#F8FAFC',
      textSecondary: '#CBD5E1',
      textMuted: '#64748B',
    },
  },

  // ========================================================================
  // 7. ROSE MERIDIAN - Warm Rose/Coral
  // ========================================================================
  'rose-meridian': {
    primaryColor: 'roseRed',
    colors: {
      roseRed: roseRed,
      orgSecondary: generateTuple('#FDF2F4'),
      orgAccent: generateTuple('#F97316'),
    },
    headings: {
      fontFamily: '"Prata", Georgia, serif',
      fontWeight: '400',
    },
    fontFamily: '"Quicksand", system-ui, sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #FFA5B8, #E11D48, #9F1239)',
      gradientButton: 'linear-gradient(135deg, #E11D48, #9F1239)',
      gradientHero: 'linear-gradient(135deg, #9F1239 0%, #E11D48 50%, #F97316 100%)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FFF5F7 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(225,29,72,0.15), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #E11D48, #9F1239)',
      glassBlur: '12px',
      glassOpacity: 0.75,
      glassBorder: '1px solid rgba(225, 29, 72, 0.10)',
      shadowColor: 'rgba(225, 29, 72, 0.15)',
      shadowIntensity: 'medium',
      transitionDuration: '150ms',
      animationStyle: 'energetic',
      buttonStyle: 'pill',
      cardStyle: 'flat',
      cardHoverEffect: 'scale',
      hasGradientText: true,
      hasAnimatedBorders: false,
      hasGlowEffects: true,
      prefersDark: false,
      backgroundPattern: 'geometric',
      glassEnabled: true,
      fontWeightHeading: '400',
      fontWeightBody: '500',
      letterSpacing: '0',
      borderStyle: 'solid',
      borderColor: '#FECDD3',
      borderLight: '#FFE4E9',
      bgPrimary: '#FFF5F7',
      bgSecondary: '#FFECF0',
      bgCard: '#FFFFFF',
      bgSurface: '#FFFBFC',
      textPrimary: '#4A1828',
      textSecondary: '#7A3848',
      textMuted: '#AA6878',
    },
  },

  // ========================================================================
  // 8. ARCTIC CIRCLE CLUB - Ice Blue/Silver
  // ========================================================================
  'arctic-circle': {
    primaryColor: 'arcticCyan',
    colors: {
      arcticCyan: arcticCyan,
      orgSecondary: generateTuple('#F0F9FF'),
      orgAccent: generateTuple('#94A3B8'),
    },
    headings: {
      fontFamily: '"Outfit", system-ui, sans-serif',
      fontWeight: '700',
    },
    fontFamily: '"Inter", system-ui, sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #CFFAFE, #06B6D4, #0891B2)',
      gradientButton: 'linear-gradient(135deg, #0891B2, #06B6D4)',
      gradientHero: 'linear-gradient(180deg, #0C4A6E 0%, #0891B2 50%, #67E8F9 100%)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #06B6D4, #0891B2)',
      glassBlur: '24px',
      glassOpacity: 0.7,
      glassBorder: '1px solid rgba(6, 182, 212, 0.12)',
      shadowColor: 'rgba(6, 182, 212, 0.15)',
      shadowIntensity: 'subtle',
      transitionDuration: '150ms',
      animationStyle: 'smooth',
      buttonStyle: 'rounded',
      cardStyle: 'glass',
      cardHoverEffect: 'glow',
      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: true,
      prefersDark: false,
      backgroundPattern: 'minimal',
      glassEnabled: true,
      fontWeightHeading: '700',
      fontWeightBody: '400',
      letterSpacing: '-0.025em',
      borderStyle: 'solid',
      borderColor: '#BAE6FD',
      borderLight: '#E0F2FE',
      bgPrimary: '#F0F9FF',
      bgSecondary: '#E0F2FE',
      bgCard: '#FFFFFF',
      bgSurface: '#F8FDFF',
      textPrimary: '#0C4A6E',
      textSecondary: '#0369A1',
      textMuted: '#7DD3FC',
    },
  },

  // ========================================================================
  // 9. FLAME & STONE - Deep Red/Burgundy
  // ========================================================================
  'flame-stone': {
    primaryColor: 'flameRed',
    colors: {
      flameRed: flameRed,
      orgSecondary: generateTuple('#292524'),
      orgAccent: generateTuple('#F59E0B'),
    },
    headings: {
      fontFamily: '"Bebas Neue", Impact, sans-serif',
      fontWeight: '400',
    },
    fontFamily: '"Roboto", system-ui, sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #FCA5A5, #991B1B, #7F1D1D)',
      gradientButton: 'linear-gradient(135deg, #7F1D1D, #991B1B)',
      gradientHero: 'linear-gradient(135deg, #1C1917 0%, #7F1D1D 50%, #F59E0B 100%)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FFFBFA 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(153,27,27,0.2), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #991B1B, #7F1D1D)',
      glassBlur: '8px',
      glassOpacity: 0.9,
      glassBorder: '1px solid rgba(153, 27, 27, 0.15)',
      shadowColor: 'rgba(153, 27, 27, 0.2)',
      shadowIntensity: 'strong',
      transitionDuration: '250ms',
      animationStyle: 'dramatic',
      buttonStyle: 'sharp',
      cardStyle: 'raised',
      cardHoverEffect: 'lift',
      hasGradientText: true,
      hasAnimatedBorders: true,
      hasGlowEffects: true,
      prefersDark: false,
      backgroundPattern: 'geometric',
      glassEnabled: false,
      fontWeightHeading: '400',
      fontWeightBody: '400',
      letterSpacing: '0.1em',
      borderStyle: 'solid',
      borderColor: '#FECACA',
      borderLight: '#FEE2E2',
      bgPrimary: '#FFFBFA',
      bgSecondary: '#FEF2F2',
      bgCard: '#FFFFFF',
      bgSurface: '#FFFCFB',
      textPrimary: '#1C1917',
      textSecondary: '#44403C',
      textMuted: '#78716C',
    },
    radius: {
      xs: '0px',
      sm: '0px',
      md: '2px',
      lg: '4px',
      xl: '8px',
    },
  },

  // ========================================================================
  // 10. MARIGOLD SOCIETY - Warm Orange/Amber
  // ========================================================================
  'marigold-society': {
    primaryColor: 'marigoldOrange',
    colors: {
      marigoldOrange: marigoldOrange,
      orgSecondary: generateTuple('#FFFBEB'),
      orgAccent: generateTuple('#7C3AED'),
    },
    headings: {
      fontFamily: '"Fredoka", cursive, sans-serif',
      fontWeight: '600',
    },
    fontFamily: '"Nunito Sans", system-ui, sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #FED7AA, #EA580C, #C2410C)',
      gradientButton: 'linear-gradient(135deg, #EA580C, #C2410C)',
      gradientHero: 'linear-gradient(135deg, #C2410C 0%, #EA580C 50%, #7C3AED 100%)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FFFAF5 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(234,88,12,0.2), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #EA580C, #C2410C)',
      glassBlur: '12px',
      glassOpacity: 0.8,
      glassBorder: '1px solid rgba(234, 88, 12, 0.10)',
      shadowColor: 'rgba(234, 88, 12, 0.2)',
      shadowIntensity: 'medium',
      transitionDuration: '150ms',
      animationStyle: 'energetic',
      buttonStyle: 'pill',
      cardStyle: 'flat',
      cardHoverEffect: 'scale',
      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: false,
      prefersDark: false,
      backgroundPattern: 'particles',
      glassEnabled: false,
      fontWeightHeading: '600',
      fontWeightBody: '400',
      letterSpacing: '0',
      borderStyle: 'solid',
      borderColor: '#FED7AA',
      borderLight: '#FFEDD5',
      bgPrimary: '#FFFAF5',
      bgSecondary: '#FFF5EB',
      bgCard: '#FFFFFF',
      bgSurface: '#FFFCF8',
      textPrimary: '#431407',
      textSecondary: '#7C2D12',
      textMuted: '#C2410C',
    },
  },

  // ========================================================================
  // 11. MIDNIGHT AZURE - Deep Navy/Indigo
  // ========================================================================
  'midnight-azure': {
    primaryColor: 'azureBlue',
    colors: {
      azureBlue: azureBlue,
      orgSecondary: generateTuple('#F8FAFC'),
      orgAccent: generateTuple('#F59E0B'),
    },
    headings: {
      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
      fontWeight: '700',
    },
    fontFamily: '"Inter", system-ui, sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #93C5FD, #1E3A8A, #1E3A5F)',
      gradientButton: 'linear-gradient(135deg, #1E3A5F, #1E3A8A)',
      gradientHero: 'linear-gradient(180deg, #1E3A5F 0%, #1E3A8A 50%, #3B82F6 100%)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(30,58,138,0.12), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #1E3A8A, #1E3A5F)',
      glassBlur: '4px',
      glassOpacity: 0.95,
      glassBorder: '1px solid rgba(30, 58, 138, 0.08)',
      shadowColor: 'rgba(30, 58, 138, 0.12)',
      shadowIntensity: 'subtle',
      transitionDuration: '150ms',
      animationStyle: 'subtle',
      buttonStyle: 'rounded',
      cardStyle: 'raised',
      cardHoverEffect: 'lift',
      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: false,
      prefersDark: false,
      backgroundPattern: 'hexagons',
      glassEnabled: false,
      fontWeightHeading: '700',
      fontWeightBody: '400',
      letterSpacing: '-0.025em',
      borderStyle: 'solid',
      borderColor: '#CBD5E1',
      borderLight: '#E2E8F0',
      bgPrimary: '#F8FAFC',
      bgSecondary: '#F1F5F9',
      bgCard: '#FFFFFF',
      bgSurface: '#FAFBFC',
      textPrimary: '#0F172A',
      textSecondary: '#334155',
      textMuted: '#64748B',
    },
  },

  // ========================================================================
  // 12. JADE DYNASTY - Rich Emerald
  // ========================================================================
  'jade-dynasty': {
    primaryColor: 'jadeEmerald',
    colors: {
      jadeEmerald: jadeEmerald,
      orgSecondary: generateTuple('#FFFBEB'),
      orgAccent: generateTuple('#D4AF37'),
    },
    headings: {
      fontFamily: '"Noto Serif Display", Georgia, serif',
      fontWeight: '600',
    },
    fontFamily: '"Noto Sans", system-ui, sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #6EE7B7, #047857, #065F46)',
      gradientButton: 'linear-gradient(135deg, #065F46, #047857)',
      gradientHero: 'linear-gradient(135deg, #065F46 0%, #047857 50%, #D4AF37 100%)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #F0FDF9 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(4,120,87,0.15), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #047857, #065F46)',
      glassBlur: '16px',
      glassOpacity: 0.85,
      glassBorder: '1px solid rgba(4, 120, 87, 0.12)',
      shadowColor: 'rgba(4, 120, 87, 0.15)',
      shadowIntensity: 'medium',
      transitionDuration: '400ms',
      animationStyle: 'elegant',
      buttonStyle: 'soft',
      cardStyle: 'outlined',
      cardHoverEffect: 'glow',
      hasGradientText: true,
      hasAnimatedBorders: true,
      hasGlowEffects: true,
      prefersDark: false,
      backgroundPattern: 'artDeco',
      glassEnabled: true,
      fontWeightHeading: '600',
      fontWeightBody: '400',
      letterSpacing: '0',
      borderStyle: 'double',
      borderColor: '#A7F3D0',
      borderLight: '#D1FAE5',
      bgPrimary: '#F0FDF9',
      bgSecondary: '#ECFDF5',
      bgCard: '#FFFFFF',
      bgSurface: '#F8FDFB',
      textPrimary: '#064E3B',
      textSecondary: '#047857',
      textMuted: '#34D399',
    },
  },

  // ========================================================================
  // 13. COPPER & OAK - Warm Terracotta
  // ========================================================================
  'copper-oak': {
    primaryColor: 'copperAmber',
    colors: {
      copperAmber: copperAmber,
      orgSecondary: generateTuple('#292524'),
      orgAccent: generateTuple('#166534'),
    },
    headings: {
      fontFamily: '"Lora", Georgia, serif',
      fontWeight: '700',
    },
    fontFamily: '"Open Sans", system-ui, sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #FDE68A, #B45309, #92400E)',
      gradientButton: 'linear-gradient(135deg, #92400E, #B45309)',
      gradientHero: 'linear-gradient(135deg, #292524 0%, #92400E 50%, #166534 100%)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FFFBF5 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(180,83,9,0.15), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #B45309, #92400E)',
      glassBlur: '8px',
      glassOpacity: 0.9,
      glassBorder: '1px solid rgba(180, 83, 9, 0.10)',
      shadowColor: 'rgba(180, 83, 9, 0.15)',
      shadowIntensity: 'medium',
      transitionDuration: '400ms',
      animationStyle: 'subtle',
      buttonStyle: 'soft',
      cardStyle: 'raised',
      cardHoverEffect: 'lift',
      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: false,
      prefersDark: false,
      backgroundPattern: 'leaves',
      glassEnabled: false,
      fontWeightHeading: '700',
      fontWeightBody: '400',
      letterSpacing: '0',
      borderStyle: 'solid',
      borderColor: '#FDE68A',
      borderLight: '#FEF3C7',
      bgPrimary: '#FFFBF5',
      bgSecondary: '#FEF7ED',
      bgCard: '#FFFFFF',
      bgSurface: '#FFFCF7',
      textPrimary: '#292524',
      textSecondary: '#57534E',
      textMuted: '#A8A29E',
    },
  },

  // ========================================================================
  // 14. LAVENDER FIELDS - Soft Purple/Lilac
  // ========================================================================
  'lavender-fields': {
    primaryColor: 'lavenderViolet',
    colors: {
      lavenderViolet: lavenderViolet,
      orgSecondary: generateTuple('#FAF5FF'),
      orgAccent: generateTuple('#EC4899'),
    },
    headings: {
      fontFamily: '"Gilda Display", Georgia, serif',
      fontWeight: '400',
    },
    fontFamily: '"Karla", system-ui, sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #C4B5FD, #7C3AED, #5B21B6)',
      gradientButton: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
      gradientHero: 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 50%, #EC4899 100%)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
      glassBlur: '16px',
      glassOpacity: 0.75,
      glassBorder: '1px solid rgba(124, 58, 237, 0.10)',
      shadowColor: 'rgba(124, 58, 237, 0.12)',
      shadowIntensity: 'subtle',
      transitionDuration: '250ms',
      animationStyle: 'smooth',
      buttonStyle: 'pill',
      cardStyle: 'glass',
      cardHoverEffect: 'glow',
      hasGradientText: true,
      hasAnimatedBorders: false,
      hasGlowEffects: true,
      prefersDark: false,
      backgroundPattern: 'leaves',
      glassEnabled: true,
      fontWeightHeading: '400',
      fontWeightBody: '400',
      letterSpacing: '0.025em',
      borderStyle: 'solid',
      borderColor: '#DDD6FE',
      borderLight: '#EDE9FE',
      bgPrimary: '#FAF5FF',
      bgSecondary: '#F3E8FF',
      bgCard: '#FFFFFF',
      bgSurface: '#FCFAFF',
      textPrimary: '#2E1065',
      textSecondary: '#4C1D95',
      textMuted: '#8B5CF6',
    },
  },

  // ========================================================================
  // 15. SLATE MODERN - Cool Gray with Teal
  // ========================================================================
  'slate-modern': {
    primaryColor: 'slateTeal',
    colors: {
      slateTeal: slateTeal,
      orgSecondary: generateTuple('#F8FAFC'),
      orgAccent: generateTuple('#14B8A6'),
    },
    headings: {
      fontFamily: '"Sora", system-ui, sans-serif',
      fontWeight: '600',
    },
    fontFamily: '"Inter", system-ui, sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #CBD5E1, #475569, #334155)',
      gradientButton: 'linear-gradient(135deg, #475569, #334155)',
      gradientHero: 'linear-gradient(135deg, #334155 0%, #475569 50%, #14B8A6 100%)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(71,85,105,0.1), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #475569, #334155)',
      glassBlur: '4px',
      glassOpacity: 0.95,
      glassBorder: '1px solid rgba(71, 85, 105, 0.08)',
      shadowColor: 'rgba(71, 85, 105, 0.1)',
      shadowIntensity: 'subtle',
      transitionDuration: '150ms',
      animationStyle: 'subtle',
      buttonStyle: 'rounded',
      cardStyle: 'outlined',
      cardHoverEffect: 'border',
      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: false,
      prefersDark: false,
      backgroundPattern: 'hexagons',
      glassEnabled: false,
      fontWeightHeading: '600',
      fontWeightBody: '400',
      letterSpacing: '-0.025em',
      borderStyle: 'solid',
      borderColor: '#CBD5E1',
      borderLight: '#E2E8F0',
      bgPrimary: '#F8FAFC',
      bgSecondary: '#F1F5F9',
      bgCard: '#FFFFFF',
      bgSurface: '#FAFBFC',
      textPrimary: '#0F172A',
      textSecondary: '#334155',
      textMuted: '#64748B',
    },
  },

  // ========================================================================
  // 16. NEON DISTRICT - Synthwave/Cyberpunk
  // ========================================================================
  'neon-district': {
    primaryColor: 'neonMagenta',
    colors: {
      neonMagenta: neonMagenta,
      orgSecondary: neonCyan,
      orgAccent: generateTuple('#FF6B00'),
    },
    headings: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: '700',
    },
    fontFamily: '"Exo 2", sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #FF00FF, #00FFFF, #FF6B00)',
      gradientButton: 'linear-gradient(135deg, #FF00FF, #CC00CC)',
      gradientHero: 'linear-gradient(135deg, #0A0A1A 0%, #FF00FF 50%, #00FFFF 100%)',
      gradientCard: 'linear-gradient(180deg, #161630 0%, #0D0D20 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(255,0,255,0.3), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #FF00FF, #00FFFF)',
      glassBlur: '24px',
      glassOpacity: 0.15,
      glassBorder: '1px solid rgba(255, 0, 255, 0.2)',
      shadowColor: 'rgba(255, 0, 255, 0.3)',
      shadowIntensity: 'dramatic',
      transitionDuration: '150ms',
      animationStyle: 'energetic',
      buttonStyle: 'sharp',
      cardStyle: 'glass',
      cardHoverEffect: 'glow',
      hasGradientText: true,
      hasAnimatedBorders: true,
      hasGlowEffects: true,
      prefersDark: true,
      backgroundPattern: 'particles',
      glassEnabled: true,
      fontWeightHeading: '700',
      fontWeightBody: '400',
      letterSpacing: '0.025em',
      borderStyle: 'solid',
      borderColor: '#3D3D6B',
      borderLight: '#4D4D7B',
      bgPrimary: '#0A0A1A',
      bgSecondary: '#12122A',
      bgCard: '#161630',
      bgSurface: '#0D0D20',
      textPrimary: '#F0F0FF',
      textSecondary: '#C0C0E0',
      textMuted: '#8080A0',
    },
    radius: {
      xs: '2px',
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px',
    },
  },

  // ========================================================================
  // 17. ZEN GARDEN - Wabi-Sabi
  // ========================================================================
  'zen-garden': {
    primaryColor: 'zenMoss',
    colors: {
      zenMoss: zenMoss,
      orgSecondary: generateTuple('#D4C5B0'),
      orgAccent: generateTuple('#8B7355'),
    },
    headings: {
      fontFamily: '"Noto Serif JP", Georgia, serif',
      fontWeight: '500',
    },
    fontFamily: '"Work Sans", system-ui, sans-serif',
    other: {
      gradient: 'linear-gradient(180deg, #F5F3EF 0%, #EDE9E3 100%)',
      gradientButton: 'linear-gradient(135deg, #5C6B52, #3D4A35)',
      gradientHero: 'linear-gradient(180deg, #5C6B52 0%, #D4C5B0 100%)',
      gradientCard: 'linear-gradient(180deg, #FDFCFA 0%, #F5F3EF 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(92,107,82,0.08), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #5C6B52, #3D4A35)',
      glassBlur: '8px',
      glassOpacity: 0.9,
      glassBorder: '1px solid rgba(92, 107, 82, 0.06)',
      shadowColor: 'rgba(92, 107, 82, 0.08)',
      shadowIntensity: 'subtle',
      transitionDuration: '600ms',
      animationStyle: 'subtle',
      buttonStyle: 'sharp',
      cardStyle: 'flat',
      cardHoverEffect: 'none',
      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: false,
      prefersDark: false,
      backgroundPattern: 'minimal',
      glassEnabled: false,
      fontWeightHeading: '500',
      fontWeightBody: '400',
      letterSpacing: '0.05em',
      borderStyle: 'solid',
      borderColor: '#D4CEC4',
      borderLight: '#E5E0D8',
      bgPrimary: '#F5F3EF',
      bgSecondary: '#EDE9E3',
      bgCard: '#FDFCFA',
      bgSurface: '#F8F6F2',
      textPrimary: '#2C3328',
      textSecondary: '#4A5245',
      textMuted: '#7A8275',
    },
    radius: {
      xs: '0px',
      sm: '0px',
      md: '2px',
      lg: '4px',
      xl: '8px',
    },
  },

  // ========================================================================
  // 18. THE FORGE - Brutalist/Industrial
  // ========================================================================
  'the-forge': {
    primaryColor: 'forgePure',
    colors: {
      forgePure: forgePure,
      orgSecondary: forgeRed,
      orgAccent: generateTuple('#FBBF24'),
    },
    headings: {
      fontFamily: '"Space Grotesk", system-ui, sans-serif',
      fontWeight: '700',
    },
    fontFamily: '"JetBrains Mono", monospace',
    other: {
      gradient: 'linear-gradient(135deg, #000000, #333333)',
      gradientButton: 'linear-gradient(90deg, #000000, #000000)',
      gradientHero: 'linear-gradient(135deg, #000000 0%, #EF4444 100%)',
      gradientCard: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(239,68,68,0.15), transparent 70%)',
      avatarBg: '#000000',
      glassBlur: '4px',
      glassOpacity: 0.9,
      glassBorder: '2px solid #000000',
      shadowColor: 'rgba(0, 0, 0, 0.25)',
      shadowIntensity: 'strong',
      transitionDuration: '150ms',
      animationStyle: 'subtle',
      buttonStyle: 'sharp',
      cardStyle: 'outlined',
      cardHoverEffect: 'border',
      hasGradientText: false,
      hasAnimatedBorders: false,
      hasGlowEffects: false,
      prefersDark: false,
      backgroundPattern: 'geometric',
      glassEnabled: false,
      fontWeightHeading: '700',
      fontWeightBody: '400',
      letterSpacing: '-0.025em',
      borderStyle: 'solid',
      borderColor: '#000000',
      borderLight: '#333333',
      bgPrimary: '#F5F5F5',
      bgSecondary: '#EBEBEB',
      bgCard: '#FFFFFF',
      bgSurface: '#F8F8F8',
      textPrimary: '#000000',
      textSecondary: '#333333',
      textMuted: '#666666',
    },
    radius: {
      xs: '0px',
      sm: '0px',
      md: '0px',
      lg: '0px',
      xl: '0px',
    },
  },

  // ========================================================================
  // 19. GOLDEN ERA - Art Deco Revival
  // ========================================================================
  'golden-era': {
    primaryColor: 'goldenEraGold',
    colors: {
      goldenEraGold: goldenEraGold,
      orgSecondary: generateTuple('#0A0A0A'),
      orgAccent: generateTuple('#50C878'),
    },
    headings: {
      fontFamily: '"Poiret One", cursive',
      fontWeight: '400',
    },
    fontFamily: '"Raleway", sans-serif',
    other: {
      gradient: 'linear-gradient(135deg, #D4AF37, #A08530, #D4AF37)',
      gradientButton: 'linear-gradient(135deg, #D4AF37, #A08530)',
      gradientHero: 'linear-gradient(135deg, #0A0A0A 0%, #D4AF37 50%, #50C878 100%)',
      gradientCard: 'linear-gradient(180deg, #FFFEF5 0%, #F5F5DC 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(212,175,55,0.25), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #D4AF37, #A08530)',
      glassBlur: '16px',
      glassOpacity: 0.85,
      glassBorder: '1px solid rgba(212, 175, 55, 0.20)',
      shadowColor: 'rgba(212, 175, 55, 0.25)',
      shadowIntensity: 'medium',
      transitionDuration: '400ms',
      animationStyle: 'elegant',
      buttonStyle: 'rounded',
      cardStyle: 'raised',
      cardHoverEffect: 'glow',
      hasGradientText: true,
      hasAnimatedBorders: true,
      hasGlowEffects: true,
      prefersDark: false,
      backgroundPattern: 'artDeco',
      glassEnabled: true,
      fontWeightHeading: '400',
      fontWeightBody: '400',
      letterSpacing: '0.1em',
      borderStyle: 'double',
      borderColor: '#D4AF37',
      borderLight: '#E8C86B',
      bgPrimary: '#F5F5DC',
      bgSecondary: '#EBE8CC',
      bgCard: '#FFFEF5',
      bgSurface: '#FAF8E8',
      textPrimary: '#0A0A0A',
      textSecondary: '#2A2A2A',
      textMuted: '#5A5A5A',
    },
  },

  // ========================================================================
  // 20. PIXEL PIONEERS - Retro Gaming
  // ========================================================================
  'pixel-pioneers': {
    primaryColor: 'pixelRed',
    colors: {
      pixelRed: pixelRed,
      orgSecondary: pixelBlue,
      orgAccent: generateTuple('#F39C12'),
    },
    headings: {
      fontFamily: '"Press Start 2P", monospace',
      fontWeight: '400',
    },
    fontFamily: '"VT323", monospace',
    fontSizes: {
      xs: '0.875rem',
      sm: '1rem',
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
    },
    other: {
      gradient: 'linear-gradient(90deg, #E74C3C, #3498DB, #F39C12)',
      gradientButton: 'linear-gradient(90deg, #E74C3C, #C0392B)',
      gradientHero: 'linear-gradient(90deg, #E74C3C 0%, #3498DB 50%, #F39C12 100%)',
      gradientCard: 'linear-gradient(180deg, #121212 0%, #0A0A0A 100%)',
      gradientGlow: 'radial-gradient(circle, rgba(231,76,60,0.4), transparent 70%)',
      avatarBg: 'linear-gradient(135deg, #E74C3C, #F39C12)',
      glassBlur: '4px',
      glassOpacity: 0.2,
      glassBorder: '2px solid #3498DB',
      shadowColor: 'rgba(231, 76, 60, 0.4)',
      shadowIntensity: 'dramatic',
      transitionDuration: '150ms',
      animationStyle: 'energetic',
      buttonStyle: 'sharp',
      cardStyle: 'outlined',
      cardHoverEffect: 'glow',
      hasGradientText: true,
      hasAnimatedBorders: true,
      hasGlowEffects: true,
      prefersDark: true,
      backgroundPattern: 'particles',
      glassEnabled: false,
      fontWeightHeading: '400',
      fontWeightBody: '400',
      letterSpacing: '0',
      borderStyle: 'solid',
      borderColor: '#3498DB',
      borderLight: '#5DADE2',
      bgPrimary: '#0E0E0E',
      bgSecondary: '#161616',
      bgCard: '#121212',
      bgSurface: '#0A0A0A',
      textPrimary: '#FFFFFF',
      textSecondary: '#E0E0E0',
      textMuted: '#A0A0A0',
    },
    radius: {
      xs: '0px',
      sm: '0px',
      md: '0px',
      lg: '0px',
      xl: '0px',
    },
  },
};

export default ORG_THEME_OVERRIDES;

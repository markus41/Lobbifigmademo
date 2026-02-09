/**
 * Lobbi CSS Variables Resolver for Mantine v7
 *
 * Outputs org-specific CSS custom properties that blend Mantine's built-in
 * variables with Lobbi's luxury design tokens.
 */
import type { CSSVariablesResolver } from '@mantine/core';

export const lobbiCssVariablesResolver: CSSVariablesResolver = (theme) => {
  const other = theme.other || {};
  const primaryColor = theme.primaryColor || 'gold';
  const colors = theme.colors?.[primaryColor];
  const primary6 = colors?.[6] || '#A88526';
  const primary4 = colors?.[4] || '#D4AF37';
  const primary2 = colors?.[2] || '#EDDA7A';
  const primary8 = colors?.[8] || '#6B5518';

  return {
    // Variables that apply to both light and dark modes
    variables: {
      // Brand / Primary
      '--lobbi-primary': primary6,
      '--lobbi-primary-light': primary4,
      '--lobbi-primary-pale': colors?.[0] || '#FBF3D5',
      '--lobbi-primary-dark': primary8,

      // Glass morphism
      '--lobbi-glass-blur': other.glassBlur || '40px',
      '--lobbi-glass-opacity': String(other.glassOpacity ?? 0.08),
      '--lobbi-glass-border': other.glassBorder || '1px solid rgba(255, 255, 255, 0.12)',
      '--lobbi-glass-enabled': other.glassEnabled ? '1' : '0',

      // Gradients
      '--lobbi-gradient': other.gradient || `linear-gradient(135deg, ${primary2}, ${primary6}, ${primary8})`,
      '--lobbi-gradient-btn': other.gradientButton || `linear-gradient(135deg, ${primary8}, ${primary6})`,
      '--lobbi-gradient-hero': other.gradientHero || `linear-gradient(135deg, #1A1A2E 0%, #2D2D44 50%, ${primary6} 100%)`,
      '--lobbi-gradient-card': other.gradientCard || 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF7 100%)',
      '--lobbi-gradient-glow': other.gradientGlow || `radial-gradient(circle, ${primary6}26, transparent 70%)`,
      '--lobbi-avatar-bg': other.avatarBg || `linear-gradient(135deg, ${primary6}, ${primary8})`,

      // Animation
      '--lobbi-transition-duration': other.transitionDuration || '250ms',
      '--lobbi-transition-easing': other.transitionEasing || 'cubic-bezier(0.4, 0, 0.2, 1)',
      '--lobbi-easing-lux': 'cubic-bezier(0.4, 0, 0.2, 1)',
      '--lobbi-easing-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

      // Typography
      '--lobbi-font-display': theme.headings?.fontFamily || '"Cormorant Garamond", Georgia, serif',
      '--lobbi-font-body': theme.fontFamily || '"DM Sans", system-ui, sans-serif',
      '--lobbi-font-mono': theme.fontFamilyMonospace || '"JetBrains Mono", monospace',
      '--lobbi-letter-spacing': other.letterSpacing || '0',
      '--lobbi-font-weight-heading': other.fontWeightHeading || '600',
      '--lobbi-font-weight-body': other.fontWeightBody || '400',

      // Layout
      '--lobbi-sidebar-width': other.sidebarWidth || '280px',
      '--lobbi-header-height': other.headerHeight || '64px',
      '--lobbi-max-content-width': other.maxContentWidth || '1200px',

      // Shadows
      '--lobbi-shadow-color': other.shadowColor || 'rgba(139, 110, 31, 0.10)',

      // Button style
      '--lobbi-button-radius': getButtonRadius(other.buttonStyle),

      // Effects flags
      '--lobbi-gradient-text-enabled': other.hasGradientText ? '1' : '0',
      '--lobbi-animated-borders-enabled': other.hasAnimatedBorders ? '1' : '0',
      '--lobbi-glow-effects-enabled': other.hasGlowEffects ? '1' : '0',

      // Accessibility
      '--lobbi-dyslexic-font': other.dyslexicFont || '"OpenDyslexic", "Comic Sans MS", sans-serif',
    },

    // Light mode specific variables
    light: {
      '--lobbi-border': other.borderColor || 'var(--mantine-color-gray-3)',
      '--lobbi-border-light': other.borderLight || 'var(--mantine-color-gray-2)',
      '--lobbi-bg-primary': other.bgPrimary || '#FAF6E9',
      '--lobbi-bg-secondary': other.bgSecondary || '#F5EFD9',
      '--lobbi-bg-card': other.bgCard || '#FFFFFF',
      '--lobbi-bg-surface': other.bgSurface || '#FFFDF7',
      '--lobbi-text-primary': other.textPrimary || '#1A1A2E',
      '--lobbi-text-secondary': other.textSecondary || '#4A4A5A',
      '--lobbi-text-muted': other.textMuted || '#7A7A8A',
      '--lobbi-bg-glass': `rgba(255, 255, 255, ${other.glassOpacity ?? 0.08})`,
    },

    // Dark mode specific variables
    dark: {
      '--lobbi-border': darken(other.borderColor, 0.4) || 'var(--mantine-color-dark-4)',
      '--lobbi-border-light': darken(other.borderLight, 0.4) || 'var(--mantine-color-dark-3)',
      '--lobbi-bg-primary': other.prefersDark ? (other.bgPrimary || '#0F172A') : '#1A1610',
      '--lobbi-bg-secondary': other.prefersDark ? (other.bgSecondary || '#1E293B') : '#252018',
      '--lobbi-bg-card': other.prefersDark ? (other.bgCard || '#1E293B') : '#2A2520',
      '--lobbi-bg-surface': other.prefersDark ? (other.bgSurface || '#0F172A') : '#1E1A16',
      '--lobbi-text-primary': other.prefersDark ? (other.textPrimary || '#F8FAFC') : '#FAF8F5',
      '--lobbi-text-secondary': other.prefersDark ? (other.textSecondary || '#CBD5E1') : '#D4C9BB',
      '--lobbi-text-muted': other.prefersDark ? (other.textMuted || '#64748B') : '#9A8B7A',
      '--lobbi-bg-glass': `rgba(0, 0, 0, ${Math.min((other.glassOpacity ?? 0.08) + 0.1, 1)})`,
    },
  };
};

// ============================================================================
// HELPERS
// ============================================================================

function getButtonRadius(style?: string): string {
  switch (style) {
    case 'pill': return '9999px';
    case 'sharp': return '0px';
    case 'soft': return '12px';
    case 'rounded':
    default: return '8px';
  }
}

function darken(hex: string | undefined, _amount: number): string {
  // For dark mode, we use Mantine's built-in dark colors as fallback
  if (!hex) return '';
  return hex;
}

export default lobbiCssVariablesResolver;

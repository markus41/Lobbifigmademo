// ============================================================================
// THEME MAPPER UTILITIES
// ============================================================================
// Maps OrgTheme properties to CSS utility classes, inline styles, and
// Framer Motion variants for theme-aware component styling.
// ============================================================================

import type { CSSProperties } from 'react';
import type { OrgTheme, Organization } from '../data/themes';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface MotionVariants {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit?: Record<string, unknown>;
  hover?: Record<string, unknown>;
  tap?: Record<string, unknown>;
}

export interface StaggerConfig {
  staggerChildren: number;
  delayChildren: number;
}

export interface ThemeStyles {
  classes: string;
  styles: CSSProperties;
}

// ============================================================================
// ACCESSIBILITY: REDUCED MOTION SUPPORT
// ============================================================================

/**
 * Reduced motion variants for users who prefer reduced motion.
 * These variants only animate opacity, no transforms or position changes.
 */
export const REDUCED_MOTION_VARIANTS: MotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.01 } },
  exit: { opacity: 0, transition: { duration: 0.01 } },
  hover: {},
  tap: {},
};

/**
 * Check if user prefers reduced motion (for SSR-safe detection)
 * Use Framer Motion's useReducedMotion hook in components for reactive detection
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/**
 * Get motion variants with reduced motion fallback
 * @param animationStyle - The animation style from OrgTheme
 * @param respectReducedMotion - Whether to check for reduced motion preference (default: true)
 */
export function getAccessibleMotionVariants(
  animationStyle: OrgTheme['animationStyle'],
  respectReducedMotion: boolean = true
): MotionVariants {
  if (respectReducedMotion && prefersReducedMotion()) {
    return REDUCED_MOTION_VARIANTS;
  }
  return getMotionVariants(animationStyle);
}

// ============================================================================
// ANIMATION TIMING CONFIGURATIONS
// ============================================================================

const ANIMATION_TIMINGS: Record<OrgTheme['animationStyle'], {
  duration: number;
  easing: number[];
  springConfig?: { stiffness: number; damping: number };
  stagger: number;
}> = {
  elegant: {
    duration: 1.4,
    easing: [0.22, 1, 0.36, 1],
    stagger: 0.12,
  },
  smooth: {
    duration: 0.9,
    easing: [0.4, 0, 0.2, 1],
    stagger: 0.08,
  },
  energetic: {
    duration: 0.5,
    easing: [0.34, 1.56, 0.64, 1],
    springConfig: { stiffness: 400, damping: 25 },
    stagger: 0.04,
  },
  dramatic: {
    duration: 1.2,
    easing: [0.6, 0.01, 0, 0.9],
    stagger: 0.1,
  },
  subtle: {
    duration: 0.7,
    easing: [0.4, 0, 1, 1],
    stagger: 0.06,
  },
};

const TRANSITION_DURATIONS: Record<OrgTheme['transitionDuration'], number> = {
  fast: 150,
  normal: 250,
  slow: 400,
  slower: 600,
};

// ============================================================================
// CSS CLASS MAPPING FUNCTIONS
// ============================================================================

/**
 * Get CSS classes for card styling based on OrgTheme
 */
export function getCardClasses(theme: OrgTheme): string {
  const classes: string[] = [];

  // Card style base class
  switch (theme.cardStyle) {
    case 'flat':
      classes.push('card-flat');
      break;
    case 'raised':
      classes.push('card-raised');
      break;
    case 'outlined':
      classes.push('card-outlined');
      break;
    case 'glass':
      classes.push('card-glass');
      break;
    default:
      classes.push('card-themed');
  }

  // Card hover effect
  switch (theme.cardHoverEffect) {
    case 'lift':
      classes.push('card-lift-glow');
      break;
    case 'glow':
      classes.push('hover-glow');
      break;
    case 'scale':
      classes.push('card-expand');
      break;
    case 'border':
      classes.push('card-border-reveal');
      break;
  }

  // Glass effect
  if (theme.glassEnabled) {
    classes.push('glass-themed');
  }

  // Glow effects
  if (theme.hasGlowEffects) {
    classes.push('pulse-glow');
  }

  // Animated borders
  if (theme.hasAnimatedBorders) {
    classes.push('border-gradient');
  }

  // Animation speed
  switch (theme.transitionDuration) {
    case 'fast':
      classes.push('animate-fast');
      break;
    case 'slow':
      classes.push('animate-slow');
      break;
    case 'slower':
      classes.push('animate-slower');
      break;
    default:
      classes.push('animate-normal');
  }

  return classes.join(' ');
}

/**
 * Get CSS classes for button styling based on OrgTheme
 */
export function getButtonClasses(theme: OrgTheme): string {
  const classes: string[] = ['btn-themed', 'btn-press'];

  // Button style radius
  switch (theme.buttonStyle) {
    case 'pill':
      classes.push('rounded-full');
      break;
    case 'sharp':
      classes.push('rounded-none');
      break;
    case 'soft':
      classes.push('rounded-lg');
      break;
    default:
      classes.push('rounded-md');
  }

  // Shadow
  if (theme.buttonShadow) {
    classes.push('shadow-themed-md');
  }

  // Hover effects based on animation style
  if (theme.animationStyle === 'energetic') {
    classes.push('magnetic-hover');
  } else if (theme.animationStyle === 'elegant' || theme.animationStyle === 'dramatic') {
    classes.push('hover-lift');
  }

  // Ripple effect
  classes.push('ripple-container');

  return classes.join(' ');
}

/**
 * Get CSS classes for input styling based on OrgTheme
 */
export function getInputClasses(theme: OrgTheme): string {
  const classes: string[] = ['input-glow'];

  // Border style
  if (theme.borderStyle === 'double') {
    classes.push('deco-border');
  }

  // Border radius
  switch (theme.borderRadius) {
    case 'none':
      classes.push('rounded-none');
      break;
    case 'sm':
      classes.push('rounded-sm');
      break;
    case 'lg':
      classes.push('rounded-lg');
      break;
    case 'xl':
      classes.push('rounded-xl');
      break;
    case '2xl':
      classes.push('rounded-2xl');
      break;
    case 'full':
      classes.push('rounded-full');
      break;
    default:
      classes.push('rounded-md');
  }

  // Animation speed
  switch (theme.transitionDuration) {
    case 'fast':
      classes.push('animate-fast');
      break;
    case 'slow':
      classes.push('animate-slow');
      break;
    case 'slower':
      classes.push('animate-slower');
      break;
    default:
      classes.push('animate-normal');
  }

  return classes.join(' ');
}

/**
 * Get CSS classes for animation effects based on OrgTheme
 */
export function getAnimationClasses(theme: OrgTheme): string {
  const classes: string[] = [];

  // Base animation style
  switch (theme.animationStyle) {
    case 'elegant':
      classes.push('zen-transition');
      break;
    case 'dramatic':
      classes.push('tilt-hover');
      break;
    case 'energetic':
      classes.push('magnetic-hover');
      break;
  }

  // Glow effects
  if (theme.hasGlowEffects) {
    classes.push('glow-effect');
  }

  // Gradient text
  if (theme.hasGradientText) {
    classes.push('gradient-text-themed');
  }

  // Animated borders
  if (theme.hasAnimatedBorders) {
    classes.push('animated-border');
  }

  // Float effect for subtle/elegant themes
  if (theme.animationStyle === 'elegant' || theme.animationStyle === 'subtle') {
    classes.push('float-subtle');
  }

  return classes.join(' ');
}

/**
 * Get CSS classes for text styling based on OrgTheme
 */
export function getTextClasses(theme: OrgTheme, type: 'display' | 'body' | 'mono' = 'body'): string {
  const classes: string[] = [];

  // Font family
  switch (type) {
    case 'display':
      classes.push('text-display');
      break;
    case 'mono':
      classes.push('text-mono');
      break;
    default:
      classes.push('text-body');
  }

  // Letter spacing
  switch (theme.letterSpacing) {
    case 'tighter':
      classes.push('tracking-tighter');
      break;
    case 'tight':
      classes.push('tracking-tight');
      break;
    case 'wide':
      classes.push('tracking-wide');
      break;
    case 'wider':
      classes.push('tracking-wider');
      break;
    case 'widest':
      classes.push('tracking-widest');
      break;
  }

  return classes.join(' ');
}

/**
 * Get shadow classes based on OrgTheme shadow intensity
 */
export function getShadowClasses(theme: OrgTheme): string {
  switch (theme.shadowIntensity) {
    case 'subtle':
      return 'shadow-themed-sm';
    case 'medium':
      return 'shadow-themed-md';
    case 'strong':
      return 'shadow-themed-lg';
    case 'dramatic':
      return 'shadow-themed-xl shadow-primary';
    default:
      return 'shadow-themed-md';
  }
}

// ============================================================================
// INLINE STYLE MAPPING FUNCTIONS
// ============================================================================

/**
 * Get inline styles for card components based on OrgTheme
 */
export function getCardStyles(theme: OrgTheme): CSSProperties {
  const styles: CSSProperties = {
    background: theme.cardStyle === 'glass'
      ? `rgba(255, 255, 255, ${theme.glassOpacity})`
      : theme.bgCard,
    borderColor: theme.borderColor,
    borderStyle: theme.borderStyle,
    borderRadius: getBorderRadiusValue(theme.borderRadius),
    boxShadow: getBoxShadowValue(theme),
    transition: `all ${TRANSITION_DURATIONS[theme.transitionDuration]}ms ease`,
  };

  if (theme.cardStyle === 'glass' && theme.glassEnabled) {
    styles.backdropFilter = getBlurValue(theme.glassBlur);
    styles.WebkitBackdropFilter = getBlurValue(theme.glassBlur);
  }

  return styles;
}

/**
 * Get inline styles for glass/blur effects based on OrgTheme
 */
export function getGlassStyles(theme: OrgTheme): CSSProperties {
  if (!theme.glassEnabled) {
    return {};
  }

  return {
    background: `rgba(255, 255, 255, ${theme.glassOpacity})`,
    backdropFilter: getBlurValue(theme.glassBlur),
    WebkitBackdropFilter: getBlurValue(theme.glassBlur),
    border: `1px solid rgba(255, 255, 255, 0.2)`,
    borderRadius: getBorderRadiusValue(theme.borderRadius),
  };
}

/**
 * Get inline styles for gradient backgrounds based on OrgTheme
 */
export function getGradientStyles(theme: OrgTheme, type: 'btn' | 'card' | 'hero' | 'default' = 'default'): CSSProperties {
  let gradient: string;

  switch (type) {
    case 'btn':
      gradient = theme.gradientBtn;
      break;
    case 'card':
      gradient = theme.gradientCard;
      break;
    case 'hero':
      gradient = theme.gradientHero;
      break;
    default:
      gradient = theme.gradient;
  }

  return {
    background: gradient,
  };
}

/**
 * Get inline styles for buttons based on OrgTheme
 */
export function getButtonStyles(theme: OrgTheme): CSSProperties {
  return {
    background: theme.gradientBtn,
    color: theme.textInverse,
    fontFamily: theme.fontBody,
    borderRadius: getButtonRadiusValue(theme.buttonStyle),
    boxShadow: theme.buttonShadow ? getBoxShadowValue(theme) : 'none',
    transition: `all ${TRANSITION_DURATIONS[theme.transitionDuration]}ms ease`,
  };
}

/**
 * Get inline styles for inputs based on OrgTheme
 */
export function getInputStyles(theme: OrgTheme): CSSProperties {
  return {
    borderColor: theme.borderColor,
    borderStyle: theme.borderStyle,
    borderRadius: getBorderRadiusValue(theme.borderRadius),
    fontFamily: theme.fontBody,
    transition: `all ${TRANSITION_DURATIONS[theme.transitionDuration]}ms ease`,
  };
}

/**
 * Get typography styles based on OrgTheme
 */
export function getTypographyStyles(theme: OrgTheme, type: 'display' | 'body' | 'mono' = 'body'): CSSProperties {
  const fontFamily = type === 'display'
    ? theme.fontDisplay
    : type === 'mono'
      ? theme.fontMono
      : theme.fontBody;

  const fontWeight = type === 'display'
    ? theme.fontWeightHeading
    : theme.fontWeightBody;

  const letterSpacing = getLetterSpacingValue(theme.letterSpacing);

  return {
    fontFamily,
    fontWeight,
    letterSpacing,
  };
}

// ============================================================================
// FRAMER MOTION VARIANT FACTORIES
// ============================================================================

/**
 * Get Framer Motion variants based on animation style
 */
export function getMotionVariants(animationStyle: OrgTheme['animationStyle']): MotionVariants {
  const timing = ANIMATION_TIMINGS[animationStyle];

  const baseTransition = timing.springConfig
    ? { type: 'spring', ...timing.springConfig }
    : { duration: timing.duration, ease: timing.easing };

  return {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: baseTransition,
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: timing.duration * 0.5, ease: timing.easing },
    },
    hover: getHoverVariant(animationStyle),
    tap: { scale: 0.98 },
  };
}

/**
 * Get hover variant based on animation style
 */
function getHoverVariant(animationStyle: OrgTheme['animationStyle']): Record<string, unknown> {
  switch (animationStyle) {
    case 'elegant':
      return {
        y: -4,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      };
    case 'energetic':
      return {
        scale: 1.02,
        y: -2,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      };
    case 'dramatic':
      return {
        scale: 1.01,
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
        transition: { duration: 0.3 },
      };
    case 'subtle':
      return {
        y: -2,
        transition: { duration: 0.3 },
      };
    default:
      return {
        y: -3,
        transition: { duration: 0.25 },
      };
  }
}

/**
 * Get stagger configuration based on animation style
 */
export function getStaggerConfig(animationStyle: OrgTheme['animationStyle']): StaggerConfig {
  const timing = ANIMATION_TIMINGS[animationStyle];

  return {
    staggerChildren: timing.stagger,
    delayChildren: timing.stagger * 0.5,
  };
}

/**
 * Get letter-by-letter animation variants for text reveals
 */
export function getLetterVariants(animationStyle: OrgTheme['animationStyle']): {
  container: MotionVariants;
  letter: MotionVariants;
} {
  const timing = ANIMATION_TIMINGS[animationStyle];

  const baseTransition = timing.springConfig
    ? { type: 'spring', ...timing.springConfig }
    : { duration: timing.duration * 0.3, ease: timing.easing };

  return {
    container: {
      initial: {},
      animate: {
        transition: {
          staggerChildren: timing.stagger * 0.3,
          delayChildren: 0.1,
        },
      },
    },
    letter: {
      initial: {
        opacity: 0,
        y: animationStyle === 'energetic' ? 30 : 20,
        scale: animationStyle === 'dramatic' ? 0.8 : 1,
      },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: baseTransition,
      },
    },
  };
}

/**
 * Get card entrance animation variants
 */
export function getCardEntranceVariants(animationStyle: OrgTheme['animationStyle']): MotionVariants {
  const timing = ANIMATION_TIMINGS[animationStyle];

  switch (animationStyle) {
    case 'elegant':
      return {
        initial: { opacity: 0, y: 40, scale: 0.98 },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: timing.duration, ease: timing.easing },
        },
      };
    case 'energetic':
      return {
        initial: { opacity: 0, scale: 0.9, y: 20 },
        animate: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { type: 'spring', ...timing.springConfig },
        },
      };
    case 'dramatic':
      return {
        initial: { opacity: 0, y: 60, rotateX: -10 },
        animate: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          transition: { duration: timing.duration, ease: timing.easing },
        },
      };
    case 'subtle':
      return {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { duration: timing.duration },
        },
      };
    default:
      return {
        initial: { opacity: 0, y: 20 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: timing.duration, ease: timing.easing },
        },
      };
  }
}

/**
 * Get input focus animation variants
 */
export function getInputFocusVariants(theme: OrgTheme): MotionVariants {
  const timing = ANIMATION_TIMINGS[theme.animationStyle];

  return {
    initial: {
      boxShadow: `0 0 0 0 rgba(${theme.primaryRgb}, 0)`,
      borderColor: theme.borderColor,
    },
    animate: {
      boxShadow: `0 0 0 0 rgba(${theme.primaryRgb}, 0)`,
      borderColor: theme.borderColor,
      transition: { duration: timing.duration * 0.5 },
    },
    hover: {
      borderColor: theme.borderFocus,
      transition: { duration: timing.duration * 0.3 },
    },
  };
}

/**
 * Get page transition variants
 */
export function getPageTransitionVariants(animationStyle: OrgTheme['animationStyle']): MotionVariants {
  const timing = ANIMATION_TIMINGS[animationStyle];

  return {
    initial: { opacity: 0, x: animationStyle === 'dramatic' ? 100 : 0, y: animationStyle === 'dramatic' ? 0 : 20 },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: timing.duration, ease: timing.easing },
    },
    exit: {
      opacity: 0,
      x: animationStyle === 'dramatic' ? -100 : 0,
      y: animationStyle === 'dramatic' ? 0 : -20,
      transition: { duration: timing.duration * 0.5 },
    },
  };
}

// ============================================================================
// CSS VARIABLE INJECTION
// ============================================================================

/**
 * Generate CSS custom properties from OrgTheme for runtime injection
 */
export function generateCSSVariables(theme: OrgTheme): Record<string, string> {
  return {
    '--theme-primary': theme.primary,
    '--theme-primary-light': theme.primaryLight,
    '--theme-primary-pale': theme.primaryPale,
    '--theme-primary-dark': theme.primaryDark,
    '--theme-primary-rgb': theme.primaryRgb,
    '--theme-secondary': theme.secondary,
    '--theme-secondary-light': theme.secondaryLight,
    '--theme-secondary-dark': theme.secondaryDark,
    '--theme-secondary-rgb': theme.secondaryRgb,
    '--theme-accent': theme.accent,
    '--theme-accent-light': theme.accentLight,
    '--theme-accent-dark': theme.accentDark,
    '--theme-accent-rgb': theme.accentRgb,
    '--theme-bg-primary': theme.bgPrimary,
    '--theme-bg-secondary': theme.bgSecondary,
    '--theme-bg-tertiary': theme.bgTertiary,
    '--theme-bg-card': theme.bgCard,
    '--theme-bg-surface': theme.bgSurface,
    '--theme-bg-overlay': theme.bgOverlay,
    '--theme-bg-muted': theme.bgMuted,
    '--theme-text-primary': theme.textPrimary,
    '--theme-text-secondary': theme.textSecondary,
    '--theme-text-muted': theme.textMuted,
    '--theme-text-inverse': theme.textInverse,
    '--theme-text-accent': theme.textAccent,
    '--theme-border': theme.borderColor,
    '--theme-border-light': theme.borderLight,
    '--theme-border-focus': theme.borderFocus,
    '--theme-border-style': theme.borderStyle,
    '--theme-shadow-color': theme.shadowColor,
    '--theme-shadow-rgb': theme.shadowColorRgb,
    '--theme-gradient': theme.gradient,
    '--theme-gradient-btn': theme.gradientBtn,
    '--theme-gradient-card': theme.gradientCard,
    '--theme-gradient-hero': theme.gradientHero,
    '--theme-font-display': theme.fontDisplay,
    '--theme-font-body': theme.fontBody,
    '--theme-font-mono': theme.fontMono,
    '--theme-font-weight-heading': theme.fontWeightHeading,
    '--theme-font-weight-body': theme.fontWeightBody,
    '--theme-letter-spacing': getLetterSpacingValue(theme.letterSpacing),
    '--theme-radius': getBorderRadiusValue(theme.borderRadius),
    '--theme-button-radius': getButtonRadiusValue(theme.buttonStyle),
    '--theme-transition-duration': `${TRANSITION_DURATIONS[theme.transitionDuration]}ms`,
    '--theme-glass-opacity': String(theme.glassOpacity),
    '--theme-glass-blur': getBlurValue(theme.glassBlur),
    '--theme-shadow-sm': getBoxShadowValue(theme, 'sm'),
    '--theme-shadow-md': getBoxShadowValue(theme, 'md'),
    '--theme-shadow-lg': getBoxShadowValue(theme, 'lg'),
    '--theme-shadow-xl': getBoxShadowValue(theme, 'xl'),
  };
}

/**
 * Apply theme CSS variables to document root
 */
export function applyThemeToDocument(theme: OrgTheme): void {
  const variables = generateCSSVariables(theme);
  const root = document.documentElement;

  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

// ============================================================================
// COMPOSITE THEME HELPERS
// ============================================================================

/**
 * Get all theme-related classes and styles for a card component
 */
export function getCardTheme(theme: OrgTheme): ThemeStyles {
  return {
    classes: getCardClasses(theme),
    styles: getCardStyles(theme),
  };
}

/**
 * Get all theme-related classes and styles for a button component
 */
export function getButtonTheme(theme: OrgTheme): ThemeStyles {
  return {
    classes: getButtonClasses(theme),
    styles: getButtonStyles(theme),
  };
}

/**
 * Get all theme-related classes and styles for an input component
 */
export function getInputTheme(theme: OrgTheme): ThemeStyles {
  return {
    classes: getInputClasses(theme),
    styles: getInputStyles(theme),
  };
}

/**
 * Get colors object from organization for easy access
 */
export function getOrgColors(org: Organization): {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryRgb: string;
  secondary: string;
  accent: string;
  bgPrimary: string;
  bgCard: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
} {
  const theme = org.theme;
  return {
    primary: theme.primary,
    primaryLight: theme.primaryLight,
    primaryDark: theme.primaryDark,
    primaryRgb: theme.primaryRgb,
    secondary: theme.secondary,
    accent: theme.accent,
    bgPrimary: theme.bgPrimary,
    bgCard: theme.bgCard,
    textPrimary: theme.textPrimary,
    textSecondary: theme.textSecondary,
    textMuted: theme.textMuted,
    border: theme.borderColor,
  };
}

/**
 * Get fonts object from organization for easy access
 */
export function getOrgFonts(org: Organization): {
  display: string;
  body: string;
  mono: string;
  weightHeading: string;
  weightBody: string;
} {
  const theme = org.theme;
  return {
    display: theme.fontDisplay,
    body: theme.fontBody,
    mono: theme.fontMono,
    weightHeading: theme.fontWeightHeading,
    weightBody: theme.fontWeightBody,
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getBorderRadiusValue(radius: OrgTheme['borderRadius']): string {
  const radiusMap: Record<OrgTheme['borderRadius'], string> = {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  };
  return radiusMap[radius];
}

function getButtonRadiusValue(buttonStyle: OrgTheme['buttonStyle']): string {
  const radiusMap: Record<OrgTheme['buttonStyle'], string> = {
    rounded: '0.375rem',
    pill: '9999px',
    sharp: '0',
    soft: '0.5rem',
  };
  return radiusMap[buttonStyle];
}

function getBlurValue(blur: OrgTheme['glassBlur']): string {
  const blurMap: Record<OrgTheme['glassBlur'], string> = {
    sm: 'blur(4px)',
    md: 'blur(8px)',
    lg: 'blur(12px)',
    xl: 'blur(16px)',
    '2xl': 'blur(24px)',
    '3xl': 'blur(40px)',
  };
  return blurMap[blur];
}

function getLetterSpacingValue(spacing: OrgTheme['letterSpacing']): string {
  const spacingMap: Record<OrgTheme['letterSpacing'], string> = {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  };
  return spacingMap[spacing];
}

function getBoxShadowValue(
  theme: OrgTheme,
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md'
): string {
  const intensity = theme.shadowIntensity;
  const rgb = theme.shadowColorRgb;

  const intensityMultiplier: Record<OrgTheme['shadowIntensity'], number> = {
    subtle: 0.5,
    medium: 1,
    strong: 1.5,
    dramatic: 2,
  };

  const multiplier = intensityMultiplier[intensity];

  const shadows: Record<typeof size, string> = {
    sm: `0 1px 2px rgba(${rgb}, ${0.05 * multiplier})`,
    md: `0 4px 6px -1px rgba(${rgb}, ${0.1 * multiplier})`,
    lg: `0 10px 15px -3px rgba(${rgb}, ${0.1 * multiplier})`,
    xl: `0 20px 25px -5px rgba(${rgb}, ${0.1 * multiplier}), 0 0 40px rgba(${rgb}, ${0.05 * multiplier})`,
  };

  return shadows[size];
}

// ============================================================================
// PATTERN MAPPINGS (for Phase 2 extension)
// ============================================================================

export type BackgroundPattern = 'geometric' | 'waves' | 'leaves' | 'hexagons' | 'artDeco' | 'minimal' | 'particles';
export type LogoShape = 'circle' | 'diamond' | 'hexagon' | 'crown' | 'wave' | 'leaf' | 'octagon';

/**
 * Get recommended background pattern based on aesthetic
 */
export function getPatternForAesthetic(aesthetic: Organization['aesthetic']): BackgroundPattern {
  const patterns: Record<Organization['aesthetic'], BackgroundPattern> = {
    luxurious: 'artDeco',
    classic: 'geometric',
    nature: 'leaves',
    minimalist: 'minimal',
    playful: 'particles',
    corporate: 'geometric',
    artistic: 'waves',
    modern: 'hexagons',
  };
  return patterns[aesthetic];
}

/**
 * Get recommended logo shape based on aesthetic
 */
export function getLogoShapeForAesthetic(aesthetic: Organization['aesthetic']): LogoShape {
  const shapes: Record<Organization['aesthetic'], LogoShape> = {
    luxurious: 'diamond',
    classic: 'hexagon',
    nature: 'leaf',
    minimalist: 'circle',
    playful: 'circle',
    corporate: 'hexagon',
    artistic: 'octagon',
    modern: 'hexagon',
  };
  return shapes[aesthetic];
}

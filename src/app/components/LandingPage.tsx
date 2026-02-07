import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useMemo } from 'react';
import type { Organization } from '../data/themes';
import { ORGANIZATIONS } from '../data/themes';
import {
  getLetterVariants,
  getMotionVariants,
  getOrgColors,
  getOrgFonts,
  applyThemeToDocument,
  getButtonClasses,
  getAnimationClasses,
} from '../utils/themeMapper';

interface LandingPageProps {
  onLoginClick: () => void;
  organization?: Organization;
}

// Default to Luxe Haven if no organization provided
const DEFAULT_ORG = ORGANIZATIONS['luxe-haven'];

export function LandingPage({ onLoginClick, organization = DEFAULT_ORG }: LandingPageProps) {
  // Get theme-aware values
  const colors = useMemo(() => getOrgColors(organization), [organization]);
  const fonts = useMemo(() => getOrgFonts(organization), [organization]);
  const theme = organization.theme;

  // Get animation variants based on theme style
  const motionVariants = useMemo(() => getMotionVariants(theme.animationStyle), [theme.animationStyle]);
  const letterVariants = useMemo(() => getLetterVariants(theme.animationStyle), [theme.animationStyle]);

  // Get CSS utility classes from theme
  const buttonClasses = useMemo(() => getButtonClasses(theme), [theme]);
  const animationClasses = useMemo(() => getAnimationClasses(theme), [theme]);

  // Apply CSS variables when organization changes
  useMemo(() => {
    if (typeof document !== 'undefined') {
      applyThemeToDocument(theme);
    }
  }, [theme]);

  // Animation timing based on theme
  const animationDurations = useMemo(() => {
    switch (theme.animationStyle) {
      case 'elegant':
        return { base: 1.2, letter: 0.08, delay: 0.5 };
      case 'smooth':
        return { base: 0.9, letter: 0.06, delay: 0.4 };
      case 'energetic':
        return { base: 0.5, letter: 0.03, delay: 0.2 };
      case 'dramatic':
        return { base: 1.0, letter: 0.07, delay: 0.4 };
      case 'subtle':
        return { base: 0.7, letter: 0.05, delay: 0.3 };
      default:
        return { base: 0.9, letter: 0.06, delay: 0.4 };
    }
  }, [theme.animationStyle]);

  // Easing based on animation style
  const easing = useMemo(() => {
    switch (theme.animationStyle) {
      case 'elegant':
        return [0.22, 1, 0.36, 1];
      case 'smooth':
        return [0.4, 0, 0.2, 1];
      case 'energetic':
        return [0.34, 1.56, 0.64, 1];
      case 'dramatic':
        return [0.6, 0.01, 0, 0.9];
      case 'subtle':
        return [0.4, 0, 1, 1];
      default:
        return [0.4, 0, 0.2, 1];
    }
  }, [theme.animationStyle]);

  return (
    <motion.div
      className="fixed inset-0 z-10 flex flex-col items-center justify-center px-4"
      style={{ background: colors.bgPrimary }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: animationDurations.base * 1.5, ease: easing }}
    >
      {/* Art Deco Corner Ornaments - Theme-aware */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.08]">
        {/* Top Left */}
        <svg className="absolute top-8 left-8 w-24 h-24" viewBox="0 0 100 100" style={{ color: colors.primaryDark }}>
          <path d="M0,0 L40,0 L40,2 L2,2 L2,40 L0,40 Z" fill="currentColor" />
          <path d="M10,10 L30,10 L30,11 L11,11 L11,30 L10,30 Z" fill="currentColor" />
          <path d="M15,15 L20,15 L20,16 L16,16 L16,20 L15,20 Z" fill="currentColor" />
        </svg>

        {/* Top Right */}
        <svg className="absolute top-8 right-8 w-24 h-24" viewBox="0 0 100 100" style={{ color: colors.primaryDark }}>
          <path d="M100,0 L60,0 L60,2 L98,2 L98,40 L100,40 Z" fill="currentColor" />
          <path d="M90,10 L70,10 L70,11 L89,11 L89,30 L90,30 Z" fill="currentColor" />
          <path d="M85,15 L80,15 L80,16 L84,16 L84,20 L85,20 Z" fill="currentColor" />
        </svg>

        {/* Bottom Left */}
        <svg className="absolute bottom-8 left-8 w-24 h-24" viewBox="0 0 100 100" style={{ color: colors.primaryDark }}>
          <path d="M0,100 L40,100 L40,98 L2,98 L2,60 L0,60 Z" fill="currentColor" />
          <path d="M10,90 L30,90 L30,89 L11,89 L11,70 L10,70 Z" fill="currentColor" />
          <path d="M15,85 L20,85 L20,84 L16,84 L16,80 L15,80 Z" fill="currentColor" />
        </svg>

        {/* Bottom Right */}
        <svg className="absolute bottom-8 right-8 w-24 h-24" viewBox="0 0 100 100" style={{ color: colors.primaryDark }}>
          <path d="M100,100 L60,100 L60,98 L98,98 L98,60 L100,60 Z" fill="currentColor" />
          <path d="M90,90 L70,90 L70,89 L89,89 L89,70 L90,70 Z" fill="currentColor" />
          <path d="M85,85 L80,85 L80,84 L84,84 L84,80 L85,80 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Geometric Lines - Theme-aware */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Vertical center lines */}
        <motion.div
          className="absolute left-1/2 top-0 w-[1px] h-full -translate-x-1/2"
          style={{ background: `linear-gradient(to bottom, transparent, rgba(${colors.primaryRgb},0.06) 20%, rgba(${colors.primaryRgb},0.06) 80%, transparent)` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: animationDurations.base * 1.2, delay: animationDurations.delay }}
        />

        {/* Horizontal subtle lines */}
        <motion.div
          className="absolute left-0 top-1/2 w-full h-[1px] -translate-y-1/2"
          style={{ background: `linear-gradient(to right, transparent, rgba(${colors.primaryRgb},0.04) 30%, rgba(${colors.primaryRgb},0.04) 70%, transparent)` }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: animationDurations.base * 1.2, delay: animationDurations.delay + 0.2 }}
        />
      </div>

      {/* Brand Name - Spaced Letters with theme-aware animation */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: animationDurations.base, delay: animationDurations.delay * 0.6 }}
      >
        <h1
          className={`flex ${animationClasses}`}
          style={{
            fontFamily: fonts.display,
            fontSize: '48px',
            fontWeight: fonts.weightHeading,
            color: colors.textPrimary,
            letterSpacing: '0.45em',
          }}
        >
          {'THE LOBBI'.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={letterVariants.letter.initial}
              animate={letterVariants.letter.animate}
              transition={{
                duration: animationDurations.base * 0.7,
                delay: animationDurations.delay + (i * animationDurations.letter),
                ease: easing,
              }}
            >
              {char === ' ' ? '\u00A0\u00A0' : char}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      {/* Triple Line Divider - Theme-aware */}
      <motion.div
        className="mb-6 space-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: animationDurations.base * 0.7, delay: animationDurations.delay + 0.8 }}
      >
        <motion.div
          className="h-[1px]"
          style={{ background: colors.primary }}
          initial={{ width: 0 }}
          animate={{ width: '120px' }}
          transition={{ duration: animationDurations.base * 0.7, delay: animationDurations.delay + 0.8 }}
        />
        <motion.div
          className="h-[1px] mx-auto"
          style={{ background: `rgba(${colors.primaryRgb},0.4)` }}
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ duration: animationDurations.base * 0.7, delay: animationDurations.delay + 0.9 }}
        />
        <motion.div
          className="h-[1px] mx-auto"
          style={{ background: `rgba(${colors.primaryRgb},0.2)` }}
          initial={{ width: 0 }}
          animate={{ width: '40px' }}
          transition={{ duration: animationDurations.base * 0.7, delay: animationDurations.delay + 1.0 }}
        />
      </motion.div>

      {/* Tagline - Theme-aware */}
      <motion.p
        className="text-[12px] uppercase mb-16"
        style={{
          color: colors.primaryDark,
          letterSpacing: '0.35em',
          fontFamily: fonts.body,
          fontWeight: 600,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: animationDurations.base, delay: animationDurations.delay + 1.1 }}
      >
        Technology as Devoted as You Are
      </motion.p>

      {/* Refined Description - Theme-aware */}
      <motion.p
        className="text-[15px] text-center max-w-[520px] mb-14 leading-[1.8]"
        style={{
          color: colors.textSecondary,
          fontFamily: fonts.body,
          fontWeight: parseInt(fonts.weightBody),
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: animationDurations.base, delay: animationDurations.delay + 1.2 }}
      >
        Refined member management for associations and nonprofits who understand
        that excellence lies in the details.
      </motion.p>

      {/* Minimal Elegant Button - Theme-aware with animation style */}
      <motion.button
        onClick={onLoginClick}
        className={`relative px-12 py-4 group ${buttonClasses}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: animationDurations.base, delay: animationDurations.delay + 1.4, ease: easing }}
        whileHover={motionVariants.hover}
        whileTap={motionVariants.tap}
      >
        {/* Border frame */}
        <div
          className="absolute inset-0 border transition-colors"
          style={{
            borderColor: `rgba(${colors.primaryRgb},0.6)`,
            borderRadius: theme.buttonStyle === 'pill' ? '9999px' : theme.buttonStyle === 'sharp' ? '0' : '4px',
          }}
        />

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px]"
          style={{ background: colors.primary }}
          initial={{ width: '0%' }}
          whileHover={{ width: '100%' }}
          transition={{ duration: animationDurations.base * 0.4 }}
        />

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px]"
          style={{ background: colors.primary }}
          initial={{ width: '0%' }}
          whileHover={{ width: '100%' }}
          transition={{ duration: animationDurations.base * 0.4 }}
        />

        {/* Text */}
        <span
          className="relative z-10 flex items-center gap-3 text-[12px] uppercase transition-colors"
          style={{
            color: colors.primary,
            letterSpacing: '0.3em',
            fontFamily: fonts.body,
            fontWeight: 600,
          }}
        >
          Enter Your Lobbi
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
        </span>
      </motion.button>

      {/* Subtle Footer - Theme-aware */}
      <motion.div
        className="absolute bottom-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: animationDurations.base, delay: animationDurations.delay + 1.6 }}
      >
        {/* Decorative dots */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-1 h-1 opacity-30" style={{ background: colors.primary }} />
          <div className="w-1 h-1 opacity-50" style={{ background: colors.primary }} />
          <div className="w-1 h-1 opacity-30" style={{ background: colors.primary }} />
        </div>

        <p
          className="text-[10px] uppercase"
          style={{
            color: colors.textMuted,
            letterSpacing: '0.2em',
            fontFamily: fonts.body,
            fontWeight: 500,
          }}
        >
          Trusted by Discerning Organizations
        </p>
      </motion.div>
    </motion.div>
  );
}

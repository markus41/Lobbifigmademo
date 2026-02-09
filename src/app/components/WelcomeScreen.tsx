import { motion } from 'motion/react';
import { useEffect, useMemo, useRef } from 'react';
import { gsap, SplitText } from '../../lib/gsap-config';
import { GeometricOctagon } from './GeometricOctagon';
import type { Account, Organization } from '../data/themes';
import {
  getOrgColors,
  getOrgFonts,
  getMotionVariants,
  getPageTransitionVariants,
  getCardClasses,
  getAnimationClasses,
} from '../utils/themeMapper';

interface WelcomeScreenProps {
  account: Account;
  organization: Organization;
  onComplete: () => void;
}

export function WelcomeScreen({ account, organization, onComplete }: WelcomeScreenProps) {
  // Theme-aware values derived from organization
  const theme = organization.theme;
  const colors = useMemo(() => getOrgColors(organization), [organization]);
  const fonts = useMemo(() => getOrgFonts(organization), [organization]);
  // motionVariants/pageTransition kept for potential gesture use by motion-polisher
  void useMemo(() => getMotionVariants(theme.animationStyle), [theme.animationStyle]);
  void useMemo(() => getPageTransitionVariants(theme.animationStyle), [theme.animationStyle]);

  // Get CSS utility classes from theme
  const cardClasses = useMemo(() => getCardClasses(theme), [theme]);
  const animationClasses = useMemo(() => getAnimationClasses(theme), [theme]);

  // Animation timing based on theme
  const animationDurations = useMemo(() => {
    switch (theme.animationStyle) {
      case 'elegant':
        return { base: 1.2, delay: 0.3, stagger: 0.2 };
      case 'smooth':
        return { base: 0.9, delay: 0.25, stagger: 0.15 };
      case 'energetic':
        return { base: 0.5, delay: 0.1, stagger: 0.08 };
      case 'dramatic':
        return { base: 1.0, delay: 0.3, stagger: 0.18 };
      case 'subtle':
        return { base: 0.7, delay: 0.2, stagger: 0.12 };
      default:
        return { base: 0.9, delay: 0.25, stagger: 0.15 };
    }
  }, [theme.animationStyle]);

  // Theme-derived easing
  const easing = useMemo((): [number, number, number, number] => {
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

  // Particle behavior based on animation style
  const particleConfig = useMemo(() => {
    switch (theme.animationStyle) {
      case 'elegant':
        return { count: 30, duration: 3.5, distance: 40 };
      case 'smooth':
        return { count: 25, duration: 3, distance: 35 };
      case 'energetic':
        return { count: 40, duration: 2, distance: 60 };
      case 'dramatic':
        return { count: 35, duration: 3.2, distance: 50 };
      case 'subtle':
        return { count: 20, duration: 4, distance: 30 };
      default:
        return { count: 30, duration: 3, distance: 40 };
    }
  }, [theme.animationStyle]);

  // Auto-advance timing based on animation style (faster for energetic, slower for elegant)
  const autoAdvanceTime = useMemo(() => {
    switch (theme.animationStyle) {
      case 'elegant':
        return 5000;
      case 'energetic':
        return 2500;
      case 'dramatic':
        return 4500;
      default:
        return 4000;
    }
  }, [theme.animationStyle]);

  // Auto-advance after calculated time
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, autoAdvanceTime);

    return () => clearTimeout(timer);
  }, [onComplete, autoAdvanceTime]);

  // GSAP: SplitText typewriter effect for "Welcome back," greeting
  const greetingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!greetingRef.current) return;
    const split = new SplitText(greetingRef.current, { type: 'chars' });
    gsap.set(split.chars, { opacity: 0 });
    const tween = gsap.to(split.chars, {
      opacity: 1,
      duration: 0.03,
      stagger: 0.06,
      delay: animationDurations.delay + 0.2,
      ease: 'none',
    });
    return () => {
      tween.kill();
      split.revert();
    };
  }, [animationDurations.delay]);

  // GSAP: SplitText wave effect for user name
  const nameRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!nameRef.current) return;
    const split = new SplitText(nameRef.current, { type: 'chars' });
    const tween = gsap.fromTo(
      split.chars,
      { opacity: 0, y: 30, rotateX: -45 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: { each: 0.04, from: 'start' },
        delay: animationDurations.delay + animationDurations.stagger + 0.3,
        ease: 'back.out(1.7)',
      },
    );
    return () => {
      tween.kill();
      split.revert();
    };
  }, [animationDurations.delay, animationDurations.stagger]);

  // GSAP: Motto word-by-word fade
  const mottoRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!mottoRef.current) return;
    const split = new SplitText(mottoRef.current, { type: 'words' });
    const tween = gsap.fromTo(
      split.words,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        delay: animationDurations.delay + animationDurations.stagger * 4.5,
        ease: 'power2.out',
      },
    );
    return () => {
      tween.kill();
      split.revert();
    };
  }, [animationDurations.delay, animationDurations.stagger]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: colors.bgPrimary }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: animationDurations.base, ease: easing }}
    >
      {/* Animated Octagon Background */}
      <div className="absolute inset-0">
        <GeometricOctagon primaryColor={colors.primary} />
      </div>

      {/* Ambient Glow - with theme-aware glow effect */}
      {theme.hasGlowEffects && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: animationDurations.base * 1.5, ease: easing }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px]"
            style={{
              background: `radial-gradient(circle, rgba(${theme.primaryRgb}, 0.12), transparent 70%)`,
            }}
          />
        </motion.div>
      )}

      {/* Floating Particles - with theme-aware behavior */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: particleConfig.count }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: colors.primary,
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.4, 0.6, 0.4, 0],
              scale: [0, 1, 1.5, 1, 0],
              y: [0, -particleConfig.distance * 0.5 - Math.random() * particleConfig.distance * 0.6, -particleConfig.distance - Math.random() * particleConfig.distance * 0.8],
            }}
            transition={{
              duration: particleConfig.duration + Math.random() * 2,
              delay: animationDurations.delay + Math.random() * 1.5,
              ease: easing,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-2xl">
        {/* Welcome Greeting - GSAP SplitText typewriter */}
        <div>
          <h2
            ref={greetingRef}
            className="text-xl mb-2 font-medium tracking-[0.05em]"
            style={{
              fontFamily: fonts.body,
              color: colors.textSecondary,
            }}
          >
            Welcome back,
          </h2>
        </div>

        {/* Name with Gradient - GSAP SplitText wave */}
        <div>
          <h1
            ref={nameRef}
            className={`text-6xl mb-6 ${animationClasses}`}
            style={{
              fontFamily: fonts.display,
              fontWeight: parseInt(fonts.weightHeading),
              background: theme.hasGradientText
                ? `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`
                : colors.primary,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              perspective: '400px',
            }}
          >
            {account.first} {account.last}
          </h1>
        </div>

        {/* Organization Badge */}
        <motion.div
          className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-4 ${cardClasses}`}
          style={{
            background: `rgba(${theme.primaryRgb}, 0.08)`,
            border: `1px solid rgba(${theme.primaryRgb}, 0.15)`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: animationDurations.base * 0.7, delay: animationDurations.delay + animationDurations.stagger * 2.5, ease: easing }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
            style={{
              background: theme.gradientBtn,
            }}
          >
            <span
              style={{
                fontFamily: fonts.display,
                fontStyle: 'italic',
                fontWeight: 300,
              }}
            >
              {organization.logoLetter}
            </span>
          </div>
          <span
            className="text-lg font-semibold"
            style={{
              fontFamily: fonts.display,
              color: colors.textPrimary,
            }}
          >
            {organization.name}
          </span>
        </motion.div>

        {/* Role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: animationDurations.base * 0.7, delay: animationDurations.delay + animationDurations.stagger * 3.5, ease: easing }}
        >
          <p
            className="text-sm mb-3 font-medium"
            style={{
              color: colors.textSecondary,
              fontFamily: fonts.body,
            }}
          >
            {account.role}
          </p>
        </motion.div>

        {/* Motto - GSAP SplitText word-by-word */}
        <div>
          <p
            ref={mottoRef}
            className="text-base italic mb-6 opacity-95 font-medium"
            style={{
              fontFamily: fonts.display,
              color: colors.primary,
            }}
          >
            &ldquo;{organization.motto}&rdquo;
          </p>
        </div>

        {/* Timestamp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: animationDurations.base * 0.7, delay: animationDurations.delay + animationDurations.stagger * 5.5, ease: easing }}
        >
          <p
            className="text-xs font-medium tracking-[0.05em]"
            style={{
              color: colors.textMuted,
              fontFamily: fonts.body,
            }}
          >
            {new Date().toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </motion.div>

        {/* Loading Indicator - with theme-aware animation speed */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: animationDurations.base * 0.5, delay: animationDurations.delay + animationDurations.stagger * 6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: colors.primary }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: theme.animationStyle === 'energetic' ? 1 : 1.5,
                repeat: Infinity,
                delay: i * (theme.animationStyle === 'energetic' ? 0.1 : 0.2),
                ease: easing,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
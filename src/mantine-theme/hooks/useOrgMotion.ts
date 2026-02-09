/**
 * Hook to access the current org's motion/animation preferences.
 * Returns durations, easings, and whether to reduce motion.
 */
import { useMemo, useEffect, useState } from 'react';
import { useMantineTheme } from '@mantine/core';
import { useCurrentOrg } from '../MantineThemeProvider';

export interface OrgMotionConfig {
  /** Animation style personality (subtle, smooth, energetic, dramatic, elegant) */
  animationStyle: string;
  /** Base transition duration in ms */
  transitionDurationMs: number;
  /** CSS transition duration string */
  transitionDuration: string;
  /** CSS easing functions */
  easing: {
    luxInOut: string;
    luxOut: string;
    bounce: string;
    linear: string;
  };
  /** Duration presets in ms */
  durations: {
    instant: number;
    fast: number;
    normal: number;
    slow: number;
    heroIntro: number;
    pageTransition: number;
    hover: number;
    focus: number;
  };
  /** Whether the user prefers reduced motion */
  prefersReducedMotion: boolean;
  /** Get duration adjusted for reduced motion */
  getDuration: (baseMs: number) => number;
  /** Get CSS transition shorthand */
  getTransition: (property: string, durationMs?: number) => string;
}

export function useOrgMotion(): OrgMotionConfig {
  const theme = useMantineTheme();
  const currentOrg = useCurrentOrg();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return useMemo(() => {
    const other = theme.other || {};
    const durationStr = other.transitionDuration || '250ms';
    const baseDuration = parseInt(durationStr, 10) || 250;
    const animationStyle = other.animationStyle || 'smooth';

    // Speed multiplier based on animation style
    const speedMul = animationStyle === 'energetic' ? 0.8
      : animationStyle === 'subtle' ? 1.2
      : animationStyle === 'dramatic' ? 1.0
      : animationStyle === 'elegant' ? 1.1
      : 1.0;

    const easing = {
      luxInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      luxOut: 'cubic-bezier(0, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      linear: 'linear',
    };

    const getDuration = (baseMs: number): number => {
      if (prefersReducedMotion) return 0;
      return Math.round(baseMs * speedMul);
    };

    const getTransition = (property: string, durationMs?: number): string => {
      const dur = getDuration(durationMs ?? baseDuration);
      return `${property} ${dur}ms ${easing.luxInOut}`;
    };

    return {
      animationStyle,
      transitionDurationMs: baseDuration,
      transitionDuration: durationStr,
      easing,
      durations: {
        instant: getDuration(100),
        fast: getDuration(150),
        normal: getDuration(250),
        slow: getDuration(400),
        heroIntro: getDuration(1200),
        pageTransition: getDuration(400),
        hover: getDuration(200),
        focus: getDuration(150),
      },
      prefersReducedMotion,
      getDuration,
      getTransition,
    };
  }, [theme, currentOrg, prefersReducedMotion]);
}

export default useOrgMotion;

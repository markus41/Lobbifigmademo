/**
 * Hook to access org-specific motion configuration.
 * Returns motion durations, easings, and personality multipliers.
 */
import { useMemo } from 'react'
import { useCurrentOrg } from '../mantine-theme/MantineThemeProvider'
import type { Motion, OrgMotionPersonality } from '../theme/types/theme.types'
import { getOrgTheme } from '../theme/orgThemeRegistry'

interface OrgMotionConfig {
  /** Base motion values from the design system */
  motion: Motion
  /** Org-specific multipliers for cadence, amplitude, rotation */
  personality: OrgMotionPersonality
  /** Whether reduced motion is preferred */
  prefersReducedMotion: boolean
  /** Get duration adjusted by org personality */
  getDuration: (base: number) => number
  /** Get easing as CSS string */
  getEasing: (name: keyof Motion['easingCSS']) => string
}

const defaultMotion: Motion = {
  easing: {
    luxInOut: [0.4, 0, 0.2, 1],
    luxOut: [0, 0, 0.2, 1],
    fade: [0.4, 0, 0.6, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    linear: [0, 0, 1, 1],
  },
  easingCSS: {
    luxInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    luxOut: 'cubic-bezier(0, 0, 0.2, 1)',
    fade: 'cubic-bezier(0.4, 0, 0.6, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  durationMs: {
    instant: 100,
    fast: 200,
    normal: 350,
    slow: 600,
    heroIntro: 1200,
    gateToAuth: 800,
    focus: 150,
    hover: 200,
    pageTransition: 400,
    ambientCycle: 8000,
  },
  blurPx: { enter: 8, exit: 4, overlay: 12 },
  parallax: { bg: 0.3, frame: 0.5, particles: 0.7 },
}

const defaultPersonality: OrgMotionPersonality = {
  cadenceMul: 1,
  amplitudeMul: 1,
  rotationMul: 1,
}

export function useOrgMotion(): OrgMotionConfig {
  const currentOrg = useCurrentOrg()

  return useMemo(() => {
    const orgTheme = getOrgTheme(currentOrg)
    const personality = orgTheme?.org?.motionPersonality ?? defaultPersonality

    const prefersReducedMotion =
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false

    return {
      motion: defaultMotion,
      personality,
      prefersReducedMotion,
      getDuration: (base: number) => {
        if (prefersReducedMotion) return 0
        return base * personality.cadenceMul
      },
      getEasing: (name: keyof Motion['easingCSS']) => {
        return defaultMotion.easingCSS[name] ?? defaultMotion.easingCSS.luxInOut
      },
    }
  }, [currentOrg])
}

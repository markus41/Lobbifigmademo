/**
 * useOrgMotion - Hook providing org-aware motion configuration.
 * Returns motion parameters, personality traits, and reduced-motion preference
 * for use by all motion sub-hooks.
 */
import { useMemo } from 'react'

type CubicBezier = [number, number, number, number]

// Motion easing curves
const easings = {
  luxOut: [0.22, 1, 0.36, 1] as CubicBezier,
  fade: [0.4, 0, 0.6, 1] as CubicBezier,
  snap: [0.68, -0.55, 0.27, 1.55] as CubicBezier,
  smooth: [0.25, 0.46, 0.45, 0.94] as CubicBezier,
}

// Duration presets (ms)
const durations = {
  fast: 150,
  normal: 250,
  slow: 450,
  pageTransition: 500,
}

// Blur presets (px)
const blurPresets = {
  enter: 8,
  exit: 4,
}

interface MotionConfig {
  easing: {
    luxOut: [number, number, number, number]
    fade: [number, number, number, number]
    snap: [number, number, number, number]
    smooth: [number, number, number, number]
  }
  durationMs: {
    fast: number
    normal: number
    slow: number
    pageTransition: number
  }
  blurPx: {
    enter: number
    exit: number
  }
}

interface Personality {
  amplitudeMul: number
  cadenceMul: number
}

interface OrgMotionResult {
  motion: MotionConfig
  personality: Personality
  prefersReducedMotion: boolean
  getDuration: (ms: number) => number
}

export function useOrgMotion(): OrgMotionResult {
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const motion: MotionConfig = useMemo(
    () => ({
      easing: easings,
      durationMs: durations,
      blurPx: blurPresets,
    }),
    []
  )

  const personality: Personality = useMemo(
    () => ({
      amplitudeMul: 1,
      cadenceMul: 1,
    }),
    []
  )

  const getDuration = useMemo(
    () => (ms: number) => (prefersReducedMotion ? 0 : ms),
    [prefersReducedMotion]
  )

  return { motion, personality, prefersReducedMotion, getDuration }
}

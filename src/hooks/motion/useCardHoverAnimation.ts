/**
 * Hook for card hover animations.
 * Returns rich hover states with elevation, scale, shadow, and subtle gradient shifts.
 *
 * Enhanced with:
 * - Subtle rotation for depth perception
 * - Improved spring physics for snappy feel
 * - Border glow animation support
 * - Focus state for accessibility
 */
import { useMemo } from 'react'
import { useOrgMotion } from '../useOrgMotion'
import type { TargetAndTransition } from 'motion/react'

interface CardHoverAnimation {
  whileHover: TargetAndTransition
  whileTap: TargetAndTransition
  whileFocus: TargetAndTransition
  transition: {
    type: string
    stiffness: number
    damping: number
    mass?: number
  }
}

export function useCardHoverAnimation(intense = false): CardHoverAnimation {
  const { motion, personality, prefersReducedMotion } = useOrgMotion()

  return useMemo(() => {
    if (prefersReducedMotion) {
      return {
        whileHover: {},
        whileTap: {},
        whileFocus: {},
        transition: { type: 'spring', stiffness: 400, damping: 30 },
      }
    }

    const amp = personality.amplitudeMul
    const intensityMul = intense ? 1.4 : 1

    return {
      whileHover: {
        y: -8 * amp * intensityMul,
        scale: 1 + 0.02 * amp * intensityMul,
        rotateX: 1.5 * amp,
        boxShadow: `0 28px 56px rgba(0,0,0,0.14), 0 14px 28px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)`,
        filter: 'brightness(1.03) saturate(1.05)',
      },
      whileTap: {
        y: -3 * amp,
        scale: 1 - 0.015 * amp,
        rotateX: 0.5 * amp,
        boxShadow: '0 10px 20px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08)',
        filter: 'brightness(0.98)',
      },
      whileFocus: {
        boxShadow: `0 24px 48px rgba(0,0,0,0.12), 0 0 0 3px rgba(59, 130, 246, 0.3)`,
      },
      transition: {
        type: 'spring',
        stiffness: 420,
        damping: 26,
        mass: 0.5,
      },
    }
  }, [motion, personality, prefersReducedMotion, intense])
}

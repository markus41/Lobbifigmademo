/**
 * Hook for card hover animations.
 * Returns rich hover states with elevation, scale, shadow, and subtle gradient shifts.
 */
import { useMemo } from 'react'
import { useOrgMotion } from '../useOrgMotion'
import type { TargetAndTransition } from 'motion/react'

interface CardHoverAnimation {
  whileHover: TargetAndTransition
  whileTap: TargetAndTransition
  transition: {
    type: string
    stiffness: number
    damping: number
    mass?: number
  }
}

export function useCardHoverAnimation(): CardHoverAnimation {
  const { motion, personality, prefersReducedMotion } = useOrgMotion()

  return useMemo(() => {
    if (prefersReducedMotion) {
      return {
        whileHover: {},
        whileTap: {},
        transition: { type: 'spring', stiffness: 400, damping: 30 },
      }
    }

    const amp = personality.amplitudeMul

    return {
      whileHover: {
        y: -6 * amp,
        scale: 1 + 0.015 * amp,
        boxShadow: `0 24px 48px rgba(0,0,0,0.12), 0 12px 24px rgba(0,0,0,0.08)`,
        filter: 'brightness(1.02)',
      },
      whileTap: {
        y: -2 * amp,
        scale: 1 - 0.01 * amp,
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
      },
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 28,
        mass: 0.6,
      },
    }
  }, [motion, personality, prefersReducedMotion])
}

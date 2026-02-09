/**
 * Hook for button hover/tap animations using spring physics.
 * Returns whileHover lift + glow, whileTap press-down with spring rebound.
 */
import { useMemo } from 'react'
import { useOrgMotion } from '../useOrgMotion'
import type { TargetAndTransition } from 'motion/react'

interface ButtonHoverAnimation {
  whileHover: TargetAndTransition
  whileTap: TargetAndTransition
  transition: {
    type: string
    stiffness: number
    damping: number
    mass?: number
  }
}

export function useButtonHoverAnimation(): ButtonHoverAnimation {
  const { motion, personality, prefersReducedMotion } = useOrgMotion()

  return useMemo(() => {
    if (prefersReducedMotion) {
      return {
        whileHover: {},
        whileTap: {},
        transition: { type: 'spring', stiffness: 500, damping: 30 },
      }
    }

    const amp = personality.amplitudeMul

    return {
      whileHover: {
        y: -2 * amp,
        scale: 1 + 0.03 * amp,
        boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
      },
      whileTap: {
        y: 1 * amp,
        scale: 1 - 0.04 * amp,
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
      },
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 22,
        mass: 0.5,
      },
    }
  }, [motion, personality, prefersReducedMotion])
}

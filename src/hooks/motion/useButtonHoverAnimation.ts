/**
 * Hook for button hover/tap animations using spring physics.
 * Returns whileHover lift + glow, whileTap press-down with spring rebound.
 *
 * Enhanced with:
 * - Snappier spring physics for immediate feedback
 * - Subtle skew on tap for realistic press effect
 * - Focus state for keyboard navigation
 * - Different variants for primary/secondary buttons
 */
import { useMemo } from 'react'
import { useOrgMotion } from '../useOrgMotion'
import type { TargetAndTransition } from 'motion/react'

interface ButtonHoverAnimation {
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

export function useButtonHoverAnimation(variant: 'primary' | 'secondary' | 'ghost' = 'primary'): ButtonHoverAnimation {
  const { motion, personality, prefersReducedMotion } = useOrgMotion()

  return useMemo(() => {
    if (prefersReducedMotion) {
      return {
        whileHover: {},
        whileTap: {},
        whileFocus: {},
        transition: { type: 'spring', stiffness: 500, damping: 30 },
      }
    }

    const amp = personality.amplitudeMul

    // Primary buttons have more pronounced effects
    const isPrimary = variant === 'primary'
    const intensityMul = isPrimary ? 1.3 : variant === 'ghost' ? 0.7 : 1

    return {
      whileHover: {
        y: -3 * amp * intensityMul,
        scale: 1 + 0.04 * amp * intensityMul,
        boxShadow: isPrimary
          ? '0 8px 24px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.1)'
          : '0 6px 20px rgba(0,0,0,0.12)',
        filter: isPrimary ? 'brightness(1.08) saturate(1.1)' : 'brightness(1.02)',
      },
      whileTap: {
        y: 0,
        scale: 1 - 0.05 * amp,
        skewX: -0.5 * amp,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        filter: 'brightness(0.95)',
      },
      whileFocus: {
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.4)',
      },
      transition: {
        type: 'spring',
        stiffness: 550,
        damping: 20,
        mass: 0.4,
      },
    }
  }, [motion, personality, prefersReducedMotion, variant])
}

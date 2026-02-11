/**
 * Hook for scroll-triggered animations using Framer Motion.
 * Supports multiple reveal directions and configurable thresholds.
 *
 * Enhanced with:
 * - Spring physics option for more natural motion
 * - Scale and rotation for added depth
 * - Parallax-style multi-layered animations
 * - Better viewport margins and amount settings
 */
import { useMemo } from 'react'
import { useOrgMotion } from '../useOrgMotion'
import type { TargetAndTransition } from 'motion/react'

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none'

interface ScrollAnimationConfig {
  initial: TargetAndTransition
  whileInView: TargetAndTransition
  viewport: { once: boolean; amount: number; margin?: string }
  transition: {
    duration?: number
    ease?: number[]
    type?: string
    stiffness?: number
    damping?: number
    mass?: number
  }
}

const directionOffsets: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 48 },
  right: { x: -48 },
  none: {},
}

export function useScrollAnimation(
  amount = 0.3,
  direction: RevealDirection = 'up',
  options?: {
    /** Use spring physics instead of duration-based easing */
    spring?: boolean
    /** Add scale animation */
    scale?: boolean
    /** Add rotation hint for depth */
    rotation?: boolean
    /** Custom viewport margin */
    margin?: string
    /** Repeat animation on scroll */
    once?: boolean
  }
): ScrollAnimationConfig {
  const { getDuration, motion, personality, prefersReducedMotion } = useOrgMotion()

  return useMemo(() => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 1 },
        whileInView: { opacity: 1 },
        viewport: { once: true, amount },
        transition: { duration: 0 },
      }
    }

    const offset = directionOffsets[direction]
    const amp = personality.amplitudeMul
    const useSpring = options?.spring ?? false
    const withScale = options?.scale ?? true
    const withRotation = options?.rotation ?? true
    const once = options?.once ?? true

    const rotationHint = withRotation
      ? direction === 'left'
        ? -2.5 * amp
        : direction === 'right'
        ? 2.5 * amp
        : direction === 'down'
        ? 1.5 * amp
        : -1 * amp
      : 0

    return {
      initial: {
        opacity: 0,
        scale: withScale ? 0.94 : 1,
        rotateY: rotationHint,
        ...(offset.y !== undefined ? { y: offset.y * amp } : {}),
        ...(offset.x !== undefined ? { x: offset.x * amp } : {}),
        filter: `blur(${motion.blurPx.enter * 0.7}px)`,
      },
      whileInView: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateY: 0,
        filter: 'blur(0px)',
      },
      viewport: {
        once,
        amount,
        margin: options?.margin ?? '-60px',
      },
      transition: useSpring
        ? {
            type: 'spring',
            stiffness: 280,
            damping: 28,
            mass: 0.8,
          }
        : {
            duration: getDuration(motion.durationMs.slow) / 1000,
            ease: motion.easing.luxOut,
          },
    }
  }, [getDuration, motion, personality, prefersReducedMotion, amount, direction, options])
}

/**
 * Hook for scroll-triggered animations using Framer Motion.
 * Supports multiple reveal directions and configurable thresholds.
 */
import { useMemo } from 'react'
import { useOrgMotion } from '../useOrgMotion'
import type { TargetAndTransition } from 'motion/react'

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none'

interface ScrollAnimationConfig {
  initial: TargetAndTransition
  whileInView: TargetAndTransition
  viewport: { once: boolean; amount: number; margin?: string }
  transition: { duration: number; ease: number[] }
}

const directionOffsets: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
}

export function useScrollAnimation(
  amount = 0.3,
  direction: RevealDirection = 'up',
): ScrollAnimationConfig {
  const { getDuration, motion, personality, prefersReducedMotion } = useOrgMotion()

  return useMemo(() => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 1 },
        whileInView: { opacity: 1 },
        viewport: { once: true, amount },
        transition: { duration: 0, ease: motion.easing.luxInOut },
      }
    }

    const offset = directionOffsets[direction]
    const amp = personality.amplitudeMul

    return {
      initial: {
        opacity: 0,
        ...(offset.y !== undefined ? { y: offset.y * amp } : {}),
        ...(offset.x !== undefined ? { x: offset.x * amp } : {}),
        filter: `blur(${motion.blurPx.enter * 0.5}px)`,
      },
      whileInView: {
        opacity: 1,
        y: 0,
        x: 0,
        filter: 'blur(0px)',
      },
      viewport: { once: true, amount, margin: '-40px' },
      transition: {
        duration: getDuration(motion.durationMs.slow) / 1000,
        ease: motion.easing.luxOut,
      },
    }
  }, [getDuration, motion, personality, prefersReducedMotion, amount, direction])
}

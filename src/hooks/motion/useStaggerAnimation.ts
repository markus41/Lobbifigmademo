/**
 * Hook for stagger animations (list items appearing one by one).
 * Uses custom easing curves and spring-based item reveals.
 */
import { useMemo } from 'react'
import { useOrgMotion } from '../useOrgMotion'
import type { Variants } from 'motion/react'

type StaggerDirection = 'up' | 'down' | 'left' | 'right'

interface StaggerConfig {
  container: Variants
  item: Variants
}

export function useStaggerAnimation(
  staggerDelay = 0.06,
  direction: StaggerDirection = 'up',
): StaggerConfig {
  const { getDuration, motion, personality, prefersReducedMotion } = useOrgMotion()

  return useMemo((): StaggerConfig => {
    if (prefersReducedMotion) {
      return {
        container: { initial: {}, animate: {} },
        item: { initial: { opacity: 1 }, animate: { opacity: 1 } },
      }
    }

    const amp = personality.amplitudeMul
    const directionMap: Record<StaggerDirection, { x?: number; y?: number }> = {
      up: { y: 20 * amp },
      down: { y: -20 * amp },
      left: { x: 24 * amp },
      right: { x: -24 * amp },
    }

    const offset = directionMap[direction]

    return {
      container: {
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay * personality.cadenceMul,
            delayChildren: 0.08,
          },
        },
      },
      item: {
        initial: {
          opacity: 0,
          filter: 'blur(4px)',
          ...offset,
        },
        animate: {
          opacity: 1,
          y: 0,
          x: 0,
          filter: 'blur(0px)',
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 24,
            mass: 0.8,
          },
        },
      },
    }
  }, [getDuration, motion, personality, prefersReducedMotion, staggerDelay, direction])
}

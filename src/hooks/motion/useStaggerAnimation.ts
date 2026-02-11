/**
 * Hook for stagger animations (list items appearing one by one).
 * Uses custom easing curves and spring-based item reveals.
 *
 * Enhanced with:
 * - Scale and rotation for added depth
 * - Exit animations for smooth removal
 * - Hover state for interactive lists
 * - Layout animation support
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
  options?: {
    /** Add scale animation to items */
    withScale?: boolean
    /** Add rotation hint for depth */
    withRotation?: boolean
    /** Include exit animations */
    withExit?: boolean
  }
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
    const withScale = options?.withScale ?? true
    const withRotation = options?.withRotation ?? true
    const withExit = options?.withExit ?? true

    const directionMap: Record<StaggerDirection, { x?: number; y?: number }> = {
      up: { y: 24 * amp },
      down: { y: -24 * amp },
      left: { x: 32 * amp },
      right: { x: -32 * amp },
    }

    const offset = directionMap[direction]
    const rotationHint = withRotation
      ? direction === 'left'
        ? -2 * amp
        : direction === 'right'
        ? 2 * amp
        : direction === 'down'
        ? 1 * amp
        : -1 * amp
      : 0

    return {
      container: {
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay * personality.cadenceMul,
            delayChildren: 0.1,
          },
        },
        exit: withExit
          ? {
              transition: {
                staggerChildren: staggerDelay * 0.5,
                staggerDirection: -1,
              },
            }
          : {
              transition: {
                staggerChildren: 0.05,
              },
            },
      },
      item: {
        initial: {
          opacity: 0,
          scale: withScale ? 0.92 : 1,
          rotateY: rotationHint,
          filter: 'blur(6px)',
          ...offset,
        },
        animate: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotateY: 0,
          filter: 'blur(0px)',
          transition: {
            type: 'spring',
            stiffness: 320,
            damping: 26,
            mass: 0.7,
          },
        },
        exit: withExit
          ? {
              opacity: 0,
              scale: 0.94,
              filter: 'blur(4px)',
              transition: {
                duration: 0.2,
                ease: [0.4, 0, 0.6, 1],
              },
            }
          : {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              transition: {
                duration: 0.2,
                ease: [0.4, 0, 0.6, 1],
              },
            },
      },
    }
  }, [getDuration, motion, personality, prefersReducedMotion, staggerDelay, direction, options])
}

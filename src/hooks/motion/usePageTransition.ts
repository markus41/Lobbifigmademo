/**
 * Hook for page transition animations (enter/exit).
 * Supports multiple transition styles: fade, slide, scale, morph.
 */
import { useMemo } from 'react'
import { useOrgMotion } from '../useOrgMotion'
import type { Variants } from 'motion/react'

type TransitionStyle = 'fade' | 'slide' | 'scale' | 'morph'

export function usePageTransition(style: TransitionStyle = 'fade'): Variants {
  const { getDuration, motion, personality, prefersReducedMotion } = useOrgMotion()

  return useMemo(() => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      }
    }

    const duration = getDuration(motion.durationMs.pageTransition) / 1000
    const exitDuration = duration * 0.6
    const amp = personality.amplitudeMul

    const variants: Record<TransitionStyle, Variants> = {
      fade: {
        initial: {
          opacity: 0,
          y: 12 * amp,
          filter: `blur(${motion.blurPx.enter}px)`,
        },
        animate: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration, ease: motion.easing.luxOut },
        },
        exit: {
          opacity: 0,
          y: -8 * amp,
          filter: `blur(${motion.blurPx.exit}px)`,
          transition: { duration: exitDuration, ease: motion.easing.fade },
        },
      },
      slide: {
        initial: {
          opacity: 0,
          x: 60 * amp,
          filter: `blur(${motion.blurPx.enter * 0.5}px)`,
        },
        animate: {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          transition: {
            type: 'spring',
            stiffness: 260,
            damping: 26,
          },
        },
        exit: {
          opacity: 0,
          x: -40 * amp,
          filter: `blur(${motion.blurPx.exit}px)`,
          transition: { duration: exitDuration, ease: motion.easing.fade },
        },
      },
      scale: {
        initial: {
          opacity: 0,
          scale: 0.92,
          filter: `blur(${motion.blurPx.enter}px)`,
        },
        animate: {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            type: 'spring',
            stiffness: 200,
            damping: 22,
          },
        },
        exit: {
          opacity: 0,
          scale: 1.04,
          filter: `blur(${motion.blurPx.exit}px)`,
          transition: { duration: exitDuration, ease: motion.easing.fade },
        },
      },
      morph: {
        initial: {
          opacity: 0,
          scale: 0.96,
          y: 16 * amp,
          borderRadius: '24px',
          filter: `blur(${motion.blurPx.enter}px)`,
        },
        animate: {
          opacity: 1,
          scale: 1,
          y: 0,
          borderRadius: '0px',
          filter: 'blur(0px)',
          transition: { duration: duration * 1.2, ease: motion.easing.luxOut },
        },
        exit: {
          opacity: 0,
          scale: 0.98,
          y: -10 * amp,
          borderRadius: '16px',
          filter: `blur(${motion.blurPx.exit}px)`,
          transition: { duration: exitDuration, ease: motion.easing.fade },
        },
      },
    }

    return variants[style]
  }, [getDuration, motion, personality, prefersReducedMotion, style])
}

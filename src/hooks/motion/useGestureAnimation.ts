/**
 * Hook for gesture-based animations (drag, swipe, pan).
 * Returns motion props for drag, swipe, and pan interactions.
 *
 * Features:
 * - Drag constraints and elastic boundaries
 * - Swipe-to-dismiss gestures
 * - Pan with momentum
 * - Touch-optimized spring physics
 */
import { useMemo } from 'react'
import { useOrgMotion } from '../useOrgMotion'
import type { PanInfo } from 'motion/react'

interface GestureAnimationConfig {
  /** Drag configuration */
  drag?: boolean | 'x' | 'y'
  dragConstraints?: { left?: number; right?: number; top?: number; bottom?: number }
  dragElastic?: number
  dragMomentum?: boolean
  onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
  /** Spring transition for drag */
  dragTransition?: {
    type: string
    stiffness: number
    damping: number
    mass: number
  }
}

interface UseGestureAnimationOptions {
  /** Enable horizontal drag */
  dragX?: boolean
  /** Enable vertical drag */
  dragY?: boolean
  /** Drag constraints */
  constraints?: { left?: number; right?: number; top?: number; bottom?: number }
  /** Elasticity (0-1, default 0.2) */
  elastic?: number
  /** Enable momentum on drag end */
  momentum?: boolean
  /** Callback on drag end */
  onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
}

export function useGestureAnimation(
  options?: UseGestureAnimationOptions
): GestureAnimationConfig {
  const { personality, prefersReducedMotion } = useOrgMotion()

  return useMemo(() => {
    if (prefersReducedMotion) {
      return {}
    }

    const {
      dragX = false,
      dragY = false,
      constraints,
      elastic = 0.2,
      momentum = true,
      onDragEnd,
    } = options || {}

    const drag = dragX && dragY ? true : dragX ? 'x' : dragY ? 'y' : false

    return {
      drag: drag as boolean | 'x' | 'y',
      dragConstraints: constraints,
      dragElastic: elastic * personality.amplitudeMul,
      dragMomentum: momentum,
      onDragEnd,
      dragTransition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.8 * personality.cadenceMul,
      },
    }
  }, [personality, prefersReducedMotion, options])
}

/**
 * Hook for swipe-to-dismiss gesture
 */
export function useSwipeToDismiss(
  onDismiss: () => void,
  threshold = 100
): GestureAnimationConfig {
  const { personality, prefersReducedMotion } = useOrgMotion()

  return useMemo(() => {
    if (prefersReducedMotion) {
      return {}
    }

    const handleDragEnd = (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      const offset = info.offset.x
      const velocity = info.velocity.x

      // Swipe right or left with sufficient velocity or distance
      if (Math.abs(offset) > threshold || Math.abs(velocity) > 500) {
        onDismiss()
      }
    }

    return {
      drag: 'x',
      dragConstraints: { left: 0, right: 0 },
      dragElastic: 0.6 * personality.amplitudeMul,
      dragMomentum: true,
      onDragEnd: handleDragEnd,
      dragTransition: {
        type: 'spring',
        stiffness: 450,
        damping: 28,
        mass: 0.6,
      },
    }
  }, [personality, prefersReducedMotion, onDismiss, threshold])
}

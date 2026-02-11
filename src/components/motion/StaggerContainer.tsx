/**
 * StaggerContainer - Container that staggers child animations.
 * StaggerItem - Child with spring-based entrance animation and blur reveal.
 *
 * Enhanced with:
 * - Layout animation support for reordering
 * - Configurable animation direction
 * - Scale and rotation options for added depth
 * - Exit animations for AnimatePresence
 */
import type { ReactNode } from 'react'
import { motion } from 'motion/react'

interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  delayChildren?: number
  /** Enable layout animations for child reordering */
  layout?: boolean
  /** Trigger animations on scroll */
  whenInView?: boolean
}

export function StaggerContainer({
  children,
  staggerDelay = 0.06,
  delayChildren = 0.1,
  layout = false,
  whenInView = false,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial={whenInView ? undefined : 'initial'}
      animate={whenInView ? undefined : 'animate'}
      whileInView={whenInView ? 'animate' : undefined}
      viewport={whenInView ? { once: true, amount: 0.2, margin: '-60px' } : undefined}
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      layout={layout}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  /** Direction of entrance animation */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Add subtle scale effect */
  scale?: boolean
  /** Layout ID for shared element transitions */
  layoutId?: string
}

/**
 * StaggerItem - Child of StaggerContainer with spring entrance animation.
 */
export function StaggerItem({
  children,
  direction = 'up',
  scale = false,
  layoutId,
}: StaggerItemProps) {
  const directionOffset = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 24 },
    right: { x: -24 },
  }

  const scaleValue = scale ? 0.94 : 1
  const rotationHint = direction === 'left' ? -1.5 : direction === 'right' ? 1.5 : 0

  return (
    <motion.div
      variants={{
        initial: {
          opacity: 0,
          scale: scaleValue,
          rotateY: rotationHint,
          filter: 'blur(6px)',
          ...directionOffset[direction],
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
        exit: {
          opacity: 0,
          scale: 0.96,
          filter: 'blur(4px)',
          transition: {
            duration: 0.2,
            ease: [0.4, 0, 0.6, 1],
          },
        },
      }}
      layout
      layoutId={layoutId}
      style={{ transformPerspective: '1200px' }}
    >
      {children}
    </motion.div>
  )
}

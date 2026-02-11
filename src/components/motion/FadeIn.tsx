/**
 * FadeIn - Animation wrapper with directional reveal, blur, and spring physics.
 * Useful for scroll-triggered or delayed content reveals.
 *
 * Enhanced with:
 * - Spring physics option for more natural motion
 * - Scale animation support
 * - Rotation hint for added depth
 * - Layout animation support
 */
import type { ReactNode } from 'react'
import { motion } from 'motion/react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  once?: boolean
  amount?: number
  blur?: boolean
  /** Use spring physics instead of duration-based easing */
  spring?: boolean
  /** Add subtle scale animation */
  scale?: boolean
  /** Enable layout animations */
  layout?: boolean
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 20,
  once = true,
  amount = 0.3,
  blur = true,
  spring = false,
  scale = false,
  layout = false,
}: FadeInProps) {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  const scaleValue = scale ? 0.95 : 1
  const rotationHint = direction === 'left' ? -2 : direction === 'right' ? 2 : 0

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: scaleValue,
        rotateY: rotationHint,
        ...directionMap[direction],
        ...(blur ? { filter: 'blur(6px)' } : {}),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once, amount, margin: '-50px' }}
      transition={
        spring
          ? {
              type: 'spring',
              stiffness: 280,
              damping: 26,
              mass: 0.8,
              delay,
            }
          : {
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }
      }
      layout={layout}
      style={{ transformPerspective: '1200px' }}
    >
      {children}
    </motion.div>
  )
}

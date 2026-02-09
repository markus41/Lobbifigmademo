/**
 * StaggerContainer - Container that staggers child animations.
 * StaggerItem - Child with spring-based entrance animation and blur reveal.
 */
import type { ReactNode } from 'react'
import { motion } from 'motion/react'

interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  delayChildren?: number
}

export function StaggerContainer({
  children,
  staggerDelay = 0.06,
  delayChildren = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerItem - Child of StaggerContainer with spring entrance animation.
 */
export function StaggerItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 16, filter: 'blur(4px)' },
        animate: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 24,
            mass: 0.8,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

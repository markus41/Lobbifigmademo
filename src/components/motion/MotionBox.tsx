/**
 * MotionBox - Animated div wrapper with Framer Motion.
 * Combines motion.div with HTML div props and Framer Motion animations.
 */
import { forwardRef, type HTMLAttributes } from 'react'
import { motion, type MotionProps } from 'motion/react'

export type MotionBoxProps = HTMLAttributes<HTMLDivElement> & MotionProps

export const MotionBox = forwardRef<HTMLDivElement, MotionBoxProps>(
  function MotionBox(props, ref) {
    return <motion.div ref={ref} {...props} />
  }
)

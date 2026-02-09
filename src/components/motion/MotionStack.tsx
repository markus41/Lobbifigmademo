/**
 * MotionStack - Animated stack container with Framer Motion.
 */
import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react'
import { motion, type MotionProps } from 'motion/react'

export type MotionStackProps = HTMLAttributes<HTMLDivElement> & MotionProps

export const MotionStack = forwardRef<HTMLDivElement, MotionStackProps>(
  function MotionStack({ style, ...props }, ref) {
    const stackStyle: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }
    return <motion.div ref={ref} style={stackStyle} {...props} />
  }
)

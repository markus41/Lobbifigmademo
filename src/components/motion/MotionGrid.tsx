/**
 * MotionGrid - Animated grid container with Framer Motion.
 */
import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react'
import { motion, type MotionProps } from 'motion/react'

export type MotionGridProps = HTMLAttributes<HTMLDivElement> & MotionProps

export const MotionGrid = forwardRef<HTMLDivElement, MotionGridProps>(
  function MotionGrid({ style, ...props }, ref) {
    const gridStyle: CSSProperties = {
      display: 'grid',
      ...style,
    }
    return <motion.div ref={ref} style={gridStyle} {...props} />
  }
)

/**
 * MotionFlex - Animated flex container with Framer Motion.
 */
import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react'
import { motion, type MotionProps } from 'motion/react'

export type MotionFlexProps = HTMLAttributes<HTMLDivElement> & MotionProps

export const MotionFlex = forwardRef<HTMLDivElement, MotionFlexProps>(
  function MotionFlex({ style, ...props }, ref) {
    const flexStyle: CSSProperties = {
      display: 'flex',
      ...style,
    }
    return <motion.div ref={ref} style={flexStyle} {...props} />
  }
)

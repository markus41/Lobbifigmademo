/**
 * MotionGrid - Animated grid container with Framer Motion.
 */
import { forwardRef } from 'react'
import { Grid, type GridProps } from '@chakra-ui/react'
import { motion, type MotionProps } from 'motion/react'

export type MotionGridProps = GridProps & MotionProps

const MotionGridBase = motion.create(Grid)

export const MotionGrid = forwardRef<HTMLDivElement, MotionGridProps>(
  function MotionGrid(props, ref) {
    // @ts-expect-error - Chakra css prop type conflicts with motion/react css prop
    return <MotionGridBase ref={ref} {...props} />
  }
)

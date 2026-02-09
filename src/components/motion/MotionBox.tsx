/**
 * MotionBox - Animated div wrapper with Framer Motion.
 * Combines Chakra Box styling with Framer Motion animations.
 */
import { forwardRef } from 'react'
import { Box, type BoxProps } from '@chakra-ui/react'
import { motion, type MotionProps } from 'motion/react'

export type MotionBoxProps = BoxProps & MotionProps

const MotionBoxBase = motion.create(Box)

export const MotionBox = forwardRef<HTMLDivElement, MotionBoxProps>(
  function MotionBox(props, ref) {
    // @ts-expect-error - Chakra css prop type conflicts with motion/react css prop
    return <MotionBoxBase ref={ref} {...props} />
  }
)

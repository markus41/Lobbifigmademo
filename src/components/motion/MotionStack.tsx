/**
 * MotionStack - Animated stack container with Framer Motion.
 */
import { forwardRef } from 'react'
import { Stack, type StackProps } from '@chakra-ui/react'
import { motion, type MotionProps } from 'motion/react'

export type MotionStackProps = StackProps & MotionProps

const MotionStackBase = motion.create(Stack)

export const MotionStack = forwardRef<HTMLDivElement, MotionStackProps>(
  function MotionStack(props, ref) {
    // @ts-expect-error - Chakra css prop type conflicts with motion/react css prop
    return <MotionStackBase ref={ref} {...props} />
  }
)

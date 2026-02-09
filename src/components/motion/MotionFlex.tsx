/**
 * MotionFlex - Animated flex container with Framer Motion.
 */
import { forwardRef } from 'react'
import { Flex, type FlexProps } from '@chakra-ui/react'
import { motion, type MotionProps } from 'motion/react'

export type MotionFlexProps = FlexProps & MotionProps

const MotionFlexBase = motion.create(Flex)

export const MotionFlex = forwardRef<HTMLDivElement, MotionFlexProps>(
  function MotionFlex(props, ref) {
    // @ts-expect-error - Chakra css prop type conflicts with motion/react css prop
    return <MotionFlexBase ref={ref} {...props} />
  }
)

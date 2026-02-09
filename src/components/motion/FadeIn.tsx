/**
 * FadeIn - Animation wrapper with directional reveal, blur, and spring physics.
 * Useful for scroll-triggered or delayed content reveals.
 */
import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Box } from '@chakra-ui/react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  once?: boolean
  amount?: number
  blur?: boolean
}

const MotionDiv = motion.create(Box)

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 20,
  once = true,
  amount = 0.3,
  blur = true,
}: FadeInProps) {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  return (
    <MotionDiv
      initial={{
        opacity: 0,
        ...directionMap[direction],
        ...(blur ? { filter: 'blur(4px)' } : {}),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionDiv>
  )
}

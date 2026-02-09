/**
 * AnimatedPage - Page wrapper with polished enter/exit transitions.
 * Wraps content with page-level animation using org motion config.
 */
import type { ReactNode } from 'react'
import { AnimatePresence, motion, type Variants } from 'motion/react'
import { Box } from '@chakra-ui/react'

interface AnimatedPageProps {
  children: ReactNode
  /** Unique key for AnimatePresence (usually route path) */
  pageKey?: string
  /** Custom animation variants */
  variants?: Variants
}

const defaultVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12,
    scale: 0.98,
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.99,
    filter: 'blur(4px)',
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.6, 1] as [number, number, number, number],
    },
  },
}

const MotionDiv = motion.create(Box)

export function AnimatedPage({
  children,
  pageKey,
  variants = defaultVariants,
}: AnimatedPageProps) {
  return (
    <AnimatePresence mode="wait">
      <MotionDiv
        key={pageKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        minH="100vh"
      >
        {children}
      </MotionDiv>
    </AnimatePresence>
  )
}

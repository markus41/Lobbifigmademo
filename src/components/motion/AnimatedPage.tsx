/**
 * AnimatedPage - Page wrapper with polished enter/exit transitions.
 * Wraps content with page-level animation using org motion config.
 *
 * Enhanced with:
 * - Layout animations for smooth position transitions
 * - Spring physics for natural movement
 * - Improved exit animations with directional fade
 * - Support for shared element transitions via layoutId
 */
import type { ReactNode } from 'react'
import { AnimatePresence, motion, type Variants } from 'motion/react'

interface AnimatedPageProps {
  children: ReactNode
  /** Unique key for AnimatePresence (usually route path) */
  pageKey?: string
  /** Custom animation variants */
  variants?: Variants
  /** Enable layout animations for position changes */
  layout?: boolean
  /** Layout ID for shared element transitions */
  layoutId?: string
}

const defaultVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
    scale: 0.96,
    filter: 'blur(8px)',
    rotateX: 2,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 28,
      mass: 0.8,
      opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      filter: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    filter: 'blur(6px)',
    rotateX: -1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.6, 1] as [number, number, number, number],
      opacity: { duration: 0.2 },
    },
  },
}

export function AnimatedPage({
  children,
  pageKey,
  variants = defaultVariants,
  layout = false,
  layoutId,
}: AnimatedPageProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        layout={layout}
        layoutId={layoutId}
        style={{
          minHeight: '100vh',
          transformPerspective: '1200px',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * MotionList - Animated list with stagger, reordering, and removal animations.
 * Handles layout animations for smooth reordering and item removal.
 *
 * Features:
 * - Automatic stagger on mount
 * - Layout animations for reordering
 * - Exit animations for item removal
 * - Configurable animation direction
 */
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'

interface MotionListProps {
  children: ReactNode
  /** Stagger delay between items (seconds) */
  staggerDelay?: number
  /** Animation direction */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Gap between items */
  gap?: number
  /** Layout mode (flex or grid) */
  layout?: 'flex' | 'grid'
  /** Grid columns (only for grid layout) */
  columns?: number
  /** Enable exit animations */
  withExit?: boolean
}

const directionOffsets = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 32 },
  right: { x: -32 },
}

export function MotionList({
  children,
  staggerDelay = 0.06,
  direction = 'up',
  gap = 16,
  layout = 'flex',
  columns = 3,
  withExit = true,
}: MotionListProps) {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  }

  const containerStyle =
    layout === 'grid'
      ? {
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${gap}px`,
        }
      : {
          display: 'flex',
          flexDirection: 'column' as const,
          gap: `${gap}px`,
        }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      style={containerStyle}
    >
      <AnimatePresence mode={withExit ? 'popLayout' : 'sync'}>
        {children}
      </AnimatePresence>
    </motion.div>
  )
}

interface MotionListItemProps {
  children: ReactNode
  /** Unique key for the item */
  itemKey: string | number
  /** Animation direction (inherited from parent if not set) */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Layout ID for shared element transitions */
  layoutId?: string
  /** Click handler */
  onClick?: () => void
}

export function MotionListItem({
  children,
  itemKey,
  direction = 'up',
  layoutId,
  onClick,
}: MotionListItemProps) {
  const offset = directionOffsets[direction]

  return (
    <motion.div
      key={itemKey}
      layoutId={layoutId}
      variants={{
        initial: {
          opacity: 0,
          scale: 0.92,
          filter: 'blur(6px)',
          ...offset,
        },
        animate: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: {
            type: 'spring',
            stiffness: 320,
            damping: 26,
            mass: 0.7,
          },
        },
        exit: {
          opacity: 0,
          scale: 0.9,
          filter: 'blur(4px)',
          transition: {
            duration: 0.2,
            ease: [0.4, 0, 0.6, 1],
          },
        },
      }}
      layout
      onClick={onClick}
      style={{ transformPerspective: '1200px' }}
    >
      {children}
    </motion.div>
  )
}

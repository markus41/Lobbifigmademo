/**
 * AnimatedPresence - Enhanced wrapper around motion's AnimatePresence.
 * Provides consistent exit animations for conditional rendering.
 *
 * Features:
 * - Multiple animation presets
 * - Automatic layout mode for position changes
 * - Custom exit animation support
 * - Popover/dropdown optimized modes
 */
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'

interface AnimatedPresenceWrapperProps {
  /** Element visibility */
  isVisible: boolean
  /** Content to render when visible */
  children: ReactNode
  /** Animation preset */
  preset?: 'fade' | 'scale' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right'
  /** AnimatePresence mode */
  mode?: 'wait' | 'sync' | 'popLayout'
  /** Custom key for the element */
  elementKey?: string
}

const presets = {
  fade: {
    initial: { opacity: 0, filter: 'blur(6px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(4px)' },
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
  },
  scale: {
    initial: { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.95, filter: 'blur(4px)' },
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 28,
      mass: 0.6,
    },
  },
  'slide-up': {
    initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -12, filter: 'blur(4px)' },
    transition: {
      type: 'spring' as const,
      stiffness: 380,
      damping: 30,
      mass: 0.7,
    },
  },
  'slide-down': {
    initial: { opacity: 0, y: -16, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: 12, filter: 'blur(4px)' },
    transition: {
      type: 'spring' as const,
      stiffness: 380,
      damping: 30,
      mass: 0.7,
    },
  },
  'slide-left': {
    initial: { opacity: 0, x: 24, filter: 'blur(6px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: -20, filter: 'blur(4px)' },
    transition: {
      type: 'spring' as const,
      stiffness: 380,
      damping: 30,
      mass: 0.7,
    },
  },
  'slide-right': {
    initial: { opacity: 0, x: -24, filter: 'blur(6px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: 20, filter: 'blur(4px)' },
    transition: {
      type: 'spring' as const,
      stiffness: 380,
      damping: 30,
      mass: 0.7,
    },
  },
}

export function AnimatedPresenceWrapper({
  isVisible,
  children,
  preset = 'fade',
  mode = 'wait',
  elementKey,
}: AnimatedPresenceWrapperProps) {
  const animation = presets[preset]

  return (
    <AnimatePresence mode={mode}>
      {isVisible && (
        <motion.div
          key={elementKey}
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
          transition={animation.transition}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * AnimatedDropdown - Specialized wrapper for dropdown menus.
 * Optimized for menu/popover animations with proper positioning.
 */
interface AnimatedDropdownProps {
  isOpen: boolean
  children: ReactNode
  /** Dropdown position relative to trigger */
  position?: 'top' | 'bottom' | 'left' | 'right'
  /** Custom z-index */
  zIndex?: number
}

export function AnimatedDropdown({
  isOpen,
  children,
  position = 'bottom',
  zIndex = 100,
}: AnimatedDropdownProps) {
  const directionMap = {
    top: { y: 10 },
    bottom: { y: -10 },
    left: { x: 10 },
    right: { x: -10 },
  }

  const offset = directionMap[position]

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            filter: 'blur(6px)',
            ...offset,
          }}
          animate={{
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            filter: 'blur(0px)',
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
            filter: 'blur(4px)',
            ...offset,
          }}
          transition={{
            type: 'spring',
            stiffness: 420,
            damping: 28,
            mass: 0.5,
          }}
          style={{
            zIndex,
            transformOrigin: position === 'bottom' ? 'top' : position === 'top' ? 'bottom' : 'center',
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

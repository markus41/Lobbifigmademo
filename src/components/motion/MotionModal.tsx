/**
 * MotionModal - Animated modal/dialog with backdrop and content animations.
 * Provides polished enter/exit animations for overlay UIs.
 *
 * Features:
 * - Backdrop fade with blur
 * - Content spring entrance from scale
 * - Exit animations
 * - Keyboard (ESC) and click-outside handling
 */
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'

interface MotionModalProps {
  /** Modal visibility */
  isOpen: boolean
  /** Close handler */
  onClose: () => void
  /** Modal content */
  children: ReactNode
  /** Disable click-outside to close */
  disableBackdropClick?: boolean
  /** Disable ESC to close */
  disableEscapeKey?: boolean
  /** Custom backdrop blur */
  backdropBlur?: number
  /** Animation variant */
  variant?: 'scale' | 'slide' | 'fade'
}

export function MotionModal({
  isOpen,
  onClose,
  children,
  disableBackdropClick = false,
  disableEscapeKey = false,
  backdropBlur = 8,
  variant = 'scale',
}: MotionModalProps) {
  // Handle ESC key
  useEffect(() => {
    if (disableEscapeKey || !isOpen) return

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose, disableEscapeKey])

  const contentVariants = {
    scale: {
      initial: { opacity: 0, scale: 0.9, y: 20, filter: 'blur(8px)' },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          type: 'spring' as const,
          stiffness: 360,
          damping: 28,
          mass: 0.7,
        },
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        y: 10,
        filter: 'blur(6px)',
        transition: {
          duration: 0.25,
          ease: [0.4, 0, 0.6, 1] as const,
        },
      },
    },
    slide: {
      initial: { opacity: 0, y: '100%', filter: 'blur(8px)' },
      animate: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          type: 'spring' as const,
          stiffness: 320,
          damping: 30,
          mass: 0.8,
        },
      },
      exit: {
        opacity: 0,
        y: '50%',
        filter: 'blur(6px)',
        transition: {
          duration: 0.3,
          ease: [0.4, 0, 0.6, 1] as const,
        },
      },
    },
    fade: {
      initial: { opacity: 0, filter: 'blur(8px)' },
      animate: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
      },
      exit: {
        opacity: 0,
        filter: 'blur(6px)',
        transition: { duration: 0.2, ease: [0.4, 0, 0.6, 1] as const },
      },
    },
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{
              opacity: 1,
              backdropFilter: `blur(${backdropBlur}px)`,
            }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={disableBackdropClick ? undefined : onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
            }}
          />

          {/* Content */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              variants={contentVariants[variant]}
              initial="initial"
              animate="animate"
              exit="exit"
              style={{
                pointerEvents: 'auto',
                transformPerspective: '1200px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

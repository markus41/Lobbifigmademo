/**
 * SharedElement - Component for shared element transitions using layoutId.
 * Creates smooth morphing animations between different states/pages.
 *
 * Usage:
 * ```tsx
 * // In list view:
 * <SharedElement layoutId="item-1">
 *   <Card />
 * </SharedElement>
 *
 * // In detail view:
 * <SharedElement layoutId="item-1">
 *   <ExpandedCard />
 * </SharedElement>
 * ```
 *
 * The element will smoothly morph between the two states.
 */
import type { ReactNode, HTMLAttributes } from 'react'
import { motion, type Transition } from 'motion/react'

interface SharedElementProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Unique ID shared between elements */
  layoutId: string
  /** Custom transition settings */
  transition?: Transition
  /** Element type (div, span, etc.) */
  as?: keyof JSX.IntrinsicElements
}

const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 32,
  mass: 0.6,
}

export function SharedElement({
  children,
  layoutId,
  transition = defaultTransition,
  as = 'div',
  ...props
}: SharedElementProps) {
  const MotionComponent = motion[as] as typeof motion.div

  return (
    <MotionComponent layoutId={layoutId} transition={transition} {...props}>
      {children}
    </MotionComponent>
  )
}

/**
 * SharedImage - Specialized shared element for images with aspect ratio preservation
 */
interface SharedImageProps extends HTMLAttributes<HTMLImageElement> {
  layoutId: string
  src: string
  alt: string
  transition?: Transition
}

export function SharedImage({
  layoutId,
  src,
  alt,
  transition = defaultTransition,
  ...props
}: SharedImageProps) {
  return (
    <motion.img
      layoutId={layoutId}
      src={src}
      alt={alt}
      transition={transition}
      style={{ width: '100%', height: 'auto' }}
      {...props}
    />
  )
}

/**
 * SharedBackground - Shared element for background colors/gradients
 */
interface SharedBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  layoutId: string
  children: ReactNode
  transition?: Transition
}

export function SharedBackground({
  layoutId,
  children,
  transition = defaultTransition,
  ...props
}: SharedBackgroundProps) {
  return (
    <motion.div
      layoutId={layoutId}
      transition={{
        ...transition,
        // Smoother background transitions
        backgroundColor: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

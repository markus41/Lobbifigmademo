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
import type { ReactNode } from 'react'
import { motion, type Transition } from 'motion/react'

interface SharedElementProps {
  children: ReactNode
  /** Unique ID shared between elements */
  layoutId: string
  /** Custom transition settings */
  transition?: Transition
  /** Element type (div, span, etc.) */
  as?: keyof JSX.IntrinsicElements
  className?: string
  style?: React.CSSProperties
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
  className,
  style,
}: SharedElementProps) {
  const MotionComponent = (motion as unknown as Record<string, typeof motion.div>)[as] ?? motion.div

  return (
    <MotionComponent layoutId={layoutId} transition={transition} className={className} style={style}>
      {children}
    </MotionComponent>
  )
}

/**
 * SharedImage - Specialized shared element for images with aspect ratio preservation
 */
interface SharedImageProps {
  layoutId: string
  src: string
  alt: string
  transition?: Transition
  className?: string
  style?: React.CSSProperties
}

export function SharedImage({
  layoutId,
  src,
  alt,
  transition = defaultTransition,
  className,
  style,
}: SharedImageProps) {
  return (
    <motion.img
      layoutId={layoutId}
      src={src}
      alt={alt}
      transition={transition}
      className={className}
      style={{ width: '100%', height: 'auto', ...style }}
    />
  )
}

/**
 * SharedBackground - Shared element for background colors/gradients
 */
interface SharedBackgroundProps {
  layoutId: string
  children: ReactNode
  transition?: Transition
  className?: string
  style?: React.CSSProperties
}

export function SharedBackground({
  layoutId,
  children,
  transition = defaultTransition,
  className,
  style,
}: SharedBackgroundProps) {
  return (
    <motion.div
      layoutId={layoutId}
      className={className}
      style={style}
      transition={{
        ...transition,
        backgroundColor: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
      }}
    >
      {children}
    </motion.div>
  )
}

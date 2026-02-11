# Motion Enhancements Summary

This document outlines the polished Framer Motion animations added to the Lobbifigmademo project using the `motion` package (v12.23.24).

## Overview

All motion components and hooks have been enhanced with:
- **Spring physics** for natural, responsive animations
- **Layout animations** for smooth position/size changes
- **Shared element transitions** via `layoutId`
- **Gesture support** (drag, swipe, tap)
- **Exit animations** for AnimatePresence
- **Accessibility** via reduced motion support

---

## Enhanced Components

### 1. AnimatedPage (`src/components/motion/AnimatedPage.tsx`)

**Enhancements:**
- Added 3D rotation hint (`rotateX`) for depth
- Spring physics option for entrance
- Improved exit animation with directional fade
- Layout animation support
- SharedElement transition via `layoutId`

**New Props:**
- `layout?: boolean` - Enable layout animations
- `layoutId?: string` - For shared element transitions

**Usage:**
```tsx
<AnimatedPage pageKey="dashboard" layout layoutId="main-content">
  <DashboardContent />
</AnimatedPage>
```

---

### 2. FadeIn (`src/components/motion/FadeIn.tsx`)

**Enhancements:**
- Spring physics option
- Scale animation support
- Rotation hints for depth perception
- Layout animation support

**New Props:**
- `spring?: boolean` - Use spring instead of duration
- `scale?: boolean` - Add subtle scale effect
- `layout?: boolean` - Enable layout animations

**Usage:**
```tsx
<FadeIn direction="up" spring scale blur>
  <Card />
</FadeIn>
```

---

### 3. StaggerContainer & StaggerItem (`src/components/motion/StaggerContainer.tsx`)

**Enhancements:**
- Layout animations for reordering
- Configurable animation direction
- Scale and rotation options
- Exit animations for item removal
- Scroll-triggered option

**New Props (StaggerContainer):**
- `layout?: boolean` - Enable layout animations
- `whenInView?: boolean` - Trigger on scroll

**New Props (StaggerItem):**
- `direction?: 'up' | 'down' | 'left' | 'right'`
- `scale?: boolean` - Add scale effect
- `layoutId?: string` - For shared transitions

**Usage:**
```tsx
<StaggerContainer staggerDelay={0.08} whenInView layout>
  {items.map(item => (
    <StaggerItem key={item.id} direction="up" scale layoutId={item.id}>
      <ItemCard data={item} />
    </StaggerItem>
  ))}
</StaggerContainer>
```

---

### 4. NEW: SharedElement Components (`src/components/motion/SharedElement.tsx`)

**Purpose:** Smooth morphing transitions between states/pages

**Components:**
- `SharedElement` - General shared element wrapper
- `SharedImage` - Image with aspect ratio preservation
- `SharedBackground` - Background color/gradient transitions

**Usage:**
```tsx
// In list view:
<SharedElement layoutId={`card-${item.id}`}>
  <CardPreview item={item} />
</SharedElement>

// In detail view:
<SharedElement layoutId={`card-${item.id}`}>
  <CardDetail item={item} />
</SharedElement>
```

---

### 5. NEW: MotionList & MotionListItem (`src/components/motion/MotionList.tsx`)

**Purpose:** Animated lists with automatic stagger, reordering, and removal

**Features:**
- Automatic stagger on mount
- Layout animations for reordering
- Exit animations for removal
- Flex or grid layout support

**Usage:**
```tsx
<MotionList staggerDelay={0.06} layout="grid" columns={3} withExit>
  {items.map(item => (
    <MotionListItem key={item.id} itemKey={item.id} layoutId={item.id}>
      <Card {...item} />
    </MotionListItem>
  ))}
</MotionList>
```

---

### 6. NEW: MotionModal (`src/components/motion/MotionModal.tsx`)

**Purpose:** Polished modal/dialog with backdrop and content animations

**Features:**
- Backdrop fade with blur
- Multiple animation variants
- ESC and click-outside support
- Spring entrance animations

**Variants:**
- `scale` (default) - Scale from center
- `slide` - Slide from bottom
- `fade` - Simple fade

**Usage:**
```tsx
<MotionModal
  isOpen={isModalOpen}
  onClose={handleClose}
  variant="scale"
  backdropBlur={12}
>
  <ModalContent />
</MotionModal>
```

---

### 7. NEW: AnimatedPresence Wrappers (`src/components/motion/AnimatedPresence.tsx`)

**Components:**
- `AnimatedPresenceWrapper` - General conditional rendering
- `AnimatedDropdown` - Specialized for menus/popovers

**Presets:**
- `fade`, `scale`, `slide-up`, `slide-down`, `slide-left`, `slide-right`

**Usage:**
```tsx
<AnimatedPresenceWrapper isVisible={isOpen} preset="scale">
  <Dropdown />
</AnimatedPresenceWrapper>

<AnimatedDropdown isOpen={isOpen} position="bottom" zIndex={100}>
  <MenuItems />
</AnimatedDropdown>
```

---

## Enhanced Hooks

### 1. useCardHoverAnimation (`src/hooks/motion/useCardHoverAnimation.ts`)

**Enhancements:**
- Subtle rotation for depth (`rotateX`)
- Improved spring physics
- Focus state for accessibility
- Intensity option for hero cards

**New Params:**
- `intense?: boolean` - 1.4x multiplier for emphasis

**Returns:**
- `whileHover` - Lift, scale, shadow, brightness
- `whileTap` - Press-down effect
- `whileFocus` - Keyboard focus ring

**Usage:**
```tsx
const cardAnimation = useCardHoverAnimation(true) // intense mode

<motion.div {...cardAnimation}>
  <Card />
</motion.div>
```

---

### 2. useButtonHoverAnimation (`src/hooks/motion/useButtonHoverAnimation.ts`)

**Enhancements:**
- Snappier spring physics
- Subtle skew on tap
- Focus state support
- Variant-based intensity

**New Params:**
- `variant?: 'primary' | 'secondary' | 'ghost'`

**Returns:**
- `whileHover` - Lift, scale, shadow, filter
- `whileTap` - Press with skew
- `whileFocus` - Focus ring

**Usage:**
```tsx
const buttonAnimation = useButtonHoverAnimation('primary')

<motion.button {...buttonAnimation}>
  Click Me
</motion.button>
```

---

### 3. useStaggerAnimation (`src/hooks/motion/useStaggerAnimation.ts`)

**Enhancements:**
- Scale and rotation for depth
- Exit animations
- Configurable options

**New Options:**
- `withScale?: boolean` - Add scale effect
- `withRotation?: boolean` - Add rotation hint
- `withExit?: boolean` - Include exit animations

**Usage:**
```tsx
const { container, item } = useStaggerAnimation(0.06, 'up', {
  withScale: true,
  withRotation: true,
  withExit: true,
})

<motion.div variants={container}>
  {items.map(i => (
    <motion.div key={i} variants={item}>
      <Item />
    </motion.div>
  ))}
</motion.div>
```

---

### 4. useScrollAnimation (`src/hooks/motion/useScrollAnimation.ts`)

**Enhancements:**
- Spring physics option
- Scale and rotation effects
- Better viewport margins
- Repeat animation option

**New Options:**
- `spring?: boolean` - Use spring physics
- `scale?: boolean` - Add scale effect
- `rotation?: boolean` - Add rotation hint
- `margin?: string` - Custom viewport margin
- `once?: boolean` - Repeat on scroll

**Usage:**
```tsx
const scrollAnim = useScrollAnimation(0.3, 'up', {
  spring: true,
  scale: true,
  rotation: true,
  once: false,
})

<motion.div {...scrollAnim}>
  <ScrollContent />
</motion.div>
```

---

### 5. NEW: useGestureAnimation (`src/hooks/motion/useGestureAnimation.ts`)

**Purpose:** Drag, swipe, and pan interactions

**Exports:**
- `useGestureAnimation` - General gesture config
- `useSwipeToDismiss` - Swipe-to-dismiss pattern

**Usage:**
```tsx
const dragConfig = useGestureAnimation({
  dragX: true,
  dragY: false,
  constraints: { left: -200, right: 200 },
  elastic: 0.3,
  momentum: true,
})

<motion.div {...dragConfig}>
  <DraggableCard />
</motion.div>

// Swipe to dismiss:
const swipeConfig = useSwipeToDismiss(handleDismiss, 100)

<motion.div {...swipeConfig}>
  <Notification />
</motion.div>
```

---

## Enhanced Existing Components

### LobbiCard (`src/components/lobbi/core/LobbiCard.tsx`)

**Changes:**
- Replaced CSS hover with motion `whileHover`/`whileTap`
- Added spring entrance animation
- Added 3D rotation on hover (`rotateX`)
- Enabled layout animations
- Improved shadow and brightness effects

**Before:**
```css
hover:shadow-[...] hover:-translate-y-0.5
transition-all duration-200
```

**After:**
```tsx
whileHover={{
  y: -8,
  scale: 1.02,
  rotateX: 1,
  boxShadow: '...',
  filter: 'brightness(1.03)',
}}
layout
```

---

### LobbiButton (`src/components/lobbi/core/LobbiButton.tsx`)

**Changes:**
- Enhanced `whileHover` with variant-specific intensity
- Added `whileTap` with skew effect
- Added `whileFocus` for accessibility
- Snappier spring physics

**Before:**
```tsx
whileHover={{ y: -1, scale: 1.01 }}
whileTap={{ scale: 0.98 }}
```

**After:**
```tsx
whileHover={{
  y: -3,
  scale: variant === 'primary' ? 1.05 : 1.03,
  boxShadow: '...',
  filter: 'brightness(1.1)',
}}
whileTap={{ y: 0, scale: 0.96, skewX: -0.5 }}
whileFocus={{ boxShadow: '0 0 0 3px ...' }}
```

---

## File Structure

```
src/
├── components/motion/
│   ├── AnimatedPage.tsx (enhanced)
│   ├── FadeIn.tsx (enhanced)
│   ├── StaggerContainer.tsx (enhanced)
│   ├── MotionBox.tsx
│   ├── MotionFlex.tsx
│   ├── MotionGrid.tsx
│   ├── MotionStack.tsx
│   ├── SharedElement.tsx (NEW)
│   ├── MotionList.tsx (NEW)
│   ├── MotionModal.tsx (NEW)
│   ├── AnimatedPresence.tsx (NEW)
│   └── index.ts
├── hooks/motion/
│   ├── useButtonHoverAnimation.ts (enhanced)
│   ├── useCardHoverAnimation.ts (enhanced)
│   ├── usePageTransition.ts
│   ├── useScrollAnimation.ts (enhanced)
│   ├── useStaggerAnimation.ts (enhanced)
│   ├── useGestureAnimation.ts (NEW)
│   └── index.ts
└── components/lobbi/core/
    ├── LobbiCard.tsx (enhanced)
    └── LobbiButton.tsx (enhanced)
```

---

## Key Principles

### 1. Spring Physics Over Duration
- More natural, responsive feel
- Better interruption handling
- Configurable stiffness, damping, mass

### 2. Layout Animations
- Smooth position/size changes
- Automatic FLIP animations
- Reordering without jank

### 3. Shared Element Transitions
- Use `layoutId` for morphing
- Works across route changes
- Maintains visual continuity

### 4. Exit Animations
- Always provide exit animations
- Use `AnimatePresence` wrapper
- Shorter duration than entrance

### 5. Accessibility
- Respect `prefers-reduced-motion`
- Add focus states for keyboard navigation
- Provide visual feedback for interactions

### 6. Performance
- Use `transform` and `opacity` (GPU-accelerated)
- Avoid animating `width`, `height`, `margin`
- Use `will-change` sparingly
- Enable layout animations only when needed

---

## Common Patterns

### Card Grid with Stagger
```tsx
<MotionList layout="grid" columns={3} staggerDelay={0.06}>
  {cards.map(card => (
    <MotionListItem key={card.id} itemKey={card.id}>
      <LobbiCard {...card} />
    </MotionListItem>
  ))}
</MotionList>
```

### Page Transition with Shared Elements
```tsx
// List page
<SharedElement layoutId="hero-image">
  <img src={hero} alt="Hero" />
</SharedElement>

// Detail page (same layoutId)
<SharedElement layoutId="hero-image">
  <img src={hero} alt="Hero" className="expanded" />
</SharedElement>
```

### Modal with Backdrop
```tsx
<MotionModal isOpen={isOpen} onClose={handleClose} variant="scale">
  <div className="modal-content">
    <h2>Modal Title</h2>
    <p>Content here</p>
  </div>
</MotionModal>
```

### Swipe-to-Dismiss Notification
```tsx
const swipeConfig = useSwipeToDismiss(() => removeNotification(id), 80)

<motion.div {...swipeConfig} className="notification">
  <NotificationContent />
</motion.div>
```

### Scroll-Triggered Section
```tsx
const scrollAnim = useScrollAnimation(0.3, 'up', { spring: true, scale: true })

<motion.section {...scrollAnim}>
  <FeatureGrid />
</motion.section>
```

---

## Testing Animations

### Visual Testing
1. Check entrance animations on mount
2. Verify exit animations on unmount
3. Test hover/tap micro-interactions
4. Validate layout animations on reorder
5. Test shared element transitions

### Performance Testing
1. Use Chrome DevTools Performance tab
2. Check for layout thrashing
3. Monitor frame rate (should be 60fps)
4. Test on low-end devices
5. Verify reduced motion mode

### Accessibility Testing
1. Enable "Reduce motion" in OS settings
2. Test keyboard navigation (focus states)
3. Verify screen reader compatibility
4. Check color contrast ratios

---

## Migration Guide

### Replacing CSS Transitions with Motion

**Before:**
```tsx
<div className="card hover:shadow-lg hover:-translate-y-1 transition-all">
  Content
</div>
```

**After:**
```tsx
import { motion } from 'motion/react'
import { useCardHoverAnimation } from '@/hooks/motion'

const cardAnim = useCardHoverAnimation()

<motion.div className="card" {...cardAnim}>
  Content
</motion.div>
```

### Adding Exit Animations

**Before:**
```tsx
{isOpen && <Dropdown />}
```

**After:**
```tsx
import { AnimatedDropdown } from '@/components/motion'

<AnimatedDropdown isOpen={isOpen} position="bottom">
  <Dropdown />
</AnimatedDropdown>
```

---

## Best Practices

1. **Use semantic motion** - Match animation style to user action
2. **Keep it subtle** - Motion enhances, doesn't distract
3. **Be consistent** - Use same patterns across the app
4. **Test on devices** - Verify performance on mobile
5. **Respect user preferences** - Always check `prefers-reduced-motion`
6. **Layer animations** - Combine entrance, hover, and exit
7. **Use spring physics** - More natural than easing curves
8. **Add depth cues** - Subtle rotation/scale for 3D feel

---

## Summary

All motion animations in the Lobbifigmademo project have been polished with:

✅ **Spring physics** for natural movement
✅ **Layout animations** for smooth position changes
✅ **Shared element transitions** via layoutId
✅ **Gesture support** (drag, swipe, pan)
✅ **Exit animations** for all conditional rendering
✅ **Accessibility** via reduced motion support
✅ **Micro-interactions** on cards and buttons
✅ **3D depth cues** with rotation hints

The motion system now provides a cohesive, polished experience across the entire application while maintaining excellent performance and accessibility.

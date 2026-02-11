# Motion Quick Reference Guide

Quick reference for using enhanced Framer Motion animations in Lobbifigmademo.

## Import Statements

```tsx
// Components
import {
  AnimatedPage,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  SharedElement,
  MotionList,
  MotionListItem,
  MotionModal,
  AnimatedPresenceWrapper,
  AnimatedDropdown,
} from '@/components/motion'

// Hooks
import {
  useButtonHoverAnimation,
  useCardHoverAnimation,
  usePageTransition,
  useStaggerAnimation,
  useScrollAnimation,
  useGestureAnimation,
  useSwipeToDismiss,
} from '@/hooks/motion'

// Direct from motion package
import { motion, AnimatePresence } from 'motion/react'
```

---

## Common Use Cases

### Page Transitions
```tsx
<AnimatedPage pageKey={pathname} layout>
  <PageContent />
</AnimatedPage>
```

### Card Hover Effects
```tsx
const cardAnim = useCardHoverAnimation()
<motion.div {...cardAnim}>
  <Card />
</motion.div>
```

### Button Interactions
```tsx
const btnAnim = useButtonHoverAnimation('primary')
<motion.button {...btnAnim}>
  Click Me
</motion.button>
```

### Staggered Lists
```tsx
<StaggerContainer staggerDelay={0.06}>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Item />
    </StaggerItem>
  ))}
</StaggerContainer>
```

### Scroll Animations
```tsx
<FadeIn direction="up" spring scale>
  <Section />
</FadeIn>
```

### Shared Elements
```tsx
// List view
<SharedElement layoutId="item-1">
  <Thumbnail />
</SharedElement>

// Detail view
<SharedElement layoutId="item-1">
  <FullImage />
</SharedElement>
```

### Modals
```tsx
<MotionModal isOpen={isOpen} onClose={close} variant="scale">
  <Content />
</MotionModal>
```

### Dropdowns/Menus
```tsx
<AnimatedDropdown isOpen={isOpen} position="bottom">
  <Menu />
</AnimatedDropdown>
```

### Drag & Drop
```tsx
const dragConfig = useGestureAnimation({
  dragX: true,
  dragY: true,
  constraints: { left: -100, right: 100, top: -100, bottom: 100 },
})
<motion.div {...dragConfig}>
  <DraggableItem />
</motion.div>
```

### Swipe to Dismiss
```tsx
const swipeConfig = useSwipeToDismiss(handleRemove, 100)
<motion.div {...swipeConfig}>
  <Notification />
</motion.div>
```

---

## Animation Presets

### Page Transitions
- `fade` - Simple opacity fade
- `slide` - Horizontal slide
- `scale` - Scale from center
- `morph` - Scale + border radius

### Scroll Reveals
- Direction: `up`, `down`, `left`, `right`, `none`
- Physics: Duration-based or spring
- Effects: Blur, scale, rotation

### Hover Animations
- Cards: Lift, scale, shadow, brightness
- Buttons: Lift, scale, shadow, filter, skew (on tap)

---

## Spring Physics Parameters

```tsx
// Snappy (buttons, quick interactions)
{ stiffness: 550, damping: 20, mass: 0.4 }

// Natural (cards, medium speed)
{ stiffness: 400, damping: 26, mass: 0.6 }

// Smooth (page transitions, slow)
{ stiffness: 280, damping: 28, mass: 0.8 }

// Bouncy (playful elements)
{ stiffness: 200, damping: 15, mass: 1.0 }
```

---

## Layout Animations

Enable smooth position/size changes:

```tsx
<motion.div layout layoutId="unique-id">
  <Content />
</motion.div>
```

Reordering lists:
```tsx
<MotionList layout="grid" columns={3}>
  {items.map(item => (
    <MotionListItem key={item.id} itemKey={item.id} layoutId={item.id}>
      <Card />
    </MotionListItem>
  ))}
</MotionList>
```

---

## Exit Animations

Always wrap conditional rendering:

```tsx
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Content />
    </motion.div>
  )}
</AnimatePresence>
```

Or use helpers:
```tsx
<AnimatedPresenceWrapper isVisible={isVisible} preset="scale">
  <Content />
</AnimatedPresenceWrapper>
```

---

## Reduced Motion Support

All hooks and components automatically respect `prefers-reduced-motion`. Animations gracefully degrade to simple fades or become instant when the user has reduced motion enabled in their OS settings.

---

## Performance Tips

1. **Animate transform & opacity only** (GPU-accelerated)
2. **Use layout animations** instead of animating width/height
3. **Add layoutId** for shared element transitions
4. **Avoid animating shadows** on low-end devices
5. **Use will-change sparingly** (only during animation)

---

## File Locations

**Components:** `src/components/motion/`
**Hooks:** `src/hooks/motion/`
**Documentation:** `MOTION_ENHANCEMENTS.md`

/**
 * GSAP Luxury Motion Library
 * 
 * Professional GSAP patterns for The Lobbi cinematic sequences.
 * Replaces generic easing with luxury-calibrated curves.
 */

import { gsap } from '../gsap-config';

// ============================================================================
// LUXURY EASING PRESETS
// ============================================================================

/**
 * Lobbi luxury easing curves (GSAP format)
 * NEVER use bounce/elastic - use back.out for subtle overshoot instead
 */
export const LUXURY_EASE = {
  /** Signature Lobbi easing - smooth with elegant deceleration */
  signature: 'power3.out',
  
  /** For SVG path drawing and ring animations */
  draw: 'power2.out',
  
  /** Cinematic camera movements */
  cinematic: 'power3.inOut',
  
  /** Ambient loops (glow pulse, subtle morphing) */
  ambient: 'sine.inOut',
  
  /** Text reveals with subtle overshoot */
  textReveal: 'back.out(1.35)',
  
  /** Button/CTA entrances */
  ctaEntrance: 'back.out(1.4)',
  
  /** Card staggered entrances */
  cardReveal: 'power3.out',
  
  /** Smooth exit transitions */
  exit: 'power2.in',
  
  /** Seamless continuous motion */
  loop: 'none',
} as const;

// ============================================================================
// LUXURY TIMING PRESETS
// ============================================================================

/**
 * Timing values calibrated for luxury brand perception
 */
export const LUXURY_TIMING = {
  /** Instant feedback (< 100ms feels immediate) */
  instant: 0.08,
  
  /** Quick UI transitions */
  quick: 0.35,
  
  /** Standard transitions */
  standard: 0.6,
  
  /** Elegant reveals */
  elegant: 0.9,
  
  /** Dramatic entrances */
  dramatic: 1.2,
  
  /** Cinematic sequences */
  cinematic: 2.0,
  
  /** Epic reveals (logo intros) */
  epic: 2.8,
} as const;

/**
 * Stagger delays for cascading animations
 */
export const LUXURY_STAGGER = {
  /** Tight stagger (characters) */
  tight: 0.03,
  
  /** Standard stagger (words, small items) */
  standard: 0.08,
  
  /** Comfortable stagger (cards, list items) */
  comfortable: 0.15,
  
  /** Dramatic stagger (hero sections) */
  dramatic: 0.25,
} as const;

// ============================================================================
// CINEMATIC TEXT REVEAL SEQUENCES
// ============================================================================

export interface TextRevealOptions {
  /** Target element or selector */
  target: gsap.TweenTarget;
  
  /** Split type */
  splitType: 'chars' | 'words' | 'lines';
  
  /** Animation style preset */
  style?: 'wave' | 'rise' | 'fade' | 'typewriter';
  
  /** Duration per element */
  duration?: number;
  
  /** Stagger between elements */
  stagger?: number;
  
  /** Delay before starting */
  delay?: number;
  
  /** Callback when complete */
  onComplete?: () => void;
}

/**
 * Professional text reveal animation presets
 * Replaces generic implementations with luxury-calibrated sequences
 */
export function createTextReveal(options: TextRevealOptions): gsap.core.Tween {
  const {
    target,
    splitType: _splitType,
    style = 'wave',
    duration = LUXURY_TIMING.standard,
    stagger = LUXURY_STAGGER.tight,
    delay = 0,
    onComplete,
  } = options;
  
  let fromVars: gsap.TweenVars;
  let toVars: gsap.TweenVars;
  
  switch (style) {
    case 'wave':
      // Signature Lobbi wave reveal - 3D perspective with overshoot
      fromVars = { opacity: 0, y: 32, rotateX: -60, transformPerspective: 600 };
      toVars = {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration,
        stagger: { each: stagger, from: 'start' },
        ease: LUXURY_EASE.textReveal,
      };
      break;
      
    case 'rise':
      // Smooth vertical rise with opacity
      fromVars = { opacity: 0, y: '100%' };
      toVars = {
        opacity: 1,
        y: '0%',
        duration,
        stagger: { each: stagger },
        ease: LUXURY_EASE.signature,
      };
      break;
      
    case 'fade':
      // Simple fade with subtle vertical motion
      fromVars = { opacity: 0, y: 12 };
      toVars = {
        opacity: 1,
        y: 0,
        duration,
        stagger: { each: stagger },
        ease: LUXURY_EASE.signature,
      };
      break;
      
    case 'typewriter':
      // Sequential reveal (no overshoot)
      fromVars = { opacity: 0, display: 'none' };
      toVars = {
        opacity: 1,
        display: 'inline-block',
        duration: LUXURY_TIMING.instant,
        stagger: { each: stagger * 1.5 },
        ease: LUXURY_EASE.loop,
      };
      break;
      
    default:
      fromVars = { opacity: 0 };
      toVars = {
        opacity: 1,
        duration,
        stagger: { each: stagger },
        ease: LUXURY_EASE.signature,
      };
  }
  
  return gsap.fromTo(target, fromVars, {
    ...toVars,
    delay,
    onComplete,
  });
}

// ============================================================================
// NUMBER COUNT-UP ANIMATION
// ============================================================================

export interface CountUpOptions {
  /** Element to update */
  target: HTMLElement;
  
  /** Starting number */
  start?: number;
  
  /** Target number */
  end: number;
  
  /** Duration in seconds */
  duration?: number;
  
  /** Delay before starting */
  delay?: number;
  
  /** Prefix (e.g., '$') */
  prefix?: string;
  
  /** Suffix (e.g., '%') */
  suffix?: string;
  
  /** Use comma separators */
  separator?: boolean;
  
  /** Decimal places */
  decimals?: number;
}

/**
 * Luxury number count-up animation
 * Professional formatting with proper easing
 */
export function createCountUp(options: CountUpOptions): gsap.core.Tween {
  const {
    target,
    start = 0,
    end,
    duration = LUXURY_TIMING.dramatic,
    delay = 0,
    prefix = '',
    suffix = '',
    separator = true,
    decimals = 0,
  } = options;
  
  const obj = { value: start };
  
  return gsap.to(obj, {
    value: end,
    duration,
    delay,
    ease: LUXURY_EASE.signature,
    onUpdate: () => {
      const formatted = separator
        ? obj.value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : obj.value.toFixed(decimals);
      target.textContent = `${prefix}${formatted}${suffix}`;
    },
  });
}

// ============================================================================
// SCROLL-DRIVEN PARALLAX
// ============================================================================

export interface ParallaxOptions {
  /** Element to animate */
  target: gsap.TweenTarget;
  
  /** ScrollTrigger element */
  trigger: gsap.DOMTarget;
  
  /** Vertical movement amount */
  yMovement?: number;
  
  /** Opacity fade amount (0-1) */
  opacityFade?: number;
  
  /** Smoothness (0-1, lower = smoother) */
  scrub?: number | boolean;
  
  /** Start position */
  start?: string;
  
  /** End position */
  end?: string;
}

/**
 * Luxury parallax scroll effect
 * Subtle, smooth, performant
 */
export function createParallax(options: ParallaxOptions): gsap.core.Tween {
  const {
    target,
    trigger,
    yMovement = 80,
    opacityFade = 0.4,
    scrub = 0.8,
    start = 'top top',
    end = 'bottom top',
  } = options;
  
  return gsap.to(target, {
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
    },
    y: yMovement,
    opacity: 1 - opacityFade,
    ease: LUXURY_EASE.loop,
  });
}

// ============================================================================
// CINEMATIC TIMELINE BUILDER
// ============================================================================

export interface CinematicTimelineOptions {
  /** Delay before timeline starts */
  delay?: number;
  
  /** Auto-play on creation */
  autoPlay?: boolean;
  
  /** Default easing for all tweens */
  defaultEase?: string;
  
  /** Called when timeline completes */
  onComplete?: () => void;
  
  /** Called on each frame update */
  onUpdate?: () => void;
}

/**
 * Create professional GSAP timeline with luxury defaults
 * Use this instead of raw gsap.timeline()
 */
export function createCinematicTimeline(
  options: CinematicTimelineOptions = {}
): gsap.core.Timeline {
  const {
    delay = 0,
    autoPlay = true,
    defaultEase = LUXURY_EASE.signature,
    onComplete,
    onUpdate,
  } = options;
  
  return gsap.timeline({
    paused: !autoPlay,
    delay,
    defaults: { ease: defaultEase },
    onComplete,
    onUpdate,
  });
}

// ============================================================================
// SVG PATH DRAWING
// ============================================================================

export interface PathDrawOptions {
  /** Path element to draw */
  target: SVGPathElement | SVGCircleElement;
  
  /** Draw duration */
  duration?: number;
  
  /** Delay before drawing */
  delay?: number;
  
  /** Direction: 'in' (reveal) or 'out' (hide) */
  direction?: 'in' | 'out';
  
  /** Callback when complete */
  onComplete?: () => void;
}

/**
 * Luxury SVG path drawing animation
 * For logo reveals, ring animations, signature lines
 */
export function createPathDraw(options: PathDrawOptions): gsap.core.Tween {
  const {
    target,
    duration = LUXURY_TIMING.epic,
    delay = 0,
    direction = 'in',
    onComplete,
  } = options;
  
  // Get total length
  const length = (target as SVGGeometryElement).getTotalLength?.() ?? 0;
  
  // Set up stroke-dasharray/offset
  target.style.strokeDasharray = `${length}`;
  target.style.strokeDashoffset = direction === 'in' ? `${length}` : '0';
  
  return gsap.to(target, {
    strokeDashoffset: direction === 'in' ? 0 : length,
    duration,
    delay,
    ease: LUXURY_EASE.draw,
    onComplete,
  });
}

// ============================================================================
// GLOW PULSE EFFECT
// ============================================================================

export interface GlowPulseOptions {
  /** Element to pulse */
  target: gsap.TweenTarget;
  
  /** RGB values for glow color (e.g., "212, 175, 55") */
  glowRgb: string;
  
  /** Pulse duration (full cycle) */
  duration?: number;
  
  /** Minimum glow intensity */
  minIntensity?: number;
  
  /** Maximum glow intensity */
  maxIntensity?: number;
  
  /** Repeat forever */
  repeat?: boolean;
}

/**
 * Luxury glow pulse animation
 * For CTAs, highlights, ambient effects
 */
export function createGlowPulse(options: GlowPulseOptions): gsap.core.Tween | gsap.core.Timeline {
  const {
    target,
    glowRgb,
    duration = 2.5,
    minIntensity = 0.15,
    maxIntensity = 0.4,
    repeat = true,
  } = options;
  
  const timeline = gsap.timeline({
    repeat: repeat ? -1 : 0,
    yoyo: true,
  });
  
  timeline.to(target, {
    boxShadow: `0 0 20px rgba(${glowRgb}, ${maxIntensity}), 0 0 40px rgba(${glowRgb}, ${minIntensity})`,
    duration: duration / 2,
    ease: LUXURY_EASE.ambient,
  });
  
  return timeline;
}

// ============================================================================
// UTILITY: CREATE CONTEXT-SCOPED ANIMATION
// ============================================================================

/**
 * Create GSAP context for automatic cleanup in React
 * 
 * @example
 * useEffect(() => {
 *   const ctx = createLuxuryContext(containerRef.current, (gsapContext) => {
 *     // Build animations here
 *     gsap.to('.element', { ... });
 *   });
 *   return () => ctx.revert();
 * }, []);
 */
export function createLuxuryContext(
  scope: HTMLElement | null,
  builder: (ctx: gsap.Context) => void
): gsap.Context {
  if (!scope) {
    // Return empty context if no scope
    return gsap.context(() => {}, undefined);
  }
  
  return gsap.context(builder, scope);
}

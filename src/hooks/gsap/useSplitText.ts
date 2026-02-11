import { useRef, useEffect } from 'react';
import { gsap, SplitText } from '../../lib/gsap-config';
import { LUXURY_EASE, LUXURY_TIMING, LUXURY_STAGGER } from '../../lib/motion/gsap-luxury';

type SplitType = 'chars' | 'words' | 'lines';

interface UseSplitTextOptions {
  /** What to split: 'chars', 'words', or 'lines' */
  type?: SplitType;
  /** Animation style */
  animation?: 'wave' | 'fade' | 'typewriter' | 'rise';
  /** Delay before animation starts */
  delay?: number;
  /** Duration per element */
  duration?: number;
  /** Stagger between elements */
  stagger?: number;
  /** Whether the hook is enabled */
  enabled?: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
}

/**
 * SplitText animation hook with luxury easing
 *
 * Splits text content of the ref element and animates
 * characters/words/lines with professional presets.
 */
export function useSplitText<T extends HTMLElement = HTMLDivElement>(
  options: UseSplitTextOptions = {},
) {
  const {
    type = 'chars',
    animation = 'wave',
    delay = 0,
    duration = LUXURY_TIMING.standard,
    stagger = LUXURY_STAGGER.tight,
    enabled = true,
    onComplete,
  } = options;

  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current || !enabled) return;

    const el = elementRef.current;

    // SplitText needs the element to be visible
    const split = new SplitText(el, { type: type as string });
    const targets = split[type] as Element[];

    if (!targets || targets.length === 0) {
      split.revert();
      return;
    }

    let fromVars: gsap.TweenVars;
    let toVars: gsap.TweenVars;

    switch (animation) {
      case 'wave':
        // Luxury wave reveal - 3D perspective with calibrated overshoot
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
      case 'fade':
        fromVars = { opacity: 0, y: 12 };
        toVars = {
          opacity: 1,
          y: 0,
          duration,
          stagger: { each: stagger, from: 'start' },
          ease: LUXURY_EASE.signature,
        };
        break;
      case 'typewriter':
        fromVars = { opacity: 0, display: 'none' };
        toVars = {
          opacity: 1,
          display: 'inline-block',
          duration: LUXURY_TIMING.instant,
          stagger: { each: stagger * 1.5 },
          ease: LUXURY_EASE.loop,
        };
        break;
      case 'rise':
        fromVars = { opacity: 0, y: '100%' };
        toVars = {
          opacity: 1,
          y: '0%',
          duration,
          stagger: { each: stagger },
          ease: LUXURY_EASE.signature,
        };
        break;
      default:
        fromVars = { opacity: 0 };
        toVars = { opacity: 1, duration, stagger: { each: stagger }, ease: LUXURY_EASE.signature };
    }

    const tween = gsap.fromTo(targets, fromVars, {
      ...toVars,
      delay,
      onComplete,
    });

    return () => {
      tween.kill();
      split.revert();
    };
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return elementRef;
}

import { useRef, useEffect } from 'react';
import { gsap, SplitText } from '../../lib/gsap-config';

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
 * SplitText animation hook.
 *
 * Splits text content of the ref element and animates
 * characters/words/lines with various presets.
 */
export function useSplitText<T extends HTMLElement = HTMLDivElement>(
  options: UseSplitTextOptions = {},
) {
  const {
    type = 'chars',
    animation = 'wave',
    delay = 0,
    duration = 0.6,
    stagger = 0.03,
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
        fromVars = { opacity: 0, y: 20, rotateX: -40 };
        toVars = {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration,
          stagger: { each: stagger, from: 'start' },
          ease: 'back.out(1.7)',
        };
        break;
      case 'fade':
        fromVars = { opacity: 0, y: 8 };
        toVars = {
          opacity: 1,
          y: 0,
          duration,
          stagger: { each: stagger, from: 'start' },
          ease: 'power2.out',
        };
        break;
      case 'typewriter':
        fromVars = { opacity: 0, display: 'none' };
        toVars = {
          opacity: 1,
          display: 'inline-block',
          duration: 0.01,
          stagger: { each: stagger * 2 },
          ease: 'none',
        };
        break;
      case 'rise':
        fromVars = { opacity: 0, y: '100%' };
        toVars = {
          opacity: 1,
          y: '0%',
          duration,
          stagger: { each: stagger },
          ease: 'power3.out',
        };
        break;
      default:
        fromVars = { opacity: 0 };
        toVars = { opacity: 1, duration, stagger: { each: stagger } };
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

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap-config';
import { LUXURY_EASE, LUXURY_TIMING } from '../../lib/motion/gsap-luxury';

interface UseGsapScrollTriggerOptions {
  /** GSAP animation vars applied to the element */
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  /** ScrollTrigger-specific config overrides */
  trigger?: ScrollTrigger.Vars;
  /** Duration in seconds */
  duration?: number;
  /** Whether the hook is enabled */
  enabled?: boolean;
}

/**
 * Luxury scroll-triggered animation hook.
 *
 * Attach the returned ref to the element you want to animate on scroll.
 * The element will animate from `from` to `to` when it enters the viewport.
 */
export function useGsapScrollTrigger<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapScrollTriggerOptions = {},
) {
  const {
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    trigger: triggerVars = {},
    duration = LUXURY_TIMING.elegant,
    enabled = true,
  } = options;

  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current || !enabled) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(elementRef.current!, from, {
        ...to,
        duration,
        ease: LUXURY_EASE.signature,
        scrollTrigger: {
          trigger: elementRef.current!,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
          ...triggerVars,
        },
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return elementRef;
}

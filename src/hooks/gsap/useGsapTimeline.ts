import { useRef, useEffect, useCallback } from 'react';
import { gsap } from '../../lib/gsap-config';
import { LUXURY_EASE } from '../../lib/motion/gsap-luxury';

interface UseGsapTimelineOptions {
  /** Delay before timeline starts (seconds) */
  delay?: number;
  /** Whether to auto-play on mount */
  autoPlay?: boolean;
  /** Defaults passed to gsap.timeline() */
  defaults?: gsap.TweenVars;
  /** Called when timeline completes */
  onComplete?: () => void;
}

/**
 * Reusable GSAP timeline hook with luxury defaults and automatic cleanup.
 *
 * Returns a ref to attach to the container element and the timeline instance
 * so callers can add tweens to it.
 */
export function useGsapTimeline<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapTimelineOptions = {},
) {
  const { delay = 0, autoPlay = true, defaults, onComplete } = options;
  const containerRef = useRef<T>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      paused: !autoPlay,
      delay,
      defaults: { ease: LUXURY_EASE.signature, ...defaults },
      onComplete,
    });

    tlRef.current = tl;

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, [delay, autoPlay, onComplete]); // eslint-disable-line react-hooks/exhaustive-deps

  const play = useCallback(() => tlRef.current?.play(), []);
  const pause = useCallback(() => tlRef.current?.pause(), []);
  const restart = useCallback(() => tlRef.current?.restart(), []);

  return { containerRef, timeline: tlRef, play, pause, restart };
}

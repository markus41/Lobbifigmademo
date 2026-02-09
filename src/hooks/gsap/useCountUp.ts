import { useRef, useEffect } from 'react';
import { gsap } from '../../lib/gsap-config';

interface UseCountUpOptions {
  /** Target number to count up to */
  end: number;
  /** Starting number */
  start?: number;
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
  /** Number of decimal places */
  decimals?: number;
  /** Whether the hook is enabled */
  enabled?: boolean;
}

/**
 * Number counter animation hook.
 *
 * Animates a number from `start` to `end` with formatting options.
 * Attach the returned ref to the element that displays the number.
 */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(
  options: UseCountUpOptions,
) {
  const {
    end,
    start = 0,
    duration = 1.5,
    delay = 0,
    prefix = '',
    suffix = '',
    separator = true,
    decimals = 0,
    enabled = true,
  } = options;

  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!elementRef.current || !enabled) return;

    const el = elementRef.current;
    const obj = { value: start };

    const tween = gsap.to(obj, {
      value: end,
      duration,
      delay,
      ease: 'power2.out',
      onUpdate: () => {
        const formatted = separator
          ? obj.value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          : obj.value.toFixed(decimals);
        el.textContent = `${prefix}${formatted}${suffix}`;
      },
    });

    return () => {
      tween.kill();
    };
  }, [end, enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  return elementRef;
}

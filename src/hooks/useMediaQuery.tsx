import { useState, useEffect } from 'react';

/**
 * Responsive breakpoint detection hook using matchMedia API.
 * Returns a boolean indicating whether the given media query matches.
 * Updates reactively on window resize or orientation change.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/** Mobile: up to 767px */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

/** Tablet: 768px to 1023px */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

/** Desktop: 1024px and above */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge class names
 * Note: With Tailwind removed, this now just uses clsx
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

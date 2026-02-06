/**
 * LobbiInput - Premium input component for The Lobbi
 *
 * Features:
 * - Themed focus ring with glow effect
 * - Uppercase labels with tracking
 * - Icon support (left/right)
 * - Error/success states
 */

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface LobbiInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'light' | 'dark';
}

export const LobbiInput = forwardRef<HTMLInputElement, LobbiInputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      variant = 'light',
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const variantStyles = {
      light: {
        wrapper: 'bg-cream-100 border-gray-200 focus-within:border-gold-400',
        input: 'text-gray-900 placeholder:text-gray-400',
        label: 'text-gold-700/60',
      },
      dark: {
        wrapper: 'bg-white/5 border-gold-400/15 focus-within:border-gold-400/40',
        input: 'text-cream-50 placeholder:text-cream-50/25',
        label: 'text-gold-400/60',
      },
    };

    const styles = variantStyles[variant];

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-[10px] font-medium uppercase tracking-[0.18em] mb-2',
              styles.label,
              error && 'text-red-500'
            )}
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div
          className={cn(
            'relative flex items-center',
            'rounded-lg border',
            'transition-all duration-300',
            'focus-within:ring-2 focus-within:ring-gold-400/20',
            'focus-within:shadow-[0_0_20px_rgba(var(--t-primary-rgb,212,175,55),0.08)]',
            styles.wrapper,
            error && 'border-red-400 focus-within:border-red-400 focus-within:ring-red-400/20'
          )}
        >
          {/* Left icon */}
          {leftIcon && (
            <span className="pl-3 text-gray-400">{leftIcon}</span>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-4 py-3',
              'bg-transparent',
              'text-[14px] font-medium',
              "font-['DM_Sans']",
              'outline-none border-0',
              'placeholder:font-normal',
              styles.input,
              leftIcon && 'pl-2',
              rightIcon && 'pr-2',
              className
            )}
            {...props}
          />

          {/* Right icon */}
          {rightIcon && (
            <span className="pr-3 text-gray-400">{rightIcon}</span>
          )}
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-1.5 text-[11px] text-red-500 font-medium">
            {error}
          </p>
        )}

        {/* Hint text */}
        {hint && !error && (
          <p className="mt-1.5 text-[11px] text-gray-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

LobbiInput.displayName = 'LobbiInput';

// Textarea variant
export interface LobbiTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  variant?: 'light' | 'dark';
}

export const LobbiTextarea = forwardRef<HTMLTextAreaElement, LobbiTextareaProps>(
  ({ label, error, hint, variant = 'light', className, id, ...props }, ref) => {
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    const variantStyles = {
      light: {
        wrapper: 'bg-cream-100 border-gray-200 focus-within:border-gold-400',
        input: 'text-gray-900 placeholder:text-gray-400',
        label: 'text-gold-700/60',
      },
      dark: {
        wrapper: 'bg-white/5 border-gold-400/15 focus-within:border-gold-400/40',
        input: 'text-cream-50 placeholder:text-cream-50/25',
        label: 'text-gold-400/60',
      },
    };

    const styles = variantStyles[variant];

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-[10px] font-medium uppercase tracking-[0.18em] mb-2',
              styles.label,
              error && 'text-red-500'
            )}
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3',
            'rounded-lg border',
            'text-[14px] font-medium',
            "font-['DM_Sans']",
            'outline-none',
            'transition-all duration-300',
            'focus:ring-2 focus:ring-gold-400/20',
            'focus:shadow-[0_0_20px_rgba(var(--t-primary-rgb,212,175,55),0.08)]',
            'resize-none',
            styles.wrapper,
            styles.input,
            error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
            className
          )}
          {...props}
        />

        {error && (
          <p className="mt-1.5 text-[11px] text-red-500 font-medium">{error}</p>
        )}

        {hint && !error && (
          <p className="mt-1.5 text-[11px] text-gray-500">{hint}</p>
        )}
      </div>
    );
  }
);

LobbiTextarea.displayName = 'LobbiTextarea';

export default LobbiInput;

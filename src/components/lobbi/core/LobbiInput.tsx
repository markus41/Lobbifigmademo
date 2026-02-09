/**
 * LobbiInput - Premium input component for The Lobbi
 * Migrated to Mantine v8 TextInput / Textarea with luxury aesthetic preserved.
 *
 * Features:
 * - Themed focus ring with glow effect
 * - Uppercase labels with tracking
 * - Icon support (left/right)
 * - Error/success states
 */

import { forwardRef, type ReactNode } from 'react';
import {
  TextInput,
  Textarea as MantineTextarea,
  type TextInputProps as MantineTextInputProps,
  type TextareaProps as MantineTextareaProps,
} from '@mantine/core';
import { cn } from '@/lib/utils';

export interface LobbiInputProps
  extends Omit<MantineTextInputProps, 'variant' | 'leftSection' | 'rightSection'> {
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'light' | 'dark';
}

const variantConfig = {
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
      ...props
    },
    ref
  ) => {
    const styles = variantConfig[variant];

    return (
      <TextInput
        ref={ref}
        label={label}
        error={error}
        description={!error ? hint : undefined}
        leftSection={leftIcon}
        rightSection={rightIcon}
        classNames={{
          root: 'w-full',
          label: cn(
            'block text-[10px] font-medium uppercase tracking-[0.18em] mb-2',
            styles.label,
            error && 'text-red-500'
          ),
          wrapper: cn(
            'rounded-lg border',
            'transition-all duration-300',
            'focus-within:ring-2 focus-within:ring-gold-400/20',
            'focus-within:shadow-[0_0_20px_rgba(var(--t-primary-rgb,212,175,55),0.08)]',
            styles.wrapper,
            error &&
              'border-red-400 focus-within:border-red-400 focus-within:ring-red-400/20'
          ),
          input: cn(
            'w-full px-4 py-3',
            'bg-transparent border-0',
            'text-[14px] font-medium',
            "font-['DM_Sans']",
            'outline-none',
            'placeholder:font-normal',
            styles.input,
            className
          ),
          error: 'mt-1.5 text-[11px] text-red-500 font-medium',
          description: 'mt-1.5 text-[11px] text-gray-500',
        }}
        styles={{
          input: {
            '--input-bd': 'none',
            '--input-bg': 'transparent',
          },
          wrapper: {
            '--input-bd': 'none',
          },
        }}
        {...props}
      />
    );
  }
);

LobbiInput.displayName = 'LobbiInput';

// Textarea variant
export interface LobbiTextareaProps
  extends Omit<MantineTextareaProps, 'variant'> {
  hint?: string;
  variant?: 'light' | 'dark';
}

export const LobbiTextarea = forwardRef<HTMLTextAreaElement, LobbiTextareaProps>(
  ({ label, error, hint, variant = 'light', className, ...props }, ref) => {
    const styles = variantConfig[variant];

    return (
      <MantineTextarea
        ref={ref}
        label={label}
        error={error}
        description={!error ? hint : undefined}
        autosize
        minRows={3}
        classNames={{
          root: 'w-full',
          label: cn(
            'block text-[10px] font-medium uppercase tracking-[0.18em] mb-2',
            styles.label,
            error && 'text-red-500'
          ),
          wrapper: cn(
            'rounded-lg border',
            'transition-all duration-300',
            'focus-within:ring-2 focus-within:ring-gold-400/20',
            'focus-within:shadow-[0_0_20px_rgba(var(--t-primary-rgb,212,175,55),0.08)]',
            styles.wrapper,
            error &&
              'border-red-400 focus-within:border-red-400 focus-within:ring-red-400/20'
          ),
          input: cn(
            'w-full px-4 py-3',
            'bg-transparent border-0',
            'text-[14px] font-medium',
            "font-['DM_Sans']",
            'outline-none resize-none',
            styles.wrapper,
            styles.input,
            error &&
              'border-red-400 focus:border-red-400 focus:ring-red-400/20',
            className
          ),
          error: 'mt-1.5 text-[11px] text-red-500 font-medium',
          description: 'mt-1.5 text-[11px] text-gray-500',
        }}
        styles={{
          input: {
            '--input-bd': 'none',
            '--input-bg': 'transparent',
          },
        }}
        {...props}
      />
    );
  }
);

LobbiTextarea.displayName = 'LobbiTextarea';

export default LobbiInput;

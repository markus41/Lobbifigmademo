/**
 * LobbiButton - Premium button component for The Lobbi
 *
 * Variants:
 * - primary: Gradient fill with shimmer hover effect (Concierge/AI actions)
 * - secondary: White bg with themed border
 * - ghost: No border, themed text
 * - icon: Square icon-only button
 */

import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LobbiButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

const variantStyles = {
  primary: `
    bg-gradient-to-r from-gold-200 via-gold-400 to-gold-700
    text-white font-semibold
    border-0
    hover:shadow-gold
    relative overflow-hidden
  `,
  secondary: `
    bg-white
    text-gray-900
    border border-[var(--t-primary,#D4AF37)]/40
    hover:bg-[var(--t-primary,#D4AF37)]/5
    hover:border-[var(--t-primary,#D4AF37)]
  `,
  ghost: `
    bg-transparent
    text-[var(--t-primary,#D4AF37)]
    border-0
    hover:bg-[var(--t-primary,#D4AF37)]/5
  `,
  icon: `
    bg-white
    text-gray-600
    border border-gray-200
    hover:border-[var(--t-primary,#D4AF37)]/40
    hover:text-[var(--t-primary,#D4AF37)]
    p-0
  `,
  danger: `
    bg-white
    text-red-600
    border border-red-200
    hover:bg-red-50
    hover:border-red-300
  `,
};

const sizeStyles = {
  sm: 'h-8 px-4 text-[11px]',
  md: 'h-10 px-6 text-[13px]',
  lg: 'h-12 px-8 text-[14px]',
};

const iconSizeStyles = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

export const LobbiButton = forwardRef<HTMLButtonElement, LobbiButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const isIconOnly = variant === 'icon';

    return (
      <motion.button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2',
          'rounded-lg font-medium',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-[var(--t-primary,#D4AF37)]/30',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          "tracking-[0.06em] uppercase font-['DM_Sans']",
          // Variant styles
          variantStyles[variant],
          // Size styles
          isIconOnly ? iconSizeStyles[size] : sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        whileHover={!disabled && !isLoading ? { y: -1, scale: 1.01 } : undefined}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        {...(props as HTMLMotionProps<"button">)}
      >
        {/* Primary variant shimmer effect */}
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        )}

        {/* Loading spinner */}
        {isLoading && (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}

        {/* Left icon */}
        {!isLoading && leftIcon && (
          <span className="flex-shrink-0">{leftIcon}</span>
        )}

        {/* Content */}
        {!isLoading && children && (
          <span className="relative z-10">{children}</span>
        )}

        {/* Right icon */}
        {!isLoading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

LobbiButton.displayName = 'LobbiButton';

export default LobbiButton;

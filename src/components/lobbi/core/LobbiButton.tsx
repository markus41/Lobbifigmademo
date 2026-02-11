/**
 * LobbiButton - Premium button component for The Lobbi
 * Migrated to Mantine v8 primitives with luxury aesthetic preserved.
 *
 * Variants:
 * - primary: Gradient fill with shimmer hover effect (Concierge/AI actions)
 * - secondary: White bg with themed border
 * - ghost: No border, themed text
 * - icon: Square icon-only button
 * - danger: Red-toned destructive action
 */

import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from 'react';
import {
  Button,
  Loader,
  createPolymorphicComponent,
  type ButtonProps,
} from '@mantine/core';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface LobbiButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'color'
  > {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

// Mantine Button variant → style mapping
const mantineVariantMap: Record<string, ButtonProps['variant']> = {
  primary: 'filled',
  secondary: 'outline',
  ghost: 'subtle',
  icon: 'default',
  danger: 'outline',
};

const sizeMap: Record<string, ButtonProps['size']> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

const variantStyles: Record<string, string> = {
  primary: `
    [--button-bg:transparent]
    bg-gradient-to-r from-gold-200 via-gold-400 to-gold-700
    text-white font-semibold
    border-0 relative overflow-hidden
    hover:shadow-[0_4px_20px_rgba(212,175,55,0.15)]
  `,
  secondary: `
    bg-white
    text-gray-900
    border border-[var(--t-primary,#D4AF37)]/40
    hover:bg-[var(--t-primary,#D4AF37)]/5
    hover:border-[var(--t-primary,#D4AF37)]
    [--button-bg:white] [--button-hover:transparent]
  `,
  ghost: `
    bg-transparent
    text-[var(--t-primary,#D4AF37)]
    border-0
    hover:bg-[var(--t-primary,#D4AF37)]/5
    [--button-bg:transparent] [--button-hover:transparent]
  `,
  icon: `
    bg-white
    text-gray-600
    border border-gray-200
    hover:border-[var(--t-primary,#D4AF37)]/40
    hover:text-[var(--t-primary,#D4AF37)]
    p-0
    [--button-bg:white] [--button-hover:transparent]
  `,
  danger: `
    bg-white
    text-red-600
    border border-red-200
    hover:bg-red-50
    hover:border-red-300
    [--button-bg:white] [--button-hover:transparent]
  `,
};

const sizeStyles: Record<string, string> = {
  sm: 'h-8 px-4 text-[11px]',
  md: 'h-10 px-6 text-[13px]',
  lg: 'h-12 px-8 text-[14px]',
};

const iconSizeStyles: Record<string, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

const _LobbiButton = forwardRef<HTMLButtonElement, LobbiButtonProps>(
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
      <Button
        ref={ref}
        component={motion.button as any}
        variant={mantineVariantMap[variant]}
        size={sizeMap[size]}
        loading={isLoading}
        disabled={disabled || isLoading}
        leftSection={!isLoading && leftIcon ? leftIcon : undefined}
        rightSection={!isLoading && rightIcon ? rightIcon : undefined}
        loader={<Loader size="xs" color="white" type="dots" />}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'rounded-lg font-medium',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-[var(--t-primary,#D4AF37)]/30',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          "tracking-[0.06em] uppercase font-['DM_Sans']",
          variantStyles[variant],
          isIconOnly ? iconSizeStyles[size] : sizeStyles[size],
          className
        )}
        styles={{
          root: {
            '--button-bd': 'none',
          },
          inner: {
            gap: '8px',
          },
          label: {
            position: 'relative',
            zIndex: 10,
          },
        }}
        // Enhanced micro-interactions with spring physics
        whileHover={
          !disabled && !isLoading
            ? {
                y: -3,
                scale: variant === 'primary' ? 1.05 : 1.03,
                boxShadow:
                  variant === 'primary'
                    ? '0 10px 28px rgba(0,0,0,0.18), 0 5px 14px rgba(0,0,0,0.12)'
                    : '0 6px 20px rgba(0,0,0,0.12)',
                filter: variant === 'primary' ? 'brightness(1.1) saturate(1.15)' : 'brightness(1.03)',
              }
            : undefined
        }
        whileTap={
          !disabled && !isLoading
            ? {
                y: 0,
                scale: 0.96,
                skewX: -0.5,
                filter: 'brightness(0.95)',
              }
            : undefined
        }
        whileFocus={
          !disabled
            ? {
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.4)',
              }
            : undefined
        }
        transition={{
          type: 'spring',
          stiffness: 550,
          damping: 20,
          mass: 0.4,
        }}
        {...props}
      >
        {/* Primary variant shimmer effect */}
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        )}
        {children}
      </Button>
    );
  }
);

_LobbiButton.displayName = 'LobbiButton';

export const LobbiButton = createPolymorphicComponent<'button', LobbiButtonProps>(
  _LobbiButton
);

export default LobbiButton;

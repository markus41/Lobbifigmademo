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

// Mantine Button variant -> style mapping
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

function getVariantInlineStyle(variant: string): React.CSSProperties {
  switch (variant) {
    case 'primary':
      return {
        background: 'var(--theme-gradient-btn, linear-gradient(to right, #e2c76b, #D4AF37, #8B7330))',
        color: 'var(--theme-text-inverse, #fff)',
        border: 'none',
      };
    case 'secondary':
      return {
        background: 'var(--theme-bg-card, #fff)',
        color: 'var(--theme-text-primary, #111827)',
        borderColor: 'rgba(var(--theme-primary-rgb, 212,175,55), 0.4)',
        borderWidth: 1,
        borderStyle: 'var(--theme-border-style, solid)',
      };
    case 'ghost':
      return {
        background: 'transparent',
        color: 'var(--theme-primary, #D4AF37)',
        border: 'none',
      };
    case 'icon':
      return {
        background: 'var(--theme-bg-card, #fff)',
        color: 'var(--theme-text-secondary, #4b5563)',
        borderColor: 'var(--theme-border-light, #e5e7eb)',
        borderWidth: 1,
        borderStyle: 'var(--theme-border-style, solid)',
      };
    case 'danger':
      return {
        background: 'var(--theme-bg-card, #fff)',
        color: '#dc2626',
        borderColor: '#fecaca',
        borderWidth: 1,
        borderStyle: 'var(--theme-border-style, solid)',
      };
    default:
      return {};
  }
}

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
      style,
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
          'disabled:opacity-50 disabled:cursor-not-allowed',
          "tracking-[0.06em] uppercase",
          'relative overflow-hidden',
          isIconOnly ? iconSizeStyles[size] : sizeStyles[size],
          className
        )}
        style={{
          ...getVariantInlineStyle(variant),
          fontFamily: 'var(--theme-font-display, "DM Sans", sans-serif)',
          transition: `all var(--theme-transition-duration, 200ms) ease`,
          ...style,
        }}
        styles={{
          root: {
            '--button-bd': 'none',
            '--button-bg': 'transparent',
            '--button-hover': 'transparent',
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
                    ? 'var(--theme-shadow-lg, 0 10px 28px rgba(0,0,0,0.18), 0 5px 14px rgba(0,0,0,0.12))'
                    : 'var(--theme-shadow-md, 0 6px 20px rgba(0,0,0,0.12))',
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
                boxShadow: '0 0 0 3px rgba(var(--theme-primary-rgb, 212,175,55), 0.4)',
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
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)',
            }}
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

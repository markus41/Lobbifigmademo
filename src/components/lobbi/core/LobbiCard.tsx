/**
 * LobbiCard - Premium card component for The Lobbi
 * Migrated to Mantine v8 Card primitive with luxury aesthetic preserved.
 *
 * Features:
 * - Themed gradient top bar (KPI cards)
 * - Hover lift animation
 * - Art deco corner ornaments (optional)
 * - Glass morphism variant
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import {
  Card,
  Group,
  Text,
  type CardProps,
} from '@mantine/core';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface LobbiCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'kpi' | 'glass' | 'elevated';
  hasTopBar?: boolean;
  topBarColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
  hasOrnaments?: boolean;
  isHoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

const paddingMap: Record<string, CardProps['padding']> = {
  none: 0,
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

export const LobbiCard = forwardRef<HTMLDivElement, LobbiCardProps>(
  (
    {
      variant = 'default',
      hasTopBar = false,
      topBarColor = 'primary',
      hasOrnaments = false,
      isHoverable = true,
      padding = 'md',
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const variantInlineStyles: Record<string, React.CSSProperties> = {
      default: {
        background: 'var(--theme-bg-card, #fff)',
        borderColor: 'var(--theme-border-light, #e5e7eb)',
        borderWidth: 1,
        borderStyle: 'var(--theme-border-style, solid)',
      },
      kpi: {
        background: 'var(--theme-bg-card, #fff)',
        borderColor: 'var(--theme-border-light, #e5e7eb)',
        borderWidth: 1,
        borderStyle: 'var(--theme-border-style, solid)',
      },
      glass: {
        background: 'var(--theme-glass-bg, rgba(255,255,255,0.8))',
        backdropFilter: 'var(--theme-glass-blur, blur(8px))',
        WebkitBackdropFilter: 'var(--theme-glass-blur, blur(8px))',
        borderColor: 'var(--theme-glass-border, rgba(255,255,255,0.2))',
        borderWidth: 1,
        borderStyle: 'var(--theme-border-style, solid)',
      },
      elevated: {
        background: 'var(--theme-bg-card, #fff)',
        boxShadow: 'var(--theme-shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.1))',
        borderColor: 'var(--theme-border-light, #f3f4f6)',
        borderWidth: 1,
        borderStyle: 'var(--theme-border-style, solid)',
      },
    };

    const topBarInlineStyles: Record<string, React.CSSProperties> = {
      primary: { background: 'var(--theme-gradient-btn, linear-gradient(to right, #e2c76b, #D4AF37, #8B7330))' },
      secondary: { background: 'var(--theme-secondary, linear-gradient(to right, #d1d5db, #9ca3af))' },
      success: { background: 'linear-gradient(to right, #34d399, #059669)' },
      warning: { background: 'linear-gradient(to right, #fbbf24, #d97706)' },
      info: { background: 'linear-gradient(to right, #38bdf8, #0284c7)' },
    };

    return (
      <Card
        ref={ref}
        component={motion.div as any}
        padding={paddingMap[padding]}
        radius="md"
        className={cn('relative overflow-hidden', className)}
        styles={{
          root: {
            '--card-bg': 'transparent',
            transformStyle: 'preserve-3d',
            perspective: '1200px',
          },
        }}
        style={{
          ...variantInlineStyles[variant],
          ...style,
        }}
        // Enhanced entrance animation with spring physics
        initial={{ opacity: 0, y: 16, scale: 0.96, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 26,
          mass: 0.7,
        }}
        // Polished hover/tap micro-interactions
        whileHover={
          isHoverable
            ? {
                y: -8,
                scale: 1.02,
                rotateX: 1,
                boxShadow: 'var(--theme-shadow-xl, 0 28px 56px rgba(0,0,0,0.14), 0 14px 28px rgba(0,0,0,0.1))',
                filter: 'brightness(1.03)',
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                  mass: 0.5,
                },
              }
            : undefined
        }
        whileTap={
          isHoverable
            ? {
                y: -3,
                scale: 0.99,
                rotateX: 0.5,
                boxShadow: 'var(--theme-shadow-md, 0 10px 20px rgba(0,0,0,0.12))',
                transition: {
                  type: 'spring',
                  stiffness: 500,
                  damping: 20,
                },
              }
            : undefined
        }
        // Enable layout animations for smooth position changes
        layout
        {...props}
      >
        {/* KPI Top Bar */}
        {(hasTopBar || variant === 'kpi') && (
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={topBarInlineStyles[topBarColor]}
          />
        )}

        {/* Art Deco Corner Ornaments */}
        {hasOrnaments && (
          <>
            <svg
              className="absolute top-3 left-3 w-6 h-6"
              style={{ color: 'rgba(var(--theme-primary-rgb, 212,175,55), 0.2)' }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M0,0 L10,0 L10,1 L1,1 L1,10 L0,10 Z" />
              <path d="M3,3 L7,3 L7,4 L4,4 L4,7 L3,7 Z" />
            </svg>
            <svg
              className="absolute top-3 right-3 w-6 h-6"
              style={{ color: 'rgba(var(--theme-primary-rgb, 212,175,55), 0.2)' }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24,0 L14,0 L14,1 L23,1 L23,10 L24,10 Z" />
              <path d="M21,3 L17,3 L17,4 L20,4 L20,7 L21,7 Z" />
            </svg>
            <svg
              className="absolute bottom-3 left-3 w-6 h-6"
              style={{ color: 'rgba(var(--theme-primary-rgb, 212,175,55), 0.2)' }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M0,24 L10,24 L10,23 L1,23 L1,14 L0,14 Z" />
              <path d="M3,21 L7,21 L7,20 L4,20 L4,17 L3,17 Z" />
            </svg>
            <svg
              className="absolute bottom-3 right-3 w-6 h-6"
              style={{ color: 'rgba(var(--theme-primary-rgb, 212,175,55), 0.2)' }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24,24 L14,24 L14,23 L23,23 L23,14 L24,14 Z" />
              <path d="M21,21 L17,21 L17,20 L20,20 L20,17 L21,17 Z" />
            </svg>
          </>
        )}

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </Card>
    );
  }
);

LobbiCard.displayName = 'LobbiCard';

// Sub-components for card structure
export const LobbiCardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Group
    ref={ref}
    justify="space-between"
    align="flex-start"
    className={cn('mb-4', className)}
    wrap="nowrap"
    {...props}
  />
));
LobbiCardHeader.displayName = 'LobbiCardHeader';

export const LobbiCardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    component="h3"
    size="sm"
    fw={600}
    className={cn('text-[15px]', className)}
    style={{
      color: 'var(--theme-text-primary, #1a1a2e)',
      fontFamily: 'var(--theme-font-display, "DM Sans", sans-serif)',
    }}
    {...props}
  />
));
LobbiCardTitle.displayName = 'LobbiCardTitle';

export const LobbiCardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    component="p"
    size="xs"
    mt={4}
    className={cn('text-[13px]', className)}
    style={{ color: 'var(--theme-text-muted, #6b7280)' }}
    {...props}
  />
));
LobbiCardDescription.displayName = 'LobbiCardDescription';

export const LobbiCardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));
LobbiCardContent.displayName = 'LobbiCardContent';

export const LobbiCardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <Group
    ref={ref}
    gap="sm"
    className={cn('mt-4 pt-4', className)}
    style={{
      borderTop: '1px solid var(--theme-border-light, #f3f4f6)',
      ...style,
    }}
    {...props}
  />
));
LobbiCardFooter.displayName = 'LobbiCardFooter';

export default LobbiCard;

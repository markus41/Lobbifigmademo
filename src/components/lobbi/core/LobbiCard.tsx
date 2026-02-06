/**
 * LobbiCard - Premium card component for The Lobbi
 *
 * Features:
 * - Themed gradient top bar (KPI cards)
 * - Hover lift animation
 * - Art deco corner ornaments (optional)
 * - Glass morphism variant
 */

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
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

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

const topBarColors = {
  primary: 'bg-gradient-to-r from-gold-200 via-gold-400 to-gold-700',
  secondary: 'bg-gradient-to-r from-gray-300 to-gray-400',
  success: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
  warning: 'bg-gradient-to-r from-amber-400 to-amber-600',
  info: 'bg-gradient-to-r from-sky-400 to-sky-600',
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
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'relative rounded-xl overflow-hidden',
      'transition-all duration-200',
      paddingStyles[padding]
    );

    const variantStyles = {
      default: 'bg-white border border-gray-200',
      kpi: 'bg-white border border-gray-200',
      glass: 'bg-white/80 backdrop-blur-sm border border-white/20',
      elevated: 'bg-white shadow-lg border border-gray-100',
    };

    const hoverStyles = isHoverable
      ? 'hover:shadow-cardHover hover:-translate-y-0.5'
      : '';

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], hoverStyles, className)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        {...props}
      >
        {/* KPI Top Bar */}
        {(hasTopBar || variant === 'kpi') && (
          <div
            className={cn(
              'absolute top-0 left-0 right-0 h-[3px]',
              topBarColors[topBarColor]
            )}
          />
        )}

        {/* Art Deco Corner Ornaments */}
        {hasOrnaments && (
          <>
            {/* Top Left */}
            <svg
              className="absolute top-3 left-3 w-6 h-6 text-gold-400/20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M0,0 L10,0 L10,1 L1,1 L1,10 L0,10 Z" />
              <path d="M3,3 L7,3 L7,4 L4,4 L4,7 L3,7 Z" />
            </svg>
            {/* Top Right */}
            <svg
              className="absolute top-3 right-3 w-6 h-6 text-gold-400/20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24,0 L14,0 L14,1 L23,1 L23,10 L24,10 Z" />
              <path d="M21,3 L17,3 L17,4 L20,4 L20,7 L21,7 Z" />
            </svg>
            {/* Bottom Left */}
            <svg
              className="absolute bottom-3 left-3 w-6 h-6 text-gold-400/20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M0,24 L10,24 L10,23 L1,23 L1,14 L0,14 Z" />
              <path d="M3,21 L7,21 L7,20 L4,20 L4,17 L3,17 Z" />
            </svg>
            {/* Bottom Right */}
            <svg
              className="absolute bottom-3 right-3 w-6 h-6 text-gold-400/20"
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
      </motion.div>
    );
  }
);

LobbiCard.displayName = 'LobbiCard';

// Sub-components for card structure
export const LobbiCardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-start justify-between mb-4', className)}
    {...props}
  />
));
LobbiCardHeader.displayName = 'LobbiCardHeader';

export const LobbiCardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-[15px] font-semibold text-gray-900 font-['DM_Sans']",
      className
    )}
    {...props}
  />
));
LobbiCardTitle.displayName = 'LobbiCardTitle';

export const LobbiCardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-[13px] text-gray-600 mt-1', className)}
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
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center gap-2 mt-4 pt-4 border-t border-gray-100', className)}
    {...props}
  />
));
LobbiCardFooter.displayName = 'LobbiCardFooter';

export default LobbiCard;

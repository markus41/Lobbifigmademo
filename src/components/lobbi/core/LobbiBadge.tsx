/**
 * LobbiBadge - Premium badge/pill component for The Lobbi
 * Migrated to Mantine v8 Badge primitive with luxury aesthetic preserved.
 *
 * Features:
 * - Themed variants matching org colors
 * - Status badges (success, warning, error)
 * - KPI change indicators (+/-)
 * - Pill and tag styles
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Badge, type BadgeProps } from '@mantine/core';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LobbiBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

const variantStyles: Record<string, string> = {
  default: 'bg-gray-100 text-gray-700 border-gray-200',
  primary: 'bg-gold-400/10 text-gold-700 border-gold-400/20',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  error: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-sky-50 text-sky-700 border-sky-200',
  outline: 'bg-transparent text-gray-600 border-gray-300',
};

const sizeStyles: Record<string, string> = {
  sm: 'text-[9px] px-2 py-0.5',
  md: 'text-[10px] px-2.5 py-1',
  lg: 'text-[11px] px-3 py-1.5',
};

const mantineSizeMap: Record<string, BadgeProps['size']> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
};

export const LobbiBadge = forwardRef<HTMLSpanElement, LobbiBadgeProps>(
  (
    { variant = 'default', size = 'md', children, className, ...props },
    ref
  ) => {
    return (
      <Badge
        ref={ref as any}
        component="span"
        variant="light"
        size={mantineSizeMap[size]}
        radius="xl"
        className={cn(
          'inline-flex items-center gap-1',
          'rounded-full border',
          'font-medium uppercase tracking-[0.06em]',
          "font-['DM_Sans']",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        styles={{
          root: {
            '--badge-bg': 'transparent',
            '--badge-color': 'inherit',
            '--badge-bd': 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            fontFamily: "'DM Sans', sans-serif",
          },
          label: {
            textTransform: 'uppercase',
          },
        }}
        {...(props as any)}
      >
        {children}
      </Badge>
    );
  }
);

LobbiBadge.displayName = 'LobbiBadge';

// KPI Change Badge - for showing positive/negative changes
export interface LobbiKPIBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  value: number;
  suffix?: string;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const LobbiKPIBadge = forwardRef<HTMLSpanElement, LobbiKPIBadgeProps>(
  (
    {
      value,
      suffix = '',
      showIcon = true,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const isPositive = value > 0;
    const isNegative = value < 0;
    const isNeutral = value === 0;

    const Icon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

    return (
      <Badge
        ref={ref as any}
        component="span"
        variant="light"
        size={mantineSizeMap[size]}
        radius="xl"
        leftSection={showIcon ? <Icon className="w-3 h-3" /> : undefined}
        className={cn(
          'inline-flex items-center gap-1',
          'rounded-full',
          'font-semibold',
          "font-['DM_Sans']",
          sizeStyles[size],
          isPositive && 'bg-emerald-50 text-emerald-600',
          isNegative && 'bg-red-50 text-red-600',
          isNeutral && 'bg-gray-100 text-gray-600',
          className
        )}
        styles={{
          root: {
            '--badge-bg': 'transparent',
            '--badge-color': 'inherit',
            '--badge-bd': 'none',
          },
        }}
        {...(props as any)}
      >
        {isPositive && '+'}
        {value}
        {suffix}
      </Badge>
    );
  }
);

LobbiKPIBadge.displayName = 'LobbiKPIBadge';

// Status Badge - for member status, approval status, etc.
export interface LobbiStatusBadgeProps
  extends HTMLAttributes<HTMLSpanElement> {
  status:
    | 'active'
    | 'inactive'
    | 'pending'
    | 'approved'
    | 'rejected'
    | 'expired';
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

const statusConfig: Record<
  string,
  { label: string; color: string; dot: string }
> = {
  active: {
    label: 'Active',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  inactive: {
    label: 'Inactive',
    color: 'bg-gray-100 text-gray-600 border-gray-200',
    dot: 'bg-gray-400',
  },
  pending: {
    label: 'Pending',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    dot: 'bg-amber-500',
  },
  approved: {
    label: 'Approved',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dot: 'bg-emerald-500',
  },
  rejected: {
    label: 'Rejected',
    color: 'bg-red-50 text-red-700 border-red-200',
    dot: 'bg-red-500',
  },
  expired: {
    label: 'Expired',
    color: 'bg-gray-100 text-gray-600 border-gray-200',
    dot: 'bg-gray-400',
  },
};

export const LobbiStatusBadge = forwardRef<
  HTMLSpanElement,
  LobbiStatusBadgeProps
>(({ status, size = 'md', showDot = true, className, ...props }, ref) => {
  const config = statusConfig[status];

  return (
    <Badge
      ref={ref as any}
      component="span"
      variant="light"
      size={mantineSizeMap[size]}
      radius="xl"
      leftSection={
        showDot ? (
          <span className={cn('w-1.5 h-1.5 rounded-full', config.dot)} />
        ) : undefined
      }
      className={cn(
        'inline-flex items-center gap-1.5',
        'rounded-full border',
        'font-medium uppercase tracking-[0.06em]',
        "font-['DM_Sans']",
        config.color,
        sizeStyles[size],
        className
      )}
      styles={{
        root: {
          '--badge-bg': 'transparent',
          '--badge-color': 'inherit',
          '--badge-bd': 'none',
          textTransform: 'uppercase',
        },
      }}
      {...(props as any)}
    >
      {config.label}
    </Badge>
  );
});

LobbiStatusBadge.displayName = 'LobbiStatusBadge';

// Membership Type Badge
export interface LobbiMembershipBadgeProps
  extends HTMLAttributes<HTMLSpanElement> {
  type: 'gold' | 'silver' | 'bronze' | 'platinum' | 'standard';
  size?: 'sm' | 'md' | 'lg';
}

const membershipConfig: Record<string, { label: string; color: string }> = {
  platinum: {
    label: 'Platinum',
    color: 'bg-slate-100 text-slate-700 border-slate-300',
  },
  gold: {
    label: 'Gold',
    color: 'bg-gold-400/10 text-gold-700 border-gold-400/30',
  },
  silver: {
    label: 'Silver',
    color: 'bg-gray-100 text-gray-600 border-gray-300',
  },
  bronze: {
    label: 'Bronze',
    color: 'bg-amber-100/50 text-amber-700 border-amber-300',
  },
  standard: {
    label: 'Standard',
    color: 'bg-gray-50 text-gray-600 border-gray-200',
  },
};

export const LobbiMembershipBadge = forwardRef<
  HTMLSpanElement,
  LobbiMembershipBadgeProps
>(({ type, size = 'md', className, ...props }, ref) => {
  const config = membershipConfig[type];

  return (
    <Badge
      ref={ref as any}
      component="span"
      variant="light"
      size={mantineSizeMap[size]}
      radius="xl"
      className={cn(
        'inline-flex items-center',
        'rounded-full border',
        'font-semibold uppercase tracking-[0.08em]',
        "font-['DM_Sans']",
        config.color,
        sizeStyles[size],
        className
      )}
      styles={{
        root: {
          '--badge-bg': 'transparent',
          '--badge-color': 'inherit',
          '--badge-bd': 'none',
          textTransform: 'uppercase',
        },
      }}
      {...(props as any)}
    >
      {config.label}
    </Badge>
  );
});

LobbiMembershipBadge.displayName = 'LobbiMembershipBadge';

export default LobbiBadge;

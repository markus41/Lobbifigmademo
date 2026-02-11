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

function getVariantInlineStyle(variant: string): React.CSSProperties {
  switch (variant) {
    case 'default':
      return {
        background: 'var(--theme-bg-muted, #f3f4f6)',
        color: 'var(--theme-text-secondary, #374151)',
        borderColor: 'var(--theme-border-light, #e5e7eb)',
      };
    case 'primary':
      return {
        background: 'rgba(var(--theme-primary-rgb, 212,175,55), 0.1)',
        color: 'var(--theme-primary-dark, #8B7330)',
        borderColor: 'rgba(var(--theme-primary-rgb, 212,175,55), 0.2)',
      };
    case 'success':
      return {
        background: '#ecfdf5',
        color: '#047857',
        borderColor: '#a7f3d0',
      };
    case 'warning':
      return {
        background: '#fffbeb',
        color: '#b45309',
        borderColor: '#fde68a',
      };
    case 'error':
      return {
        background: '#fef2f2',
        color: '#b91c1c',
        borderColor: '#fecaca',
      };
    case 'info':
      return {
        background: '#f0f9ff',
        color: '#0369a1',
        borderColor: '#bae6fd',
      };
    case 'outline':
      return {
        background: 'transparent',
        color: 'var(--theme-text-secondary, #4b5563)',
        borderColor: 'var(--theme-border, #d1d5db)',
      };
    default:
      return {};
  }
}

export const LobbiBadge = forwardRef<HTMLSpanElement, LobbiBadgeProps>(
  (
    { variant = 'default', size = 'md', children, className, style, ...props },
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
          sizeStyles[size],
          className
        )}
        style={{
          ...getVariantInlineStyle(variant),
          fontFamily: 'var(--theme-font-display, "DM Sans", sans-serif)',
          ...style,
        }}
        styles={{
          root: {
            '--badge-bg': 'transparent',
            '--badge-color': 'inherit',
            '--badge-bd': 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
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
      style,
      ...props
    },
    ref
  ) => {
    const isPositive = value > 0;
    const isNegative = value < 0;

    const Icon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

    const kpiStyle: React.CSSProperties = isPositive
      ? { background: '#ecfdf5', color: '#059669' }
      : isNegative
        ? { background: '#fef2f2', color: '#dc2626' }
        : { background: 'var(--theme-bg-muted, #f3f4f6)', color: 'var(--theme-text-secondary, #4b5563)' };

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
          sizeStyles[size],
          className
        )}
        style={{
          ...kpiStyle,
          fontFamily: 'var(--theme-font-display, "DM Sans", sans-serif)',
          ...style,
        }}
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
  { label: string; style: React.CSSProperties; dotColor: string }
> = {
  active: {
    label: 'Active',
    style: { background: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' },
    dotColor: '#10b981',
  },
  inactive: {
    label: 'Inactive',
    style: { background: 'var(--theme-bg-muted, #f3f4f6)', color: 'var(--theme-text-secondary, #4b5563)', borderColor: 'var(--theme-border-light, #e5e7eb)' },
    dotColor: 'var(--theme-text-muted, #9ca3af)',
  },
  pending: {
    label: 'Pending',
    style: { background: '#fffbeb', color: '#b45309', borderColor: '#fde68a' },
    dotColor: '#f59e0b',
  },
  approved: {
    label: 'Approved',
    style: { background: '#ecfdf5', color: '#047857', borderColor: '#a7f3d0' },
    dotColor: '#10b981',
  },
  rejected: {
    label: 'Rejected',
    style: { background: '#fef2f2', color: '#b91c1c', borderColor: '#fecaca' },
    dotColor: '#ef4444',
  },
  expired: {
    label: 'Expired',
    style: { background: 'var(--theme-bg-muted, #f3f4f6)', color: 'var(--theme-text-secondary, #4b5563)', borderColor: 'var(--theme-border-light, #e5e7eb)' },
    dotColor: 'var(--theme-text-muted, #9ca3af)',
  },
};

export const LobbiStatusBadge = forwardRef<
  HTMLSpanElement,
  LobbiStatusBadgeProps
>(({ status, size = 'md', showDot = true, className, style: styleProp, ...props }, ref) => {
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
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: config.dotColor }}
          />
        ) : undefined
      }
      className={cn(
        'inline-flex items-center gap-1.5',
        'rounded-full border',
        'font-medium uppercase tracking-[0.06em]',
        sizeStyles[size],
        className
      )}
      style={{
        ...config.style,
        fontFamily: 'var(--theme-font-display, "DM Sans", sans-serif)',
        ...styleProp,
      }}
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

const membershipConfig: Record<string, { label: string; style: React.CSSProperties }> = {
  platinum: {
    label: 'Platinum',
    style: { background: '#f1f5f9', color: '#334155', borderColor: '#cbd5e1' },
  },
  gold: {
    label: 'Gold',
    style: {
      background: 'rgba(var(--theme-primary-rgb, 212,175,55), 0.1)',
      color: 'var(--theme-primary-dark, #8B7330)',
      borderColor: 'rgba(var(--theme-primary-rgb, 212,175,55), 0.3)',
    },
  },
  silver: {
    label: 'Silver',
    style: { background: '#f3f4f6', color: '#4b5563', borderColor: '#d1d5db' },
  },
  bronze: {
    label: 'Bronze',
    style: { background: 'rgba(245,158,11,0.1)', color: '#b45309', borderColor: '#fcd34d' },
  },
  standard: {
    label: 'Standard',
    style: {
      background: 'var(--theme-bg-muted, #f9fafb)',
      color: 'var(--theme-text-secondary, #4b5563)',
      borderColor: 'var(--theme-border-light, #e5e7eb)',
    },
  },
};

export const LobbiMembershipBadge = forwardRef<
  HTMLSpanElement,
  LobbiMembershipBadgeProps
>(({ type, size = 'md', className, style: styleProp, ...props }, ref) => {
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
        sizeStyles[size],
        className
      )}
      style={{
        ...config.style,
        fontFamily: 'var(--theme-font-display, "DM Sans", sans-serif)',
        ...styleProp,
      }}
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

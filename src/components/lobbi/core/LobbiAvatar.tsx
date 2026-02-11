/**
 * LobbiAvatar - Premium avatar component for The Lobbi
 * Migrated to Mantine v8 Avatar primitive with luxury aesthetic preserved.
 *
 * Features:
 * - Themed gradient backgrounds
 * - Cormorant Garamond initials
 * - Online/offline status indicator
 * - Group avatar stacking
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import {
  Avatar,
  Avatar as MantineAvatar,
  Indicator,
  type AvatarProps,
} from '@mantine/core';
import { cn } from '@/lib/utils';

export interface LobbiAvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'circle' | 'rounded';
  showStatus?: boolean;
  status?: 'online' | 'offline' | 'away' | 'busy';
  showBorder?: boolean;
}

const mantineSizeMap: Record<string, AvatarProps['size']> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  '2xl': 96,
};

const statusColors: Record<string, string> = {
  online: 'green',
  offline: 'gray',
  away: 'yellow',
  busy: 'red',
};

const indicatorSizes: Record<string, number> = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  '2xl': 20,
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const LobbiAvatar = forwardRef<HTMLDivElement, LobbiAvatarProps>(
  (
    {
      src,
      alt,
      name = '',
      size = 'md',
      variant = 'circle',
      showStatus = false,
      status = 'offline',
      showBorder = false,
      className,
      ...props
    },
    ref
  ) => {
    const initials = name ? getInitials(name) : '?';
    const radius = variant === 'circle' ? 'xl' : 'md';

    const avatarContent = (
      <MantineAvatar
        ref={ref}
        src={src}
        alt={alt || name}
        size={mantineSizeMap[size]}
        radius={radius}
        className={cn(
          'flex-shrink-0',
          className
        )}
        styles={{
          root: {
            '--avatar-bg': 'transparent',
            ...(showBorder ? {
              boxShadow: '0 0 0 2px var(--theme-bg-card, #fff)',
            } : {}),
          },
          placeholder: {
            background:
              'var(--theme-avatar-bg, linear-gradient(135deg, #F4D03F 0%, #D4AF37 50%, #8B7330 100%))',
            color: 'var(--theme-text-inverse, #fff)',
            fontFamily: 'var(--theme-font-display, "Cormorant Garamond", Georgia, serif)',
            fontWeight: 600,
            position: 'relative',
          },
          image: {
            objectFit: 'cover',
          },
        }}
        {...(props as any)}
      >
        {/* Light overlay for depth on placeholder */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)',
            borderRadius: 'inherit',
          }}
        />
        <span className="relative z-10">{initials}</span>
      </MantineAvatar>
    );

    if (showStatus) {
      return (
        <Indicator
          color={statusColors[status]}
          size={indicatorSizes[size]}
          offset={size === 'xs' || size === 'sm' ? 2 : 4}
          position="bottom-end"
          withBorder
          processing={status === 'online'}
        >
          {avatarContent}
        </Indicator>
      );
    }

    return avatarContent;
  }
);

LobbiAvatar.displayName = 'LobbiAvatar';

// Avatar Group for stacking multiple avatars
export interface LobbiAvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export const LobbiAvatarGroup = forwardRef<
  HTMLDivElement,
  LobbiAvatarGroupProps
>(({ max = 4, size = 'md', children, className, ...props }, ref) => {
  const avatars = Array.isArray(children) ? children : [children];
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <Avatar.Group ref={ref} className={className} {...(props as any)}>
      {visibleAvatars}
      {remainingCount > 0 && (
        <MantineAvatar
          size={mantineSizeMap[size]}
          radius="xl"
          styles={{
            root: {
              borderWidth: 2,
              borderColor: 'var(--theme-bg-card, #fff)',
              borderStyle: 'solid',
            },
            placeholder: {
              background: 'var(--theme-bg-muted, #f3f4f6)',
              color: 'var(--theme-text-secondary, #4b5563)',
              fontWeight: 500,
              fontFamily: 'var(--theme-font-body, "DM Sans", sans-serif)',
            },
          }}
        >
          +{remainingCount}
        </MantineAvatar>
      )}
    </Avatar.Group>
  );
});

LobbiAvatarGroup.displayName = 'LobbiAvatarGroup';

// Organization Logo Avatar (rounded square)
export interface LobbiOrgAvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  letter?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}

const orgSizeMap: Record<string, AvatarProps['size']> = {
  sm: 32,
  md: 40,
  lg: 48,
};

export const LobbiOrgAvatar = forwardRef<HTMLDivElement, LobbiOrgAvatarProps>(
  ({ src, letter, name = '', size = 'md', className, ...props }, ref) => {
    const displayLetter = letter || (name ? name[0].toUpperCase() : 'O');

    return (
      <MantineAvatar
        ref={ref}
        src={src}
        alt={name}
        size={orgSizeMap[size]}
        radius="md"
        className={cn('flex-shrink-0', className)}
        styles={{
          root: {
            '--avatar-bg': 'transparent',
          },
          placeholder: {
            background:
              'var(--theme-avatar-bg, linear-gradient(135deg, #F4D03F 0%, #D4AF37 50%, #8B7330 100%))',
            color: 'var(--theme-text-inverse, #fff)',
            fontFamily: 'var(--theme-font-display, "Cormorant Garamond", Georgia, serif)',
            fontWeight: 600,
            fontStyle: 'italic',
            position: 'relative',
          },
          image: {
            objectFit: 'cover',
          },
        }}
        {...(props as any)}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)',
            borderRadius: 'inherit',
          }}
        />
        <span className="relative z-10">{displayLetter}</span>
      </MantineAvatar>
    );
  }
);

LobbiOrgAvatar.displayName = 'LobbiOrgAvatar';

export default LobbiAvatar;

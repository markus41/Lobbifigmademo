/**
 * LobbiAvatar - Premium avatar component for The Lobbi
 *
 * Features:
 * - Themed gradient backgrounds
 * - Cormorant Garamond initials
 * - Online/offline status indicator
 * - Group avatar stacking
 */

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
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

const sizeStyles = {
  xs: 'w-6 h-6 text-[9px]',
  sm: 'w-8 h-8 text-[11px]',
  md: 'w-10 h-10 text-[13px]',
  lg: 'w-12 h-12 text-[15px]',
  xl: 'w-16 h-16 text-[20px]',
  '2xl': 'w-24 h-24 text-[32px]',
};

const statusSizes = {
  xs: 'w-1.5 h-1.5 right-0 bottom-0',
  sm: 'w-2 h-2 right-0 bottom-0',
  md: 'w-2.5 h-2.5 right-0 bottom-0',
  lg: 'w-3 h-3 right-0.5 bottom-0.5',
  xl: 'w-4 h-4 right-1 bottom-1',
  '2xl': 'w-5 h-5 right-1.5 bottom-1.5',
};

const statusColors = {
  online: 'bg-emerald-500',
  offline: 'bg-gray-400',
  away: 'bg-amber-500',
  busy: 'bg-red-500',
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

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center flex-shrink-0',
          'overflow-hidden',
          variant === 'circle' ? 'rounded-full' : 'rounded-lg',
          showBorder && 'ring-2 ring-white',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {/* Background gradient */}
        {!src && (
          <div
            className="absolute inset-0"
            style={{
              background: 'var(--t-avatar-bg, linear-gradient(135deg, #F4D03F 0%, #D4AF37 50%, #8B7330 100%))',
            }}
          />
        )}

        {/* Gradient overlay for depth */}
        {!src && (
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)',
            }}
          />
        )}

        {/* Image */}
        {src ? (
          <img
            src={src}
            alt={alt || name}
            className="w-full h-full object-cover"
          />
        ) : (
          /* Initials */
          <span
            className="relative z-10 text-white font-semibold"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {initials}
          </span>
        )}

        {/* Status indicator */}
        {showStatus && (
          <span
            className={cn(
              'absolute rounded-full border-2 border-white',
              statusSizes[size],
              statusColors[status]
            )}
          />
        )}
      </div>
    );
  }
);

LobbiAvatar.displayName = 'LobbiAvatar';

// Avatar Group for stacking multiple avatars
export interface LobbiAvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export const LobbiAvatarGroup = forwardRef<HTMLDivElement, LobbiAvatarGroupProps>(
  ({ max = 4, size = 'md', children, className, ...props }, ref) => {
    const avatars = Array.isArray(children) ? children : [children];
    const visibleAvatars = avatars.slice(0, max);
    const remainingCount = avatars.length - max;

    return (
      <div
        ref={ref}
        className={cn('flex items-center -space-x-2', className)}
        {...props}
      >
        {visibleAvatars.map((avatar, index) => (
          <div key={index} className="relative" style={{ zIndex: visibleAvatars.length - index }}>
            {avatar}
          </div>
        ))}

        {remainingCount > 0 && (
          <div
            className={cn(
              'relative inline-flex items-center justify-center',
              'rounded-full bg-gray-100 border-2 border-white',
              'text-gray-600 font-medium',
              sizeStyles[size]
            )}
            style={{ zIndex: 0 }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    );
  }
);

LobbiAvatarGroup.displayName = 'LobbiAvatarGroup';

// Organization Logo Avatar (rounded square)
export interface LobbiOrgAvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  letter?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LobbiOrgAvatar = forwardRef<HTMLDivElement, LobbiOrgAvatarProps>(
  ({ src, letter, name = '', size = 'md', className, ...props }, ref) => {
    const displayLetter = letter || (name ? name[0].toUpperCase() : 'O');

    const sizes = {
      sm: 'w-8 h-8 text-[13px] rounded-md',
      md: 'w-10 h-10 text-[15px] rounded-lg',
      lg: 'w-12 h-12 text-[18px] rounded-lg',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center flex-shrink-0',
          'overflow-hidden',
          sizes[size],
          className
        )}
        {...props}
      >
        {!src && (
          <div
            className="absolute inset-0"
            style={{
              background: 'var(--t-avatar-bg, linear-gradient(135deg, #F4D03F 0%, #D4AF37 50%, #8B7330 100%))',
            }}
          />
        )}

        {!src && (
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)',
            }}
          />
        )}

        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span
            className="relative z-10 text-white font-semibold italic"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {displayLetter}
          </span>
        )}
      </div>
    );
  }
);

LobbiOrgAvatar.displayName = 'LobbiOrgAvatar';

export default LobbiAvatar;

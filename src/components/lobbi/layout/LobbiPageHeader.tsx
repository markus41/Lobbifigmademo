/**
 * LobbiPageHeader - Page header component with title, description, and actions
 *
 * Features:
 * - Cormorant Garamond display heading
 * - Action buttons slot
 * - Optional description
 * - Tab navigation support
 */

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

// =============================================================================
// TYPES
// =============================================================================

export interface Tab {
  id: string;
  label: string;
  count?: number;
}

export interface LobbiPageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  tabs?: Tab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function LobbiPageHeader({
  title,
  description,
  icon,
  actions,
  tabs,
  activeTab,
  onTabChange,
  className,
}: LobbiPageHeaderProps) {
  return (
    <motion.div
      className={cn('px-6 lg:px-8 py-6', className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-4">
          {/* Icon */}
          {icon && (
            <div
              className={cn(
                'flex items-center justify-center',
                'w-12 h-12 rounded-xl',
                'bg-gold-400/10 text-gold-600'
              )}
            >
              {icon}
            </div>
          )}

          {/* Title & Description */}
          <div>
            <h1
              className="text-2xl lg:text-3xl font-semibold text-gray-900"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h1>
            {description && (
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-3 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>

      {/* Tabs */}
      {tabs && tabs.length > 0 && (
        <div className="mt-6 border-b border-gray-200">
          <nav className="flex gap-8 -mb-px">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange?.(tab.id)}
                  className={cn(
                    'relative pb-4 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-gold-600'
                      : 'text-gray-500 hover:text-gray-700'
                  )}
                >
                  <span className="flex items-center gap-2">
                    {tab.label}
                    {tab.count !== undefined && (
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded-full text-xs',
                          isActive
                            ? 'bg-gold-400/10 text-gold-700'
                            : 'bg-gray-100 text-gray-600'
                        )}
                      >
                        {tab.count}
                      </span>
                    )}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500"
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </motion.div>
  );
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

export interface LobbiPageContentProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'px-4 lg:px-6 py-4',
  md: 'px-6 lg:px-8 py-6',
  lg: 'px-8 lg:px-10 py-8',
};

export function LobbiPageContent({
  children,
  className,
  padding = 'md',
}: LobbiPageContentProps) {
  return (
    <div className={cn(paddingStyles[padding], className)}>
      {children}
    </div>
  );
}

// Section with title
export interface LobbiPageSectionProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function LobbiPageSection({
  title,
  description,
  actions,
  children,
  className,
}: LobbiPageSectionProps) {
  return (
    <section className={cn('mb-8', className)}>
      {(title || actions) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2">{actions}</div>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

// Grid layout helper
export interface LobbiGridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

const colStyles = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

const gapStyles = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

export function LobbiGrid({
  children,
  cols = 3,
  gap = 'md',
  className,
}: LobbiGridProps) {
  return (
    <div className={cn('grid', colStyles[cols], gapStyles[gap], className)}>
      {children}
    </div>
  );
}

export default LobbiPageHeader;

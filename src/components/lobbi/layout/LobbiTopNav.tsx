/**
 * LobbiTopNav - Top navigation bar for The Lobbi
 *
 * Features:
 * - Organization branding with dynamic name/logo
 * - Search bar with themed focus
 * - Concierge (AI) button with pulse animation
 * - Notifications with count badge
 * - User profile dropdown
 * - Breadcrumb support
 * - Org switcher for demos
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Bell,
  Menu,
  Sparkles,
  ChevronDown,
  Settings,
  LogOut,
  User,
  Building2,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LobbiAvatar, LobbiOrgAvatar } from '../core';

// =============================================================================
// TYPES
// =============================================================================

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface Organization {
  id: string;
  name: string;
  shortName: string;
  logoLetter: string;
  logoUrl?: string;
  primaryColor?: string;
}

export interface LobbiTopNavProps {
  onMenuClick?: () => void;
  onConciergeClick?: () => void;
  onNotificationsClick?: () => void;
  breadcrumbs?: Breadcrumb[];
  notificationCount?: number;
  userName?: string;
  userRole?: string;
  userInitials?: string;
  userAvatarUrl?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  // Organization props
  organization?: Organization;
  availableOrgs?: Organization[];
  onOrgChange?: (orgId: string) => void;
  showOrgSwitcher?: boolean;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function LobbiTopNav({
  onMenuClick,
  onConciergeClick,
  onNotificationsClick,
  breadcrumbs = [],
  notificationCount = 0,
  userName = 'Guest',
  userRole = 'Member',
  userInitials = 'G',
  userAvatarUrl,
  showSearch = true,
  searchPlaceholder = 'Search members, events...',
  onSearch,
  organization,
  availableOrgs = [],
  onOrgChange,
  showOrgSwitcher = false,
}: LobbiTopNavProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOrgSwitcherOpen, setIsOrgSwitcherOpen] = useState(false);

  // Update document title when organization changes
  useEffect(() => {
    if (organization) {
      document.title = `${organization.name} | The Lobbi`;
    }
  }, [organization]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleOrgSelect = (orgId: string) => {
    onOrgChange?.(orgId);
    setIsOrgSwitcherOpen(false);
  };

  return (
    <motion.header
      className={cn(
        'sticky top-0 z-30 h-16',
        'bg-white/80 backdrop-blur-sm',
        'border-b border-gray-200',
        'flex items-center justify-between px-6'
      )}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className={cn(
              'lg:hidden p-2 rounded-lg',
              'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
              'transition-colors'
            )}
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Organization Branding / Switcher */}
        {organization && (
          <div className="relative">
            <button
              onClick={() => showOrgSwitcher && setIsOrgSwitcherOpen(!isOrgSwitcherOpen)}
              className={cn(
                'flex items-center gap-3 py-2 px-3 rounded-lg',
                showOrgSwitcher && 'hover:bg-gray-50 cursor-pointer',
                !showOrgSwitcher && 'cursor-default'
              )}
            >
              <LobbiOrgAvatar
                letter={organization.logoLetter}
                name={organization.name}
                src={organization.logoUrl}
                size="sm"
              />
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-semibold text-gray-900">
                  {organization.shortName}
                </span>
                {showOrgSwitcher && (
                  <span className="text-[10px] text-gray-500 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    Switch org
                  </span>
                )}
              </div>
              {showOrgSwitcher && (
                <ChevronDown
                  className={cn(
                    'hidden sm:block w-4 h-4 text-gray-400 transition-transform',
                    isOrgSwitcherOpen && 'rotate-180'
                  )}
                />
              )}
            </button>

            {/* Org Switcher Dropdown */}
            <AnimatePresence>
              {isOrgSwitcherOpen && showOrgSwitcher && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOrgSwitcherOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                      'absolute left-0 top-full mt-2 z-50',
                      'w-72 py-2 bg-white rounded-xl',
                      'border border-gray-200 shadow-lg'
                    )}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Switch Organization
                      </p>
                    </div>
                    <div className="py-1 max-h-64 overflow-y-auto">
                      {availableOrgs.map((org) => (
                        <button
                          key={org.id}
                          onClick={() => handleOrgSelect(org.id)}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-3',
                            'hover:bg-gray-50 transition-colors',
                            org.id === organization.id && 'bg-gold-50/50'
                          )}
                        >
                          <LobbiOrgAvatar
                            letter={org.logoLetter}
                            name={org.name}
                            src={org.logoUrl}
                            size="sm"
                          />
                          <div className="flex-1 text-left">
                            <p className="text-sm font-medium text-gray-900">
                              {org.shortName}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {org.name}
                            </p>
                          </div>
                          {org.id === organization.id && (
                            <Check className="w-4 h-4 text-gold-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="hidden md:flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-gray-400">/</span>
                )}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-gray-900 font-medium">
                    {crumb.label}
                  </span>
                )}
              </div>
            ))}
          </nav>
        )}

        {/* Search */}
        {showSearch && (
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className={cn(
                'w-64 xl:w-96 px-4 py-2 pl-10',
                'bg-gray-50 border border-gray-200 rounded-lg',
                'text-sm text-gray-900 placeholder:text-gray-400',
                'focus:outline-none focus:ring-2 focus:ring-gold-400/20',
                'focus:border-gold-400 transition-all'
              )}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </form>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Concierge (AI) Button */}
        {onConciergeClick && (
          <motion.button
            onClick={onConciergeClick}
            className={cn(
              'relative flex items-center gap-2 px-4 py-2 rounded-lg',
              'bg-gradient-to-r from-gold-200 via-gold-400 to-gold-700',
              'text-white text-sm font-medium',
              'transition-all hover:shadow-gold'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Concierge</span>

            {/* Pulse indicator */}
            <motion.span
              className="absolute -top-1 -right-1 w-3 h-3 bg-gold-200 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}

        {/* Notifications */}
        {onNotificationsClick && (
          <button
            onClick={onNotificationsClick}
            className={cn(
              'relative p-2 rounded-lg',
              'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
              'transition-colors'
            )}
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span
                className={cn(
                  'absolute -top-0.5 -right-0.5',
                  'min-w-[18px] h-[18px] px-1',
                  'flex items-center justify-center',
                  'bg-red-500 text-white text-[10px] font-bold rounded-full'
                )}
              >
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </button>
        )}

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={cn(
              'flex items-center gap-3 p-2 rounded-lg',
              'hover:bg-gray-50 transition-colors'
            )}
          >
            <LobbiAvatar
              name={userName}
              src={userAvatarUrl}
              size="sm"
            />
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-gray-900">
                {userName}
              </div>
              <div className="text-xs text-gray-500">
                {userRole}
              </div>
            </div>
            <ChevronDown
              className={cn(
                'hidden md:block w-4 h-4 text-gray-400 transition-transform',
                isProfileOpen && 'rotate-180'
              )}
            />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  'absolute right-0 top-full mt-2 z-50',
                  'w-56 py-2 bg-white rounded-xl',
                  'border border-gray-200 shadow-lg'
                )}
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{userName}</p>
                  <p className="text-xs text-gray-500 truncate">{userRole}</p>
                </div>

                <div className="py-1">
                  <button
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2',
                      'text-sm text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </button>
                  <button
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2',
                      'text-sm text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-1">
                  <button
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2',
                      'text-sm text-red-600 hover:bg-red-50'
                    )}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}

export default LobbiTopNav;

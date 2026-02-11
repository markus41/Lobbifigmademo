import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { MenuIcon, BellIcon, SearchIcon, ConciergeIcon } from './icons/LobbiIcons';
import { NotificationsPanel } from './NotificationsPanel';
import { UserProfileDropdown } from './UserProfileDropdown';
import { SearchDropdown } from './SearchDropdown';
import type { Account, Organization } from '../data/themes';

interface TopNavProps {
  onMenuClick: () => void;
  onBellhopClick: () => void;
  organization: Organization;
  account: Account;
  onNavigate?: (page: string) => void;
  canNavigateToPage?: (page: string) => boolean;
}

// Org logo with proper 32px avatar sizing
function OrgLogo({ organization }: { organization: Organization }) {
  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold"
      style={{
        background: 'var(--theme-gradient-btn, var(--theme-primary, #D4AF37))',
        color: 'var(--theme-text-inverse, #FFFFFF)',
        fontFamily: 'var(--theme-font-display, inherit)',
      }}
    >
      {organization.logoLetter || organization.short[0]}
    </div>
  );
}

export function TopNav({
  onMenuClick,
  onBellhopClick,
  organization,
  account,
  onNavigate,
  canNavigateToPage,
}: TopNavProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Update document title when organization changes
  useEffect(() => {
    document.title = `${organization.short || organization.name} | The Lobbi`;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', organization.theme.primary);
    }
  }, [organization]);

  return (
    <motion.header
      className="flex items-center justify-between px-6 h-14 sticky top-0 z-50"
      style={{
        borderBottom: '1px solid var(--theme-border-light, #E4E4E7)',
        background: 'var(--theme-glass-bg, rgba(255, 255, 255, 0.82))',
        backdropFilter: 'var(--theme-glass-blur, blur(12px) saturate(180%))',
        WebkitBackdropFilter: 'var(--theme-glass-blur, blur(12px) saturate(180%))',
      }}
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Left: Menu + Org Branding + Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg transition-all duration-150 lg:hidden"
          style={{ color: 'var(--theme-text-muted, #A1A1AA)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--theme-bg-secondary, #F4F4F5)';
            e.currentTarget.style.color = 'var(--theme-text-primary, #09090B)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--theme-text-muted, #A1A1AA)';
          }}
        >
          <MenuIcon className="w-5 h-5" />
        </button>

        {/* Organization Branding */}
        <div
          className="hidden lg:flex items-center gap-3 pr-4"
          style={{ borderRight: '1px solid var(--theme-border-light, #E4E4E7)' }}
        >
          <OrgLogo organization={organization} />
          <div className="flex flex-col">
            <span
              className="text-sm font-semibold leading-tight -tracking-[0.01em]"
              style={{
                color: 'var(--theme-text-primary, #09090B)',
                fontFamily: 'var(--theme-font-display, inherit)',
              }}
            >
              {organization.short}
            </span>
            <span
              className="leading-tight text-[11px] font-medium tracking-[0.02em]"
              style={{
                color: 'var(--theme-text-muted, #A1A1AA)',
              }}
            >
              Member Portal
            </span>
          </div>
        </div>

        {/* Search bar - with visible border and proper sizing */}
        <div className="relative max-w-md flex-1">
          <SearchIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 z-10"
            style={{ color: 'var(--theme-text-muted, #A1A1AA)' }}
          />
          <input
            type="text"
            placeholder="Search members, events, documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 text-[13px] outline-none transition-all duration-200 h-9 border border-transparent rounded-lg"
            style={{
              color: 'var(--theme-text-primary, #09090B)',
              background: 'var(--theme-bg-secondary, #F4F4F5)',
              fontFamily: 'var(--theme-font-body, inherit)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(var(--theme-primary-rgb, 212,175,55), 0.3)';
              e.target.style.background = 'var(--theme-bg-card, #FFFFFF)';
              e.target.style.boxShadow = '0 0 0 3px rgba(var(--theme-primary-rgb, 212,175,55), 0.08)';
              setIsSearchOpen(true);
              setIsNotificationsOpen(false);
              setIsProfileOpen(false);
            }}
            onBlur={(e) => {
              setTimeout(() => {
                e.target.style.borderColor = 'transparent';
                e.target.style.background = 'var(--theme-bg-secondary, #F4F4F5)';
                e.target.style.boxShadow = 'none';
              }, 200);
            }}
          />
          <SearchDropdown
            isOpen={isSearchOpen}
            onClose={() => {
              setIsSearchOpen(false);
              setSearchQuery('');
            }}
            query={searchQuery}
            primaryColor={organization.theme.primary}
            primaryRgb={organization.theme.primaryRgb}
            onNavigate={onNavigate}
            canNavigateToPage={canNavigateToPage}
          />
        </div>
      </div>

      {/* Right: Concierge + Notifications + Avatar */}
      <div className="flex items-center gap-2">
        {/* AI Bellhop Button */}
        <button
          onClick={onBellhopClick}
          className="flex items-center gap-2 px-4 text-[13px] font-medium transition-all duration-200 h-[34px] rounded-lg -tracking-[0.01em]"
          style={{
            background: 'var(--theme-gradient-btn, var(--theme-primary, #D4AF37))',
            fontFamily: 'var(--theme-font-body, inherit)',
            color: 'var(--theme-text-inverse, #FFFFFF)',
            boxShadow: 'var(--theme-shadow-sm, 0 1px 3px rgba(0,0,0,0.08))',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = 'var(--theme-shadow-md, 0 4px 12px rgba(0,0,0,0.12))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--theme-shadow-sm, 0 1px 3px rgba(0,0,0,0.08))';
          }}
        >
          <ConciergeIcon className="w-4 h-4" />
          <span>Concierge</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsProfileOpen(false);
            }}
            className="relative flex items-center justify-center rounded-lg transition-all duration-150 w-[34px] h-[34px]"
            style={{
              color: 'var(--theme-text-secondary, #71717A)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--theme-bg-secondary, #F4F4F5)';
              e.currentTarget.style.color = 'var(--theme-text-primary, #09090B)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--theme-text-secondary, #71717A)';
            }}
          >
            <BellIcon className="w-[18px] h-[18px]" />
            <span
              className="absolute rounded-full top-1.5 right-[7px] w-[7px] h-[7px] bg-red-500 border-[1.5px]"
              style={{ borderColor: 'var(--theme-bg-card, #FFFFFF)' }}
            />
          </button>

          <NotificationsPanel
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
            primaryColor={organization.theme.primary}
            primaryRgb={organization.theme.primaryRgb}
          />
        </div>

        {/* Avatar / Profile - 32px circle per spec */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationsOpen(false);
            }}
            className="flex items-center justify-center rounded-full font-medium transition-all duration-200 w-8 h-8 text-xs -tracking-[0.01em]"
            style={{
              background: 'var(--theme-gradient-btn, var(--theme-primary, #D4AF37))',
              color: 'var(--theme-text-inverse, #FFFFFF)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px var(--theme-bg-card, white), 0 0 0 4px rgba(var(--theme-primary-rgb, 212,175,55), 0.3)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {account?.first?.[0] || 'U'}{account?.last?.[0] || 'U'}
          </button>

          <UserProfileDropdown
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            account={account}
            organization={organization}
            onNavigate={onNavigate}
            canNavigateToPage={canNavigateToPage}
          />
        </div>
      </div>
    </motion.header>
  );
}

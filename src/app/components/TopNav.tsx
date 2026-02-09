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
}

// Org logo with proper 32px avatar sizing
function OrgLogo({ organization }: { organization: Organization }) {
  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold"
      style={{
        background: organization.theme.gradientBtn,
        color: organization.theme.textInverse,
        fontFamily: organization.theme.fontDisplay || "'Cormorant Garamond', Georgia, serif",
        fontStyle: 'italic',
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

  // Theme-aware values
  const borderColor = organization.theme.borderColor || '#E4E4E7';
  const textPrimary = organization.theme.textPrimary || '#09090B';
  const textSecondary = organization.theme.textSecondary || '#71717A';
  const textMuted = organization.theme.textMuted || '#A1A1AA';
  const bgSecondary = organization.theme.bgSecondary || '#F4F4F5';

  return (
    <motion.header
      className="flex items-center justify-between px-6 h-14 sticky top-0 z-50"
      style={{
        borderBottom: `1px solid ${borderColor}`,
        background: `rgba(255, 255, 255, 0.82)`,
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
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
          style={{ color: textMuted }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = bgSecondary;
            e.currentTarget.style.color = textPrimary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = textMuted;
          }}
        >
          <MenuIcon className="w-5 h-5" />
        </button>

        {/* Organization Branding */}
        <div
          className="hidden lg:flex items-center gap-3 pr-4"
          style={{ borderRight: `1px solid ${borderColor}` }}
        >
          <OrgLogo organization={organization} />
          <div className="flex flex-col">
            <span
              className="text-sm font-semibold leading-tight -tracking-[0.01em]"
              style={{
                color: textPrimary,
                fontFamily: organization.theme.fontDisplay || "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {organization.short}
            </span>
            <span
              className="leading-tight text-[11px] font-medium tracking-[0.02em]"
              style={{
                color: textMuted,
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
            style={{ color: textMuted }}
          />
          <input
            type="text"
            placeholder="Search members, events, documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 text-[13px] outline-none transition-all duration-200 h-9 border border-transparent rounded-lg"
            style={{
              color: textPrimary,
              background: bgSecondary,
              fontFamily: `var(--theme-font-body, 'Inter', system-ui, sans-serif)`,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = `rgba(${organization.theme.primaryRgb}, 0.3)`;
              e.target.style.background = '#FFFFFF';
              e.target.style.boxShadow = `0 0 0 3px rgba(${organization.theme.primaryRgb}, 0.08)`;
              setIsSearchOpen(true);
              setIsNotificationsOpen(false);
              setIsProfileOpen(false);
            }}
            onBlur={(e) => {
              setTimeout(() => {
                e.target.style.borderColor = 'transparent';
                e.target.style.background = bgSecondary;
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
          />
        </div>
      </div>

      {/* Right: Concierge + Notifications + Avatar */}
      <div className="flex items-center gap-2">
        {/* AI Bellhop Button */}
        <button
          onClick={onBellhopClick}
          className="flex items-center gap-2 px-4 text-[13px] font-medium transition-all duration-200 h-[34px] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] -tracking-[0.01em]"
          style={{
            background: organization.theme.gradientBtn,
            fontFamily: organization.theme.fontBody,
            color: organization.theme.textInverse,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)';
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
              color: textSecondary,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = bgSecondary;
              e.currentTarget.style.color = textPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = textSecondary;
            }}
          >
            <BellIcon className="w-[18px] h-[18px]" />
            <span
              className="absolute rounded-full top-1.5 right-[7px] w-[7px] h-[7px] bg-red-500 border-[1.5px] border-white"
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
              background: organization.theme.gradientBtn,
              color: organization.theme.textInverse,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 2px white, 0 0 0 4px rgba(${organization.theme.primaryRgb}, 0.3)`;
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
          />
        </div>
      </div>
    </motion.header>
  );
}

import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
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
}

// Simple org avatar component
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
      {organization.logoLetter || organization.shortName[0]}
    </div>
  );
}

export function TopNav({
  onMenuClick,
  onBellhopClick,
  organization,
  account,
}: TopNavProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Update document title when organization changes
  useEffect(() => {
    document.title = `${organization.shortName} | The Lobbi`;

    // Update theme-color meta tag
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', organization.theme.primary);
    }
  }, [organization]);

  // Theme-aware values
  const borderColor = organization.theme.borderColor || '#EDE8DD';
  const bgCard = organization.theme.bgCard || '#FFFFFF';
  const textPrimary = organization.theme.textPrimary || '#2C2A25';
  const textSecondary = organization.theme.textSecondary || '#4A4A5A';
  const textMuted = organization.theme.textMuted || '#7A7A8A';
  const bgSecondary = organization.theme.bgSecondary || '#F7F4EE';

  return (
    <motion.header
      className="h-16 border-b flex items-center justify-between px-6"
      style={{
        borderColor,
        background: bgCard,
      }}
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Left: Menu + Org Branding + Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg transition-colors lg:hidden"
          style={{
            color: textMuted,
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = `rgba(${organization.theme.primaryRgb}, 0.05)`}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <MenuIcon className="w-5 h-5" />
        </button>

        {/* Organization Branding (visible on larger screens) */}
        <div className="hidden lg:flex items-center gap-3 pr-4 border-r border-gray-200">
          <OrgLogo organization={organization} />
          <div className="flex flex-col">
            <span
              className="text-sm font-semibold leading-tight"
              style={{
                color: textPrimary,
                fontFamily: organization.theme.fontDisplay || "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {organization.shortName}
            </span>
            <span
              className="text-[10px] leading-tight"
              style={{ color: textMuted }}
            >
              Member Portal
            </span>
          </div>
        </div>

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
            className="w-full pl-10 pr-4 py-2 border border-transparent text-sm outline-none transition-all"
            style={{
              color: textPrimary,
              background: bgSecondary,
              borderRadius: `var(--theme-radius, 0.5rem)`,
              fontFamily: `var(--theme-font-body, 'Inter', system-ui, sans-serif)`,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = `rgba(${organization.theme.primaryRgb}, 0.2)`;
              e.target.style.background = bgCard;
              setIsSearchOpen(true);
              setIsNotificationsOpen(false);
              setIsProfileOpen(false);
            }}
            onBlur={(e) => {
              // Delay to allow clicking on dropdown items
              setTimeout(() => {
                e.target.style.borderColor = 'transparent';
                e.target.style.background = bgSecondary;
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
          />
        </div>
      </div>

      {/* Right: Concierge + Notifications + Avatar */}
      <div className="flex items-center gap-3">
        {/* AI Bellhop Button */}
        <button
          onClick={onBellhopClick}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5"
          style={{
            background: organization.theme.gradientBtn,
            fontFamily: organization.theme.fontBody,
            boxShadow: organization.theme.buttonShadow ? `var(--theme-shadow-md)` : '0 2px 8px rgba(0,0,0,0.1)',
            borderRadius: `var(--theme-button-radius, 0.5rem)`,
            color: organization.theme.textInverse,
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
            className="relative p-2 rounded-lg transition-colors"
            style={{ color: textMuted }}
            onMouseEnter={(e) => e.currentTarget.style.background = `rgba(${organization.theme.primaryRgb}, 0.05)`}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <BellIcon className="w-5 h-5" />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ background: organization.theme.primary }}
            />
          </button>

          <NotificationsPanel
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
            primaryColor={organization.theme.primary}
            primaryRgb={organization.theme.primaryRgb}
          />
        </div>

        {/* Avatar / Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationsOpen(false);
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-transform hover:scale-105"
            style={{
              background: organization.theme.gradientBtn,
              color: organization.theme.textInverse,
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

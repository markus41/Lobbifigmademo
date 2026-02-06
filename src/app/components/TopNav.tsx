import { motion } from 'motion/react';
import { useState, useRef } from 'react';
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

  return (
    <motion.header
      className="h-16 border-b bg-white flex items-center justify-between px-6"
      style={{
        borderColor: '#EDE8DD',
      }}
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Left: Menu + Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <MenuIcon className="w-5 h-5" style={{ color: '#8A8578' }} />
        </button>

        <div className="relative max-w-md flex-1">
          <SearchIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 z-10"
            style={{ color: '#B8B0A0' }}
          />
          <input
            type="text"
            placeholder="Search members, events, documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F7F4EE] border border-transparent rounded-lg text-sm outline-none transition-all"
            style={{
              color: '#2C2A25',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = `rgba(${organization.theme.primaryRgb}, 0.2)`;
              e.target.style.background = '#fff';
              setIsSearchOpen(true);
              setIsNotificationsOpen(false);
              setIsProfileOpen(false);
            }}
            onBlur={(e) => {
              // Delay to allow clicking on dropdown items
              setTimeout(() => {
                e.target.style.borderColor = 'transparent';
                e.target.style.background = '#F7F4EE';
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
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:-translate-y-0.5"
          style={{
            background: organization.theme.gradientBtn,
            fontFamily: 'DM Sans, sans-serif',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <BellIcon className="w-5 h-5" style={{ color: '#8A8578' }} />
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
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium transition-transform hover:scale-105"
            style={{
              background: organization.theme.gradientBtn,
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

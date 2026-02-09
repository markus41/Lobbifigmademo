import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { DashboardIcon, RegistryIcon, EventsIcon, SettingsIcon } from './icons/LobbiIcons';
import type { Account, Organization } from '../data/themes';

// Additional icons for new nav items
const BusinessIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
  </svg>
);

const VaultIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const CollapseIcon = ({ className, isCollapsed }: { className?: string; isCollapsed: boolean }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    {isCollapsed ? (
      <polyline points="9 18 15 12 9 6" />
    ) : (
      <polyline points="15 18 9 12 15 6" />
    )}
  </svg>
);

// Tooltip component for collapsed mode
function NavTooltip({
  label,
  isVisible,
  bgColor = '#09090B',
  textColor = '#FAFAFA',
}: {
  label: string;
  isVisible: boolean;
  bgColor?: string;
  textColor?: string;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -8, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -8, scale: 0.94 }}
          transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-full ml-3 px-3 py-2 rounded-lg whitespace-nowrap z-50 text-xs font-semibold"
          style={{
            background: bgColor,
            color: textColor,
            boxShadow: '0 8px 24px -4px rgba(0,0,0,0.25), 0 4px 8px -2px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.05)',
          }}
        >
          {label}
          {/* Tooltip arrow */}
          <div
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45"
            style={{ background: bgColor }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  organization: Organization;
  account: Account;
}

export function Sidebar({
  currentPage,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  organization,
  account,
}: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const mainMenuItems = [
    { id: 'dashboard', label: 'The Front Desk', icon: DashboardIcon },
    { id: 'registry', label: 'The Registry', icon: RegistryIcon },
    { id: 'business', label: 'Business Center', icon: BusinessIcon },
    { id: 'events', label: 'Events Pavilion', icon: EventsIcon },
    { id: 'vault', label: 'The Vault', icon: VaultIcon },
  ];

  const bottomMenuItems = [
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const isDarkTheme = organization.theme.prefersDark;

  // Award-winning sidebar: solid surface color, proper borders, 256px width
  const sidebarBg = isDarkTheme ? '#0C0C0E' : (organization.theme.bgCard || '#FFFFFF');
  const sidebarBorder = isDarkTheme ? '#27272A' : (organization.theme.borderColor || '#E4E4E7');
  const sidebarTextColor = isDarkTheme ? '#A1A1AA' : (organization.theme.textSecondary || '#71717A');
  const sidebarTextMuted = isDarkTheme ? '#52525B' : (organization.theme.textMuted || '#A1A1AA');
  const sidebarTextPrimary = isDarkTheme ? '#FAFAFA' : (organization.theme.textPrimary || '#09090B');
  const sidebarActiveTextColor = isDarkTheme
    ? (organization.theme.primaryLight || organization.theme.primary)
    : organization.theme.primary;
  const hoverBg = isDarkTheme ? '#18181B' : '#F4F4F5';
  const activeBg = isDarkTheme
    ? `rgba(${organization.theme.primaryRgb}, 0.15)`
    : `rgba(${organization.theme.primaryRgb}, 0.08)`;

  // Render a navigation item
  function renderNavItem(item: typeof mainMenuItems[0], layoutIdSuffix: string = '') {
    const Icon = item.icon;
    const isActive = currentPage === item.id;
    const isHovered = hoveredItem === item.id;

    return (
      <div key={item.id} className="relative">
        <button
          onClick={() => onNavigate(item.id)}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
          className="w-full flex items-center transition-all duration-150 gap-3 h-9 px-3 rounded-lg text-sm cursor-pointer border-none outline-none relative"
          style={{
            background: isActive ? activeBg : isHovered ? hoverBg : 'transparent',
            color: isActive ? sidebarActiveTextColor : isHovered ? sidebarTextPrimary : sidebarTextColor,
            fontFamily: organization.theme.fontBody,
            fontWeight: isActive ? 600 : 500,
          }}
        >
          {/* Active indicator - left bar */}
          {isActive && (
            <motion.div
              layoutId={`activeIndicator${layoutIdSuffix}`}
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: '20px',
                borderRadius: '0 4px 4px 0',
                background: organization.theme.primary,
              }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            />
          )}
          <Icon className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="truncate">{item.label}</span>
          )}
        </button>
        {isCollapsed && (
          <NavTooltip
            label={item.label}
            isVisible={isHovered}
            bgColor={isDarkTheme ? '#27272A' : '#09090B'}
            textColor="#FAFAFA"
          />
        )}
      </div>
    );
  }

  return (
    <motion.aside
      className="h-full flex flex-col flex-shrink-0"
      style={{
        width: isCollapsed ? '72px' : '260px',
        minWidth: isCollapsed ? '72px' : '260px',
        background: isDarkTheme
          ? `linear-gradient(180deg, ${sidebarBg} 0%, rgba(0,0,0,0.1) 100%)`
          : `linear-gradient(180deg, ${sidebarBg} 0%, rgba(0,0,0,0.02) 100%)`,
        borderRight: `1px solid ${sidebarBorder}`,
        transition: 'width 0.35s cubic-bezier(0.22, 1, 0.36, 1), min-width 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        overflow: 'hidden',
        willChange: 'width, min-width',
        boxShadow: isDarkTheme
          ? '4px 0 24px -4px rgba(0,0,0,0.5)'
          : '4px 0 24px -4px rgba(0,0,0,0.06)',
      }}
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Logo Area - 56px to match topbar height */}
      <div
        className="flex items-center h-14 px-4"
        style={{
          borderBottom: `1px solid ${sidebarBorder}`,
        }}
      >
        <motion.div
          layoutId="org-logo"
          className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl"
          style={{
            background: organization.theme.gradientBtn,
            boxShadow: `0 4px 12px -2px rgba(${organization.theme.primaryRgb}, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)`,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        >
          <span
            className="text-base font-bold"
            style={{
              fontFamily: organization.theme.fontDisplay,
              color: organization.theme.textInverse,
              fontStyle: organization.theme.fontDisplay?.includes('Cormorant') ? 'italic' : 'normal',
              textShadow: '0 1px 2px rgba(0,0,0,0.2)',
            }}
          >
            {organization.logoLetter}
          </span>
        </motion.div>
        {!isCollapsed && (
          <div className="ml-3 min-w-0 flex-1">
            <p
              className="text-sm font-semibold truncate"
              style={{
                color: sidebarTextPrimary,
                letterSpacing: '-0.01em',
                fontFamily: organization.theme.fontDisplay,
              }}
            >
              {organization.short}
            </p>
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {/* Section label */}
        {!isCollapsed && (
          <p
            className="text-[11px] font-semibold tracking-[0.08em] uppercase px-3 mb-2"
            style={{
              color: sidebarTextMuted,
            }}
          >
            Main Menu
          </p>
        )}

        <div className="flex flex-col gap-0.5">
          {mainMenuItems.map((item) => renderNavItem(item))}
        </div>

        {/* Divider - proper spacing and visibility */}
        <div
          className="mx-3 my-4 h-px"
          style={{
            background: sidebarBorder,
          }}
        />

        {/* Bottom Menu Items */}
        <div className="flex flex-col gap-0.5">
          {bottomMenuItems.map((item) => renderNavItem(item, 'Bottom'))}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <div className="px-3 py-2">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center transition-all duration-150 h-8 rounded-lg cursor-pointer border-none bg-transparent"
          style={{
            color: sidebarTextMuted,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = hoverBg;
            e.currentTarget.style.color = sidebarTextColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = sidebarTextMuted;
          }}
        >
          <CollapseIcon className="w-4 h-4" isCollapsed={isCollapsed} />
        </button>
      </div>

      {/* User Profile - proper 40px avatar, clean layout */}
      <div
        className="flex items-center px-4 py-3 gap-3"
        style={{
          borderTop: `1px solid ${sidebarBorder}`,
        }}
      >
        <div
          className="flex items-center justify-center flex-shrink-0 rounded-full w-10 h-10 text-sm font-bold"
          style={{
            background: organization.theme.gradientBtn,
            color: organization.theme.textInverse,
            boxShadow: `0 4px 12px -2px rgba(${organization.theme.primaryRgb}, 0.35), inset 0 1px 0 rgba(255,255,255,0.15)`,
          }}
        >
          {account?.first?.[0] || 'U'}{account?.last?.[0] || 'U'}
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <p
              className="truncate text-[13px] font-semibold leading-tight"
              style={{
                color: sidebarTextPrimary,
                fontFamily: organization.theme.fontBody,
              }}
            >
              {account?.first || 'User'} {account?.last || 'Name'}
            </p>
            <p
              className="truncate text-xs leading-tight"
              style={{
                color: sidebarTextMuted,
              }}
            >
              {account?.role || 'Member'}
            </p>
          </div>
        )}
      </div>
    </motion.aside>
  );
}

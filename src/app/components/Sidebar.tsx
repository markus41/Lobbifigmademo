import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { DashboardIcon, RegistryIcon, EventsIcon, SettingsIcon, LobbiOctagon } from './icons/LobbiIcons';
import type { Account, Organization } from '../data/themes';

// Additional icons for new nav items
const BusinessIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
  </svg>
);

const VaultIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const CollapseIcon = ({ className, isCollapsed }: { className?: string; isCollapsed: boolean }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
  bgColor = '#1A1815',
  textColor = '#F0ECE2',
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
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -5 }}
          transition={{ duration: 0.15 }}
          className="absolute left-full ml-2 px-2 py-1 rounded-md whitespace-nowrap z-50"
          style={{
            background: bgColor,
            color: textColor,
            fontSize: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          {label}
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

  // Theme-aware sidebar background
  const sidebarBg = organization.theme.prefersDark
    ? 'linear-gradient(180deg, #0C0C0E 0%, #080808 100%)'
    : `linear-gradient(180deg, ${organization.theme.bgCard} 0%, ${organization.theme.bgSecondary} 100%)`;

  // For dark themes, use darker sidebar
  const isDarkTheme = organization.theme.prefersDark;
  const sidebarTextColor = isDarkTheme ? '#E5E5E5' : organization.theme.textSecondary;
  const sidebarTextMuted = isDarkTheme ? '#8A8578' : organization.theme.textMuted;
  const sidebarActiveTextColor = isDarkTheme ? organization.theme.primaryLight : organization.theme.primary;

  return (
    <motion.aside
      className="h-full border-r flex flex-col flex-shrink-0"
      style={{
        width: isCollapsed ? '72px' : '240px',
        background: isDarkTheme
          ? 'linear-gradient(180deg, #1A1610 0%, #151412 100%)'
          : `linear-gradient(180deg, ${organization.theme.secondary} 0%, ${organization.theme.secondaryDark || organization.theme.bgSecondary} 100%)`,
        borderColor: `rgba(${organization.theme.primaryRgb}, 0.08)`,
      }}
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: `rgba(${organization.theme.primaryRgb}, 0.08)` }}>
        <div
          className="w-12 h-12 flex items-center justify-center"
          style={{
            background: organization.theme.gradientBtn,
            borderRadius: `var(--theme-radius, 0.75rem)`,
          }}
        >
          <span
            className="text-xl"
            style={{
              fontFamily: organization.theme.fontDisplay,
              color: organization.theme.textInverse,
              fontStyle: organization.theme.fontDisplay.includes('Cormorant') ? 'italic' : 'normal',
            }}
          >
            {organization.logoLetter}
          </span>
        </div>
        {!isCollapsed && (
          <p className="mt-3 text-xs" style={{ color: sidebarTextMuted }}>
            {organization.name}
          </p>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <p
          className="px-3 py-2 text-[10px] uppercase tracking-wider"
          style={{ color: sidebarTextMuted, letterSpacing: `var(--theme-letter-spacing, 0.05em)` }}
        >
          {!isCollapsed ? 'Main Menu' : ''}
        </p>
        {mainMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <div key={item.id} className="relative">
              <motion.button
                onClick={() => onNavigate(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
                style={{
                  background: isActive
                    ? `rgba(${organization.theme.primaryRgb}, 0.12)`
                    : isHovered
                      ? `rgba(${organization.theme.primaryRgb}, 0.05)`
                      : 'transparent',
                  color: isActive
                    ? sidebarActiveTextColor
                    : isHovered
                      ? (isDarkTheme ? '#E5DFD1' : organization.theme.textPrimary)
                      : sidebarTextColor,
                  fontFamily: organization.theme.fontBody,
                }}
                whileHover={{ x: isCollapsed ? 0 : 3 }}
                transition={{ duration: 0.15 }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 w-1 h-6 rounded-r-full"
                    style={{ background: organization.theme.primary }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
              {isCollapsed && (
                <NavTooltip
                  label={item.label}
                  isVisible={isHovered}
                  bgColor={isDarkTheme ? '#1A1815' : organization.theme.bgCard}
                  textColor={isDarkTheme ? '#F0ECE2' : organization.theme.textPrimary}
                />
              )}
            </div>
          );
        })}

        {/* Divider */}
        <div className="my-4 border-t" style={{ borderColor: `rgba(${organization.theme.primaryRgb}, 0.06)` }} />

        {/* Bottom Menu Items */}
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <div key={item.id} className="relative">
              <motion.button
                onClick={() => onNavigate(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
                style={{
                  background: isActive
                    ? `rgba(${organization.theme.primaryRgb}, 0.12)`
                    : isHovered
                      ? `rgba(${organization.theme.primaryRgb}, 0.05)`
                      : 'transparent',
                  color: isActive
                    ? sidebarActiveTextColor
                    : isHovered
                      ? (isDarkTheme ? '#E5DFD1' : organization.theme.textPrimary)
                      : sidebarTextColor,
                  fontFamily: organization.theme.fontBody,
                }}
                whileHover={{ x: isCollapsed ? 0 : 3 }}
                transition={{ duration: 0.15 }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicatorBottom"
                    className="absolute left-0 w-1 h-6 rounded-r-full"
                    style={{ background: organization.theme.primary }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
              {isCollapsed && (
                <NavTooltip
                  label={item.label}
                  isVisible={isHovered}
                  bgColor={isDarkTheme ? '#1A1815' : organization.theme.bgCard}
                  textColor={isDarkTheme ? '#F0ECE2' : organization.theme.textPrimary}
                />
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="px-4 pb-2">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center p-2 rounded-lg transition-colors"
          style={{
            color: sidebarTextMuted,
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = `rgba(${organization.theme.primaryRgb}, 0.1)`}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <CollapseIcon className="w-5 h-5" isCollapsed={isCollapsed} />
        </button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t" style={{ borderColor: `rgba(${organization.theme.primaryRgb}, 0.08)` }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
            style={{
              background: organization.theme.gradientBtn,
              color: organization.theme.textInverse,
            }}
          >
            {account?.first?.[0] || 'U'}{account?.last?.[0] || 'U'}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium truncate"
                style={{
                  color: isDarkTheme ? '#F0ECE2' : organization.theme.textPrimary,
                  fontFamily: organization.theme.fontBody,
                }}
              >
                {account?.first || 'User'} {account?.last || 'Name'}
              </p>
              <p className="text-xs truncate" style={{ color: sidebarTextMuted }}>
                {account?.role || 'Member'}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
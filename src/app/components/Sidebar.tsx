import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { DashboardIcon, RegistryIcon, EventsIcon, SettingsIcon } from './icons/LobbiIcons';
import type { Account, Organization } from '../data/themes';
import { useDemoContext } from '../../components/demo';
import { PAGE_ACCESS_RULES, type AppPage } from '../navigation/accessPolicy';

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

const InnovationIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M12 2l2.4 5.6L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-.4L12 2z" />
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
}: {
  label: string;
  isVisible: boolean;
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
            background: 'var(--theme-bg-overlay, #09090B)',
            color: 'var(--theme-text-inverse, #FAFAFA)',
            boxShadow: 'var(--theme-shadow-lg, 0 8px 24px -4px rgba(0,0,0,0.25))',
          }}
        >
          {label}
          {/* Tooltip arrow */}
          <div
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45"
            style={{ background: 'var(--theme-bg-overlay, #09090B)' }}
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

interface NavMenuItem {
  id: AppPage;
  label: string;
  icon: ({ className }: { className?: string }) => JSX.Element;
}

const mainMenuItems: NavMenuItem[] = [
  { id: 'dashboard', label: 'The Front Desk', icon: DashboardIcon },
  { id: 'registry', label: 'The Registry', icon: RegistryIcon },
  { id: 'business', label: 'Business Center', icon: BusinessIcon },
  { id: 'events', label: 'Events Pavilion', icon: EventsIcon },
  { id: 'vault', label: 'The Vault', icon: VaultIcon },
  { id: 'innovation', label: 'Innovation Lab', icon: InnovationIcon },
];

const bottomMenuItems: NavMenuItem[] = [
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

const allMenuItems: NavMenuItem[] = [...mainMenuItems, ...bottomMenuItems];

export function Sidebar({
  currentPage,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  organization,
  account,
}: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { isFeatureEnabled, isRoleAuthorized, roleInfo, currentPhase } = useDemoContext();

  const canAccessItem = (item: NavMenuItem): boolean => {
    const rule = PAGE_ACCESS_RULES[item.id];
    return isFeatureEnabled(rule.requiredPhase) && isRoleAuthorized(rule.minRoleLevel);
  };

  useEffect(() => {
    const selectedItem = allMenuItems.find((item) => item.id === currentPage);
    if (selectedItem && !canAccessItem(selectedItem)) {
      const firstAllowed = allMenuItems.find((item) => canAccessItem(item));
      if (firstAllowed && firstAllowed.id !== currentPage) {
        onNavigate(firstAllowed.id);
      }
    }
    // Include role/phase to re-evaluate access when filters change.
  }, [currentPage, onNavigate, currentPhase, roleInfo.level]);

  // Render a navigation item
  function renderNavItem(item: NavMenuItem, layoutIdSuffix: string = '') {
    const Icon = item.icon;
    const isActive = currentPage === item.id;
    const isHovered = hoveredItem === item.id;
    const isAvailable = canAccessItem(item);
    const rule = PAGE_ACCESS_RULES[item.id];

    return (
      <div key={item.id} className="relative">
        <motion.button
          onClick={() => {
            if (isAvailable) {
              onNavigate(item.id);
            }
          }}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
          whileHover={isAvailable ? { x: 2 } : undefined}
          whileTap={isAvailable ? { scale: 0.98 } : undefined}
          className="group w-full flex items-center transition-all duration-150 gap-3 h-10 px-3 rounded-xl text-sm cursor-pointer border-none outline-none relative"
          style={{
            background: isActive
              ? 'rgba(var(--theme-primary-rgb, 212,175,55), 0.1)'
              : isHovered
                ? 'var(--sidebar-accent, #F4F4F5)'
                : 'transparent',
            color: isActive
              ? 'var(--sidebar-primary, #D4AF37)'
              : isHovered
                ? 'var(--sidebar-foreground, #09090B)'
                : 'var(--sidebar-muted, var(--theme-text-secondary, #71717A))',
            fontFamily: 'var(--theme-font-body, inherit)',
            fontWeight: isActive ? 600 : 500,
            opacity: isAvailable ? 1 : 0.45,
            cursor: isAvailable ? 'pointer' : 'not-allowed',
          }}
          aria-current={isActive ? 'page' : undefined}
          aria-disabled={!isAvailable}
          title={
            isAvailable
              ? item.label
              : `${item.label} requires ${rule.requiredPhase.toUpperCase()} and role level ${rule.minRoleLevel}+`
          }
        >
          {isActive && (
            <motion.div
              layoutId={`activePill${layoutIdSuffix}`}
              className="absolute inset-0 rounded-xl"
              style={{
                background:
                  'linear-gradient(90deg, rgba(var(--theme-primary-rgb, 212,175,55), 0.16), rgba(var(--theme-primary-rgb, 212,175,55), 0.02))',
                border: '1px solid rgba(var(--theme-primary-rgb, 212,175,55), 0.25)',
                boxShadow: '0 6px 18px -12px rgba(var(--theme-primary-rgb, 212,175,55), 0.8)',
              }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
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
                background: 'var(--sidebar-primary, #D4AF37)',
              }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            />
          )}
          <span
            className="relative z-10 flex items-center justify-center w-8 h-8 rounded-lg"
            style={{
              background: isActive
                ? 'rgba(var(--theme-primary-rgb, 212,175,55), 0.18)'
                : 'rgba(0,0,0,0)',
            }}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
          </span>
          {!isCollapsed && (
            <span className="relative z-10 truncate">
              {item.label}
              {!isAvailable ? (
                <span className="ml-1 text-[10px] uppercase tracking-[0.06em]" style={{ color: 'var(--theme-text-muted, #A1A1AA)' }}>
                  Locked
                </span>
              ) : null}
            </span>
          )}
        </motion.button>
        {isCollapsed && (
          <NavTooltip
            label={item.label}
            isVisible={isHovered}
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
        background:
          'linear-gradient(180deg, rgba(var(--theme-primary-rgb, 212,175,55), 0.08) 0%, rgba(var(--theme-primary-rgb, 212,175,55), 0.02) 40%, transparent 100%), var(--sidebar, #FFFFFF)',
        borderRight: '1px solid var(--sidebar-border, #E4E4E7)',
        transition: 'width 0.35s cubic-bezier(0.22, 1, 0.36, 1), min-width 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        overflow: 'hidden',
        willChange: 'width, min-width',
        boxShadow: 'var(--theme-shadow-md, 4px 0 24px -4px rgba(0,0,0,0.06))',
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
          borderBottom: '1px solid var(--sidebar-border, #E4E4E7)',
        }}
      >
        <motion.div
          layoutId="org-logo"
          className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl"
          style={{
            background: 'var(--sidebar-primary, var(--theme-gradient-btn, #D4AF37))',
            boxShadow: 'var(--theme-shadow-md, 0 4px 12px -2px rgba(0,0,0,0.15))',
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        >
          <span
            className="text-base font-bold"
            style={{
              fontFamily: 'var(--theme-font-display, inherit)',
              color: 'var(--theme-text-inverse, #FFFFFF)',
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
                color: 'var(--sidebar-foreground, #09090B)',
                letterSpacing: '-0.01em',
                fontFamily: 'var(--theme-font-display, inherit)',
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
              color: 'var(--sidebar-muted, var(--theme-text-muted, #A1A1AA))',
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
            background: 'var(--sidebar-border, #E4E4E7)',
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
            color: 'var(--sidebar-muted, var(--theme-text-muted, #A1A1AA))',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--sidebar-accent, #F4F4F5)';
            e.currentTarget.style.color = 'var(--sidebar-foreground, #71717A)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--sidebar-muted, var(--theme-text-muted, #A1A1AA))';
          }}
        >
          <CollapseIcon className="w-4 h-4" isCollapsed={isCollapsed} />
        </button>
      </div>

      {/* User Profile - proper 40px avatar, clean layout */}
      <div
        className="flex items-center px-4 py-3 gap-3"
        style={{
          borderTop: '1px solid var(--sidebar-border, #E4E4E7)',
        }}
      >
        <div
          className="flex items-center justify-center flex-shrink-0 rounded-full w-10 h-10 text-sm font-bold"
          style={{
            background: 'var(--theme-avatar-bg, var(--sidebar-primary, #D4AF37))',
            color: 'var(--theme-text-inverse, #FFFFFF)',
            boxShadow: 'var(--theme-shadow-md, 0 4px 12px -2px rgba(0,0,0,0.15))',
          }}
        >
          {account?.first?.[0] || 'U'}{account?.last?.[0] || 'U'}
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <p
              className="truncate text-[13px] font-semibold leading-tight"
              style={{
                color: 'var(--sidebar-foreground, #09090B)',
                fontFamily: 'var(--theme-font-body, inherit)',
              }}
            >
              {account?.first || 'User'} {account?.last || 'Name'}
            </p>
            <p
              className="truncate text-xs leading-tight"
              style={{
                color: 'var(--sidebar-muted, var(--theme-text-muted, #A1A1AA))',
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

import { motion } from 'motion/react';
import { DashboardIcon, RegistryIcon, EventsIcon, SettingsIcon, LobbiOctagon } from './icons/LobbiIcons';
import type { Account, Organization } from '../data/themes';

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
  organization,
  account,
}: SidebarProps) {
  
  const menuItems = [
    { id: 'dashboard', label: 'The Front Desk', icon: DashboardIcon },
    { id: 'registry', label: 'The Registry', icon: RegistryIcon },
    { id: 'events', label: 'Events Pavilion', icon: EventsIcon },
    { id: 'settings', label: 'Guest Services', icon: SettingsIcon },
  ];

  return (
    <motion.aside
      className="fixed left-0 top-0 h-full border-r flex flex-col"
      style={{
        width: isCollapsed ? '72px' : '240px',
        background: 'linear-gradient(180deg, #1A1610 0%, #151412 100%)',
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
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: organization.theme.gradientBtn,
          }}
        >
          <span 
            className="text-xl italic"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              color: '#fff',
            }}
          >
            {organization.logoLetter}
          </span>
        </div>
        {!isCollapsed && (
          <p className="mt-3 text-xs" style={{ color: '#8A8578' }}>
            {organization.name}
          </p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all"
              style={{
                background: isActive ? `rgba(${organization.theme.primaryRgb}, 0.12)` : 'transparent',
                color: isActive ? organization.theme.primary : '#C4BCAB',
              }}
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && (
                <span className="text-sm">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t" style={{ borderColor: `rgba(${organization.theme.primaryRgb}, 0.08)` }}>
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
            style={{
              background: organization.theme.gradientBtn,
            }}
          >
            {account.first[0]}{account.last[0]}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: '#F0ECE2' }}>
                {account.first} {account.last}
              </p>
              <p className="text-xs truncate" style={{ color: '#8A8578' }}>
                {account.role}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
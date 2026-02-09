import { motion } from 'motion/react';
import {
  Home, Users, Calendar, Wallet, Mail, GraduationCap,
  Building2, MessageSquare, Globe, BarChart3, Shield,
  FileText, Settings, Zap, Bell, ChevronLeft, Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Organization, Account } from '@/app/data/themes';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  organization: Organization;
  account: Account;
}

const navigationSections = [
  {
    label: 'Main',
    items: [
      { icon: Home, label: 'The Front Desk', route: 'dashboard' },
      { icon: Users, label: 'The Registry', route: 'members' },
      { icon: Calendar, label: 'Events Pavilion', route: 'events' },
    ]
  },
  {
    label: 'Management',
    items: [
      { icon: Wallet, label: 'The Ledger', route: 'finance' },
      { icon: Mail, label: 'Campaigns', route: 'communications' },
      { icon: GraduationCap, label: 'Learning Center', route: 'learning' },
    ]
  },
  {
    label: 'Community',
    items: [
      { icon: Building2, label: 'The Board Room', route: 'governance' },
      { icon: MessageSquare, label: 'Club Lounge', route: 'community' },
      { icon: Globe, label: 'Chapters', route: 'chapters' },
    ]
  },
  {
    label: 'Tools',
    items: [
      { icon: BarChart3, label: 'Business Center', route: 'analytics' },
      { icon: Shield, label: 'The Vault', route: 'documents' },
      { icon: FileText, label: 'Room Service', route: 'reports' },
    ]
  },
  {
    label: 'Settings',
    items: [
      { icon: Settings, label: 'Guest Services', route: 'settings' },
      { icon: Zap, label: 'Integrations', route: 'integrations' },
      { icon: Bell, label: 'The Bellhop', route: 'notifications' },
    ]
  }
];

export function Sidebar({ currentPage, onNavigate, isCollapsed, onToggleCollapse, organization, account }: SidebarProps) {
  return (
    <motion.aside
      className={cn(
        'fixed left-0 top-0 h-screen border-r flex flex-col z-40 transition-all duration-300',
        isCollapsed ? 'w-[72px]' : 'w-[240px]'
      )}
      style={{
        background: 'linear-gradient(180deg, #151412 0%, #111110 100%)',
        borderColor: `rgba(${organization.theme.primaryRgb}, 0.08)`,
      }}
      initial={false}
      animate={{ width: isCollapsed ? 72 : 240 }}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[rgba(255,255,255,0.06)]">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3"
          >
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-semibold relative overflow-hidden"
              style={{ 
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                background: organization.theme.avatarBg,
              }}
            >
              {organization.logoLetter}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15), transparent)',
                }}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div 
                className="text-[13px] font-semibold text-[#F0ECE2] truncate tracking-[0.02em]"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
              >
                {organization.short}
              </div>
              <div 
                className="text-[9.5px] italic truncate"
                style={{ 
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  color: 'rgba(250,246,233,0.45)',
                }}
              >
                {organization.motto}
              </div>
            </div>
          </motion.div>
        )}
        {isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-9 h-9 mx-auto rounded-lg flex items-center justify-center text-white text-sm font-semibold"
            style={{ 
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              background: organization.theme.avatarBg,
            }}
          >
            {organization.logoLetter}
          </motion.div>
        )}
      </div>

      {/* Powered by The Lobbi */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-1.5">
            <span 
              className="text-[11px] italic"
              style={{ 
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                background: 'linear-gradient(160deg, #F5E6A3, #D4AF37, #8B7330)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              L
            </span>
            <span className="text-[8.5px] uppercase tracking-[0.15em] text-[rgba(212,175,55,0.4)]">
              Powered by The Lobbi
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-2">
        {navigationSections.map((section, sectionIndex) => (
          <div key={section.label} className={sectionIndex > 0 ? 'mt-8' : ''}>
            {!isCollapsed && (
              <div className="px-3 mb-2">
                <span 
                  className="text-[9px] font-semibold uppercase tracking-wider opacity-60"
                  style={{ color: organization.theme.primary }}
                >
                  {section.label}
                </span>
              </div>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.route;
                
                return (
                  <motion.button
                    key={item.route}
                    onClick={() => onNavigate(item.route)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative',
                      isActive
                        ? 'text-[#F5E6A3]'
                        : 'text-[#C4BCAB] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F0ECE2]'
                    )}
                    style={isActive ? {
                      background: `rgba(${organization.theme.primaryRgb}, 0.12)`,
                      color: organization.theme.primaryPale,
                    } : {}}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId={`activeTab-${organization.id}`}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-r-full"
                        style={{ background: organization.theme.primary }}
                      />
                    )}
                    <Icon 
                      className="w-5 h-5 flex-shrink-0 opacity-60" 
                      style={isActive ? { 
                        opacity: 1,
                        color: organization.theme.primary,
                      } : {}}
                    />
                    {!isCollapsed && (
                      <span className="text-sm font-medium truncate">{item.label}</span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.06)]">
        {!isCollapsed && (
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
              style={{ 
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                background: organization.theme.avatarBg,
              }}
            >
              {account.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-[#F0ECE2] font-medium truncate">{account.name}</div>
              <div className="text-[10px] text-[#9A9489] truncate">{account.email}</div>
            </div>
          </div>
        )}
        
        {/* Collapse Button */}
        <motion.button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[#C4BCAB] hover:bg-[rgba(255,255,255,0.06)] transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ChevronLeft className={cn('w-5 h-5 transition-transform', isCollapsed && 'rotate-180')} />
          {!isCollapsed && <span className="text-sm font-medium">Collapse</span>}
        </motion.button>
      </div>
    </motion.aside>
  );
}

interface TopNavProps {
  onMenuClick: () => void;
  onBellhopClick: () => void;
  organization: Organization;
  account: Account;
}

export function TopNav({ onMenuClick, onBellhopClick, organization: _organization, account: _account }: TopNavProps) {
  void _organization; void _account;
  return (
    <motion.header
      className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between px-6"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search members, events..."
            className="w-64 xl:w-96 px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold-primary/20 focus:border-gold-primary transition-all"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* The Bellhop - AI Concierge */}
        <motion.button
          onClick={onBellhopClick}
          className="relative p-2 text-gold-primary hover:bg-gold-50 rounded-lg transition-colors group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-5 h-5" />
          <motion.span
            className="absolute top-1 right-1 w-2 h-2 bg-gold-primary rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-gold-light to-gold-primary rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">JD</span>
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium text-gray-900">John Doe</div>
            <div className="text-xs text-gray-500">Administrator</div>
          </div>
        </button>
      </div>
    </motion.header>
  );
}
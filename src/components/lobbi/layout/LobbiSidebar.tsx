/**
 * LobbiSidebar - Collapsible navigation sidebar for The Lobbi
 *
 * Features:
 * - Dark gradient background
 * - Org logo with "Powered by The Lobbi" branding
 * - Section grouping with labels
 * - Active state with themed indicator
 * - Collapse/expand animation
 * - Hotel metaphor navigation items
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Home,
  Users,
  Calendar,
  Wallet,
  Mail,
  GraduationCap,
  Building2,
  MessageSquare,
  Globe,
  BarChart3,
  Shield,
  FileText,
  Settings,
  Zap,
  Bell,
  ChevronLeft,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LobbiAvatar, LobbiOrgAvatar } from '../core';

// =============================================================================
// TYPES
// =============================================================================

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  route: string;
  badge?: number | string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export interface Organization {
  id: string;
  name: string;
  shortName: string;
  motto: string;
  logoLetter: string;
  logoUrl?: string;
  theme: {
    primary: string;
    primaryRgb: string;
    avatarBg: string;
    primaryPale: string;
  };
}

export interface Account {
  name: string;
  email: string;
  initials: string;
  avatarUrl?: string;
}

export interface LobbiSidebarProps {
  currentPage: string;
  onNavigate: (route: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  organization: Organization;
  account: Account;
  sections?: NavSection[];
}

// =============================================================================
// DEFAULT NAVIGATION
// =============================================================================

const defaultNavSections: NavSection[] = [
  {
    label: 'Main',
    items: [
      { id: 'dashboard', label: 'The Front Desk', icon: Home, route: 'dashboard' },
      { id: 'members', label: 'The Registry', icon: Users, route: 'members' },
      { id: 'events', label: 'Events Pavilion', icon: Calendar, route: 'events' },
    ],
  },
  {
    label: 'Management',
    items: [
      { id: 'finance', label: 'The Ledger', icon: Wallet, route: 'finance' },
      { id: 'communications', label: 'Campaigns', icon: Mail, route: 'communications' },
      { id: 'learning', label: 'Learning Center', icon: GraduationCap, route: 'learning' },
    ],
  },
  {
    label: 'Community',
    items: [
      { id: 'governance', label: 'The Board Room', icon: Building2, route: 'governance' },
      { id: 'community', label: 'Club Lounge', icon: MessageSquare, route: 'community' },
      { id: 'chapters', label: 'Chapters', icon: Globe, route: 'chapters' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { id: 'analytics', label: 'Business Center', icon: BarChart3, route: 'analytics' },
      { id: 'documents', label: 'The Vault', icon: Shield, route: 'documents' },
      { id: 'reports', label: 'Room Service', icon: FileText, route: 'reports' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { id: 'settings', label: 'Guest Services', icon: Settings, route: 'settings' },
      { id: 'integrations', label: 'Integrations', icon: Zap, route: 'integrations' },
      { id: 'notifications', label: 'The Bellhop', icon: Bell, route: 'notifications' },
    ],
  },
];

// =============================================================================
// COMPONENT
// =============================================================================

export function LobbiSidebar({
  currentPage,
  onNavigate,
  isCollapsed = false,
  onToggleCollapse,
  organization,
  account,
  sections = defaultNavSections,
}: LobbiSidebarProps) {
  return (
    <motion.aside
      className={cn(
        'fixed left-0 top-0 h-screen border-r flex flex-col z-40',
        'transition-all duration-300'
      )}
      style={{
        background: 'linear-gradient(180deg, #151412 0%, #111110 100%)',
        borderColor: `rgba(${organization.theme.primaryRgb}, 0.08)`,
        width: isCollapsed ? '72px' : '240px',
      }}
      initial={false}
      animate={{ width: isCollapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Logo Section */}
      <div
        className="h-16 flex items-center justify-between px-4 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <LobbiOrgAvatar
                letter={organization.logoLetter}
                name={organization.name}
                src={organization.logoUrl}
                size="md"
              />
              <div className="flex flex-col min-w-0">
                <span
                  className="text-[13px] font-semibold text-cream-200 truncate"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    letterSpacing: '0.02em',
                  }}
                >
                  {organization.shortName}
                </span>
                <span
                  className="text-[9.5px] italic truncate"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: 'rgba(250,246,233,0.45)',
                  }}
                >
                  {organization.motto}
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto"
            >
              <LobbiOrgAvatar
                letter={organization.logoLetter}
                name={organization.name}
                src={organization.logoUrl}
                size="md"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Powered by The Lobbi */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 py-3 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div className="flex items-center gap-1.5">
              <span
                className="text-[11px] italic"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-2 scrollbar-hide">
        {sections.map((section, sectionIndex) => (
          <div key={section.label} className={sectionIndex > 0 ? 'mt-8' : ''}>
            {/* Section Label */}
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-3 mb-2"
                >
                  <span
                    className="text-[9px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: `rgba(${organization.theme.primaryRgb}, 0.6)` }}
                  >
                    {section.label}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav Items */}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.route;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => onNavigate(item.route)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg',
                      'transition-colors relative group',
                      isActive
                        ? 'text-cream-100'
                        : 'text-cream-600 hover:bg-white/5 hover:text-cream-200'
                    )}
                    style={
                      isActive
                        ? {
                            background: `rgba(${organization.theme.primaryRgb}, 0.12)`,
                            color: organization.theme.primaryPale,
                          }
                        : {}
                    }
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId={`activeTab-${organization.id}`}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-r-full"
                        style={{ background: organization.theme.primary }}
                      />
                    )}

                    {/* Icon */}
                    <Icon
                      className="w-5 h-5 flex-shrink-0"
                      style={
                        isActive
                          ? { color: organization.theme.primary, opacity: 1 }
                          : { opacity: 0.6 }
                      }
                    />

                    {/* Label */}
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="text-sm font-medium truncate"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Badge */}
                    {item.badge && !isCollapsed && (
                      <span
                        className="ml-auto text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          background: `rgba(${organization.theme.primaryRgb}, 0.18)`,
                          color: organization.theme.primaryPale,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div
        className="p-4 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 mb-3"
            >
              <LobbiAvatar
                name={account.name}
                src={account.avatarUrl}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-cream-200 font-medium truncate">
                  {account.name}
                </div>
                <div className="text-[10px] text-cream-800 truncate">
                  {account.email}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse Button */}
        {onToggleCollapse && (
          <motion.button
            onClick={onToggleCollapse}
            className={cn(
              'w-full flex items-center justify-center gap-2',
              'px-3 py-2 rounded-lg',
              'text-cream-600 hover:bg-white/5 transition-colors'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ChevronLeft
              className={cn(
                'w-5 h-5 transition-transform',
                isCollapsed && 'rotate-180'
              )}
            />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-medium"
                >
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </div>
    </motion.aside>
  );
}

export default LobbiSidebar;

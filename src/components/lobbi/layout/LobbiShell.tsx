/**
 * LobbiShell - Main app shell combining Sidebar, TopNav, and content area
 *
 * Features:
 * - Responsive layout with sidebar collapse
 * - Mobile drawer navigation
 * - Content area with custom scrollbar
 * - Page background styling
 */

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LobbiSidebar, Organization, Account, NavSection } from './LobbiSidebar';
import { LobbiTopNav, Breadcrumb } from './LobbiTopNav';

// =============================================================================
// TYPES
// =============================================================================

export interface LobbiShellProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (route: string) => void;
  organization: Organization;
  account: Account;
  navSections?: NavSection[];
  breadcrumbs?: Breadcrumb[];
  notificationCount?: number;
  onConciergeClick?: () => void;
  onNotificationsClick?: () => void;
  showSearch?: boolean;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function LobbiShell({
  children,
  currentPage,
  onNavigate,
  organization,
  account,
  navSections,
  breadcrumbs,
  notificationCount = 0,
  onConciergeClick,
  onNotificationsClick,
  showSearch = true,
}: LobbiShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const sidebarWidth = isSidebarCollapsed ? 72 : 240;

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <LobbiSidebar
          currentPage={currentPage}
          onNavigate={onNavigate}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          organization={organization}
          account={account}
          sections={navSections}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileDrawerOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-screen w-[280px] z-50 lg:hidden"
            >
              <LobbiSidebar
                currentPage={currentPage}
                onNavigate={(route) => {
                  onNavigate(route);
                  setIsMobileDrawerOpen(false);
                }}
                isCollapsed={false}
                organization={organization}
                account={account}
                sections={navSections}
              />

              {/* Close button */}
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className={cn(
                  'absolute top-4 right-4',
                  'p-2 rounded-lg',
                  'text-cream-600 hover:bg-white/10',
                  'transition-colors'
                )}
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <motion.div
        className="lg:transition-all lg:duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
        initial={false}
        animate={{ marginLeft: sidebarWidth }}
      >
        {/* Top Navigation */}
        <LobbiTopNav
          onMenuClick={() => setIsMobileDrawerOpen(true)}
          onConciergeClick={onConciergeClick}
          onNotificationsClick={onNotificationsClick}
          breadcrumbs={breadcrumbs}
          notificationCount={notificationCount}
          userName={account.name}
          userRole="Administrator"
          userInitials={account.initials}
          userAvatarUrl={account.avatarUrl}
          showSearch={showSearch}
        />

        {/* Page Content */}
        <main
          className={cn(
            'min-h-[calc(100vh-64px)]',
            'overflow-y-auto',
            'scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'
          )}
        >
          {children}
        </main>
      </motion.div>

      {/* Adjust for mobile - no sidebar margin */}
      <style>{`
        @media (max-width: 1023px) {
          [style*="margin-left"] {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}

export default LobbiShell;

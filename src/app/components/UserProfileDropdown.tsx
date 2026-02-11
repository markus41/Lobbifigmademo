import { motion, AnimatePresence } from 'motion/react';
import { toast } from '@/lib/notifications';
import type { Account, Organization } from '../data/themes';

interface UserProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  account: Account;
  organization: Organization;
  onNavigate?: (page: string) => void;
  canNavigateToPage?: (page: string) => boolean;
}

const menuItems = [
  {
    label: 'My Profile',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    navigateTo: 'settings',
    action: () => toast.info('Opening profile settings.'),
  },
  {
    label: 'Account Settings',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    navigateTo: 'settings',
    action: () => toast.info('Opening account settings.'),
  },
  {
    label: 'Billing & Plans',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    navigateTo: 'settings',
    action: () => toast.info('Opening billing and subscription settings.'),
  },
  {
    label: 'Help & Support',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    navigateTo: 'settings',
    action: () => toast.info('Opening support and account help options.'),
  },
];

export function UserProfileDropdown({
  isOpen,
  onClose,
  account,
  organization,
  onNavigate,
  canNavigateToPage,
}: UserProfileDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[90]"
            onClick={onClose}
          />

          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-2 w-72 rounded-xl overflow-hidden z-[100]"
            style={{
              background: 'var(--theme-bg-card, #FFFFFF)',
              boxShadow: 'var(--theme-shadow-xl, 0 20px 25px -5px rgba(0,0,0,0.1))',
              border: '1px solid var(--theme-border-light, #F4F4F5)',
            }}
          >
            {/* User Info Header */}
            <div
              className="p-4"
              style={{
                borderBottom: '1px solid var(--theme-border-light, #F4F4F5)',
                background: 'var(--theme-bg-muted, #FAFAF8)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium"
                  style={{
                    background: 'var(--theme-gradient-btn, var(--theme-primary, #D4AF37))',
                    color: 'var(--theme-text-inverse, #FFFFFF)',
                  }}
                >
                  {account?.first?.[0] || 'U'}{account?.last?.[0] || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold truncate text-base"
                    style={{
                      color: 'var(--theme-text-primary, #1A1815)',
                      fontFamily: 'var(--theme-font-display, inherit)',
                    }}
                  >
                    {account?.first} {account?.last}
                  </p>
                  <p
                    className="text-xs truncate"
                    style={{ color: 'var(--theme-text-muted, #8A8578)' }}
                  >
                    {account?.email}
                  </p>
                  <p
                    className="text-xs truncate mt-0.5"
                    style={{ color: 'var(--theme-primary, #D4AF37)' }}
                  >
                    {account?.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Organization Badge */}
            <div
              className="px-4 py-3"
              style={{ borderBottom: '1px solid var(--theme-border-light, #F4F4F5)' }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium"
                  style={{
                    background: 'var(--theme-gradient-btn, var(--theme-primary, #D4AF37))',
                    color: 'var(--theme-text-inverse, #FFFFFF)',
                  }}
                >
                  {organization.logoLetter}
                </div>
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--theme-text-primary, #1A1815)' }}
                  >
                    {organization.name}
                  </p>
                  <p
                    className="text-[10px]"
                    style={{ color: 'var(--theme-text-muted, #8A8578)' }}
                  >
                    Current Organization
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item) => {
                const isAllowed = item.navigateTo
                  ? canNavigateToPage
                    ? canNavigateToPage(item.navigateTo)
                    : true
                  : true;

                return (
                  <button
                    key={item.label}
                    className="w-full px-4 py-2.5 flex items-center gap-3 transition-colors"
                    style={{
                      background: 'transparent',
                      opacity: isAllowed ? 1 : 0.45,
                      cursor: isAllowed ? 'pointer' : 'not-allowed',
                    }}
                    onMouseEnter={(e) => {
                      if (isAllowed) {
                        e.currentTarget.style.background = 'var(--theme-bg-secondary, #F4F4F5)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                    onClick={() => {
                      if (!isAllowed) {
                        toast.warning('This action is unavailable for the current demo role or phase.');
                        return;
                      }
                      if (item.navigateTo && onNavigate) {
                        onNavigate(item.navigateTo);
                      }
                      item.action();
                      onClose();
                    }}
                    title={
                      isAllowed
                        ? item.label
                        : `${item.label} is locked by the active demo role/phase filter`
                    }
                  >
                    <span style={{ color: 'var(--theme-text-muted, #8A8578)' }}>{item.icon}</span>
                    <span
                      className="text-sm"
                      style={{ color: 'var(--theme-text-secondary, #3D3832)' }}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sign Out */}
            <div
              className="p-3"
              style={{ borderTop: '1px solid var(--theme-border-light, #F4F4F5)' }}
            >
              <button
                className="w-full py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                style={{
                  border: '1px solid var(--theme-border-light, #E4E4E7)',
                  color: 'var(--theme-text-muted, #8A8578)',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--theme-bg-secondary, #F4F4F5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
                onClick={() => {
                  localStorage.removeItem('lobbi_session');
                  toast.success('You have been signed out.');
                  onClose();
                  window.location.hash = '#landing';
                  window.location.reload();
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign Out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Member Portal - Mobile-First View
 *
 * A simplified, mobile-optimized view for standard members.
 * Focuses on essential features with touch-friendly navigation.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Organization, Account } from '../data/themes';

interface MemberPortalProps {
  organization: Organization;
  account: Account;
  onSwitchToAdmin?: () => void;
}

// ============================================================================
// TYPES
// ============================================================================

interface QuickLink {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  isRegistered: boolean;
}

interface Notification {
  id: string;
  type: 'info' | 'event' | 'payment' | 'message';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// ============================================================================
// ICONS
// ============================================================================

const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CreditCardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const FileTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const MessageIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const QrCodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// ============================================================================
// MOCK DATA
// ============================================================================

const QUICK_LINKS: QuickLink[] = [
  { id: 'events', label: 'Events', icon: <CalendarIcon className="w-6 h-6" />, badge: 3 },
  { id: 'payments', label: 'Payments', icon: <CreditCardIcon className="w-6 h-6" /> },
  { id: 'documents', label: 'Documents', icon: <FileTextIcon className="w-6 h-6" />, badge: 2 },
  { id: 'messages', label: 'Messages', icon: <MessageIcon className="w-6 h-6" />, badge: 5 },
  { id: 'profile', label: 'Profile', icon: <UserIcon className="w-6 h-6" /> },
  { id: 'membership', label: 'Card', icon: <QrCodeIcon className="w-6 h-6" /> },
];

const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: '1',
    title: 'Annual Member Gala',
    date: 'Mar 15, 2025',
    time: '6:00 PM',
    location: 'Grand Ballroom',
    isRegistered: true,
  },
  {
    id: '2',
    title: 'Professional Development Workshop',
    date: 'Mar 22, 2025',
    time: '10:00 AM',
    location: 'Conference Room A',
    isRegistered: false,
  },
  {
    id: '3',
    title: 'Networking Mixer',
    date: 'Apr 5, 2025',
    time: '5:30 PM',
    location: 'Rooftop Lounge',
    isRegistered: false,
  },
];

const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'event',
    title: 'Event Reminder',
    message: 'Annual Member Gala is in 3 days',
    time: '2h ago',
    read: false,
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment Due',
    message: 'Q2 dues payment due by March 31',
    time: '1d ago',
    read: false,
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message',
    message: 'From: Membership Committee',
    time: '2d ago',
    read: true,
  },
];

// ============================================================================
// BOTTOM NAV COMPONENT
// ============================================================================

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  primaryColor: string;
  primaryRgb: string;
}

function BottomNav({ activeTab, onTabChange, primaryColor, primaryRgb }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'events', label: 'Events', icon: CalendarIcon },
    { id: 'notifications', label: 'Alerts', icon: BellIcon, badge: 2 },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t z-50 safe-area-inset-bottom"
      style={{ borderColor: '#EDE8DD' }}
    >
      <div className="flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center flex-1 h-full"
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-colors ${isActive ? '' : 'text-gray-400'}`}
                  style={{ color: isActive ? primaryColor : undefined }}
                />
                {tab.badge && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                    style={{ background: '#DC2626' }}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 font-medium transition-colors ${
                  isActive ? '' : 'text-gray-400'
                }`}
                style={{ color: isActive ? primaryColor : undefined }}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full"
                  style={{ background: primaryColor }}
                  layoutId="bottomNavIndicator"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ============================================================================
// MEMBERSHIP CARD COMPONENT
// ============================================================================

interface MembershipCardProps {
  organization: Organization;
  account: Account;
}

function MembershipCard({ organization, account }: MembershipCardProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl p-6 text-white"
      style={{
        background: organization.theme.gradientBtn,
        boxShadow: `0 8px 32px rgba(${organization.theme.primaryRgb}, 0.3)`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
        }}
      />

      {/* Logo */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/20"
          >
            <span
              className="text-lg italic font-medium"
              style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}
            >
              {organization.logoLetter}
            </span>
          </div>
          <div>
            <p className="text-xs opacity-80">Member Since 2020</p>
            <p className="font-semibold">{organization.short}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider opacity-80">Status</p>
          <p className="text-sm font-semibold">Active</p>
        </div>
      </div>

      {/* Member Info */}
      <div className="mb-4">
        <p className="text-2xl font-light" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif' }}>
          {account.name}
        </p>
        <p className="text-sm opacity-80">{account.role}</p>
      </div>

      {/* Member ID */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-wider opacity-60">Member ID</p>
          <p className="font-mono text-sm">MBR-2024-{Math.floor(Math.random() * 9000) + 1000}</p>
        </div>
        <QrCodeIcon className="w-10 h-10 opacity-60" />
      </div>
    </motion.div>
  );
}

// ============================================================================
// HOME TAB COMPONENT
// ============================================================================

interface HomeTabProps {
  organization: Organization;
  account: Account;
  onQuickLinkClick: (id: string) => void;
}

function HomeTab({ organization, account, onQuickLinkClick }: HomeTabProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <p className="text-gray-500 text-sm">Welcome back,</p>
        <h1
          className="text-2xl font-light"
          style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}
        >
          {account.first}
        </h1>
      </div>

      {/* Membership Card */}
      <MembershipCard organization={organization} account={account} />

      {/* Quick Links Grid */}
      <div className="grid grid-cols-3 gap-3">
        {QUICK_LINKS.map((link) => (
          <motion.button
            key={link.id}
            className="relative flex flex-col items-center justify-center p-4 bg-white rounded-xl border"
            style={{ borderColor: '#EDE8DD' }}
            onClick={() => onQuickLinkClick(link.id)}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
              style={{ background: `rgba(${organization.theme.primaryRgb}, 0.1)`, color: organization.theme.primary }}
            >
              {link.icon}
            </div>
            <span className="text-xs font-medium text-gray-700">{link.label}</span>
            {link.badge && (
              <span
                className="absolute top-2 right-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{ background: organization.theme.primary }}
              >
                {link.badge}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
          <button className="text-sm" style={{ color: organization.theme.primary }}>
            View All
          </button>
        </div>
        <div className="space-y-3">
          {UPCOMING_EVENTS.slice(0, 2).map((event) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-xl border p-4"
              style={{ borderColor: '#EDE8DD' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
                  <p className="text-xs text-gray-400 mt-1">{event.location}</p>
                </div>
                {event.isRegistered ? (
                  <span
                    className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
                    style={{
                      background: `rgba(${organization.theme.primaryRgb}, 0.1)`,
                      color: organization.theme.primary,
                    }}
                  >
                    <CheckCircleIcon className="w-3 h-3" />
                    Registered
                  </span>
                ) : (
                  <button
                    className="text-xs font-medium px-3 py-1.5 rounded-full text-white"
                    style={{ background: organization.theme.gradientBtn }}
                  >
                    Register
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// NOTIFICATIONS TAB COMPONENT
// ============================================================================

interface NotificationsTabProps {
  organization: Organization;
}

function NotificationsTab({ organization }: NotificationsTabProps) {
  return (
    <div className="space-y-4">
      <h1
        className="text-2xl font-light"
        style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}
      >
        Notifications
      </h1>

      <div className="space-y-3">
        {NOTIFICATIONS.map((notification) => (
          <motion.div
            key={notification.id}
            className={`bg-white rounded-xl border p-4 ${!notification.read ? 'border-l-4' : ''}`}
            style={{
              borderColor: '#EDE8DD',
              borderLeftColor: !notification.read ? organization.theme.primary : undefined,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: `rgba(${organization.theme.primaryRgb}, 0.1)`,
                  color: organization.theme.primary,
                }}
              >
                {notification.type === 'event' && <CalendarIcon className="w-5 h-5" />}
                {notification.type === 'payment' && <CreditCardIcon className="w-5 h-5" />}
                {notification.type === 'message' && <MessageIcon className="w-5 h-5" />}
                {notification.type === 'info' && <BellIcon className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{notification.title}</p>
                  <span className="text-xs text-gray-400">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{notification.message}</p>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-300 flex-shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// PROFILE TAB COMPONENT
// ============================================================================

interface ProfileTabProps {
  organization: Organization;
  account: Account;
  onSwitchToAdmin?: () => void;
}

function ProfileTab({ organization, account, onSwitchToAdmin }: ProfileTabProps) {
  const menuItems = [
    { id: 'personal', label: 'Personal Information', icon: UserIcon },
    { id: 'membership', label: 'Membership Details', icon: CreditCardIcon },
    { id: 'documents', label: 'My Documents', icon: FileTextIcon },
    { id: 'preferences', label: 'Preferences', icon: BellIcon },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-semibold"
          style={{ background: organization.theme.gradientBtn }}
        >
          {account.initials}
        </div>
        <div>
          <h1
            className="text-xl font-light"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}
          >
            {account.name}
          </h1>
          <p className="text-sm text-gray-500">{account.role}</p>
          <p className="text-xs text-gray-400">{account.email}</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: '#EDE8DD' }}>
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              className={`w-full flex items-center gap-4 p-4 text-left ${
                index < menuItems.length - 1 ? 'border-b' : ''
              }`}
              style={{ borderColor: '#EDE8DD' }}
              whileTap={{ background: `rgba(${organization.theme.primaryRgb}, 0.05)` }}
            >
              <Icon className="w-5 h-5 text-gray-400" />
              <span className="flex-1 text-gray-700">{item.label}</span>
              <ChevronRightIcon className="w-5 h-5 text-gray-300" />
            </motion.button>
          );
        })}
      </div>

      {/* Switch to Admin View */}
      {onSwitchToAdmin && (
        <motion.button
          onClick={onSwitchToAdmin}
          className="w-full py-4 rounded-xl text-sm font-medium border-2"
          style={{
            borderColor: organization.theme.primary,
            color: organization.theme.primary,
          }}
          whileTap={{ scale: 0.98 }}
        >
          Switch to Admin View
        </motion.button>
      )}

      {/* Sign Out */}
      <button className="w-full py-3 text-center text-sm text-red-500 font-medium">
        Sign Out
      </button>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function MemberPortal({ organization, account, onSwitchToAdmin }: MemberPortalProps) {
  const [activeTab, setActiveTab] = useState('home');
  const primaryColor = organization.theme.primary;
  const primaryRgb = organization.theme.primaryRgb;

  const handleQuickLinkClick = (id: string) => {
    if (id === 'events') setActiveTab('events');
    else if (id === 'profile') setActiveTab('profile');
    // Handle other quick links
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className="sticky top-0 z-40 bg-white border-b px-4 py-3"
        style={{ borderColor: '#EDE8DD' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium"
              style={{ background: organization.theme.gradientBtn }}
            >
              {organization.logoLetter}
            </div>
            <span className="font-semibold text-gray-900">{organization.short}</span>
          </div>
          <button className="relative p-2">
            <BellIcon className="w-6 h-6 text-gray-500" />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ background: primaryColor }}
            />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <HomeTab
                organization={organization}
                account={account}
                onQuickLinkClick={handleQuickLinkClick}
              />
            </motion.div>
          )}
          {activeTab === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="space-y-4">
                <h1
                  className="text-2xl font-light"
                  style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}
                >
                  Events
                </h1>
                <div className="space-y-3">
                  {UPCOMING_EVENTS.map((event) => (
                    <motion.div
                      key={event.id}
                      className="bg-white rounded-xl border p-4"
                      style={{ borderColor: '#EDE8DD' }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
                          <p className="text-xs text-gray-400 mt-1">{event.location}</p>
                        </div>
                        {event.isRegistered ? (
                          <span
                            className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
                            style={{
                              background: `rgba(${primaryRgb}, 0.1)`,
                              color: primaryColor,
                            }}
                          >
                            <CheckCircleIcon className="w-3 h-3" />
                            Registered
                          </span>
                        ) : (
                          <button
                            className="text-xs font-medium px-3 py-1.5 rounded-full text-white"
                            style={{ background: organization.theme.gradientBtn }}
                          >
                            Register
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <NotificationsTab organization={organization} />
            </motion.div>
          )}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <ProfileTab
                organization={organization}
                account={account}
                onSwitchToAdmin={onSwitchToAdmin}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        primaryColor={primaryColor}
        primaryRgb={primaryRgb}
      />
    </div>
  );
}

export default MemberPortal;

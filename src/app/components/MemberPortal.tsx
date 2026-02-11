/**
 * Member Portal - Ultra-Premium Mobile Experience
 *
 * A jaw-droppingly beautiful, mobile-first experience with:
 * - Stunning glassmorphism effects
 * - Floating ambient orbs with glow
 * - Holographic membership card
 * - Premium micro-interactions
 * - Immersive animations throughout
 */

import { useState, useMemo, type CSSProperties } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { toast } from '@/lib/notifications';
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
  gradient: string;
}

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  isRegistered: boolean;
  attendees?: number;
  image?: string;
}

interface Notification {
  id: string;
  type: 'info' | 'event' | 'payment' | 'message' | 'achievement';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// ============================================================================
// PREMIUM ICONS - Enhanced with gradients
// ============================================================================

const HomeIcon = ({ className, filled, style }: { className?: string; filled?: boolean; style?: CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.5}>
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    {!filled && <polyline points="9 22 9 12 15 12 15 22" />}
  </svg>
);

const CalendarIcon = ({ className, filled, style }: { className?: string; filled?: boolean; style?: CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.5}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CreditCardIcon = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const BellIcon = ({ className, filled, style }: { className?: string; filled?: boolean; style?: CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.5}>
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

const UserIcon = ({ className, filled, style }: { className?: string; filled?: boolean; style?: CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={filled ? 0 : 1.5}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const FileTextIcon = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const MessageIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const QrCodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const ChevronRightIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const GiftIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <rect x="5" y="12" width="14" height="9" rx="1" />
    <line x1="12" y1="8" x2="12" y2="21" />
    <path d="M12 8c-2-3-6-3-6 0s4 3 6 0c2-3 6-3 6 0s-4 3-6 0" />
  </svg>
);

const StarIcon = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const TrophyIcon = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 9H4a2 2 0 01-2-2V4a2 2 0 012-2h2" />
    <path d="M18 9h2a2 2 0 002-2V4a2 2 0 00-2-2h-2" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0012 0V2z" />
  </svg>
);

// ============================================================================
// FLOATING ORBS - Stunning ambient background
// ============================================================================

interface FloatingOrbsProps {
  primaryRgb: string;
  count?: number;
}

function FloatingOrbs({ primaryRgb, count = 6 }: FloatingOrbsProps) {
  const orbs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 200 + 100,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.15 + 0.05,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: `radial-gradient(circle, rgba(${primaryRgb}, ${orb.opacity}) 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 50, -30, 20, 0],
            y: [0, -40, 30, -20, 0],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// GLASSMORPHIC CARD - Reusable premium container
// ============================================================================

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  glowColor?: string;
  interactive?: boolean;
  onClick?: () => void;
}

function GlassCard({ children, className = '', glow, glowColor, interactive, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative overflow-hidden
        backdrop-blur-xl
        ${className}
      `}
      onClick={onClick}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      style={{
        background: 'var(--theme-glass-bg, rgba(255,255,255,0.7))',
        border: '1px solid var(--theme-glass-border, rgba(255,255,255,0.4))',
        boxShadow: glow && glowColor
          ? `0 8px 32px ${glowColor}, 0 0 0 1px rgba(255,255,255,0.2) inset`
          : 'var(--theme-shadow-xl, 0 20px 25px -5px rgba(0,0,0,0.05))',
      }}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ background: 'linear-gradient(to bottom right, var(--theme-glass-shimmer, rgba(255,255,255,0.4)), transparent, transparent)' }} />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// ============================================================================
// MOCK DATA - Enhanced with more visual appeal
// ============================================================================

const createQuickLinks = (primaryRgb: string): QuickLink[] => [
  { id: 'events', label: 'Events', icon: <CalendarIcon className="w-6 h-6" />, badge: 3, gradient: `linear-gradient(135deg, rgba(${primaryRgb}, 0.2) 0%, rgba(${primaryRgb}, 0.05) 100%)` },
  { id: 'payments', label: 'Payments', icon: <CreditCardIcon className="w-6 h-6" />, gradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.05) 100%)' },
  { id: 'documents', label: 'Documents', icon: <FileTextIcon className="w-6 h-6" />, badge: 2, gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 100%)' },
  { id: 'messages', label: 'Messages', icon: <MessageIcon className="w-6 h-6" />, badge: 5, gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.05) 100%)' },
  { id: 'rewards', label: 'Rewards', icon: <GiftIcon className="w-6 h-6" />, gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0.05) 100%)' },
  { id: 'membership', label: 'Card', icon: <QrCodeIcon className="w-6 h-6" />, gradient: `linear-gradient(135deg, rgba(${primaryRgb}, 0.15) 0%, rgba(${primaryRgb}, 0.03) 100%)` },
];

const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: '1',
    title: 'Annual Member Gala',
    date: 'Mar 15, 2025',
    time: '6:00 PM',
    location: 'Grand Ballroom',
    isRegistered: true,
    attendees: 156,
  },
  {
    id: '2',
    title: 'Professional Development Workshop',
    date: 'Mar 22, 2025',
    time: '10:00 AM',
    location: 'Conference Room A',
    isRegistered: false,
    attendees: 42,
  },
  {
    id: '3',
    title: 'Networking Mixer',
    date: 'Apr 5, 2025',
    time: '5:30 PM',
    location: 'Rooftop Lounge',
    isRegistered: false,
    attendees: 89,
  },
];

const NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'achievement',
    title: 'Achievement Unlocked!',
    message: 'You earned the "Event Enthusiast" badge',
    time: '1h ago',
    read: false,
  },
  {
    id: '2',
    type: 'event',
    title: 'Event Reminder',
    message: 'Annual Member Gala is in 3 days',
    time: '2h ago',
    read: false,
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment Received',
    message: 'Thank you! Q1 dues payment confirmed',
    time: '1d ago',
    read: true,
  },
  {
    id: '4',
    type: 'message',
    title: 'New Message',
    message: 'From: Membership Committee',
    time: '2d ago',
    read: true,
  },
];

// ============================================================================
// PREMIUM BOTTOM NAV - Floating glassmorphism with glow
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
    <nav className="fixed bottom-4 left-4 right-4 z-50">
      <motion.div
        className="relative backdrop-blur-2xl rounded-3xl overflow-hidden"
        style={{
          background: 'var(--theme-glass-bg, rgba(255,255,255,0.8))',
          border: '1px solid var(--theme-glass-border, rgba(255,255,255,0.5))',
          boxShadow: 'var(--theme-shadow-2xl, 0 25px 50px -12px rgba(0,0,0,0.1))',
        }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        {/* Gradient top border */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, rgba(${primaryRgb}, 0.5), transparent)` }}
        />

        <div className="flex items-center justify-around h-18 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="relative flex flex-col items-center justify-center flex-1 py-3 rounded-2xl"
                whileTap={{ scale: 0.92 }}
              >
                {/* Active background glow */}
                {isActive && (
                  <motion.div
                    className="absolute inset-1 rounded-2xl"
                    style={{
                      background: `rgba(${primaryRgb}, 0.1)`,
                      boxShadow: `0 0 20px rgba(${primaryRgb}, 0.2)`,
                    }}
                    layoutId="navActiveBackground"
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  />
                )}

                <div className="relative z-10">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      y: isActive ? -2 : 0,
                    }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  >
                    <Icon
                      className={`w-6 h-6 transition-colors duration-300`}
                      filled={isActive}
                      style={{ color: isActive ? primaryColor : 'var(--theme-text-muted, #9CA3AF)' }}
                    />
                  </motion.div>

                  {/* Badge - semantic red for alerts */}
                  {tab.badge && (
                    <motion.span
                      className="absolute -top-1 -right-2 min-w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center text-white shadow-lg bg-gradient-to-br from-red-500 to-red-600 shadow-[0_2px_8px_rgba(239,68,68,0.4)]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 15, stiffness: 400 }}
                    >
                      {tab.badge}
                    </motion.span>
                  )}
                </div>

                <motion.span
                  className={`relative z-10 text-[11px] mt-1.5 font-semibold tracking-wide transition-colors duration-300`}
                  style={{ color: isActive ? primaryColor : 'var(--theme-text-muted, #9CA3AF)' }}
                  animate={{ opacity: isActive ? 1 : 0.7 }}
                >
                  {tab.label}
                </motion.span>
              </motion.button>
            );
          })}
        </div>

        {/* Safe area padding for iOS */}
        <div className="h-safe-area-inset-bottom" />
      </motion.div>
    </nav>
  );
}

// ============================================================================
// HOLOGRAPHIC MEMBERSHIP CARD - Premium 3D effect
// ============================================================================

interface MembershipCardProps {
  organization: Organization;
  account: Account;
}

function MembershipCard({ organization, account }: MembershipCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Generate a consistent member ID based on account email (deterministic hash)
  const memberId = useMemo(() => {
    // Create a simple hash from the email to generate a consistent 4-digit number
    const hash = account.email.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    const fourDigit = Math.abs(hash % 9000) + 1000;
    return `MBR-2024-${fourDigit}`;
  }, [account.email]);

  return (
    <motion.div
      className="relative perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      <div
        className="relative overflow-hidden rounded-3xl p-6 text-white"
        style={{
          background: organization.theme.gradientBtn,
          boxShadow: `
            0 25px 50px -12px rgba(${organization.theme.primaryRgb}, 0.4),
            0 0 0 1px rgba(255,255,255,0.1) inset,
            0 0 80px -20px rgba(${organization.theme.primaryRgb}, 0.3)
          `,
        }}
      >
        {/* Holographic shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              linear-gradient(105deg,
                transparent 20%,
                rgba(255,255,255,0.4) 25%,
                rgba(255,255,255,0.1) 30%,
                transparent 35%,
                transparent 65%,
                rgba(255,255,255,0.1) 70%,
                rgba(255,255,255,0.4) 75%,
                transparent 80%
              )
            `,
            backgroundSize: '250% 100%',
          }}
          animate={{
            backgroundPosition: ['200% 0%', '-200% 0%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg,
                transparent,
                transparent 8px,
                rgba(255,255,255,0.3) 8px,
                rgba(255,255,255,0.3) 16px
              )
            `,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <span
                  className="text-xl italic font-semibold"
                  style={{ fontFamily: 'var(--theme-font-display, Cormorant Garamond, Georgia, serif)' }}
                >
                  {organization.logoLetter}
                </span>
              </motion.div>
              <div>
                <p className="text-xs opacity-70 font-medium tracking-wide">MEMBER SINCE 2020</p>
                <p className="font-semibold text-lg">{organization.short}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end mb-1">
                <SparklesIcon className="w-4 h-4 text-white/80" />
                <span className="text-[10px] uppercase tracking-widest font-semibold text-white/70">Premium</span>
              </div>
              <p className="text-sm font-semibold">Active</p>
            </div>
          </div>

          {/* Member Info */}
          <div className="mb-6">
            <motion.p
              className="text-3xl font-light tracking-tight"
              style={{ fontFamily: 'var(--theme-font-display, Cormorant Garamond, Georgia, serif)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {account.name}
            </motion.p>
            <p className="text-sm opacity-70 font-medium mt-1">{account.role}</p>
          </div>

          {/* Member ID & QR */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-50 font-medium">Member ID</p>
              <p className="font-mono text-sm font-semibold tracking-wider">{memberId}</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20"
            >
              <QrCodeIcon className="w-8 h-8 opacity-80" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// QUICK LINK CARD - Premium micro-interaction
// ============================================================================

interface QuickLinkCardProps {
  link: QuickLink;
  primaryColor: string;
  primaryRgb: string;
  index: number;
  onClick: () => void;
}

function QuickLinkCard({ link, primaryColor, primaryRgb, index, onClick }: QuickLinkCardProps) {
  return (
    <motion.button
      className="relative flex flex-col items-center justify-center p-4 rounded-2xl backdrop-blur-xl overflow-hidden"
      style={{
        background: 'var(--theme-glass-bg, rgba(255,255,255,0.6))',
        border: '1px solid var(--theme-glass-border, rgba(255,255,255,0.4))',
        boxShadow: 'var(--theme-shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.05))',
      }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.05, type: "spring", damping: 20 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{ background: link.gradient }}
      />

      {/* Icon container with glow */}
      <motion.div
        className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center mb-2"
        style={{
          background: `rgba(${primaryRgb}, 0.12)`,
          color: primaryColor,
          boxShadow: `0 4px 12px rgba(${primaryRgb}, 0.15)`,
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: `0 8px 24px rgba(${primaryRgb}, 0.25)`,
        }}
      >
        {link.icon}
      </motion.div>

      <span className="relative z-10 text-xs font-semibold" style={{ color: 'var(--theme-text-secondary, #374151)' }}>{link.label}</span>

      {/* Badge */}
      {link.badge && (
        <motion.span
          className="absolute top-2 right-2 min-w-[20px] h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white shadow-lg px-1"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
            boxShadow: `0 2px 8px rgba(${primaryRgb}, 0.4)`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.05 + 0.3, type: "spring", damping: 15 }}
        >
          {link.badge}
        </motion.span>
      )}
    </motion.button>
  );
}

// ============================================================================
// EVENT CARD - Stunning visual design
// ============================================================================

interface EventCardProps {
  event: UpcomingEvent;
  organization: Organization;
  index: number;
}

function EventCard({ event, organization, index }: EventCardProps) {
  const primaryColor = organization.theme.primary;
  const primaryRgb = organization.theme.primaryRgb;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileTap={{ scale: 0.98 }}
    >
      <GlassCard className="rounded-2xl p-4" interactive>
        <div className="flex items-start gap-4">
          {/* Date badge */}
          <motion.div
            className="flex-shrink-0 w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white"
            style={{
              background: organization.theme.gradientBtn,
              boxShadow: `0 4px 16px rgba(${primaryRgb}, 0.3)`,
            }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <span className="text-lg font-bold leading-none">{event.date.split(' ')[1].replace(',', '')}</span>
            <span className="text-[10px] uppercase font-medium opacity-80">{event.date.split(' ')[0]}</span>
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold leading-tight" style={{ color: 'var(--theme-text-primary, #111827)' }}>{event.title}</h3>
            <p className="text-sm mt-0.5" style={{ color: 'var(--theme-text-secondary, #6B7280)' }}>{event.time} • {event.location}</p>

            {/* Attendees */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full"
                    style={{
                      zIndex: 3 - i,
                      border: '2px solid var(--theme-bg-card, #FFFFFF)',
                      background: 'var(--theme-avatar-placeholder, linear-gradient(to bottom right, #E5E7EB, #D1D5DB))',
                    }}
                  />
                ))}
              </div>
              <span className="text-xs font-medium" style={{ color: 'var(--theme-text-muted, #9CA3AF)' }}>
                +{event.attendees} attending
              </span>
            </div>
          </div>

          {/* Action */}
          {event.isRegistered ? (
            <motion.span
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: `rgba(${primaryRgb}, 0.1)`,
                color: primaryColor,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <CheckCircleIcon className="w-3.5 h-3.5" />
              Registered
            </motion.span>
          ) : (
            <motion.button
              className="text-xs font-semibold px-4 py-2 rounded-full text-white shadow-lg"
              style={{
                background: organization.theme.gradientBtn,
                boxShadow: `0 4px 12px rgba(${primaryRgb}, 0.3)`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                toast.success(`Registration confirmed! You're registered for "${event.title}" on ${event.date} at ${event.time}.`);
              }}
            >
              Register
            </motion.button>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ============================================================================
// HOME TAB - Immersive experience
// ============================================================================

interface HomeTabProps {
  organization: Organization;
  account: Account;
  onQuickLinkClick: (id: string) => void;
  onViewAllEvents: () => void;
}

function HomeTab({ organization, account, onQuickLinkClick, onViewAllEvents }: HomeTabProps) {
  const quickLinks = useMemo(() => createQuickLinks(organization.theme.primaryRgb), [organization.theme.primaryRgb]);
  const primaryColor = organization.theme.primary;
  const primaryRgb = organization.theme.primaryRgb;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <motion.p
            className="text-sm font-medium"
            style={{ color: 'var(--theme-text-secondary, #6B7280)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Welcome back,
          </motion.p>
          <motion.h1
            className="text-3xl font-light tracking-tight"
            style={{ fontFamily: 'var(--theme-font-display, Cormorant Garamond, Georgia, serif)', color: 'var(--theme-text-primary, #1F2937)' }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {account.first} ✨
          </motion.h1>
        </div>

        {/* Points badge */}
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-2xl border"
          style={{
            background: `linear-gradient(to right, rgba(${primaryRgb}, 0.06), rgba(${primaryRgb}, 0.03))`,
            borderColor: `rgba(${primaryRgb}, 0.15)`,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <StarIcon className="w-5 h-5" style={{ color: primaryColor }} />
          <div className="text-right">
            <p className="text-sm font-bold" style={{ color: primaryColor }}>2,450</p>
            <p className="text-[10px] font-medium" style={{ color: `rgba(${primaryRgb}, 0.7)` }}>Points</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Membership Card */}
      <MembershipCard organization={organization} account={account} />

      {/* Quick Links Grid */}
      <div className="grid grid-cols-3 gap-3">
        {quickLinks.map((link, index) => (
          <QuickLinkCard
            key={link.id}
            link={link}
            primaryColor={primaryColor}
            primaryRgb={primaryRgb}
            index={index}
            onClick={() => onQuickLinkClick(link.id)}
          />
        ))}
      </div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ color: 'var(--theme-text-primary, #111827)' }}>Upcoming Events</h2>
          <motion.button
            className="text-sm font-semibold flex items-center gap-1"
            style={{ color: primaryColor }}
            whileHover={{ x: 3 }}
            onClick={onViewAllEvents}
          >
            View All
            <ChevronRightIcon className="w-4 h-4" />
          </motion.button>
        </div>
        <div className="space-y-3">
          {UPCOMING_EVENTS.slice(0, 2).map((event, index) => (
            <EventCard key={event.id} event={event} organization={organization} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// NOTIFICATIONS TAB - Premium design
// ============================================================================

interface NotificationsTabProps {
  organization: Organization;
}

function NotificationsTab({ organization }: NotificationsTabProps) {
  const primaryColor = organization.theme.primary;
  const primaryRgb = organization.theme.primaryRgb;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'achievement': return <TrophyIcon className="w-5 h-5" />;
      case 'event': return <CalendarIcon className="w-5 h-5" />;
      case 'payment': return <CreditCardIcon className="w-5 h-5" />;
      case 'message': return <MessageIcon className="w-5 h-5" />;
      default: return <BellIcon className="w-5 h-5" />;
    }
  };

  const getNotificationGradient = (type: Notification['type']) => {
    switch (type) {
      case 'achievement': return 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)';
      case 'event': return `linear-gradient(135deg, rgba(${primaryRgb}, 0.15) 0%, rgba(${primaryRgb}, 0.05) 100%)`;
      case 'payment': return 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)';
      case 'message': return 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(79, 70, 229, 0.05) 100%)';
      default: return `linear-gradient(135deg, rgba(${primaryRgb}, 0.15) 0%, rgba(${primaryRgb}, 0.05) 100%)`;
    }
  };

  return (
    <div className="space-y-6">
      <motion.h1
        className="text-3xl font-light tracking-tight"
        style={{ fontFamily: 'var(--theme-font-display, Cormorant Garamond, Georgia, serif)', color: 'var(--theme-text-primary, #1F2937)' }}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        Notifications
      </motion.h1>

      <div className="space-y-3">
        {NOTIFICATIONS.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard
              className={`rounded-2xl p-4 ${!notification.read ? 'border-l-4' : ''}`}
              glow={!notification.read}
              glowColor={`rgba(${primaryRgb}, 0.1)`}
              interactive
            >
              <div
                className="absolute inset-0 opacity-40 rounded-2xl"
                style={{
                  background: getNotificationGradient(notification.type),
                  borderLeftColor: !notification.read ? primaryColor : undefined,
                }}
              />

              <div className="relative z-10 flex items-start gap-3">
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `rgba(${primaryRgb}, 0.12)`,
                    color: primaryColor,
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {getNotificationIcon(notification.type)}
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold" style={{ color: 'var(--theme-text-primary, #111827)' }}>{notification.title}</p>
                    <span className="text-xs font-medium" style={{ color: 'var(--theme-text-muted, #9CA3AF)' }}>{notification.time}</span>
                  </div>
                  <p className="text-sm mt-0.5 line-clamp-2" style={{ color: 'var(--theme-text-secondary, #6B7280)' }}>{notification.message}</p>
                </div>

                <ChevronRightIcon className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--theme-text-muted, #D1D5DB)' }} />
              </div>

              {/* Unread indicator dot */}
              {!notification.read && (
                <motion.div
                  className="absolute top-4 left-4 w-2.5 h-2.5 rounded-full"
                  style={{
                    background: primaryColor,
                    boxShadow: `0 0 8px ${primaryColor}`,
                  }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// PROFILE TAB - Elegant design
// ============================================================================

interface ProfileTabProps {
  organization: Organization;
  account: Account;
  onSwitchToAdmin?: () => void;
}

function ProfileTab({ organization, account, onSwitchToAdmin }: ProfileTabProps) {
  const primaryColor = organization.theme.primary;
  const primaryRgb = organization.theme.primaryRgb;

  const menuItems = [
    { id: 'personal', label: 'Personal Information', icon: UserIcon, description: 'Name, email, phone', action: () => toast.info('Edit your profile details, contact information, and preferences.') },
    { id: 'membership', label: 'Membership Details', icon: CreditCardIcon, description: 'Plan, billing, renewal', action: () => toast.info('Status: Premium Member | Renewal: January 2026 | Payment: **** 4242') },
    { id: 'documents', label: 'My Documents', icon: FileTextIcon, description: 'Certificates, receipts', action: () => toast.info('Membership Certificate, Tax Receipt 2024, Event Confirmations, Meeting Minutes') },
    { id: 'preferences', label: 'Preferences', icon: BellIcon, description: 'Notifications, privacy', action: () => toast.info('Manage your notification settings, privacy options, and communication preferences.') },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-semibold shadow-xl"
            style={{
              background: organization.theme.gradientBtn,
              boxShadow: `0 8px 24px rgba(${primaryRgb}, 0.35)`,
            }}
          >
            {account.initials}
          </div>
          {/* Status indicator */}
          <div
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-[3px] border-white flex items-center justify-center"
          >
            <CheckCircleIcon className="w-3.5 h-3.5 text-white" />
          </div>
        </motion.div>

        <div className="flex-1">
          <h1
            className="text-2xl font-light tracking-tight"
            style={{ fontFamily: 'var(--theme-font-display, Cormorant Garamond, Georgia, serif)', color: 'var(--theme-text-primary, #1F2937)' }}
          >
            {account.name}
          </h1>
          <p className="text-sm font-medium" style={{ color: 'var(--theme-text-secondary, #6B7280)' }}>{account.role}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--theme-text-muted, #9CA3AF)' }}>{account.email}</p>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        className="grid grid-cols-3 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { label: 'Events', value: '12', icon: CalendarIcon },
          { label: 'Points', value: '2.4K', icon: StarIcon },
          { label: 'Years', value: '5', icon: TrophyIcon },
        ].map((stat) => (
          <GlassCard key={stat.label} className="rounded-2xl p-4 text-center">
            <stat.icon className="w-5 h-5 mx-auto mb-2" style={{ color: primaryColor }} />
            <p className="text-xl font-bold" style={{ color: 'var(--theme-text-primary, #111827)' }}>{stat.value}</p>
            <p className="text-xs font-medium" style={{ color: 'var(--theme-text-secondary, #6B7280)' }}>{stat.label}</p>
          </GlassCard>
        ))}
      </motion.div>

      {/* Menu Items */}
      <GlassCard className="rounded-2xl overflow-hidden">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              className="w-full flex items-center gap-4 p-4 text-left"
              style={{
                borderBottom: index < menuItems.length - 1 ? '1px solid var(--theme-border-light, #F3F4F6)' : undefined,
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              whileHover={{ background: `rgba(${primaryRgb}, 0.03)` }}
              whileTap={{ scale: 0.99 }}
              onClick={item.action}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `rgba(${primaryRgb}, 0.08)` }}
              >
                <Icon className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
              <div className="flex-1">
                <span className="font-medium" style={{ color: 'var(--theme-text-primary, #1F2937)' }}>{item.label}</span>
                <p className="text-xs" style={{ color: 'var(--theme-text-muted, #9CA3AF)' }}>{item.description}</p>
              </div>
              <ChevronRightIcon className="w-5 h-5" style={{ color: 'var(--theme-text-muted, #D1D5DB)' }} />
            </motion.button>
          );
        })}
      </GlassCard>

      {/* Switch to Admin View */}
      {onSwitchToAdmin && (
        <motion.button
          onClick={onSwitchToAdmin}
          className="w-full py-4 rounded-2xl text-sm font-semibold border-2 backdrop-blur-sm"
          style={{
            borderColor: primaryColor,
            color: primaryColor,
            background: `rgba(${primaryRgb}, 0.05)`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{
            scale: 1.01,
            background: `rgba(${primaryRgb}, 0.1)`,
          }}
          whileTap={{ scale: 0.98 }}
        >
          Switch to Admin View
        </motion.button>
      )}

      {/* Sign Out */}
      <motion.button
        className="w-full py-3 text-center text-sm text-red-500 font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          toast.success('You have been signed out. Returning to login page...');
        }}
      >
        Sign Out
      </motion.button>
    </div>
  );
}

// ============================================================================
// EVENTS TAB - Full events view
// ============================================================================

interface EventsTabProps {
  organization: Organization;
}

function EventsTab({ organization }: EventsTabProps) {
  void organization.theme.primary;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h1
          className="text-3xl font-light tracking-tight"
          style={{ fontFamily: 'var(--theme-font-display, Cormorant Garamond, Georgia, serif)', color: 'var(--theme-text-primary, #1F2937)' }}
        >
          Events
        </h1>
        <motion.button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
          style={{
            background: organization.theme.gradientBtn,
            color: 'white',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => toast.info('Switching to calendar view to see all events by date.')}
        >
          <CalendarIcon className="w-4 h-4" />
          Calendar
        </motion.button>
      </motion.div>

      {/* Filter chips */}
      <motion.div
        className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {['All Events', 'Registered', 'Upcoming', 'Past'].map((filter, index) => (
          <motion.button
            key={filter}
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
            style={index === 0
              ? { background: organization.theme.gradientBtn, color: 'var(--theme-text-inverse, #FFFFFF)' }
              : { background: 'var(--theme-glass-bg, rgba(255,255,255,0.6))', color: 'var(--theme-text-secondary, #4B5563)', border: '1px solid var(--theme-glass-border, rgba(255,255,255,0.4))' }
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toast.info(`Filtering: showing ${filter.toLowerCase()} events.`)}
          >
            {filter}
          </motion.button>
        ))}
      </motion.div>

      <div className="space-y-3">
        {UPCOMING_EVENTS.map((event, index) => (
          <EventCard key={event.id} event={event} organization={organization} index={index} />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// PREMIUM HEADER - Floating glass design
// ============================================================================

interface HeaderProps {
  organization: Organization;
  primaryRgb: string;
  onSwitchToAdmin?: () => void;
}

function Header({ organization, primaryRgb, onSwitchToAdmin }: HeaderProps) {
  return (
    <motion.header
      className="sticky top-0 z-40 px-4 py-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="backdrop-blur-2xl rounded-2xl px-4 py-3" style={{ background: 'var(--theme-glass-bg, rgba(255,255,255,0.7))', border: '1px solid var(--theme-glass-border, rgba(255,255,255,0.4))', boxShadow: 'var(--theme-shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.05))' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Back to Admin Button */}
            {onSwitchToAdmin && (
              <motion.button
                onClick={onSwitchToAdmin}
                className="p-2 rounded-xl"
                style={{ background: 'var(--theme-glass-bg, rgba(255,255,255,0.6))', border: '1px solid var(--theme-glass-border, rgba(255,255,255,0.4))', color: 'var(--theme-text-secondary, #4B5563)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Back to Admin"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </motion.button>
            )}
            <motion.div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-semibold shadow-lg"
              style={{
                background: organization.theme.gradientBtn,
                boxShadow: `0 4px 12px rgba(${primaryRgb}, 0.3)`,
              }}
              whileHover={{ scale: 1.05, rotate: 3 }}
            >
              {organization.logoLetter}
            </motion.div>
            <div>
              <span className="font-semibold" style={{ color: 'var(--theme-text-primary, #111827)' }}>{organization.short}</span>
              <p className="text-[10px] font-medium" style={{ color: 'var(--theme-text-muted, #9CA3AF)' }}>Member Portal</p>
            </div>
          </div>

          <motion.button
            className="relative p-2.5 rounded-xl"
            style={{ background: 'var(--theme-glass-bg, rgba(255,255,255,0.6))', border: '1px solid var(--theme-glass-border, rgba(255,255,255,0.4))' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BellIcon className="w-5 h-5" style={{ color: 'var(--theme-text-secondary, #4B5563)' }} />
            <motion.span
              className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full"
              style={{
                background: organization.theme.primary,
                boxShadow: `0 0 8px ${organization.theme.primary}`,
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}

// ============================================================================
// MAIN COMPONENT - The Portal Experience
// ============================================================================

export function MemberPortal({ organization, account, onSwitchToAdmin }: MemberPortalProps) {
  const [activeTab, setActiveTab] = useState('home');
  const primaryColor = organization.theme.primary;
  const primaryRgb = organization.theme.primaryRgb;

  const handleQuickLinkClick = (id: string) => {
    if (id === 'events') setActiveTab('events');
    else if (id === 'profile') setActiveTab('profile');
    else if (id === 'payments') toast.info('View payment history, upcoming dues, and manage payment methods.');
    else if (id === 'documents') toast.info('2 new documents available: Annual Report 2024, Membership Certificate');
    else if (id === 'messages') toast.info('5 unread messages from: Membership Committee, Events Team, President\'s Office');
    else if (id === 'rewards') toast.info('You have 2,450 points! Redeem for exclusive member perks and experiences.');
    else if (id === 'membership') toast.info('Your digital membership card with QR code for event check-in.');
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--theme-bg-primary, linear-gradient(to bottom right, #f8fafc, #f9fafb, #f5f5f4))' }}>
      {/* Floating ambient orbs */}
      <FloatingOrbs primaryRgb={primaryRgb} count={5} />

      {/* Gradient mesh background */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(${primaryRgb}, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(${primaryRgb}, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.8) 0%, transparent 80%)
          `,
        }}
      />

      {/* Header */}
      <Header organization={organization} primaryRgb={primaryRgb} onSwitchToAdmin={onSwitchToAdmin} />

      {/* Main Content */}
      <main className="relative z-10 px-4 py-4 pb-28">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <HomeTab
                organization={organization}
                account={account}
                onQuickLinkClick={handleQuickLinkClick}
                onViewAllEvents={() => setActiveTab('events')}
              />
            </motion.div>
          )}
          {activeTab === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <EventsTab organization={organization} />
            </motion.div>
          )}
          {activeTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <NotificationsTab organization={organization} />
            </motion.div>
          )}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
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

      {/* Premium Bottom Navigation */}
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

/**
 * Dashboard - The Front Desk
 *
 * Enhanced KPI cards with revenue, events, donations, and position history.
 * Provides contextual overview of organization metrics.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Organization, Account } from '../data/themes';

interface DashboardProps {
  organization?: Organization;
  account?: Account;
}

// ============================================================================
// TYPES
// ============================================================================

interface KpiCard {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  trend: 'up' | 'down' | 'neutral';
  history: { date: string; value: number }[];
  icon: React.ReactNode;
  category: 'revenue' | 'events' | 'donations' | 'members';
}

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

interface RecentActivity {
  id: string;
  type: 'member' | 'event' | 'payment' | 'document';
  title: string;
  description: string;
  time: string;
  avatar?: string;
}

// ============================================================================
// ICONS
// ============================================================================

const DollarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
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

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const TrendUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const TrendDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SendIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
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

const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 01-3.46 0" />
  </svg>
);

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_KPI_CARDS: KpiCard[] = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '$284,500',
    change: 12.5,
    changeLabel: 'vs last month',
    trend: 'up',
    history: [
      { date: '2024-01', value: 245000 },
      { date: '2024-02', value: 252000 },
      { date: '2024-03', value: 268000 },
      { date: '2024-04', value: 275000 },
      { date: '2024-05', value: 284500 },
    ],
    icon: <DollarIcon className="w-5 h-5" />,
    category: 'revenue',
  },
  {
    id: 'events',
    label: 'Upcoming Events',
    value: '24',
    change: 8,
    changeLabel: 'new this week',
    trend: 'up',
    history: [
      { date: '2024-01', value: 18 },
      { date: '2024-02', value: 22 },
      { date: '2024-03', value: 19 },
      { date: '2024-04', value: 21 },
      { date: '2024-05', value: 24 },
    ],
    icon: <CalendarIcon className="w-5 h-5" />,
    category: 'events',
  },
  {
    id: 'donations',
    label: 'Donations YTD',
    value: '$45,200',
    change: 23.4,
    changeLabel: 'vs last year',
    trend: 'up',
    history: [
      { date: '2024-01', value: 8500 },
      { date: '2024-02', value: 17200 },
      { date: '2024-03', value: 28400 },
      { date: '2024-04', value: 36800 },
      { date: '2024-05', value: 45200 },
    ],
    icon: <HeartIcon className="w-5 h-5" />,
    category: 'donations',
  },
  {
    id: 'members',
    label: 'Active Members',
    value: '1,284',
    change: -2.1,
    changeLabel: 'vs last month',
    trend: 'down',
    history: [
      { date: '2024-01', value: 1312 },
      { date: '2024-02', value: 1298 },
      { date: '2024-03', value: 1305 },
      { date: '2024-04', value: 1311 },
      { date: '2024-05', value: 1284 },
    ],
    icon: <UsersIcon className="w-5 h-5" />,
    category: 'members',
  },
];

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'add-member',
    label: 'Add Member',
    description: 'Register a new member',
    icon: <PlusIcon className="w-5 h-5" />,
  },
  {
    id: 'send-message',
    label: 'Send Message',
    description: 'Broadcast to members',
    icon: <SendIcon className="w-5 h-5" />,
  },
  {
    id: 'create-event',
    label: 'Create Event',
    description: 'Schedule new event',
    icon: <CalendarIcon className="w-5 h-5" />,
  },
  {
    id: 'upload-document',
    label: 'Upload Document',
    description: 'Add to vault',
    icon: <FileTextIcon className="w-5 h-5" />,
  },
];

const RECENT_ACTIVITIES: RecentActivity[] = [
  {
    id: '1',
    type: 'member',
    title: 'New Member Registration',
    description: 'James Wilson joined as Professional Member',
    time: '5 minutes ago',
  },
  {
    id: '2',
    type: 'event',
    title: 'Event Registration',
    description: '15 new registrations for Annual Gala',
    time: '1 hour ago',
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment Received',
    description: '$2,500 membership renewal from Sarah Chen',
    time: '2 hours ago',
  },
  {
    id: '4',
    type: 'document',
    title: 'Document Uploaded',
    description: 'Q1 Financial Report added to The Vault',
    time: '3 hours ago',
  },
  {
    id: '5',
    type: 'member',
    title: 'Position Change',
    description: 'Emily Rodriguez promoted to Board Member',
    time: '1 day ago',
  },
];

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: number;
  type: 'gala' | 'meeting' | 'workshop' | 'networking';
}

const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: '1',
    title: 'Annual Gala 2025',
    date: 'Feb 15',
    time: '7:00 PM',
    attendees: 124,
    type: 'gala',
  },
  {
    id: '2',
    title: 'Board Meeting',
    date: 'Feb 20',
    time: '2:00 PM',
    attendees: 12,
    type: 'meeting',
  },
  {
    id: '3',
    title: 'Leadership Workshop',
    date: 'Feb 25',
    time: '10:00 AM',
    attendees: 45,
    type: 'workshop',
  },
  {
    id: '4',
    title: 'New Member Orientation',
    date: 'Feb 28',
    time: '10:00 AM',
    attendees: 8,
    type: 'networking',
  },
];

interface MemberStat {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

const MEMBER_STATS: MemberStat[] = [
  { label: 'Premium', value: 342, percentage: 27, color: '#D4AF37' },
  { label: 'Professional', value: 518, percentage: 40, color: '#8B7330' },
  { label: 'Standard', value: 289, percentage: 23, color: '#B8B0A0' },
  { label: 'Student', value: 135, percentage: 10, color: '#E5DFD1' },
];

// ============================================================================
// SPARKLINE COMPONENT
// ============================================================================

interface SparklineProps {
  data: { date: string; value: number }[];
  color: string;
  trend: 'up' | 'down' | 'neutral';
}

function Sparkline({ data, color, trend }: SparklineProps) {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((d.value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg className="w-full h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${trend}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <polygon
        points={`0,100 ${points} 100,100`}
        fill={`url(#gradient-${trend})`}
      />
    </svg>
  );
}

// ============================================================================
// KPI CARD COMPONENT
// ============================================================================

interface KpiCardComponentProps {
  card: KpiCard;
  primaryColor: string;
  primaryRgb: string;
}

function KpiCardComponent({ card, primaryColor, primaryRgb }: KpiCardComponentProps) {
  const [showHistory, setShowHistory] = useState(false);
  const trendColor = card.trend === 'up' ? '#16A34A' : card.trend === 'down' ? '#DC2626' : '#6B7280';

  return (
    <motion.div
      className="bg-white rounded-xl border p-5 cursor-pointer relative overflow-hidden"
      style={{ borderColor: '#EDE8DD' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, boxShadow: `0 8px 24px rgba(${primaryRgb}, 0.12)` }}
      onClick={() => setShowHistory(!showHistory)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `rgba(${primaryRgb}, 0.1)`, color: primaryColor }}
        >
          {card.icon}
        </div>
        <div className="flex items-center gap-1" style={{ color: trendColor }}>
          {card.trend === 'up' ? (
            <TrendUpIcon className="w-4 h-4" />
          ) : card.trend === 'down' ? (
            <TrendDownIcon className="w-4 h-4" />
          ) : null}
          <span className="text-sm font-medium">
            {card.trend === 'up' ? '+' : ''}
            {card.change}%
          </span>
        </div>
      </div>

      {/* Value */}
      <div className="mb-2">
        <p className="text-sm text-gray-500 mb-1">{card.label}</p>
        <p className="text-2xl font-bold text-gray-900">{card.value}</p>
      </div>

      {/* Change Label */}
      <p className="text-xs text-gray-400">{card.changeLabel}</p>

      {/* Sparkline */}
      <div className="mt-4">
        <Sparkline data={card.history} color={primaryColor} trend={card.trend} />
      </div>

      {/* History Popover */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            className="absolute inset-0 bg-white p-5 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-gray-900">{card.label} History</p>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHistory(false);
                }}
              >
                &times;
              </button>
            </div>
            <div className="space-y-2">
              {card.history.map((h, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {new Date(h.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                  <span className="font-medium" style={{ color: primaryColor }}>
                    {card.category === 'revenue' || card.category === 'donations'
                      ? `$${h.value.toLocaleString()}`
                      : h.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================================================
// ACTIVITY TYPE ICONS
// ============================================================================

function getActivityIcon(type: RecentActivity['type']) {
  switch (type) {
    case 'member':
      return <UsersIcon className="w-4 h-4" />;
    case 'event':
      return <CalendarIcon className="w-4 h-4" />;
    case 'payment':
      return <DollarIcon className="w-4 h-4" />;
    case 'document':
      return <FileTextIcon className="w-4 h-4" />;
    default:
      return <BellIcon className="w-4 h-4" />;
  }
}

function getEventTypeStyles(type: UpcomingEvent['type']) {
  switch (type) {
    case 'gala':
      return { bg: '#FEF3C7', text: '#92400E', label: 'Gala' };
    case 'meeting':
      return { bg: '#DBEAFE', text: '#1E40AF', label: 'Meeting' };
    case 'workshop':
      return { bg: '#D1FAE5', text: '#065F46', label: 'Workshop' };
    case 'networking':
      return { bg: '#FCE7F3', text: '#9D174D', label: 'Networking' };
    default:
      return { bg: '#F3F4F6', text: '#374151', label: 'Event' };
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function Dashboard({ organization, account }: DashboardProps) {
  // Default theme values if no org selected
  const primaryColor = organization?.theme.primary || '#D4AF37';
  const primaryRgb = organization?.theme.primaryRgb || '212,175,55';
  const gradientBtn = organization?.theme.gradientBtn || 'linear-gradient(135deg, #8B7330, #D4AF37)';
  const userName = account?.first || 'Guest';

  return (
    <div className="p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <motion.h1
          className="text-3xl font-light mb-2"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            color: '#2C2A25',
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome back, {userName}
        </motion.h1>
        <motion.p
          className="text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Here's what's happening at {organization?.short || 'your organization'} today
        </motion.p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {MOCK_KPI_CARDS.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <KpiCardComponent
              card={card}
              primaryColor={primaryColor}
              primaryRgb={primaryRgb}
            />
          </motion.div>
        ))}
      </div>

      {/* Quick Actions, Member Breakdown & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Actions */}
        <motion.div
          className="bg-white rounded-xl border p-6"
          style={{ borderColor: '#EDE8DD' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) => (
              <motion.button
                key={action.id}
                className="p-4 rounded-lg border text-left transition-colors"
                style={{ borderColor: '#EDE8DD' }}
                whileHover={{
                  backgroundColor: `rgba(${primaryRgb}, 0.05)`,
                  borderColor: primaryColor,
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                  style={{ background: `rgba(${primaryRgb}, 0.1)`, color: primaryColor }}
                >
                  {action.icon}
                </div>
                <p className="font-medium text-gray-900 text-sm">{action.label}</p>
                <p className="text-xs text-gray-500">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Member Breakdown */}
        <motion.div
          className="bg-white rounded-xl border p-6"
          style={{ borderColor: '#EDE8DD' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Membership Tiers</h2>

          {/* Donut Chart Placeholder */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              {MEMBER_STATS.reduce((acc, stat, i) => {
                const offset = acc.offset;
                const dashArray = stat.percentage;
                const dashOffset = 100 - offset;
                acc.elements.push(
                  <circle
                    key={stat.label}
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke={stat.color}
                    strokeWidth="4"
                    strokeDasharray={`${dashArray} ${100 - dashArray}`}
                    strokeDashoffset={-dashOffset}
                    className="transition-all duration-500"
                  />
                );
                acc.offset = offset + stat.percentage;
                return acc;
              }, { elements: [] as JSX.Element[], offset: 0 }).elements}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900">1,284</p>
                <p className="text-[10px] text-gray-500">Total</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {MEMBER_STATS.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: stat.color }}
                  />
                  <span className="text-xs text-gray-600">{stat.label}</span>
                </div>
                <span className="text-xs font-medium text-gray-900">{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="lg:col-span-2 bg-white rounded-xl border p-6"
          style={{ borderColor: '#EDE8DD' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button
              className="text-sm font-medium transition-colors"
              style={{ color: primaryColor }}
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {RECENT_ACTIVITIES.map((activity, i) => (
              <motion.div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `rgba(${primaryRgb}, 0.1)`, color: primaryColor }}
                >
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{activity.title}</p>
                  <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <motion.div
        className="mt-6 bg-white rounded-xl border p-6"
        style={{ borderColor: '#EDE8DD' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
          <button
            className="text-sm font-medium transition-colors"
            style={{ color: primaryColor }}
          >
            View Calendar
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {UPCOMING_EVENTS.map((event, i) => {
            const typeStyles = getEventTypeStyles(event.type);
            return (
              <motion.div
                key={event.id}
                className="p-4 rounded-lg border hover:shadow-md transition-all cursor-pointer"
                style={{ borderColor: '#EDE8DD' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide"
                    style={{ background: typeStyles.bg, color: typeStyles.text }}
                  >
                    {typeStyles.label}
                  </span>
                  <span className="text-xs text-gray-400">{event.attendees} attending</span>
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CalendarIcon className="w-3 h-3" />
                  <span>{event.date}</span>
                  <span>•</span>
                  <span>{event.time}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Position History Summary */}
      <motion.div
        className="mt-6 bg-white rounded-xl border p-6"
        style={{ borderColor: '#EDE8DD' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Position History</h2>
        <div className="flex items-center gap-6 overflow-x-auto pb-2">
          {[
            { role: 'Board Member', org: 'National', period: '2024 - Present', active: true },
            { role: 'Committee Chair', org: 'Regional', period: '2022 - 2024', active: false },
            { role: 'Committee Member', org: 'State', period: '2020 - 2022', active: false },
            { role: 'Standard Member', org: 'Local', period: '2018 - 2020', active: false },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`flex-shrink-0 p-4 rounded-lg border-2 min-w-[180px] ${
                pos.active ? '' : 'opacity-60'
              }`}
              style={{
                borderColor: pos.active ? primaryColor : '#EDE8DD',
                background: pos.active ? `rgba(${primaryRgb}, 0.05)` : 'transparent',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: pos.active ? 1 : 0.6, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <p className="font-semibold text-gray-900 text-sm">{pos.role}</p>
              <p className="text-xs text-gray-500">{pos.org}</p>
              <p className="text-xs mt-2" style={{ color: pos.active ? primaryColor : '#9CA3AF' }}>
                {pos.period}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;

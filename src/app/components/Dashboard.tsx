/**
 * Dashboard - The Front Desk
 *
 * Award-winning KPI dashboard with proper grid system, card elevation,
 * typography hierarchy, and 8px spacing grid.
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MetabaseProvider,
  StaticQuestion,
  type MetabaseAuthConfig,
} from '@metabase/embedding-sdk-react';
import { toast } from '@/lib/notifications';
import { gsap } from '../../lib/gsap-config';
import type { Organization, Account } from '../data/themes';

interface DashboardProps {
  organization?: Organization;
  account?: Account;
  onNavigate?: (page: string) => void;
  onQuickAction?: (actionId: string) => void;
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
// ICONS (strokeWidth 1.75 for premium feel)
// ============================================================================

const DollarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const TrendUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const TrendDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SendIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const FileTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
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
  { label: 'Premium', value: 342, percentage: 27, color: 'var(--theme-primary, #D4AF37)' },
  { label: 'Professional', value: 518, percentage: 40, color: 'var(--theme-primary-dark, #8B7330)' },
  { label: 'Standard', value: 289, percentage: 23, color: 'var(--theme-accent, #B8B0A0)' },
  { label: 'Student', value: 135, percentage: 10, color: 'var(--theme-primary-pale, #E5DFD1)' },
];

const METABASE_PLACEHOLDER_VALUES = new Set([
  'your_metabase_api_key',
  'your_api_key',
  'replace_me',
  'changeme',
  'undefined',
  'null',
]);

const METABASE_PLACEHOLDER_PREFIXES = ['your_', 'replace_', 'changeme', 'placeholder'];

function sanitizeMetabaseValue(value?: string): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const lowered = trimmed.toLowerCase();
  if (METABASE_PLACEHOLDER_VALUES.has(lowered)) return null;
  if (METABASE_PLACEHOLDER_PREFIXES.some((prefix) => lowered.startsWith(prefix))) return null;
  return trimmed;
}

const METABASE_INSTANCE_URL = sanitizeMetabaseValue(import.meta.env.VITE_METABASE_INSTANCE_URL as string | undefined);
const METABASE_API_KEY = sanitizeMetabaseValue(import.meta.env.VITE_METABASE_API_KEY as string | undefined);

function parseMetabaseEntityId(value?: string): number | string | null {
  const sanitized = sanitizeMetabaseValue(value);
  if (!sanitized) return null;

  const parsedAsNumber = Number(sanitized);
  if (Number.isInteger(parsedAsNumber) && `${parsedAsNumber}` === sanitized) {
    return parsedAsNumber;
  }

  return sanitized;
}

const METABASE_DASHBOARD_KPI_QUESTION_IDS: Record<string, number | string | null> = {
  revenue: parseMetabaseEntityId(import.meta.env.VITE_METABASE_DASHBOARD_KPI_REVENUE_QUESTION_ID as string | undefined),
  events: parseMetabaseEntityId(import.meta.env.VITE_METABASE_DASHBOARD_KPI_EVENTS_QUESTION_ID as string | undefined),
  donations: parseMetabaseEntityId(import.meta.env.VITE_METABASE_DASHBOARD_KPI_DONATIONS_QUESTION_ID as string | undefined),
  members: parseMetabaseEntityId(import.meta.env.VITE_METABASE_DASHBOARD_KPI_MEMBERS_QUESTION_ID as string | undefined),
};

const METABASE_DASHBOARD_MEMBERSHIP_TIERS_QUESTION_ID = parseMetabaseEntityId(
  import.meta.env.VITE_METABASE_DASHBOARD_MEMBERSHIP_TIERS_QUESTION_ID as string | undefined,
);

const METABASE_AUTH_CONFIG: MetabaseAuthConfig | null =
  METABASE_INSTANCE_URL && METABASE_API_KEY
    ? {
      metabaseInstanceUrl: METABASE_INSTANCE_URL,
      apiKey: METABASE_API_KEY,
    }
    : null;

const METABASE_DASHBOARD_ID_LABELS: Record<string, string> = {
  revenue: 'Revenue KPI',
  events: 'Events KPI',
  donations: 'Donations KPI',
  members: 'Members KPI',
};

const METABASE_DASHBOARD_MISSING_LABELS = [
  ...Object.entries(METABASE_DASHBOARD_KPI_QUESTION_IDS)
    .filter(([, id]) => !id)
    .map(([key]) => METABASE_DASHBOARD_ID_LABELS[key] || key),
  ...(METABASE_DASHBOARD_MEMBERSHIP_TIERS_QUESTION_ID ? [] : ['Membership tiers chart']),
];

// ============================================================================
// SPARKLINE COMPONENT
// ============================================================================

interface SparklineProps {
  data: { date: string; value: number }[];
  color: string;
  trend: 'up' | 'down' | 'neutral';
  id: string;
}

function Sparkline({ data, color, trend, id }: SparklineProps) {
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
    <svg className="w-full h-[40px]" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${id}-${trend}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points={`0,100 ${points} 100,100`}
        fill={`url(#gradient-${id}-${trend})`}
      />
    </svg>
  );
}

// ============================================================================
// KPI CARD COMPONENT - Award-winning spec
// ============================================================================

interface KpiCardComponentProps {
  card: KpiCard;
  metabaseQuestionId?: number | string | null;
  primaryColor: string;
  primaryRgb: string;
  borderColor: string;
  bgCard: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  fontBody: string;
}

function KpiCardComponent({
  card,
  metabaseQuestionId,
  primaryColor,
  primaryRgb,
  borderColor,
  bgCard,
  textPrimary,
  textSecondary,
  textMuted,
  fontBody,
}: KpiCardComponentProps) {
  const [showHistory, setShowHistory] = useState(false);
  // Color thresholds: red only for >5% decrease, yellow/amber for 0-5% decrease, green for positive
  const trendColor = card.trend === 'up'
    ? 'var(--success, #16A34A)'
    : card.trend === 'down'
      ? (Math.abs(card.change) > 5 ? 'var(--error, #DC2626)' : 'var(--warning, #D97706)')
      : 'var(--theme-text-muted, #6B7280)';

  // GSAP: CountUp animation for the metric value
  const valueRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (!valueRef.current) return;
    const el = valueRef.current;
    const raw = card.value.replace(/[$,%]/g, '').replace(/,/g, '');
    const endVal = parseFloat(raw);
    if (isNaN(endVal)) return;

    const hasPrefix = card.value.startsWith('$');
    const hasSuffix = card.value.endsWith('%');
    const obj = { value: 0 };

    const tween = gsap.to(obj, {
      value: endVal,
      duration: 1.2,
      delay: 0.3,
      ease: 'power2.out',
      onUpdate: () => {
        const formatted = Math.round(obj.value).toLocaleString();
        el.textContent = `${hasPrefix ? '$' : ''}${formatted}${hasSuffix ? '%' : ''}`;
      },
    });

    return () => { tween.kill(); };
  }, [card.value]);

  return (
    <motion.div
      className="rounded-2xl p-6 relative overflow-hidden cursor-pointer"
      style={{
        border: `1px solid ${borderColor}`,
        background: `linear-gradient(145deg, ${bgCard} 0%, rgba(${primaryRgb}, 0.02) 100%)`,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.06), 0 2px 4px -1px rgba(0,0,0,0.04)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -4,
        boxShadow: `0 12px 28px -8px rgba(0,0,0,0.12), 0 4px 8px -2px rgba(0,0,0,0.06), 0 0 0 1px rgba(${primaryRgb}, 0.08)`,
      }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      onClick={() => setShowHistory(!showHistory)}
    >
      {/* Header: Icon + Trend */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-[10px] flex items-center justify-center"
          style={{
            background: `rgba(${primaryRgb}, 0.08)`,
            color: primaryColor,
          }}
        >
          {card.icon}
        </div>
        <div className="inline-flex items-center gap-1" style={{ color: trendColor }}>
          {card.trend === 'up' ? (
            <TrendUpIcon className="w-4 h-4" />
          ) : card.trend === 'down' ? (
            <TrendDownIcon className="w-4 h-4" />
          ) : null}
          <span className="text-sm font-medium" style={{ fontFamily: fontBody }}>
            {card.trend === 'up' ? '+' : ''}
            {card.change}%
          </span>
        </div>
      </div>

      {/* Label */}
      <p className="text-sm font-medium mb-1 leading-snug" style={{
        color: textSecondary,
        fontFamily: fontBody,
      }}>
        {card.label}
      </p>

      {/* Metric Value - Award-winning spec: 32px, 700, tabular-nums, -0.03em + GSAP countUp */}
      <p ref={valueRef} className="text-[2rem] font-bold leading-tight tracking-[-0.03em] mb-1" style={{
        color: textPrimary,
        fontVariantNumeric: 'tabular-nums',
        fontFamily: fontBody,
      }}>
        {card.value}
      </p>

      {/* Change Label */}
      <p className="text-xs font-medium tracking-[0.02em]" style={{
        color: textMuted,
        fontFamily: fontBody,
      }}>
        {card.changeLabel}
      </p>

      {/* Sparkline */}
      <div className="mt-4 h-[88px]">
        <DashboardMetabaseQuestion
          questionId={metabaseQuestionId}
          height={88}
          fallback={<Sparkline data={card.history} color={primaryColor} trend={card.trend} id={card.id} />}
        />
      </div>

      {/* History Popover */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            className="absolute inset-0 p-6 z-10 rounded-xl"
            style={{ background: bgCard }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="font-semibold text-sm" style={{ color: textPrimary, fontFamily: fontBody }}>
                {card.label} History
              </p>
              <button
                className="cursor-pointer border-none bg-transparent text-lg leading-none p-1"
                style={{ color: textMuted }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHistory(false);
                }}
              >
                &times;
              </button>
            </div>
            <div className="flex flex-col gap-2.5">
              {card.history.map((h, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[13px]" style={{ color: textSecondary, fontFamily: fontBody }}>
                    {new Date(h.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                  <span className="text-[13px] font-semibold" style={{
                    color: primaryColor,
                    fontVariantNumeric: 'tabular-nums',
                    fontFamily: fontBody,
                  }}>
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
      return { bg: 'rgba(var(--theme-primary-rgb, 212,175,55), 0.16)', text: 'var(--theme-primary-dark, #92400E)', label: 'Gala' };
    case 'meeting':
      return { bg: 'rgba(var(--theme-accent-rgb, 14,165,233), 0.14)', text: 'var(--theme-accent-dark, #1E40AF)', label: 'Meeting' };
    case 'workshop':
      return { bg: 'rgba(5, 150, 105, 0.14)', text: 'var(--success, #065F46)', label: 'Workshop' };
    case 'networking':
      return { bg: 'rgba(217, 119, 6, 0.12)', text: 'var(--warning, #9D174D)', label: 'Networking' };
    default:
      return { bg: 'var(--theme-bg-muted, #F4F4F5)', text: 'var(--theme-text-secondary, #374151)', label: 'Event' };
  }
}

function DashboardMetabaseQuestion({
  questionId,
  height,
  fallback,
}: {
  questionId?: number | string | null;
  height: number;
  fallback: React.ReactNode;
}) {
  if (!METABASE_AUTH_CONFIG || !questionId) {
    return <>{fallback}</>;
  }

  return (
    <div className="h-full overflow-hidden rounded-lg">
      <StaticQuestion
        questionId={questionId}
        height={height}
        title={false}
      />
    </div>
  );
}

function MembershipTiersFallback({
  textPrimary,
  textMuted,
  fontBody,
}: {
  textPrimary: string;
  textMuted: string;
  fontBody: string;
}) {
  return (
    <div className="relative w-32 h-32 mx-auto mb-6">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        {MEMBER_STATS.reduce((acc, stat) => {
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
            />,
          );
          acc.offset = offset + stat.percentage;
          return acc;
        }, { elements: [] as JSX.Element[], offset: 0 }).elements}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-bold tracking-[-0.02em]" style={{
            color: textPrimary,
            fontVariantNumeric: 'tabular-nums',
            fontFamily: fontBody,
          }}>
            1,284
          </p>
          <p className="text-[11px] font-medium" style={{
            color: textMuted,
            fontFamily: fontBody,
          }}>
            Total
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CARD WRAPPER - Reusable card with proper elevation
// ============================================================================

function Card({
  children,
  borderColor,
  bgCard,
  style,
  delay = 0,
  primaryRgb = '212,175,55',
}: {
  children: React.ReactNode;
  borderColor: string;
  bgCard: string;
  style?: React.CSSProperties;
  delay?: number;
  primaryRgb?: string;
}) {
  return (
    <motion.div
      className="rounded-2xl p-6"
      style={{
        border: `1px solid ${borderColor}`,
        background: `linear-gradient(165deg, ${bgCard} 0%, rgba(${primaryRgb}, 0.015) 100%)`,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.8)',
        ...style,
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        boxShadow: `0 8px 16px -4px rgba(0,0,0,0.08), 0 4px 8px -2px rgba(0,0,0,0.04), 0 0 0 1px rgba(${primaryRgb}, 0.08)`,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// SECTION HEADER
// ============================================================================

function SectionHeader({
  title,
  action,
  actionLabel,
  textPrimary,
  primaryColor,
  fontBody,
}: {
  title: string;
  action?: () => void;
  actionLabel?: string;
  textPrimary: string;
  primaryColor: string;
  fontBody: string;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-base font-semibold tracking-[-0.01em] leading-snug" style={{
        color: textPrimary,
        fontFamily: fontBody,
      }}>
        {title}
      </h2>
      {action && actionLabel && (
        <button
          onClick={action}
          className="text-[13px] font-medium cursor-pointer border-none bg-transparent px-2 py-1 rounded-md transition-colors duration-150 hover:bg-black/[0.04]"
          style={{
            color: primaryColor,
            fontFamily: fontBody,
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function Dashboard({ organization, account, onNavigate, onQuickAction }: DashboardProps) {
  // GSAP: Staggered entrance for KPI card grid
  const kpiGridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!kpiGridRef.current) return;
    const cards = kpiGridRef.current.children;
    if (!cards.length) return;

    const tl = gsap.timeline({ delay: 0.1 });
    tl.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      },
    );

    return () => { tl.kill(); };
  }, []);

  // GSAP: Staggered entrance for section cards
  const sectionsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sectionsRef.current) return;
    const cards = sectionsRef.current.children;
    if (!cards.length) return;

    const tl = gsap.timeline({ delay: 0.4 });
    tl.fromTo(
      cards,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power2.out',
      },
    );

    return () => { tl.kill(); };
  }, []);

  // Theme-aware values with Zinc defaults
  const primaryColor = organization?.theme.primary || '#3B82F6';
  const primaryRgb = organization?.theme.primaryRgb || '59,130,246';
  const userName = account?.first || 'Guest';

  const isDarkTheme = organization?.theme.prefersDark || false;

  const fontDisplay = organization?.theme.fontDisplay || "'DM Serif Display', 'Playfair Display', serif";
  const fontBody = organization?.theme.fontBody || "'Sora', 'DM Sans', system-ui, sans-serif";

  // Zinc-based color system
  const borderColor = organization?.theme.borderColor || (isDarkTheme ? '#27272A' : '#E4E4E7');
  const bgCard = organization?.theme.bgCard || (isDarkTheme ? '#18181B' : '#FFFFFF');
  const bgPrimary = organization?.theme.bgPrimary || (isDarkTheme ? '#09090B' : '#FAFAFA');
  const bgSecondary = isDarkTheme ? '#18181B' : '#F4F4F5';
  const textPrimary = organization?.theme.textPrimary || (isDarkTheme ? '#FAFAFA' : '#09090B');
  const textSecondary = organization?.theme.textSecondary || (isDarkTheme ? '#A1A1AA' : '#71717A');
  const textMuted = organization?.theme.textMuted || (isDarkTheme ? '#71717A' : '#A1A1AA');

  const content = (
    <div
      className="min-h-full p-8"
      style={{ background: bgPrimary }}
    >
      {/* Content max-width container */}
      <div className="max-w-[1200px] mx-auto">

        {/* Welcome Header */}
        <div className="mb-8">
          <motion.h1
            className="text-5xl font-bold leading-tight tracking-[-0.03em] mb-3"
            style={{
              fontFamily: fontDisplay,
              color: textPrimary,
              textShadow: '0 1px 2px rgba(0,0,0,0.04)',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Welcome back, {userName}
          </motion.h1>
          <motion.p
            className="text-[15px] font-normal leading-relaxed"
            style={{
              color: textSecondary,
              fontFamily: fontBody,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            Here&apos;s what&apos;s happening at {organization?.short || 'your organization'} today
          </motion.p>
        </div>

        {/* Metabase Status Banner */}
        {(!METABASE_AUTH_CONFIG || METABASE_DASHBOARD_MISSING_LABELS.length > 0) && (
          <div
            className="mb-6 rounded-2xl border p-4"
            style={{
              borderColor,
              background: bgCard,
              boxShadow: '0 4px 12px -6px rgba(0,0,0,0.08)',
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold" style={{ color: textPrimary }}>
                  Metabase embeds are not fully configured
                </p>
                <p className="text-xs mt-1" style={{ color: textSecondary }}>
                  Set VITE_METABASE_* values in .env (see reports/metabase-graph-mapping.md) to display live charts.
                </p>
              </div>
              <span
                className="text-[11px] uppercase tracking-[0.2em]"
                style={{ color: textMuted }}
              >
                Analytics
              </span>
            </div>
            {METABASE_DASHBOARD_MISSING_LABELS.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {METABASE_DASHBOARD_MISSING_LABELS.map((label) => (
                  <span
                    key={label}
                    className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                    style={{
                      background: 'var(--theme-bg-muted, #F4F4F5)',
                      border: `1px solid ${borderColor}`,
                      color: textMuted,
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
            {!METABASE_AUTH_CONFIG && (
              <p className="mt-2 text-[11px]" style={{ color: textMuted }}>
                Missing Metabase instance URL or API key.
              </p>
            )}
          </div>
        )}

        {/* KPI Cards -- 4-column grid, 24px gap, GSAP staggered entrance */}
        <div ref={kpiGridRef} className="grid grid-cols-4 gap-6 mb-8">
          {MOCK_KPI_CARDS.map((card) => (
            <div
              key={card.id}
              style={{ opacity: 0 }}
            >
              <KpiCardComponent
                card={card}
                metabaseQuestionId={METABASE_DASHBOARD_KPI_QUESTION_IDS[card.id]}
                primaryColor={primaryColor}
                primaryRgb={primaryRgb}
                borderColor={borderColor}
                bgCard={bgCard}
                textPrimary={textPrimary}
                textSecondary={textSecondary}
                textMuted={textMuted}
                fontBody={fontBody}
              />
            </div>
          ))}
        </div>

        {/* Middle Row: Quick Actions (1) + Membership Tiers (1) + Recent Activity (2) */}
        <div ref={sectionsRef} className="grid grid-cols-[1fr_1fr_2fr] gap-6 mb-8">
          {/* Quick Actions */}
          <Card borderColor={borderColor} bgCard={bgCard} delay={0.35}>
            <SectionHeader
              title="Quick Actions"
              textPrimary={textPrimary}
              primaryColor={primaryColor}
              fontBody={fontBody}
            />
            <div className="grid grid-cols-2 gap-3">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  className="p-4 rounded-[10px] text-left cursor-pointer transition-all duration-150"
                  style={{
                    border: `1px solid ${borderColor}`,
                    background: bgCard,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.background = `rgba(${primaryRgb}, 0.04)`;
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = borderColor;
                    e.currentTarget.style.background = bgCard;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  onClick={() => {
                    if (onQuickAction) {
                      onQuickAction(action.id);
                    } else {
                      switch (action.id) {
                        case 'add-member':
                          onNavigate?.('registry');
                          toast.success('Navigating to Member Registry');
                          break;
                        case 'send-message':
                          toast.success('Broadcast composer coming soon!');
                          break;
                        case 'create-event':
                          onNavigate?.('events');
                          toast.success('Navigating to Events Pavilion');
                          break;
                        case 'upload-document':
                          onNavigate?.('vault');
                          toast.success('Navigating to The Vault');
                          break;
                      }
                    }
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-2.5"
                    style={{
                      background: `rgba(${primaryRgb}, 0.08)`,
                      color: primaryColor,
                    }}
                  >
                    {action.icon}
                  </div>
                  <p className="text-[13px] font-semibold mb-0.5" style={{
                    color: textPrimary,
                    fontFamily: fontBody,
                  }}>
                    {action.label}
                  </p>
                  <p className="text-xs font-normal" style={{
                    color: textMuted,
                    fontFamily: fontBody,
                  }}>
                    {action.description}
                  </p>
                </button>
              ))}
            </div>
          </Card>

          {/* Member Breakdown */}
          <Card borderColor={borderColor} bgCard={bgCard} delay={0.4}>
            <SectionHeader
              title="Membership Tiers"
              textPrimary={textPrimary}
              primaryColor={primaryColor}
              fontBody={fontBody}
            />

            {/* Donut Chart */}
            <div className="mb-6 h-40">
              <DashboardMetabaseQuestion
                questionId={METABASE_DASHBOARD_MEMBERSHIP_TIERS_QUESTION_ID}
                height={160}
                fallback={(
                  <MembershipTiersFallback
                    textPrimary={textPrimary}
                    textMuted={textMuted}
                    fontBody={fontBody}
                  />
                )}
              />
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-2.5">
              {MEMBER_STATS.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-sm"
                      style={{ background: stat.color }}
                    />
                    <span className="text-[13px]" style={{ color: textSecondary, fontFamily: fontBody }}>{stat.label}</span>
                  </div>
                  <span className="text-[13px] font-semibold" style={{
                    color: textPrimary,
                    fontVariantNumeric: 'tabular-nums',
                    fontFamily: fontBody,
                  }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card borderColor={borderColor} bgCard={bgCard} delay={0.45}>
            <SectionHeader
              title="Recent Activity"
              action={() => toast.info('Full activity log coming soon!')}
              actionLabel="View All"
              textPrimary={textPrimary}
              primaryColor={primaryColor}
              fontBody={fontBody}
            />
            <div className="flex flex-col gap-1">
              {RECENT_ACTIVITIES.map((activity, i) => (
                <motion.div
                  key={activity.id}
                  className="flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-default transition-colors duration-150"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.04, duration: 0.3 }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = bgSecondary;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: `rgba(${primaryRgb}, 0.08)`,
                      color: primaryColor,
                    }}
                  >
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold leading-snug mb-0.5" style={{
                      color: textPrimary,
                      fontFamily: fontBody,
                    }}>
                      {activity.title}
                    </p>
                    <p className="text-[13px] font-normal leading-snug truncate" style={{
                      color: textSecondary,
                      fontFamily: fontBody,
                    }}>
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs font-medium shrink-0 tracking-[0.02em] whitespace-nowrap" style={{
                    color: textMuted,
                    fontFamily: fontBody,
                  }}>
                    {activity.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card borderColor={borderColor} bgCard={bgCard} delay={0.5} style={{ marginBottom: '32px' }}>
          <SectionHeader
            title="Upcoming Events"
            action={() => onNavigate?.('events')}
            actionLabel="View Calendar"
            textPrimary={textPrimary}
            primaryColor={primaryColor}
            fontBody={fontBody}
          />
          <div className="grid grid-cols-4 gap-4">
            {UPCOMING_EVENTS.map((event) => {
              const typeStyles = getEventTypeStyles(event.type);
              return (
                <div
                  key={event.id}
                  className="p-4 rounded-[10px] cursor-pointer transition-all duration-200"
                  style={{
                    border: `1px solid ${borderColor}`,
                    background: bgCard,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = `rgba(${primaryRgb}, 0.3)`;
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = borderColor;
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-[0.05em]"
                      style={{
                        background: typeStyles.bg,
                        color: typeStyles.text,
                        fontFamily: fontBody,
                      }}
                    >
                      {typeStyles.label}
                    </span>
                    <span className="text-xs font-medium" style={{ color: textMuted, fontFamily: fontBody }}>
                      {event.attendees} attending
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold mb-2 leading-snug tracking-[-0.01em]" style={{
                    color: textPrimary,
                    fontFamily: fontBody,
                  }}>
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-medium" style={{
                    color: textSecondary,
                    fontFamily: fontBody,
                  }}>
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>{event.date}</span>
                    <span style={{ color: textMuted }}>·</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Position History */}
        <Card borderColor={borderColor} bgCard={bgCard} delay={0.55}>
          <SectionHeader
            title="Your Position History"
            textPrimary={textPrimary}
            primaryColor={primaryColor}
            fontBody={fontBody}
          />
          <div className="flex gap-4 overflow-x-auto pb-1">
            {[
              { role: 'Board Member', org: 'National', period: '2024 - Present', active: true },
              { role: 'Committee Chair', org: 'Regional', period: '2022 - 2024', active: false },
              { role: 'Committee Member', org: 'State', period: '2020 - 2022', active: false },
              { role: 'Standard Member', org: 'Local', period: '2018 - 2020', active: false },
            ].map((pos, i) => (
              <div
                key={i}
                className="shrink-0 p-4 rounded-[10px] min-w-[180px] transition-all duration-200"
                style={{
                  border: `1.5px solid ${pos.active ? primaryColor : borderColor}`,
                  background: pos.active ? `rgba(${primaryRgb}, 0.04)` : 'transparent',
                  opacity: pos.active ? 1 : 0.55,
                }}
              >
                <p className="text-sm font-semibold mb-1 tracking-[-0.01em]" style={{
                  color: textPrimary,
                  fontFamily: fontBody,
                }}>
                  {pos.role}
                </p>
                <p className="text-[13px] font-normal mb-2" style={{
                  color: textSecondary,
                  fontFamily: fontBody,
                }}>
                  {pos.org}
                </p>
                <p className="text-xs font-medium tracking-[0.02em]" style={{
                  color: pos.active ? primaryColor : textMuted,
                  fontFamily: fontBody,
                }}>
                  {pos.period}
                </p>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );

  if (!METABASE_AUTH_CONFIG) {
    return content;
  }

  return <MetabaseProvider authConfig={METABASE_AUTH_CONFIG}>{content}</MetabaseProvider>;
}

export default Dashboard;

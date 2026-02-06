/**
 * Events Pavilion Page
 *
 * Event management with click tracking, attendance, and analytics.
 * Features:
 * - Event cards with engagement metrics
 * - Click tracking per event
 * - Calendar view
 * - Registration management
 * - Event Builder wizard integration
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Organization, Account } from '../../data/themes';
import { EventBuilder } from '@/components/lobbi/wizards';

interface EventsPavilionPageProps {
  organization: Organization;
  account: Account;
}

// ============================================================================
// TYPES
// ============================================================================

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'conference' | 'workshop' | 'webinar' | 'social' | 'meeting';
  capacity: number;
  registered: number;
  clicks: number;
  imageUrl?: string;
  featured?: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Annual Leadership Summit 2024',
    description: 'Join industry leaders for our flagship conference on healthcare innovation.',
    date: '2024-03-15',
    time: '9:00 AM - 5:00 PM',
    location: 'Grand Ballroom, Luxe Haven Resort',
    type: 'conference',
    capacity: 500,
    registered: 423,
    clicks: 2847,
    featured: true,
  },
  {
    id: 'e2',
    title: 'Digital Transformation Workshop',
    description: 'Hands-on workshop covering the latest in healthcare technology.',
    date: '2024-02-28',
    time: '2:00 PM - 6:00 PM',
    location: 'Innovation Center',
    type: 'workshop',
    capacity: 50,
    registered: 48,
    clicks: 892,
  },
  {
    id: 'e3',
    title: 'Member Networking Mixer',
    description: 'Casual evening of networking with fellow healthcare professionals.',
    date: '2024-02-20',
    time: '6:00 PM - 9:00 PM',
    location: 'Rooftop Terrace',
    type: 'social',
    capacity: 100,
    registered: 76,
    clicks: 534,
  },
  {
    id: 'e4',
    title: 'Regulatory Updates Webinar',
    description: 'Stay current with the latest compliance and regulatory changes.',
    date: '2024-02-14',
    time: '12:00 PM - 1:00 PM',
    location: 'Virtual',
    type: 'webinar',
    capacity: 1000,
    registered: 312,
    clicks: 1256,
  },
  {
    id: 'e5',
    title: 'Board Strategy Meeting',
    description: 'Quarterly board meeting to review organizational strategy.',
    date: '2024-02-10',
    time: '10:00 AM - 2:00 PM',
    location: 'Executive Boardroom',
    type: 'meeting',
    capacity: 15,
    registered: 12,
    clicks: 89,
  },
  {
    id: 'e6',
    title: 'Continuing Education: Patient Care Excellence',
    description: 'Earn CEU credits while learning best practices in patient care.',
    date: '2024-03-01',
    time: '9:00 AM - 4:00 PM',
    location: 'Education Center',
    type: 'workshop',
    capacity: 75,
    registered: 62,
    clicks: 1423,
  },
];

// ============================================================================
// ICONS
// ============================================================================

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const MousePointerIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
    <path d="M13 13l6 6" />
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const GridIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ListIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

// ============================================================================
// EVENT CARD
// ============================================================================

interface EventCardProps {
  event: Event;
  organization: Organization;
  onClick: () => void;
}

function EventCard({ event, organization, onClick }: EventCardProps) {
  const typeColors = {
    conference: '#9333EA',
    workshop: '#0EA5E9',
    webinar: '#22C55E',
    social: '#F59E0B',
    meeting: '#8B7330',
  };

  const typeLabels = {
    conference: 'Conference',
    workshop: 'Workshop',
    webinar: 'Webinar',
    social: 'Social',
    meeting: 'Meeting',
  };

  const capacityPercent = Math.round((event.registered / event.capacity) * 100);
  const isAlmostFull = capacityPercent >= 80;

  return (
    <motion.div
      className={`bg-white rounded-xl border overflow-hidden cursor-pointer ${
        event.featured ? 'ring-2' : ''
      }`}
      style={{
        borderColor: '#EDE8DD',
        ringColor: event.featured ? organization.theme.primary : undefined,
      }}
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
    >
      {/* Featured Banner */}
      {event.featured && (
        <div
          className="px-4 py-1.5 text-xs font-semibold text-white text-center uppercase tracking-wider"
          style={{ background: organization.theme.gradientBtn }}
        >
          Featured Event
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: `${typeColors[event.type]}15`,
              color: typeColors[event.type],
            }}
          >
            {typeLabels[event.type]}
          </span>

          {/* Click Count Badge */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MousePointerIcon className="w-3.5 h-3.5" />
            <span>{event.clicks.toLocaleString()} clicks</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">{event.description}</p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarIcon className="w-4 h-4 text-gray-400" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ClockIcon className="w-4 h-4 text-gray-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4 text-gray-400" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="text-gray-500">
              <UsersIcon className="w-4 h-4 inline mr-1" />
              {event.registered} / {event.capacity}
            </span>
            <span
              className={`font-medium ${isAlmostFull ? 'text-amber-600' : 'text-gray-600'}`}
            >
              {capacityPercent}% Full
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: isAlmostFull
                  ? 'linear-gradient(90deg, #F59E0B, #DC2626)'
                  : organization.theme.gradientBtn,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${capacityPercent}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          className="w-full py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{
            background: capacityPercent >= 100 ? '#E5E7EB' : organization.theme.gradientBtn,
            color: capacityPercent >= 100 ? '#9CA3AF' : 'white',
          }}
          disabled={capacityPercent >= 100}
        >
          {capacityPercent >= 100 ? 'Sold Out' : 'Register Now'}
        </button>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

// ============================================================================
// CLOSE ICON
// ============================================================================

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export function EventsPavilionPage({ organization, account }: EventsPavilionPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState<string>('all');
  const [showEventBuilder, setShowEventBuilder] = useState(false);

  const filteredEvents = filterType === 'all'
    ? MOCK_EVENTS
    : MOCK_EVENTS.filter((e) => e.type === filterType);

  const totalClicks = MOCK_EVENTS.reduce((sum, e) => sum + e.clicks, 0);
  const totalRegistered = MOCK_EVENTS.reduce((sum, e) => sum + e.registered, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-3xl font-light mb-2"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              color: '#2C2A25',
            }}
          >
            Events Pavilion
          </h1>
          <p className="text-gray-500">
            Discover and manage upcoming events for your organization
          </p>
        </div>

        <button
          onClick={() => setShowEventBuilder(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white font-medium text-sm"
          style={{ background: organization.theme.gradientBtn }}
        >
          <PlusIcon className="w-4 h-4" />
          Create Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Events', value: MOCK_EVENTS.length.toString() },
          { label: 'Total Registrations', value: totalRegistered.toLocaleString() },
          { label: 'Total Clicks', value: totalClicks.toLocaleString() },
          { label: 'Avg. Engagement', value: `${Math.round(totalClicks / MOCK_EVENTS.length)}` },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl border p-4"
            style={{ borderColor: '#EDE8DD' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: organization.theme.primary }}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Filters & View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {['all', 'conference', 'workshop', 'webinar', 'social', 'meeting'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filterType === type ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={{
                background: filterType === type ? organization.theme.gradientBtn : 'transparent',
              }}
            >
              {type === 'all' ? 'All Events' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid' ? 'bg-white shadow-sm' : ''
            }`}
            onClick={() => setViewMode('grid')}
          >
            <GridIcon className="w-4 h-4" style={{ color: viewMode === 'grid' ? organization.theme.primary : '#8A8578' }} />
          </button>
          <button
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list' ? 'bg-white shadow-sm' : ''
            }`}
            onClick={() => setViewMode('list')}
          >
            <ListIcon className="w-4 h-4" style={{ color: viewMode === 'list' ? organization.theme.primary : '#8A8578' }} />
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
      }`}>
        {filteredEvents.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <EventCard
              event={event}
              organization={organization}
              onClick={() => console.log('Event clicked:', event.id)}
            />
          </motion.div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No events found for this category.</p>
        </div>
      )}

      {/* Event Builder Modal */}
      <AnimatePresence>
        {showEventBuilder && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEventBuilder(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowEventBuilder(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <CloseIcon className="w-5 h-5 text-gray-600" />
              </button>

              {/* Event Builder */}
              <EventBuilder
                onSave={(config) => {
                  console.log('Event saved:', config);
                  setShowEventBuilder(false);
                }}
                onPublish={(config) => {
                  console.log('Event published:', config);
                  setShowEventBuilder(false);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EventsPavilionPage;

import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Users, ChevronRight, Filter, Plus } from 'lucide-react';
import type { Account, Organization } from '../data/themes';

interface EventsPageProps {
  organization?: Organization;
  account?: Account;
}

interface EventData {
  id: number;
  title: string;
  description: string;
  date: string;
  month: string;
  day: string;
  time: string;
  location: string;
  attendees: number;
  registered: boolean;
  category: 'upcoming' | 'past';
}

const MOCK_EVENTS: EventData[] = [
  {
    id: 1,
    title: 'Annual Leadership Summit',
    description: 'Join us for an inspiring day of keynote speakers, breakout sessions, and strategic planning for the year ahead.',
    date: 'Mar 15, 2026',
    month: 'MAR',
    day: '15',
    time: '9:00 AM - 5:00 PM',
    location: 'Grand Ballroom',
    attendees: 245,
    registered: true,
    category: 'upcoming',
  },
  {
    id: 2,
    title: 'Networking Mixer',
    description: 'An evening of meaningful connections with fellow members over refreshments and live entertainment.',
    date: 'Mar 22, 2026',
    month: 'MAR',
    day: '22',
    time: '6:00 PM - 9:00 PM',
    location: 'Rooftop Terrace',
    attendees: 89,
    registered: false,
    category: 'upcoming',
  },
  {
    id: 3,
    title: 'Professional Development Workshop',
    description: 'Sharpen your skills with expert-led workshops covering leadership, communication, and innovation.',
    date: 'Apr 5, 2026',
    month: 'APR',
    day: '05',
    time: '10:00 AM - 2:00 PM',
    location: 'Conference Room A',
    attendees: 45,
    registered: false,
    category: 'upcoming',
  },
  {
    id: 4,
    title: 'Community Service Day',
    description: 'Give back to the community alongside fellow members in a day of volunteer activities and team building.',
    date: 'Apr 12, 2026',
    month: 'APR',
    day: '12',
    time: '8:00 AM - 3:00 PM',
    location: 'City Park',
    attendees: 120,
    registered: true,
    category: 'upcoming',
  },
  {
    id: 5,
    title: 'Board Meeting',
    description: 'Quarterly board meeting to review organizational performance, approve budgets, and set strategic direction.',
    date: 'Apr 20, 2026',
    month: 'APR',
    day: '20',
    time: '2:00 PM - 4:00 PM',
    location: 'Board Room',
    attendees: 15,
    registered: false,
    category: 'upcoming',
  },
  {
    id: 6,
    title: 'Summer Gala',
    description: 'Our premier social event of the season featuring fine dining, live music, and an exclusive silent auction.',
    date: 'May 10, 2026',
    month: 'MAY',
    day: '10',
    time: '7:00 PM - 11:00 PM',
    location: 'Grand Ballroom',
    attendees: 350,
    registered: false,
    category: 'upcoming',
  },
];

const TABS = ['Upcoming', 'Past', 'My Events'] as const;
type Tab = typeof TABS[number];

export function EventsPage({ organization, account }: EventsPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Upcoming');
  const [registrations, setRegistrations] = useState<Set<number>>(
    new Set(MOCK_EVENTS.filter(e => e.registered).map(e => e.id))
  );

  const rgb = organization?.theme.primaryRgb || '212,175,55';
  const primary = organization?.theme.primary || '#D4AF37';
  const primaryDark = organization?.theme.primaryDark || '#8B7330';

  const filteredEvents = MOCK_EVENTS.filter(event => {
    if (activeTab === 'Upcoming') return event.category === 'upcoming';
    if (activeTab === 'Past') return event.category === 'past';
    if (activeTab === 'My Events') return registrations.has(event.id);
    return true;
  });

  const handleRegister = (eventId: number) => {
    setRegistrations(prev => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'DM Sans, sans-serif' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#1a1a2e',
              marginBottom: '0.5rem',
            }}
          >
            Events Pavilion
          </h1>
          <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
            Discover, register, and manage upcoming gatherings and experiences
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1.25rem',
            background: `linear-gradient(135deg, ${primaryDark}, ${primary})`,
            color: '#fff',
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          <Plus style={{ width: 18, height: 18 }} />
          Create Event
        </motion.button>
      </motion.div>

      {/* Tab Filter */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '2rem',
          background: '#f3f4f6',
          borderRadius: '9999px',
          padding: '0.25rem',
          width: 'fit-content',
        }}
      >
        {TABS.map(tab => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'DM Sans, sans-serif',
                background: isActive ? primary : 'transparent',
                color: isActive ? '#fff' : '#6b7280',
                boxShadow: isActive ? `0 2px 8px rgba(${rgb}, 0.3)` : 'none',
              }}
            >
              {tab}
            </button>
          );
        })}
      </motion.div>

      {/* Event Cards Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {filteredEvents.map((event, index) => {
          const isRegistered = registrations.has(event.id);

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
              whileHover={{ y: -4 }}
              style={{
                background: '#fff',
                borderRadius: '1rem',
                border: `1px solid rgba(${rgb}, 0.08)`,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'box-shadow 0.3s ease',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
              onHoverStart={(e) => {
                const target = e as unknown as { currentTarget?: HTMLElement };
                // handled by framer motion whileHover
              }}
            >
              {/* Image Placeholder */}
              <div
                style={{
                  position: 'relative',
                  height: '180px',
                  background: `linear-gradient(135deg, rgba(${rgb}, 0.15), rgba(${rgb}, 0.45), rgba(${rgb}, 0.2))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Calendar
                  style={{
                    width: 48,
                    height: 48,
                    color: `rgba(${rgb}, 0.35)`,
                  }}
                />

                {/* Date Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    background: '#fff',
                    borderRadius: '0.75rem',
                    padding: '0.375rem 0.625rem',
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    minWidth: '3rem',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.625rem',
                      fontWeight: 700,
                      color: primary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      lineHeight: 1.2,
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    {event.month}
                  </div>
                  <div
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#1a1a2e',
                      lineHeight: 1.2,
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    {event.day}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.25rem' }}>
                <h3
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#1a1a2e',
                    marginBottom: '0.5rem',
                  }}
                >
                  {event.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: '#6b7280',
                    lineHeight: 1.6,
                    marginBottom: '1rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {event.description}
                </p>

                {/* Event Meta */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin
                      style={{ width: 14, height: 14, color: `rgba(${rgb}, 0.7)`, flexShrink: 0 }}
                    />
                    <span style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                      {event.location}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock
                      style={{ width: 14, height: 14, color: `rgba(${rgb}, 0.7)`, flexShrink: 0 }}
                    />
                    <span style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                      {event.time}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users
                      style={{ width: 14, height: 14, color: `rgba(${rgb}, 0.7)`, flexShrink: 0 }}
                    />
                    <span style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                      {event.attendees} attendees
                    </span>
                  </div>
                </div>

                {/* Register Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRegister(event.id);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.625rem 1rem',
                    borderRadius: '0.625rem',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'DM Sans, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    border: isRegistered ? `1.5px solid rgba(${rgb}, 0.3)` : 'none',
                    background: isRegistered ? 'transparent' : `linear-gradient(135deg, ${primaryDark}, ${primary})`,
                    color: isRegistered ? primary : '#fff',
                  }}
                >
                  {isRegistered ? (
                    <>Registered</>
                  ) : (
                    <>
                      Register
                      <ChevronRight style={{ width: 14, height: 14 }} />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#9ca3af',
          }}
        >
          <Calendar
            style={{
              width: 48,
              height: 48,
              margin: '0 auto 1rem',
              color: `rgba(${rgb}, 0.3)`,
            }}
          />
          <p
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#6b7280',
              marginBottom: '0.5rem',
            }}
          >
            No events found
          </p>
          <p style={{ fontSize: '0.875rem' }}>
            {activeTab === 'Past'
              ? 'No past events to display yet.'
              : activeTab === 'My Events'
              ? 'You have not registered for any events yet.'
              : 'Check back soon for upcoming events.'}
          </p>
        </motion.div>
      )}
    </div>
  );
}

/**
 * EventBuilder - Advanced event creation wizard
 *
 * Features:
 * - Event details with rich media
 * - Ticket types and pricing
 * - Registration settings
 * - Guest management
 * - Venue/virtual setup
 * - Check-in configuration
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Ticket,
  DollarSign,
  Image,
  Mail,
  QrCode,
  Video,
  Globe,
  Lock,
  Plus,
  Trash2,
  Eye,
  Settings,
  Copy,
  Facebook,
  Twitter,
  Linkedin,
  PartyPopper,
  Utensils,
  Music,
  Mic,
  Award,
  Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  LobbiWizard,
  WizardStepContent,
  WizardCard,
  useWizard,
  type WizardStep,
} from './LobbiWizard';
import { LobbiButton } from '../core/LobbiButton';
import { LobbiInput } from '../core/LobbiInput';

// =============================================================================
// TYPES
// =============================================================================

type EventType = 'in-person' | 'virtual' | 'hybrid';
type EventVisibility = 'public' | 'private' | 'members-only';
type RegistrationType = 'open' | 'approval' | 'invite-only';

interface TicketType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  features: string[];
  earlyBirdPrice?: number;
  earlyBirdEndDate?: string;
  salesEndDate?: string;
  maxPerOrder: number;
}

interface Agenda {
  id: string;
  time: string;
  title: string;
  description?: string;
  speaker?: string;
  location?: string;
}

interface EventConfig {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  type: EventType;
  category: string;
  imageUrl: string;
  bannerUrl: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  venue: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    instructions?: string;
  };
  virtual: {
    platform: string;
    link: string;
    password?: string;
  };
  visibility: EventVisibility;
  registration: RegistrationType;
  capacity: number;
  waitlistEnabled: boolean;
  ticketTypes: TicketType[];
  agenda: Agenda[];
  tags: string[];
  organizer: {
    name: string;
    email: string;
    phone?: string;
  };
  reminders: {
    enabled: boolean;
    days: number[];
  };
  checkIn: {
    enabled: boolean;
    qrCode: boolean;
    guestList: boolean;
  };
}

// =============================================================================
// CONSTANTS
// =============================================================================

const EVENT_CATEGORIES = [
  { value: 'networking', label: 'Networking', icon: Users },
  { value: 'workshop', label: 'Workshop', icon: Award },
  { value: 'social', label: 'Social', icon: PartyPopper },
  { value: 'fundraiser', label: 'Fundraiser', icon: Heart },
  { value: 'conference', label: 'Conference', icon: Mic },
  { value: 'concert', label: 'Concert', icon: Music },
  { value: 'dinner', label: 'Dinner', icon: Utensils },
  { value: 'webinar', label: 'Webinar', icon: Video },
];

const VIRTUAL_PLATFORMS = [
  { value: 'zoom', label: 'Zoom' },
  { value: 'teams', label: 'Microsoft Teams' },
  { value: 'meet', label: 'Google Meet' },
  { value: 'webex', label: 'Cisco Webex' },
  { value: 'custom', label: 'Custom Link' },
];

const TIMEZONES = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'UTC', label: 'UTC' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
];

const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'details',
    title: 'Event Details',
    description: 'Basic info & media',
    icon: <CalendarDays className="w-5 h-5" />,
  },
  {
    id: 'location',
    title: 'Location',
    description: 'Venue or virtual',
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    id: 'tickets',
    title: 'Tickets',
    description: 'Pricing & capacity',
    icon: <Ticket className="w-5 h-5" />,
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Registration & more',
    icon: <Settings className="w-5 h-5" />,
  },
  {
    id: 'preview',
    title: 'Preview',
    description: 'Review & publish',
    icon: <Eye className="w-5 h-5" />,
  },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export interface EventBuilderProps {
  onSave?: (config: EventConfig) => void;
  onPublish?: (config: EventConfig) => void;
  className?: string;
}

export function EventBuilder({
  onSave,
  onPublish,
  className,
}: EventBuilderProps) {
  const [config, setConfig] = useState<EventConfig>({
    id: crypto.randomUUID(),
    name: '',
    description: '',
    shortDescription: '',
    type: 'in-person',
    category: '',
    imageUrl: '',
    bannerUrl: '',
    date: '',
    startTime: '',
    endTime: '',
    timezone: 'America/New_York',
    venue: {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: 'USA',
    },
    virtual: {
      platform: '',
      link: '',
    },
    visibility: 'public',
    registration: 'open',
    capacity: 100,
    waitlistEnabled: true,
    ticketTypes: [
      {
        id: crypto.randomUUID(),
        name: 'General Admission',
        price: 0,
        quantity: 100,
        description: 'Standard entry',
        features: [],
        maxPerOrder: 10,
      },
    ],
    agenda: [],
    tags: [],
    organizer: {
      name: '',
      email: '',
    },
    reminders: {
      enabled: true,
      days: [1, 7],
    },
    checkIn: {
      enabled: true,
      qrCode: true,
      guestList: true,
    },
  });

  const handleComplete = useCallback(async () => {
    onPublish?.(config);
  }, [config, onPublish]);

  return (
    <div className={cn('h-full max-h-[800px] min-h-[600px] bg-gray-50 rounded-xl overflow-hidden flex flex-col', className)}>
      <LobbiWizard
        steps={WIZARD_STEPS}
        onComplete={handleComplete}
        allowStepClick
      >
        <EventBuilderContent
          config={config}
          setConfig={setConfig}
          onSave={onSave}
        />
      </LobbiWizard>
    </div>
  );
}

// =============================================================================
// BUILDER CONTENT
// =============================================================================

interface EventBuilderContentProps {
  config: EventConfig;
  setConfig: React.Dispatch<React.SetStateAction<EventConfig>>;
  onSave?: (config: EventConfig) => void;
}

function EventBuilderContent({
  config,
  setConfig,
  onSave,
}: EventBuilderContentProps) {
  return (
    <>
      <WizardStepContent stepId="details">
        <DetailsStep config={config} setConfig={setConfig} />
      </WizardStepContent>

      <WizardStepContent stepId="location">
        <LocationStep config={config} setConfig={setConfig} />
      </WizardStepContent>

      <WizardStepContent stepId="tickets">
        <TicketsStep config={config} setConfig={setConfig} />
      </WizardStepContent>

      <WizardStepContent stepId="settings">
        <SettingsStep config={config} setConfig={setConfig} />
      </WizardStepContent>

      <WizardStepContent stepId="preview">
        <PreviewStep config={config} onSave={onSave} />
      </WizardStepContent>
    </>
  );
}

// =============================================================================
// STEP 1: DETAILS
// =============================================================================

function DetailsStep({
  config,
  setConfig,
}: {
  config: EventConfig;
  setConfig: React.Dispatch<React.SetStateAction<EventConfig>>;
}) {
  const { setCanGoNext } = useWizard();

  const isValid = config.name && config.category && config.date;
  setCanGoNext(Boolean(isValid));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Basic Info */}
      <WizardCard title="Event Information">
        <div className="space-y-4">
          <LobbiInput
            label="Event Name"
            value={config.name}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="e.g., Annual Gala Dinner 2026"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description
            </label>
            <input
              type="text"
              value={config.shortDescription}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, shortDescription: e.target.value }))
              }
              placeholder="One-line summary for listings (max 120 chars)"
              maxLength={120}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Description
            </label>
            <textarea
              value={config.description}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Detailed event description with all the information attendees need..."
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500"
            />
          </div>
        </div>
      </WizardCard>

      {/* Category */}
      <WizardCard title="Event Category">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {EVENT_CATEGORIES.map(({ value, label, icon: Icon }) => (
            <motion.button
              key={value}
              onClick={() =>
                setConfig((prev) => ({ ...prev, category: value }))
              }
              className={cn(
                'p-3 rounded-xl border-2 transition-all text-center',
                config.category === value
                  ? 'border-gold-500 bg-gold-50'
                  : 'border-gray-200 hover:border-gold-300 bg-white'
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon
                className={cn(
                  'w-6 h-6 mx-auto mb-1',
                  config.category === value ? 'text-gold-600' : 'text-gray-500'
                )}
              />
              <p
                className={cn(
                  'text-xs font-medium',
                  config.category === value ? 'text-gold-700' : 'text-gray-600'
                )}
              >
                {label}
              </p>
            </motion.button>
          ))}
        </div>
      </WizardCard>

      {/* Event Type */}
      <WizardCard title="Event Format">
        <div className="flex gap-4">
          {[
            { value: 'in-person', label: 'In Person', icon: MapPin, desc: 'Physical venue' },
            { value: 'virtual', label: 'Virtual', icon: Video, desc: 'Online streaming' },
            { value: 'hybrid', label: 'Hybrid', icon: Globe, desc: 'Both options' },
          ].map(({ value, label, icon: Icon, desc }) => (
            <button
              key={value}
              onClick={() =>
                setConfig((prev) => ({ ...prev, type: value as EventType }))
              }
              className={cn(
                'flex-1 p-4 rounded-xl border-2 transition-all text-center',
                config.type === value
                  ? 'border-gold-500 bg-gold-50'
                  : 'border-gray-200 hover:border-gold-300 bg-white'
              )}
            >
              <Icon
                className={cn(
                  'w-8 h-8 mx-auto mb-2',
                  config.type === value ? 'text-gold-600' : 'text-gray-500'
                )}
              />
              <p
                className={cn(
                  'font-medium',
                  config.type === value ? 'text-gold-700' : 'text-gray-900'
                )}
              >
                {label}
              </p>
              <p className="text-xs text-gray-500 mt-1">{desc}</p>
            </button>
          ))}
        </div>
      </WizardCard>

      {/* Date & Time */}
      <WizardCard title="Date & Time">
        <div className="grid gap-4 md:grid-cols-4">
          <LobbiInput
            label="Date"
            type="date"
            value={config.date}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, date: e.target.value }))
            }
            required
          />
          <LobbiInput
            label="Start Time"
            type="time"
            value={config.startTime}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, startTime: e.target.value }))
            }
          />
          <LobbiInput
            label="End Time"
            type="time"
            value={config.endTime}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, endTime: e.target.value }))
            }
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              value={config.timezone}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, timezone: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </WizardCard>

      {/* Cover Image */}
      <WizardCard
        title="Event Image"
        description="Add a cover image to make your event stand out"
      >
        <div className="flex gap-4">
          <div
            className={cn(
              'w-48 h-32 rounded-xl border-2 border-dashed flex items-center justify-center',
              'bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer',
              config.imageUrl ? 'border-gold-300' : 'border-gray-300'
            )}
          >
            {config.imageUrl ? (
              <img
                src={config.imageUrl}
                alt="Event cover"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="text-center">
                <Image className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-xs text-gray-500">Upload image</p>
              </div>
            )}
          </div>
          <div className="flex-1">
            <LobbiInput
              label="Image URL"
              value={config.imageUrl}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, imageUrl: e.target.value }))
              }
              placeholder="https://..."
            />
            <p className="text-xs text-gray-500 mt-2">
              Recommended: 1200x630px, JPG or PNG
            </p>
          </div>
        </div>
      </WizardCard>
    </div>
  );
}

// =============================================================================
// STEP 2: LOCATION
// =============================================================================

function LocationStep({
  config,
  setConfig,
}: {
  config: EventConfig;
  setConfig: React.Dispatch<React.SetStateAction<EventConfig>>;
}) {
  const showPhysical = config.type === 'in-person' || config.type === 'hybrid';
  const showVirtual = config.type === 'virtual' || config.type === 'hybrid';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Physical Venue */}
      {showPhysical && (
        <WizardCard
          title="Venue Details"
          description="Where will the event take place?"
        >
          <div className="space-y-4">
            <LobbiInput
              label="Venue Name"
              value={config.venue.name}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  venue: { ...prev.venue, name: e.target.value },
                }))
              }
              placeholder="e.g., Grand Ballroom"
            />
            <LobbiInput
              label="Street Address"
              value={config.venue.address}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  venue: { ...prev.venue, address: e.target.value },
                }))
              }
              placeholder="123 Main Street"
            />
            <div className="grid gap-4 md:grid-cols-4">
              <LobbiInput
                label="City"
                value={config.venue.city}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    venue: { ...prev.venue, city: e.target.value },
                  }))
                }
              />
              <LobbiInput
                label="State"
                value={config.venue.state}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    venue: { ...prev.venue, state: e.target.value },
                  }))
                }
              />
              <LobbiInput
                label="ZIP Code"
                value={config.venue.zip}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    venue: { ...prev.venue, zip: e.target.value },
                  }))
                }
              />
              <LobbiInput
                label="Country"
                value={config.venue.country}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    venue: { ...prev.venue, country: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions
              </label>
              <textarea
                value={config.venue.instructions || ''}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    venue: { ...prev.venue, instructions: e.target.value },
                  }))
                }
                placeholder="Parking info, entrance details, dress code..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </WizardCard>
      )}

      {/* Virtual Setup */}
      {showVirtual && (
        <WizardCard
          title="Virtual Event Setup"
          description="Configure your online streaming platform"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <div className="flex flex-wrap gap-2">
                {VIRTUAL_PLATFORMS.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() =>
                      setConfig((prev) => ({
                        ...prev,
                        virtual: { ...prev.virtual, platform: value },
                      }))
                    }
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      config.virtual.platform === value
                        ? 'bg-gold-500 text-white'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-gold-300'
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <LobbiInput
              label="Meeting Link"
              value={config.virtual.link}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  virtual: { ...prev.virtual, link: e.target.value },
                }))
              }
              placeholder="https://zoom.us/j/..."
            />
            <LobbiInput
              label="Password (optional)"
              value={config.virtual.password || ''}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  virtual: { ...prev.virtual, password: e.target.value },
                }))
              }
              placeholder="Meeting password"
            />
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Tip:</strong> The meeting link will only be shared with
                registered attendees after they confirm their registration.
              </p>
            </div>
          </div>
        </WizardCard>
      )}

      {/* Agenda */}
      <WizardCard
        title="Event Agenda"
        description="Add a schedule for your event (optional)"
      >
        <div className="space-y-4">
          <AnimatePresence>
            {config.agenda.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <input
                  type="time"
                  value={item.time}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      agenda: prev.agenda.map((a) =>
                        a.id === item.id ? { ...a, time: e.target.value } : a
                      ),
                    }))
                  }
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      agenda: prev.agenda.map((a) =>
                        a.id === item.id ? { ...a, title: e.target.value } : a
                      ),
                    }))
                  }
                  placeholder="Session title"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="text"
                  value={item.speaker || ''}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      agenda: prev.agenda.map((a) =>
                        a.id === item.id ? { ...a, speaker: e.target.value } : a
                      ),
                    }))
                  }
                  placeholder="Speaker"
                  className="w-40 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <button
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      agenda: prev.agenda.filter((a) => a.id !== item.id),
                    }))
                  }
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <button
            onClick={() =>
              setConfig((prev) => ({
                ...prev,
                agenda: [
                  ...prev.agenda,
                  {
                    id: crypto.randomUUID(),
                    time: '',
                    title: '',
                  },
                ],
              }))
            }
            className={cn(
              'w-full p-3 border-2 border-dashed border-gray-300 rounded-lg',
              'text-gray-500 hover:border-gold-400 hover:text-gold-600',
              'transition-colors flex items-center justify-center gap-2'
            )}
          >
            <Plus className="w-4 h-4" />
            Add Agenda Item
          </button>
        </div>
      </WizardCard>
    </div>
  );
}

// =============================================================================
// STEP 3: TICKETS
// =============================================================================

function TicketsStep({
  config,
  setConfig,
}: {
  config: EventConfig;
  setConfig: React.Dispatch<React.SetStateAction<EventConfig>>;
}) {
  const addTicketType = () => {
    setConfig((prev) => ({
      ...prev,
      ticketTypes: [
        ...prev.ticketTypes,
        {
          id: crypto.randomUUID(),
          name: '',
          price: 0,
          quantity: 50,
          description: '',
          features: [],
          maxPerOrder: 10,
        },
      ],
    }));
  };

  const updateTicketType = (ticketId: string, updates: Partial<TicketType>) => {
    setConfig((prev) => ({
      ...prev,
      ticketTypes: prev.ticketTypes.map((t) =>
        t.id === ticketId ? { ...t, ...updates } : t
      ),
    }));
  };

  const removeTicketType = (ticketId: string) => {
    setConfig((prev) => ({
      ...prev,
      ticketTypes: prev.ticketTypes.filter((t) => t.id !== ticketId),
    }));
  };

  const totalCapacity = config.ticketTypes.reduce((sum, t) => sum + t.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Capacity Overview */}
      <WizardCard title="Event Capacity">
        <div className="flex items-center gap-8">
          <div>
            <p className="text-3xl font-bold text-gold-600">{totalCapacity}</p>
            <p className="text-sm text-gray-500">Total tickets available</p>
          </div>
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
                style={{ width: '0%' }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">0 sold</p>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.waitlistEnabled}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, waitlistEnabled: e.target.checked }))
              }
              className="w-5 h-5 rounded border-gray-300 text-gold-500 focus:ring-gold-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Enable Waitlist
            </span>
          </label>
        </div>
      </WizardCard>

      {/* Ticket Types */}
      <WizardCard
        title="Ticket Types"
        description="Create different ticket options for your event"
      >
        <div className="space-y-4">
          {config.ticketTypes.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              layout
              className="p-4 bg-gray-50 rounded-xl border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-gold-500" />
                  <span className="font-medium text-gray-900">
                    Ticket {index + 1}
                  </span>
                </div>
                {config.ticketTypes.length > 1 && (
                  <button
                    onClick={() => removeTicketType(ticket.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <LobbiInput
                  label="Ticket Name"
                  value={ticket.name}
                  onChange={(e) =>
                    updateTicketType(ticket.id, { name: e.target.value })
                  }
                  placeholder="e.g., VIP Pass"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      value={ticket.price}
                      onChange={(e) =>
                        updateTicketType(ticket.id, {
                          price: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
                <LobbiInput
                  label="Quantity"
                  type="number"
                  value={ticket.quantity}
                  onChange={(e) =>
                    updateTicketType(ticket.id, {
                      quantity: parseInt(e.target.value) || 0,
                    })
                  }
                  min={1}
                />
                <LobbiInput
                  label="Max Per Order"
                  type="number"
                  value={ticket.maxPerOrder}
                  onChange={(e) =>
                    updateTicketType(ticket.id, {
                      maxPerOrder: parseInt(e.target.value) || 1,
                    })
                  }
                  min={1}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={ticket.description}
                  onChange={(e) =>
                    updateTicketType(ticket.id, { description: e.target.value })
                  }
                  placeholder="What's included with this ticket..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              {/* Early Bird Pricing */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!ticket.earlyBirdPrice}
                      onChange={(e) =>
                        updateTicketType(ticket.id, {
                          earlyBirdPrice: e.target.checked ? ticket.price * 0.8 : undefined,
                        })
                      }
                      className="w-4 h-4 rounded border-gray-300 text-gold-500 focus:ring-gold-500"
                    />
                    <span className="text-sm text-gray-600">
                      Early bird pricing
                    </span>
                  </label>
                  {ticket.earlyBirdPrice !== undefined && (
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                        <input
                          type="number"
                          value={ticket.earlyBirdPrice}
                          onChange={(e) =>
                            updateTicketType(ticket.id, {
                              earlyBirdPrice: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-24 pl-6 pr-2 py-1 border border-gray-300 rounded-lg text-sm"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <span className="text-sm text-gray-500">until</span>
                      <input
                        type="date"
                        value={ticket.earlyBirdEndDate || ''}
                        onChange={(e) =>
                          updateTicketType(ticket.id, {
                            earlyBirdEndDate: e.target.value,
                          })
                        }
                        className="px-2 py-1 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          <button
            onClick={addTicketType}
            className={cn(
              'w-full p-4 border-2 border-dashed border-gray-300 rounded-xl',
              'text-gray-500 hover:border-gold-400 hover:text-gold-600',
              'transition-colors flex items-center justify-center gap-2'
            )}
          >
            <Plus className="w-5 h-5" />
            Add Ticket Type
          </button>
        </div>
      </WizardCard>
    </div>
  );
}

// =============================================================================
// STEP 4: SETTINGS
// =============================================================================

function SettingsStep({
  config,
  setConfig,
}: {
  config: EventConfig;
  setConfig: React.Dispatch<React.SetStateAction<EventConfig>>;
}) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Visibility */}
      <WizardCard title="Event Visibility">
        <div className="flex gap-4">
          {[
            {
              value: 'public',
              label: 'Public',
              icon: Globe,
              desc: 'Anyone can find and register',
            },
            {
              value: 'members-only',
              label: 'Members Only',
              icon: Users,
              desc: 'Only organization members',
            },
            {
              value: 'private',
              label: 'Private',
              icon: Lock,
              desc: 'Invite only, hidden from listings',
            },
          ].map(({ value, label, icon: Icon, desc }) => (
            <button
              key={value}
              onClick={() =>
                setConfig((prev) => ({
                  ...prev,
                  visibility: value as EventVisibility,
                }))
              }
              className={cn(
                'flex-1 p-4 rounded-xl border-2 transition-all text-center',
                config.visibility === value
                  ? 'border-gold-500 bg-gold-50'
                  : 'border-gray-200 hover:border-gold-300 bg-white'
              )}
            >
              <Icon
                className={cn(
                  'w-6 h-6 mx-auto mb-2',
                  config.visibility === value ? 'text-gold-600' : 'text-gray-500'
                )}
              />
              <p
                className={cn(
                  'font-medium text-sm',
                  config.visibility === value ? 'text-gold-700' : 'text-gray-900'
                )}
              >
                {label}
              </p>
              <p className="text-xs text-gray-500 mt-1">{desc}</p>
            </button>
          ))}
        </div>
      </WizardCard>

      {/* Registration */}
      <WizardCard title="Registration Settings">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Registration Type
            </label>
            <div className="flex gap-4">
              {[
                {
                  value: 'open',
                  label: 'Open Registration',
                  desc: 'Anyone can register immediately',
                },
                {
                  value: 'approval',
                  label: 'Requires Approval',
                  desc: 'Review and approve registrations',
                },
                {
                  value: 'invite-only',
                  label: 'Invite Only',
                  desc: 'Only invited guests can register',
                },
              ].map(({ value, label, desc }) => (
                <button
                  key={value}
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      registration: value as RegistrationType,
                    }))
                  }
                  className={cn(
                    'flex-1 p-3 rounded-lg border-2 transition-all text-left',
                    config.registration === value
                      ? 'border-gold-500 bg-gold-50'
                      : 'border-gray-200 hover:border-gold-300 bg-white'
                  )}
                >
                  <p
                    className={cn(
                      'font-medium text-sm',
                      config.registration === value
                        ? 'text-gold-700'
                        : 'text-gray-900'
                    )}
                  >
                    {label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </WizardCard>

      {/* Organizer */}
      <WizardCard title="Organizer Contact">
        <div className="grid gap-4 md:grid-cols-3">
          <LobbiInput
            label="Name"
            value={config.organizer.name}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                organizer: { ...prev.organizer, name: e.target.value },
              }))
            }
            placeholder="Event organizer name"
          />
          <LobbiInput
            label="Email"
            type="email"
            value={config.organizer.email}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                organizer: { ...prev.organizer, email: e.target.value },
              }))
            }
            placeholder="contact@example.com"
          />
          <LobbiInput
            label="Phone (optional)"
            type="tel"
            value={config.organizer.phone || ''}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                organizer: { ...prev.organizer, phone: e.target.value },
              }))
            }
            placeholder="(555) 123-4567"
          />
        </div>
      </WizardCard>

      {/* Reminders */}
      <WizardCard title="Email Reminders">
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.reminders.enabled}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  reminders: { ...prev.reminders, enabled: e.target.checked },
                }))
              }
              className="w-5 h-5 rounded border-gray-300 text-gold-500 focus:ring-gold-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Send reminder emails to registered attendees
            </span>
          </label>
          {config.reminders.enabled && (
            <div className="flex flex-wrap gap-2 pl-8">
              {[1, 3, 7, 14].map((days) => (
                <button
                  key={days}
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      reminders: {
                        ...prev.reminders,
                        days: prev.reminders.days.includes(days)
                          ? prev.reminders.days.filter((d) => d !== days)
                          : [...prev.reminders.days, days].sort((a, b) => a - b),
                      },
                    }))
                  }
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    config.reminders.days.includes(days)
                      ? 'bg-gold-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {days} day{days > 1 ? 's' : ''} before
                </button>
              ))}
            </div>
          )}
        </div>
      </WizardCard>

      {/* Check-in */}
      <WizardCard title="Check-in Options">
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={config.checkIn.enabled}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  checkIn: { ...prev.checkIn, enabled: e.target.checked },
                }))
              }
              className="w-5 h-5 rounded border-gray-300 text-gold-500 focus:ring-gold-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Enable event check-in
            </span>
          </label>
          {config.checkIn.enabled && (
            <div className="flex gap-6 pl-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.checkIn.qrCode}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      checkIn: { ...prev.checkIn, qrCode: e.target.checked },
                    }))
                  }
                  className="w-4 h-4 rounded border-gray-300 text-gold-500 focus:ring-gold-500"
                />
                <QrCode className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">QR Code scanning</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.checkIn.guestList}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      checkIn: { ...prev.checkIn, guestList: e.target.checked },
                    }))
                  }
                  className="w-4 h-4 rounded border-gray-300 text-gold-500 focus:ring-gold-500"
                />
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Guest list lookup</span>
              </label>
            </div>
          )}
        </div>
      </WizardCard>
    </div>
  );
}

// =============================================================================
// STEP 5: PREVIEW
// =============================================================================

function PreviewStep({
  config,
  onSave,
}: {
  config: EventConfig;
  onSave?: (config: EventConfig) => void;
}) {
  const category = EVENT_CATEGORIES.find((c) => c.value === config.category);
  const totalTickets = config.ticketTypes.reduce((sum, t) => sum + t.quantity, 0);
  const lowestPrice = Math.min(...config.ticketTypes.map((t) => t.price));
  const highestPrice = Math.max(...config.ticketTypes.map((t) => t.price));

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'TBD';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Event Card Preview */}
      <WizardCard title="Event Page Preview">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
          {/* Banner */}
          <div className="h-56 bg-gradient-to-br from-gold-100 via-gold-200 to-gold-300 relative">
            {config.imageUrl ? (
              <img
                src={config.imageUrl}
                alt={config.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <CalendarDays className="w-20 h-20 text-gold-400/50" />
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-sm font-medium text-gold-700">
                {category?.label || 'Event'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h1
              className="text-2xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {config.name || 'Event Name'}
            </h1>
            <p className="text-gray-600 mb-4">
              {config.shortDescription || 'Event description...'}
            </p>

            {/* Key Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {config.date
                      ? new Date(config.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'TBD'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="text-sm font-medium text-gray-900">
                    {config.startTime || 'TBD'}
                    {config.endTime && ` - ${config.endTime}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center">
                  {config.type === 'virtual' ? (
                    <Video className="w-5 h-5 text-gold-600" />
                  ) : (
                    <MapPin className="w-5 h-5 text-gold-600" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {config.type === 'virtual'
                      ? 'Online Event'
                      : config.venue.city || 'TBD'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Capacity</p>
                  <p className="text-sm font-medium text-gray-900">
                    {totalTickets} spots
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-sm text-gray-500">Starting from</p>
                <p className="text-2xl font-bold text-gold-600">
                  {lowestPrice === 0 ? (
                    'Free'
                  ) : (
                    <>
                      ${lowestPrice.toFixed(2)}
                      {lowestPrice !== highestPrice && (
                        <span className="text-sm text-gray-400 font-normal">
                          {' '}
                          - ${highestPrice.toFixed(2)}
                        </span>
                      )}
                    </>
                  )}
                </p>
              </div>
              <LobbiButton variant="primary">Register Now</LobbiButton>
            </div>
          </div>
        </div>
      </WizardCard>

      {/* Summary */}
      <WizardCard title="Event Summary">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Date & Time</label>
              <p className="text-gray-900">{formatDate(config.date)}</p>
              <p className="text-gray-600 text-sm">
                {config.startTime} - {config.endTime} ({config.timezone})
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Location</label>
              {config.type !== 'virtual' && config.venue.name && (
                <p className="text-gray-900">{config.venue.name}</p>
              )}
              {config.type !== 'virtual' && config.venue.address && (
                <p className="text-gray-600 text-sm">
                  {config.venue.address}, {config.venue.city}, {config.venue.state}{' '}
                  {config.venue.zip}
                </p>
              )}
              {config.type !== 'in-person' && config.virtual.platform && (
                <p className="text-gray-600 text-sm">
                  Virtual via {config.virtual.platform}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Tickets</label>
              <div className="space-y-1">
                {config.ticketTypes.map((ticket) => (
                  <p key={ticket.id} className="text-gray-900">
                    {ticket.name}: ${ticket.price.toFixed(2)} ({ticket.quantity}{' '}
                    available)
                  </p>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Registration
              </label>
              <p className="text-gray-900 capitalize">
                {config.registration.replace('-', ' ')}
              </p>
              <p className="text-gray-600 text-sm capitalize">
                {config.visibility} event
              </p>
            </div>
          </div>
        </div>
      </WizardCard>

      {/* Share Options */}
      <WizardCard
        title="Share Your Event"
        description="Spread the word once your event is published"
      >
        <div className="flex items-center gap-4">
          <LobbiButton
            variant="secondary"
            leftIcon={<Copy className="w-4 h-4" />}
          >
            Copy Link
          </LobbiButton>
          <button className="p-3 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
            <Facebook className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-lg bg-sky-100 text-sky-600 hover:bg-sky-200 transition-colors">
            <Twitter className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
            <Linkedin className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Mail className="w-5 h-5" />
          </button>
        </div>
      </WizardCard>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <LobbiButton variant="secondary" onClick={() => onSave?.(config)}>
          Save as Draft
        </LobbiButton>
      </div>
    </div>
  );
}

export default EventBuilder;

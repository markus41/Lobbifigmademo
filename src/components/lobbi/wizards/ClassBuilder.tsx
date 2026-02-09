/**
 * ClassBuilder - Advanced class/course creation wizard
 *
 * Features:
 * - Course details and description
 * - Recurring schedule builder
 * - Instructor assignment
 * - Capacity and waitlist management
 * - Pricing tiers
 * - Prerequisites and requirements
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  Calendar,
  Clock,
  Users,
  DollarSign,
  MapPin,
  Repeat,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Video,
  BookOpen,
  Eye,
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

type ClassType = 'in-person' | 'online' | 'hybrid';
type RecurrenceType = 'once' | 'daily' | 'weekly' | 'biweekly' | 'monthly';
type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'all';

interface Instructor {
  id: string;
  name: string;
  avatar?: string;
  specialties: string[];
}

interface PriceTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isDefault?: boolean;
}

interface ScheduleSession {
  id: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  location?: string;
}

interface ClassConfig {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  type: ClassType;
  skillLevel: SkillLevel;
  imageUrl: string;
  instructorId: string;
  capacity: number;
  waitlistEnabled: boolean;
  waitlistCapacity: number;
  recurrence: RecurrenceType;
  schedule: ScheduleSession[];
  startDate: string;
  endDate: string;
  priceTiers: PriceTier[];
  prerequisites: string[];
  equipment: string[];
  tags: string[];
}

// =============================================================================
// CONSTANTS
// =============================================================================

const SAMPLE_INSTRUCTORS: Instructor[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    specialties: ['Yoga', 'Pilates', 'Meditation'],
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    specialties: ['CrossFit', 'Strength Training', 'HIIT'],
  },
  {
    id: '3',
    name: 'Emily Roberts',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    specialties: ['Dance', 'Zumba', 'Aerobics'],
  },
  {
    id: '4',
    name: 'David Park',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    specialties: ['Swimming', 'Aqua Fitness', 'Triathlon'],
  },
];

const CATEGORIES = [
  'Fitness',
  'Yoga',
  'Dance',
  'Martial Arts',
  'Swimming',
  'Sports',
  'Wellness',
  'Education',
  'Arts & Crafts',
  'Music',
  'Language',
  'Technology',
];

const DAYS_OF_WEEK: { value: DayOfWeek; label: string; short: string }[] = [
  { value: 'mon', label: 'Monday', short: 'Mon' },
  { value: 'tue', label: 'Tuesday', short: 'Tue' },
  { value: 'wed', label: 'Wednesday', short: 'Wed' },
  { value: 'thu', label: 'Thursday', short: 'Thu' },
  { value: 'fri', label: 'Friday', short: 'Fri' },
  { value: 'sat', label: 'Saturday', short: 'Sat' },
  { value: 'sun', label: 'Sunday', short: 'Sun' },
];

const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'details',
    title: 'Class Details',
    description: 'Basic information',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: 'schedule',
    title: 'Schedule',
    description: 'Set times & dates',
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: 'pricing',
    title: 'Pricing',
    description: 'Set price tiers',
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    id: 'preview',
    title: 'Review',
    description: 'Preview & publish',
    icon: <Eye className="w-5 h-5" />,
  },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export interface ClassBuilderProps {
  onSave?: (config: ClassConfig) => void;
  onPublish?: (config: ClassConfig) => void;
  className?: string;
}

export function ClassBuilder({
  onSave,
  onPublish,
  className,
}: ClassBuilderProps) {
  const [config, setConfig] = useState<ClassConfig>({
    id: crypto.randomUUID(),
    name: '',
    description: '',
    shortDescription: '',
    category: '',
    type: 'in-person',
    skillLevel: 'all',
    imageUrl: '',
    instructorId: '',
    capacity: 20,
    waitlistEnabled: true,
    waitlistCapacity: 10,
    recurrence: 'weekly',
    schedule: [],
    startDate: '',
    endDate: '',
    priceTiers: [
      {
        id: crypto.randomUUID(),
        name: 'Standard',
        price: 0,
        description: 'Regular member access',
        features: ['Access to all sessions', 'Equipment included'],
        isDefault: true,
      },
    ],
    prerequisites: [],
    equipment: [],
    tags: [],
  });

  const handleComplete = useCallback(async () => {
    onPublish?.(config);
  }, [config, onPublish]);

  return (
    <div className={cn('h-[800px] bg-gray-50 rounded-xl overflow-hidden', className)}>
      <LobbiWizard
        steps={WIZARD_STEPS}
        onComplete={handleComplete}
        allowStepClick
      >
        <ClassBuilderContent
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

interface ClassBuilderContentProps {
  config: ClassConfig;
  setConfig: React.Dispatch<React.SetStateAction<ClassConfig>>;
  onSave?: (config: ClassConfig) => void;
}

function ClassBuilderContent({
  config,
  setConfig,
  onSave,
}: ClassBuilderContentProps) {
  return (
    <>
      <WizardStepContent stepId="details">
        <DetailsStep config={config} setConfig={setConfig} />
      </WizardStepContent>

      <WizardStepContent stepId="schedule">
        <ScheduleStep config={config} setConfig={setConfig} />
      </WizardStepContent>

      <WizardStepContent stepId="pricing">
        <PricingStep config={config} setConfig={setConfig} />
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
  config: ClassConfig;
  setConfig: React.Dispatch<React.SetStateAction<ClassConfig>>;
}) {
  const { setCanGoNext } = useWizard();

  // Validate before proceeding
  const isValid = config.name && config.category && config.instructorId;
  setCanGoNext(Boolean(isValid));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Basic Info */}
      <WizardCard title="Basic Information">
        <div className="grid gap-4 md:grid-cols-2">
          <LobbiInput
            label="Class Name"
            value={config.name}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="e.g., Morning Yoga Flow"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={config.category}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500"
            >
              <option value="">Select category...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description
          </label>
          <input
            type="text"
            value={config.shortDescription}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, shortDescription: e.target.value }))
            }
            placeholder="Brief description for listings (max 150 chars)"
            maxLength={150}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Description
          </label>
          <textarea
            value={config.description}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Detailed class description..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500"
          />
        </div>
      </WizardCard>

      {/* Class Type & Level */}
      <WizardCard title="Class Type & Level">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Class Type
            </label>
            <div className="flex gap-2">
              {[
                { value: 'in-person', label: 'In Person', icon: MapPin },
                { value: 'online', label: 'Online', icon: Video },
                { value: 'hybrid', label: 'Hybrid', icon: Users },
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() =>
                    setConfig((prev) => ({ ...prev, type: value as ClassType }))
                  }
                  className={cn(
                    'flex-1 p-3 rounded-lg border-2 transition-all',
                    'flex flex-col items-center gap-2',
                    config.type === value
                      ? 'border-gold-500 bg-gold-50'
                      : 'border-gray-200 hover:border-gold-300'
                  )}
                >
                  <Icon
                    className={cn(
                      'w-5 h-5',
                      config.type === value ? 'text-gold-600' : 'text-gray-500'
                    )}
                  />
                  <span
                    className={cn(
                      'text-sm font-medium',
                      config.type === value ? 'text-gold-700' : 'text-gray-700'
                    )}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Skill Level
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'All Levels' },
                { value: 'beginner', label: 'Beginner' },
                { value: 'intermediate', label: 'Intermediate' },
                { value: 'advanced', label: 'Advanced' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      skillLevel: value as SkillLevel,
                    }))
                  }
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    config.skillLevel === value
                      ? 'bg-gold-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-gold-300'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </WizardCard>

      {/* Instructor Selection */}
      <WizardCard title="Instructor">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SAMPLE_INSTRUCTORS.map((instructor) => (
            <motion.button
              key={instructor.id}
              onClick={() =>
                setConfig((prev) => ({ ...prev, instructorId: instructor.id }))
              }
              className={cn(
                'relative p-4 rounded-xl border-2 transition-all text-center',
                config.instructorId === instructor.id
                  ? 'border-gold-500 bg-gold-50'
                  : 'border-gray-200 hover:border-gold-300 bg-white'
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="w-16 h-16 rounded-full mx-auto mb-3"
              />
              <p className="font-medium text-gray-900">{instructor.name}</p>
              <p className="text-xs text-gray-500 mt-1">
                {instructor.specialties.slice(0, 2).join(', ')}
              </p>
              {config.instructorId === instructor.id && (
                <div className="absolute top-2 right-2">
                  <Check className="w-5 h-5 text-gold-500" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </WizardCard>

      {/* Capacity */}
      <WizardCard title="Capacity & Waitlist">
        <div className="grid gap-4 md:grid-cols-3">
          <LobbiInput
            label="Class Capacity"
            type="number"
            value={config.capacity}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                capacity: parseInt(e.target.value) || 0,
              }))
            }
            min={1}
          />
          <div className="flex items-end gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={config.waitlistEnabled}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    waitlistEnabled: e.target.checked,
                  }))
                }
                className="w-5 h-5 rounded border-gray-300 text-gold-500 focus:ring-gold-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Enable Waitlist
              </span>
            </label>
          </div>
          {config.waitlistEnabled && (
            <LobbiInput
              label="Waitlist Capacity"
              type="number"
              value={config.waitlistCapacity}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  waitlistCapacity: parseInt(e.target.value) || 0,
                }))
              }
              min={1}
            />
          )}
        </div>
      </WizardCard>
    </div>
  );
}

// =============================================================================
// STEP 2: SCHEDULE
// =============================================================================

function ScheduleStep({
  config,
  setConfig,
}: {
  config: ClassConfig;
  setConfig: React.Dispatch<React.SetStateAction<ClassConfig>>;
}) {
  const addSession = () => {
    setConfig((prev) => ({
      ...prev,
      schedule: [
        ...prev.schedule,
        {
          id: crypto.randomUUID(),
          dayOfWeek: 'mon',
          startTime: '09:00',
          endTime: '10:00',
          location: '',
        },
      ],
    }));
  };

  const updateSession = (sessionId: string, updates: Partial<ScheduleSession>) => {
    setConfig((prev) => ({
      ...prev,
      schedule: prev.schedule.map((s) =>
        s.id === sessionId ? { ...s, ...updates } : s
      ),
    }));
  };

  const removeSession = (sessionId: string) => {
    setConfig((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((s) => s.id !== sessionId),
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Recurrence */}
      <WizardCard title="Recurrence Pattern">
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'once', label: 'One-time' },
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'biweekly', label: 'Bi-weekly' },
            { value: 'monthly', label: 'Monthly' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() =>
                setConfig((prev) => ({
                  ...prev,
                  recurrence: value as RecurrenceType,
                }))
              }
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                config.recurrence === value
                  ? 'bg-gold-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gold-300'
              )}
            >
              <Repeat
                className={cn(
                  'w-4 h-4 inline mr-2',
                  config.recurrence === value ? 'text-white' : 'text-gray-400'
                )}
              />
              {label}
            </button>
          ))}
        </div>
      </WizardCard>

      {/* Date Range */}
      <WizardCard title="Class Duration">
        <div className="grid gap-4 md:grid-cols-2">
          <LobbiInput
            label="Start Date"
            type="date"
            value={config.startDate}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, startDate: e.target.value }))
            }
          />
          <LobbiInput
            label="End Date"
            type="date"
            value={config.endDate}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, endDate: e.target.value }))
            }
          />
        </div>
      </WizardCard>

      {/* Sessions */}
      <WizardCard
        title="Class Sessions"
        description="Add the weekly schedule for this class"
      >
        <div className="space-y-4">
          <AnimatePresence>
            {config.schedule.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <span className="text-sm font-medium text-gray-500 w-6">
                  {index + 1}.
                </span>
                <select
                  value={session.dayOfWeek}
                  onChange={(e) =>
                    updateSession(session.id, {
                      dayOfWeek: e.target.value as DayOfWeek,
                    })
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  {DAYS_OF_WEEK.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <input
                    type="time"
                    value={session.startTime}
                    onChange={(e) =>
                      updateSession(session.id, { startTime: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={session.endTime}
                    onChange={(e) =>
                      updateSession(session.id, { endTime: e.target.value })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                {config.type !== 'online' && (
                  <input
                    type="text"
                    value={session.location || ''}
                    onChange={(e) =>
                      updateSession(session.id, { location: e.target.value })
                    }
                    placeholder="Location/Room"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                )}
                <button
                  onClick={() => removeSession(session.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <button
            onClick={addSession}
            className={cn(
              'w-full p-4 border-2 border-dashed border-gray-300 rounded-lg',
              'text-gray-500 hover:border-gold-400 hover:text-gold-600',
              'transition-colors flex items-center justify-center gap-2'
            )}
          >
            <Plus className="w-4 h-4" />
            Add Session
          </button>
        </div>
      </WizardCard>

      {/* Quick Preview */}
      {config.schedule.length > 0 && (
        <WizardCard title="Schedule Preview">
          <div className="grid grid-cols-7 gap-2">
            {DAYS_OF_WEEK.map((day) => {
              const sessions = config.schedule.filter(
                (s) => s.dayOfWeek === day.value
              );
              return (
                <div
                  key={day.value}
                  className={cn(
                    'p-3 rounded-lg text-center',
                    sessions.length > 0 ? 'bg-gold-50' : 'bg-gray-50'
                  )}
                >
                  <p
                    className={cn(
                      'text-xs font-medium mb-2',
                      sessions.length > 0 ? 'text-gold-700' : 'text-gray-500'
                    )}
                  >
                    {day.short}
                  </p>
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      className="text-xs text-gold-600 bg-gold-100 rounded px-1 py-0.5 mb-1"
                    >
                      {session.startTime}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </WizardCard>
      )}
    </div>
  );
}

// =============================================================================
// STEP 3: PRICING
// =============================================================================

function PricingStep({
  config,
  setConfig,
}: {
  config: ClassConfig;
  setConfig: React.Dispatch<React.SetStateAction<ClassConfig>>;
}) {
  const addTier = () => {
    setConfig((prev) => ({
      ...prev,
      priceTiers: [
        ...prev.priceTiers,
        {
          id: crypto.randomUUID(),
          name: '',
          price: 0,
          description: '',
          features: [],
        },
      ],
    }));
  };

  const updateTier = (tierId: string, updates: Partial<PriceTier>) => {
    setConfig((prev) => ({
      ...prev,
      priceTiers: prev.priceTiers.map((t) =>
        t.id === tierId ? { ...t, ...updates } : t
      ),
    }));
  };

  const removeTier = (tierId: string) => {
    setConfig((prev) => ({
      ...prev,
      priceTiers: prev.priceTiers.filter((t) => t.id !== tierId),
    }));
  };

  const setDefaultTier = (tierId: string) => {
    setConfig((prev) => ({
      ...prev,
      priceTiers: prev.priceTiers.map((t) => ({
        ...t,
        isDefault: t.id === tierId,
      })),
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Pricing Tiers */}
      <WizardCard
        title="Pricing Tiers"
        description="Create different pricing options for your class"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {config.priceTiers.map((tier) => (
            <motion.div
              key={tier.id}
              className={cn(
                'relative p-4 rounded-xl border-2',
                tier.isDefault
                  ? 'border-gold-500 bg-gold-50'
                  : 'border-gray-200 bg-white'
              )}
              layout
            >
              {tier.isDefault && (
                <div className="absolute -top-3 left-4 px-2 py-0.5 bg-gold-500 text-white text-xs font-medium rounded">
                  Default
                </div>
              )}
              <div className="space-y-3">
                <input
                  type="text"
                  value={tier.name}
                  onChange={(e) => updateTier(tier.id, { name: e.target.value })}
                  placeholder="Tier name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium"
                />
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={tier.price}
                    onChange={(e) =>
                      updateTier(tier.id, {
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    step="0.01"
                    min="0"
                  />
                </div>
                <textarea
                  value={tier.description}
                  onChange={(e) =>
                    updateTier(tier.id, { description: e.target.value })
                  }
                  placeholder="Description..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  {!tier.isDefault && (
                    <button
                      onClick={() => setDefaultTier(tier.id)}
                      className="text-xs text-gold-600 hover:text-gold-700"
                    >
                      Set as default
                    </button>
                  )}
                  <button
                    onClick={() => removeTier(tier.id)}
                    className="ml-auto p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          <button
            onClick={addTier}
            className={cn(
              'p-4 border-2 border-dashed border-gray-300 rounded-xl',
              'text-gray-500 hover:border-gold-400 hover:text-gold-600',
              'transition-colors flex flex-col items-center justify-center gap-2 min-h-[200px]'
            )}
          >
            <Plus className="w-6 h-6" />
            <span className="text-sm font-medium">Add Pricing Tier</span>
          </button>
        </div>
      </WizardCard>

      {/* Prerequisites */}
      <WizardCard
        title="Prerequisites"
        description="List any requirements for this class"
      >
        <div className="space-y-3">
          {config.prerequisites.map((prereq, index) => (
            <div key={index} className="flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <input
                type="text"
                value={prereq}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    prerequisites: prev.prerequisites.map((p, i) =>
                      i === index ? e.target.value : p
                    ),
                  }))
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <button
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    prerequisites: prev.prerequisites.filter((_, i) => i !== index),
                  }))
                }
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              setConfig((prev) => ({
                ...prev,
                prerequisites: [...prev.prerequisites, ''],
              }))
            }
            className="text-sm text-gold-600 hover:text-gold-700 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Prerequisite
          </button>
        </div>
      </WizardCard>

      {/* Equipment */}
      <WizardCard
        title="Required Equipment"
        description="What participants need to bring"
      >
        <div className="flex flex-wrap gap-2">
          {config.equipment.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm"
            >
              {item}
              <button
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    equipment: prev.equipment.filter((_, i) => i !== index),
                  }))
                }
                className="text-gray-400 hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            placeholder="Add equipment..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const value = e.currentTarget.value.trim();
                if (value) {
                  setConfig((prev) => ({
                    ...prev,
                    equipment: [...prev.equipment, value],
                  }));
                  e.currentTarget.value = '';
                }
              }
            }}
            className="px-3 py-1.5 border border-dashed border-gray-300 rounded-full text-sm focus:border-gold-400 focus:ring-0"
          />
        </div>
      </WizardCard>
    </div>
  );
}

// =============================================================================
// STEP 4: PREVIEW
// =============================================================================

function PreviewStep({
  config,
  onSave,
}: {
  config: ClassConfig;
  onSave?: (config: ClassConfig) => void;
}) {
  const instructor = SAMPLE_INSTRUCTORS.find((i) => i.id === config.instructorId);
  const defaultTier = config.priceTiers.find((t) => t.isDefault);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Class Card Preview */}
      <WizardCard title="Class Listing Preview">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Header Image */}
          <div className="h-48 bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center">
            {config.imageUrl ? (
              <img
                src={config.imageUrl}
                alt={config.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <GraduationCap className="w-16 h-16 text-gold-400" />
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-gold-100 text-gold-700 text-xs font-medium rounded">
                    {config.category || 'Category'}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded capitalize">
                    {config.skillLevel}
                  </span>
                </div>
                <h2
                  className="text-xl font-semibold text-gray-900"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {config.name || 'Class Name'}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {config.shortDescription || 'Short description...'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gold-600">
                  ${defaultTier?.price.toFixed(2) || '0.00'}
                </p>
                <p className="text-xs text-gray-500">per session</p>
              </div>
            </div>

            {/* Instructor */}
            {instructor && (
              <div className="flex items-center gap-3 py-3 border-t border-gray-100">
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {instructor.name}
                  </p>
                  <p className="text-xs text-gray-500">Instructor</p>
                </div>
              </div>
            )}

            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
              <div className="text-center">
                <Calendar className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                <p className="text-xs text-gray-600">
                  {config.schedule.length} sessions/week
                </p>
              </div>
              <div className="text-center">
                <Users className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                <p className="text-xs text-gray-600">
                  {config.capacity} max
                </p>
              </div>
              <div className="text-center">
                {config.type === 'online' ? (
                  <Video className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                ) : (
                  <MapPin className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                )}
                <p className="text-xs text-gray-600 capitalize">{config.type}</p>
              </div>
            </div>
          </div>
        </div>
      </WizardCard>

      {/* Summary */}
      <WizardCard title="Class Summary">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Schedule</label>
              <div className="mt-1">
                {config.schedule.length > 0 ? (
                  config.schedule.map((session) => {
                    const day = DAYS_OF_WEEK.find((d) => d.value === session.dayOfWeek);
                    return (
                      <p key={session.id} className="text-gray-900">
                        {day?.label} {session.startTime} - {session.endTime}
                        {session.location && ` • ${session.location}`}
                      </p>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No sessions scheduled</p>
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Duration</label>
              <p className="text-gray-900">
                {config.startDate || 'TBD'} - {config.endDate || 'TBD'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Recurrence
              </label>
              <p className="text-gray-900 capitalize">{config.recurrence}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Pricing Tiers
              </label>
              <div className="mt-1 space-y-1">
                {config.priceTiers.map((tier) => (
                  <p key={tier.id} className="text-gray-900">
                    {tier.name}: ${tier.price.toFixed(2)}
                    {tier.isDefault && (
                      <span className="ml-2 text-xs text-gold-600">(default)</span>
                    )}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Prerequisites
              </label>
              {config.prerequisites.length > 0 ? (
                <ul className="mt-1 list-disc list-inside text-gray-900">
                  {config.prerequisites.map((prereq, i) => (
                    <li key={i}>{prereq}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">None required</p>
              )}
            </div>
          </div>
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

export default ClassBuilder;

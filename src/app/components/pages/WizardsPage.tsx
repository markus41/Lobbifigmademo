/**
 * WizardsPage - Demo page showcasing all Lobbi wizard builders
 *
 * Features:
 * - Tab navigation between wizards
 * - Full-featured demos of each builder
 * - Responsive layout
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  BarChart3,
  GraduationCap,
  CalendarDays,
  Wand2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LobbiPageHeader } from '@/components/lobbi/layout/LobbiPageHeader';
import {
  EmailTemplateBuilder,
  ReportBuilder,
  ClassBuilder,
  EventBuilder,
} from '@/components/lobbi/wizards';

// =============================================================================
// TYPES
// =============================================================================

type WizardType = 'email' | 'report' | 'class' | 'event';

interface WizardOption {
  id: WizardType;
  name: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const WIZARD_OPTIONS: WizardOption[] = [
  {
    id: 'email',
    name: 'Email Template Builder',
    description: 'Create beautiful email templates with drag-and-drop blocks',
    icon: <Mail className="w-6 h-6" />,
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    id: 'report',
    name: 'Report Builder',
    description: 'Build data visualizations and analytics reports',
    icon: <BarChart3 className="w-6 h-6" />,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'class',
    name: 'Class Builder',
    description: 'Schedule and configure classes with instructors',
    icon: <GraduationCap className="w-6 h-6" />,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'event',
    name: 'Event Builder',
    description: 'Plan events with ticketing and registration',
    icon: <CalendarDays className="w-6 h-6" />,
    gradient: 'from-amber-500 to-orange-500',
  },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function WizardsPage() {
  const [activeWizard, setActiveWizard] = useState<WizardType | null>(null);

  const handleSave = (type: WizardType, data: unknown) => {
    console.log(`${type} saved:`, data);
    // In a real app, this would save to backend
  };

  const handlePublish = (type: WizardType, data: unknown) => {
    console.log(`${type} published:`, data);
    // In a real app, this would publish/activate
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LobbiPageHeader
        title="Wizard Builders"
        description="Create emails, reports, classes, and events with our guided wizards"
        icon={<Wand2 className="w-6 h-6" />}
      />

      <div className="px-6 lg:px-8 py-6">
        <AnimatePresence mode="wait">
          {activeWizard ? (
            <motion.div
              key={activeWizard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back Button */}
              <button
                onClick={() => setActiveWizard(null)}
                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gold-600 transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                <span>Back to Wizards</span>
              </button>

              {/* Active Wizard */}
              {activeWizard === 'email' && (
                <EmailTemplateBuilder
                  onSave={(data) => handleSave('email', data)}
                />
              )}
              {activeWizard === 'report' && (
                <ReportBuilder
                  onSave={(data) => handleSave('report', data)}
                  onExport={(data, format) =>
                    console.log(`Export ${format}:`, data)
                  }
                />
              )}
              {activeWizard === 'class' && (
                <ClassBuilder
                  onSave={(data) => handleSave('class', data)}
                  onPublish={(data) => handlePublish('class', data)}
                />
              )}
              {activeWizard === 'event' && (
                <EventBuilder
                  onSave={(data) => handleSave('event', data)}
                  onPublish={(data) => handlePublish('event', data)}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Wizard Selection Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {WIZARD_OPTIONS.map((wizard, index) => (
                  <WizardCard
                    key={wizard.id}
                    wizard={wizard}
                    index={index}
                    onClick={() => setActiveWizard(wizard.id)}
                  />
                ))}
              </div>

              {/* Feature Highlights */}
              <div className="mt-12">
                <h2
                  className="text-xl font-semibold text-gray-900 mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Why Use Our Wizards?
                </h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      title: 'Guided Experience',
                      description:
                        'Step-by-step workflows ensure you never miss important details',
                      icon: Wand2,
                    },
                    {
                      title: 'Live Preview',
                      description:
                        'See exactly what your creation will look like as you build',
                      icon: Sparkles,
                    },
                    {
                      title: 'Professional Results',
                      description:
                        'Templates and patterns designed by UX experts',
                      icon: ChevronRight,
                    },
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      className="p-4 bg-white rounded-xl border border-gray-200"
                    >
                      <feature.icon className="w-8 h-8 text-gold-500 mb-3" />
                      <h3 className="font-medium text-gray-900 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// =============================================================================
// WIZARD CARD
// =============================================================================

interface WizardCardProps {
  wizard: WizardOption;
  index: number;
  onClick: () => void;
}

function WizardCard({ wizard, index, onClick }: WizardCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        'relative p-6 rounded-2xl bg-white border border-gray-200',
        'hover:border-gold-300 hover:shadow-lg',
        'transition-all duration-300 text-left group overflow-hidden'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Gradient accent */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-1',
          'bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity',
          wizard.gradient
        )}
      />

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0 w-14 h-14 rounded-xl',
            'flex items-center justify-center',
            'bg-gradient-to-br text-white',
            wizard.gradient
          )}
        >
          {wizard.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3
            className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-gold-600 transition-colors"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {wizard.name}
          </h3>
          <p className="text-sm text-gray-600">{wizard.description}</p>
        </div>

        {/* Arrow */}
        <ChevronRight
          className={cn(
            'w-5 h-5 text-gray-400 transition-all',
            'group-hover:text-gold-500 group-hover:translate-x-1'
          )}
        />
      </div>

      {/* Features preview */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {wizard.id === 'email' && (
            <>
              <FeatureTag>Drag & Drop</FeatureTag>
              <FeatureTag>Live Preview</FeatureTag>
              <FeatureTag>Templates</FeatureTag>
            </>
          )}
          {wizard.id === 'report' && (
            <>
              <FeatureTag>Charts</FeatureTag>
              <FeatureTag>Filters</FeatureTag>
              <FeatureTag>Export</FeatureTag>
            </>
          )}
          {wizard.id === 'class' && (
            <>
              <FeatureTag>Scheduling</FeatureTag>
              <FeatureTag>Pricing</FeatureTag>
              <FeatureTag>Capacity</FeatureTag>
            </>
          )}
          {wizard.id === 'event' && (
            <>
              <FeatureTag>Ticketing</FeatureTag>
              <FeatureTag>Registration</FeatureTag>
              <FeatureTag>Check-in</FeatureTag>
            </>
          )}
        </div>
      </div>
    </motion.button>
  );
}

function FeatureTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
      {children}
    </span>
  );
}

export default WizardsPage;

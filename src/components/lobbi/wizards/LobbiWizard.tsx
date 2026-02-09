/**
 * LobbiWizard - Advanced multi-step wizard component system
 *
 * Features:
 * - Step-by-step navigation with progress indicator
 * - Animated transitions between steps
 * - Form validation per step
 * - Art deco themed design
 * - Keyboard navigation support
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LobbiButton } from '../core/LobbiButton';

// =============================================================================
// TYPES
// =============================================================================

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  isOptional?: boolean;
  validate?: () => boolean | Promise<boolean>;
}

export interface WizardContextValue {
  currentStep: number;
  steps: WizardStep[];
  isFirstStep: boolean;
  isLastStep: boolean;
  canGoNext: boolean;
  canGoPrev: boolean;
  goToStep: (index: number) => void;
  goNext: () => Promise<void>;
  goPrev: () => void;
  setCanGoNext: (value: boolean) => void;
  isSubmitting: boolean;
  data: Record<string, unknown>;
  setData: (key: string, value: unknown) => void;
  getData: <T>(key: string) => T | undefined;
}

export interface LobbiWizardProps {
  steps: WizardStep[];
  children: ReactNode;
  onComplete?: (data: Record<string, unknown>) => void | Promise<void>;
  onStepChange?: (step: number, direction: 'next' | 'prev') => void;
  className?: string;
  showStepList?: boolean;
  allowStepClick?: boolean;
}

// =============================================================================
// CONTEXT
// =============================================================================

const WizardContext = createContext<WizardContextValue | null>(null);

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a LobbiWizard');
  }
  return context;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function LobbiWizard({
  steps,
  children,
  onComplete,
  onStepChange,
  className,
  showStepList = true,
  allowStepClick = false,
}: LobbiWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [canGoNext, setCanGoNext] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setDataState] = useState<Record<string, unknown>>({});
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const canGoPrev = !isFirstStep && !isSubmitting;

  const setData = useCallback((key: string, value: unknown) => {
    setDataState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const getData = useCallback(
    <T,>(key: string): T | undefined => {
      return data[key] as T | undefined;
    },
    [data]
  );

  const goToStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < steps.length && !isSubmitting) {
        setDirection(index > currentStep ? 'next' : 'prev');
        setCurrentStep(index);
        onStepChange?.(index, index > currentStep ? 'next' : 'prev');
      }
    },
    [steps.length, isSubmitting, currentStep, onStepChange]
  );

  const goNext = useCallback(async () => {
    if (!canGoNext || isSubmitting) return;

    const step = steps[currentStep];
    if (step.validate) {
      const isValid = await step.validate();
      if (!isValid) return;
    }

    if (isLastStep) {
      setIsSubmitting(true);
      try {
        await onComplete?.(data);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setDirection('next');
      setCurrentStep((prev) => prev + 1);
      onStepChange?.(currentStep + 1, 'next');
    }
  }, [
    canGoNext,
    isSubmitting,
    steps,
    currentStep,
    isLastStep,
    onComplete,
    data,
    onStepChange,
  ]);

  const goPrev = useCallback(() => {
    if (canGoPrev) {
      setDirection('prev');
      setCurrentStep((prev) => prev - 1);
      onStepChange?.(currentStep - 1, 'prev');
    }
  }, [canGoPrev, currentStep, onStepChange]);

  const contextValue = useMemo<WizardContextValue>(
    () => ({
      currentStep,
      steps,
      isFirstStep,
      isLastStep,
      canGoNext,
      canGoPrev,
      goToStep,
      goNext,
      goPrev,
      setCanGoNext,
      isSubmitting,
      data,
      setData,
      getData,
    }),
    [
      currentStep,
      steps,
      isFirstStep,
      isLastStep,
      canGoNext,
      canGoPrev,
      goToStep,
      goNext,
      goPrev,
      isSubmitting,
      data,
      setData,
      getData,
    ]
  );

  return (
    <WizardContext.Provider value={contextValue}>
      <div className={cn('flex flex-col h-full', className)}>
        {/* Step List */}
        {showStepList && (
          <WizardStepList allowClick={allowStepClick} direction={direction} />
        )}

        {/* Step Content */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              initial={{
                opacity: 0,
                x: direction === 'next' ? 50 : -50,
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: direction === 'next' ? -50 : 50,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <WizardNavigation />
      </div>
    </WizardContext.Provider>
  );
}

// =============================================================================
// STEP LIST COMPONENT
// =============================================================================

interface WizardStepListProps {
  allowClick?: boolean;
  direction?: 'next' | 'prev';
}

function WizardStepList({ allowClick = false }: WizardStepListProps) {
  const { currentStep, steps, goToStep } = useWizard();

  return (
    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isClickable = allowClick && (isCompleted || isActive);

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <button
                type="button"
                onClick={() => isClickable && goToStep(index)}
                disabled={!isClickable}
                className={cn(
                  'flex items-center gap-3 group',
                  isClickable && 'cursor-pointer',
                  !isClickable && 'cursor-default'
                )}
              >
                <motion.div
                  className={cn(
                    'relative flex items-center justify-center',
                    'w-10 h-10 rounded-full',
                    'border-2 transition-all duration-300',
                    isCompleted && 'bg-gold-500 border-gold-500',
                    isActive && 'bg-white border-gold-500',
                    !isActive && !isCompleted && 'bg-white border-gray-300'
                  )}
                  animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  ) : step.icon ? (
                    <span
                      className={cn(
                        isActive ? 'text-gold-600' : 'text-gray-400'
                      )}
                    >
                      {step.icon}
                    </span>
                  ) : (
                    <span
                      className={cn(
                        'text-sm font-semibold',
                        isActive ? 'text-gold-600' : 'text-gray-400'
                      )}
                    >
                      {index + 1}
                    </span>
                  )}

                  {/* Active ring animation */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-gold-400"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 1.3, opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    />
                  )}
                </motion.div>

                {/* Step Title */}
                <div className="hidden sm:block">
                  <p
                    className={cn(
                      'text-sm font-medium transition-colors',
                      isActive
                        ? 'text-gold-600'
                        : isCompleted
                        ? 'text-gray-700'
                        : 'text-gray-400',
                      isClickable && 'group-hover:text-gold-600'
                    )}
                  >
                    {step.title}
                    {step.isOptional && (
                      <span className="ml-1 text-xs text-gray-400">
                        (Optional)
                      </span>
                    )}
                  </p>
                  {step.description && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </button>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="h-[2px] bg-gray-200 relative overflow-hidden rounded-full">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-400 to-gold-500"
                      initial={{ width: '0%' }}
                      animate={{
                        width: index < currentStep ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// NAVIGATION COMPONENT
// =============================================================================

function WizardNavigation() {
  const {
    isFirstStep,
    isLastStep,
    canGoNext,
    canGoPrev,
    goNext,
    goPrev,
    isSubmitting,
  } = useWizard();

  return (
    <div className="px-6 py-4 border-t border-gray-200 bg-white flex-shrink-0">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* Only show Previous button when not on first step */}
        {!isFirstStep ? (
          <LobbiButton
            variant="secondary"
            onClick={goPrev}
            disabled={!canGoPrev || isSubmitting}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
          >
            Previous
          </LobbiButton>
        ) : (
          <div /> /* Empty placeholder to maintain spacing */
        )}

        <LobbiButton
          variant="primary"
          onClick={goNext}
          disabled={!canGoNext || isSubmitting}
          isLoading={isSubmitting}
          rightIcon={
            !isSubmitting &&
            (isLastStep ? (
              <Check className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            ))
          }
        >
          {isSubmitting ? 'Saving...' : isLastStep ? 'Complete' : 'Next'}
        </LobbiButton>
      </div>
    </div>
  );
}

// =============================================================================
// STEP CONTENT WRAPPER
// =============================================================================

export interface WizardStepContentProps {
  stepId: string;
  children: ReactNode;
  className?: string;
}

export function WizardStepContent({
  stepId,
  children,
  className,
}: WizardStepContentProps) {
  const { currentStep, steps } = useWizard();
  const stepIndex = steps.findIndex((s) => s.id === stepId);

  if (stepIndex !== currentStep) return null;

  return (
    <div className={cn('h-full overflow-auto p-6', className)}>{children}</div>
  );
}

// =============================================================================
// WIZARD CARD WRAPPER
// =============================================================================

export interface WizardCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function WizardCard({
  title,
  description,
  children,
  className,
}: WizardCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200',
        'shadow-sm overflow-hidden',
        className
      )}
    >
      {/* Header with Art Deco accent */}
      <div className="relative px-6 py-4 border-b border-gray-100">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-200 via-gold-400 to-gold-700" />
        <h3
          className="text-lg font-semibold text-gray-900"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>

      {/* Content */}
      <div className="p-6">{children}</div>
    </div>
  );
}

export default LobbiWizard;

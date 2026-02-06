/**
 * Advanced Demo Banner Component
 *
 * A comprehensive demo control panel that sits above the main header.
 * Features phase filtering, role-based access control, and portal switching.
 * Uses Tailwind CSS (no Chakra UI dependency).
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// ============================================================================
// TYPES
// ============================================================================

export type DemoPhase = 'phase1' | 'phase2' | 'phase3' | 'all';

export type UserRole =
  | 'national-admin'
  | 'regional-admin'
  | 'state-admin'
  | 'chapter-admin'
  | 'board-member'
  | 'committee-chair'
  | 'standard-member';

export interface DemoPhaseConfig {
  id: DemoPhase;
  label: string;
  description: string;
  features: string[];
}

export interface UserRoleConfig {
  id: UserRole;
  label: string;
  level: number;
  description: string;
}

export interface AdvancedDemoBannerProps {
  /** Current active phase */
  activePhase?: DemoPhase;
  /** Callback when phase changes */
  onPhaseChange?: (phase: DemoPhase) => void;
  /** Current user role */
  activeRole?: UserRole;
  /** Callback when role changes */
  onRoleChange?: (role: UserRole) => void;
  /** Callback when switching to member portal */
  onMemberPortalClick?: () => void;
  /** Whether demo mode is enabled */
  demoEnabled?: boolean;
  /** Callback when demo mode toggled */
  onDemoToggle?: (enabled: boolean) => void;
  /** Whether banner is visible */
  isVisible?: boolean;
  /** Callback when visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const DEMO_PHASES: DemoPhaseConfig[] = [
  {
    id: 'phase1',
    label: 'Phase 1',
    description: 'Core Platform',
    features: [
      'Dashboard',
      'Events Pavilion',
      'Guest Registry',
      'Payments',
      'Business Center',
      'Vault',
    ],
  },
  {
    id: 'phase2',
    label: 'Phase 2',
    description: 'Enhanced Features',
    features: [
      'Committees',
      'Continuing Education',
      'Resource Center',
      'Concierge AI',
      'Advanced Business Center',
    ],
  },
  {
    id: 'phase3',
    label: 'Phase 3',
    description: 'Advanced Capabilities',
    features: [
      'Automations',
      'Event Check-in',
      'Geolocation',
      'Advanced Analytics',
      'Integration Hub',
    ],
  },
  {
    id: 'all',
    label: 'All Phases',
    description: 'Complete Platform',
    features: ['All features enabled'],
  },
];

export const USER_ROLES: UserRoleConfig[] = [
  {
    id: 'national-admin',
    label: 'National Admin',
    level: 1,
    description: 'Full platform access across all chapters',
  },
  {
    id: 'regional-admin',
    label: 'Regional Admin',
    level: 2,
    description: 'Access to regional and child chapters',
  },
  {
    id: 'state-admin',
    label: 'State Admin',
    level: 3,
    description: 'Access to state chapter and locals',
  },
  {
    id: 'chapter-admin',
    label: 'Chapter Admin',
    level: 4,
    description: 'Access to single chapter administration',
  },
  {
    id: 'board-member',
    label: 'Board Member',
    level: 5,
    description: 'Board-level view with limited admin',
  },
  {
    id: 'committee-chair',
    label: 'Committee Chair',
    level: 6,
    description: 'Committee management access',
  },
  {
    id: 'standard-member',
    label: 'Standard Member',
    level: 7,
    description: 'Basic member access only',
  },
];

// ============================================================================
// ICONS
// ============================================================================

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7" cy="7" r="2" />
    <path d="M7 1v1M7 12v1M1 7h1M12 7h1M2.5 2.5l.7.7M10.8 10.8l.7.7M2.5 11.5l.7-.7M10.8 3.2l.7-.7" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="1" width="8" height="12" rx="1" />
    <line x1="5" y1="11" x2="9" y2="11" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7" cy="4" r="2.5" />
    <path d="M2 13c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" />
  </svg>
);

const LayersIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 1L1 4l6 3 6-3-6-3z" />
    <path d="M1 7l6 3 6-3" />
    <path d="M1 10l6 3 6-3" />
  </svg>
);

const MinimizeIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 6h8" strokeLinecap="round" />
  </svg>
);

// ============================================================================
// DROPDOWN COMPONENT
// ============================================================================

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function Dropdown({ trigger, children, isOpen, onToggle, onClose }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className="relative">
      <div onClick={onToggle}>{trigger}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 min-w-[200px] bg-gray-900 border border-white/20 rounded-lg shadow-xl z-[1000] overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// STORAGE
// ============================================================================

const STORAGE_KEYS = {
  phase: 'lobbi-demo-phase',
  role: 'lobbi-demo-role',
  visible: 'lobbi-demo-visible',
  enabled: 'lobbi-demo-enabled',
};

// ============================================================================
// COMPONENT
// ============================================================================

export function AdvancedDemoBanner({
  activePhase: controlledPhase,
  onPhaseChange,
  activeRole: controlledRole,
  onRoleChange,
  onMemberPortalClick,
  demoEnabled: controlledEnabled,
  onDemoToggle,
  isVisible: controlledVisible,
  onVisibilityChange,
}: AdvancedDemoBannerProps) {
  // State
  const [isHydrated, setIsHydrated] = useState(false);
  const [phase, setPhase] = useState<DemoPhase>('phase1');
  const [role, setRole] = useState<UserRole>('national-admin');
  const [isVisible, setIsVisible] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Dropdown states
  const [phaseOpen, setPhaseOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  // Hydration and localStorage sync
  useEffect(() => {
    setIsHydrated(true);
    try {
      const savedPhase = localStorage.getItem(STORAGE_KEYS.phase) as DemoPhase;
      const savedRole = localStorage.getItem(STORAGE_KEYS.role) as UserRole;
      const savedVisible = localStorage.getItem(STORAGE_KEYS.visible);
      const savedEnabled = localStorage.getItem(STORAGE_KEYS.enabled);

      if (savedPhase && DEMO_PHASES.find(p => p.id === savedPhase)) {
        setPhase(savedPhase);
      }
      if (savedRole && USER_ROLES.find(r => r.id === savedRole)) {
        setRole(savedRole);
      }
      if (savedVisible !== null) {
        setIsVisible(savedVisible === 'true');
      }
      if (savedEnabled !== null) {
        setIsEnabled(savedEnabled === 'true');
      }
    } catch (e) {
      // localStorage not available
    }
  }, []);

  // Controlled vs uncontrolled
  const currentPhase = controlledPhase ?? phase;
  const currentRole = controlledRole ?? role;
  const currentVisible = controlledVisible ?? isVisible;
  const currentEnabled = controlledEnabled ?? isEnabled;

  // Handlers
  const handlePhaseChange = useCallback((newPhase: DemoPhase) => {
    setPhase(newPhase);
    setPhaseOpen(false);
    try {
      localStorage.setItem(STORAGE_KEYS.phase, newPhase);
    } catch (e) {}
    onPhaseChange?.(newPhase);
  }, [onPhaseChange]);

  const handleRoleChange = useCallback((newRole: UserRole) => {
    setRole(newRole);
    setRoleOpen(false);
    try {
      localStorage.setItem(STORAGE_KEYS.role, newRole);
    } catch (e) {}
    onRoleChange?.(newRole);
  }, [onRoleChange]);

  const handleVisibilityChange = useCallback((visible: boolean) => {
    setIsVisible(visible);
    try {
      localStorage.setItem(STORAGE_KEYS.visible, String(visible));
    } catch (e) {}
    onVisibilityChange?.(visible);
  }, [onVisibilityChange]);

  const handleDemoToggle = useCallback(() => {
    const newEnabled = !isEnabled;
    setIsEnabled(newEnabled);
    try {
      localStorage.setItem(STORAGE_KEYS.enabled, String(newEnabled));
    } catch (e) {}
    onDemoToggle?.(newEnabled);
  }, [isEnabled, onDemoToggle]);

  // Get current configs
  const currentPhaseConfig = DEMO_PHASES.find(p => p.id === currentPhase)!;
  const currentRoleConfig = USER_ROLES.find(r => r.id === currentRole)!;

  if (!isHydrated) {
    return null;
  }

  return (
    <AnimatePresence>
      {currentVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex-shrink-0"
        >
          {/* Main Banner Bar */}
          <div
            className="text-white py-2 px-4 relative"
            style={{
              background: 'linear-gradient(90deg, #4A3728 0%, #8B7330 50%, #4A3728 100%)',
            }}
          >
            {/* Subtle overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
              }}
            />

            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between gap-4">
                {/* Left: Demo Badge + Enable Toggle */}
                <div className="flex items-center gap-3">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase">
                    Demo Mode
                  </span>

                  <button
                    onClick={handleDemoToggle}
                    className="flex items-center gap-2 text-xs font-medium"
                  >
                    <div
                      className={`w-8 h-4 rounded-full relative transition-colors ${
                        currentEnabled ? 'bg-white/40' : 'bg-white/20'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${
                          currentEnabled ? 'translate-x-4' : 'translate-x-0.5'
                        }`}
                      />
                    </div>
                    <span className="opacity-80">{currentEnabled ? 'Active' : 'Paused'}</span>
                  </button>
                </div>

                {/* Center: Phase + Role Dropdowns */}
                <div className="flex items-center gap-2">
                  {/* Phase Dropdown */}
                  <Dropdown
                    isOpen={phaseOpen}
                    onToggle={() => setPhaseOpen(!phaseOpen)}
                    onClose={() => setPhaseOpen(false)}
                    trigger={
                      <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-white/15 transition-colors">
                        <LayersIcon className="w-3.5 h-3.5" />
                        <span>{currentPhaseConfig.label}</span>
                        <ChevronDownIcon className="w-3 h-3" />
                      </button>
                    }
                  >
                    {DEMO_PHASES.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handlePhaseChange(p.id)}
                        className={`w-full px-4 py-2.5 text-left text-white hover:bg-white/10 transition-colors ${
                          currentPhase === p.id ? 'bg-white/15' : ''
                        }`}
                      >
                        <div className="font-medium text-sm">{p.label}</div>
                        <div className="text-xs opacity-70">{p.description}</div>
                      </button>
                    ))}
                  </Dropdown>

                  {/* Role Dropdown */}
                  <Dropdown
                    isOpen={roleOpen}
                    onToggle={() => setRoleOpen(!roleOpen)}
                    onClose={() => setRoleOpen(false)}
                    trigger={
                      <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-white/15 transition-colors">
                        <UserIcon className="w-3.5 h-3.5" />
                        <span>{currentRoleConfig.label}</span>
                        <ChevronDownIcon className="w-3 h-3" />
                      </button>
                    }
                  >
                    <div className="max-h-[300px] overflow-y-auto">
                      {USER_ROLES.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => handleRoleChange(r.id)}
                          className={`w-full px-4 py-2.5 text-left text-white hover:bg-white/10 transition-colors ${
                            currentRole === r.id ? 'bg-white/15' : ''
                          }`}
                          style={{ paddingLeft: `${8 + r.level * 4}px` }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{r.label}</span>
                            <span className="bg-white/15 px-1.5 py-0.5 rounded text-[10px]">
                              L{r.level}
                            </span>
                          </div>
                          <div className="text-xs opacity-70">{r.description}</div>
                        </button>
                      ))}
                    </div>
                  </Dropdown>
                </div>

                {/* Right: Member Portal + Controls */}
                <div className="flex items-center gap-2">
                  {/* Member Portal Button */}
                  <button
                    onClick={onMemberPortalClick}
                    className="flex items-center gap-2 px-3 py-1.5 border border-white/40 rounded-md text-xs font-medium hover:bg-white/15 hover:border-white/60 transition-colors"
                  >
                    <PhoneIcon className="w-3.5 h-3.5" />
                    <span>Member Portal</span>
                  </button>

                  {/* Expand/Collapse */}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1.5 rounded-md opacity-70 hover:opacity-100 hover:bg-white/10 transition-all"
                    title={isExpanded ? 'Collapse details' : 'Show phase features'}
                  >
                    <SettingsIcon className="w-3.5 h-3.5" />
                  </button>

                  {/* Minimize */}
                  <button
                    onClick={() => handleVisibilityChange(false)}
                    className="p-1.5 rounded-md opacity-70 hover:opacity-100 hover:bg-white/10 transition-all"
                    title="Minimize banner"
                  >
                    <MinimizeIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Expandable Details Panel */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-gray-900 text-white py-3 px-4 border-t border-white/10 overflow-hidden"
              >
                <div className="max-w-7xl mx-auto">
                  <p className="text-xs font-semibold opacity-70 uppercase tracking-widest mb-2">
                    {currentPhaseConfig.label} Features
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentPhaseConfig.features.map((feature) => (
                      <span
                        key={feature}
                        className="bg-white/10 px-3 py-1 rounded-full text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom accent line */}
          <div
            className="h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// MINIMIZED BANNER (Show when hidden)
// ============================================================================

export function DemoBannerMinimized({
  onRestore,
}: {
  onRestore: () => void;
}) {
  return (
    <div className="fixed top-2 right-2 z-[100]">
      <button
        onClick={onRestore}
        className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        title="Restore demo banner"
      >
        <SettingsIcon className="w-4 h-4" />
      </button>
    </div>
  );
}

// ============================================================================
// DEMO CONTEXT (For app-wide state)
// ============================================================================

interface DemoContextValue {
  phase: DemoPhase;
  setPhase: (phase: DemoPhase) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
  isFeatureEnabled: (feature: string) => boolean;
}

const DemoContext = React.createContext<DemoContextValue | null>(null);

export function DemoProvider({
  children,
  defaultPhase = 'phase1',
  defaultRole = 'national-admin',
}: {
  children: React.ReactNode;
  defaultPhase?: DemoPhase;
  defaultRole?: UserRole;
}) {
  const [phase, setPhase] = useState<DemoPhase>(defaultPhase);
  const [role, setRole] = useState<UserRole>(defaultRole);
  const [isEnabled, setEnabled] = useState(true);

  const isFeatureEnabled = useCallback((feature: string): boolean => {
    if (!isEnabled) return true; // All features when demo is off
    if (phase === 'all') return true;

    const phaseConfig = DEMO_PHASES.find(p => p.id === phase);
    if (!phaseConfig) return false;

    return phaseConfig.features.some(f =>
      f.toLowerCase().includes(feature.toLowerCase())
    );
  }, [phase, isEnabled]);

  return (
    <DemoContext.Provider value={{ phase, setPhase, role, setRole, isEnabled, setEnabled, isFeatureEnabled }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo(): DemoContextValue {
  const context = React.useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within DemoProvider');
  }
  return context;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default AdvancedDemoBanner;

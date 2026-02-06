/**
 * Comprehensive Demo Banner Component
 *
 * Features:
 * - Phase filtering (Phase 1, 2, 3, All)
 * - Role-based access control (7 levels)
 * - Organization switching with theme preview
 * - Dyslexic-friendly mode toggle
 * - Dark mode toggle
 * - Demo enable/disable toggle
 * - Expandable features panel
 * - Member Portal access
 */

import { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ORGANIZATIONS, getOrganizationList, applyTheme, type Organization } from '../data/themes';

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
  color: string;
}

export interface UserRoleConfig {
  id: UserRole;
  label: string;
  level: number;
  description: string;
  icon: string;
}

export interface DemoBannerProps {
  isVisible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  onMemberPortalClick?: () => void;
  onOrganizationChange?: (org: Organization) => void;
  currentOrganization?: Organization;
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const DEMO_PHASES: DemoPhaseConfig[] = [
  {
    id: 'phase1',
    label: 'Phase 1',
    description: 'Core Platform',
    color: '#10B981',
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
    color: '#3B82F6',
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
    color: '#8B5CF6',
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
    color: '#F59E0B',
    features: ['All features enabled'],
  },
];

export const USER_ROLES: UserRoleConfig[] = [
  {
    id: 'national-admin',
    label: 'National Admin',
    level: 1,
    description: 'Full platform access across all chapters',
    icon: 'crown',
  },
  {
    id: 'regional-admin',
    label: 'Regional Admin',
    level: 2,
    description: 'Access to regional and child chapters',
    icon: 'globe',
  },
  {
    id: 'state-admin',
    label: 'State Admin',
    level: 3,
    description: 'Access to state chapter and locals',
    icon: 'map',
  },
  {
    id: 'chapter-admin',
    label: 'Chapter Admin',
    level: 4,
    description: 'Access to single chapter administration',
    icon: 'building',
  },
  {
    id: 'board-member',
    label: 'Board Member',
    level: 5,
    description: 'Board-level view with limited admin',
    icon: 'briefcase',
  },
  {
    id: 'committee-chair',
    label: 'Committee Chair',
    level: 6,
    description: 'Committee management access',
    icon: 'users',
  },
  {
    id: 'standard-member',
    label: 'Standard Member',
    level: 7,
    description: 'Basic member access only',
    icon: 'user',
  },
];

// ============================================================================
// ICONS (inline SVG for portability)
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

const BuildingIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 13V3a1 1 0 011-1h8a1 1 0 011 1v10" />
    <path d="M4 5h2M4 8h2M8 5h2M8 8h2" />
    <path d="M5 13v-3h4v3" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 8.5A5.5 5.5 0 115.5 2a4.5 4.5 0 006.5 6.5z" />
  </svg>
);

const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7" cy="7" r="3" />
    <path d="M7 1v1M7 12v1M1 7h1M12 7h1M2.75 2.75l.7.7M10.55 10.55l.7.7M2.75 11.25l.7-.7M10.55 3.45l.7-.7" />
  </svg>
);

const AccessibilityIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7" cy="3" r="1.5" />
    <path d="M7 5v4M5 6h4M5 12l2-3 2 3" />
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
  align?: 'left' | 'right' | 'center';
  width?: string;
}

function Dropdown({ trigger, children, isOpen, onToggle, onClose, align = 'left', width = 'min-w-[220px]' }: DropdownProps) {
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

  const alignClass = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  }[align];

  return (
    <div ref={ref} className="relative">
      <div onClick={onToggle}>{trigger}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute top-full ${alignClass} mt-2 ${width} bg-gray-900 border border-white/20 rounded-xl shadow-2xl z-[1000] overflow-hidden backdrop-blur-xl`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// TOGGLE SWITCH COMPONENT
// ============================================================================

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  size?: 'sm' | 'md';
}

function ToggleSwitch({ enabled, onChange, label, size = 'md' }: ToggleSwitchProps) {
  const sizeClasses = size === 'sm'
    ? { track: 'w-7 h-4', thumb: 'w-3 h-3', translate: 'translate-x-3' }
    : { track: 'w-9 h-5', thumb: 'w-4 h-4', translate: 'translate-x-4' };

  return (
    <button
      onClick={() => onChange(!enabled)}
      className="flex items-center gap-2"
    >
      <div
        className={`${sizeClasses.track} rounded-full relative transition-colors ${
          enabled ? 'bg-emerald-500' : 'bg-white/20'
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 ${sizeClasses.thumb} bg-white rounded-full shadow-md transition-transform ${
            enabled ? sizeClasses.translate : ''
          }`}
        />
      </div>
      {label && <span className="text-xs opacity-80">{label}</span>}
    </button>
  );
}

// ============================================================================
// STORAGE KEYS
// ============================================================================

const STORAGE_KEYS = {
  phase: 'lobbi-demo-phase',
  role: 'lobbi-demo-role',
  visible: 'lobbi-demo-visible',
  enabled: 'lobbi-demo-enabled',
  darkMode: 'lobbi-dark-mode',
  dyslexicMode: 'lobbi-dyslexic-mode',
  organization: 'lobbi-demo-org',
};

// ============================================================================
// DEMO CONTEXT
// ============================================================================

interface DemoContextValue {
  phase: DemoPhase;
  setPhase: (phase: DemoPhase) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
  isDarkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  isDyslexicMode: boolean;
  setDyslexicMode: (dyslexic: boolean) => void;
  isFeatureEnabled: (feature: string) => boolean;
  organization: Organization | null;
  setOrganization: (org: Organization) => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function useDemo(): DemoContextValue {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within DemoProvider');
  }
  return context;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function DemoBanner({
  isVisible: controlledVisible,
  onVisibilityChange,
  onMemberPortalClick,
  onOrganizationChange,
  currentOrganization,
}: DemoBannerProps) {
  // Hydration
  const [isHydrated, setIsHydrated] = useState(false);

  // Core state
  const [phase, setPhase] = useState<DemoPhase>('phase1');
  const [role, setRole] = useState<UserRole>('national-admin');
  const [isVisible, setIsVisible] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDyslexicMode, setIsDyslexicMode] = useState(false);

  // Dropdown states
  const [phaseOpen, setPhaseOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [orgOpen, setOrgOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);

  // Organization list
  const orgList = getOrganizationList();

  // Hydration and localStorage sync
  useEffect(() => {
    setIsHydrated(true);
    try {
      const savedPhase = localStorage.getItem(STORAGE_KEYS.phase) as DemoPhase;
      const savedRole = localStorage.getItem(STORAGE_KEYS.role) as UserRole;
      const savedVisible = localStorage.getItem(STORAGE_KEYS.visible);
      const savedEnabled = localStorage.getItem(STORAGE_KEYS.enabled);
      const savedDarkMode = localStorage.getItem(STORAGE_KEYS.darkMode);
      const savedDyslexicMode = localStorage.getItem(STORAGE_KEYS.dyslexicMode);

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
      if (savedDarkMode !== null) {
        setIsDarkMode(savedDarkMode === 'true');
      }
      if (savedDyslexicMode !== null) {
        setIsDyslexicMode(savedDyslexicMode === 'true');
      }
    } catch {
      // localStorage not available
    }
  }, []);

  // Apply dark mode and dyslexic mode to document
  useEffect(() => {
    if (!isHydrated) return;

    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }

    if (isDyslexicMode) {
      root.classList.add('dyslexic');
      root.setAttribute('data-dyslexic', 'true');
    } else {
      root.classList.remove('dyslexic');
      root.setAttribute('data-dyslexic', 'false');
    }
  }, [isDarkMode, isDyslexicMode, isHydrated]);

  // Controlled vs uncontrolled visibility
  const currentVisible = controlledVisible ?? isVisible;

  // Handlers
  const handlePhaseChange = useCallback((newPhase: DemoPhase) => {
    setPhase(newPhase);
    setPhaseOpen(false);
    try {
      localStorage.setItem(STORAGE_KEYS.phase, newPhase);
    } catch {}
  }, []);

  const handleRoleChange = useCallback((newRole: UserRole) => {
    setRole(newRole);
    setRoleOpen(false);
    try {
      localStorage.setItem(STORAGE_KEYS.role, newRole);
    } catch {}
  }, []);

  const handleVisibilityChange = useCallback((visible: boolean) => {
    setIsVisible(visible);
    try {
      localStorage.setItem(STORAGE_KEYS.visible, String(visible));
    } catch {}
    onVisibilityChange?.(visible);
  }, [onVisibilityChange]);

  const handleDemoToggle = useCallback(() => {
    const newEnabled = !isEnabled;
    setIsEnabled(newEnabled);
    try {
      localStorage.setItem(STORAGE_KEYS.enabled, String(newEnabled));
    } catch {}
  }, [isEnabled]);

  const handleDarkModeToggle = useCallback((dark: boolean) => {
    setIsDarkMode(dark);
    try {
      localStorage.setItem(STORAGE_KEYS.darkMode, String(dark));
    } catch {}
  }, []);

  const handleDyslexicModeToggle = useCallback((dyslexic: boolean) => {
    setIsDyslexicMode(dyslexic);
    try {
      localStorage.setItem(STORAGE_KEYS.dyslexicMode, String(dyslexic));
    } catch {}
  }, []);

  const handleOrgChange = useCallback((orgId: string) => {
    const org = ORGANIZATIONS[orgId];
    if (org) {
      applyTheme(org);
      onOrganizationChange?.(org);
      try {
        localStorage.setItem(STORAGE_KEYS.organization, orgId);
      } catch {}
    }
    setOrgOpen(false);
  }, [onOrganizationChange]);

  // Get current configs
  const currentPhaseConfig = DEMO_PHASES.find(p => p.id === phase)!;
  const currentRoleConfig = USER_ROLES.find(r => r.id === role)!;

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
          className="relative z-[100] flex-shrink-0"
        >
          {/* Main Banner Bar */}
          <div
            className="text-white py-2.5 px-4 relative overflow-hidden"
            style={{
              background: isDarkMode
                ? 'linear-gradient(90deg, #1E293B 0%, #334155 50%, #1E293B 100%)'
                : 'linear-gradient(90deg, #4A3728 0%, #8B7330 50%, #4A3728 100%)',
            }}
          >
            {/* Subtle shimmer overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-50"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                animation: 'shimmer 3s infinite',
              }}
            />

            <div className="max-w-[1600px] mx-auto">
              <div className="flex items-center justify-between gap-3">
                {/* Left: Demo Badge + Enable Toggle */}
                <div className="flex items-center gap-3">
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.25)',
                    }}
                  >
                    Demo Mode
                  </span>

                  <ToggleSwitch
                    enabled={isEnabled}
                    onChange={handleDemoToggle}
                    label={isEnabled ? 'Active' : 'Paused'}
                    size="sm"
                  />
                </div>

                {/* Center: Phase + Role + Organization Dropdowns */}
                <div className="flex items-center gap-1.5">
                  {/* Phase Dropdown */}
                  <Dropdown
                    isOpen={phaseOpen}
                    onToggle={() => setPhaseOpen(!phaseOpen)}
                    onClose={() => setPhaseOpen(false)}
                    trigger={
                      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white/15 transition-all">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: currentPhaseConfig.color }}
                        />
                        <LayersIcon className="w-3.5 h-3.5 opacity-70" />
                        <span>{currentPhaseConfig.label}</span>
                        <ChevronDownIcon className="w-3 h-3 opacity-50" />
                      </button>
                    }
                  >
                    <div className="py-1">
                      <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
                        Select Phase
                      </div>
                      {DEMO_PHASES.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handlePhaseChange(p.id)}
                          className={`w-full px-4 py-2.5 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3 ${
                            phase === p.id ? 'bg-white/15' : ''
                          }`}
                        >
                          <div
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: p.color }}
                          />
                          <div>
                            <div className="font-medium text-sm">{p.label}</div>
                            <div className="text-[11px] opacity-60">{p.description}</div>
                          </div>
                          {phase === p.id && (
                            <div className="ml-auto text-emerald-400">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </Dropdown>

                  <div className="w-px h-4 bg-white/20" />

                  {/* Role Dropdown */}
                  <Dropdown
                    isOpen={roleOpen}
                    onToggle={() => setRoleOpen(!roleOpen)}
                    onClose={() => setRoleOpen(false)}
                    width="min-w-[260px]"
                    trigger={
                      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white/15 transition-all">
                        <UserIcon className="w-3.5 h-3.5 opacity-70" />
                        <span>{currentRoleConfig.label}</span>
                        <span className="bg-white/20 px-1.5 py-0.5 rounded text-[9px] font-bold">
                          L{currentRoleConfig.level}
                        </span>
                        <ChevronDownIcon className="w-3 h-3 opacity-50" />
                      </button>
                    }
                  >
                    <div className="py-1 max-h-[320px] overflow-y-auto">
                      <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
                        Select Role
                      </div>
                      {USER_ROLES.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => handleRoleChange(r.id)}
                          className={`w-full px-4 py-2.5 text-left text-white hover:bg-white/10 transition-colors ${
                            role === r.id ? 'bg-white/15' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                              {r.level}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{r.label}</div>
                              <div className="text-[11px] opacity-60">{r.description}</div>
                            </div>
                            {role === r.id && (
                              <div className="text-emerald-400">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </Dropdown>

                  <div className="w-px h-4 bg-white/20" />

                  {/* Organization Dropdown */}
                  <Dropdown
                    isOpen={orgOpen}
                    onToggle={() => setOrgOpen(!orgOpen)}
                    onClose={() => setOrgOpen(false)}
                    width="min-w-[280px]"
                    trigger={
                      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white/15 transition-all">
                        <BuildingIcon className="w-3.5 h-3.5 opacity-70" />
                        <span>{currentOrganization?.short || 'Select Org'}</span>
                        <div
                          className="w-3 h-3 rounded-full border border-white/30"
                          style={{ backgroundColor: currentOrganization?.theme.primary || '#888' }}
                        />
                        <ChevronDownIcon className="w-3 h-3 opacity-50" />
                      </button>
                    }
                  >
                    <div className="py-1 max-h-[400px] overflow-y-auto">
                      <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
                        Switch Organization ({orgList.length} available)
                      </div>
                      {orgList.map((org) => (
                        <button
                          key={org.id}
                          onClick={() => handleOrgChange(org.id)}
                          className={`w-full px-4 py-2.5 text-left text-white hover:bg-white/10 transition-colors ${
                            currentOrganization?.id === org.id ? 'bg-white/15' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-lg"
                              style={{ background: `linear-gradient(135deg, ${org.color}, ${adjustColor(org.color, -30)})` }}
                            >
                              {org.short.slice(0, 2)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate">{org.name}</div>
                              <div className="text-[11px] opacity-60">{ORGANIZATIONS[org.id]?.motto}</div>
                            </div>
                            {currentOrganization?.id === org.id && (
                              <div className="text-emerald-400 flex-shrink-0">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </Dropdown>
                </div>

                {/* Right: Accessibility + Member Portal + Controls */}
                <div className="flex items-center gap-2">
                  {/* Accessibility Dropdown */}
                  <Dropdown
                    isOpen={accessOpen}
                    onToggle={() => setAccessOpen(!accessOpen)}
                    onClose={() => setAccessOpen(false)}
                    align="right"
                    width="min-w-[240px]"
                    trigger={
                      <button
                        className={`p-1.5 rounded-lg transition-all ${
                          isDarkMode || isDyslexicMode
                            ? 'bg-white/20 hover:bg-white/25'
                            : 'hover:bg-white/15'
                        }`}
                        title="Accessibility options"
                      >
                        <AccessibilityIcon className="w-4 h-4" />
                      </button>
                    }
                  >
                    <div className="py-2">
                      <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/50">
                        Accessibility
                      </div>

                      {/* Dark Mode */}
                      <div className="px-4 py-3 flex items-center justify-between hover:bg-white/5">
                        <div className="flex items-center gap-3">
                          {isDarkMode ? (
                            <MoonIcon className="w-4 h-4 text-blue-400" />
                          ) : (
                            <SunIcon className="w-4 h-4 text-amber-400" />
                          )}
                          <div>
                            <div className="font-medium text-sm">Dark Mode</div>
                            <div className="text-[11px] opacity-60">Reduce eye strain</div>
                          </div>
                        </div>
                        <ToggleSwitch
                          enabled={isDarkMode}
                          onChange={handleDarkModeToggle}
                          size="sm"
                        />
                      </div>

                      {/* Dyslexic Mode */}
                      <div className="px-4 py-3 flex items-center justify-between hover:bg-white/5">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-purple-400">Aa</span>
                          <div>
                            <div className="font-medium text-sm">Dyslexic-Friendly</div>
                            <div className="text-[11px] opacity-60">OpenDyslexic font</div>
                          </div>
                        </div>
                        <ToggleSwitch
                          enabled={isDyslexicMode}
                          onChange={handleDyslexicModeToggle}
                          size="sm"
                        />
                      </div>

                      <div className="mx-4 my-2 h-px bg-white/10" />

                      <div className="px-4 py-2 text-[11px] text-white/50">
                        These settings are saved locally and persist across sessions.
                      </div>
                    </div>
                  </Dropdown>

                  {/* Member Portal Button */}
                  <button
                    onClick={onMemberPortalClick}
                    className="flex items-center gap-2 px-3 py-1.5 border border-white/30 rounded-lg text-xs font-medium hover:bg-white/15 hover:border-white/50 transition-all"
                  >
                    <PhoneIcon className="w-3.5 h-3.5" />
                    <span>Member Portal</span>
                  </button>

                  {/* Expand/Collapse */}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`p-1.5 rounded-lg transition-all ${
                      isExpanded ? 'bg-white/20' : 'hover:bg-white/10'
                    }`}
                    title={isExpanded ? 'Collapse details' : 'Show phase features'}
                  >
                    <SettingsIcon className="w-4 h-4" />
                  </button>

                  {/* Minimize */}
                  <button
                    onClick={() => handleVisibilityChange(false)}
                    className="p-1.5 rounded-lg opacity-60 hover:opacity-100 hover:bg-white/10 transition-all"
                    title="Minimize banner"
                  >
                    <MinimizeIcon className="w-4 h-4" />
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
                className="bg-gray-900 text-white overflow-hidden"
              >
                <div className="py-4 px-6 border-t border-white/10">
                  <div className="max-w-[1600px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Phase Features */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: currentPhaseConfig.color }}
                          />
                          <p className="text-xs font-bold uppercase tracking-widest text-white/70">
                            {currentPhaseConfig.label} Features
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {currentPhaseConfig.features.map((feature) => (
                            <span
                              key={feature}
                              className="bg-white/10 px-3 py-1.5 rounded-lg text-xs font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Role Permissions */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">
                          Role Permissions
                        </p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                            <span className="opacity-80">{currentRoleConfig.description}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                            <span className="opacity-80">Access Level: {currentRoleConfig.level} of 7</span>
                          </div>
                        </div>
                      </div>

                      {/* Theme Info */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">
                          Current Theme
                        </p>
                        {currentOrganization && (
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-lg shadow-lg flex items-center justify-center text-sm font-bold text-white"
                              style={{ background: currentOrganization.theme.avatarBg }}
                            >
                              {currentOrganization.logoLetter}
                            </div>
                            <div>
                              <div className="font-medium text-sm">{currentOrganization.name}</div>
                              <div className="text-[11px] opacity-60 capitalize">
                                {currentOrganization.aesthetic} | {currentOrganization.industry}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
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
// MINIMIZED BANNER
// ============================================================================

export function DemoBannerMinimized({ onRestore }: { onRestore: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-3 right-3 z-[100]"
    >
      <button
        onClick={onRestore}
        className="group w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        title="Restore demo banner"
      >
        <SettingsIcon className="w-5 h-5 group-hover:rotate-90 transition-transform" />
      </button>
    </motion.div>
  );
}

// ============================================================================
// HELPER: Adjust color brightness
// ============================================================================

function adjustColor(hex: string, amount: number): string {
  const clamp = (n: number) => Math.min(255, Math.max(0, n));

  let color = hex.replace('#', '');
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('');
  }

  const num = parseInt(color, 16);
  const r = clamp((num >> 16) + amount);
  const g = clamp(((num >> 8) & 0x00FF) + amount);
  const b = clamp((num & 0x0000FF) + amount);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

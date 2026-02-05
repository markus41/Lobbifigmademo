import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Account, Organization } from '../data/themes';

interface DemoBannerProps {
  organization?: Organization;
  account?: Account;
  currentPhase: number;
  onPhaseChange: (phase: number) => void;
  currentRole: string;
  onRoleChange: (role: string) => void;
  onMemberPortalClick: () => void;
}

const PHASES = [
  {
    id: 1,
    label: 'Phase 1',
    tag: 'Core',
    features: ['Dashboard', 'Registry', 'Events Pavilion', 'Payments', 'Business Center'],
  },
  {
    id: 2,
    label: 'Phase 2',
    tag: 'Enhanced',
    features: ['Committees', 'Concierge', 'Continuing Education', 'Resource Center'],
  },
  {
    id: 3,
    label: 'Phase 3',
    tag: 'Advanced',
    features: ['Automations', 'Geo-Location Check-in', 'Advanced Analytics', 'Integrations'],
  },
];

const ROLES = [
  'National Admin',
  'State Admin',
  'Chapter President',
  'Board Member',
  'Committee Chair',
  'Standard Member',
];

export function DemoBanner({
  organization,
  account,
  currentPhase,
  onPhaseChange,
  currentRole,
  onRoleChange,
  onMemberPortalClick,
}: DemoBannerProps) {
  const [phaseDropdownOpen, setPhaseDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const accentColor = organization?.theme.primary ?? '#D4AF37';
  const accentRgb = organization?.theme.primaryRgb ?? '212,175,55';
  const activePhase = PHASES.find((p) => p.id === currentPhase) ?? PHASES[0];

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] select-none"
      style={{
        height: 40,
        background: 'linear-gradient(180deg, #1a1610 0%, #252017 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        fontFamily: 'DM Sans, Inter, system-ui, sans-serif',
      }}
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="h-full flex items-center justify-between px-4 gap-4">
        {/* -------- LEFT SIDE -------- */}
        <div className="flex items-center gap-4 min-w-0">
          {/* DEMO MODE label with pulsing dot */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.span
              className="block rounded-full"
              style={{
                width: 7,
                height: 7,
                background: '#4ADE80',
                boxShadow: '0 0 6px rgba(74,222,128,0.6)',
              }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span
              className="text-[10px] font-bold tracking-[0.15em] uppercase"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Demo Mode
            </span>
          </div>

          {/* Phase pill toggles */}
          <div className="relative flex items-center">
            <div
              className="flex items-center rounded-full overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {PHASES.map((phase) => {
                const isActive = phase.id === currentPhase;
                return (
                  <button
                    key={phase.id}
                    onClick={() => onPhaseChange(phase.id)}
                    onMouseEnter={() => {
                      if (phase.id === currentPhase) setPhaseDropdownOpen(true);
                    }}
                    className="relative px-3 py-1 text-[11px] font-medium transition-colors duration-200 whitespace-nowrap"
                    style={{
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                      background: isActive
                        ? `rgba(${accentRgb}, 0.25)`
                        : 'transparent',
                    }}
                  >
                    <span className="relative z-10">
                      {phase.label}
                      <span
                        className="ml-1 text-[9px] font-normal"
                        style={{
                          color: isActive
                            ? `rgba(${accentRgb}, 1)`
                            : 'rgba(255,255,255,0.25)',
                        }}
                      >
                        {phase.tag}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Phase features dropdown */}
            <AnimatePresence>
              {phaseDropdownOpen && (
                <motion.div
                  className="absolute top-full left-0 mt-1 rounded-lg overflow-hidden"
                  style={{
                    background: '#1e1b15',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                    minWidth: 220,
                    zIndex: 10,
                  }}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  onMouseEnter={() => setPhaseDropdownOpen(true)}
                  onMouseLeave={() => setPhaseDropdownOpen(false)}
                >
                  <div className="px-3 py-2">
                    <div
                      className="text-[10px] font-bold tracking-widest uppercase mb-1.5"
                      style={{ color: `rgba(${accentRgb}, 0.8)` }}
                    >
                      {activePhase.label} &middot; {activePhase.tag}
                    </div>
                    {activePhase.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 py-1"
                      >
                        <span
                          className="block w-1 h-1 rounded-full"
                          style={{ background: accentColor }}
                        />
                        <span
                          className="text-[11px]"
                          style={{ color: 'rgba(255,255,255,0.65)' }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* -------- CENTER -------- */}
        <div className="flex items-center justify-center relative">
          <button
            onClick={() => setRoleDropdownOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-1 rounded-md text-[11px] font-medium transition-colors"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ opacity: 0.5 }}
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{currentRole}</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: 0.4,
                transform: roleDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Role dropdown */}
          <AnimatePresence>
            {roleDropdownOpen && (
              <>
                {/* Invisible overlay to close dropdown */}
                <div
                  className="fixed inset-0"
                  style={{ zIndex: 9 }}
                  onClick={() => setRoleDropdownOpen(false)}
                />
                <motion.div
                  className="absolute top-full mt-1 rounded-lg overflow-hidden"
                  style={{
                    background: '#1e1b15',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                    minWidth: 180,
                    zIndex: 10,
                  }}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="py-1">
                    {ROLES.map((role) => {
                      const isActive = role === currentRole;
                      return (
                        <button
                          key={role}
                          onClick={() => {
                            onRoleChange(role);
                            setRoleDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 text-[11px] transition-colors flex items-center gap-2"
                          style={{
                            color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                            background: isActive
                              ? `rgba(${accentRgb}, 0.15)`
                              : 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.background =
                                'rgba(255,255,255,0.05)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.background = 'transparent';
                            }
                          }}
                        >
                          {isActive && (
                            <span
                              className="block w-1.5 h-1.5 rounded-full"
                              style={{ background: accentColor }}
                            />
                          )}
                          <span>{role}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* -------- RIGHT SIDE -------- */}
        <div className="flex items-center gap-3 min-w-0 shrink-0">
          {/* Organization name */}
          {organization && (
            <span
              className="text-[10px] font-medium tracking-wide truncate max-w-[140px]"
              style={{ color: 'rgba(255,255,255,0.35)' }}
              title={organization.name}
            >
              {organization.short}
            </span>
          )}

          {/* Member Portal button */}
          <button
            onClick={onMemberPortalClick}
            className="flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-200 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${organization?.theme.primaryDark ?? '#8B7330'}, ${accentColor})`,
              color: '#fff',
              boxShadow: `0 2px 10px rgba(${accentRgb}, 0.3)`,
            }}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Member Portal
          </button>
        </div>
      </div>
    </motion.div>
  );
}

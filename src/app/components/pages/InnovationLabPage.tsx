/**
 * Innovation Lab Page
 *
 * Experimental upgrades and prototype experiences.
 */

import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { toast } from '@/lib/notifications';
import type { Organization, Account } from '../../data/themes';

interface InnovationLabPageProps {
  organization: Organization;
  account: Account;
}

const ACTION_PLAYBOOKS = [
  {
    id: 'gala',
    title: 'Launch Gala Campaign',
    description: 'Coordinate segments, outreach, and sponsorship offers.',
    steps: [
      { label: 'Segment high-value members', eta: '2 min' },
      { label: 'Draft premium invite sequence', eta: '4 min' },
      { label: 'Sync sponsor tier pricing', eta: '3 min' },
      { label: 'Schedule concierge follow-ups', eta: '6 min' },
    ],
  },
  {
    id: 'retention',
    title: 'Retention Rescue',
    description: 'Spot churn risk and trigger white-glove outreach.',
    steps: [
      { label: 'Detect engagement drop-off', eta: '1 min' },
      { label: 'Auto-generate renewal incentives', eta: '3 min' },
      { label: 'Queue concierge calls', eta: '5 min' },
      { label: 'Draft leadership briefing', eta: '2 min' },
    ],
  },
  {
    id: 'pipeline',
    title: 'Pipeline Boost',
    description: 'Align events, referrals, and executive outreach.',
    steps: [
      { label: 'Identify top referral partners', eta: '2 min' },
      { label: 'Spin up VIP event slots', eta: '4 min' },
      { label: 'Coordinate board outreach', eta: '3 min' },
      { label: 'Publish performance recap', eta: '2 min' },
    ],
  },
] as const;

const NARRATIVE_STEPS = [
  {
    title: 'Momentum Rising',
    insight: 'Member engagement is climbing through curated experiences.',
    metric: '+18% weekly activity',
  },
  {
    title: 'Revenue Lift',
    insight: 'Premium renewals spiked after the concierge rollout.',
    metric: '+$84K projected ARR',
  },
  {
    title: 'Event Velocity',
    insight: 'High-value events are reaching capacity faster.',
    metric: '92% average occupancy',
  },
  {
    title: 'Retention Shield',
    insight: 'At-risk cohorts are recovering with targeted touches.',
    metric: '-12% churn risk',
  },
] as const;

const JOURNEY_STAGES = [
  {
    id: 'discover',
    label: 'Discover',
    note: 'Organic and referral interest surging.',
    metric: '1,240 new prospects',
  },
  {
    id: 'engage',
    label: 'Engage',
    note: 'Curated onboarding journeys increasing activation.',
    metric: '74% activation',
  },
  {
    id: 'convert',
    label: 'Convert',
    note: 'Concierge follow-ups driving premium upgrades.',
    metric: '38% upgrade rate',
  },
  {
    id: 'retain',
    label: 'Retain',
    note: 'Personalized rituals keep members loyal.',
    metric: '92% renewal',
  },
  {
    id: 'advocate',
    label: 'Advocate',
    note: 'Ambassadors fueling the referral engine.',
    metric: '310 advocates',
  },
] as const;

const WALKTHROUGH_PARTICIPANTS = [
  { name: 'Ava Patel', role: 'Presenter', status: 'live' },
  { name: 'Julian Reyes', role: 'Revenue Ops', status: 'listening' },
  { name: 'Morgan Lee', role: 'Board Observer', status: 'listening' },
  { name: 'Evelyn Park', role: 'Experience Lead', status: 'annotating' },
] as const;

function InnovationCard({
  title,
  label,
  description,
  children,
  borderColor,
  bgCard,
  textPrimary,
  textSecondary,
  textMuted,
  fontDisplay,
  fontBody,
  primaryRgb,
}: {
  title: string;
  label: string;
  description: string;
  children: React.ReactNode;
  borderColor: string;
  bgCard: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  fontDisplay: string;
  fontBody: string;
  primaryRgb: string;
}) {
  return (
    <motion.div
      className="rounded-2xl border p-6"
      style={{
        borderColor,
        background: bgCard,
        boxShadow: '0 6px 18px -10px rgba(0,0,0,0.16)',
      }}
      whileHover={{ y: -2, boxShadow: `0 12px 26px -14px rgba(${primaryRgb}, 0.35)` }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p
            className="text-[11px] uppercase tracking-[0.3em] font-semibold"
            style={{ color: textMuted, fontFamily: fontBody }}
          >
            {label}
          </p>
          <h3
            className="text-xl font-semibold tracking-[-0.02em] mt-2"
            style={{ color: textPrimary, fontFamily: fontDisplay }}
          >
            {title}
          </h3>
          <p
            className="text-sm mt-2 leading-relaxed"
            style={{ color: textSecondary, fontFamily: fontBody }}
          >
            {description}
          </p>
        </div>
        <span
          className="text-[10px] uppercase tracking-[0.22em] px-3 py-1 rounded-full"
          style={{
            background: `rgba(${primaryRgb}, 0.12)`,
            color: `rgba(${primaryRgb}, 0.9)`,
            fontFamily: fontBody,
          }}
        >
          Prototype
        </span>
      </div>
      {children}
    </motion.div>
  );
}

export function InnovationLabPage({ organization, account: _account }: InnovationLabPageProps) {
  const [activePlaybook, setActivePlaybook] = useState<(typeof ACTION_PLAYBOOKS)[number]['id']>(
    ACTION_PLAYBOOKS[0].id,
  );
  const [narrativeIndex, setNarrativeIndex] = useState(1);
  const [journeyIndex, setJourneyIndex] = useState(2);
  const [sessionActive, setSessionActive] = useState(false);
  const [tuning, setTuning] = useState({ warmth: 52, contrast: 46, saturation: 38 });

  const primaryColor = organization.theme.primary || '#D4AF37';
  const primaryRgb = organization.theme.primaryRgb || '212,175,55';
  const fontDisplay = organization.theme.fontDisplay || "'DM Serif Display', 'Playfair Display', serif";
  const fontBody = organization.theme.fontBody || "'Sora', 'DM Sans', system-ui, sans-serif";
  const isDark = organization.theme.prefersDark || false;
  const borderColor = organization.theme.borderColor || (isDark ? '#27272A' : '#E4E4E7');
  const bgCard = organization.theme.bgCard || (isDark ? '#18181B' : '#FFFFFF');
  const bgPrimary = organization.theme.bgPrimary || (isDark ? '#09090B' : '#FAFAFA');
  const textPrimary = organization.theme.textPrimary || (isDark ? '#FAFAFA' : '#09090B');
  const textSecondary = organization.theme.textSecondary || (isDark ? '#A1A1AA' : '#71717A');
  const textMuted = organization.theme.textMuted || (isDark ? '#71717A' : '#A1A1AA');

  const selectedPlaybook = useMemo(
    () => ACTION_PLAYBOOKS.find((playbook) => playbook.id === activePlaybook) || ACTION_PLAYBOOKS[0],
    [activePlaybook],
  );
  const activeNarrative = NARRATIVE_STEPS[narrativeIndex];
  const activeJourney = JOURNEY_STAGES[journeyIndex];

  const previewFilter = `saturate(${1 + tuning.saturation / 100}) contrast(${1 + tuning.contrast / 100}) hue-rotate(${(tuning.warmth - 50) * 0.6}deg)`;

  return (
    <div className="min-h-full p-8" style={{ background: bgPrimary }}>
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.35em] font-semibold"
              style={{ color: textMuted, fontFamily: fontBody }}
            >
              R&D SUITE
            </p>
            <h1
              className="text-4xl font-semibold tracking-[-0.03em] mt-3"
              style={{ color: textPrimary, fontFamily: fontDisplay }}
            >
              Innovation Lab
            </h1>
            <p
              className="text-sm mt-3 max-w-2xl leading-relaxed"
              style={{ color: textSecondary, fontFamily: fontBody }}
            >
              A curated set of experimental upgrades designed to elevate concierge workflows, analytics storytelling,
              and immersive collaboration across the Lobbi experience.
            </p>
          </div>
          <div
            className="px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.28em] font-semibold"
            style={{ background: `rgba(${primaryRgb}, 0.12)`, color: primaryColor, fontFamily: fontBody }}
          >
            Live Prototypes
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <InnovationCard
            title="Concierge Action Orchestrator"
            label="Upgrade 01"
            description="Launch multi-step concierge sequences that align teams, automation, and stakeholder updates."
            borderColor={borderColor}
            bgCard={bgCard}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            textMuted={textMuted}
            fontDisplay={fontDisplay}
            fontBody={fontBody}
            primaryRgb={primaryRgb}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                {ACTION_PLAYBOOKS.map((playbook) => {
                  const isActive = playbook.id === activePlaybook;
                  return (
                    <button
                      key={playbook.id}
                      className="w-full text-left rounded-xl border p-3 transition-all"
                      style={{
                        borderColor: isActive ? primaryColor : borderColor,
                        background: isActive ? `rgba(${primaryRgb}, 0.08)` : 'transparent',
                      }}
                      onClick={() => setActivePlaybook(playbook.id)}
                    >
                      <p className="text-sm font-semibold" style={{ color: textPrimary, fontFamily: fontBody }}>
                        {playbook.title}
                      </p>
                      <p className="text-xs mt-1" style={{ color: textMuted, fontFamily: fontBody }}>
                        {playbook.description}
                      </p>
                    </button>
                  );
                })}
              </div>
              <div
                className="rounded-xl border p-4 h-full flex flex-col"
                style={{ borderColor, background: 'var(--theme-bg-secondary, #F4F4F5)' }}
              >
                <p className="text-xs uppercase tracking-[0.25em]" style={{ color: textMuted, fontFamily: fontBody }}>
                  Orchestration Steps
                </p>
                <div className="mt-4 space-y-3 flex-1">
                  {selectedPlaybook.steps.map((step, index) => (
                    <div key={step.label} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: `rgba(${primaryRgb}, ${0.5 + index * 0.1})` }}
                        />
                        <span className="text-sm" style={{ color: textSecondary, fontFamily: fontBody }}>
                          {step.label}
                        </span>
                      </div>
                      <span className="text-[11px]" style={{ color: textMuted, fontFamily: fontBody }}>
                        {step.eta}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  className="mt-4 w-full py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.25em] transition-colors"
                  style={{
                    background: primaryColor,
                    color: 'var(--theme-text-inverse, #FFFFFF)',
                  }}
                  onClick={() => toast.success('Playbook queued. Concierge team notified.')}
                >
                  Launch Playbook
                </button>
              </div>
            </div>
          </InnovationCard>

          <InnovationCard
            title="Theme Morphing Studio"
            label="Upgrade 02"
            description="Continuously refine brand DNA with live theming sliders and immediate preview feedback."
            borderColor={borderColor}
            bgCard={bgCard}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            textMuted={textMuted}
            fontDisplay={fontDisplay}
            fontBody={fontBody}
            primaryRgb={primaryRgb}
          >
            <div className="space-y-4">
              {([
                { id: 'warmth', label: 'Warmth', value: tuning.warmth },
                { id: 'contrast', label: 'Contrast', value: tuning.contrast },
                { id: 'saturation', label: 'Saturation', value: tuning.saturation },
              ] as const).map((slider) => (
                <div key={slider.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium" style={{ color: textPrimary, fontFamily: fontBody }}>
                      {slider.label}
                    </p>
                    <span className="text-xs" style={{ color: textMuted, fontFamily: fontBody }}>
                      {slider.value}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={slider.value}
                    onChange={(event) =>
                      setTuning((prev) => ({ ...prev, [slider.id]: Number(event.target.value) }))
                    }
                    style={{ accentColor: primaryColor }}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div
                className="rounded-xl border p-4"
                style={{
                  borderColor,
                  background: `linear-gradient(135deg, rgba(${primaryRgb}, 0.18) 0%, rgba(${primaryRgb}, 0.04) 100%)`,
                  filter: previewFilter,
                }}
              >
                <p className="text-xs uppercase tracking-[0.25em]" style={{ color: textMuted, fontFamily: fontBody }}>
                  Live Preview
                </p>
                <p className="text-lg font-semibold mt-2" style={{ color: textPrimary, fontFamily: fontDisplay }}>
                  Luxe Haven Premium
                </p>
                <p className="text-xs mt-2" style={{ color: textSecondary, fontFamily: fontBody }}>
                  Adaptive palette blends across 20 org themes.
                </p>
              </div>
              <div className="rounded-xl border p-4" style={{ borderColor, background: bgCard }}>
                <p className="text-xs uppercase tracking-[0.25em]" style={{ color: textMuted, fontFamily: fontBody }}>
                  Palette Chips
                </p>
                <div className="flex items-center gap-2 mt-3">
                  {['0.16', '0.32', '0.48', '0.64'].map((alpha) => (
                    <span
                      key={alpha}
                      className="w-9 h-9 rounded-lg border"
                      style={{
                        borderColor,
                        background: `rgba(${primaryRgb}, ${alpha})`,
                        filter: previewFilter,
                      }}
                    />
                  ))}
                </div>
                <button
                  className="mt-4 w-full py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.25em]"
                  style={{ border: `1px solid ${borderColor}`, color: textPrimary, fontFamily: fontBody }}
                  onClick={() => toast.success('Theme draft captured for review.')}
                >
                  Capture Draft
                </button>
              </div>
            </div>
          </InnovationCard>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <InnovationCard
            title="Narrative Analytics Mode"
            label="Upgrade 03"
            description="Transform KPIs into a guided story with interactive cadence controls."
            borderColor={borderColor}
            bgCard={bgCard}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            textMuted={textMuted}
            fontDisplay={fontDisplay}
            fontBody={fontBody}
            primaryRgb={primaryRgb}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium" style={{ color: textPrimary, fontFamily: fontBody }}>
                  Narrative Timeline
                </p>
                <span className="text-xs" style={{ color: textMuted, fontFamily: fontBody }}>
                  Scene {narrativeIndex + 1} of {NARRATIVE_STEPS.length}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={NARRATIVE_STEPS.length - 1}
                value={narrativeIndex}
                onChange={(event) => setNarrativeIndex(Number(event.target.value))}
                className="w-full"
                style={{ accentColor: primaryColor }}
              />
              <div className="flex flex-wrap gap-2">
                {NARRATIVE_STEPS.map((step, index) => (
                  <button
                    key={step.title}
                    className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                    style={{
                      background: narrativeIndex === index ? primaryColor : 'transparent',
                      color: narrativeIndex === index ? '#FFFFFF' : textMuted,
                      border: narrativeIndex === index ? 'none' : `1px solid ${borderColor}`,
                    }}
                    onClick={() => setNarrativeIndex(index)}
                  >
                    {step.title}
                  </button>
                ))}
              </div>
              <div className="rounded-xl border p-4" style={{ borderColor, background: bgCard }}>
                <p className="text-lg font-semibold" style={{ color: textPrimary, fontFamily: fontDisplay }}>
                  {activeNarrative.title}
                </p>
                <p className="text-sm mt-2" style={{ color: textSecondary, fontFamily: fontBody }}>
                  {activeNarrative.insight}
                </p>
                <p className="text-xs mt-3 uppercase tracking-[0.2em]" style={{ color: textMuted, fontFamily: fontBody }}>
                  {activeNarrative.metric}
                </p>
              </div>
            </div>
          </InnovationCard>

          <InnovationCard
            title="Live Member Journey Map"
            label="Upgrade 04"
            description="Visualize the member lifecycle with animated transitions and cohort-specific insights."
            borderColor={borderColor}
            bgCard={bgCard}
            textPrimary={textPrimary}
            textSecondary={textSecondary}
            textMuted={textMuted}
            fontDisplay={fontDisplay}
            fontBody={fontBody}
            primaryRgb={primaryRgb}
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {JOURNEY_STAGES.map((stage, index) => (
                  <button
                    key={stage.id}
                    className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
                    style={{
                      background: journeyIndex === index ? `rgba(${primaryRgb}, 0.18)` : 'transparent',
                      color: journeyIndex === index ? textPrimary : textMuted,
                      border: `1px solid ${borderColor}`,
                    }}
                    onClick={() => setJourneyIndex(index)}
                  >
                    {stage.label}
                  </button>
                ))}
              </div>
              <div className="rounded-xl border p-4" style={{ borderColor, background: bgCard }}>
                <p className="text-sm uppercase tracking-[0.25em]" style={{ color: textMuted, fontFamily: fontBody }}>
                  Active Stage
                </p>
                <p className="text-lg font-semibold mt-2" style={{ color: textPrimary, fontFamily: fontDisplay }}>
                  {activeJourney.label}
                </p>
                <p className="text-sm mt-2" style={{ color: textSecondary, fontFamily: fontBody }}>
                  {activeJourney.note}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em]" style={{ color: textMuted, fontFamily: fontBody }}>
                    Signal
                  </span>
                  <span className="text-sm font-semibold" style={{ color: textPrimary, fontFamily: fontBody }}>
                    {activeJourney.metric}
                  </span>
                </div>
                <div className="mt-3 h-2 rounded-full" style={{ background: 'var(--theme-bg-secondary, #F4F4F5)' }}>
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(journeyIndex + 1) * (100 / JOURNEY_STAGES.length)}%`,
                      background: primaryColor,
                    }}
                  />
                </div>
              </div>
            </div>
          </InnovationCard>
        </div>

        <InnovationCard
          title="Collaborative Walkthroughs"
          label="Upgrade 05"
          description="Host co-browsing sessions with presenter control, annotations, and live feedback."
          borderColor={borderColor}
          bgCard={bgCard}
          textPrimary={textPrimary}
          textSecondary={textSecondary}
          textMuted={textMuted}
          fontDisplay={fontDisplay}
          fontBody={fontBody}
          primaryRgb={primaryRgb}
        >
          <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
            <div className="rounded-xl border p-4" style={{ borderColor, background: bgCard }}>
              <p className="text-xs uppercase tracking-[0.25em]" style={{ color: textMuted, fontFamily: fontBody }}>
                Session Control
              </p>
              <p className="text-lg font-semibold mt-2" style={{ color: textPrimary, fontFamily: fontDisplay }}>
                {sessionActive ? 'Walkthrough Active' : 'No Active Walkthrough'}
              </p>
              <p className="text-sm mt-2" style={{ color: textSecondary, fontFamily: fontBody }}>
                {sessionActive
                  ? 'Stakeholders are synced to your cursor and view.'
                  : 'Start a co-browsing session to guide executives through the experience.'}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{
                    background: sessionActive ? 'transparent' : primaryColor,
                    color: sessionActive ? textPrimary : '#FFFFFF',
                    border: sessionActive ? `1px solid ${borderColor}` : 'none',
                  }}
                  onClick={() => {
                    setSessionActive(true);
                    toast.success('Walkthrough started. Link shared with attendees.');
                  }}
                >
                  Start Session
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{
                    border: `1px solid ${borderColor}`,
                    color: textPrimary,
                  }}
                  onClick={() => {
                    setSessionActive(false);
                    toast.info('Walkthrough ended. Session recap saved.');
                  }}
                >
                  End Session
                </button>
              </div>
            </div>
            <div className="rounded-xl border p-4" style={{ borderColor, background: bgCard }}>
              <p className="text-xs uppercase tracking-[0.25em]" style={{ color: textMuted, fontFamily: fontBody }}>
                Live Participants
              </p>
              <div className="mt-3 space-y-3">
                {WALKTHROUGH_PARTICIPANTS.map((participant) => (
                  <div key={participant.name} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium" style={{ color: textPrimary, fontFamily: fontBody }}>
                        {participant.name}
                      </p>
                      <p className="text-xs" style={{ color: textMuted, fontFamily: fontBody }}>
                        {participant.role}
                      </p>
                    </div>
                    <span
                      className="text-[10px] uppercase tracking-[0.22em] px-2 py-1 rounded-full"
                      style={{
                        background: `rgba(${primaryRgb}, 0.12)`,
                        color: textSecondary,
                        fontFamily: fontBody,
                      }}
                    >
                      {participant.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </InnovationCard>
      </div>
    </div>
  );
}

export default InnovationLabPage;

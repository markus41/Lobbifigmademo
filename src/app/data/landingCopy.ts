export interface LandingNavLink {
  label: string;
  href: string;
}

export interface LandingStat {
  value: string;
  label: string;
  icon: 'grid' | 'clock' | 'files';
}

export interface LandingFeature {
  key: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: 'users' | 'message' | 'calendar' | 'dollar' | 'chart' | 'shield';
}

export interface LandingMetric {
  value: string;
  label: string;
}

export interface LandingStep {
  number: string;
  title: string;
  description: string;
}

export interface ComparisonRow {
  feature: string;
  legacy: string;
  lobbi: string;
}

export const landingCopy = {
  nav: {
    logoText: 'Lobbi',
    links: [
      { label: 'Features', href: '#solution' },
      { label: 'Solutions', href: '#comparison' },
      { label: 'About', href: '#testimonial' },
      { label: 'Contact', href: '#cta' },
    ] as LandingNavLink[],
    cta: 'Request Demo',
  },
  hero: {
    sectionLabel: 'Association Management, Elevated',
    headline: 'Your Members Deserve More Than Spreadsheets and Workarounds',
    subheadline:
      'Lobbi brings the precision of luxury hospitality to association management. One intelligent platform that replaces 15 disconnected tools, eliminates 50% of administrative busywork, and makes every member interaction feel personal.',
    primaryCta: 'Request a Demo',
    secondaryCta: 'Watch the Tour',
    socialProof: 'Trusted by 200+ associations managing 500,000+ members',
    scrollHint: 'Scroll to explore',
  },
  problem: {
    sectionLabel: 'The Problem',
    headline: 'Association Teams Are Drowning in Operational Complexity',
    body:
      "Your team spends more time fighting fragmented systems than serving members. Data lives in silos. Renewals slip through cracks. Chapter leaders cannot access their own information. And every year, the patchwork of tools gets harder to maintain.",
    stats: [
      {
        value: '15-20',
        label: 'Disconnected tools the average association juggles',
        icon: 'grid',
      },
      {
        value: '50%',
        label: 'Of staff time consumed by manual administration',
        icon: 'clock',
      },
      {
        value: '40+ hrs/mo',
        label: 'Lost to PDF processing, data re-entry, and reconciliation',
        icon: 'files',
      },
    ] as LandingStat[],
  },
  solution: {
    sectionLabel: 'The Lobbi Difference',
    headline: 'One Intelligent Platform That Replaces the Chaos',
    body:
      'Lobbi consolidates membership, events, finances, communications, learning, and reporting into a single source of truth powered by AI that understands how associations actually work.',
    features: [
      {
        key: 'registry',
        eyebrow: 'The Registry',
        title: 'Unified Member Management',
        description:
          'One profile powers everything: directory, renewals, event registration, and communications. Update once and it is reflected everywhere. No more spreadsheet reconciliation.',
        icon: 'users',
      },
      {
        key: 'concierge',
        eyebrow: 'The Concierge',
        title: 'AI-Powered Intelligence',
        description:
          "Ask questions in plain English. 'How many members renewed this quarter?' The Concierge understands intent and answers instantly with live data.",
        icon: 'message',
      },
      {
        key: 'events',
        eyebrow: 'Events Pavilion',
        title: 'Events Without Friction',
        description:
          'Registration, payments, CE credits, attendance tracking, and post-event surveys are fully connected. No third-party event tools required.',
        icon: 'calendar',
      },
      {
        key: 'ledger',
        eyebrow: 'The Ledger',
        title: 'Financial Clarity',
        description:
          'Dues, invoices, payment processing, and reconciliation in one view. Automated renewals that actually work. Real-time revenue dashboards.',
        icon: 'dollar',
      },
      {
        key: 'business',
        eyebrow: 'Business Center',
        title: 'Reports That Build Themselves',
        description:
          'Natural language report builder. Ask for what you need and get publication-ready analytics. Scheduled delivery to stakeholders automatically.',
        icon: 'chart',
      },
      {
        key: 'security',
        eyebrow: 'The Doorman',
        title: 'Enterprise Security, Zero Complexity',
        description:
          'SSO with Azure AD, role-based access across chapter hierarchies, audit trails, and GDPR/CCPA compliance built in, not bolted on.',
        icon: 'shield',
      },
    ] as LandingFeature[],
  },
  metrics: {
    headline: 'Built for the Realities of Association Operations',
    items: [
      { value: '55+', label: 'Third-Party Integrations' },
      { value: 'Sub-100ms', label: 'Response Times' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: 'SOC 2', label: 'Compliant Infrastructure' },
    ] as LandingMetric[],
  },
  experience: {
    sectionLabel: 'Experience',
    headline: 'What It Feels Like to Use Lobbi',
    body:
      "Every interaction is designed to feel inevitable, like the software read your mind. Here is what a typical day looks like.",
    steps: [
      {
        number: '01',
        title: 'Ask, Don\'t Search',
        description:
          "Open the Command Palette. Type 'members expiring this month' in plain English. Get instant, actionable results with no report builder, no SQL, and no waiting.",
      },
      {
        number: '02',
        title: 'Act With Confidence',
        description:
          'One-click renewal reminders to the right members through the right channel. The system drafts the email, segments the audience, and schedules delivery.',
      },
      {
        number: '03',
        title: 'Measure What Matters',
        description:
          'Real-time dashboards update automatically. Engagement scores, revenue forecasts, and chapter comparisons are available without pulling a single report.',
      },
    ] as LandingStep[],
  },
  comparison: {
    sectionLabel: 'Why Switch',
    headline: 'You Deserve Better Than What You Are Using',
    headers: {
      feature: 'Feature',
      legacy: 'Legacy AMS',
      lobbi: 'Lobbi',
    },
    rows: [
      {
        feature: 'User Interface',
        legacy: 'Built in 2010, feels like it',
        lobbi: 'Designed in 2025, feels like the future',
      },
      {
        feature: 'Member Onboarding',
        legacy: 'Multi-step forms and manual approval',
        lobbi: 'Guided flow and auto-provisioned in 30 seconds',
      },
      {
        feature: 'Reporting',
        legacy: 'Crystal Reports with IT dependency',
        lobbi: 'Natural language ask-and-receive insights',
      },
      {
        feature: 'Chapter Data Access',
        legacy: 'Request via email and wait days',
        lobbi: 'Real-time, role-based, self-service',
      },
      {
        feature: 'Event Management',
        legacy: 'Separate tool with manual sync',
        lobbi: 'Fully integrated with zero reconciliation',
      },
      {
        feature: 'AI Assistance',
        legacy: 'Not available',
        lobbi: 'Built-in Concierge powered by Claude',
      },
      {
        feature: 'Mobile Experience',
        legacy: 'Desktop-only or basic responsive',
        lobbi: 'Full feature parity with a native feel',
      },
    ] as ComparisonRow[],
  },
  testimonial: {
    quote:
      'We evaluated six AMS platforms over eight months. Lobbi was the only one that understood our organizational complexity: hierarchical chapters, CE credit tracking, and tiered membership, without requiring us to change how we work.',
    attribution: 'Association Executive, Professional Trade Association',
  },
  cta: {
    headline: 'Ready to Elevate Your Association?',
    subheadline:
      'Join the associations that have already made the switch. Start with a personalized demo and see what Lobbi can do for your organization.',
    primary: 'Request a Demo',
    secondary: 'Talk to Sales',
    trustLine: 'No commitment required - Personalized to your org - Live in 30 minutes',
  },
  footer: {
    tagline: 'Association Management, Elevated',
    platformHeading: 'Platform',
    companyHeading: 'Company',
    legalHeading: 'Legal',
    platformLinks: [
      'The Registry',
      'Events Pavilion',
      'The Ledger',
      'The Concierge',
      'Business Center',
      'Learning Center',
    ],
    companyLinks: ['About', 'Careers', 'Blog', 'Press', 'Contact'],
    legalLinks: ['Privacy Policy', 'Terms of Service', 'Security', 'GDPR', 'SOC 2'],
    copyright: '(c) 2025 Lobbi. All rights reserved.',
  },
};

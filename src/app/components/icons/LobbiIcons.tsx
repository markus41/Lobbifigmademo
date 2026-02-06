// THE LOBBI - Custom Icon Components
// Extracted from the comprehensive icon library

interface IconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

// NAVIGATION ICONS

export function DashboardIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* Bento grid with activity */}
      <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="7" y="7" width="5" height="5" rx="1" fill="currentColor" opacity="0.3"/>
      <rect x="13" y="7" width="5" height="2.5" rx="1" fill="currentColor" opacity="0.25"/>
      <rect x="13" y="10.5" width="5" height="2.5" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="7" y="13" width="11" height="5" rx="1" fill="currentColor" opacity="0.25"/>
      <polyline points="9,15 10,14 11,14.5 12,12.5" stroke="currentColor" strokeWidth="1" fill="none"/>
    </svg>
  );
}

export function RegistryIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* Member Directory - Stacked cards */}
      <rect x="10" y="8" width="9" height="11" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14.5" cy="12" r="2" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M11 17 Q11 15 14.5 15 Q18 15 18 17" stroke="currentColor" strokeWidth="1" fill="none"/>
      <rect x="8" y="6" width="9" height="11" rx="1" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1"/>
      <rect x="6" y="4" width="9" height="11" rx="1" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1"/>
    </svg>
  );
}

export function EventsIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* Calendar with event */}
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="15" r="2.5" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

export function SettingsIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* Guest Services - Concierge bell with gear */}
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="12" y1="3" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="12" y1="18" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="3" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="18" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="5.6" y1="5.6" x2="7.8" y2="7.8" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="16.2" y1="16.2" x2="18.4" y2="18.4" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="5.6" y1="18.4" x2="7.8" y2="16.2" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="16.2" y1="7.8" x2="18.4" y2="5.6" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// TOPBAR ICONS

export function ConciergeIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* Concierge hat */}
      <ellipse cx="12" cy="18" rx="9" ry="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M5 18V9a7 7 0 0 1 14 0v9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
    </svg>
  );
}

export function BellIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* Service Bell */}
      <ellipse cx="12" cy="18" rx="10" ry="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M12 5v2M6 15a6 6 0 0 1 12 0v3H6v-3z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="5" r="2" fill="currentColor"/>
    </svg>
  );
}

export function SearchIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function MenuIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// DASHBOARD WIDGETS

export function MetricsIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* Gauge */}
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M6 15 A8 8 0 0 1 18 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="12" cy="15" r="2" fill="currentColor"/>
      <line x1="12" y1="15" x2="16" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function ActivityIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* Activity feed */}
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="7" cy="8" r="1.5" fill="currentColor"/>
      <line x1="10" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="7" cy="12" r="1.5" fill="currentColor"/>
      <line x1="10" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="7" cy="16" r="1.5" fill="currentColor"/>
      <line x1="10" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

export function RevenueIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* Revenue chart */}
      <rect x="3" y="4" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M6 16 L9 13 L12 14 L15 9 L18 11 L21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="21" cy="6" r="2" fill="currentColor"/>
    </svg>
  );
}

// BRAND ICONS

export function LobbiLogoMark({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* Octagon with L */}
      <path d="M8 2h8l6 6v8l-6 6H8l-6-6V8l6-6z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <text 
        x="12" 
        y="15" 
        textAnchor="middle" 
        fontFamily="Cormorant Garamond, Georgia, serif" 
        fontStyle="italic" 
        fontSize="14" 
        fontWeight="300"
        fill="currentColor"
      >
        L
      </text>
    </svg>
  );
}

export function LobbiOctagon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* Octagon frame */}
      <path d="M8 2h8l6 6v8l-6 6H8l-6-6V8l6-6z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M12 6l6 6-6 6-6-6 6-6z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
    </svg>
  );
}

// ADDITIONAL NAVIGATION ICONS

export function BusinessCenterIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* Briefcase with growth chart */}
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5"/>
      <polyline points="8,16 10,14 12,15 14,11 16,13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function VaultIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* Secure vault with shield */}
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      <line x1="12" y1="9" x2="12" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="17" x2="12" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="12" x2="7" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="17" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="19" y="10" width="2" height="4" rx="0.5" fill="currentColor" opacity="0.4"/>
    </svg>
  );
}

export function MemberPortalIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* App launcher grid - 4 squares */}
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15"/>
      <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15"/>
      <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15"/>
      <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15"/>
    </svg>
  );
}

export function CommitteeIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* Group of people - 3 heads */}
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M6 20v-1a6 6 0 0 1 12 0v1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="5" cy="10" r="2" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <path d="M2 20v-0.5a4 4 0 0 1 4.5-4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <circle cx="19" cy="10" r="2" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <path d="M22 20v-0.5a4 4 0 0 0-4.5-4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function EducationIcon({ className = "", size = 24, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
      {/* Graduation cap */}
      <path d="M12 4L2 9l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
      <path d="M6 11.5v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="22" y1="9" x2="22" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="22" cy="16.5" r="1" fill="currentColor"/>
    </svg>
  );
}

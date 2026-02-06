// THE LOBBI - Custom Icon Components
// Extracted from the comprehensive icon library
// Compatible with both Tailwind classes and inline styles

import type { CSSProperties } from 'react';

export interface IconProps {
  className?: string;
  size?: number;
  style?: CSSProperties;
  width?: number | string;
  height?: number | string;
  color?: string;
  strokeWidth?: number;
}

// NAVIGATION ICONS

export function DashboardIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
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

export function RegistryIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Member Directory - Stacked cards */}
      <rect x="10" y="8" width="9" height="11" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14.5" cy="12" r="2" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M11 17 Q11 15 14.5 15 Q18 15 18 17" stroke="currentColor" strokeWidth="1" fill="none"/>
      <rect x="8" y="6" width="9" height="11" rx="1" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1"/>
      <rect x="6" y="4" width="9" height="11" rx="1" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1"/>
    </svg>
  );
}

export function EventsIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Calendar with event */}
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="15" r="2.5" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

export function SettingsIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
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

export function ConciergeIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Concierge hat */}
      <ellipse cx="12" cy="18" rx="9" ry="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M5 18V9a7 7 0 0 1 14 0v9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
    </svg>
  );
}

export function BellIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Service Bell */}
      <ellipse cx="12" cy="18" rx="10" ry="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M12 5v2M6 15a6 6 0 0 1 12 0v3H6v-3z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="5" r="2" fill="currentColor"/>
    </svg>
  );
}

export function SearchIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function MenuIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// DASHBOARD WIDGETS

export function MetricsIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Gauge */}
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M6 15 A8 8 0 0 1 18 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="12" cy="15" r="2" fill="currentColor"/>
      <line x1="12" y1="15" x2="16" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function ActivityIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
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

export function RevenueIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Revenue chart */}
      <rect x="3" y="4" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M6 16 L9 13 L12 14 L15 9 L18 11 L21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="21" cy="6" r="2" fill="currentColor"/>
    </svg>
  );
}

// BRAND ICONS

export function LobbiLogoMark({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
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

export function LobbiOctagon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Octagon frame */}
      <path d="M8 2h8l6 6v8l-6 6H8l-6-6V8l6-6z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M12 6l6 6-6 6-6-6 6-6z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
    </svg>
  );
}

// ADDITIONAL ACTION ICONS

export function VaultIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Vault / Safe */}
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      <line x1="12" y1="8" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="18" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function BusinessCenterIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Briefcase with chart */}
      <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 15l3-2 3 3 3-4 3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function MembershipIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Membership card with star */}
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1.5"/>
      <polygon points="12,13 13.5,16 17,16.5 14.5,18.5 15.5,22 12,20 8.5,22 9.5,18.5 7,16.5 10.5,16" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

export function DonationIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Heart with hand */}
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function CommunicationsIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Message bubbles */}
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="8" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <line x1="8" y1="14" x2="12" y2="14" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

export function ReportsIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Document with chart */}
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="8" y="12" width="2" height="6" fill="currentColor" opacity="0.5"/>
      <rect x="11" y="14" width="2" height="4" fill="currentColor" opacity="0.5"/>
      <rect x="14" y="10" width="2" height="8" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

export function ScheduleIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Calendar with clock */}
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="15" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M12 14v1.5l1 .5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function InvitationIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Envelope with seal */}
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="17" r="2" fill="currentColor"/>
    </svg>
  );
}

export function AwardIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Trophy / Award */}
      <path d="M6 9H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18 9h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 2h12v8a6 6 0 0 1-12 0V2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M12 16v4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function CheckInIcon({ className = "", size = 24, style, width, height, ...props }: IconProps) {
  const w = width ?? size;
  const h = height ?? size;
  return (
    <svg width={w} height={h} viewBox="0 0 24 24" fill="none" className={className} style={style} {...props}>
      {/* Check-in badge */}
      <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 18 Q8 14 12 14 Q16 14 16 18" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <polyline points="9,10 11,12 15,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/**
 * Lobbi Icon System
 *
 * Unified icon exports combining:
 * - Custom Lobbi brand icons (LobbiIcons.tsx)
 * - Custom utility icons (XIcon.tsx)
 * - Lucide React icons (for additional icons)
 *
 * Usage:
 * import { DashboardIcon, SearchIcon, Home, Users } from '@/app/components/icons';
 */

// ============================================================================
// CUSTOM LOBBI ICONS - Brand-specific icons with Art Deco styling
// ============================================================================

export {
  // Navigation
  DashboardIcon,
  RegistryIcon,
  EventsIcon,
  SettingsIcon,

  // Topbar
  ConciergeIcon,
  BellIcon,
  SearchIcon,
  MenuIcon,

  // Dashboard Widgets
  MetricsIcon,
  ActivityIcon,
  RevenueIcon,

  // Brand
  LobbiLogoMark,
  LobbiOctagon,

  // Additional Lobbi Icons
  VaultIcon,
  BusinessCenterIcon,
  MembershipIcon,
  DonationIcon,
  CommunicationsIcon,
  ReportsIcon,
  ScheduleIcon,
  InvitationIcon,
  AwardIcon,
  CheckInIcon,
} from './LobbiIcons';

export type { IconProps } from './LobbiIcons';

export { XIcon, SendIcon } from './XIcon';

// ============================================================================
// LUCIDE ICONS - Extended icon library
// Import specific icons for tree-shaking
// ============================================================================

export {
  // Navigation & UI
  Home,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  MoreVertical,

  // Actions
  Plus,
  Minus,
  X,
  Check,
  Edit,
  Edit2,
  Edit3,
  Trash,
  Trash2,
  Copy,
  Clipboard,
  Download,
  Upload,
  Share,
  Share2,
  ExternalLink,
  Link,
  Link2,
  Unlink,
  RefreshCw,
  RotateCcw,
  Save,

  // User & People
  User,
  Users,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  UserCircle,
  Contact,

  // Communication
  Mail,
  MessageSquare,
  MessageCircle,
  Phone,
  PhoneCall,
  Video,
  Send,
  Inbox,
  Bell as LucideBell,
  BellOff,
  BellRing,

  // Media
  Image,
  Camera,
  Film,
  Play,
  Pause,
  StopCircle,
  Volume2,
  VolumeX,
  Mic,
  MicOff,

  // Files & Folders
  File,
  FileText,
  FilePlus,
  FileCheck,
  Folder,
  FolderOpen,
  FolderPlus,
  Archive,

  // Calendar & Time
  Calendar as LucideCalendar,
  CalendarDays,
  CalendarCheck,
  CalendarPlus,
  Clock,
  Timer,
  Hourglass,

  // Data & Charts
  BarChart,
  BarChart2,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Activity,

  // Location
  MapPin,
  Map,
  Navigation,
  Compass,
  Globe,

  // Status & Alerts
  AlertCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  CheckCircle,
  CheckCircle2,
  XCircle,
  XOctagon,

  // Security
  Lock,
  Unlock,
  Key,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Eye,
  EyeOff,

  // Payment & Commerce
  CreditCard,
  DollarSign,
  Wallet,
  Receipt,
  ShoppingCart,
  ShoppingBag,
  Tag,
  Tags,
  Percent,
  Gift,

  // Buildings & Places
  Building,
  Building2,
  Home as HomeBuilding,
  Landmark,
  Hotel,
  Store,

  // Objects
  Star,
  Heart,
  Bookmark,
  Flag,
  Award,
  Trophy,
  Crown,
  Gem,

  // Settings & Tools
  Settings as LucideSettings,
  Settings2,
  Sliders,
  Tool,
  Wrench,
  Cog,
  Filter,
  SlidersHorizontal,

  // Layout
  Grid,
  Grid2X2,
  Grid3X3,
  List,
  LayoutGrid,
  LayoutList,
  Columns,
  Rows,
  Table,
  Table2,

  // Social
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,

  // Misc
  Sparkles,
  Zap,
  Flame,
  Sun,
  Moon,
  Cloud,
  Loader,
  Loader2,
  RefreshCcw,
  Power,
  LogIn,
  LogOut,
  Menu as LucideMenu,
  PanelLeft,
  PanelRight,
  Maximize,
  Minimize,
  Maximize2,
  Minimize2,
  Move,
  GripVertical,
  GripHorizontal,

} from 'lucide-react';

// ============================================================================
// ICON TYPE EXPORTS
// ============================================================================

export type { LucideIcon, LucideProps } from 'lucide-react';

// ============================================================================
// ICON COMPONENT WRAPPER
// ============================================================================

import { type ComponentType, type SVGProps } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * Unified Icon component that works with both Lobbi and Lucide icons
 *
 * @example
 * // With Lucide icon
 * <Icon icon={Home} size={24} className="text-primary" />
 *
 * // With custom Lobbi icon (use directly)
 * <DashboardIcon className="w-6 h-6" />
 */
export function Icon({
  icon: IconComponent,
  size = 24,
  className = '',
  ...props
}: IconProps & { icon: LucideIcon | ComponentType<any> }) {
  return (
    <IconComponent
      width={size}
      height={size}
      className={className}
      {...props}
    />
  );
}

// ============================================================================
// ICON REGISTRY - For dynamic icon loading by name
// ============================================================================

import {
  Home,
  User,
  Users,
  Calendar as Cal,
  Settings as Set,
  Bell as Bel,
  Mail,
  Search as Srch,
  Plus,
  Minus,
  Check,
  X as CloseX,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Download,
  Upload,
  Star,
  Heart,
  Bookmark,
  Filter,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Share2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
} from 'lucide-react';

import {
  DashboardIcon,
  RegistryIcon,
  EventsIcon,
  SettingsIcon,
  ConciergeIcon,
  BellIcon,
  SearchIcon,
  MenuIcon,
  MetricsIcon,
  ActivityIcon,
  RevenueIcon,
  LobbiLogoMark,
  LobbiOctagon,
} from './LobbiIcons';

import { XIcon, SendIcon } from './XIcon';

export const iconRegistry = {
  // Lobbi Custom Icons
  'lobbi-dashboard': DashboardIcon,
  'lobbi-registry': RegistryIcon,
  'lobbi-events': EventsIcon,
  'lobbi-settings': SettingsIcon,
  'lobbi-concierge': ConciergeIcon,
  'lobbi-bell': BellIcon,
  'lobbi-search': SearchIcon,
  'lobbi-menu': MenuIcon,
  'lobbi-metrics': MetricsIcon,
  'lobbi-activity': ActivityIcon,
  'lobbi-revenue': RevenueIcon,
  'lobbi-logo': LobbiLogoMark,
  'lobbi-octagon': LobbiOctagon,
  'lobbi-x': XIcon,
  'lobbi-send': SendIcon,

  // Lucide Icons (common)
  'home': Home,
  'user': User,
  'users': Users,
  'calendar': Cal,
  'settings': Set,
  'bell': Bel,
  'mail': Mail,
  'search': Srch,
  'plus': Plus,
  'minus': Minus,
  'check': Check,
  'x': CloseX,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'edit': Edit,
  'trash': Trash2,
  'download': Download,
  'upload': Upload,
  'star': Star,
  'heart': Heart,
  'bookmark': Bookmark,
  'filter': Filter,
  'more': MoreHorizontal,
  'external-link': ExternalLink,
  'copy': Copy,
  'share': Share2,
  'eye': Eye,
  'eye-off': EyeOff,
  'lock': Lock,
  'unlock': Unlock,
  'alert': AlertCircle,
  'info': Info,
  'success': CheckCircle,
  'error': XCircle,
} as const;

export type IconName = keyof typeof iconRegistry;

/**
 * Dynamic icon component that loads icons by name
 *
 * @example
 * <DynamicIcon name="lobbi-dashboard" size={24} />
 * <DynamicIcon name="home" className="text-primary" />
 */
export function DynamicIcon({
  name,
  size = 24,
  className = '',
  ...props
}: { name: IconName } & IconProps) {
  const IconComponent = iconRegistry[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in registry`);
    return null;
  }

  return (
    <IconComponent
      width={size}
      height={size}
      className={className}
      {...props}
    />
  );
}

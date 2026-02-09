/**
 * MembershipCard Types
 *
 * Type definitions for the mobile-first membership card component.
 */

import type { Organization, Account } from '../../../data/themes';

/**
 * Card side state - front shows member info, back shows QR code
 */
export type CardSide = 'front' | 'back';

/**
 * Member information displayed on the card
 */
export interface MemberInfo {
  /** Member's full name */
  name: string;
  /** Member's email (used to generate unique ID) */
  email: string;
  /** Member's role/tier (e.g., 'Premium', 'Professional') */
  role?: string;
  /** First name for personalization */
  first?: string;
  /** Last name for initials */
  last?: string;
  /** Member join date */
  memberSince?: string;
  /** Profile photo URL */
  avatarUrl?: string;
}

/**
 * Props for the MembershipCard component
 */
export interface MembershipCardProps {
  /** Member information to display */
  member: MemberInfo | Account;
  /** Organization theme and branding */
  organization: Organization;
  /** Callback when card is flipped */
  onFlip?: (side: CardSide) => void;
  /** Callback when share button is pressed */
  onShare?: () => void;
  /** Callback when add to wallet button is pressed */
  onAddToWallet?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the QR code display component
 */
export interface QRCodeDisplayProps {
  /** Value to encode in QR code */
  value: string;
  /** Size of the QR code in pixels */
  size?: number;
  /** Background color */
  backgroundColor?: string;
  /** Foreground (module) color */
  foregroundColor?: string;
}

/**
 * Props for the holographic shimmer effect
 */
export interface HolographicShimmerProps {
  /** Motion value for X rotation */
  rotateX: any; // MotionValue<number>
  /** Motion value for Y rotation */
  rotateY: any; // MotionValue<number>
}

/**
 * Mobile design tokens for consistent styling
 */
export interface MobileDesignTokens {
  touchTarget: {
    min: string;
    comfortable: string;
  };
  spacing: {
    tight: string;
    normal: string;
    relaxed: string;
  };
  fontSize: {
    body: string;
    label: string;
    caption: string;
    title: string;
  };
  borderRadius: {
    card: string;
    button: string;
    badge: string;
  };
  safeArea: {
    top: string;
    bottom: string;
  };
}

/**
 * Default mobile design tokens
 */
export const defaultMobileTokens: MobileDesignTokens = {
  touchTarget: { min: '44px', comfortable: '48px' },
  spacing: { tight: '8px', normal: '16px', relaxed: '24px' },
  fontSize: { body: '16px', label: '14px', caption: '12px', title: '20px' },
  borderRadius: { card: '24px', button: '12px', badge: '8px' },
  safeArea: {
    top: 'env(safe-area-inset-top)',
    bottom: 'env(safe-area-inset-bottom)'
  }
};

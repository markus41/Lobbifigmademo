/**
 * MembershipCard Module Exports
 *
 * Mobile-first digital membership card with:
 * - Holographic shimmer effect
 * - Flip animation with QR code
 * - Touch gestures (swipe to flip)
 * - 44px minimum touch targets
 */

export { MembershipCard, default } from './MembershipCard';
export type {
  CardSide,
  MemberInfo,
  MembershipCardProps,
  QRCodeDisplayProps,
  HolographicShimmerProps,
  MobileDesignTokens,
} from './MembershipCard.types';
export { defaultMobileTokens } from './MembershipCard.types';

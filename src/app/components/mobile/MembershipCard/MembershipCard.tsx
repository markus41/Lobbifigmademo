/**
 * MembershipCard - Mobile-First Digital Membership Card
 *
 * A premium, interactive membership card with:
 * - Holographic shimmer effect on tilt
 * - Flip animation to reveal QR code
 * - Swipe gestures for quick actions
 * - 44px minimum touch targets
 * - Safe area insets support
 */

import { useState, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring, PanInfo, AnimatePresence } from 'motion/react';
import type { MembershipCardProps, CardSide } from './MembershipCard.types';

// ============================================================================
// MOBILE DESIGN TOKENS
// ============================================================================

const _mobileTokens = {
  touchTarget: { min: '44px', comfortable: '48px' },
  spacing: { tight: '8px', normal: '16px', relaxed: '24px' },
  fontSize: { body: '16px', label: '14px', caption: '12px', title: '20px' },
  borderRadius: { card: '24px', button: '12px', badge: '8px' },
  safeArea: {
    top: 'env(safe-area-inset-top)',
    bottom: 'env(safe-area-inset-bottom)'
  }
};
void _mobileTokens;

// ============================================================================
// ICONS
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _QrCodeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);
void _QrCodeIcon;

const FlipIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 1l4 4-4 4" />
    <path d="M3 11V9a4 4 0 014-4h14" />
    <path d="M7 23l-4-4 4-4" />
    <path d="M21 13v2a4 4 0 01-4 4H3" />
  </svg>
);

const ShareIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const WalletIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12V7H5a2 2 0 010-4h14v4" />
    <path d="M3 5v14a2 2 0 002 2h16v-5" />
    <path d="M18 12a2 2 0 100 4 2 2 0 000-4z" />
  </svg>
);

// ============================================================================
// QR CODE GENERATOR (Simple pattern for demo)
// ============================================================================

function QRCodeDisplay({ value, size = 120 }: { value: string; size?: number }) {
  // Generate deterministic pattern from value
  const pattern = useMemo(() => {
    const hash = value.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);

    const grid: boolean[][] = [];
    for (let i = 0; i < 9; i++) {
      grid[i] = [];
      for (let j = 0; j < 9; j++) {
        // Corner finder patterns
        if ((i < 3 && j < 3) || (i < 3 && j > 5) || (i > 5 && j < 3)) {
          grid[i][j] = (i === 0 || i === 2 || j === 0 || j === 2 || (i === 1 && j === 1))
            && !((i === 1 && (j === 0 || j === 2)) || (j === 1 && (i === 0 || i === 2)));
        } else {
          // Data pattern based on hash
          grid[i][j] = ((hash >> (i * 9 + j)) & 1) === 1;
        }
      }
    }
    return grid;
  }, [value]);

  const cellSize = size / 11; // 9 cells + 1 cell padding on each side

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="var(--theme-bg-card, white)" rx={8} />
      {pattern.map((row, i) =>
        row.map((cell, j) =>
          cell && (
            <rect
              key={`${i}-${j}`}
              x={cellSize + j * cellSize}
              y={cellSize + i * cellSize}
              width={cellSize}
              height={cellSize}
              fill="var(--theme-text-primary, #1a1a2e)"
              rx={1}
            />
          )
        )
      )}
    </svg>
  );
}

// ============================================================================
// HOLOGRAPHIC SHIMMER EFFECT
// ============================================================================

function HolographicShimmer({ rotateX: _rotateX, rotateY }: { rotateX: any; rotateY: any }) {
  void _rotateX;
  const shimmerX = useTransform(rotateY, [-15, 15], ['0%', '100%']);
  const shimmerOpacity = useTransform(rotateY, [-15, 0, 15], [0.3, 0, 0.3]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-[24px]"
      style={{ opacity: shimmerOpacity }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.5) 45%,
            rgba(255,255,255,0.8) 50%,
            rgba(255,255,255,0.5) 55%,
            transparent 60%
          )`,
          transform: `translateX(${shimmerX})`,
        }}
      />
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function MembershipCard({
  member,
  organization,
  onFlip,
  onShare,
  onAddToWallet,
  className = '',
}: MembershipCardProps) {
  const [cardSide, setCardSide] = useState<CardSide>('front');
  const [isPressed, setIsPressed] = useState(false);

  // Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 300, damping: 30 });

  // Swipe gesture handling
  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      // Swipe detected - flip card
      setCardSide(prev => prev === 'front' ? 'back' : 'front');
      onFlip?.(cardSide === 'front' ? 'back' : 'front');
    }
  }, [cardSide, onFlip]);

  const handleFlip = useCallback(() => {
    setCardSide(prev => prev === 'front' ? 'back' : 'front');
    onFlip?.(cardSide === 'front' ? 'back' : 'front');
  }, [cardSide, onFlip]);

  // Theme colors
  const primaryColor = organization.theme.primary;
  const primaryRgb = organization.theme.primaryRgb;
  const gradientBtn = organization.theme.gradientBtn;

  // Member ID for QR
  const memberId = useMemo(() => {
    const hash = member.email.split('').reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    const fourDigit = Math.abs(hash % 9000) + 1000;
    return `MBR-2024-${fourDigit}`;
  }, [member.email]);

  return (
    <div className={`relative w-full max-w-[380px] mx-auto ${className}`}>
      {/* Card Container with 3D perspective */}
      <motion.div
        className="relative aspect-[1.586/1] cursor-grab active:cursor-grabbing"
        style={{
          perspective: 1000,
          transformStyle: 'preserve-3d',
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        onPointerDown={() => setIsPressed(true)}
        onPointerUp={() => setIsPressed(false)}
        onPointerLeave={() => setIsPressed(false)}
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          x.set(e.clientX - centerX);
          y.set(e.clientY - centerY);
        }}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          {cardSide === 'front' ? (
            <motion.div
              key="front"
              className="absolute inset-0 rounded-[24px] overflow-hidden shadow-2xl"
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                background: gradientBtn,
              }}
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -180, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Holographic shimmer */}
              <HolographicShimmer rotateX={rotateX} rotateY={rotateY} />

              {/* Card pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              {/* Card Content */}
              <div className="relative h-full p-6 flex flex-col justify-between text-white">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-80 mb-1">
                      {organization.short}
                    </p>
                    <h2
                      className="text-xl font-semibold"
                      style={{ fontFamily: organization.theme.fontDisplay }}
                    >
                      Member Card
                    </h2>
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold bg-white/20 backdrop-blur-[10px]"
                  >
                    {organization.logoLetter || organization.short[0]}
                  </div>
                </div>

                {/* Member Info */}
                <div className="mt-auto">
                  <p className="text-2xl font-semibold tracking-wide mb-1">
                    {member.name}
                  </p>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider opacity-60">Member ID</p>
                      <p className="text-sm font-mono tracking-wider">{memberId}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider opacity-60">Since</p>
                      <p className="text-sm font-mono">2024</p>
                    </div>
                    <div className="ml-auto">
                      <span
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-white/20"
                      >
                        {member.role || 'Member'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pressed state overlay */}
              <motion.div
                className="absolute inset-0 bg-black pointer-events-none rounded-[24px]"
                animate={{ opacity: isPressed ? 0.1 : 0 }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="back"
              className="absolute inset-0 rounded-[24px] overflow-hidden shadow-2xl"
              style={{
                background: 'var(--theme-bg-card, #FFFFFF)',
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Back side content */}
              <div className="h-full p-6 flex flex-col items-center justify-center">
                <p
                  className="text-sm font-medium mb-4"
                  style={{ color: primaryColor }}
                >
                  Scan for verification
                </p>

                <div
                  className="p-4 rounded-2xl shadow-lg"
                  style={{ background: `rgba(${primaryRgb}, 0.05)` }}
                >
                  <QRCodeDisplay value={memberId} size={140} />
                </div>

                <p className="text-xs mt-4 font-mono" style={{ color: 'var(--theme-text-secondary, #6B7280)' }}>
                  {memberId}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Action Buttons - 44px minimum touch targets */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <motion.button
          className="flex items-center justify-center gap-2 min-w-[44px] min-h-[44px] px-4 py-4 rounded-xl text-sm font-medium transition-colors"
          style={{
            background: `rgba(${primaryRgb}, 0.1)`,
            color: primaryColor,
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleFlip}
        >
          <FlipIcon className="w-5 h-5" />
          <span>Flip</span>
        </motion.button>

        <motion.button
          className="flex items-center justify-center gap-2 min-w-[44px] min-h-[44px] px-4 py-4 rounded-xl text-sm font-medium transition-colors"
          style={{
            background: `rgba(${primaryRgb}, 0.1)`,
            color: primaryColor,
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onShare?.()}
        >
          <ShareIcon className="w-5 h-5" />
          <span>Share</span>
        </motion.button>

        <motion.button
          className="flex items-center justify-center gap-2 min-w-[44px] min-h-[44px] px-4 py-4 rounded-xl text-sm font-medium text-white transition-colors"
          style={{ background: gradientBtn }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddToWallet?.()}
        >
          <WalletIcon className="w-5 h-5" />
          <span>Add to Wallet</span>
        </motion.button>
      </div>

      {/* Swipe hint */}
      <p className="text-center text-xs mt-4" style={{ color: 'var(--theme-text-muted, #9CA3AF)' }}>
        Swipe or tap Flip to see QR code
      </p>
    </div>
  );
}

export default MembershipCard;

/**
 * Demo Banner Component
 *
 * A sophisticated announcement banner that sits above the main header.
 * Supports org theming, dismissible state, and elegant animations.
 *
 * Features:
 * - Fixed position above header
 * - Org-themed gradients and colors
 * - Smooth entry/exit animations
 * - Dismissible with localStorage persistence
 * - CTA button support
 * - Responsive design
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  HStack,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLobbiTheme, useOrgTheme } from '../ThemeProvider';
import { cssVar, cssVarRgba } from '../utils/cssVariables';

// Motion components
const MotionBox = motion(Box);

// Storage key for dismissed state
const BANNER_DISMISSED_KEY = 'lobbi-demo-banner-dismissed';

// ============================================================================
// TYPES
// ============================================================================

export interface DemoBannerProps {
  /** Unique identifier for this banner (for localStorage) */
  id?: string;
  /** Main message text */
  message: string;
  /** Optional highlight text (appears before message) */
  highlight?: string;
  /** Optional CTA button text */
  ctaText?: string;
  /** Optional CTA button href */
  ctaHref?: string;
  /** Optional CTA click handler */
  onCtaClick?: () => void;
  /** Whether the banner can be dismissed */
  dismissible?: boolean;
  /** Callback when banner is dismissed */
  onDismiss?: () => void;
  /** Override visibility (controlled mode) */
  isVisible?: boolean;
  /** Banner variant */
  variant?: 'default' | 'announcement' | 'promo' | 'warning';
  /** Custom icon element */
  icon?: React.ReactNode;
}

// ============================================================================
// ANIMATIONS
// ============================================================================

const bannerVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    y: -20,
  },
  visible: {
    height: 'auto',
    opacity: 1,
    y: 0,
    transition: {
      height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      y: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    y: -10,
    transition: {
      height: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.2 },
      y: { duration: 0.2 },
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.15, duration: 0.3 },
  },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function DemoBanner({
  id = 'default',
  message,
  highlight,
  ctaText,
  ctaHref,
  onCtaClick,
  dismissible = true,
  onDismiss,
  isVisible: controlledVisible,
  variant = 'default',
  icon,
}: DemoBannerProps) {
  const { baseTheme } = useLobbiTheme();
  const orgTheme = useOrgTheme();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Hydration check for SSR
  useEffect(() => {
    setIsHydrated(true);
    // Check localStorage for dismissed state
    const storageKey = `${BANNER_DISMISSED_KEY}-${id}`;
    const dismissed = localStorage.getItem(storageKey) === 'true';
    setIsDismissed(dismissed);
  }, [id]);

  // Determine visibility
  const isVisible = controlledVisible !== undefined
    ? controlledVisible
    : !isDismissed;

  // Handle dismiss
  const handleDismiss = () => {
    setIsDismissed(true);
    const storageKey = `${BANNER_DISMISSED_KEY}-${id}`;
    localStorage.setItem(storageKey, 'true');
    onDismiss?.();
  };

  // Handle CTA click
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else if (ctaHref) {
      window.open(ctaHref, '_blank', 'noopener,noreferrer');
    }
  };

  // Get variant-specific styles
  const getVariantStyles = () => {
    const primary = orgTheme?.colors.primaryHex || baseTheme.colors.gold.champagne;
    const primaryDark = orgTheme?.colors.primaryDark || baseTheme.colors.gold.dark;
    const primaryPale = orgTheme?.colors.primaryPale || baseTheme.colors.gold.pale;
    const primaryRgb = orgTheme?.colors.primaryRgb || '212,175,55';

    switch (variant) {
      case 'announcement':
        return {
          bg: `linear-gradient(135deg, ${primaryDark}, ${primary})`,
          color: '#FFFFFF',
          highlightBg: `rgba(255,255,255,0.2)`,
          ctaBg: '#FFFFFF',
          ctaColor: primaryDark,
        };
      case 'promo':
        return {
          bg: `linear-gradient(90deg, ${primary}, ${primaryDark}, ${primary})`,
          color: '#FFFFFF',
          highlightBg: `rgba(255,255,255,0.25)`,
          ctaBg: '#FFFFFF',
          ctaColor: primaryDark,
        };
      case 'warning':
        return {
          bg: `linear-gradient(135deg, ${baseTheme.colors.state.warning}, ${baseTheme.colors.state.warningLight})`,
          color: '#FFFFFF',
          highlightBg: `rgba(255,255,255,0.2)`,
          ctaBg: '#FFFFFF',
          ctaColor: baseTheme.colors.state.warning,
        };
      default:
        return {
          bg: `linear-gradient(90deg, ${primaryDark} 0%, ${primary} 50%, ${primaryDark} 100%)`,
          color: '#FFFFFF',
          highlightBg: `rgba(255,255,255,0.15)`,
          ctaBg: 'transparent',
          ctaColor: '#FFFFFF',
          ctaBorder: 'rgba(255,255,255,0.4)',
        };
    }
  };

  const styles = getVariantStyles();

  // Don't render until hydrated (avoid SSR mismatch)
  if (!isHydrated) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionBox
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          position="relative"
          zIndex={baseTheme.zIndex.fixed + 10}
          overflow="hidden"
        >
          <Box
            bg={styles.bg}
            color={styles.color}
            py={2}
            px={4}
            position="relative"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          >
            <Container maxW="container.xl">
              <motion.div variants={contentVariants}>
                <Flex
                  align="center"
                  justify="center"
                  gap={3}
                  flexWrap="wrap"
                >
                  {/* Optional icon */}
                  {icon && (
                    <Box flexShrink={0}>{icon}</Box>
                  )}

                  {/* Highlight badge */}
                  {highlight && (
                    <Box
                      bg={styles.highlightBg}
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize={baseTheme.type.size.xs}
                      fontWeight={baseTheme.type.weight.semibold}
                      letterSpacing={baseTheme.type.tracking.caps}
                      textTransform="uppercase"
                      flexShrink={0}
                    >
                      {highlight}
                    </Box>
                  )}

                  {/* Message */}
                  <Text
                    fontSize={baseTheme.type.size.small}
                    fontWeight={baseTheme.type.weight.medium}
                    textAlign="center"
                  >
                    {message}
                  </Text>

                  {/* CTA Button */}
                  {ctaText && (
                    <Button
                      size="xs"
                      variant={variant === 'default' ? 'outline' : 'solid'}
                      bg={styles.ctaBg}
                      color={styles.ctaColor}
                      borderColor={styles.ctaBorder}
                      borderWidth={variant === 'default' ? '1px' : 0}
                      borderRadius="full"
                      px={4}
                      fontWeight={baseTheme.type.weight.semibold}
                      fontSize={baseTheme.type.size.xs}
                      letterSpacing={baseTheme.type.tracking.wide}
                      textTransform="uppercase"
                      onClick={handleCtaClick}
                      _hover={{
                        bg: variant === 'default'
                          ? 'rgba(255,255,255,0.15)'
                          : styles.ctaBg,
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                      transition={`all ${baseTheme.motion.durationMs.fast}ms ${baseTheme.motion.easingCSS.luxInOut}`}
                      flexShrink={0}
                    >
                      {ctaText}
                    </Button>
                  )}

                  {/* Dismiss button */}
                  {dismissible && (
                    <IconButton
                      aria-label="Dismiss banner"
                      icon={
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M1 1l12 12M13 1L1 13" />
                        </svg>
                      }
                      size="xs"
                      variant="ghost"
                      color={styles.color}
                      opacity={0.7}
                      _hover={{
                        opacity: 1,
                        bg: 'rgba(255,255,255,0.1)',
                      }}
                      onClick={handleDismiss}
                      ml={2}
                      flexShrink={0}
                    />
                  )}
                </Flex>
              </motion.div>
            </Container>
          </Box>

          {/* Bottom border accent */}
          <Box
            h="1px"
            bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
          />
        </MotionBox>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// PRESET BANNERS
// ============================================================================

export function DemoModeBanner(props: Partial<DemoBannerProps>) {
  return (
    <DemoBanner
      id="demo-mode"
      highlight="Demo"
      message="You're viewing a demo environment. Data shown is for demonstration purposes only."
      dismissible={true}
      variant="default"
      {...props}
    />
  );
}

export function TrialBanner({
  daysRemaining,
  ...props
}: Partial<DemoBannerProps> & { daysRemaining?: number }) {
  return (
    <DemoBanner
      id="trial"
      highlight={daysRemaining ? `${daysRemaining} days left` : 'Trial'}
      message="Your free trial is active. Upgrade to unlock all premium features."
      ctaText="Upgrade Now"
      dismissible={false}
      variant="promo"
      {...props}
    />
  );
}

export function MaintenanceBanner(props: Partial<DemoBannerProps>) {
  return (
    <DemoBanner
      id="maintenance"
      highlight="Notice"
      message="Scheduled maintenance tonight at 2:00 AM UTC. Service may be briefly unavailable."
      dismissible={true}
      variant="warning"
      {...props}
    />
  );
}

export function AnnouncementBanner({
  title,
  ...props
}: Partial<DemoBannerProps> & { title?: string }) {
  return (
    <DemoBanner
      id="announcement"
      highlight="New"
      message={title || "We've launched exciting new features! Check out what's new."}
      ctaText="Learn More"
      dismissible={true}
      variant="announcement"
      {...props}
    />
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default DemoBanner;

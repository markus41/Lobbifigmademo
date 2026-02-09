/**
 * Hook to access computed Mantine styles for the current org.
 * Returns ready-to-use style objects for buttons, cards, glass panels, etc.
 */
import { useMemo } from 'react';
import { useMantineTheme } from '@mantine/core';
import { useCurrentOrg } from '../MantineThemeProvider';
import type { CSSProperties } from 'react';

export interface OrgStylePresets {
  /** Glass panel style */
  glass: CSSProperties;
  /** Card with gradient top bar */
  gradientCard: CSSProperties;
  /** Warm surface background */
  warmSurface: CSSProperties;
  /** Primary gradient button style */
  gradientButton: CSSProperties;
  /** Avatar wrapper style */
  avatarWrapper: CSSProperties;
  /** Art deco divider style */
  divider: CSSProperties;
  /** Page background */
  pageBackground: CSSProperties;
  /** Sidebar style */
  sidebar: CSSProperties;
  /** Card style based on org preference (flat, raised, outlined, glass) */
  card: CSSProperties;
  /** Button radius based on org preference */
  buttonRadius: string;
  /** Whether glass effects are enabled */
  glassEnabled: boolean;
  /** Whether gradient text is enabled */
  gradientTextEnabled: boolean;
  /** Whether animated borders are enabled */
  animatedBordersEnabled: boolean;
  /** Whether glow effects are enabled */
  glowEnabled: boolean;
}

export function useOrgStyles(): OrgStylePresets {
  const theme = useMantineTheme();
  const currentOrg = useCurrentOrg();

  return useMemo(() => {
    const other = theme.other || {};

    const glass: CSSProperties = {
      backdropFilter: `blur(${other.glassBlur || '40px'})`,
      WebkitBackdropFilter: `blur(${other.glassBlur || '40px'})`,
      background: `rgba(255, 255, 255, ${other.glassOpacity ?? 0.08})`,
      border: other.glassBorder || '1px solid rgba(255, 255, 255, 0.12)',
    };

    const gradientCard: CSSProperties = {
      background: other.gradientCard || 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF7 100%)',
      borderTop: `3px solid transparent`,
      borderImage: `${other.gradient || 'linear-gradient(135deg, #F5E6A3, #D4AF37, #8B7330)'} 1`,
      borderImageSlice: '1 1 0 0',
    };

    const warmSurface: CSSProperties = {
      backgroundColor: other.bgSurface || '#FFFDF7',
    };

    const gradientButton: CSSProperties = {
      background: other.gradientButton || 'linear-gradient(135deg, #8B7330, #D4AF37)',
      color: '#FFFFFF',
      border: 'none',
      fontWeight: 600,
    };

    const avatarWrapper: CSSProperties = {
      background: other.avatarBg || 'linear-gradient(135deg, #D4AF37, #8B7330)',
      borderRadius: '50%',
      padding: '2px',
    };

    const divider: CSSProperties = {
      height: '1px',
      background: `linear-gradient(90deg, transparent, ${other.borderColor || '#E5DCC3'}, transparent)`,
      border: 'none',
    };

    const pageBackground: CSSProperties = {
      backgroundColor: other.bgPrimary || '#FAF6E9',
      color: other.textPrimary || '#1A1A2E',
      fontFamily: theme.fontFamily || '"DM Sans", system-ui, sans-serif',
    };

    const sidebar: CSSProperties = other.glassEnabled
      ? {
          ...glass,
          width: other.sidebarWidth || '280px',
        }
      : {
          backgroundColor: other.bgSecondary || '#F5EFD9',
          borderRight: `1px solid ${other.borderColor || '#E5DCC3'}`,
          width: other.sidebarWidth || '280px',
        };

    // Card style based on org preference
    const cardStyleMap: Record<string, CSSProperties> = {
      flat: {
        backgroundColor: other.bgCard || '#FFFFFF',
        border: 'none',
        boxShadow: 'none',
      },
      raised: {
        backgroundColor: other.bgCard || '#FFFFFF',
        boxShadow: `0 4px 12px ${other.shadowColor || 'rgba(139, 110, 31, 0.10)'}`,
        border: `1px solid ${other.borderLight || '#F0EBD8'}`,
      },
      outlined: {
        backgroundColor: other.bgCard || '#FFFFFF',
        border: `1px solid ${other.borderColor || '#E5DCC3'}`,
        boxShadow: 'none',
      },
      glass: glass,
    };

    const card = cardStyleMap[other.cardStyle] || cardStyleMap.raised;

    // Button radius based on org preference
    const buttonRadiusMap: Record<string, string> = {
      rounded: '8px',
      pill: '9999px',
      sharp: '0px',
      soft: '12px',
    };

    return {
      glass,
      gradientCard,
      warmSurface,
      gradientButton,
      avatarWrapper,
      divider,
      pageBackground,
      sidebar,
      card,
      buttonRadius: buttonRadiusMap[other.buttonStyle] || '8px',
      glassEnabled: other.glassEnabled ?? false,
      gradientTextEnabled: other.hasGradientText ?? false,
      animatedBordersEnabled: other.hasAnimatedBorders ?? false,
      glowEnabled: other.hasGlowEffects ?? false,
    };
  }, [theme, currentOrg]);
}

export default useOrgStyles;

/**
 * Hook to access the current org's color palette from Mantine theme.
 * Returns primary, secondary, accent color arrays and semantic colors.
 */
import { useMemo } from 'react';
import { useMantineTheme } from '@mantine/core';
import { useCurrentOrg } from '../MantineThemeProvider';

export interface OrgColorPalette {
  /** Primary color tuple (10 shades, index 0-9) */
  primary: string[];
  /** Primary color at shade 6 (default primary) */
  primaryColor: string;
  /** Secondary color tuple (10 shades) */
  secondary: string[];
  /** Accent color tuple (10 shades) */
  accent: string[];
  /** Background colors */
  bg: {
    primary: string;
    secondary: string;
    card: string;
    surface: string;
  };
  /** Text colors */
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  /** Border colors */
  border: {
    default: string;
    light: string;
  };
  /** Shadow color (for custom shadows) */
  shadowColor: string;
}

export function useOrgColors(): OrgColorPalette {
  const theme = useMantineTheme();
  const currentOrg = useCurrentOrg();

  return useMemo(() => {
    const primaryColorName = theme.primaryColor || 'gold';
    const primaryTuple = theme.colors[primaryColorName] || [];
    const secondaryTuple = theme.colors['orgSecondary'] || [];
    const accentTuple = theme.colors['orgAccent'] || [];
    const other = theme.other || {};

    return {
      primary: [...primaryTuple],
      primaryColor: primaryTuple[6] || '#A88526',
      secondary: [...secondaryTuple],
      accent: [...accentTuple],
      bg: {
        primary: other.bgPrimary || '#FAF6E9',
        secondary: other.bgSecondary || '#F5EFD9',
        card: other.bgCard || '#FFFFFF',
        surface: other.bgSurface || '#FFFDF7',
      },
      text: {
        primary: other.textPrimary || '#1A1A2E',
        secondary: other.textSecondary || '#4A4A5A',
        muted: other.textMuted || '#7A7A8A',
      },
      border: {
        default: other.borderColor || '#E5DCC3',
        light: other.borderLight || '#F0EBD8',
      },
      shadowColor: other.shadowColor || 'rgba(139, 110, 31, 0.10)',
    };
  }, [theme, currentOrg]);
}

export default useOrgColors;

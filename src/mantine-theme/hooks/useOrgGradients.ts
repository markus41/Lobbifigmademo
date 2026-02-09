/**
 * Hook to access the current org's gradient definitions.
 * Returns brand, button, hero, card, glow, and avatar gradients.
 */
import { useMemo } from 'react';
import { useMantineTheme } from '@mantine/core';
import { useCurrentOrg } from '../MantineThemeProvider';

export interface OrgGradients {
  /** Brand gradient (used in headers, decorations) */
  brand: string;
  /** Button gradient */
  button: string;
  /** Hero section gradient */
  hero: string;
  /** Card background gradient */
  card: string;
  /** Ambient glow gradient */
  glow: string;
  /** Avatar background gradient */
  avatar: string;
}

export function useOrgGradients(): OrgGradients {
  const theme = useMantineTheme();
  const currentOrg = useCurrentOrg();

  return useMemo(() => {
    const other = theme.other || {};

    return {
      brand: other.gradient || 'linear-gradient(135deg, #F5E6A3, #D4AF37, #8B7330)',
      button: other.gradientButton || 'linear-gradient(135deg, #8B7330, #D4AF37)',
      hero: other.gradientHero || 'linear-gradient(135deg, #1A1A2E 0%, #2D2D44 50%, #D4AF37 100%)',
      card: other.gradientCard || 'linear-gradient(180deg, #FFFFFF 0%, #FFFDF7 100%)',
      glow: other.gradientGlow || 'radial-gradient(circle, rgba(212,175,55,0.15), transparent 70%)',
      avatar: other.avatarBg || 'linear-gradient(135deg, #D4AF37, #8B7330)',
    };
  }, [theme, currentOrg]);
}

export default useOrgGradients;

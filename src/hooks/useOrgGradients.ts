/**
 * Hook to access the current org's gradient configuration.
 * Returns gradients (brand, button, avatar, hero, glow) from the org theme.
 */
import { useMemo } from 'react'
import { useCurrentOrg } from '../mantine-theme/MantineThemeProvider'
import type { OrgGradients } from '../theme/types/theme.types'
import { getOrgTheme } from '../theme/orgThemeRegistry'

const defaultGradients: OrgGradients = {
  brand: 'linear-gradient(135deg, #8B7330, #D4AF37)',
  button: 'linear-gradient(135deg, #8B7330, #D4AF37)',
  avatar: 'linear-gradient(135deg, #F5E6A3, #D4AF37, #8B7330)',
  hero: 'linear-gradient(180deg, rgba(26,22,16,0.95), rgba(26,22,16,0.7))',
  glow: 'radial-gradient(circle, rgba(212,175,55,0.15), transparent 70%)',
}

export function useOrgGradients(): OrgGradients {
  const currentOrg = useCurrentOrg()

  return useMemo(() => {
    const orgTheme = getOrgTheme(currentOrg)
    if (orgTheme?.gradients) {
      return orgTheme.gradients
    }
    return defaultGradients
  }, [currentOrg])
}

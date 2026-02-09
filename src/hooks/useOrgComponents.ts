/**
 * Hook to access the current org's component style overrides.
 * Returns button, input, card, avatar, badge, tooltip styles.
 */
import { useMemo } from 'react'
import { useCurrentOrg } from '../theme/ThemeProvider.v3'
import type { OrgComponents } from '../theme/types/theme.types'
import { getOrgTheme } from '../theme/orgThemeRegistry'

export function useOrgComponents(): OrgComponents | null {
  const currentOrg = useCurrentOrg()

  return useMemo(() => {
    const orgTheme = getOrgTheme(currentOrg)
    return orgTheme?.components ?? null
  }, [currentOrg])
}

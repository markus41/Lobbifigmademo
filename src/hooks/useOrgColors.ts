/**
 * Hook to access the current org's color palette.
 * Returns the full OrgColors including primary scale, accent, surface, and sidebar.
 */
import { useMemo } from 'react'
import { useCurrentOrg } from '../theme/ThemeProvider.v3'
import type { OrgColors } from '../theme/types/theme.types'
import { getOrgTheme } from '../theme/orgThemeRegistry'

export function useOrgColors(): OrgColors | null {
  const currentOrg = useCurrentOrg()

  return useMemo(() => {
    const orgTheme = getOrgTheme(currentOrg)
    return orgTheme?.colors ?? null
  }, [currentOrg])
}

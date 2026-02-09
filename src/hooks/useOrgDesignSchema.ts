/**
 * Hook to access the current org's design schema / identity.
 * Returns the OrgIdentity (personality, era, mood) from the org theme.
 */
import { useMemo } from 'react'
import { useCurrentOrg } from '../mantine-theme/MantineThemeProvider'
import type { OrgIdentity } from '../theme/types/theme.types'
import { getOrgTheme } from '../theme/orgThemeRegistry'

const defaultIdentity: OrgIdentity = {
  personality: 'opulent',
  era: 'art-deco',
  mood: 'Gilded sophistication meets warm intimacy',
}

export function useOrgDesignSchema(): OrgIdentity {
  const currentOrg = useCurrentOrg()

  return useMemo(() => {
    const orgTheme = getOrgTheme(currentOrg)
    if (orgTheme?.identity) {
      return orgTheme.identity
    }
    return defaultIdentity
  }, [currentOrg])
}

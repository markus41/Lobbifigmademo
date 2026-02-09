/**
 * Org Theme Registry
 *
 * Central registry of org themes loaded from JSON files.
 * Hooks and utilities should import from here instead of
 * duplicating JSON imports.
 */
import type { OrgTheme, OrgId } from './types/theme.types'

import luxeHavenTheme from './orgs/luxe-haven.json'
import pacificClubTheme from './orgs/pacific-club.json'
import summitGroupTheme from './orgs/summit-group.json'
import verdeCollectiveTheme from './orgs/verde-collective.json'
import crownEstatesTheme from './orgs/crown-estates.json'

export const orgThemeRegistry: Partial<Record<OrgId, OrgTheme>> = {
  'luxe-haven': luxeHavenTheme as unknown as OrgTheme,
  'pacific-club': pacificClubTheme as unknown as OrgTheme,
  'summit-group': summitGroupTheme as unknown as OrgTheme,
  'verde-collective': verdeCollectiveTheme as unknown as OrgTheme,
  'crown-estates': crownEstatesTheme as unknown as OrgTheme,
}

/**
 * Get the comprehensive org theme for a given org ID.
 * Returns undefined if the org has no registered theme JSON.
 */
export function getOrgTheme(orgId: OrgId | string): OrgTheme | undefined {
  return orgThemeRegistry[orgId as OrgId]
}

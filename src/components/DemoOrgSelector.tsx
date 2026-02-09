/**
 * DemoOrgSelector - Interactive org switcher for the demo app.
 *
 * Features:
 * - Grid display of all 20 organizations
 * - Color-coded org indicators
 * - URL param sync (?org=luxe-haven)
 * - Dark/light mode toggle
 * - Current org highlight
 */
import { useEffect, useCallback } from 'react'
import { Box, Flex, Text, SimpleGrid, UnstyledButton } from '@mantine/core'
import {
  useOrgTheme,
  useThemeMode,
  ORG_NAMES,
  AVAILABLE_ORGS,
  type OrgId,
} from '../mantine-theme/MantineThemeProvider'
import { orgPrimaryColors } from '../lib/org-colors'

/**
 * Reads org from URL search params
 */
function getOrgFromUrl(): OrgId | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const org = params.get('org')
  if (org && AVAILABLE_ORGS.includes(org as OrgId)) {
    return org as OrgId
  }
  return null
}

/**
 * Updates URL search param without page reload
 */
function setOrgInUrl(orgId: OrgId): void {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.searchParams.set('org', orgId)
  window.history.replaceState({}, '', url.toString())
}

interface DemoOrgSelectorProps {
  /** Show compact mode (smaller cards) */
  compact?: boolean
  /** Show dark mode toggle */
  showModeToggle?: boolean
  /** Number of columns in grid */
  columns?: number
}

export function DemoOrgSelector({
  compact = false,
  showModeToggle = true,
  columns = 4,
}: DemoOrgSelectorProps) {
  const { currentOrg, setOrg } = useOrgTheme()
  const { mode: _mode, setMode, resolvedMode } = useThemeMode()
  void _mode;

  // Sync org from URL on mount
  useEffect(() => {
    const urlOrg = getOrgFromUrl()
    if (urlOrg && urlOrg !== currentOrg) {
      setOrg(urlOrg)
    }
  }, [])

  // Handle org selection
  const handleSelectOrg = useCallback(
    (orgId: OrgId) => {
      setOrg(orgId)
      setOrgInUrl(orgId)
    },
    [setOrg]
  )

  // Toggle dark/light
  const toggleMode = useCallback(() => {
    setMode(resolvedMode === 'dark' ? 'light' : 'dark')
  }, [resolvedMode, setMode])

  const cardSize = compact ? '80px' : '110px'
  const fontSize = compact ? 'xs' : 'sm'

  return (
    <Box p={compact ? 'sm' : 'lg'}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb="md">
        <Box>
          <Text fz="lg" fw={700}>
            Organization Theme
          </Text>
          <Text fz="sm" c="dimmed">
            Select an org to preview its theme
          </Text>
        </Box>

        {showModeToggle && (
          <UnstyledButton
            onClick={toggleMode}
            px="md"
            py="xs"
            style={{
              borderRadius: 'var(--mantine-radius-md)',
              backgroundColor: 'var(--mantine-color-gray-1)',
              fontSize: 'var(--mantine-font-size-sm)',
              fontWeight: 500,
              transition: 'all 0.2s',
            }}
          >
            {resolvedMode === 'dark' ? 'Light' : 'Dark'}
          </UnstyledButton>
        )}
      </Flex>

      {/* Current org display */}
      <Flex
        align="center"
        gap="sm"
        mb="md"
        p="sm"
        style={{
          borderRadius: 'var(--mantine-radius-md)',
          border: '1px solid var(--mantine-color-gray-3)',
          backgroundColor: 'var(--mantine-color-gray-0)',
        }}
      >
        <Box
          w={32}
          h={32}
          style={{
            borderRadius: 'var(--mantine-radius-md)',
            backgroundColor: orgPrimaryColors[currentOrg],
            flexShrink: 0,
          }}
        />
        <Box>
          <Text fz="sm" fw={700}>
            {ORG_NAMES[currentOrg]}
          </Text>
          <Text fz="xs" c="dimmed">
            {currentOrg}
          </Text>
        </Box>
      </Flex>

      {/* Org Grid */}
      <SimpleGrid
        cols={columns}
        spacing={compact ? 'xs' : 'sm'}
      >
        {AVAILABLE_ORGS.map((orgId) => {
          const isActive = orgId === currentOrg
          const color = orgPrimaryColors[orgId]

          return (
            <UnstyledButton
              key={orgId}
              onClick={() => handleSelectOrg(orgId)}
              p={compact ? 'xs' : 'sm'}
              style={{
                borderRadius: 'var(--mantine-radius-md)',
                backgroundColor: isActive ? `${color}10` : 'var(--mantine-color-gray-0)',
                border: `2px solid ${isActive ? color : 'var(--mantine-color-gray-3)'}`,
                textAlign: 'center',
                minHeight: cardSize,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--mantine-spacing-xs)',
                transition: 'all 0.2s',
              }}
            >
              {/* Color indicator */}
              <Box
                w={compact ? 20 : 28}
                h={compact ? 20 : 28}
                style={{
                  borderRadius: '50%',
                  backgroundColor: color,
                  boxShadow: isActive ? `0 0 12px ${color}60` : 'none',
                  transition: 'all 0.2s',
                }}
              />
              {/* Org name */}
              <Text
                fz={fontSize}
                fw={isActive ? 700 : 500}
                c={isActive ? undefined : 'dimmed'}
                lineClamp={2}
              >
                {ORG_NAMES[orgId]}
              </Text>
            </UnstyledButton>
          )
        })}
      </SimpleGrid>
    </Box>
  )
}

export default DemoOrgSelector

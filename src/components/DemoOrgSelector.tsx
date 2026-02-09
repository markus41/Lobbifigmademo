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
import { Box, Flex, Text, Grid } from '@chakra-ui/react'
import {
  useOrgTheme,
  useThemeMode,
  ORG_NAMES,
  AVAILABLE_ORGS,
  type OrgId,
} from '../theme/ThemeProvider.v3'
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
    <Box p={compact ? 3 : 5}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={4}>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="text.primary">
            Organization Theme
          </Text>
          <Text fontSize="sm" color="text.muted">
            Select an org to preview its theme
          </Text>
        </Box>

        {showModeToggle && (
          <Box
            as="button"
            onClick={toggleMode}
            px={4}
            py={2}
            borderRadius="lg"
            bg="bg.subtle"
            color="text.primary"
            fontSize="sm"
            fontWeight="medium"
            cursor="pointer"
            _hover={{ bg: 'bg.muted' }}
            transition="all 0.2s"
          >
            {resolvedMode === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </Box>
        )}
      </Flex>

      {/* Current org display */}
      <Flex
        align="center"
        gap={3}
        mb={4}
        p={3}
        borderRadius="lg"
        bg="bg.surface"
        borderWidth="1px"
        borderColor="border.accent"
      >
        <Box
          w="32px"
          h="32px"
          borderRadius="lg"
          bg={orgPrimaryColors[currentOrg]}
          flexShrink={0}
        />
        <Box>
          <Text fontSize="sm" fontWeight="bold" color="text.primary">
            {ORG_NAMES[currentOrg]}
          </Text>
          <Text fontSize="xs" color="text.muted">
            {currentOrg}
          </Text>
        </Box>
      </Flex>

      {/* Org Grid */}
      <Grid
        templateColumns={`repeat(${columns}, 1fr)`}
        gap={compact ? 2 : 3}
      >
        {AVAILABLE_ORGS.map((orgId) => {
          const isActive = orgId === currentOrg
          const color = orgPrimaryColors[orgId]

          return (
            <Box
              key={orgId}
              as="button"
              onClick={() => handleSelectOrg(orgId)}
              p={compact ? 2 : 3}
              borderRadius="lg"
              bg={isActive ? 'bg.brandSubtle' : 'bg.surface'}
              borderWidth="2px"
              borderColor={isActive ? color : 'border.subtle'}
              cursor="pointer"
              transition="all 0.2s"
              _hover={{
                borderColor: color,
                transform: 'translateY(-1px)',
                shadow: 'md',
              }}
              textAlign="center"
              minH={cardSize}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              {/* Color indicator */}
              <Box
                w={compact ? '20px' : '28px'}
                h={compact ? '20px' : '28px'}
                borderRadius="full"
                bg={color}
                shadow={isActive ? `0 0 12px ${color}60` : 'none'}
                transition="all 0.2s"
              />
              {/* Org name */}
              <Text
                fontSize={fontSize}
                fontWeight={isActive ? 'bold' : 'medium'}
                color={isActive ? 'text.brand' : 'text.secondary'}
                lineClamp={2}
              >
                {ORG_NAMES[orgId]}
              </Text>
            </Box>
          )
        })}
      </Grid>
    </Box>
  )
}

export default DemoOrgSelector

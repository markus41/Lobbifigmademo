
import { Box, Flex, Text, SimpleGrid, Badge } from "@mantine/core";
import { motion } from "motion/react";
import { SPRINT_PHASES, type SprintPhase } from "../PlatformDemoBanner";

interface AllPhasesOverviewProps {
  onSelectPhase?: (phase: SprintPhase) => void;
}

export function AllPhasesOverview({ onSelectPhase }: AllPhasesOverviewProps) {
  const totalComponents = SPRINT_PHASES.slice(1).reduce((s, p) => s + p.componentCount, 0);

  return (
    <Box p="xl">
      <Flex justify="space-between" align="center" mb="xl">
        <Box>
          <Text fz="xl" fw={700}>
            All Phases Overview
          </Text>
          <Text fz="sm" c="dimmed">
            Complete Lobbi platform build plan — {totalComponents} components across{" "}
            {SPRINT_PHASES.length - 1} sprints
          </Text>
        </Box>
        <Badge color="violet" variant="filled" size="lg" radius="xl">
          {totalComponents} Total
        </Badge>
      </Flex>

      {/* Progress bar */}
      <Box mb="xl">
        <Flex gap={1} h={8} style={{ borderRadius: '9999px', overflow: 'hidden' }}>
          {SPRINT_PHASES.slice(1).map((phase) => (
            <Box
              key={phase.id}
              style={{
                flex: phase.componentCount,
                backgroundColor: phase.color,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              title={`${phase.label} (${phase.componentCount})`}
              onClick={() => onSelectPhase?.(phase.id)}
            />
          ))}
        </Flex>
        <Flex justify="space-between" mt={4}>
          <Text fz="xs" c="dimmed">Sprint 0</Text>
          <Text fz="xs" c="dimmed">Sprint 10</Text>
        </Flex>
      </Box>

      {/* Sprint cards grid */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {SPRINT_PHASES.slice(1).map((phase, i) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Box
              p="md"
              style={{
                borderRadius: 'var(--mantine-radius-lg)',
                border: '1px solid var(--mantine-color-gray-3)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
                overflow: 'hidden',
              }}
              onClick={() => onSelectPhase?.(phase.id)}
            >
              {/* Color accent */}
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  backgroundColor: phase.color,
                }}
              />

              <Flex justify="space-between" align="flex-start" mt={4}>
                <Box>
                  <Flex align="center" gap="xs" mb={4}>
                    <Box w={8} h={8} style={{ borderRadius: '50%', backgroundColor: phase.color }} />
                    <Text fz="sm" fw={700}>
                      {phase.shortLabel}
                    </Text>
                  </Flex>
                  <Text fz="md" fw={600} mb={4}>
                    {phase.label.split(": ")[1] || phase.label}
                  </Text>
                  <Text fz="xs" c="dimmed" lineClamp={2}>
                    {phase.description}
                  </Text>
                </Box>
                <Badge
                  variant="light"
                  style={{
                    backgroundColor: `${phase.color}15`,
                    color: phase.color,
                  }}
                  size="lg"
                  radius="md"
                  fw={700}
                >
                  {phase.componentCount}
                </Badge>
              </Flex>

              <Flex mt="sm" align="center" gap="xs">
                <Text fz="xs" c="dimmed">
                  Components {phase.componentRange}
                </Text>
              </Flex>
            </Box>
          </motion.div>
        ))}
      </SimpleGrid>

      {/* Build priority order */}
      <Box mt="xl" p="md" bg="gray.0" style={{ borderRadius: 'var(--mantine-radius-lg)' }}>
        <Text fz="sm" fw={600} mb="sm">
          Build Priority Order
        </Text>
        <Flex gap="xs" wrap="wrap">
          {SPRINT_PHASES.slice(1).map((phase, i) => (
            <Flex key={phase.id} align="center" gap={4}>
              <Box w={6} h={6} style={{ borderRadius: '50%', backgroundColor: phase.color }} />
              <Text fz="xs" c="dimmed">
                {phase.shortLabel}
              </Text>
              {i < SPRINT_PHASES.length - 2 && (
                <Text fz="xs" c="dimmed" mx={4}>
                  {'\u2192'}
                </Text>
              )}
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

export default AllPhasesOverview;

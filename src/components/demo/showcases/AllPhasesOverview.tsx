
import { Box, Flex, Text, SimpleGrid, Badge } from "@chakra-ui/react";
import { motion } from "motion/react";
import { SPRINT_PHASES, type SprintPhase } from "../PlatformDemoBanner";

interface AllPhasesOverviewProps {
  onSelectPhase?: (phase: SprintPhase) => void;
}

export function AllPhasesOverview({ onSelectPhase }: AllPhasesOverviewProps) {
  const totalComponents = SPRINT_PHASES.slice(1).reduce((s, p) => s + p.componentCount, 0);

  return (
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            All Phases Overview
          </Text>
          <Text fontSize="sm" color="gray.500">
            Complete Lobbi platform build plan — {totalComponents} components across{" "}
            {SPRINT_PHASES.length - 1} sprints
          </Text>
        </Box>
        <Badge bg="#8b5cf6" color="white" px={3} py={1} borderRadius="full" fontSize="sm">
          {totalComponents} Total
        </Badge>
      </Flex>

      {/* Progress bar */}
      <Box mb={6}>
        <Flex gap={1} h="8px" borderRadius="full" overflow="hidden">
          {SPRINT_PHASES.slice(1).map((phase) => (
            <Box
              key={phase.id}
              flex={phase.componentCount}
              bg={phase.color}
              cursor="pointer"
              _hover={{ opacity: 0.8, transform: "scaleY(1.5)" }}
              transition="all 0.2s"
              title={`${phase.label} (${phase.componentCount})`}
              onClick={() => onSelectPhase?.(phase.id)}
            />
          ))}
        </Flex>
        <Flex justifyContent="space-between" mt={1}>
          <Text fontSize="2xs" color="gray.400">Sprint 0</Text>
          <Text fontSize="2xs" color="gray.400">Sprint 10</Text>
        </Flex>
      </Box>

      {/* Sprint cards grid */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
        {SPRINT_PHASES.slice(1).map((phase, i) => (
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Box
              p={4}
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
              cursor="pointer"
              _hover={{
                borderColor: phase.color,
                boxShadow: `0 4px 20px ${phase.color}20`,
                transform: "translateY(-2px)",
              }}
              transition="all 0.2s"
              position="relative"
              overflow="hidden"
              onClick={() => onSelectPhase?.(phase.id)}
            >
              {/* Color accent */}
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                h="3px"
                bg={phase.color}
              />

              <Flex justifyContent="space-between" alignItems="flex-start" mt={1}>
                <Box>
                  <Flex alignItems="center" gap={2} mb={1}>
                    <Box w="8px" h="8px" borderRadius="full" bg={phase.color} />
                    <Text fontSize="sm" fontWeight="bold">
                      {phase.shortLabel}
                    </Text>
                  </Flex>
                  <Text fontSize="md" fontWeight="semibold" mb={1}>
                    {phase.label.split(": ")[1] || phase.label}
                  </Text>
                  <Text fontSize="xs" color="gray.500" lineClamp={2}>
                    {phase.description}
                  </Text>
                </Box>
                <Badge
                  bg={`${phase.color}15`}
                  color={phase.color}
                  fontSize="sm"
                  px={2}
                  py={1}
                  borderRadius="lg"
                  fontWeight="bold"
                >
                  {phase.componentCount}
                </Badge>
              </Flex>

              <Flex mt={3} alignItems="center" gap={2}>
                <Text fontSize="2xs" color="gray.400">
                  Components {phase.componentRange}
                </Text>
              </Flex>
            </Box>
          </motion.div>
        ))}
      </SimpleGrid>

      {/* Build priority order */}
      <Box mt={8} p={4} bg="gray.50" borderRadius="xl">
        <Text fontSize="sm" fontWeight="semibold" mb={3}>
          Build Priority Order
        </Text>
        <Flex gap={2} flexWrap="wrap">
          {SPRINT_PHASES.slice(1).map((phase, i) => (
            <Flex key={phase.id} alignItems="center" gap={1}>
              <Box w="6px" h="6px" borderRadius="full" bg={phase.color} />
              <Text fontSize="xs" color="gray.600">
                {phase.shortLabel}
              </Text>
              {i < SPRINT_PHASES.length - 2 && (
                <Text fontSize="xs" color="gray.300" mx={1}>
                  →
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

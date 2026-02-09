
import { Box, Flex, Text, Badge, SimpleGrid } from "@chakra-ui/react";
import { motion } from "motion/react";

const COMPONENTS = [
  { id: 72, name: "MembersPage", status: "planned" },
  { id: 73, name: "MemberTable", status: "planned" },
  { id: 74, name: "MemberDetailDrawer", status: "planned" },
  { id: 75, name: "MemberProfileCard", status: "planned" },
  { id: 76, name: "MemberForm", status: "planned" },
  { id: 77, name: "MemberImportWizard", status: "planned" },
  { id: 78, name: "MemberExportDialog", status: "planned" },
  { id: 79, name: "MemberFilters", status: "planned" },
  { id: 80, name: "MemberSearchBar", status: "planned" },
  { id: 81, name: "MemberBulkActions", status: "planned" },
  { id: 82, name: "MemberStatusBadge", status: "planned" },
  { id: 83, name: "MemberAvatar", status: "planned" },
  { id: 84, name: "MemberNotes", status: "planned" },
  { id: 85, name: "MemberTimeline", status: "planned" },
  { id: 86, name: "MembershipTypeCard", status: "planned" },
  { id: 87, name: "MembershipTierSelector", status: "planned" },
  { id: 88, name: "MemberRenewalAlert", status: "planned" },
  { id: 89, name: "MemberEngagementScore", status: "planned" },
  { id: 90, name: "MemberTagManager", status: "planned" },
];

const STATUS_COLORS: Record<string, string> = { done: "#10b981", "in-progress": "#f59e0b", planned: "#6b7280" };

export function Sprint3Showcase() {
  return (
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">Sprint 3: Members</Text>
          <Text fontSize="sm" color="gray.500">Member management, profiles, import/export</Text>
        </Box>
        <Badge bg="#10b981" color="white" px={3} py={1} borderRadius="full" fontSize="sm">0/{COMPONENTS.length} Complete</Badge>
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
        {COMPONENTS.map((comp, i) => (
          <motion.div key={comp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Flex p={3} borderRadius="lg" border="1px solid" borderColor="gray.200" alignItems="center" gap={2} _hover={{ borderColor: "#10b981", bg: "gray.50" }} transition="all 0.15s">
              <Box w="8px" h="8px" borderRadius="full" bg={STATUS_COLORS[comp.status]} flexShrink={0} />
              <Box flex={1}><Text fontSize="sm" fontWeight="medium">{comp.name}</Text><Text fontSize="2xs" color="gray.400">#{comp.id}</Text></Box>
            </Flex>
          </motion.div>
        ))}
      </SimpleGrid>
    </Box>
  );
}
export default Sprint3Showcase;

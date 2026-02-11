
import { Box, Flex, Text, Badge, SimpleGrid } from "@mantine/core";
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

const STATUS_COLORS: Record<string, string> = {
  done: 'var(--success, #059669)',
  'in-progress': 'var(--warning, #D97706)',
  planned: 'var(--theme-text-muted, #6b7280)',
};

export function Sprint3Showcase() {
  return (
    <Box p="xl">
      <Flex justify="space-between" align="center" mb="xl">
        <Box>
          <Text fz="xl" fw={700}>Sprint 3: Members</Text>
          <Text fz="sm" c="dimmed">Member management, profiles, import/export</Text>
        </Box>
        <Badge color="green" variant="filled" size="lg" radius="xl">0/{COMPONENTS.length} Complete</Badge>
      </Flex>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm">
        {COMPONENTS.map((comp, i) => (
          <motion.div key={comp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Flex
              p="sm"
              style={{ borderRadius: 'var(--mantine-radius-md)', border: '1px solid var(--mantine-color-gray-3)', cursor: 'default', transition: 'all 0.15s' }}
              align="center"
              gap="xs"
            >
              <Box w={8} h={8} style={{ borderRadius: '50%', backgroundColor: STATUS_COLORS[comp.status], flexShrink: 0 }} />
              <Box style={{ flex: 1 }}><Text fz="sm" fw={500}>{comp.name}</Text><Text fz="xs" c="dimmed">#{comp.id}</Text></Box>
            </Flex>
          </motion.div>
        ))}
      </SimpleGrid>
    </Box>
  );
}
export default Sprint3Showcase;

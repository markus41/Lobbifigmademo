
import { Box, Flex, Text, Badge, SimpleGrid } from "@mantine/core";
import { motion } from "motion/react";

const COMPONENTS = [
  { id: 139, name: "MemberPortalLayout", status: "planned" },
  { id: 140, name: "MemberPortalNav", status: "planned" },
  { id: 141, name: "MemberDashboard", status: "planned" },
  { id: 142, name: "MemberProfileEditor", status: "planned" },
  { id: 143, name: "MemberEventsView", status: "planned" },
  { id: 144, name: "MemberPaymentsView", status: "planned" },
  { id: 145, name: "MemberDocuments", status: "planned" },
  { id: 146, name: "MemberDirectory", status: "planned" },
  { id: 147, name: "MemberBenefits", status: "planned" },
  { id: 148, name: "MemberRenewal", status: "planned" },
  { id: 149, name: "MemberSupport", status: "planned" },
  { id: 150, name: "MemberFeedback", status: "planned" },
];

const STATUS_COLORS: Record<string, string> = {
  done: 'var(--success, #059669)',
  'in-progress': 'var(--warning, #D97706)',
  planned: 'var(--theme-text-muted, #6b7280)',
};

export function Sprint8Showcase() {
  return (
    <Box p="xl">
      <Flex justify="space-between" align="center" mb="xl">
        <Box>
          <Text fz="xl" fw={700}>Sprint 8: Member Portal</Text>
          <Text fz="sm" c="dimmed">Public member portal, self-service features</Text>
        </Box>
        <Badge color="teal" variant="filled" size="lg" radius="xl">0/{COMPONENTS.length} Complete</Badge>
      </Flex>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm">
        {COMPONENTS.map((comp, i) => (
          <motion.div key={comp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
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
export default Sprint8Showcase;

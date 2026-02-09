
import { Box, Flex, Text, Badge, SimpleGrid } from "@mantine/core";
import { motion } from "motion/react";

const COMPONENTS = [
  { id: 60, name: "DashboardPage", status: "planned" },
  { id: 61, name: "StatCard", status: "planned" },
  { id: 62, name: "StatGrid", status: "planned" },
  { id: 63, name: "RecentActivityFeed", status: "planned" },
  { id: 64, name: "QuickActions", status: "planned" },
  { id: 65, name: "MembershipGrowthChart", status: "planned" },
  { id: 66, name: "RevenueChart", status: "planned" },
  { id: 67, name: "EventCalendarWidget", status: "planned" },
  { id: 68, name: "TaskList", status: "planned" },
  { id: 69, name: "AnnouncementBanner", status: "planned" },
  { id: 70, name: "NotificationBell", status: "planned" },
  { id: 71, name: "ChartContainer", status: "planned" },
];

const STATUS_COLORS: Record<string, string> = { done: "#10b981", "in-progress": "#f59e0b", planned: "#6b7280" };

export function Sprint2Showcase() {
  return (
    <Box p="xl">
      <Flex justify="space-between" align="center" mb="xl">
        <Box>
          <Text fz="xl" fw={700}>Sprint 2: Dashboard</Text>
          <Text fz="sm" c="dimmed">Dashboard widgets, analytics, activity feeds</Text>
        </Box>
        <Badge color="cyan" variant="filled" size="lg" radius="xl">0/{COMPONENTS.length} Complete</Badge>
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
export default Sprint2Showcase;

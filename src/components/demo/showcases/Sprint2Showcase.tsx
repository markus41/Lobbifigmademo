
import { Box, Flex, Text, Badge, SimpleGrid } from "@chakra-ui/react";
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
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">Sprint 2: Dashboard</Text>
          <Text fontSize="sm" color="gray.500">Dashboard widgets, analytics, activity feeds</Text>
        </Box>
        <Badge bg="#06b6d4" color="white" px={3} py={1} borderRadius="full" fontSize="sm">0/{COMPONENTS.length} Complete</Badge>
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
        {COMPONENTS.map((comp, i) => (
          <motion.div key={comp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Flex p={3} borderRadius="lg" border="1px solid" borderColor="gray.200" alignItems="center" gap={2} _hover={{ borderColor: "#06b6d4", bg: "gray.50" }} transition="all 0.15s">
              <Box w="8px" h="8px" borderRadius="full" bg={STATUS_COLORS[comp.status]} flexShrink={0} />
              <Box flex={1}><Text fontSize="sm" fontWeight="medium">{comp.name}</Text><Text fontSize="2xs" color="gray.400">#{comp.id}</Text></Box>
            </Flex>
          </motion.div>
        ))}
      </SimpleGrid>
    </Box>
  );
}
export default Sprint2Showcase;

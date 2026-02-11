
import { Box, Flex, Text, Badge, SimpleGrid } from "@mantine/core";
import { motion } from "motion/react";

const COMPONENTS = [
  { id: 91, name: "EventsPage", status: "planned" },
  { id: 92, name: "EventCalendar", status: "planned" },
  { id: 93, name: "EventCard", status: "planned" },
  { id: 94, name: "EventDetailModal", status: "planned" },
  { id: 95, name: "EventForm", status: "planned" },
  { id: 96, name: "EventRSVPButton", status: "planned" },
  { id: 97, name: "EventAttendeeList", status: "planned" },
  { id: 98, name: "EventCategories", status: "planned" },
  { id: 99, name: "EventFilters", status: "planned" },
  { id: 100, name: "EventReminder", status: "planned" },
  { id: 101, name: "EventRecurrence", status: "planned" },
  { id: 102, name: "EventLocationMap", status: "planned" },
  { id: 103, name: "EventTicketing", status: "planned" },
  { id: 104, name: "EventAnalyticsSummary", status: "planned" },
];

const STATUS_COLORS: Record<string, string> = {
  done: 'var(--success, #059669)',
  'in-progress': 'var(--warning, #D97706)',
  planned: 'var(--theme-text-muted, #6b7280)',
};

export function Sprint4Showcase() {
  return (
    <Box p="xl">
      <Flex justify="space-between" align="center" mb="xl">
        <Box>
          <Text fz="xl" fw={700}>Sprint 4: Events</Text>
          <Text fz="sm" c="dimmed">Events calendar, RSVP, ticketing, analytics</Text>
        </Box>
        <Badge color="yellow" variant="filled" size="lg" radius="xl">0/{COMPONENTS.length} Complete</Badge>
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
export default Sprint4Showcase;

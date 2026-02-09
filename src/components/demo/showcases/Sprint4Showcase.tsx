
import { Box, Flex, Text, Badge, SimpleGrid } from "@chakra-ui/react";
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

const STATUS_COLORS: Record<string, string> = { done: "#10b981", "in-progress": "#f59e0b", planned: "#6b7280" };

export function Sprint4Showcase() {
  return (
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">Sprint 4: Events</Text>
          <Text fontSize="sm" color="gray.500">Events calendar, RSVP, ticketing, analytics</Text>
        </Box>
        <Badge bg="#f59e0b" color="white" px={3} py={1} borderRadius="full" fontSize="sm">0/{COMPONENTS.length} Complete</Badge>
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
        {COMPONENTS.map((comp, i) => (
          <motion.div key={comp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Flex p={3} borderRadius="lg" border="1px solid" borderColor="gray.200" alignItems="center" gap={2} _hover={{ borderColor: "#f59e0b", bg: "gray.50" }} transition="all 0.15s">
              <Box w="8px" h="8px" borderRadius="full" bg={STATUS_COLORS[comp.status]} flexShrink={0} />
              <Box flex={1}><Text fontSize="sm" fontWeight="medium">{comp.name}</Text><Text fontSize="2xs" color="gray.400">#{comp.id}</Text></Box>
            </Flex>
          </motion.div>
        ))}
      </SimpleGrid>
    </Box>
  );
}
export default Sprint4Showcase;

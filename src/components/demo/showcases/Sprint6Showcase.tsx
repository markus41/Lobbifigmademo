
import { Box, Flex, Text, Badge, SimpleGrid } from "@chakra-ui/react";
import { motion } from "motion/react";

const COMPONENTS = [
  { id: 116, name: "NotificationsPage", status: "planned" },
  { id: 117, name: "NotificationList", status: "planned" },
  { id: 118, name: "NotificationPreferences", status: "planned" },
  { id: 119, name: "EmailTemplateEditor", status: "planned" },
  { id: 120, name: "EmailPreview", status: "planned" },
  { id: 121, name: "BulkEmailDialog", status: "planned" },
  { id: 122, name: "CommunicationLog", status: "planned" },
  { id: 123, name: "PushNotificationSetup", status: "planned" },
  { id: 124, name: "SMSComposer", status: "planned" },
];

const STATUS_COLORS: Record<string, string> = { done: "#10b981", "in-progress": "#f59e0b", planned: "#6b7280" };

export function Sprint6Showcase() {
  return (
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">Sprint 6: Communications</Text>
          <Text fontSize="sm" color="gray.500">Notifications, email templates, SMS</Text>
        </Box>
        <Badge bg="#ec4899" color="white" px={3} py={1} borderRadius="full" fontSize="sm">0/{COMPONENTS.length} Complete</Badge>
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
        {COMPONENTS.map((comp, i) => (
          <motion.div key={comp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Flex p={3} borderRadius="lg" border="1px solid" borderColor="gray.200" alignItems="center" gap={2} _hover={{ borderColor: "#ec4899", bg: "gray.50" }} transition="all 0.15s">
              <Box w="8px" h="8px" borderRadius="full" bg={STATUS_COLORS[comp.status]} flexShrink={0} />
              <Box flex={1}><Text fontSize="sm" fontWeight="medium">{comp.name}</Text><Text fontSize="2xs" color="gray.400">#{comp.id}</Text></Box>
            </Flex>
          </motion.div>
        ))}
      </SimpleGrid>
    </Box>
  );
}
export default Sprint6Showcase;

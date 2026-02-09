
import { Box, Flex, Text, Badge, SimpleGrid } from "@mantine/core";
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
    <Box p="xl">
      <Flex justify="space-between" align="center" mb="xl">
        <Box>
          <Text fz="xl" fw={700}>Sprint 6: Communications</Text>
          <Text fz="sm" c="dimmed">Notifications, email templates, SMS</Text>
        </Box>
        <Badge color="pink" variant="filled" size="lg" radius="xl">0/{COMPONENTS.length} Complete</Badge>
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
export default Sprint6Showcase;

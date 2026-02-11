
import { Box, Flex, Text, Badge, SimpleGrid } from "@mantine/core";
import { motion } from "motion/react";

const COMPONENTS = [
  { id: 125, name: "SettingsPage", status: "planned" },
  { id: 126, name: "OrgProfileForm", status: "planned" },
  { id: 127, name: "BrandingPanel", status: "planned" },
  { id: 128, name: "ColorPicker", status: "planned" },
  { id: 129, name: "LogoUploader", status: "planned" },
  { id: 130, name: "DomainSettings", status: "planned" },
  { id: 131, name: "UserManagement", status: "planned" },
  { id: 132, name: "RoleEditor", status: "planned" },
  { id: 133, name: "PermissionMatrix", status: "planned" },
  { id: 134, name: "IntegrationPanel", status: "planned" },
  { id: 135, name: "WebhookManager", status: "planned" },
  { id: 136, name: "APIKeyManager", status: "planned" },
  { id: 137, name: "AuditLog", status: "planned" },
  { id: 138, name: "DataExportSettings", status: "planned" },
];

const STATUS_COLORS: Record<string, string> = {
  done: 'var(--success, #059669)',
  'in-progress': 'var(--warning, #D97706)',
  planned: 'var(--theme-text-muted, #6b7280)',
};

export function Sprint7Showcase() {
  return (
    <Box p="xl">
      <Flex justify="space-between" align="center" mb="xl">
        <Box>
          <Text fz="xl" fw={700}>Sprint 7: Settings</Text>
          <Text fz="sm" c="dimmed">Organization settings, branding, API keys</Text>
        </Box>
        <Badge color="violet" variant="filled" size="lg" radius="xl">0/{COMPONENTS.length} Complete</Badge>
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
export default Sprint7Showcase;

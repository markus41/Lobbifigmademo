
import { Box, Flex, Text, Badge, SimpleGrid } from "@mantine/core";
import { motion } from "motion/react";

const COMPONENTS = [
  { id: 46, name: "AppShell", status: "planned" },
  { id: 47, name: "Sidebar", status: "planned" },
  { id: 48, name: "TopNav", status: "planned" },
  { id: 49, name: "Breadcrumbs", status: "planned" },
  { id: 50, name: "PageHeader", status: "planned" },
  { id: 51, name: "Footer", status: "planned" },
  { id: 52, name: "LoginPage", status: "planned" },
  { id: 53, name: "RegisterPage", status: "planned" },
  { id: 54, name: "ForgotPasswordPage", status: "planned" },
  { id: 55, name: "AuthGuard", status: "planned" },
  { id: 56, name: "RoleGuard", status: "planned" },
  { id: 57, name: "OrgGuard", status: "planned" },
  { id: 58, name: "SessionTimer", status: "planned" },
  { id: 59, name: "SessionExpiredModal", status: "planned" },
];

const STATUS_COLORS: Record<string, string> = { done: "#10b981", "in-progress": "#f59e0b", planned: "#6b7280" };

export function Sprint1Showcase() {
  return (
    <Box p="xl">
      <Flex justify="space-between" align="center" mb="xl">
        <Box>
          <Text fz="xl" fw={700}>Sprint 1: Layouts & Auth</Text>
          <Text fz="sm" c="dimmed">App shell, navigation, authentication flows</Text>
        </Box>
        <Badge color="blue" variant="filled" size="lg" radius="xl">
          0/{COMPONENTS.length} Complete
        </Badge>
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
export default Sprint1Showcase;

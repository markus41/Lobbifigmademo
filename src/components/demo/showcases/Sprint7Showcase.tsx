
import { Box, Flex, Text, Badge, SimpleGrid } from "@chakra-ui/react";
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

const STATUS_COLORS: Record<string, string> = { done: "#10b981", "in-progress": "#f59e0b", planned: "#6b7280" };

export function Sprint7Showcase() {
  return (
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">Sprint 7: Settings</Text>
          <Text fontSize="sm" color="gray.500">Organization settings, branding, API keys</Text>
        </Box>
        <Badge bg="#8b5cf6" color="white" px={3} py={1} borderRadius="full" fontSize="sm">0/{COMPONENTS.length} Complete</Badge>
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
        {COMPONENTS.map((comp, i) => (
          <motion.div key={comp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Flex p={3} borderRadius="lg" border="1px solid" borderColor="gray.200" alignItems="center" gap={2} _hover={{ borderColor: "#8b5cf6", bg: "gray.50" }} transition="all 0.15s">
              <Box w="8px" h="8px" borderRadius="full" bg={STATUS_COLORS[comp.status]} flexShrink={0} />
              <Box flex={1}><Text fontSize="sm" fontWeight="medium">{comp.name}</Text><Text fontSize="2xs" color="gray.400">#{comp.id}</Text></Box>
            </Flex>
          </motion.div>
        ))}
      </SimpleGrid>
    </Box>
  );
}
export default Sprint7Showcase;

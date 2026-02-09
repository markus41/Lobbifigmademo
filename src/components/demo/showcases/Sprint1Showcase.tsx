
import { Box, Flex, Text, Badge, SimpleGrid } from "@chakra-ui/react";
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
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">Sprint 1: Layouts & Auth</Text>
          <Text fontSize="sm" color="gray.500">App shell, navigation, authentication flows</Text>
        </Box>
        <Badge bg="#3b82f6" color="white" px={3} py={1} borderRadius="full" fontSize="sm">
          0/{COMPONENTS.length} Complete
        </Badge>
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
        {COMPONENTS.map((comp, i) => (
          <motion.div key={comp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Flex p={3} borderRadius="lg" border="1px solid" borderColor="gray.200" alignItems="center" gap={2} _hover={{ borderColor: "#3b82f6", bg: "gray.50" }} transition="all 0.15s">
              <Box w="8px" h="8px" borderRadius="full" bg={STATUS_COLORS[comp.status]} flexShrink={0} />
              <Box flex={1}><Text fontSize="sm" fontWeight="medium">{comp.name}</Text><Text fontSize="2xs" color="gray.400">#{comp.id}</Text></Box>
            </Flex>
          </motion.div>
        ))}
      </SimpleGrid>
    </Box>
  );
}
export default Sprint1Showcase;

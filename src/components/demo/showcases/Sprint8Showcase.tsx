
import { Box, Flex, Text, Badge, SimpleGrid } from "@chakra-ui/react";
import { motion } from "motion/react";

const COMPONENTS = [
  { id: 139, name: "MemberPortalLayout", status: "planned" },
  { id: 140, name: "MemberPortalNav", status: "planned" },
  { id: 141, name: "MemberDashboard", status: "planned" },
  { id: 142, name: "MemberProfileEditor", status: "planned" },
  { id: 143, name: "MemberEventsView", status: "planned" },
  { id: 144, name: "MemberPaymentsView", status: "planned" },
  { id: 145, name: "MemberDocuments", status: "planned" },
  { id: 146, name: "MemberDirectory", status: "planned" },
  { id: 147, name: "MemberBenefits", status: "planned" },
  { id: 148, name: "MemberRenewal", status: "planned" },
  { id: 149, name: "MemberSupport", status: "planned" },
  { id: 150, name: "MemberFeedback", status: "planned" },
];

const STATUS_COLORS: Record<string, string> = { done: "#10b981", "in-progress": "#f59e0b", planned: "#6b7280" };

export function Sprint8Showcase() {
  return (
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">Sprint 8: Member Portal</Text>
          <Text fontSize="sm" color="gray.500">Public member portal, self-service features</Text>
        </Box>
        <Badge bg="#14b8a6" color="white" px={3} py={1} borderRadius="full" fontSize="sm">0/{COMPONENTS.length} Complete</Badge>
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
        {COMPONENTS.map((comp, i) => (
          <motion.div key={comp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Flex p={3} borderRadius="lg" border="1px solid" borderColor="gray.200" alignItems="center" gap={2} _hover={{ borderColor: "#14b8a6", bg: "gray.50" }} transition="all 0.15s">
              <Box w="8px" h="8px" borderRadius="full" bg={STATUS_COLORS[comp.status]} flexShrink={0} />
              <Box flex={1}><Text fontSize="sm" fontWeight="medium">{comp.name}</Text><Text fontSize="2xs" color="gray.400">#{comp.id}</Text></Box>
            </Flex>
          </motion.div>
        ))}
      </SimpleGrid>
    </Box>
  );
}
export default Sprint8Showcase;

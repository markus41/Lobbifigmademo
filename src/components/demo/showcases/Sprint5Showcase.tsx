
import { Box, Flex, Text, Badge, SimpleGrid } from "@chakra-ui/react";
import { motion } from "motion/react";

const COMPONENTS = [
  { id: 105, name: "BillingPage", status: "planned" },
  { id: 106, name: "InvoiceTable", status: "planned" },
  { id: 107, name: "InvoiceDetail", status: "planned" },
  { id: 108, name: "PaymentMethodForm", status: "planned" },
  { id: 109, name: "SubscriptionPlanCard", status: "planned" },
  { id: 110, name: "PricingTierComparison", status: "planned" },
  { id: 111, name: "PaymentHistory", status: "planned" },
  { id: 112, name: "RefundDialog", status: "planned" },
  { id: 113, name: "RevenueMetrics", status: "planned" },
  { id: 114, name: "StripeCheckoutEmbed", status: "planned" },
  { id: 115, name: "TaxConfigPanel", status: "planned" },
];

const STATUS_COLORS: Record<string, string> = { done: "#10b981", "in-progress": "#f59e0b", planned: "#6b7280" };

export function Sprint5Showcase() {
  return (
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">Sprint 5: Payments</Text>
          <Text fontSize="sm" color="gray.500">Billing, invoices, Stripe integration</Text>
        </Box>
        <Badge bg="#ef4444" color="white" px={3} py={1} borderRadius="full" fontSize="sm">0/{COMPONENTS.length} Complete</Badge>
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={3}>
        {COMPONENTS.map((comp, i) => (
          <motion.div key={comp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Flex p={3} borderRadius="lg" border="1px solid" borderColor="gray.200" alignItems="center" gap={2} _hover={{ borderColor: "#ef4444", bg: "gray.50" }} transition="all 0.15s">
              <Box w="8px" h="8px" borderRadius="full" bg={STATUS_COLORS[comp.status]} flexShrink={0} />
              <Box flex={1}><Text fontSize="sm" fontWeight="medium">{comp.name}</Text><Text fontSize="2xs" color="gray.400">#{comp.id}</Text></Box>
            </Flex>
          </motion.div>
        ))}
      </SimpleGrid>
    </Box>
  );
}
export default Sprint5Showcase;

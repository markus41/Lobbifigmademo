
import { Box, Flex, Text, Badge, SimpleGrid } from "@mantine/core";
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

const STATUS_COLORS: Record<string, string> = {
  done: 'var(--success, #059669)',
  'in-progress': 'var(--warning, #D97706)',
  planned: 'var(--theme-text-muted, #6b7280)',
};

export function Sprint5Showcase() {
  return (
    <Box p="xl">
      <Flex justify="space-between" align="center" mb="xl">
        <Box>
          <Text fz="xl" fw={700}>Sprint 5: Payments</Text>
          <Text fz="sm" c="dimmed">Billing, invoices, Stripe integration</Text>
        </Box>
        <Badge color="red" variant="filled" size="lg" radius="xl">0/{COMPONENTS.length} Complete</Badge>
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
export default Sprint5Showcase;

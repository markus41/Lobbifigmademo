
import { Box, Flex, Text, Badge, SimpleGrid } from "@mantine/core";
import { motion } from "motion/react";

const COMPONENTS = [
  { id: 151, name: "LandingPage", status: "done" },
  { id: 152, name: "HeroSection", status: "planned" },
  { id: 153, name: "FeaturesSection", status: "planned" },
  { id: 154, name: "TestimonialsCarousel", status: "planned" },
  { id: 155, name: "PricingSection", status: "planned" },
  { id: 156, name: "CTABanner", status: "planned" },
  { id: 157, name: "Footer", status: "planned" },
  { id: 158, name: "JoinForm", status: "planned" },
  { id: 159, name: "OrgShowcasePage", status: "planned" },
  { id: 160, name: "ContactPage", status: "planned" },
];

const STATUS_COLORS: Record<string, string> = { done: "#10b981", "in-progress": "#f59e0b", planned: "#6b7280" };

export function Sprint9Showcase() {
  const doneCount = COMPONENTS.filter(c => c.status === "done").length;
  return (
    <Box p="xl">
      <Flex justify="space-between" align="center" mb="xl">
        <Box>
          <Text fz="xl" fw={700}>Sprint 9: Landing Pages</Text>
          <Text fz="sm" c="dimmed">Hero, features, testimonials, pricing — Components 151-160</Text>
        </Box>
        <Badge color="orange" variant="filled" size="lg" radius="xl">{doneCount}/{COMPONENTS.length} Complete</Badge>
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
export default Sprint9Showcase;

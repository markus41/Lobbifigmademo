
import { Box, Flex, Text, Badge, SimpleGrid } from "@mantine/core";
import { motion } from "motion/react";

interface ComponentCard {
  id: number;
  name: string;
  category: string;
  status: "done" | "in-progress" | "planned";
}

const COMPONENTS: ComponentCard[] = [
  { id: 1, name: "defineTokens (colors)", category: "Theme Utilities", status: "done" },
  { id: 2, name: "defineTokens (typography)", category: "Theme Utilities", status: "done" },
  { id: 3, name: "defineTokens (spacing)", category: "Theme Utilities", status: "done" },
  { id: 4, name: "defineTokens (radii)", category: "Theme Utilities", status: "done" },
  { id: 5, name: "defineTokens (shadows)", category: "Theme Utilities", status: "done" },
  { id: 6, name: "defineSemanticTokens", category: "Theme Utilities", status: "done" },
  { id: 7, name: "defineConfig (conditions)", category: "Theme Utilities", status: "done" },
  { id: 8, name: "createSystem", category: "Theme Utilities", status: "done" },
  { id: 9, name: "createSystemFromOrgTheme", category: "Theme Utilities", status: "done" },
  { id: 10, name: "OrgSystemProvider", category: "Providers", status: "done" },
  { id: 11, name: "OrgSystemContext", category: "Providers", status: "done" },
  { id: 12, name: "LobbiThemeProvider", category: "Providers", status: "done" },
  { id: 13, name: "useOrgColors", category: "Hooks", status: "done" },
  { id: 14, name: "useOrgGradients", category: "Hooks", status: "done" },
  { id: 15, name: "useOrgDesignSchema", category: "Hooks", status: "done" },
  { id: 16, name: "useOrgMotion", category: "Hooks", status: "done" },
  { id: 17, name: "useOrgComponents", category: "Hooks", status: "done" },
  { id: 18, name: "useButtonHoverAnimation", category: "Motion Hooks", status: "done" },
  { id: 19, name: "useCardHoverAnimation", category: "Motion Hooks", status: "done" },
  { id: 20, name: "usePageTransition", category: "Motion Hooks", status: "done" },
  { id: 21, name: "useStaggerAnimation", category: "Motion Hooks", status: "done" },
  { id: 22, name: "useScrollAnimation", category: "Motion Hooks", status: "done" },
  { id: 23, name: "MotionBox", category: "Motion Components", status: "done" },
  { id: 24, name: "MotionFlex", category: "Motion Components", status: "done" },
  { id: 25, name: "MotionGrid", category: "Motion Components", status: "done" },
  { id: 26, name: "MotionStack", category: "Motion Components", status: "done" },
  { id: 27, name: "AnimatedPage", category: "Motion Components", status: "done" },
  { id: 28, name: "FadeIn", category: "Motion Components", status: "done" },
  { id: 29, name: "StaggerContainer", category: "Motion Components", status: "done" },
  { id: 30, name: "buttonRecipe", category: "Recipes", status: "done" },
  { id: 31, name: "badgeRecipe", category: "Recipes", status: "done" },
  { id: 32, name: "inputRecipe", category: "Recipes", status: "done" },
  { id: 33, name: "headingRecipe", category: "Recipes", status: "done" },
  { id: 34, name: "linkRecipe", category: "Recipes", status: "done" },
  { id: 35, name: "alertRecipe", category: "Recipes", status: "done" },
  { id: 36, name: "cardSlotRecipe", category: "Slot Recipes", status: "done" },
  { id: 37, name: "navbarSlotRecipe", category: "Slot Recipes", status: "done" },
  { id: 38, name: "sidebarSlotRecipe", category: "Slot Recipes", status: "done" },
  { id: 39, name: "tableSlotRecipe", category: "Slot Recipes", status: "done" },
  { id: 40, name: "modalSlotRecipe", category: "Slot Recipes", status: "done" },
  { id: 41, name: "tabsSlotRecipe", category: "Slot Recipes", status: "done" },
  { id: 42, name: "formFieldSlotRecipe", category: "Slot Recipes", status: "done" },
  { id: 43, name: "dropdownSlotRecipe", category: "Slot Recipes", status: "done" },
  { id: 44, name: "tooltipSlotRecipe", category: "Slot Recipes", status: "done" },
  { id: 45, name: "avatarSlotRecipe", category: "Slot Recipes", status: "done" },
];

const STATUS_COLORS: Record<string, string> = {
  done: "#10b981",
  "in-progress": "#f59e0b",
  planned: "#6b7280",
};

export function Sprint0Showcase() {
  const categories = [...new Set(COMPONENTS.map((c) => c.category))];
  const doneCount = COMPONENTS.filter((c) => c.status === "done").length;

  return (
    <Box p="xl">
      <Flex justify="space-between" align="center" mb="xl">
        <Box>
          <Text fz="xl" fw={700}>Sprint 0: Foundation</Text>
          <Text fz="sm" c="dimmed">Theme system, providers, hooks, motion, recipes</Text>
        </Box>
        <Badge color="indigo" variant="filled" size="lg" radius="xl">
          {doneCount}/{COMPONENTS.length} Complete
        </Badge>
      </Flex>

      {categories.map((cat) => (
        <Box key={cat} mb="xl">
          <Text fz="md" fw={600} mb="sm" c="dimmed">
            {cat}
          </Text>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="sm">
            {COMPONENTS.filter((c) => c.category === cat).map((comp, i) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Flex
                  p="sm"
                  style={{
                    borderRadius: 'var(--mantine-radius-md)',
                    border: '1px solid var(--mantine-color-gray-3)',
                    cursor: 'default',
                    transition: 'all 0.15s',
                  }}
                  align="center"
                  gap="xs"
                >
                  <Box w={8} h={8} style={{ borderRadius: '50%', backgroundColor: STATUS_COLORS[comp.status], flexShrink: 0 }} />
                  <Box style={{ flex: 1, minWidth: 0 }}>
                    <Text fz="sm" fw={500} lineClamp={1}>
                      {comp.name}
                    </Text>
                    <Text fz="xs" c="dimmed">#{comp.id}</Text>
                  </Box>
                </Flex>
              </motion.div>
            ))}
          </SimpleGrid>
        </Box>
      ))}
    </Box>
  );
}

export default Sprint0Showcase;

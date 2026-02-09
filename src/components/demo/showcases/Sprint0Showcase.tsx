
import { Box, Flex, Text, Badge, SimpleGrid } from "@chakra-ui/react";
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
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">Sprint 0: Foundation</Text>
          <Text fontSize="sm" color="gray.500">Theme system, providers, hooks, motion, recipes</Text>
        </Box>
        <Badge bg="#6366f1" color="white" px={3} py={1} borderRadius="full" fontSize="sm">
          {doneCount}/{COMPONENTS.length} Complete
        </Badge>
      </Flex>

      {categories.map((cat) => (
        <Box key={cat} mb={6}>
          <Text fontSize="md" fontWeight="semibold" mb={3} color="gray.600">
            {cat}
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={3}>
            {COMPONENTS.filter((c) => c.category === cat).map((comp, i) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Flex
                  p={3}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="gray.200"
                  alignItems="center"
                  gap={2}
                  _hover={{ borderColor: "#6366f1", bg: "gray.50" }}
                  transition="all 0.15s"
                >
                  <Box w="8px" h="8px" borderRadius="full" bg={STATUS_COLORS[comp.status]} flexShrink={0} />
                  <Box flex={1} minW={0}>
                    <Text fontSize="sm" fontWeight="medium" lineClamp={1}>
                      {comp.name}
                    </Text>
                    <Text fontSize="2xs" color="gray.400">#{comp.id}</Text>
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

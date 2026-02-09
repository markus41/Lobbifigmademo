
import { Box, Flex, Text, Badge, SimpleGrid } from "@chakra-ui/react";
import { motion } from "motion/react";

const COMPONENTS = [
  { id: 161, name: "FormField", status: "planned" },
  { id: 162, name: "SearchInput", status: "done" },
  { id: 163, name: "DatePicker", status: "planned" },
  { id: 164, name: "DateRangePicker", status: "planned" },
  { id: 165, name: "FileUpload", status: "planned" },
  { id: 166, name: "RichTextEditor", status: "planned" },
  { id: 167, name: "ColorPicker", status: "planned" },
  { id: 168, name: "ImageCropper", status: "planned" },
  { id: 169, name: "DataTable", status: "planned" },
  { id: 170, name: "EmptyState", status: "planned" },
  { id: 171, name: "LoadingState", status: "planned" },
  { id: 172, name: "ErrorState", status: "planned" },
  { id: 173, name: "Pagination", status: "planned" },
  { id: 174, name: "Toast", status: "planned" },
  { id: 175, name: "ConfirmDialog", status: "planned" },
  { id: 176, name: "Drawer", status: "planned" },
  { id: 177, name: "Tooltip", status: "planned" },
  { id: 178, name: "Popover", status: "planned" },
  { id: 179, name: "ContextMenu", status: "planned" },
  { id: 180, name: "Tabs", status: "planned" },
  { id: 181, name: "Accordion", status: "planned" },
  { id: 182, name: "Stepper", status: "planned" },
  { id: 183, name: "Avatar", status: "planned" },
  { id: 184, name: "Badge", status: "planned" },
  { id: 185, name: "Tag", status: "planned" },
  { id: 186, name: "Skeleton", status: "planned" },
  { id: 187, name: "Progress", status: "planned" },
  { id: 188, name: "Spinner", status: "planned" },
];

const STATUS_COLORS: Record<string, string> = { done: "#10b981", "in-progress": "#f59e0b", planned: "#6b7280" };

export function Sprint10Showcase() {
  const doneCount = COMPONENTS.filter(c => c.status === "done").length;
  return (
    <Box p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">Sprint 10: Shared/Utility</Text>
          <Text fontSize="sm" color="gray.500">Form fields, data display, feedback — Components 161-188</Text>
        </Box>
        <Badge bg="#64748b" color="white" px={3} py={1} borderRadius="full" fontSize="sm">{doneCount}/{COMPONENTS.length} Complete</Badge>
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={3}>
        {COMPONENTS.map((comp, i) => (
          <motion.div key={comp.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Flex p={3} borderRadius="lg" border="1px solid" borderColor="gray.200" alignItems="center" gap={2} _hover={{ borderColor: "#64748b", bg: "gray.50" }} transition="all 0.15s">
              <Box w="8px" h="8px" borderRadius="full" bg={STATUS_COLORS[comp.status]} flexShrink={0} />
              <Box flex={1}><Text fontSize="sm" fontWeight="medium">{comp.name}</Text><Text fontSize="2xs" color="gray.400">#{comp.id}</Text></Box>
            </Flex>
          </motion.div>
        ))}
      </SimpleGrid>
    </Box>
  );
}
export default Sprint10Showcase;

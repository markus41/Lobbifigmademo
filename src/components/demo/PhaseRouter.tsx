/**
 * PhaseRouter
 *
 * Maps the current sprint phase to the correct showcase component.
 * Uses AnimatePresence for smooth page transitions.
 */

import { lazy, Suspense, type LazyExoticComponent, type ComponentType } from "react";
import { Box, Flex, Text, Loader } from "@mantine/core";
import { AnimatePresence, motion } from "motion/react";
import { useDemoContext, type SprintPhase } from "./PlatformDemoBanner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LazyComponent = LazyExoticComponent<ComponentType<any>>;

const Sprint0Showcase = lazy(() => import("./showcases/Sprint0Showcase"));
const Sprint1Showcase = lazy(() => import("./showcases/Sprint1Showcase"));
const Sprint2Showcase = lazy(() => import("./showcases/Sprint2Showcase"));
const Sprint3Showcase = lazy(() => import("./showcases/Sprint3Showcase"));
const Sprint4Showcase = lazy(() => import("./showcases/Sprint4Showcase"));
const Sprint5Showcase = lazy(() => import("./showcases/Sprint5Showcase"));
const Sprint6Showcase = lazy(() => import("./showcases/Sprint6Showcase"));
const Sprint7Showcase = lazy(() => import("./showcases/Sprint7Showcase"));
const Sprint8Showcase = lazy(() => import("./showcases/Sprint8Showcase"));
const Sprint9Showcase = lazy(() => import("./showcases/Sprint9Showcase"));
const Sprint10Showcase = lazy(() => import("./showcases/Sprint10Showcase"));
const AllPhasesOverview = lazy(() => import("./showcases/AllPhasesOverview"));

const PHASE_COMPONENTS: Record<SprintPhase, LazyComponent> = {
  all: AllPhasesOverview as LazyComponent,
  "sprint-0": Sprint0Showcase,
  "sprint-1": Sprint1Showcase,
  "sprint-2": Sprint2Showcase,
  "sprint-3": Sprint3Showcase,
  "sprint-4": Sprint4Showcase,
  "sprint-5": Sprint5Showcase,
  "sprint-6": Sprint6Showcase,
  "sprint-7": Sprint7Showcase,
  "sprint-8": Sprint8Showcase,
  "sprint-9": Sprint9Showcase,
  "sprint-10": Sprint10Showcase,
};

function LoadingFallback() {
  return (
    <Flex
      mih="200px"
      align="center"
      justify="center"
      direction="column"
      gap="md"
    >
      <Loader size="sm" color="blue" type="dots" />
      <Text fz="sm" c="dimmed">
        Loading showcase...
      </Text>
    </Flex>
  );
}

export function PhaseRouter() {
  const { currentPhase, setCurrentPhase } = useDemoContext();

  const PhaseComponent = PHASE_COMPONENTS[currentPhase] ?? PHASE_COMPONENTS.all;

  return (
    <Box mih="calc(100vh - 60px)">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPhase}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <PhaseComponent
              {...(currentPhase === "all" ? { onSelectPhase: setCurrentPhase } : {})}
            />
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}

export default PhaseRouter;

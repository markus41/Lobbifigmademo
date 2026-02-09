/**
 * DemoPlatformPage
 *
 * Standalone demo entry point that combines the PlatformDemoBanner
 * with the PhaseRouter for a complete demo experience.
 */


import { Box } from "@chakra-ui/react";
import { PlatformDemoBanner } from "./PlatformDemoBanner";
import { PhaseRouter } from "./PhaseRouter";

interface DemoPlatformPageProps {
  defaultPhase?: "all" | string;
  defaultRole?: string;
}

export function DemoPlatformPage({
  defaultPhase = "all",
  defaultRole = "org-admin",
}: DemoPlatformPageProps) {
  return (
    <PlatformDemoBanner
      defaultPhase={defaultPhase as any}
      defaultRole={defaultRole}
    >
      <Box bg="white" minH="100vh">
        <PhaseRouter />
      </Box>
    </PlatformDemoBanner>
  );
}

export default DemoPlatformPage;

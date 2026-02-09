/**
 * PlatformDemoBanner
 *
 * Chakra UI v3 + GSAP demo control banner for the Lobbi platform demo.
 * Sits ABOVE all content (fixed top, pushes content down via padding).
 * Controls sprint phase visibility, user role, dark mode, and org switching.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";

/* --- Types -------------------------------------------------------- */

export type SprintPhase =
  | "all"
  | "sprint-0"
  | "sprint-1"
  | "sprint-2"
  | "sprint-3"
  | "sprint-4"
  | "sprint-5"
  | "sprint-6"
  | "sprint-7"
  | "sprint-8"
  | "sprint-9"
  | "sprint-10";

export interface SprintPhaseInfo {
  id: SprintPhase;
  label: string;
  shortLabel: string;
  componentRange: string;
  componentCount: number;
  color: string;
  description: string;
}

export interface UserRole {
  id: string;
  label: string;
  level: number;
  color: string;
}

/* --- Constants ---------------------------------------------------- */

export const SPRINT_PHASES: SprintPhaseInfo[] = [
  {
    id: "all",
    label: "All Phases",
    shortLabel: "All",
    componentRange: "1-188",
    componentCount: 188,
    color: "#8b5cf6",
    description: "Complete platform overview",
  },
  {
    id: "sprint-0",
    label: "Sprint 0: Foundation",
    shortLabel: "S0",
    componentRange: "1-45",
    componentCount: 45,
    color: "#6366f1",
    description: "Theme system, providers, hooks, recipes",
  },
  {
    id: "sprint-1",
    label: "Sprint 1: Layouts & Auth",
    shortLabel: "S1",
    componentRange: "46-59",
    componentCount: 14,
    color: "#3b82f6",
    description: "App shell, navigation, authentication",
  },
  {
    id: "sprint-2",
    label: "Sprint 2: Dashboard",
    shortLabel: "S2",
    componentRange: "60-71",
    componentCount: 12,
    color: "#06b6d4",
    description: "Dashboard page, widgets, analytics",
  },
  {
    id: "sprint-3",
    label: "Sprint 3: Members",
    shortLabel: "S3",
    componentRange: "72-90",
    componentCount: 19,
    color: "#10b981",
    description: "Member management, profiles, import/export",
  },
  {
    id: "sprint-4",
    label: "Sprint 4: Events",
    shortLabel: "S4",
    componentRange: "91-104",
    componentCount: 14,
    color: "#f59e0b",
    description: "Events calendar, RSVP, analytics",
  },
  {
    id: "sprint-5",
    label: "Sprint 5: Payments",
    shortLabel: "S5",
    componentRange: "105-115",
    componentCount: 11,
    color: "#ef4444",
    description: "Billing, invoices, Stripe integration",
  },
  {
    id: "sprint-6",
    label: "Sprint 6: Communications",
    shortLabel: "S6",
    componentRange: "116-124",
    componentCount: 9,
    color: "#ec4899",
    description: "Notifications, email, SMS, templates",
  },
  {
    id: "sprint-7",
    label: "Sprint 7: Settings",
    shortLabel: "S7",
    componentRange: "125-138",
    componentCount: 14,
    color: "#8b5cf6",
    description: "Organization settings, branding, API keys",
  },
  {
    id: "sprint-8",
    label: "Sprint 8: Member Portal",
    shortLabel: "S8",
    componentRange: "139-150",
    componentCount: 12,
    color: "#14b8a6",
    description: "Public member portal, self-service",
  },
  {
    id: "sprint-9",
    label: "Sprint 9: Landing Pages",
    shortLabel: "S9",
    componentRange: "151-160",
    componentCount: 10,
    color: "#f97316",
    description: "Marketing pages, pricing, contact",
  },
  {
    id: "sprint-10",
    label: "Sprint 10: Shared Utilities",
    shortLabel: "S10",
    componentRange: "161-188",
    componentCount: 28,
    color: "#64748b",
    description: "Form fields, tables, modals, utilities",
  },
];

export const USER_ROLES: UserRole[] = [
  { id: "national-admin", label: "National Admin", level: 7, color: "#ef4444" },
  { id: "regional-admin", label: "Regional Admin", level: 6, color: "#f59e0b" },
  { id: "org-owner", label: "Org Owner", level: 5, color: "#8b5cf6" },
  { id: "org-admin", label: "Org Admin", level: 4, color: "#3b82f6" },
  { id: "org-manager", label: "Org Manager", level: 3, color: "#06b6d4" },
  { id: "premium-member", label: "Premium Member", level: 2, color: "#10b981" },
  { id: "standard-member", label: "Standard Member", level: 1, color: "#64748b" },
];

/* --- Demo Context ------------------------------------------------- */

export interface DemoContextValue {
  currentPhase: SprintPhase;
  setCurrentPhase: (phase: SprintPhase) => void;
  currentRole: string;
  setCurrentRole: (role: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  isFeatureEnabled: (sprintId: SprintPhase) => boolean;
  isRoleAuthorized: (minLevel: number) => boolean;
  bannerHeight: number;
  phaseInfo: SprintPhaseInfo;
  roleInfo: UserRole;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function useDemoContext(): DemoContextValue {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error("useDemoContext must be used within PlatformDemoBanner");
  }
  return ctx;
}

/* --- Chevron SVG -------------------------------------------------- */

function ChevronDown({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ChevronUp({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

function SunIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/* --- Banner Component --------------------------------------------- */

interface PlatformDemoBannerProps {
  children: ReactNode;
  defaultPhase?: SprintPhase;
  defaultRole?: string;
}

export function PlatformDemoBanner({
  children,
  defaultPhase = "all",
  defaultRole = "org-admin",
}: PlatformDemoBannerProps) {
  const [currentPhase, setCurrentPhase] = useState<SprintPhase>(defaultPhase);
  const [currentRole, setCurrentRole] = useState(defaultRole);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPhaseMenu, setShowPhaseMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(48);

  const bannerRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const phaseMenuRef = useRef<HTMLDivElement>(null);
  const roleMenuRef = useRef<HTMLDivElement>(null);

  // Current phase & role info
  const phaseInfo = useMemo(
    () => SPRINT_PHASES.find((p) => p.id === currentPhase) ?? SPRINT_PHASES[0],
    [currentPhase]
  );

  const roleInfo = useMemo(
    () => USER_ROLES.find((r) => r.id === currentRole) ?? USER_ROLES[3],
    [currentRole]
  );

  // Feature gating
  const isFeatureEnabled = useCallback(
    (sprintId: SprintPhase): boolean => {
      if (currentPhase === "all") return true;
      const currentIdx = SPRINT_PHASES.findIndex((p) => p.id === currentPhase);
      const targetIdx = SPRINT_PHASES.findIndex((p) => p.id === sprintId);
      return targetIdx <= currentIdx;
    },
    [currentPhase]
  );

  // Role authorization
  const isRoleAuthorized = useCallback(
    (minLevel: number): boolean => {
      return roleInfo.level >= minLevel;
    },
    [roleInfo]
  );

  // Measure banner height with ResizeObserver
  useEffect(() => {
    if (!bannerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setBannerHeight(entry.contentRect.height);
      }
    });
    observer.observe(bannerRef.current);
    return () => observer.disconnect();
  }, [isExpanded, isVisible]);

  // GSAP shimmer animation
  useEffect(() => {
    if (!shimmerRef.current || !isVisible) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 4 });
    tl.fromTo(
      shimmerRef.current,
      { x: "-100%", opacity: 0 },
      { x: "200%", opacity: 0.3, duration: 1.5, ease: "power2.inOut" }
    );
    return () => { tl.kill(); };
  }, [isVisible]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (phaseMenuRef.current && !phaseMenuRef.current.contains(target)) {
        setShowPhaseMenu(false);
      }
      if (roleMenuRef.current && !roleMenuRef.current.contains(target)) {
        setShowRoleMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Context value
  const contextValue: DemoContextValue = useMemo(
    () => ({
      currentPhase,
      setCurrentPhase,
      currentRole,
      setCurrentRole,
      isDarkMode,
      setIsDarkMode,
      isFeatureEnabled,
      isRoleAuthorized,
      bannerHeight: isVisible ? bannerHeight : 0,
      phaseInfo,
      roleInfo,
    }),
    [currentPhase, currentRole, isDarkMode, isFeatureEnabled, isRoleAuthorized, bannerHeight, isVisible, phaseInfo, roleInfo]
  );

  return (
    <DemoContext.Provider value={contextValue}>
      {/* Fixed Banner */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10000,
            }}
          >
            <Box
              ref={bannerRef}
              bg="gray.900"
              color="white"
              overflow="hidden"
              position="relative"
              borderBottom="2px solid"
              borderColor={phaseInfo.color}
            >
              {/* Shimmer overlay */}
              <Box
                ref={shimmerRef}
                position="absolute"
                top="0"
                left="0"
                width="50%"
                height="100%"
                bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)"
                pointerEvents="none"
                zIndex={1}
              />

              {/* Main bar */}
              <Flex
                px={4}
                py={2}
                alignItems="center"
                justifyContent="space-between"
                position="relative"
                zIndex={2}
                gap={3}
                flexWrap="wrap"
              >
                {/* Left: Logo + Phase */}
                <Flex alignItems="center" gap={3} minW="0">
                  <Box
                    w="8px"
                    h="8px"
                    borderRadius="full"
                    bg={phaseInfo.color}
                    flexShrink={0}
                    boxShadow={`0 0 8px ${phaseInfo.color}`}
                  />
                  <Text fontSize="xs" fontWeight="bold" color="gray.400" whiteSpace="nowrap">
                    LOBBI PLATFORM DEMO
                  </Text>

                  {/* Phase Dropdown */}
                  <Box position="relative" ref={phaseMenuRef}>
                    <Flex
                      as="button"
                      onClick={() => { setShowPhaseMenu(!showPhaseMenu); setShowRoleMenu(false); }}
                      alignItems="center"
                      gap={1.5}
                      bg="whiteAlpha.100"
                      px={3}
                      py={1}
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{ bg: "whiteAlpha.200" }}
                      transition="all 0.15s"
                    >
                      <Box w="6px" h="6px" borderRadius="full" bg={phaseInfo.color} />
                      <Text fontSize="xs" fontWeight="semibold" whiteSpace="nowrap">
                        {phaseInfo.shortLabel}: {phaseInfo.label.split(": ")[1] || phaseInfo.label}
                      </Text>
                      <ChevronDown size={12} />
                    </Flex>

                    {/* Phase dropdown menu */}
                    <AnimatePresence>
                      {showPhaseMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            marginTop: "4px",
                            zIndex: 10001,
                          }}
                        >
                          <Box
                            bg="gray.800"
                            border="1px solid"
                            borderColor="gray.600"
                            borderRadius="lg"
                            py={1}
                            minW="280px"
                            boxShadow="xl"
                            maxH="400px"
                            overflowY="auto"
                          >
                            {SPRINT_PHASES.map((phase) => (
                              <Flex
                                key={phase.id}
                                as="button"
                                onClick={() => { setCurrentPhase(phase.id); setShowPhaseMenu(false); }}
                                alignItems="center"
                                gap={2}
                                px={3}
                                py={2}
                                w="100%"
                                _hover={{ bg: "whiteAlpha.100" }}
                                bg={phase.id === currentPhase ? "whiteAlpha.100" : "transparent"}
                                transition="all 0.1s"
                              >
                                <Box w="8px" h="8px" borderRadius="full" bg={phase.color} flexShrink={0} />
                                <Box textAlign="left" flex={1} minW="0">
                                  <Text fontSize="xs" fontWeight="semibold" lineClamp={1}>
                                    {phase.label}
                                  </Text>
                                  <Text fontSize="2xs" color="gray.400" lineClamp={1}>
                                    {phase.description}
                                  </Text>
                                </Box>
                                <Badge
                                  bg="whiteAlpha.200"
                                  color="gray.300"
                                  fontSize="2xs"
                                  px={1.5}
                                  borderRadius="md"
                                >
                                  {phase.componentCount}
                                </Badge>
                              </Flex>
                            ))}
                          </Box>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>
                </Flex>

                {/* Right: Role + Controls */}
                <Flex alignItems="center" gap={2}>
                  {/* Component count badge */}
                  <Badge
                    bg="whiteAlpha.100"
                    color={phaseInfo.color}
                    fontSize="2xs"
                    px={2}
                    py={0.5}
                    borderRadius="full"
                  >
                    {phaseInfo.componentCount} components
                  </Badge>

                  {/* Role Dropdown */}
                  <Box position="relative" ref={roleMenuRef}>
                    <Flex
                      as="button"
                      onClick={() => { setShowRoleMenu(!showRoleMenu); setShowPhaseMenu(false); }}
                      alignItems="center"
                      gap={1.5}
                      bg="whiteAlpha.100"
                      px={2.5}
                      py={1}
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{ bg: "whiteAlpha.200" }}
                      transition="all 0.15s"
                    >
                      <Box w="6px" h="6px" borderRadius="full" bg={roleInfo.color} />
                      <Text fontSize="xs" fontWeight="medium">
                        {roleInfo.label}
                      </Text>
                      <ChevronDown size={12} />
                    </Flex>

                    <AnimatePresence>
                      {showRoleMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: "absolute",
                            top: "100%",
                            right: 0,
                            marginTop: "4px",
                            zIndex: 10001,
                          }}
                        >
                          <Box
                            bg="gray.800"
                            border="1px solid"
                            borderColor="gray.600"
                            borderRadius="lg"
                            py={1}
                            minW="200px"
                            boxShadow="xl"
                          >
                            {USER_ROLES.map((role) => (
                              <Flex
                                key={role.id}
                                as="button"
                                onClick={() => { setCurrentRole(role.id); setShowRoleMenu(false); }}
                                alignItems="center"
                                gap={2}
                                px={3}
                                py={1.5}
                                w="100%"
                                _hover={{ bg: "whiteAlpha.100" }}
                                bg={role.id === currentRole ? "whiteAlpha.100" : "transparent"}
                                transition="all 0.1s"
                              >
                                <Box w="6px" h="6px" borderRadius="full" bg={role.color} />
                                <Text fontSize="xs" fontWeight="medium" flex={1} textAlign="left">
                                  {role.label}
                                </Text>
                                <Text fontSize="2xs" color="gray.500">
                                  L{role.level}
                                </Text>
                              </Flex>
                            ))}
                          </Box>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>

                  {/* Dark mode toggle */}
                  <Box
                    as="button"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    bg="whiteAlpha.100"
                    p={1.5}
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ bg: "whiteAlpha.200" }}
                    transition="all 0.15s"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {isDarkMode ? <SunIcon size={14} /> : <MoonIcon size={14} />}
                  </Box>

                  {/* Expand/collapse */}
                  <Box
                    as="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    bg="whiteAlpha.100"
                    p={1.5}
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ bg: "whiteAlpha.200" }}
                    transition="all 0.15s"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </Box>

                  {/* Close */}
                  <Box
                    as="button"
                    onClick={() => setIsVisible(false)}
                    bg="whiteAlpha.100"
                    p={1.5}
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ bg: "red.600" }}
                    transition="all 0.15s"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xs"
                  >
                    ✕
                  </Box>
                </Flex>
              </Flex>

              {/* Expanded details panel */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: "hidden" }}
                  >
                    <Box px={4} pb={3} borderTop="1px solid" borderColor="whiteAlpha.100">
                      {/* Sprint progress bar */}
                      <Flex gap={1} mt={2} mb={2}>
                        {SPRINT_PHASES.slice(1).map((phase) => (
                          <Box
                            key={phase.id}
                            flex={phase.componentCount}
                            h="4px"
                            bg={isFeatureEnabled(phase.id) ? phase.color : "whiteAlpha.100"}
                            borderRadius="full"
                            transition="all 0.3s"
                            cursor="pointer"
                            _hover={{ transform: "scaleY(2)" }}
                            onClick={() => setCurrentPhase(phase.id)}
                            title={`${phase.label} (${phase.componentCount} components)`}
                          />
                        ))}
                      </Flex>

                      {/* Phase info */}
                      <Flex gap={4} flexWrap="wrap" mt={2}>
                        <Box flex={1} minW="200px">
                          <Text fontSize="2xs" color="gray.500" mb={1}>
                            CURRENT PHASE
                          </Text>
                          <Flex alignItems="center" gap={2}>
                            <Box w="10px" h="10px" borderRadius="full" bg={phaseInfo.color} />
                            <Text fontSize="sm" fontWeight="bold">
                              {phaseInfo.label}
                            </Text>
                          </Flex>
                          <Text fontSize="xs" color="gray.400" mt={0.5}>
                            {phaseInfo.description} • Components {phaseInfo.componentRange}
                          </Text>
                        </Box>

                        <Box flex={1} minW="200px">
                          <Text fontSize="2xs" color="gray.500" mb={1}>
                            ROLE PERMISSIONS
                          </Text>
                          <Flex alignItems="center" gap={2}>
                            <Box w="10px" h="10px" borderRadius="full" bg={roleInfo.color} />
                            <Text fontSize="sm" fontWeight="bold">
                              {roleInfo.label}
                            </Text>
                            <Badge fontSize="2xs" bg="whiteAlpha.200" color="gray.300">
                              Level {roleInfo.level}
                            </Badge>
                          </Flex>
                          <Text fontSize="xs" color="gray.400" mt={0.5}>
                            Access: {roleInfo.level >= 5 ? "Full admin" : roleInfo.level >= 3 ? "Management" : "Member"}
                          </Text>
                        </Box>

                        {/* Sprint grid */}
                        <Box w="100%">
                          <Text fontSize="2xs" color="gray.500" mb={1}>
                            ALL SPRINTS
                          </Text>
                          <Flex gap={1} flexWrap="wrap">
                            {SPRINT_PHASES.slice(1).map((phase) => (
                              <Flex
                                key={phase.id}
                                as="button"
                                onClick={() => setCurrentPhase(phase.id)}
                                alignItems="center"
                                gap={1}
                                px={2}
                                py={0.5}
                                borderRadius="md"
                                bg={phase.id === currentPhase ? "whiteAlpha.200" : "whiteAlpha.50"}
                                border="1px solid"
                                borderColor={phase.id === currentPhase ? phase.color : "transparent"}
                                _hover={{ bg: "whiteAlpha.200" }}
                                transition="all 0.15s"
                                opacity={isFeatureEnabled(phase.id) ? 1 : 0.4}
                              >
                                <Box w="4px" h="4px" borderRadius="full" bg={phase.color} />
                                <Text fontSize="2xs" fontWeight="medium">
                                  {phase.shortLabel}
                                </Text>
                                <Text fontSize="2xs" color="gray.500">
                                  {phase.componentCount}
                                </Text>
                              </Flex>
                            ))}
                          </Flex>
                        </Box>
                      </Flex>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Phase color accent line */}
              <Box h="2px" bg={phaseInfo.color} transition="background 0.3s" />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized restore button */}
      <AnimatePresence>
        {!isVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: "fixed",
              top: "12px",
              right: "12px",
              zIndex: 10000,
            }}
          >
            <Box
              as="button"
              onClick={() => setIsVisible(true)}
              bg="gray.900"
              color="white"
              px={3}
              py={1.5}
              borderRadius="full"
              boxShadow="lg"
              cursor="pointer"
              _hover={{ bg: "gray.800" }}
              display="flex"
              alignItems="center"
              gap={2}
              border="1px solid"
              borderColor={phaseInfo.color}
            >
              <Box w="6px" h="6px" borderRadius="full" bg={phaseInfo.color} />
              <Text fontSize="xs" fontWeight="semibold">
                Demo
              </Text>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content wrapper - pushes content below banner */}
      <Box
        pt={isVisible ? `${bannerHeight}px` : "0px"}
        transition="padding-top 0.3s ease"
        minH="100vh"
      >
        {children}
      </Box>
    </DemoContext.Provider>
  );
}

export default PlatformDemoBanner;

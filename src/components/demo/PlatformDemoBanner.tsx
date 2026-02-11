/**
 * PlatformDemoBanner
 *
 * Mantine v8 + GSAP demo control banner for the Lobbi platform demo.
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
import { Box, Flex, Text, Badge } from "@mantine/core";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import {
  useOrgTheme,
  useThemeMode,
  AVAILABLE_ORGS,
  ORG_NAMES,
  type OrgId,
} from "../../theme/LobbiMantineProvider";

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

const DEMO_BANNER_Z_INDEX = 2147483000;
const DEMO_BANNER_MENU_Z_INDEX = DEMO_BANNER_Z_INDEX + 10;
const BANNER_BG = "#0B1220";
const BANNER_PANEL = "#111A2F";
const BANNER_PANEL_ALT = "#15213B";
const BANNER_BORDER = "rgba(148, 163, 184, 0.4)";
const BANNER_TEXT = "#F8FAFC";
const BANNER_MUTED_TEXT = "#D6E1F2";
const BANNER_SUBTLE_TEXT = "#AFC2DD";

const ORG_GROUPS: Array<{
  id: string;
  label: string;
  color: string;
  orgs: OrgId[];
}> = [
  {
    id: "hospitality",
    label: "Hospitality & Clubs",
    color: "#F59E0B",
    orgs: ["luxe-haven", "pacific-club", "summit-group", "crown-estates", "obsidian-society", "golden-era"],
  },
  {
    id: "wellness",
    label: "Wellness & Lifestyle",
    color: "#10B981",
    orgs: ["verde-collective", "lavender-fields", "zen-garden", "marigold-society", "copper-oak"],
  },
  {
    id: "creative",
    label: "Creative & Heritage",
    color: "#8B5CF6",
    orgs: ["rose-meridian", "jade-dynasty", "flame-stone"],
  },
  {
    id: "technology",
    label: "Technology & Innovation",
    color: "#22D3EE",
    orgs: ["slate-modern", "neon-district", "the-forge", "pixel-pioneers", "arctic-circle", "midnight-azure"],
  },
];

/* --- Demo Context ------------------------------------------------- */

export interface DemoContextValue {
  currentPhase: SprintPhase;
  setCurrentPhase: (phase: SprintPhase) => void;
  currentRole: string;
  setCurrentRole: (role: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  isDyslexicMode: boolean;
  setIsDyslexicMode: (enabled: boolean) => void;
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
  const [currentPhase, setCurrentPhase] = useState<SprintPhase>(() => {
    if (typeof window === "undefined") return defaultPhase;
    const stored = localStorage.getItem("lobbi_demo_phase");
    const validPhase = SPRINT_PHASES.find((phase) => phase.id === stored)?.id;
    return validPhase ?? defaultPhase;
  });
  const [currentRole, setCurrentRole] = useState(() => {
    if (typeof window === "undefined") return defaultRole;
    const stored = localStorage.getItem("lobbi_demo_role");
    const validRole = USER_ROLES.find((role) => role.id === stored)?.id;
    return validRole ?? defaultRole;
  });
  const [isDyslexicMode, setIsDyslexicMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("lobbi_demo_dyslexic_mode") === "1";
  });
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPhaseMenu, setShowPhaseMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showOrgMenu, setShowOrgMenu] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(48);
  const prevDefaultRoleRef = useRef(defaultRole);

  // Get org theme from context
  const { currentOrg, setOrg } = useOrgTheme();
  const { setMode, resolvedMode } = useThemeMode();
  const isDarkMode = resolvedMode === "dark";
  const setIsDarkMode = useCallback(
    (dark: boolean) => {
      setMode(dark ? "dark" : "light");
    },
    [setMode]
  );

  const bannerRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const phaseMenuRef = useRef<HTMLDivElement>(null);
  const roleMenuRef = useRef<HTMLDivElement>(null);
  const orgMenuRef = useRef<HTMLDivElement>(null);

  const phaseInfo = useMemo(
    () => SPRINT_PHASES.find((p) => p.id === currentPhase) ?? SPRINT_PHASES[0],
    [currentPhase]
  );

  const roleInfo = useMemo(
    () => USER_ROLES.find((r) => r.id === currentRole) ?? USER_ROLES[3],
    [currentRole]
  );

  const groupedOrgs = useMemo(() => {
    const grouped = ORG_GROUPS.map((group) => ({
      ...group,
      orgs: group.orgs.filter((orgId) => AVAILABLE_ORGS.includes(orgId)),
    })).filter((group) => group.orgs.length > 0);

    const groupedIds = new Set(grouped.flatMap((group) => group.orgs));
    const ungrouped = AVAILABLE_ORGS.filter((orgId) => !groupedIds.has(orgId));

    if (ungrouped.length > 0) {
      grouped.push({
        id: "other",
        label: "Other Organizations",
        color: "#94A3B8",
        orgs: [...ungrouped],
      });
    }

    return grouped;
  }, []);

  const isFeatureEnabled = useCallback(
    (sprintId: SprintPhase): boolean => {
      if (currentPhase === "all") return true;
      const currentIdx = SPRINT_PHASES.findIndex((p) => p.id === currentPhase);
      const targetIdx = SPRINT_PHASES.findIndex((p) => p.id === sprintId);
      return targetIdx <= currentIdx;
    },
    [currentPhase]
  );

  const isRoleAuthorized = useCallback(
    (minLevel: number): boolean => {
      return roleInfo.level >= minLevel;
    },
    [roleInfo]
  );

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

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (phaseMenuRef.current && !phaseMenuRef.current.contains(target)) {
        setShowPhaseMenu(false);
      }
      if (roleMenuRef.current && !roleMenuRef.current.contains(target)) {
        setShowRoleMenu(false);
      }
      if (orgMenuRef.current && !orgMenuRef.current.contains(target)) {
        setShowOrgMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (prevDefaultRoleRef.current === defaultRole) return;
    prevDefaultRoleRef.current = defaultRole;
    if (USER_ROLES.some((role) => role.id === defaultRole)) {
      setCurrentRole(defaultRole);
    }
  }, [defaultRole]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedDarkMode = localStorage.getItem("lobbi_demo_dark_mode");
    if (storedDarkMode === "1" || storedDarkMode === "0") {
      setMode(storedDarkMode === "1" ? "dark" : "light");
    }
  }, [setMode]);

  useEffect(() => {
    localStorage.setItem("lobbi_demo_phase", currentPhase);
  }, [currentPhase]);

  useEffect(() => {
    localStorage.setItem("lobbi_demo_role", currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem("lobbi_demo_dark_mode", isDarkMode ? "1" : "0");
    document.body.classList.toggle("dark", isDarkMode);
    document.body.style.colorScheme = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("lobbi_demo_dyslexic_mode", isDyslexicMode ? "1" : "0");
    document.documentElement.classList.toggle("dyslexic", isDyslexicMode);
    document.body.classList.toggle("dyslexic", isDyslexicMode);
  }, [isDyslexicMode]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("lobbi:demo-state", {
        detail: {
          phase: currentPhase,
          role: currentRole,
          darkMode: isDarkMode,
          dyslexicMode: isDyslexicMode,
        },
      })
    );
  }, [currentPhase, currentRole, isDarkMode, isDyslexicMode]);

  const contextValue: DemoContextValue = useMemo(
    () => ({
      currentPhase,
      setCurrentPhase,
      currentRole,
      setCurrentRole,
      isDarkMode,
      setIsDarkMode,
      isDyslexicMode,
      setIsDyslexicMode,
      isFeatureEnabled,
      isRoleAuthorized,
      bannerHeight: isVisible ? bannerHeight : 0,
      phaseInfo,
      roleInfo,
    }),
    [
      currentPhase,
      currentRole,
      isDarkMode,
      isDyslexicMode,
      isFeatureEnabled,
      isRoleAuthorized,
      bannerHeight,
      isVisible,
      phaseInfo,
      roleInfo,
      setIsDarkMode,
    ]
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
              zIndex: DEMO_BANNER_Z_INDEX,
            }}
          >
            <Box
              ref={bannerRef}
              bg="var(--mantine-color-dark-9, #111827)"
              c="white"
              style={{
                overflow: "visible",
                position: "relative",
                borderBottom: `2px solid ${phaseInfo.color}`,
              }}
            >
              {/* Shimmer overlay */}
              <Box
                ref={shimmerRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "50%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />

              {/* Main bar */}
              <Flex
                px="md"
                py="xs"
                align="center"
                justify="space-between"
                style={{ position: "relative", zIndex: 2 }}
                gap="sm"
                wrap="wrap"
              >
                {/* Left: Logo + Phase */}
                <Flex align="center" gap="sm" maw="100%" style={{ minWidth: 0 }}>
                  <Box
                    w={8}
                    h={8}
                    style={{
                      borderRadius: "50%",
                      background: phaseInfo.color,
                      flexShrink: 0,
                      boxShadow: `0 0 8px ${phaseInfo.color}`,
                    }}
                  />
                  <Text fz="xs" fw="bold" c="dimmed" style={{ whiteSpace: "nowrap" }}>
                    LOBBI PLATFORM DEMO
                  </Text>

                  {/* Phase Dropdown */}
                  <Box pos="relative" ref={phaseMenuRef}>
                    <Flex
                      component="button"
                      onClick={() => { setShowPhaseMenu(!showPhaseMenu); setShowRoleMenu(false); }}
                      align="center"
                      gap={6}
                      px="sm"
                      py={4}
                      style={{
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.1)",
                        cursor: "pointer",
                        border: "none",
                        color: "white",
                        transition: "all 0.15s",
                      }}
                    >
                      <Box w={6} h={6} style={{ borderRadius: "50%", background: phaseInfo.color }} />
                      <Text fz="xs" fw={600} style={{ whiteSpace: "nowrap" }}>
                        {phaseInfo.shortLabel}: {phaseInfo.label.split(": ")[1] || phaseInfo.label}
                      </Text>
                      <ChevronDown size={12} />
                    </Flex>

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
                            zIndex: DEMO_BANNER_MENU_Z_INDEX,
                          }}
                        >
                          <Box
                            style={{
                              background: "#1f2937",
                              border: "1px solid #4b5563",
                              borderRadius: 8,
                              padding: "4px 0",
                              minWidth: 280,
                              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)",
                              maxHeight: 400,
                              overflowY: "auto",
                            }}
                          >
                            {SPRINT_PHASES.map((phase) => (
                              <Flex
                                key={phase.id}
                                component="button"
                                onClick={() => { setCurrentPhase(phase.id); setShowPhaseMenu(false); }}
                                align="center"
                                gap="xs"
                                px="sm"
                                py="xs"
                                w="100%"
                                style={{
                                  background: phase.id === currentPhase ? "rgba(255,255,255,0.1)" : "transparent",
                                  border: "none",
                                  color: "white",
                                  cursor: "pointer",
                                  transition: "all 0.1s",
                                }}
                              >
                                <Box w={8} h={8} style={{ borderRadius: "50%", background: phase.color, flexShrink: 0 }} />
                                <Box style={{ textAlign: "left", flex: 1, minWidth: 0 }}>
                                  <Text fz="xs" fw={600} lineClamp={1}>
                                    {phase.label}
                                  </Text>
                                  <Text fz={10} c="dimmed" lineClamp={1}>
                                    {phase.description}
                                  </Text>
                                </Box>
                                <Badge
                                  variant="light"
                                  size="xs"
                                  radius="md"
                                  style={{ background: "rgba(255,255,255,0.2)", color: "#d1d5db" }}
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
                <Flex align="center" gap="xs">
                  <Badge
                    variant="light"
                    size="xs"
                    radius="xl"
                    style={{ background: "rgba(255,255,255,0.1)", color: phaseInfo.color }}
                  >
                    {phaseInfo.componentCount} components
                  </Badge>

                  {/* Role Dropdown */}
                  <Box pos="relative" ref={roleMenuRef}>
                    <Flex
                      component="button"
                      onClick={() => { setShowRoleMenu(!showRoleMenu); setShowPhaseMenu(false); }}
                      align="center"
                      gap={6}
                      px={10}
                      py={4}
                      style={{
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.1)",
                        cursor: "pointer",
                        border: "none",
                        color: "white",
                        transition: "all 0.15s",
                      }}
                    >
                      <Box w={6} h={6} style={{ borderRadius: "50%", background: roleInfo.color }} />
                      <Text fz="xs" fw={500}>
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
                            zIndex: DEMO_BANNER_MENU_Z_INDEX,
                          }}
                        >
                          <Box
                            style={{
                              background: "#1f2937",
                              border: "1px solid #4b5563",
                              borderRadius: 8,
                              padding: "4px 0",
                              minWidth: 200,
                              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)",
                            }}
                          >
                            {USER_ROLES.map((role) => (
                              <Flex
                                key={role.id}
                                component="button"
                                onClick={() => { setCurrentRole(role.id); setShowRoleMenu(false); }}
                                align="center"
                                gap="xs"
                                px="sm"
                                py={6}
                                w="100%"
                                style={{
                                  background: role.id === currentRole ? "rgba(255,255,255,0.1)" : "transparent",
                                  border: "none",
                                  color: "white",
                                  cursor: "pointer",
                                  transition: "all 0.1s",
                                }}
                              >
                                <Box w={6} h={6} style={{ borderRadius: "50%", background: role.color }} />
                                <Text fz="xs" fw={500} style={{ flex: 1, textAlign: "left" }}>
                                  {role.label}
                                </Text>
                                <Text fz={10} c="dimmed">
                                  L{role.level}
                                </Text>
                              </Flex>
                            ))}
                          </Box>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>

                  {/* Org Selector Dropdown */}
                  <Box pos="relative" ref={orgMenuRef}>
                    <Flex
                      component="button"
                      onClick={() => { setShowOrgMenu(!showOrgMenu); setShowPhaseMenu(false); setShowRoleMenu(false); }}
                      align="center"
                      gap={6}
                      px={10}
                      py={4}
                      style={{
                        borderRadius: 6,
                        background: "rgba(139, 92, 246, 0.2)",
                        cursor: "pointer",
                        border: "1px solid rgba(139, 92, 246, 0.4)",
                        color: "white",
                        transition: "all 0.15s",
                      }}
                    >
                      <Box
                        w={6}
                        h={6}
                        style={{
                          borderRadius: "50%",
                          background: "var(--theme-primary, #8b5cf6)",
                          boxShadow: "0 0 6px var(--theme-primary, #8b5cf6)",
                        }}
                      />
                      <Text fz="xs" fw={500} style={{ maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {ORG_NAMES[currentOrg] || currentOrg}
                      </Text>
                      <ChevronDown size={12} />
                    </Flex>

                    <AnimatePresence>
                      {showOrgMenu && (
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
                            zIndex: DEMO_BANNER_MENU_Z_INDEX,
                          }}
                        >
                          <Box
                            style={{
                              background: "#1f2937",
                              border: "1px solid #4b5563",
                              borderRadius: 8,
                              padding: "4px 0",
                              minWidth: 220,
                              maxHeight: 400,
                              overflowY: "auto",
                              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3), 0 0 15px rgba(139, 92, 246, 0.15)",
                            }}
                          >
                            <Text fz={10} c="dimmed" px="sm" py={4} fw={600} style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              Organization Theme
                            </Text>
                            {AVAILABLE_ORGS.map((orgId) => (
                              <Flex
                                key={orgId}
                                component="button"
                                onClick={() => { setOrg(orgId); setShowOrgMenu(false); }}
                                align="center"
                                gap="xs"
                                px="sm"
                                py={6}
                                w="100%"
                                style={{
                                  background: orgId === currentOrg ? "rgba(139, 92, 246, 0.2)" : "transparent",
                                  border: "none",
                                  color: "white",
                                  cursor: "pointer",
                                  transition: "all 0.1s",
                                  borderLeft: orgId === currentOrg ? "2px solid #8b5cf6" : "2px solid transparent",
                                }}
                              >
                                <Box
                                  w={8}
                                  h={8}
                                  style={{
                                    borderRadius: "50%",
                                    background: orgId === currentOrg ? "#8b5cf6" : "rgba(255,255,255,0.2)",
                                    transition: "all 0.15s",
                                  }}
                                />
                                <Text fz="xs" fw={orgId === currentOrg ? 600 : 400} style={{ flex: 1, textAlign: "left" }}>
                                  {ORG_NAMES[orgId] || orgId}
                                </Text>
                                {orgId === currentOrg && (
                                  <Badge
                                    variant="light"
                                    size="xs"
                                    style={{ background: "rgba(139, 92, 246, 0.3)", color: "#c4b5fd" }}
                                  >
                                    Active
                                  </Badge>
                                )}
                              </Flex>
                            ))}
                          </Box>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Box>

                  {/* Dark mode toggle */}
                  <Box
                    component="button"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    p={6}
                    style={{
                      borderRadius: 6,
                      background: isDarkMode ? "rgba(251, 191, 36, 0.2)" : "rgba(255,255,255,0.1)",
                      cursor: "pointer",
                      border: isDarkMode ? "1px solid rgba(251, 191, 36, 0.45)" : "1px solid transparent",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.15s",
                    }}
                    title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {isDarkMode ? <SunIcon size={14} /> : <MoonIcon size={14} />}
                  </Box>

                  {/* Dyslexic mode toggle */}
                  <Box
                    component="button"
                    onClick={() => setIsDyslexicMode(!isDyslexicMode)}
                    px={10}
                    py={6}
                    style={{
                      borderRadius: 6,
                      background: isDyslexicMode ? "rgba(16, 185, 129, 0.22)" : "rgba(255,255,255,0.1)",
                      cursor: "pointer",
                      border: isDyslexicMode ? "1px solid rgba(16, 185, 129, 0.5)" : "1px solid transparent",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      transition: "all 0.15s",
                      whiteSpace: "nowrap",
                    }}
                    title={isDyslexicMode ? "Disable dyslexic mode" : "Enable dyslexic mode"}
                  >
                    {isDyslexicMode ? "DYS ON" : "DYS"}
                  </Box>

                  {/* Reset Session Button */}
                  <Box
                    component="button"
                    onClick={() => {
                      localStorage.removeItem('lobbi_session');
                      sessionStorage.setItem('lobbi_intro_seen', '1');
                      sessionStorage.removeItem('lobbi_resume_session');
                      window.location.hash = '#landing';
                      window.location.reload();
                    }}
                    p={6}
                    style={{
                      borderRadius: 6,
                      background: "rgba(239, 68, 68, 0.2)",
                      cursor: "pointer",
                      border: "1px solid rgba(239, 68, 68, 0.4)",
                      color: "#fca5a5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 600,
                      transition: "all 0.15s",
                      whiteSpace: "nowrap",
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                    title="Restart from landing/auth flow"
                  >
                    Auth Flow
                  </Box>

                  {/* Expand/collapse */}
                  <Box
                    component="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    p={6}
                    style={{
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.1)",
                      cursor: "pointer",
                      border: "none",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.15s",
                    }}
                    title={isExpanded ? "Collapse demo details" : "Expand demo details"}
                  >
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </Box>

                  {/* Close */}
                  <Box
                    component="button"
                    onClick={() => setIsVisible(false)}
                    p={6}
                    style={{
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.1)",
                      cursor: "pointer",
                      border: "none",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      transition: "all 0.15s",
                    }}
                    title="Hide demo banner"
                  >
                    &#x2715;
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
                    <Box px="md" pb="sm" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                      {/* Sprint progress bar */}
                      <Flex gap={4} mt="xs" mb="xs">
                        {SPRINT_PHASES.slice(1).map((phase) => (
                          <Box
                            key={phase.id}
                            style={{
                              flex: phase.componentCount,
                              height: 4,
                              background: isFeatureEnabled(phase.id) ? phase.color : "rgba(255,255,255,0.1)",
                              borderRadius: 9999,
                              transition: "all 0.3s",
                              cursor: "pointer",
                            }}
                            onClick={() => setCurrentPhase(phase.id)}
                            title={`${phase.label} (${phase.componentCount} components)`}
                          />
                        ))}
                      </Flex>

                      {/* Phase info */}
                      <Flex gap="md" wrap="wrap" mt="xs">
                        <Box style={{ flex: 1, minWidth: 200 }}>
                          <Text fz={10} c="dimmed" mb={4}>
                            CURRENT PHASE
                          </Text>
                          <Flex align="center" gap="xs">
                            <Box w={10} h={10} style={{ borderRadius: "50%", background: phaseInfo.color }} />
                            <Text fz="sm" fw="bold">
                              {phaseInfo.label}
                            </Text>
                          </Flex>
                          <Text fz="xs" c="dimmed" mt={2}>
                            {phaseInfo.description} &bull; Components {phaseInfo.componentRange}
                          </Text>
                        </Box>

                        <Box style={{ flex: 1, minWidth: 200 }}>
                          <Text fz={10} c="dimmed" mb={4}>
                            ROLE PERMISSIONS
                          </Text>
                          <Flex align="center" gap="xs">
                            <Box w={10} h={10} style={{ borderRadius: "50%", background: roleInfo.color }} />
                            <Text fz="sm" fw="bold">
                              {roleInfo.label}
                            </Text>
                            <Badge
                              variant="light"
                              size="xs"
                              style={{ background: "rgba(255,255,255,0.2)", color: "#d1d5db" }}
                            >
                              Level {roleInfo.level}
                            </Badge>
                          </Flex>
                          <Text fz="xs" c="dimmed" mt={2}>
                            Access: {roleInfo.level >= 5 ? "Full admin" : roleInfo.level >= 3 ? "Management" : "Member"}
                          </Text>
                        </Box>

                        {/* Sprint grid */}
                        <Box w="100%">
                          <Text fz={10} c="dimmed" mb={4}>
                            ALL SPRINTS
                          </Text>
                          <Flex gap={4} wrap="wrap">
                            {SPRINT_PHASES.slice(1).map((phase) => (
                              <Flex
                                key={phase.id}
                                component="button"
                                onClick={() => setCurrentPhase(phase.id)}
                                align="center"
                                gap={4}
                                px="xs"
                                py={2}
                                style={{
                                  borderRadius: 6,
                                  background: phase.id === currentPhase ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)",
                                  border: phase.id === currentPhase ? `1px solid ${phase.color}` : "1px solid transparent",
                                  cursor: "pointer",
                                  color: "white",
                                  transition: "all 0.15s",
                                  opacity: isFeatureEnabled(phase.id) ? 1 : 0.4,
                                }}
                              >
                                <Box w={4} h={4} style={{ borderRadius: "50%", background: phase.color }} />
                                <Text fz={10} fw={500}>
                                  {phase.shortLabel}
                                </Text>
                                <Text fz={10} c="dimmed">
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
              <Box h={2} style={{ background: phaseInfo.color, transition: "background 0.3s" }} />
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
              top: 12,
              right: 12,
              zIndex: DEMO_BANNER_Z_INDEX,
            }}
          >
            <Box
              component="button"
              onClick={() => setIsVisible(true)}
              px="sm"
              py={6}
              style={{
                background: "#111827",
                color: "white",
                borderRadius: 9999,
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                border: `1px solid ${phaseInfo.color}`,
              }}
            >
              <Box w={6} h={6} style={{ borderRadius: "50%", background: phaseInfo.color }} />
              <Text fz="xs" fw={600}>
                Demo
              </Text>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content wrapper */}
      <Box
        pt={isVisible ? bannerHeight : 0}
        mih="100vh"
        style={{ position: "relative", zIndex: 0, transition: "padding-top 0.3s ease" }}
      >
        {children}
      </Box>
    </DemoContext.Provider>
  );
}

export default PlatformDemoBanner;

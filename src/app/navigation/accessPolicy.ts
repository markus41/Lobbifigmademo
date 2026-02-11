import { SPRINT_PHASES, USER_ROLES, type SprintPhase } from '../../components/demo';

export type AppPage =
  | 'dashboard'
  | 'registry'
  | 'business'
  | 'events'
  | 'vault'
  | 'settings'
  | 'innovation';

interface PageAccessRule {
  requiredPhase: SprintPhase;
  minRoleLevel: number;
}

export const PAGE_ACCESS_RULES: Record<AppPage, PageAccessRule> = {
  dashboard: { requiredPhase: 'sprint-0', minRoleLevel: 1 },
  registry: { requiredPhase: 'sprint-3', minRoleLevel: 1 },
  business: { requiredPhase: 'sprint-6', minRoleLevel: 3 },
  events: { requiredPhase: 'sprint-4', minRoleLevel: 1 },
  vault: { requiredPhase: 'sprint-5', minRoleLevel: 4 },
  settings: { requiredPhase: 'sprint-7', minRoleLevel: 4 },
  innovation: { requiredPhase: 'sprint-10', minRoleLevel: 5 },
};

export const PAGE_NAV_ORDER: AppPage[] = [
  'dashboard',
  'registry',
  'events',
  'business',
  'vault',
  'settings',
  'innovation',
];

export function isAppPage(value: string): value is AppPage {
  return value in PAGE_ACCESS_RULES;
}

export function isValidSprintPhase(value: string): value is SprintPhase {
  return SPRINT_PHASES.some((phase) => phase.id === value);
}

export function getRoleLevel(roleId: string): number {
  return USER_ROLES.find((role) => role.id === roleId)?.level ?? 0;
}

export function isFeatureEnabledForPhase(currentPhase: SprintPhase, requiredPhase: SprintPhase): boolean {
  if (currentPhase === 'all') return true;
  const currentIdx = SPRINT_PHASES.findIndex((phase) => phase.id === currentPhase);
  const requiredIdx = SPRINT_PHASES.findIndex((phase) => phase.id === requiredPhase);
  if (currentIdx === -1 || requiredIdx === -1) return false;
  return requiredIdx <= currentIdx;
}

export function canAccessPage(page: string, currentPhase: SprintPhase, roleId: string): boolean {
  if (!isAppPage(page)) return false;
  const rule = PAGE_ACCESS_RULES[page];
  return isFeatureEnabledForPhase(currentPhase, rule.requiredPhase) && getRoleLevel(roleId) >= rule.minRoleLevel;
}

export function getFirstAccessiblePage(currentPhase: SprintPhase, roleId: string): AppPage {
  return PAGE_NAV_ORDER.find((page) => canAccessPage(page, currentPhase, roleId)) ?? 'dashboard';
}


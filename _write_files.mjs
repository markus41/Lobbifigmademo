import { writeFileSync, mkdirSync } from 'fs';

mkdirSync('C:/Users/MarkusAhling/dev/harness-workspace/Lobbifigmademo/src/components/demo', { recursive: true });

const index = [
  'export {',
  '  PlatformDemoBanner,',
  '  DemoBannerMinimized,',
  '  DemoContext,',
  '  useDemoContext,',
  '  SPRINT_PHASES,',
  '  USER_ROLES,',
  '} from "./PlatformDemoBanner";',
  'export type {',
  '  SprintPhase,',
  '  SprintInfo,',
  '  UserRole,',
  '  RoleInfo,',
  '  DemoContextValue,',
  '  PlatformDemoBannerProps,',
  '} from "./PlatformDemoBanner";',
  '',
].join('\n');

writeFileSync('C:/Users/MarkusAhling/dev/harness-workspace/Lobbifigmademo/src/components/demo/index.ts', index, 'utf8');
console.log('Written index.ts (' + index.length + ' chars)');

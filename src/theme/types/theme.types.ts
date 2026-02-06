/**
 * Lobbi Design System - TypeScript Theme Types
 *
 * Comprehensive type definitions for the design token contract.
 * All components must use these types for type-safe theming.
 */

// ============================================================================
// COLOR SCALE TYPES
// ============================================================================

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface SurfaceColors {
  base: string;
  raised: string;
  overlay: string;
  panel: string;
  canvas: string;
  card: string;
  cardBorder: string;
}

export interface InkColors {
  primary: string;
  secondary: string;
  tertiary: string;
  muted: string;
  dark: string;
  light: string;
}

export interface GoldColors {
  champagne: string;
  champagne2: string;
  antique: string;
  pale: string;
  dark: string;
  glow: string;
}

export interface LineColors {
  subtle: string;
  gold: string;
  goldSubtle: string;
  hairline: string;
  hairlineGold: string;
}

export interface StateColors {
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  danger: string;
  dangerLight: string;
  info: string;
}

export interface BaseColors {
  surface: SurfaceColors;
  ink: InkColors;
  gold: GoldColors;
  line: LineColors;
  state: StateColors;
}

// ============================================================================
// TYPOGRAPHY TYPES
// ============================================================================

export interface TypeFonts {
  display: string;
  body: string;
  ui: string;
  mono: string;
}

export interface TypeWeights {
  light: number;
  regular: number;
  medium: number;
  semibold: number;
  bold: number;
}

export interface TypeTracking {
  brand: string;
  caps: string;
  tight: string;
  wide: string;
  widest: string;
}

export interface TypeSizes {
  hero: string;
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  body: string;
  small: string;
  xs: string;
  label: string;
  micro: string;
}

export interface TypeLineHeight {
  none: number;
  tight: number;
  snug: number;
  normal: number;
  relaxed: number;
  loose: number;
}

export interface Typography {
  font: TypeFonts;
  weight: TypeWeights;
  tracking: TypeTracking;
  size: TypeSizes;
  lineHeight: TypeLineHeight;
}

// ============================================================================
// SPACING & SIZING TYPES
// ============================================================================

export interface Radii {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
  panel: string;
  input: string;
  button: string;
  card: string;
}

export interface Space {
  '0': string;
  px: string;
  '0.5': string;
  '1': string;
  '1.5': string;
  '2': string;
  '2.5': string;
  '3': string;
  '3.5': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  container: string;
  sectionY: string;
  cardPadding: string;
  inputPadding: string;
}

// ============================================================================
// SHADOWS & BORDERS
// ============================================================================

export interface Shadows {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  panel: string;
  float: string;
  goldSoft: string;
  goldGlow: string;
  inner: string;
  focus: string;
}

export interface Borders {
  none: string;
  hairline: string;
  hairlineGold: string;
  thin: string;
  default: string;
  thick: string;
  gold: string;
  goldThick: string;
  decorative: string;
}

// ============================================================================
// MATERIALS (Glass, Grain, Scanlines, Vignette)
// ============================================================================

export interface GlassMaterial {
  bg: string;
  bgDark: string;
  blur: string;
  blurLight: string;
  saturate: string;
}

export interface GrainMaterial {
  opacity: number;
  pattern: string;
  size: string;
}

export interface ScanlineMaterial {
  opacity: number;
  spacingPx: number;
}

export interface VignetteMaterial {
  opacity: number;
  spread: string;
}

export interface Materials {
  glass: GlassMaterial;
  grain: GrainMaterial;
  scanline: ScanlineMaterial;
  vignette: VignetteMaterial;
}

// ============================================================================
// MOTION TYPES
// ============================================================================

export type EasingArray = [number, number, number, number];

export interface MotionEasing {
  luxInOut: EasingArray;
  luxOut: EasingArray;
  fade: EasingArray;
  bounce: EasingArray;
  linear: EasingArray;
}

export interface MotionEasingCSS {
  luxInOut: string;
  luxOut: string;
  fade: string;
  bounce: string;
}

export interface MotionDuration {
  instant: number;
  fast: number;
  normal: number;
  slow: number;
  heroIntro: number;
  gateToAuth: number;
  focus: number;
  hover: number;
  pageTransition: number;
  ambientCycle: number;
}

export interface MotionBlur {
  enter: number;
  exit: number;
  overlay: number;
}

export interface MotionParallax {
  bg: number;
  frame: number;
  particles: number;
}

export interface Motion {
  easing: MotionEasing;
  easingCSS: MotionEasingCSS;
  durationMs: MotionDuration;
  blurPx: MotionBlur;
  parallax: MotionParallax;
}

// ============================================================================
// GEOMETRY TYPES
// ============================================================================

export interface FrameGeometry {
  shape: 'octagon' | 'diamond' | 'circle' | 'hexagon';
  strokeWidth: number;
  stroke: string;
  glow: 'none' | 'soft' | 'medium' | 'strong';
  vertices: number;
}

export interface DiamondGeometry {
  layers: number;
  rotationDegPerSec: number[];
  strokeWidths: number[];
}

export interface SquareGeometry {
  layers: number;
  sizes: number[];
  rotationDuration: number[];
}

export interface ParticleGeometry {
  count: number;
  sizePx: [number, number];
  opacity: number;
  driftSpeed: number;
}

export interface CornerGeometry {
  ornamentSize: number;
  ornamentOpacity: number;
}

export interface Geometry {
  frame: FrameGeometry;
  diamonds: DiamondGeometry;
  squares: SquareGeometry;
  particles: ParticleGeometry;
  corners: CornerGeometry;
}

// ============================================================================
// COMPONENT TYPES
// ============================================================================

export interface ButtonComponent {
  minHeight: string;
  paddingX: string;
  paddingY: string;
  fontSize: string;
  fontWeight: number;
  letterSpacing: string;
  textTransform: 'uppercase' | 'capitalize' | 'lowercase' | 'none';
  borderRadius: string;
  hoverLift: string;
  transitionDuration: string;
}

export interface InputComponent {
  minHeight: string;
  paddingX: string;
  paddingY: string;
  fontSize: string;
  borderRadius: string;
  borderWidth: string;
  focusRingWidth: string;
}

export interface CardComponent {
  padding: string;
  borderRadius: string;
  borderWidth: string;
  hoverLift: string;
  topBarHeight: string;
}

export interface SidebarComponent {
  width: string;
  collapsedWidth: string;
  itemPaddingY: string;
  itemPaddingX: string;
  itemRadius: string;
}

export interface TopbarComponent {
  height: string;
  searchMaxWidth: string;
}

export interface AvatarComponent {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ModalComponent {
  maxWidth: string;
  padding: string;
  borderRadius: string;
}

export interface Components {
  button: ButtonComponent;
  input: InputComponent;
  card: CardComponent;
  sidebar: SidebarComponent;
  topbar: TopbarComponent;
  avatar: AvatarComponent;
  modal: ModalComponent;
}

// ============================================================================
// SOUNDNESS (Design System Rules)
// ============================================================================

export interface Soundness {
  noPureWhite: boolean;
  noTrueBlack: boolean;
  accentUsage: 'edges-highlights-dividers-only' | 'everywhere' | 'minimal';
  noSpringPhysics: boolean;
  maxConcurrentAnimations: number;
  minContrastRatio: number;
  minTouchTarget: number;
}

// ============================================================================
// BREAKPOINTS & Z-INDEX
// ============================================================================

export interface Breakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ZIndex {
  base: number;
  dropdown: number;
  sticky: number;
  fixed: number;
  overlay: number;
  modal: number;
  popover: number;
  tooltip: number;
  toast: number;
}

// ============================================================================
// BASE THEME TYPE
// ============================================================================

export interface LobbiBaseTheme {
  soundness: Soundness;
  colors: BaseColors;
  type: Typography;
  radii: Radii;
  space: Space;
  shadows: Shadows;
  borders: Borders;
  materials: Materials;
  motion: Motion;
  geometry: Geometry;
  components: Components;
  breakpoints: Breakpoints;
  zIndex: ZIndex;
}

export interface ThemeContract {
  $schema?: string;
  version: string;
  name: string;
  description: string;
  lobbi: LobbiBaseTheme;
}

// ============================================================================
// ORG THEME TYPES
// ============================================================================

export interface OrgIdentity {
  personality: 'opulent' | 'serene' | 'ambitious' | 'organic' | 'regal';
  era: 'art-deco' | 'coastal-modern' | 'mountain-lodge' | 'botanical-modern' | 'royal-classic';
  mood: string;
}

export interface OrgAccentShift {
  hueDelta: number;
  satMul: number;
  lumMul: number;
}

export interface OrgMotionPersonality {
  cadenceMul: number;
  amplitudeMul: number;
  rotationMul: number;
}

export interface OrgBrandMark {
  showL: boolean;
  monogramOpacity: number;
}

export interface OrgConfig {
  mode: 'elastic' | 'static';
  accentShift: OrgAccentShift;
  motionPersonality: OrgMotionPersonality;
  brandMark: OrgBrandMark;
}

export interface OrgSurfaceColors {
  canvas: string;
  card: string;
  cardHover: string;
  panel: string;
  overlay: string;
}

export interface OrgSidebarColors {
  bg: string;
  text: string;
  textHover: string;
  activeText: string;
  activeBg: string;
  border: string;
}

export interface OrgColors {
  primary: ColorScale;
  primaryHex: string;
  primaryLight: string;
  primaryPale: string;
  primaryDark: string;
  primaryRgb: string;
  accent: ColorScale;
  surface: OrgSurfaceColors;
  sidebar: OrgSidebarColors;
}

export interface OrgGradients {
  brand: string;
  button: string;
  avatar: string;
  hero: string;
  glow: string;
}

export interface OrgPatterns {
  cardBg: string;
  accentPattern: string;
  borderStyle: 'solid' | 'double' | 'dashed';
  borderWidth: string;
  logoShape: 'diamond' | 'wave' | 'mountain' | 'leaf' | 'crown';
}

export interface OrgButtonStyles {
  primary: {
    bg: string;
    color: string;
    hoverBg: string;
    shadow: string;
    hoverShadow: string;
  };
  secondary: {
    bg: string;
    color: string;
    border: string;
    hoverBg: string;
  };
  ghost: {
    bg: string;
    color: string;
    hoverBg: string;
  };
}

export interface OrgInputStyles {
  bg: string;
  border: string;
  focusBorder: string;
  focusShadow: string;
}

export interface OrgCardStyles {
  topBar: string;
  border: string;
  shadow: string;
}

export interface OrgAvatarStyles {
  bg: string;
  border: string;
}

export interface OrgBadgeStyles {
  bg: string;
  color: string;
}

export interface OrgTooltipStyles {
  bg: string;
  color: string;
}

export interface OrgComponents {
  button: OrgButtonStyles;
  input: OrgInputStyles;
  card: OrgCardStyles;
  avatar: OrgAvatarStyles;
  badge: OrgBadgeStyles;
  tooltip: OrgTooltipStyles;
}

export interface OrgKpi {
  color: string;
  bg: string;
}

export interface OrgSemantic {
  kpiUp: OrgKpi;
  kpiDown: OrgKpi;
  activityDot: string;
  activityDotAlt: string;
}

export interface ChakraColors {
  brand: ColorScale;
}

export interface ChakraSemanticTokens {
  colors: {
    'brand.primary': string;
    'brand.secondary': string;
    'bg.canvas': string;
    'bg.surface': string;
    'text.primary': string;
    'text.secondary': string;
    'text.muted': string;
    'border.default': string;
    'border.accent': string;
  };
}

export interface ChakraThemeExtension {
  colors: ChakraColors;
  semanticTokens: ChakraSemanticTokens;
}

export interface OrgTheme {
  $schema?: string;
  orgId: string;
  name: string;
  short: string;
  motto: string;
  logoLetter: string;
  identity: OrgIdentity;
  colors: OrgColors;
  gradients: OrgGradients;
  patterns: OrgPatterns;
  org: OrgConfig;
  components: OrgComponents;
  semantic: OrgSemantic;
  chakra: ChakraThemeExtension;
}

// ============================================================================
// ORG IDS (Type-safe org identifiers)
// ============================================================================

export type OrgId =
  | 'luxe-haven'
  | 'pacific-club'
  | 'summit-group'
  | 'verde-collective'
  | 'crown-estates';

export const ORG_IDS: OrgId[] = [
  'luxe-haven',
  'pacific-club',
  'summit-group',
  'verde-collective',
  'crown-estates'
];

// ============================================================================
// THEME CONTEXT TYPES
// ============================================================================

export interface ThemeContextValue {
  baseTheme: LobbiBaseTheme;
  orgTheme: OrgTheme | null;
  currentOrg: OrgId | null;
  setOrg: (orgId: OrgId) => void;
  getCSSVariable: (path: string) => string;
  getToken: <T>(path: string) => T;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ThemeOverrides = DeepPartial<OrgTheme>;

// CSS Custom Property generation
export type CSSVariableName = `--lobbi-${string}`;
export type CSSVariableMap = Record<CSSVariableName, string>;

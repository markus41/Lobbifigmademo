/**
 * CSS Variable Generator
 *
 * Converts theme tokens into CSS custom properties and injects them into the DOM.
 * Supports dynamic org-based theming at runtime.
 */

import type {
  LobbiBaseTheme,
  OrgTheme,
  CSSVariableName,
  CSSVariableMap,
} from '../types/theme.types';

// ============================================================================
// VARIABLE NAME UTILITIES
// ============================================================================

/**
 * Converts a nested object path to a CSS variable name
 * @example pathToVarName(['colors', 'primary', '500']) -> '--lobbi-colors-primary-500'
 */
function pathToVarName(path: string[]): CSSVariableName {
  return `--lobbi-${path.join('-')}` as CSSVariableName;
}

/**
 * Flattens a nested object into CSS variable entries
 */
function flattenObject(
  obj: Record<string, unknown>,
  prefix: string[] = []
): Array<[CSSVariableName, string]> {
  const entries: Array<[CSSVariableName, string]> = [];

  for (const [key, value] of Object.entries(obj)) {
    const path = [...prefix, key];

    if (value === null || value === undefined) {
      continue;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      entries.push(...flattenObject(value as Record<string, unknown>, path));
    } else if (Array.isArray(value)) {
      // Convert arrays to comma-separated strings (for easing curves, etc.)
      entries.push([pathToVarName(path), value.join(', ')]);
    } else {
      // Convert primitives to strings
      entries.push([pathToVarName(path), String(value)]);
    }
  }

  return entries;
}

// ============================================================================
// GENERATE CSS VARIABLES
// ============================================================================

/**
 * Generates CSS custom properties from base and org themes
 */
export function generateCSSVariables(
  baseTheme: LobbiBaseTheme,
  orgTheme: OrgTheme | null
): CSSVariableMap {
  const variables: CSSVariableMap = {};

  // Generate base theme variables
  const baseEntries = flattenObject(baseTheme as unknown as Record<string, unknown>);
  for (const [name, value] of baseEntries) {
    variables[name] = value;
  }

  // Override with org theme variables if present
  if (orgTheme) {
    // Colors
    if (orgTheme.colors) {
      const colorEntries = flattenObject(
        orgTheme.colors as unknown as Record<string, unknown>,
        ['org', 'colors']
      );
      for (const [name, value] of colorEntries) {
        variables[name] = value;
      }

      // Primary color shortcuts
      variables['--lobbi-primary' as CSSVariableName] = orgTheme.colors.primaryHex;
      variables['--lobbi-primary-light' as CSSVariableName] = orgTheme.colors.primaryLight;
      variables['--lobbi-primary-pale' as CSSVariableName] = orgTheme.colors.primaryPale;
      variables['--lobbi-primary-dark' as CSSVariableName] = orgTheme.colors.primaryDark;
      variables['--lobbi-primary-rgb' as CSSVariableName] = orgTheme.colors.primaryRgb;
    }

    // Gradients
    if (orgTheme.gradients) {
      const gradientEntries = flattenObject(
        orgTheme.gradients as unknown as Record<string, unknown>,
        ['org', 'gradients']
      );
      for (const [name, value] of gradientEntries) {
        variables[name] = value;
      }
    }

    // Patterns
    if (orgTheme.patterns) {
      const patternEntries = flattenObject(
        orgTheme.patterns as unknown as Record<string, unknown>,
        ['org', 'patterns']
      );
      for (const [name, value] of patternEntries) {
        variables[name] = value;
      }
    }

    // Components
    if (orgTheme.components) {
      const componentEntries = flattenObject(
        orgTheme.components as unknown as Record<string, unknown>,
        ['org', 'components']
      );
      for (const [name, value] of componentEntries) {
        variables[name] = value;
      }
    }

    // Semantic
    if (orgTheme.semantic) {
      const semanticEntries = flattenObject(
        orgTheme.semantic as unknown as Record<string, unknown>,
        ['org', 'semantic']
      );
      for (const [name, value] of semanticEntries) {
        variables[name] = value;
      }
    }

    // Org identity
    if (orgTheme.identity) {
      variables['--lobbi-org-personality' as CSSVariableName] = orgTheme.identity.personality;
      variables['--lobbi-org-era' as CSSVariableName] = orgTheme.identity.era;
      variables['--lobbi-org-mood' as CSSVariableName] = orgTheme.identity.mood;
    }

    // Org config
    if (orgTheme.org) {
      const orgConfigEntries = flattenObject(
        orgTheme.org as unknown as Record<string, unknown>,
        ['org', 'config']
      );
      for (const [name, value] of orgConfigEntries) {
        variables[name] = value;
      }
    }

    // Org metadata
    variables['--lobbi-org-id' as CSSVariableName] = orgTheme.orgId;
    variables['--lobbi-org-name' as CSSVariableName] = orgTheme.name;
    variables['--lobbi-org-short' as CSSVariableName] = orgTheme.short;
    variables['--lobbi-org-motto' as CSSVariableName] = orgTheme.motto;
    variables['--lobbi-org-logo-letter' as CSSVariableName] = orgTheme.logoLetter;
  }

  return variables;
}

// ============================================================================
// INJECT CSS VARIABLES
// ============================================================================

const STYLE_ID = 'lobbi-theme-variables';

/**
 * Injects CSS variables into the document
 */
export function injectCSSVariables(variables: CSSVariableMap): void {
  // Remove existing style element
  const existing = document.getElementById(STYLE_ID);
  if (existing) {
    existing.remove();
  }

  // Build CSS content
  const cssContent = Object.entries(variables)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n');

  const fullCSS = `:root {\n${cssContent}\n}`;

  // Create and inject style element
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = fullCSS;
  document.head.appendChild(style);
}

/**
 * Removes injected CSS variables
 */
export function removeCSSVariables(): void {
  const existing = document.getElementById(STYLE_ID);
  if (existing) {
    existing.remove();
  }
}

// ============================================================================
// CSS VARIABLE HELPERS
// ============================================================================

/**
 * Creates a CSS var() reference
 * @example cssVar('primary') -> 'var(--lobbi-primary)'
 */
export function cssVar(name: string, fallback?: string): string {
  const varName = name.startsWith('--lobbi-') ? name : `--lobbi-${name}`;
  return fallback ? `var(${varName}, ${fallback})` : `var(${varName})`;
}

/**
 * Creates a CSS var() reference with RGB support for opacity
 * @example cssVarRgba('primary-rgb', 0.5) -> 'rgba(var(--lobbi-primary-rgb), 0.5)'
 */
export function cssVarRgba(rgbVarName: string, opacity: number): string {
  const varName = rgbVarName.startsWith('--lobbi-') ? rgbVarName : `--lobbi-${rgbVarName}`;
  return `rgba(var(${varName}), ${opacity})`;
}

/**
 * Gets the computed value of a CSS variable
 */
export function getComputedCSSVar(name: string): string {
  const varName = name.startsWith('--lobbi-') ? name : `--lobbi-${name}`;
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

/**
 * Sets a CSS variable at runtime
 */
export function setCSSVar(name: string, value: string): void {
  const varName = name.startsWith('--lobbi-') ? name : `--lobbi-${name}`;
  document.documentElement.style.setProperty(varName, value);
}

// ============================================================================
// MOTION HELPERS
// ============================================================================

/**
 * Creates a CSS transition string using theme motion values
 */
export function createTransition(
  properties: string | string[],
  durationVar = 'motion-durationMs-normal',
  easingVar = 'motion-easingCSS-luxInOut'
): string {
  const props = Array.isArray(properties) ? properties : [properties];
  const duration = cssVar(durationVar);
  const easing = cssVar(easingVar);

  return props.map(prop => `${prop} ${duration}ms ${easing}`).join(', ');
}

/**
 * Creates a CSS animation using theme motion values
 */
export function createAnimation(
  name: string,
  durationVar = 'motion-durationMs-normal',
  easingVar = 'motion-easingCSS-luxInOut',
  iterations: string | number = 1,
  fillMode = 'forwards'
): string {
  return `${name} ${cssVar(durationVar)}ms ${cssVar(easingVar)} ${iterations} ${fillMode}`;
}

// ============================================================================
// GRADIENT HELPERS
// ============================================================================

/**
 * Creates an org-aware gradient with fallback
 */
export function orgGradient(
  type: 'brand' | 'button' | 'avatar' | 'hero' | 'glow',
  fallback?: string
): string {
  return cssVar(`org-gradients-${type}`, fallback);
}

/**
 * Creates an org-aware surface color
 */
export function orgSurface(
  type: 'canvas' | 'card' | 'cardHover' | 'panel' | 'overlay',
  fallback?: string
): string {
  return cssVar(`org-colors-surface-${type}`, fallback);
}

// ============================================================================
// SHADOW HELPERS
// ============================================================================

/**
 * Creates a shadow using org primary color
 */
export function orgShadow(intensity: 'soft' | 'medium' | 'strong' = 'soft'): string {
  const opacities = { soft: 0.15, medium: 0.25, strong: 0.35 };
  return `0 8px 32px ${cssVarRgba('primary-rgb', opacities[intensity])}`;
}

/**
 * Creates a glow effect using org primary color
 */
export function orgGlow(intensity: 'soft' | 'medium' | 'strong' = 'soft'): string {
  const opacities = { soft: 0.2, medium: 0.35, strong: 0.5 };
  return `0 0 40px -10px ${cssVarRgba('primary-rgb', opacities[intensity])}`;
}

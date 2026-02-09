/**
 * Lobbi Design System - Semantic Tokens
 *
 * Semantic tokens that map to base tokens and support org-specific conditions.
 * These tokens provide the org-aware theming layer.
 */

import { defineSemanticTokens } from '@chakra-ui/react'

/**
 * Semantic Color Tokens
 *
 * These tokens use Chakra v3 conditions for org-specific theming.
 * Each org condition (e.g., _luxeHaven) maps to the data-org attribute.
 */
export const semanticTokens = defineSemanticTokens({
  colors: {
    // =========================================================================
    // BRAND COLORS - Primary org identity
    // =========================================================================
    'brand.primary': {
      value: {
        base: '{colors.gold.400}',
        _dark: '{colors.gold.300}',
        // Org overrides
        _luxeHaven: '{colors.gold.400}',
        _pacificClub: '{colors.ocean.500}',
        _summitGroup: '{colors.earth.500}',
        _verdeCollective: '{colors.forest.500}',
        _crownEstates: '{colors.royal.500}',
        _obsidianSociety: '{colors.obsidian.500}',
        _roseMeridian: '{colors.rose.500}',
        _arcticCircle: '{colors.arctic.500}',
        _flameStone: '{colors.flame.500}',
        _marigoldSociety: '{colors.marigold.500}',
        _midnightAzure: '{colors.midnight.500}',
        _jadeDynasty: '{colors.jade.500}',
        _copperOak: '{colors.copper.500}',
        _lavenderFields: '{colors.lavender.500}',
        _slateModern: '{colors.slate.500}',
        _neonDistrict: '{colors.neon.500}',
        _zenGarden: '{colors.zen.500}',
        _theForge: '{colors.forge.500}',
        _goldenEra: '{colors.goldenEra.500}',
        _pixelPioneers: '{colors.pixel.500}',
      },
    },

    'brand.secondary': {
      value: {
        base: '{colors.gold.700}',
        _dark: '{colors.gold.600}',
        _luxeHaven: '{colors.gold.700}',
        _pacificClub: '{colors.ocean.700}',
        _summitGroup: '{colors.earth.700}',
        _verdeCollective: '{colors.forest.700}',
        _crownEstates: '{colors.royal.700}',
        _obsidianSociety: '{colors.obsidian.700}',
        _roseMeridian: '{colors.rose.700}',
        _arcticCircle: '{colors.arctic.700}',
        _flameStone: '{colors.flame.700}',
        _marigoldSociety: '{colors.marigold.700}',
        _midnightAzure: '{colors.midnight.700}',
        _jadeDynasty: '{colors.jade.700}',
        _copperOak: '{colors.copper.700}',
        _lavenderFields: '{colors.lavender.700}',
        _slateModern: '{colors.slate.700}',
        _neonDistrict: '{colors.neon.700}',
        _zenGarden: '{colors.zen.700}',
        _theForge: '{colors.forge.700}',
        _goldenEra: '{colors.goldenEra.700}',
        _pixelPioneers: '{colors.pixel.700}',
      },
    },

    'brand.light': {
      value: {
        base: '{colors.gold.200}',
        _dark: '{colors.gold.400}',
        _luxeHaven: '{colors.gold.200}',
        _pacificClub: '{colors.ocean.300}',
        _summitGroup: '{colors.earth.300}',
        _verdeCollective: '{colors.forest.300}',
        _crownEstates: '{colors.royal.300}',
        _obsidianSociety: '{colors.obsidian.300}',
        _roseMeridian: '{colors.rose.300}',
        _arcticCircle: '{colors.arctic.300}',
        _flameStone: '{colors.flame.300}',
        _marigoldSociety: '{colors.marigold.300}',
        _midnightAzure: '{colors.midnight.300}',
        _jadeDynasty: '{colors.jade.300}',
        _copperOak: '{colors.copper.300}',
        _lavenderFields: '{colors.lavender.300}',
        _slateModern: '{colors.slate.300}',
        _neonDistrict: '{colors.neon.300}',
        _zenGarden: '{colors.zen.300}',
        _theForge: '{colors.forge.300}',
        _goldenEra: '{colors.goldenEra.300}',
        _pixelPioneers: '{colors.pixel.300}',
      },
    },

    'brand.pale': {
      value: {
        base: '{colors.gold.50}',
        _dark: '{colors.gold.900}',
        _luxeHaven: '{colors.gold.50}',
        _pacificClub: '{colors.ocean.50}',
        _summitGroup: '{colors.earth.50}',
        _verdeCollective: '{colors.forest.50}',
        _crownEstates: '{colors.royal.50}',
        _obsidianSociety: '{colors.obsidian.50}',
        _roseMeridian: '{colors.rose.50}',
        _arcticCircle: '{colors.arctic.50}',
        _flameStone: '{colors.flame.50}',
        _marigoldSociety: '{colors.marigold.50}',
        _midnightAzure: '{colors.midnight.50}',
        _jadeDynasty: '{colors.jade.50}',
        _copperOak: '{colors.copper.50}',
        _lavenderFields: '{colors.lavender.50}',
        _slateModern: '{colors.slate.50}',
        _neonDistrict: '{colors.neon.50}',
        _zenGarden: '{colors.zen.50}',
        _theForge: '{colors.forge.50}',
        _goldenEra: '{colors.goldenEra.50}',
        _pixelPioneers: '{colors.pixel.50}',
      },
    },

    // =========================================================================
    // BACKGROUND COLORS
    // =========================================================================
    'bg.canvas': {
      value: {
        base: '{colors.cream.50}',
        _dark: '{colors.night.900}',
      },
    },

    'bg.surface': {
      value: {
        base: '{colors.white}',
        _dark: '{colors.night.600}',
      },
    },

    'bg.subtle': {
      value: {
        base: '{colors.cream.100}',
        _dark: '{colors.night.400}',
      },
    },

    'bg.muted': {
      value: {
        base: '{colors.cream.200}',
        _dark: '{colors.night.200}',
      },
    },

    'bg.emphasized': {
      value: {
        base: '{colors.cream.300}',
        _dark: '{colors.night.50}',
      },
    },

    'bg.inverted': {
      value: {
        base: '{colors.dark.500}',
        _dark: '{colors.cream.50}',
      },
    },

    'bg.brand': {
      value: {
        base: '{colors.brand.primary}',
        _dark: '{colors.brand.primary}',
      },
    },

    'bg.brandSubtle': {
      value: {
        base: '{colors.brand.pale}',
        _dark: '{colors.brand.secondary}',
      },
    },

    // =========================================================================
    // TEXT COLORS
    // =========================================================================
    'text.primary': {
      value: {
        base: '{colors.dark.50}',
        _dark: '{colors.cream.100}',
      },
    },

    'text.secondary': {
      value: {
        base: '{colors.dark.400}',
        _dark: '{colors.cream.400}',
      },
    },

    'text.muted': {
      value: {
        base: '{colors.cream.800}',
        _dark: '{colors.cream.600}',
      },
    },

    'text.subtle': {
      value: {
        base: '{colors.cream.700}',
        _dark: '{colors.cream.700}',
      },
    },

    'text.inverted': {
      value: {
        base: '{colors.cream.50}',
        _dark: '{colors.dark.50}',
      },
    },

    'text.brand': {
      value: {
        base: '{colors.brand.primary}',
        _dark: '{colors.brand.light}',
      },
    },

    'text.onBrand': {
      value: {
        base: '{colors.white}',
        _dark: '{colors.white}',
      },
    },

    // =========================================================================
    // BORDER COLORS
    // =========================================================================
    'border.default': {
      value: {
        base: '{colors.cream.300}',
        _dark: '{colors.night.50}',
      },
    },

    'border.subtle': {
      value: {
        base: '{colors.cream.200}',
        _dark: '{colors.night.300}',
      },
    },

    'border.muted': {
      value: {
        base: '{colors.cream.100}',
        _dark: '{colors.night.500}',
      },
    },

    'border.accent': {
      value: {
        base: '{colors.brand.primary}/35',
        _dark: '{colors.brand.primary}/35',
      },
    },

    'border.focus': {
      value: {
        base: '{colors.brand.primary}',
        _dark: '{colors.brand.light}',
      },
    },

    'border.error': {
      value: {
        base: '{colors.error.500}',
        _dark: '{colors.error.400}',
      },
    },

    // =========================================================================
    // STATUS COLORS (Semantic)
    // =========================================================================
    'status.success': {
      value: {
        base: '{colors.success.600}',
        _dark: '{colors.success.400}',
      },
    },

    'status.success.bg': {
      value: {
        base: '{colors.success.50}',
        _dark: '{colors.success.950}',
      },
    },

    'status.warning': {
      value: {
        base: '{colors.warning.600}',
        _dark: '{colors.warning.400}',
      },
    },

    'status.warning.bg': {
      value: {
        base: '{colors.warning.50}',
        _dark: '{colors.warning.950}',
      },
    },

    'status.error': {
      value: {
        base: '{colors.error.600}',
        _dark: '{colors.error.400}',
      },
    },

    'status.error.bg': {
      value: {
        base: '{colors.error.50}',
        _dark: '{colors.error.950}',
      },
    },

    'status.info': {
      value: {
        base: '{colors.info.600}',
        _dark: '{colors.info.400}',
      },
    },

    'status.info.bg': {
      value: {
        base: '{colors.info.50}',
        _dark: '{colors.info.950}',
      },
    },

    // =========================================================================
    // COMPONENT-SPECIFIC TOKENS
    // =========================================================================

    // Sidebar
    'sidebar.bg': {
      value: {
        base: '{colors.dark.400}',
        _dark: '{colors.dark.500}',
      },
    },

    'sidebar.text': {
      value: {
        base: '{colors.cream.300}',
        _dark: '{colors.cream.400}',
      },
    },

    'sidebar.textMuted': {
      value: {
        base: '{colors.cream.600}',
        _dark: '{colors.cream.700}',
      },
    },

    'sidebar.accent': {
      value: {
        base: '{colors.brand.primary}',
        _dark: '{colors.brand.light}',
      },
    },

    'sidebar.hover': {
      value: {
        base: '{colors.brand.primary}/10',
        _dark: '{colors.brand.primary}/15',
      },
    },

    'sidebar.active': {
      value: {
        base: '{colors.brand.primary}/20',
        _dark: '{colors.brand.primary}/25',
      },
    },

    // Input
    'input.bg': {
      value: {
        base: '{colors.white}',
        _dark: '{colors.night.400}',
      },
    },

    'input.border': {
      value: {
        base: '{colors.cream.300}',
        _dark: '{colors.night.50}',
      },
    },

    'input.placeholder': {
      value: {
        base: '{colors.cream.600}',
        _dark: '{colors.cream.700}',
      },
    },

    'input.focus': {
      value: {
        base: '{colors.brand.primary}',
        _dark: '{colors.brand.light}',
      },
    },

    // Card
    'card.bg': {
      value: {
        base: '{colors.white}',
        _dark: '{colors.night.600}',
      },
    },

    'card.border': {
      value: {
        base: '{colors.cream.300}',
        _dark: '{colors.night.50}',
      },
    },

    'card.topBar': {
      value: {
        base: 'linear-gradient(90deg, {colors.brand.secondary}, {colors.brand.primary}, {colors.brand.secondary})',
        _dark: 'linear-gradient(90deg, {colors.brand.secondary}, {colors.brand.primary}, {colors.brand.secondary})',
      },
    },

    // Button
    'button.primary.bg': {
      value: {
        base: '{colors.brand.primary}',
        _dark: '{colors.brand.primary}',
      },
    },

    'button.primary.hover': {
      value: {
        base: '{colors.brand.secondary}',
        _dark: '{colors.brand.light}',
      },
    },

    'button.secondary.bg': {
      value: {
        base: 'transparent',
        _dark: 'transparent',
      },
    },

    'button.secondary.border': {
      value: {
        base: '{colors.brand.primary}/40',
        _dark: '{colors.brand.primary}/40',
      },
    },

    // Avatar
    'avatar.bg': {
      value: {
        base: 'linear-gradient(135deg, {colors.brand.light}, {colors.brand.primary}, {colors.brand.secondary})',
        _dark: 'linear-gradient(135deg, {colors.brand.light}, {colors.brand.primary}, {colors.brand.secondary})',
      },
    },

    'avatar.border': {
      value: {
        base: '{colors.brand.primary}/40',
        _dark: '{colors.brand.primary}/40',
      },
    },

    // Tooltip (replacing hardcoded dark.500/cream.100 references)
    'tooltip.bg': {
      value: {
        base: '{colors.dark.500}',
        _dark: '{colors.night.400}',
      },
    },

    'tooltip.text': {
      value: {
        base: '{colors.cream.100}',
        _dark: '{colors.cream.200}',
      },
    },

    'tooltip.border': {
      value: {
        base: '{colors.dark.400}',
        _dark: '{colors.night.200}',
      },
    },

    // Glass morphism
    'glass.bg': {
      value: {
        base: 'rgba(255, 255, 255, 0.7)',
        _dark: 'rgba(20, 20, 22, 0.75)',
      },
    },

    'glass.border': {
      value: {
        base: 'rgba(255, 255, 255, 0.4)',
        _dark: 'rgba(255, 255, 255, 0.08)',
      },
    },

    // Interactive overlay
    'interactive.hover': {
      value: {
        base: '{colors.brand.primary}/8',
        _dark: '{colors.brand.primary}/12',
      },
    },

    'interactive.active': {
      value: {
        base: '{colors.brand.primary}/15',
        _dark: '{colors.brand.primary}/20',
      },
    },

    'interactive.focus': {
      value: {
        base: '{colors.brand.primary}/25',
        _dark: '{colors.brand.light}/30',
      },
    },
  },

  // =========================================================================
  // SPACING SEMANTIC TOKENS
  // =========================================================================
  spacing: {
    'container.padding': {
      value: {
        base: '{spacing.6}',
        _md: '{spacing.8}',
        _lg: '{spacing.12}',
      },
    },
    'section.gap': {
      value: '{spacing.8}',
    },
    'card.padding': {
      value: '{spacing.5}',
    },
  },

  // =========================================================================
  // SHADOW SEMANTIC TOKENS
  // =========================================================================
  shadows: {
    'elevation.low': {
      value: {
        base: '{shadows.sm}',
        _dark: '{shadows.dark-lg}',
      },
    },
    'elevation.medium': {
      value: {
        base: '{shadows.md}',
        _dark: '{shadows.dark-lg}',
      },
    },
    'elevation.high': {
      value: {
        base: '{shadows.lg}',
        _dark: '{shadows.dark-xl}',
      },
    },
    'brand.glow': {
      value: {
        base: '{shadows.goldSoft}',
        _dark: '{shadows.goldGlow}',
      },
    },
  },

  // =========================================================================
  // RADIUS SEMANTIC TOKENS
  // =========================================================================
  radii: {
    'component.button': {
      value: '{radii.button}',
    },
    'component.input': {
      value: '{radii.input}',
    },
    'component.card': {
      value: '{radii.card}',
    },
    'component.modal': {
      value: '{radii.modal}',
    },
  },
})

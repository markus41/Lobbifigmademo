import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  ...defaultConfig,
  preflight: true,
  strictTokens: false,
  theme: {
    ...defaultConfig.theme,
    tokens: {
      ...defaultConfig.theme?.tokens,
      fonts: {
        heading: { value: "'Playfair Display', Georgia, serif" },
        body: { value: "'DM Sans', 'Inter', system-ui, sans-serif" },
        mono: { value: "'JetBrains Mono', 'Fira Code', monospace" },
      },
    },
  },
  globalCss: {
    'html, body': {
      margin: 0,
      padding: 0,
    },
  },
  conditions: {
    ...defaultConfig.conditions,
    light: '[data-theme="light"] &, &.light, .light &',
    dark: '[data-theme="dark"] &, &.dark, .dark &',
    luxeHaven: '[data-org="luxe-haven"] &',
    pacificClub: '[data-org="pacific-club"] &',
    summitGroup: '[data-org="summit-group"] &',
    verdeCollective: '[data-org="verde-collective"] &',
    crownEstates: '[data-org="crown-estates"] &',
    obsidianSociety: '[data-org="obsidian-society"] &',
    roseMeridian: '[data-org="rose-meridian"] &',
    arcticCircle: '[data-org="arctic-circle"] &',
    flameStone: '[data-org="flame-stone"] &',
    marigoldSociety: '[data-org="marigold-society"] &',
    midnightAzure: '[data-org="midnight-azure"] &',
    jadeDynasty: '[data-org="jade-dynasty"] &',
    copperOak: '[data-org="copper-oak"] &',
    lavenderFields: '[data-org="lavender-fields"] &',
    slateModern: '[data-org="slate-modern"] &',
    neonDistrict: '[data-org="neon-district"] &',
    zenGarden: '[data-org="zen-garden"] &',
    theForge: '[data-org="the-forge"] &',
    goldenEra: '[data-org="golden-era"] &',
    pixelPioneers: '[data-org="pixel-pioneers"] &',
  },
})

export const system = createSystem(config)
export { config }

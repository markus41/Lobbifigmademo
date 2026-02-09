# The Lobbi - Premium Membership Management Platform

> A design-first white-label SaaS demo showcasing premium UI/UX for luxury clubs and private communities.

**Live Demo:** https://markus41.github.io/Lobbifigmademo/

---

## Overview

**The Lobbi** transforms traditional HR/membership software into a luxury hospitality experience. Instead of corporate interfaces, it uses five-star hotel metaphors—members are "guests," directories become "registries," and AI assistants are "bellhops."

This is a **demo/showcase application** demonstrating:
- Multi-tenant white-label theming (20 pre-configured organizations)
- Cinematic UI transitions and micro-interactions
- Premium component library built on Chakra UI v3
- Accessible design (WCAG AA/AAA, dyslexic-friendly mode)
- Sprint-based feature demos for stakeholder presentations

---

## Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | React | 18.3.1 |
| **Language** | TypeScript | ~5.7.2 |
| **Build Tool** | Vite | 6.3.5 |
| **UI Framework** | **Chakra UI** | 3.3.0 |
| **CSS-in-JS** | Emotion | 11.14.0 |
| **Styling** | Tailwind CSS | 4.1.4 |
| **Animation** | Framer Motion / Motion | 12.7.4 |
| **Animation (Complex)** | GSAP | 3.14.0 |
| **Icons** | Lucide React | 0.511.0 |
| **Charts** | Recharts | 2.15.3 |
| **Forms** | react-hook-form + zod | 7.56.4 / 3.25.46 |
| **Drag & Drop** | @dnd-kit | 6.3.1 |
| **Date Utilities** | date-fns | 4.1.0 |
| **Deployment** | GitHub Pages | via Actions |

### Key Dependencies

```json
{
  "@chakra-ui/react": "^3.3.0",
  "@emotion/react": "^11.14.0",
  "@radix-ui/react-*": "various",
  "framer-motion": "^12.7.4",
  "gsap": "^3.14.0",
  "lucide-react": "^0.511.0",
  "recharts": "^2.15.3",
  "react-hook-form": "^7.56.4",
  "@dnd-kit/core": "^6.3.1",
  "tailwindcss": "^4.1.4",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.3.0"
}
```

---

## Project Architecture

```
Lobbifigmademo/
├── index.html                 # Entry point with SEO/meta tags
├── vite.config.ts             # Vite config (base: /Lobbifigmademo/)
├── package.json
├── tsconfig.json
├── CLAUDE.md                  # AI assistant context file
│
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Pages deployment
│
├── guidelines/
│   └── Guidelines.md          # Complete design system documentation
│
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   └── site.webmanifest
│
└── src/
    ├── main.tsx               # App entry, wraps with LobbiThemeProvider
    │
    ├── app/
    │   ├── App.tsx            # Root component, stage-based navigation
    │   │
    │   ├── components/
    │   │   ├── LandingPage.tsx
    │   │   ├── EmailSelection.tsx
    │   │   ├── OrgLogin.tsx
    │   │   ├── WelcomeScreen.tsx
    │   │   ├── DashboardEntryAnimation.tsx
    │   │   ├── Dashboard.tsx
    │   │   ├── DashboardPage.tsx
    │   │   ├── MemberPortal.tsx
    │   │   │
    │   │   ├── Sidebar.tsx
    │   │   ├── TopNav.tsx
    │   │   ├── Navigation.tsx
    │   │   ├── SearchDropdown.tsx
    │   │   ├── NotificationsPanel.tsx
    │   │   ├── UserProfileDropdown.tsx
    │   │   ├── AIBellhop.tsx
    │   │   │
    │   │   ├── GeometricOctagon.tsx
    │   │   ├── GeometricBackground.tsx
    │   │   ├── CinematicBackground.tsx
    │   │   ├── ParticlesCanvas.tsx
    │   │   │
    │   │   ├── pages/
    │   │   │   ├── RegistryPage.tsx
    │   │   │   ├── EventsPavilionPage.tsx
    │   │   │   ├── BusinessCenterPage.tsx
    │   │   │   ├── VaultPage.tsx
    │   │   │   ├── SettingsPage.tsx
    │   │   │   └── WizardsPage.tsx
    │   │   │
    │   │   ├── ui/            # [REMOVED] Previously shadcn/ui components
    │   │   │   # Now using Chakra UI v3 components exclusively
    │   │   │   ├── sheet.tsx
    │   │   │   ├── sidebar.tsx
    │   │   │   └── ... (60+ components)
    │   │   │
    │   │   ├── icons/
    │   │   │   └── LobbiIcons.tsx
    │   │   │
    │   │   ├── mobile/
    │   │   │   └── MembershipCard/
    │   │   │
    │   │   └── figma/
    │   │       └── ImageWithFallback.tsx
    │   │
    │   ├── data/
    │   │   └── themes.ts      # ~2400 lines: 20 org theme definitions
    │   │
    │   └── utils/
    │
    ├── components/
    │   └── demo/
    │       ├── PlatformDemoBanner.tsx
    │       └── sprint showcases/
    │
    ├── hooks/
    │   ├── useOrgColors.ts
    │   ├── useOrgGradients.ts
    │   ├── useOrgMotion.ts
    │   ├── useOrgTypography.ts
    │   └── ...
    │
    ├── theme/
    │   ├── ThemeProvider.v3.tsx  # Chakra v3 provider + org context
    │   ├── system.ts             # Chakra system config
    │   ├── foundations/
    │   ├── recipes/
    │   ├── tokens/
    │   └── org-overrides/
    │
    └── styles/
        ├── index.css          # Imports fonts, tailwind, theme
        ├── fonts.css          # Google Fonts imports
        ├── tailwind.css       # Tailwind v4 config
        └── theme.css          # ~1700 lines: CSS custom properties
```

---

## Multi-Tenant Theme System

### 20 Pre-Configured Organizations

| Organization | Primary Color | Style |
|--------------|---------------|-------|
| **Luxe Haven** | Gold #D4AF37 | Classic luxury, warm elegance |
| **Pacific Club** | Ocean Blue #0EA5E9 | Coastal, fresh, airy |
| **Summit Group** | Bronze #CD7F32 | Executive, distinguished |
| **Verde Collective** | Forest Green #059669 | Eco-luxury, natural |
| **Crown Estates** | Royal Purple #7C3AED | Regal, exclusive |
| **Obsidian Society** | Dark #18181B | Dark mode, mysterious |
| **Rose Meridian** | Coral #F43F5E | Warm, welcoming |
| **Arctic Circle** | Ice Blue #06B6D4 | Cool, crisp, modern |
| **Flame & Stone** | Burgundy #991B1B | Bold, passionate |
| **Marigold Society** | Marigold #F59E0B | Warm, cheerful |
| **Midnight Azure** | Deep Blue #1E3A8A | Professional, trustworthy |
| **Jade Dynasty** | Jade #047857 | Eastern luxury |
| **Copper Oak** | Copper #B45309 | Rustic elegance |
| **Lavender Fields** | Lavender #8B5CF6 | Soft, calming |
| **Slate Modern** | Slate #475569 | Minimalist, contemporary |
| **Neon District** | Neon #22D3EE | Cyberpunk, tech-forward |
| **Zen Garden** | Sage #84CC16 | Peaceful, harmonious |
| **The Forge** | Steel #6B7280 | Industrial, strong |
| **Golden Era** | Art Deco Gold #EAB308 | 1920s glamour |
| **Pixel Pioneers** | Electric #6366F1 | Gaming, digital |

### Theme Structure (per organization)

Each theme in `src/app/data/themes.ts` includes:

```typescript
{
  id: 'luxe-haven',
  name: 'Luxe Haven Resort',
  description: 'Classic luxury with warm golden elegance',
  
  colors: {
    primary: { 50-950 scale },
    secondary: { 50-950 scale },
    accent: { 50-950 scale },
    neutral: { 50-950 scale },
    success/warning/error/info: { semantic colors }
  },
  
  typography: {
    fontDisplay: 'Cormorant Garamond',
    fontBody: 'DM Sans',
    fontMono: 'JetBrains Mono',
    scale: { xs-6xl },
    weights: { light-black }
  },
  
  effects: {
    blur: { sm/md/lg/xl },
    glass: { opacity, blur, border },
    glow: { sm/md/lg with theme color },
    shadows: { sm/md/lg/xl }
  },
  
  borders: {
    radius: { none-full },
    width: { thin/medium/thick },
    style: 'solid' | 'double'
  },
  
  animation: {
    duration: { fast/normal/slow/slower },
    easing: { preset curves },
    enableParticles: boolean,
    enableGlow: boolean
  },
  
  gradients: {
    primary: 'linear-gradient(...)',
    surface: '...',
    accent: '...',
    button: '...'
  },
  
  patterns: {
    background: 'url(...) or gradient',
    overlay: '...'
  }
}
```

### CSS Custom Properties

All theme values cascade via CSS custom properties (`--t-*` tokens) in `src/styles/theme.css`:

```css
:root {
  /* Dynamic Theme Variables (set by JS) */
  --theme-primary: #D4AF37;
  --theme-primary-light: #F4D03F;
  --theme-primary-pale: #F5E6A3;
  --theme-primary-dark: #8B7330;
  --theme-primary-rgb: 212,175,55;
  
  /* Layout */
  --sidebar-width: 220px;
  --topbar-height: 52px;
  
  /* Shadows, spacing, radius... */
}

.dark {
  --background: #0A0A0A;
  --foreground: #F8F8FA;
  /* ... dark mode overrides */
}
```

---

## Application Flow (Stages)

The app uses a **stage-based navigation** system in `App.tsx`:

```
Stage 0: Landing Page
    └─> Geometric octagon animation, brand intro
    
Stage 1: Email Selection
    └─> Demo account picker (different roles/orgs)
    
Stage 2: Organization Login
    └─> Branded login screen for selected org
    
Stage 3: Welcome Screen
    └─> Personalized greeting with gradients
    
Stage 4: Dashboard Entry Animation
    └─> Cinematic transition into main app
    
Stage 5: Dashboard
    └─> Full admin interface
        ├── Front Desk (Dashboard home)
        ├── Registry (Member directory)
        ├── Events Pavilion (Calendar)
        ├── Business Center (Documents)
        ├── Vault (Secure files)
        └── Guest Services (Settings)
    
Stage 6: Member Portal
    └─> Mobile-first member view
```

---

## Key Features

### 1. Cinematic Loading & Transitions

- **GeometricOctagon**: Animated SVG logo on landing
- **ParticlesCanvas**: Floating particles on dark themes
- **CinematicBackground**: Gradient + blur backgrounds
- **DashboardEntryAnimation**: GSAP-powered entrance sequence
- All page transitions via Framer Motion's `AnimatePresence`

### 2. Admin Dashboard

```
┌──────────────────────────────────────────────────────────┐
│ TopNav: Search | Notifications | Profile                 │
├────────────┬─────────────────────────────────────────────┤
│            │                                             │
│  Sidebar   │  Main Content Area                          │
│  220px     │  (scrollable)                               │
│            │                                             │
│  • Front   │  ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│    Desk    │  │ KPI     │ │ KPI     │ │ KPI     │       │
│  • Registry│  │ Card    │ │ Card    │ │ Card    │       │
│  • Events  │  └─────────┘ └─────────┘ └─────────┘       │
│  • Business│                                             │
│  • Vault   │  ┌───────────────────────────────────┐     │
│  • Settings│  │ Activity Feed / Charts            │     │
│            │  └───────────────────────────────────┘     │
│            │                                             │
└────────────┴─────────────────────────────────────────────┘
```

### 3. AI Bellhop Assistant

- Slide-out panel chat interface
- Organization-themed styling
- Simulated AI responses

### 4. Demo Control System

```tsx
<PlatformDemoBanner>
  • Sprint Phase Selector (0-10)
  • User Role Switcher (Admin, Manager, Member, Guest)
  • Organization Switcher (20 themes)
  • Component Gallery Access
</PlatformDemoBanner>
```

### 5. Accessibility

- **WCAG AA/AAA** contrast compliance
- **Dyslexic-friendly mode**: OpenDyslexic font, increased spacing, warm backgrounds
- **Reduced motion**: Respects `prefers-reduced-motion`
- **High contrast mode**: Supports `prefers-contrast: high`
- **Focus indicators**: Visible focus rings on all interactive elements

---

## Design Language

### Voice & Metaphor

| Traditional Term | The Lobbi Term |
|------------------|----------------|
| Dashboard | Front Desk |
| Member Directory | Registry |
| Calendar | Events Pavilion |
| Documents | Business Center |
| File Storage | Vault |
| AI Assistant | Bellhop / Concierge |
| Settings | Guest Services |
| Notifications | Messages from the Desk |

### Typography

| Use Case | Font Family | Weight |
|----------|-------------|--------|
| Display/Headlines | Cormorant Garamond, Playfair Display, Cinzel | 600-700 |
| Body Text | DM Sans, Inter (fallback), Raleway | 400-500 |
| Monospace/Code | JetBrains Mono, Fira Code | 400 |

**Rules:**
- NEVER use Inter, Roboto, or Arial as primary fonts
- Display fonts for h1/h2 only
- Body fonts for everything else

### Color Philosophy

- **Never pure gray** — always warm-tinted neutrals
- **Gold as signature** — #D4AF37 is the brand anchor
- **Organization colors** — full 50-950 scale for each
- **Semantic colors** — consistent success/warning/error/info

### Animation Principles

1. **Cinematic loading** — dramatic entrance sequences
2. **Smooth micro-interactions** — 200-300ms ease curves
3. **Ambient effects** — subtle particles, glows on dark themes
4. **Purposeful motion** — animations serve UX, not decoration

---

## Configuration Files

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/Lobbifigmademo/',
  plugins: [
    tailwindcss(),
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### GitHub Actions Deploy

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main, master]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

---

## Component Library

### Chakra UI v3 Components (Primary)

Used via `@chakra-ui/react`:
- `Box`, `Flex`, `Grid`, `Stack`, `Center`
- `Text`, `Heading`
- `Button`, `IconButton`
- `Input`, `Textarea`, `Select`
- `Badge`, `Tag`
- `Avatar`
- `Spinner`, `Skeleton`

### Chakra UI v3 Components

**Primary UI Framework** (as of Feb 2025 refactoring)

All UI components are built using Chakra UI v3 primitives with custom recipes:
- Component recipes in `src/theme/recipes/` (button, checkbox, switch, etc.)
- Slot recipes in `src/theme/slot-recipes/` (card, dialog, form, table, etc.)
- Semantic tokens for org-specific theming
- Deep nesting format for multi-tenant support

**Note**: Previously used shadcn/ui (Radix-based) components were removed in favor of Chakra-only architecture.
- `label`, `menubar`, `navigation-menu`
- `pagination`, `popover`, `progress`
- `radio-group`, `resizable`, `scroll-area`
- `select`, `separator`, `sheet`
- `sidebar`, `skeleton`, `slider`
- `switch`, `table`, `tabs`
- `textarea`, `toggle`, `tooltip`

Built with:
- `@radix-ui/react-*` primitives
- `class-variance-authority` for variants
- `clsx` + `tailwind-merge` for class composition

---

## Recreation Guide

### Step 1: Initialize Project

```bash
npm create vite@latest the-lobbi -- --template react-ts
cd the-lobbi
```

### Step 2: Install Dependencies

```bash
# Core UI - Chakra UI v3 only
npm install @chakra-ui/react @emotion/react

# Animation
npm install motion gsap

# Styling utilities
npm install tailwindcss @tailwindcss/vite
npm install clsx tailwind-merge  # For cn() utility

# Utilities
npm install lucide-react recharts date-fns
npm install react-hook-form
npm install react-dnd react-dnd-html5-backend
npm install sonner  # Toast notifications
```

**Note**: As of Feb 2025, Radix UI dependencies and shadcn/ui components have been removed in favor of Chakra UI v3 exclusively.

### Step 3: Configure Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/your-repo-name/',
  plugins: [
    tailwindcss(),
    react({ jsxImportSource: '@emotion/react' }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

### Step 4: Set Up Chakra UI v3 Theme System

1. Create `src/theme/system.ts` with `createSystem(defineConfig(...))`
2. Define semantic tokens in `src/theme/tokens/semantic.ts`
3. Create recipes in `src/theme/recipes/` and `src/theme/slot-recipes/`
4. Create `src/theme/ThemeProvider.v3.tsx` with Chakra provider + org context
5. Create hooks: `useOrgColors`, `useOrgGradients`, `useOrgMotion`

See `CHAKRA_V3_REFACTOR_SUMMARY.md` for complete theme architecture.

### Step 5: Build Component Library

1. Use Chakra UI v3 primitives (`Box`, `Flex`, `Stack`, `Button`, etc.)
2. Create custom components with Chakra recipes
3. Create layout components: `Sidebar`, `TopNav`, `Dashboard`
4. Create page components: `RegistryPage`, `EventsPavilionPage`, etc.
5. Create animation components: `GeometricOctagon`, `ParticlesCanvas`

### Step 6: Implement Stage Navigation

```tsx
// App.tsx
const [stage, setStage] = useState<AppStage>('landing')

const stages = {
  landing: <LandingPage onContinue={() => setStage('email')} />,
  email: <EmailSelection onSelect={() => setStage('login')} />,
  login: <OrgLogin onLogin={() => setStage('welcome')} />,
  welcome: <WelcomeScreen onContinue={() => setStage('entry')} />,
  entry: <DashboardEntryAnimation onComplete={() => setStage('dashboard')} />,
  dashboard: <Dashboard />,
  portal: <MemberPortal />,
}
```

### Step 7: Deploy to GitHub Pages

1. Create `.github/workflows/deploy.yml`
2. Enable GitHub Pages in repo settings (Source: GitHub Actions)
3. Push to main branch

---

## Design System Documentation

Full design guidelines are in `guidelines/Guidelines.md` covering:

- **Responsive layouts** — CSS Grid/Flexbox patterns
- **Theme tokens** — `--t-*` CSS custom property system
- **Accessibility** — WCAG compliance, focus states, dyslexic mode
- **Brand identity** — Luxury hospitality voice and metaphors
- **Typography** — Font pairings, scale, weights
- **Color system** — 20 org themes with full scales
- **Layout architecture** — 220px sidebar, 52px topbar
- **Component patterns** — Cards, buttons, forms, tables
- **Motion/animation** — Cinematic loading, transitions, ambient effects
- **Do's and Don'ts** — Best practices and anti-patterns

---

## Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

---

## License

Private demo project. Not for redistribution.

---

## Contact

Built for **The Lobbi** — Premium Membership Management Software

Website: https://thelobbi.io  
Demo: https://markus41.github.io/Lobbifigmademo/

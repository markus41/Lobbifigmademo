**Add your own guidelines here**
<!--

# The Lobbi — Design System Guidelines

> *"Technology as refined as you are"*

These guidelines govern all UI generation for **The Lobbi**, a luxury hotel-themed HR/workforce management platform. Every screen, component, and interaction should feel like stepping into the lobby of a world-class hotel — sophisticated, warm, and effortlessly intuitive.

---

## General Rules

- Use **responsive layouts** built with CSS Grid and Flexbox. Only use absolute positioning for decorative overlays (filigree corners, ambient effects, grain textures).
- Keep file sizes lean. Extract shared design tokens, helper functions, and reusable primitives into their own files.
- Refactor as you go — clean, modular code reflects the brand's ethos of refinement.
- Every component must respect the **theme system**: all org-dependent colors flow through `--t-*` CSS custom properties so a single JSON swap re-skins the entire app per organization.
- Never hard-code brand colors inline. Always reference design tokens.
- Prioritize **accessibility**: minimum 4.5:1 contrast on body text, visible focus rings styled with the theme's primary color, and semantic HTML throughout.

---

## Brand Identity & Tone

The Lobbi replaces sterile HR software language with **luxury hospitality metaphors**:

| HR Concept | Lobbi Equivalent |
|---|---|
| Dashboard / Home | **The Front Desk** |
| Employee Directory | **The Registry** |
| Calendar / Events | **Events Pavilion** |
| Payroll / Financials | **The Ledger** |
| Team Management | **The Board Room** |
| Messaging / Chat | **Club Lounge** |
| Chapters / Divisions | **Chapters** |
| Document Center | **Business Center** |
| Secure Files | **The Vault** |
| Settings / Admin | **Guest Services** |
| Notifications | **The Bellhop** |
| AI Assistant | **Concierge** |
| Help / Support | **Room Service** |
| Onboarding | **Welcome Experience** |

**Voice**: Confident, warm, quietly commanding. Never clinical or corporate. Think five-star concierge, not call-center script.

**Copy guidelines**:
- Use sentence case for labels, title case for navigation items and page headings.
- Avoid jargon like "submit," "process," or "execute." Prefer "Confirm," "Complete," "Send."
- Empty states should feel inviting, not sterile — *"Nothing on the agenda yet"* rather than *"No data available."*

---

## Typography

| Role | Font | Weight | Size | Notes |
|---|---|---|---|---|
| Display / Headings | **Cormorant Garamond** | 300–600 | 26–54px | Serif, elegant. Use italic for emphasis and branded moments (logo "L", welcome names). |
| Body / UI | **DM Sans** | 300–600 | 11–14px | Clean sans-serif. Never use Inter, Roboto, or system fonts. |
| Labels / Overlines | **DM Sans** | 400–500 | 9–11px | Always uppercase, `letter-spacing: 0.15–0.45em`. |
| KPI Values | **Cormorant Garamond** | 600 | 22–32px | Large numerical displays get the serif treatment for gravitas. |
| Code / Mono | **JetBrains Mono** or **Fira Code** | 400 | 12px | Only for technical surfaces like integrations or developer settings. |

**Rules**:
- Never pair Cormorant Garamond headings with another serif. The contrast is always serif display + sans-serif body.
- Section labels (sidebar, card groups) use the `sb-section-label` pattern: 9px, uppercase, `letter-spacing: 0.18em`, themed primary color at 60% opacity.
- Breadcrumbs use 12px DM Sans with muted color; the active segment is `font-weight: 500` in dark text.

---

## Color System

### Default Theme (Luxe Haven — Gold)

| Token | Value | Usage |
|---|---|---|
| `--t-primary` | `#D4AF37` | Primary accent, active states, links |
| `--t-primary-light` | `#F4D03F` | Hover highlights, badge text |
| `--t-primary-pale` | `#F5E6A3` | Subtle backgrounds, gradient endpoints |
| `--t-primary-dark` | `#8B7330` | Gradient anchors, secondary icons |
| `--t-primary-rgb` | `212,175,55` | For `rgba()` compositions |
| `--cream` | `#FAF6E9` | Text on dark surfaces |
| `--black` | `#0A0806` | Cinematic backgrounds |
| `--black-warm` | `#1A1610` | Sidebar base |
| `--page-bg` | `#F7F4EE` | Dashboard page background |
| `--card-bg` | `#FFFFFF` | Card surfaces |
| `--card-border` | `#EDE8DD` | Subtle card borders |
| `--text-dark` | `#2C2A25` | Primary body text |
| `--text-muted` | `#8A8578` | Secondary text, timestamps |
| `--text-light` | `#B8B0A0` | Tertiary text, placeholders |

### Multi-Org Theme Architecture

Each organization defines a full `--t-*` token set. Themes are applied at the `:root` level via JavaScript on login. The five reference themes are:

- **Luxe Haven** — Gold (`#D4AF37`)
- **Pacific Club** — Ocean blue (`#2E6B8A`)
- **Summit Group** — Warm bronze (`#8B6B3E`)
- **Verde Collective** — Forest green (`#3D7B5F`)
- **Crown Estates** — Royal purple (`#6E3D7B`)

**Rules**:
- KPI card top-bars, metric progress fills, avatar backgrounds, sidebar active states, and button gradients ALL derive from `--t-*` tokens.
- Never introduce a semantic color (success green, error red) that conflicts with the org theme. Use subtle, desaturated versions: success `#3D7B5F`, warning `#B89E4A`, error `#B85C4A`.
- Status pills: positive changes use `kpi-up` (green text + 8% green bg), negative use `kpi-down` (warm red text + 8% red bg).

---

## Layout Architecture

### Shell Structure
```
┌──────────────────────────────────────────┐
│  Sidebar (220px, fixed)  │  Main Content │
│  - Org logo + motto      │  ┌──────────┐ │
│  - "Powered by Lobbi"    │  │  Topbar   │ │
│  - Nav sections           │  ├──────────┤ │
│  - User profile (bottom)  │  │  Content  │ │
│                            │  │  (scroll) │ │
│                            │  └──────────┘ │
└──────────────────────────────────────────┘
```

- **Sidebar**: `220px` wide, dark gradient (`#151412` → `#111110`), vertically scrollable with hidden scrollbar. Border-right uses `rgba(--t-primary-rgb, .08)`.
- **Topbar**: `52px` tall, white background, 1px bottom border. Contains breadcrumb (left), search bar (center, max `420px`), and actions (right: date, Concierge button, notifications, avatar).
- **Content area**: Scrollable with `24px 28px` padding, `24px` gap between sections. Custom scrollbar: 6px wide, themed border track.

### Responsive Behavior
- Below `1024px`: Sidebar collapses to icon-only (56px) mode with tooltip labels.
- Below `768px`: Sidebar becomes a slide-out drawer. Topbar search collapses to icon trigger.
- Content grids (`kpi-row`, `content-grid`) switch from multi-column to single-column stacking.

---

## Component Patterns

### Cards
- Background: `var(--card-bg)` with `1px solid var(--card-border)`
- Border-radius: `12px`
- Padding: `20–22px`
- Hover: `translateY(-2px)` + subtle box-shadow `0 4px 16px rgba(0,0,0,.06)`
- KPI cards get a `3px` themed gradient top-bar via `::before`

### Buttons

| Variant | Style | Usage |
|---|---|---|
| **Primary (Concierge)** | Gradient fill (`--t-gradient-btn`), white text, `border-radius: 8–10px` | Main CTAs, AI actions |
| **Secondary** | White bg, `1px` themed border, dark text | Quick actions, supporting CTAs |
| **Ghost** | No border, themed text | Inline links, "View all" |
| **Icon** | `32px` square, bordered, centered icon | Toolbar actions |

- All buttons: `font-family: 'DM Sans'`, `font-size: 11–13px`, `font-weight: 500–600`, `letter-spacing: 0.06–0.1em`.
- Primary buttons include a shimmer sweep on hover (pseudo-element `::after` translating a white gradient).
- Loading state: text fades out, centered spinner fades in (2px border, `spin` keyframe).

### Form Inputs
- Background: `rgba(255,255,255,.04)` on dark surfaces, `var(--page-bg)` on light.
- Border: `1px solid rgba(--t-primary-rgb, .15)` — sharpens to `.4` on focus.
- Focus ring: `box-shadow: 0 0 20px rgba(--t-primary-rgb, .08)`.
- Border-radius: `8–10px`.
- Placeholder color: `rgba(250,246,233,.25)` (dark) or `var(--text-muted)` (light).
- Labels: uppercase, 10px, themed primary at 60% opacity.
- Select dropdowns use a custom chevron arrow (SVG, 12px, themed color at 40% opacity).

### Sidebar Navigation
- Items: `9px` vertical padding, `12px` horizontal, `8px` border-radius.
- Default: `#C4BCAB` text, 60% opacity icons.
- Hover: `#F0ECE2` text, `rgba(255,255,255,.06)` background.
- Active: `var(--t-sidebar-active-text)` text, `var(--t-sidebar-active-bg)` background, 100% opacity icon in `var(--t-primary)`.
- Badges: `rgba(--t-primary-rgb, .18)` bg, themed light text, `10px` font, pill shape.

### Avatars
- Sizes: `32px` (topbar/sidebar), `36px` (lists), `130px` (profile).
- Shape: Circle for user avatars, `8px` rounded square for org logo marks.
- Fill: `var(--t-avatar-bg)` gradient with a subtle `::after` white-to-transparent overlay.
- Text: Cormorant Garamond, semibold, white initials.

### Tables & Lists
- Row borders: `1px solid rgba(0,0,0,.04)` — last child has no border.
- Activity items use a `7px` themed dot indicator (`.activity-dot`), with an `.alt` variant using `--t-primary-dark`.
- Performer rankings: #1 uses gradient-filled circle, #2 uses 15% themed bg, #3+ uses neutral 5% bg.

### Metric Bars
- Track: `6px` tall, `rgba(0,0,0,.04)`, `3px` border-radius.
- Fill: Themed gradient (`--t-metric1` through `--t-metric4`), animated width via `cubic-bezier(.22,1,.36,1)` over `1.5s`.
- Always include a target label below in muted 10px text.

---

## Motion & Animation

### Cinematic Loading Sequence (Login Flow)
The login experience has four orchestrated stages:

1. **Logo reveal** (0–4.5s): Ring draws via `stroke-dashoffset` animation, italic "L" scales in with blur dissolve, brand name characters cascade up with staggered delays, decorative line grows, tagline fades up.
2. **Login card** (4.5–5.2s): Card translates up from `24px` with backdrop blur.
3. **Welcome screen** (~1.2s after login): Greeting, name (with gradient text), org pill, role, motto, and timestamp all stagger in with `fadeUp` easing.
4. **Dashboard reveal** (~1s after welcome): Sidebar slides in from left, topbar slides down, content fades in, metric bars animate their widths.

### Standard Transitions
- Page/view transitions: `opacity` + `translateY` over `0.8–1.2s`, `cubic-bezier(.22,1,.36,1)`.
- Card hover: `translateY(-2px)` over `0.2s` with soft shadow.
- Button hover: `translateY(-1px)` + themed glow shadow.
- Input focus: border-color + box-shadow over `0.3s`.
- Never use `ease-in` alone — prefer `ease-out` or the custom cubic-bezier for organic deceleration.

### Ambient Effects (Dark Surfaces Only)
- **Particle system**: 60 floating golden particles with sine-wave drift, variable opacity (0.1–0.5), and soft glow (`shadowBlur`). Only active during cinematic stages.
- **Ambient radial**: `radial-gradient(ellipse 60% 50%)` with 6% themed primary color. Fades in over 3s.
- **Vignette**: Dark radial gradient overlay, `pointer-events: none`.
- **Film grain**: SVG noise texture at 2.5% opacity, shifting position via `steps(2)` keyframe.

These effects are **disabled** once the dashboard loads to preserve performance.

---

## Dashboard Tab System

The top navigation bar uses a horizontal tab strip inspired by enterprise HR systems (Dayforce/UKG pattern visible in the reference screenshots). Tabs include:

**Fixed tabs**: Company Hub, Home, Onboarding Review, My Dashboard
**Domain tabs** (toggleable): Payroll, Team, Time, Benefits, Accruals, Recruitment, Schedule, HR, Leave, Talent, Learning, Compensation, Succession
**Overflow**: "More Tabs (n)" dropdown for tabs that don't fit.
**Settings gear**: Opens "Edit Dashboard Tabs" modal with Custom Tabs, Domain Tabs, and System Tabs sub-panels. Each tab has a name field and a display toggle.

### Tab Rules
- Active tab: themed underline (3px), bold text.
- Inactive tabs: muted text, no underline.
- Tab bar sits below the welcome banner on Home, and directly below the global header on inner pages.
- Each domain tab can have its own sub-dashboard with icon shortcuts (e.g., Team tab shows Timesheets, Attendance, External Bench, Audit Reporting, Report Hub icons).

---

## Widget & Dashboard Content Patterns

### Quick-Action Icon Row
Horizontally scrollable row of circular icon buttons with labels beneath. Each icon sits in a `64px` circle with themed border/fill. Used on Home and domain tab dashboards. Clicking reveals a dropdown flyout with sub-options (e.g., "Time Off Requests" → Request On Employee Behalf, All Time Off Requests, Time off Calendar, Accrual Profile).

### "My Team" Widget
- Card with search bar, pagination info ("1 of 1 → 20 Rows"), select-all checkbox, and filter icon.
- Each team member row: checkbox, photo avatar (circle, `36–40px`), name (linked, themed color), clock-in timestamp.
- Three-dot overflow menu per row.

### Timesheet Approval Widget
- Header: "Timesheets awaiting my approval" with View / Approve / Reject action buttons.
- Filter bar: View dropdown, filter count badge, date range picker.
- Table columns: Grouped By, Timesheet Start, Timesheet End, Raw Hours, Calc. Hours.
- Empty state: illustration + "No data available / There's nothing to display."

### Clock Widget
- Displays current day, time (large Cormorant Garamond), timezone in brackets.
- "View my timesheet" link below.

### Payroll Dashboard
- Three-column layout: Payroll list (table with status groups), Pay Statement Records (line chart), Labor Distribution (pie chart by cost center).
- Payroll table groups by status (Open / Finalized), each row links to a specific pay period.

### Profile / Employee Record
- Header: Photo, name, Employee ID, Hired Date (with tenure calculation), Job Title.
- Tab strip: Main, Payroll, HR, + "Edit Tabs."
- Left sidebar: "Jump To" anchor links for widget sections.
- Widget sections are collapsible (`<details>`-style or accordion pattern).
- Sections include: Account Information, Base Compensation, Dates, Managers, Cost Centers, Personal Information, Badges, Account Demographics, Account Contacts, Extra Fields.

### Communicate Modal
- Full-screen overlay with left-sidebar "Jump to" nav: Employees, Email, iCalendar Attachment Configuration, Schedule.
- Employee selector with browse/search.
- Email form: header/footer toggles, template selector, From (required), Subject (required), rich text Message editor (bold, italic, underline, strikethrough, clear formatting, alignment, font/size selectors, lists, indent, blockquote, undo/redo, link, cut/copy/paste special, image, video, code view, table, text/highlight color, microphone).
- Footer: Close + Send buttons.

---

## Sidebar Navigation Menu (Full-Screen / Flyout)

When accessed from the hamburger or sidebar flyout, the navigation follows a two-panel pattern:

**Left panel**: Vertical icon list with labels — My Info, Team (active), Settings. Below that: Favorites, My Team, Time, Expenses, Accruals 2.0, Leave, Schedule, Benefits, HR, Talent, Learning, Compensation.

**Right panel**: Contextual content for the selected left-panel item. Favorites shows a gear icon and a list of bookmarked sections (HR Administration, Benefit Administration, Position Management, Managing Schedules, Managing Time, Time Off Requests, Compliance Hub, Forms Hub, Report Hub, Expense Tracking) — each with a chevron for drill-down.

---

## Do's and Don'ts

### Do
- Use the cinematic loading sequence for first-time entry; skip to dashboard on subsequent visits (remember-me).
- Apply theme tokens everywhere — even toast notifications and modal overlays should respect `--t-*`.
- Use Cormorant Garamond for moments of gravitas (KPI numbers, greetings, profile names).
- Include the "Powered by The Lobbi" mark with the italic "L" in the sidebar footer.
- Maintain the hotel metaphor consistently in labels and empty states.
- Use subtle filigree corner ornaments on elevated cards (login, modals).

### Don't
- Never use Inter, Roboto, Arial, or system fonts anywhere.
- Never use flat blue `#007bff` or bootstrap-style primary colors — everything goes through the theme system.
- Never show raw error codes or technical stack traces to users. Wrap in graceful, branded messaging.
- Never use purple-on-white gradients or generic "AI slop" aesthetics.
- Don't animate everything — reserve motion for stage transitions, first-paint reveals, and hover micro-interactions. The dashboard itself should feel calm.
- Don't break the sidebar/topbar/content shell pattern on any interior page.
-->

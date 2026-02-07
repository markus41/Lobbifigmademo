# The Lobbi - Comprehensive QA Audit Report

**URL:** https://markus41.github.io/Lobbifigmademo/
**Date:** February 7, 2026
**Tested On:** Desktop (1456x836 viewport)
**Demo Account:** Kathy Watts / Luxe Haven Resort
**Auditor:** Golden Armada QA Team

---

## Executive Summary

| Category | Count | Severity |
|----------|-------|----------|
| Critical Bugs | 6 | P0 |
| Dead Buttons | 35+ | P1 |
| UI/Visual Issues | 8 | P1-P2 |
| Accessibility Issues | 6 | P2 |
| Missing Pages/Features | 14 | P2 |

**Overall Assessment:** The demo showcases excellent visual design and several working features, but is not demo-ready due to critical navigation and wizard bugs. Approximately 40% of interactive elements are non-functional.

---

## Critical Bugs (P0)

### 1. Login Tabs - Content Mismatch (Magic Link <-> SSO Swapped)

| Field | Value |
|-------|-------|
| **Severity** | Critical |
| **Location** | Login Form > Tab Navigation |
| **Expected** | Magic Link tab shows email input; SSO tab shows provider buttons |
| **Actual** | Tabs are reversed - Magic Link shows SSO providers, SSO shows email form |
| **Impact** | User confusion, potentially blocks login flow |
| **Fix** | Swap tab content or tab labels |

### 2. Tab Title Shows "undefined | The Lobbi"

| Field | Value |
|-------|-------|
| **Severity** | Critical |
| **Location** | Browser tab title (post-login) |
| **Expected** | "Luxe Haven Resort \| The Lobbi" |
| **Actual** | "undefined \| The Lobbi" |
| **Root Cause** | Organization name not interpolated in document.title |
| **Fix** | `document.title = \`${org.name} | The Lobbi\`` |

### 3. Event Creation Wizard - "Next" Button Hidden Off-Screen

| Field | Value |
|-------|-------|
| **Severity** | Critical |
| **Location** | Events Pavilion > Create Event Modal |
| **Expected** | "Next" button visible and clickable |
| **Actual** | Button exists at x:1430, opacity:0.5 - outside visible modal area |
| **Additional Issues** | Step header buttons (Location, Tickets, Settings, Preview) don't navigate |
| **Impact** | Wizard is completely non-functional beyond Step 1 |
| **Fix** | Fix modal overflow CSS, wire up step navigation |

### 4. Event Creation Wizard - "Previous" Button on Step 1

| Field | Value |
|-------|-------|
| **Severity** | High |
| **Location** | Events Pavilion > Create Event Modal > Step 1 |
| **Expected** | No "Previous" button on first step |
| **Actual** | "Previous" button visible but leads nowhere |
| **Fix** | Conditionally hide when `currentStep === 1` |

### 5. No Way to Return from Member Portal to Admin Panel

| Field | Value |
|-------|-------|
| **Severity** | Critical |
| **Location** | Member Portal (mobile preview) |
| **Expected** | "Back to Admin" or close button |
| **Actual** | No exit mechanism exists |
| **Workaround** | Full page refresh (loses all state) |
| **Fix** | Add "Return to Admin" button in portal header |

### 6. No Login State Persistence / No URL Routing

| Field | Value |
|-------|-------|
| **Severity** | Critical |
| **Location** | Global |
| **Issues** | Single URL (#) for all states; no session persistence; back/forward buttons don't work |
| **Impact** | Any refresh dumps user to splash screen |
| **Fix** | Implement hash-based or history-based routing; add localStorage session |

---

## Dead Buttons (Non-Functional)

These buttons render correctly but produce no response when clicked.

### Dashboard (The Front Desk)

| Button | Status |
|--------|--------|
| "Add Member" quick action | Dead |
| "Send Message" quick action | Dead |
| "Create Event" quick action | Dead |
| "Upload Document" quick action | Dead |
| "View All" (Recent Activity) | Dead |
| "View Calendar" (Upcoming Events) | Dead |
| User avatar "KW" (top-right) | Dead - no dropdown menu |

### Business Center (All 8 Buttons Dead)

| Section | Buttons |
|---------|---------|
| Invoicing | Create Invoice, View All |
| Reports | Generate Report, Schedule |
| Vendor Management | Add Vendor, View All |
| Procurement | New Order, Catalog |

### Events Pavilion

| Button | Status |
|--------|--------|
| "Register Now" on all event cards | Dead |

### The Vault

| Element | Status |
|---------|--------|
| Folder clicks (e.g., "Board Documents") | Dead |
| Three-dot context menus on files/folders | Dead |
| "Upload File" button | Dead |

### Settings

| Button | Status |
|--------|--------|
| "Save Changes" | Dead (no feedback) |
| "Change Password" | Dead |
| "Active Sessions" | Dead |
| "Upgrade Plan" | Dead |
| "View Invoices" | Dead |
| "Disconnect" (LinkedIn/Google) | Dead |
| "Connect" (Microsoft) | Dead |

### Login Page

| Link | Status |
|------|--------|
| "Forgot password?" | Dead (href="#") |

### Member Portal

| Element | Status |
|---------|--------|
| "Register" buttons on events | Dead |
| Notification items | Dead (no detail view) |
| "View All" (Upcoming Events) | Dead |
| "Payments" quick tile | Dead |
| "Documents" quick tile | Dead |
| "Messages" quick tile | Dead |
| "Profile" quick tile | Dead |
| "Card" quick tile | Dead |

---

## UI / Visual Issues

### 1. Login Form - Password Tab Disappears Temporarily

**Issue:** When switching tabs, password form vanishes for ~2 seconds before reappearing.
**Cause:** Transition animation leaves form area blank.
**Severity:** Medium

### 2. Login Screen Overlap During Fast Navigation

**Issue:** Account selector and login form briefly overlap when clicking quickly.
**Cause:** Race condition in screen transition state.
**Severity:** Medium

### 3. Dashboard Stat Cards - Inconsistent Color Coding

**Issue:** "Active Members" shows red "-2.1%" (1,284 members - not alarming); "Upcoming Events" shows green "+8%" (24 events).
**Suggestion:** Define clear thresholds or use neutral colors.
**Severity:** Low

### 4. Member Portal - Member ID Changes on Each Visit

**Issue:** Member ID regenerates randomly (e.g., "MBR-2024-4268" vs "MBR-2024-3972").
**Expected:** Fixed identifier per user.
**Severity:** Medium

### 5. Dark Mode Toggle - Non-Functional in Settings

**Issue:** Toggle turns gold but no dark theme applies.
**Location:** Settings > Appearance
**Severity:** Medium

### 6. Dark Mode Toggle - Partial in Accessibility Menu

**Issue:** Only input fields darken; page background, sidebar, and header remain light. Section headings become invisible.
**Location:** Accessibility dropdown
**Severity:** High

### 7. Search Bar - Only Returns "No Results"

**Issue:** Global search always returns "No results found" even for visible members.
**Tested:** "James", "Sarah" - both visible on page, both return no results.
**Severity:** High

### 8. Sidebar Collapse Button - Incomplete Behavior

**Issue:** Chevron toggles but sidebar doesn't fully collapse; content area doesn't resize.
**Severity:** Low

---

## Accessibility Issues

### 1. Missing ARIA Labels on Most Buttons

**Issue:** Buttons show as `button [ref_xxx]` with no aria-label or text content.
**Impact:** Screen readers cannot identify buttons.
**Severity:** High

### 2. No Form Validation Messages

**Issue:** No error shown when clicking "Continue" without selecting account.
**Impact:** Users don't know what's wrong.
**Severity:** Medium

### 3. Toggle Switches Lack ARIA State

**Issue:** Missing `role="switch"` and `aria-checked` attributes.
**Impact:** Screen readers can't determine toggle state.
**Severity:** Medium

### 4. No Visible Focus Indicators

**Issue:** Navigation relies on mouse clicks; no keyboard focus styling visible.
**Severity:** High

### 5. Color Contrast Failures

**Issue:** Gold-on-cream color scheme likely fails WCAG AA (labels like "MEMBER ID", "STATUS").
**Severity:** High

### 6. Dyslexic-Friendly Mode - WORKS WELL

**Positive:** OpenDyslexic font toggle works correctly and applies globally.
**Status:** Pass

---

## Missing Pages / Features

| Feature | Current State |
|---------|---------------|
| Member Detail Page | No individual profile view (cards not clickable) |
| Forgot Password Flow | Dead link, no reset page |
| Add Member Form/Modal | Quick action exists, no form |
| Communications Page | No messaging interface |
| Invoice Creation Flow | Button exists, no form |
| Report Generation Flow | Button exists, no viewer |
| Vendor Management Detail | No vendor list or detail view |
| Procurement Catalog | No product/supply catalog |
| Document Preview | Can't open files in The Vault |
| Notifications Page | "View All" dead, no dedicated page |
| User Profile Menu | Avatar has no dropdown |
| Member Portal Sub-Pages | Payments, Documents, Messages, Profile, Card - all missing |
| Calendar View | "View Calendar" dead, no calendar page |
| Room Service Flow | Business Center items not clickable |

---

## Member Portal Summary

| Feature | Status |
|---------|--------|
| Home tab | Works - shows member card and upcoming events |
| Events tab | Works - lists events with Register buttons |
| Alerts tab | Works - shows 3 notifications |
| Profile tab | Broken - stays on Alerts, content dims |
| Register buttons | Dead |
| Notification detail | Dead |
| Notification bell | Not tested |
| Back to admin | Missing entirely |

---

## What's Working Well

| Feature | Status |
|---------|--------|
| Landing page animation | Elegant geometric animation |
| Account selector | 20 accounts with search, works smoothly |
| Login flow | Password entry and "Enter The Lobbi" work |
| Phase selector dropdown | Phase 1/2/3/All Phases toggle works |
| Role selector dropdown | National/Regional/State/Chapter Admin works |
| Organization switcher | All 20 organizations selectable |
| AI Concierge panel | Opens, accepts input, simulated responses, quick chips work |
| Notification bell | Shows notifications, "Mark all read" works |
| Registry search | Filters member cards in real-time |
| Registry tabs | Hierarchy / All Members switching works |
| Events category filters | All Events, Conference, Workshop filters work |
| Event cards | Rich data with capacity bars, categories, dates |
| Settings toggles | Notification toggles work (push, email, session) |
| Dyslexic-Friendly font | Applies OpenDyslexic globally |
| Page transitions | Smooth fade animations |

---

## Priority Recommendations

### P0 - Fix Immediately

| # | Issue | Effort |
|---|-------|--------|
| 1 | Swap Magic Link <-> SSO tab content | 5 min |
| 2 | Fix "Next" button in Event Creation wizard | 30 min |
| 3 | Fix undefined page title | 5 min |
| 4 | Add "Back to Admin" button in Member Portal | 15 min |

### P1 - Fix Before Demo

| # | Issue | Effort |
|---|-------|--------|
| 1 | Wire up Quick Action buttons (even to placeholder modals) | 2 hr |
| 2 | Make member cards clickable in Registry | 1 hr |
| 3 | Fix Dark Mode to apply full theme | 2 hr |
| 4 | Add success feedback to "Save Changes" | 15 min |

### P2 - Fix Before Launch

| # | Issue | Effort |
|---|-------|--------|
| 1 | Build missing pages (Member Detail, Communications, etc.) | 2-4 weeks |
| 2 | Add ARIA labels to all interactive elements | 4 hr |
| 3 | Improve color contrast (gold-on-cream theme) | 2 hr |
| 4 | Add form validation with visible error messages | 4 hr |
| 5 | Add URL routing for browser navigation | 1 day |
| 6 | Add session persistence (localStorage) | 4 hr |

---

## Mobile Responsiveness

**Status:** Not fully tested in this session.

**Recommendation:** Follow-up testing session at:
- 375px (mobile phone)
- 768px (tablet)
- 1024px (small desktop)

**Expected Issues:**
- Sidebar overlap at mobile widths
- Stat cards not stacking
- Event cards not wrapping
- Modal overflow on small screens

---

## Appendix: Test Environment

| Parameter | Value |
|-----------|-------|
| URL | https://markus41.github.io/Lobbifigmademo/ |
| Browser | Chrome (latest) |
| Viewport | 1456 x 836 |
| Test Date | February 7, 2026 |
| Demo Account | Kathy Watts |
| Organization | Luxe Haven Resort |

---

## Report Metadata

| Field | Value |
|-------|-------|
| Report Version | 1.0 |
| Generated By | Golden Armada QA Orchestration |
| Methodology | Manual exploratory testing with DOM inspection |
| Duration | ~2 hours |

---

```
===============================================
            THE GOLDEN ARMADA
       Lobbi Autonomous Agent Fleet
-----------------------------------------------
          QA Audit Complete

              thelobbi.io
===============================================
```

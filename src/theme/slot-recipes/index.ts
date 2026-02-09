/**
 * Lobbi Design System - Slot Recipe Exports
 *
 * Aggregates all complex component slot recipes for the Chakra v3 system.
 */

// Import all slot recipes
import { cardSlotRecipe } from './card'
import { dialogSlotRecipe, alertDialogSlotRecipe } from './dialog'
import { sheetSlotRecipe } from './sheet'
import { dropdownMenuSlotRecipe, contextMenuSlotRecipe } from './dropdown-menu'
import { tabsSlotRecipe } from './tabs'
import { accordionSlotRecipe, collapsibleSlotRecipe } from './accordion'
import { tableSlotRecipe } from './table'
import { avatarSlotRecipe, avatarGroupSlotRecipe } from './avatar'
import { alertSlotRecipe } from './alert'
import { tooltipSlotRecipe, popoverSlotRecipe, hoverCardSlotRecipe } from './tooltip'
import { selectSlotRecipe } from './select'
import { formFieldSlotRecipe, inputGroupSlotRecipe } from './form'
import { sidebarSlotRecipe } from './sidebar'
import { breadcrumbSlotRecipe, paginationSlotRecipe } from './breadcrumb'

/**
 * Combined Slot Recipes Export
 *
 * All complex component slot recipes for use in the Chakra v3 system.
 */
export const slotRecipes = {
  // Layout
  card: cardSlotRecipe,
  sidebar: sidebarSlotRecipe,

  // Overlay
  dialog: dialogSlotRecipe,
  alertDialog: alertDialogSlotRecipe,
  sheet: sheetSlotRecipe,
  tooltip: tooltipSlotRecipe,
  popover: popoverSlotRecipe,
  hoverCard: hoverCardSlotRecipe,

  // Menu
  dropdownMenu: dropdownMenuSlotRecipe,
  contextMenu: contextMenuSlotRecipe,

  // Navigation
  tabs: tabsSlotRecipe,
  accordion: accordionSlotRecipe,
  collapsible: collapsibleSlotRecipe,
  breadcrumb: breadcrumbSlotRecipe,
  pagination: paginationSlotRecipe,

  // Data Display
  table: tableSlotRecipe,
  avatar: avatarSlotRecipe,
  avatarGroup: avatarGroupSlotRecipe,

  // Feedback
  alert: alertSlotRecipe,

  // Form
  select: selectSlotRecipe,
  formField: formFieldSlotRecipe,
  inputGroup: inputGroupSlotRecipe,
}

// Re-export individual slot recipes for direct access
export { cardSlotRecipe } from './card'
export { dialogSlotRecipe, alertDialogSlotRecipe } from './dialog'
export { sheetSlotRecipe } from './sheet'
export { dropdownMenuSlotRecipe, contextMenuSlotRecipe } from './dropdown-menu'
export { tabsSlotRecipe } from './tabs'
export { accordionSlotRecipe, collapsibleSlotRecipe } from './accordion'
export { tableSlotRecipe } from './table'
export { avatarSlotRecipe, avatarGroupSlotRecipe } from './avatar'
export { alertSlotRecipe } from './alert'
export { tooltipSlotRecipe, popoverSlotRecipe, hoverCardSlotRecipe } from './tooltip'
export { selectSlotRecipe } from './select'
export { formFieldSlotRecipe, inputGroupSlotRecipe } from './form'
export { sidebarSlotRecipe } from './sidebar'
export { breadcrumbSlotRecipe, paginationSlotRecipe } from './breadcrumb'

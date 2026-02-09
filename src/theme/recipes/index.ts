/**
 * Lobbi Design System - Recipe Exports
 *
 * Aggregates all simple component recipes for the Chakra v3 system.
 */

// Import all recipes
import { buttonRecipe } from './button'
import { badgeRecipe } from './badge'
import { inputRecipe, textareaRecipe } from './input'
import { checkboxRecipe } from './checkbox'
import { switchRecipe } from './switch'
import { radioRecipe } from './radio'
import { labelRecipe } from './label'
import { separatorRecipe } from './separator'
import { skeletonRecipe } from './skeleton'
import { progressRecipe, progressIndicatorRecipe } from './progress'
import { toggleRecipe, toggleGroupRecipe } from './toggle'
import { sliderTrackRecipe, sliderFilledTrackRecipe, sliderThumbRecipe } from './slider'
import { spinnerRecipe } from './spinner'

/**
 * Combined Recipes Export
 *
 * All simple component recipes for use in the Chakra v3 system.
 */
export const recipes = {
  // Core
  button: buttonRecipe,
  badge: badgeRecipe,

  // Form
  input: inputRecipe,
  textarea: textareaRecipe,
  checkbox: checkboxRecipe,
  switch: switchRecipe,
  radio: radioRecipe,
  label: labelRecipe,

  // Toggle
  toggle: toggleRecipe,
  toggleGroup: toggleGroupRecipe,

  // Slider
  sliderTrack: sliderTrackRecipe,
  sliderFilledTrack: sliderFilledTrackRecipe,
  sliderThumb: sliderThumbRecipe,

  // Feedback
  progress: progressRecipe,
  progressIndicator: progressIndicatorRecipe,
  skeleton: skeletonRecipe,
  spinner: spinnerRecipe,

  // Layout
  separator: separatorRecipe,
}

// Re-export individual recipes for direct access
export { buttonRecipe } from './button'
export { badgeRecipe } from './badge'
export { inputRecipe, textareaRecipe } from './input'
export { checkboxRecipe } from './checkbox'
export { switchRecipe } from './switch'
export { radioRecipe } from './radio'
export { labelRecipe } from './label'
export { separatorRecipe } from './separator'
export { skeletonRecipe } from './skeleton'
export { progressRecipe, progressIndicatorRecipe } from './progress'
export { toggleRecipe, toggleGroupRecipe } from './toggle'
export { sliderTrackRecipe, sliderFilledTrackRecipe, sliderThumbRecipe } from './slider'
export { spinnerRecipe } from './spinner'

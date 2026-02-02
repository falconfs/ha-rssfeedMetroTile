/**
 * Editor Configuration Schema
 * Defines all available configuration options and how they should be rendered in the editor
 */

import { SUPPORTED_TRANSITIONS, ASPECT_RATIOS, MODAL_SIZES, MODAL_ANIMATIONS } from './constants';

export type EditorControlType =
  | 'entity-picker'
  | 'text'
  | 'number'
  | 'checkbox'
  | 'select'
  | 'textarea';

export interface EditorControl {
  id: string;
  label: string;
  type: EditorControlType;
  category: string;
  description?: string;
  options?: Array<{ value: string | number; label: string }>;
  min?: number;
  max?: number;
  helper?: string;
  dependency?: string; // Show only if another field has specific value
  dependencyValue?: any;
  includeDomains?: string[]; // For entity-picker
}

/**
 * Category labels
 */
export const EDITOR_CATEGORIES: Record<string, string> = {
  basic: 'Entity',
  layout: 'Layout',
  carousel: 'Carousel',
  content: 'Content',
  navigation: 'Navigation',
  grid: 'Grid Layout (Sections View)',
  modal: 'Modal Settings',
  advanced: 'Advanced',
};

/**
 * Editor controls configuration
 */
export const EDITOR_CONTROLS: EditorControl[] = [
  // === BASIC ===
  {
    id: 'entity',
    label: 'RSS Feed Entity',
    type: 'entity-picker',
    category: 'basic',
    includeDomains: ['sensor'],
  },

  // === LAYOUT ===
  {
    id: 'aspect_ratio',
    label: 'Aspect Ratio',
    type: 'select',
    category: 'layout',
    options: [
      { value: '', label: 'Dynamic (Auto Height)' },
      ...Object.keys(ASPECT_RATIOS).map(ratio => ({
        value: ratio,
        label: ratio,
      })),
    ],
  },
  {
    id: 'image_layout',
    label: 'Image Layout',
    type: 'select',
    category: 'layout',
    options: [
      { value: 'background', label: 'Background with Blur' },
      { value: 'split', label: 'Split (Image Top, Text Bottom)' },
    ],
  },

  // === CAROUSEL ===
  {
    id: 'slide_duration_sec',
    label: 'Slide Duration (seconds)',
    type: 'number',
    category: 'carousel',
    min: 1,
    max: 60,
  },
  {
    id: 'transition',
    label: 'Transition Effect',
    type: 'select',
    category: 'carousel',
    options: SUPPORTED_TRANSITIONS.map(t => ({
      value: t,
      label: t
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
    })),
  },
  {
    id: 'auto_play',
    label: 'Auto Play',
    type: 'checkbox',
    category: 'carousel',
  },
  {
    id: 'pause_on_hover',
    label: 'Pause on Hover/Touch',
    type: 'checkbox',
    category: 'carousel',
  },

  // === CONTENT ===
  {
    id: 'row_limit',
    label: 'Row Limit (0 = all)',
    type: 'number',
    category: 'content',
    min: 0,
    max: 100,
  },
  {
    id: 'show_images',
    label: 'Show Images',
    type: 'checkbox',
    category: 'content',
  },
  {
    id: 'lazy_load_images',
    label: 'Lazy Load Images',
    type: 'checkbox',
    category: 'content',
    dependency: 'show_images',
    dependencyValue: true,
  },

  // === NAVIGATION ===
  {
    id: 'show_navigation',
    label: 'Show Navigation Arrows',
    type: 'checkbox',
    category: 'navigation',
  },
  {
    id: 'show_indicators',
    label: 'Show Indicators (Dots)',
    type: 'checkbox',
    category: 'navigation',
  },
  {
    id: 'keyboard_navigation',
    label: 'Keyboard Navigation',
    type: 'checkbox',
    category: 'navigation',
  },

  // === GRID ===
  {
    id: 'grid_rows',
    label: 'Grid Rows',
    type: 'number',
    category: 'grid',
    min: 1,
    max: 12,
  },
  {
    id: 'grid_columns',
    label: 'Grid Columns',
    type: 'number',
    category: 'grid',
    min: 1,
    max: 12,
  },

  // === MODAL ===
  {
    id: 'open_in_modal',
    label: 'Open Links in Modal',
    type: 'checkbox',
    category: 'modal',
  },
  {
    id: 'modal_type',
    label: 'Modal Type',
    type: 'select',
    category: 'modal',
    dependency: 'open_in_modal',
    dependencyValue: true,
    options: [
      { value: 'custom', label: 'Custom Modal (iframe)' },
      { value: 'none', label: 'Direct External Link (No Modal)' },
    ],
  },
  {
    id: 'modal_size',
    label: 'Modal Size',
    type: 'select',
    category: 'modal',
    dependency: 'open_in_modal',
    dependencyValue: true,
    options: Object.keys(MODAL_SIZES).map(size => ({
      value: size,
      label: size.charAt(0).toUpperCase() + size.slice(1),
    })),
  },
  {
    id: 'modal_width',
    label: 'Custom Width (optional)',
    type: 'text',
    category: 'modal',
    dependency: 'open_in_modal',
    dependencyValue: true,
    helper: 'e.g. 800px or 80%',
  },
  {
    id: 'modal_height',
    label: 'Custom Height (optional)',
    type: 'text',
    category: 'modal',
    dependency: 'open_in_modal',
    dependencyValue: true,
    helper: 'e.g. 600px or 70%',
  },
  {
    id: 'modal_animation',
    label: 'Animation',
    type: 'select',
    category: 'modal',
    dependency: 'open_in_modal',
    dependencyValue: true,
    options: Object.keys(MODAL_ANIMATIONS).map(anim => ({
      value: anim,
      label: anim
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
    })),
  },
  {
    id: 'modal_show_loading',
    label: 'Show Loading Spinner',
    type: 'checkbox',
    category: 'modal',
    dependency: 'open_in_modal',
    dependencyValue: true,
  },
  {
    id: 'modal_fallback_to_external',
    label: 'Fallback to External Link (CORS)',
    type: 'checkbox',
    category: 'modal',
    dependency: 'open_in_modal',
    dependencyValue: true,
  },
  {
    id: 'modal_close_on_backdrop',
    label: 'Close on Backdrop Click',
    type: 'checkbox',
    category: 'modal',
    dependency: 'open_in_modal',
    dependencyValue: true,
  },
  {
    id: 'modal_show_close_button',
    label: 'Show Close Button',
    type: 'checkbox',
    category: 'modal',
    dependency: 'open_in_modal',
    dependencyValue: true,
  },
  {
    id: 'modal_close_on_esc',
    label: 'Close on ESC Key',
    type: 'checkbox',
    category: 'modal',
    dependency: 'open_in_modal',
    dependencyValue: true,
  },

  // === ADVANCED ===
  {
    id: 'performance_warning',
    label: 'Performance Warning Threshold',
    type: 'number',
    category: 'advanced',
    min: 5,
    max: 100,
    helper: 'Show warning when feed has more items than this',
  },
  {
    id: 'style',
    label: 'Custom CSS',
    type: 'textarea',
    category: 'advanced',
    helper: 'Advanced: Add custom CSS styles',
  },
];

/**
 * Get controls grouped by category
 */
export function getControlsByCategory(): Map<string, EditorControl[]> {
  const categories = new Map<string, EditorControl[]>();

  EDITOR_CONTROLS.forEach(control => {
    if (!categories.has(control.category)) {
      categories.set(control.category, []);
    }
    categories.get(control.category)!.push(control);
  });

  return categories;
}

/**
 * Check if a control should be visible based on dependencies
 */
export function isControlVisible(control: EditorControl, config: any): boolean {
  if (!control.dependency) return true;
  return config[control.dependency] === control.dependencyValue;
}

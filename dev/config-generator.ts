/**
 * Dynamic Configuration Generator for Dev Environment
 *
 * This module automatically generates UI controls based on TypeScript types
 * and constants from the main codebase. When new config options are added,
 * they automatically appear in the dev environment.
 */

import type { CardConfig } from '../src/types';
import {
  DEFAULT_CONFIG,
  SUPPORTED_TRANSITIONS,
  ASPECT_RATIOS,
  MODAL_SIZES,
  MODAL_ANIMATIONS,
} from '../src/constants';

export interface ControlDefinition {
  id: string;
  label: string;
  type: 'text' | 'number' | 'checkbox' | 'select' | 'textarea';
  category: string;
  options?: Array<{ value: string | number; label: string }>;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: any;
  description?: string;
  dependency?: string; // Show only if another field has specific value
  dependencyValue?: any;
}

/**
 * Extract possible values from TypeScript types and constants
 */
export const CONFIG_SCHEMA: ControlDefinition[] = [
  // === BASIC ===
  {
    id: 'entity',
    label: 'RSS Feed Entity',
    type: 'select',
    category: 'basic',
    description: 'Select the RSS feed sensor entity',
    defaultValue: DEFAULT_CONFIG.entity,
    options: [
      { value: 'sensor.die_zeit', label: 'Die Zeit RSS' },
      { value: 'sensor.tagesschau', label: 'Tagesschau' },
      { value: 'sensor.heise', label: 'Heise News' },
      { value: 'sensor.hackernews', label: 'Hacker News' },
    ],
  },

  // === LAYOUT ===
  {
    id: 'aspect_ratio',
    label: 'Aspect Ratio',
    type: 'select',
    category: 'layout',
    description: 'Fixed aspect ratio for tiles',
    defaultValue: DEFAULT_CONFIG.aspect_ratio,
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
    description: 'How images are displayed',
    defaultValue: DEFAULT_CONFIG.image_layout,
    options: [
      { value: 'background', label: 'Background (Full)' },
      { value: 'split', label: 'Split (Image Left)' },
    ],
  },
  {
    id: 'grid_rows',
    label: 'Grid Rows',
    type: 'number',
    category: 'layout',
    min: 1,
    max: 12,
    step: 1,
    defaultValue: DEFAULT_CONFIG.grid_rows,
    description: 'Number of rows in HA grid',
  },
  {
    id: 'grid_columns',
    label: 'Grid Columns',
    type: 'number',
    category: 'layout',
    min: 1,
    max: 12,
    step: 1,
    defaultValue: DEFAULT_CONFIG.grid_columns,
    description: 'Number of columns in HA grid',
  },

  // === CAROUSEL ===
  {
    id: 'slide_duration_sec',
    label: 'Slide Duration (seconds)',
    type: 'number',
    category: 'carousel',
    min: 1,
    max: 60,
    step: 1,
    defaultValue: DEFAULT_CONFIG.slide_duration_sec,
    description: 'Time each slide is shown',
  },
  {
    id: 'transition',
    label: 'Transition Effect',
    type: 'select',
    category: 'carousel',
    defaultValue: DEFAULT_CONFIG.transition,
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
    defaultValue: DEFAULT_CONFIG.auto_play,
    description: 'Automatically advance slides',
  },
  {
    id: 'pause_on_hover',
    label: 'Pause on Hover',
    type: 'checkbox',
    category: 'carousel',
    defaultValue: DEFAULT_CONFIG.pause_on_hover,
    description: 'Pause carousel when hovering',
  },

  // === CONTENT ===
  {
    id: 'row_limit',
    label: 'Row Limit',
    type: 'number',
    category: 'content',
    min: 0,
    max: 50,
    step: 1,
    defaultValue: DEFAULT_CONFIG.row_limit,
    description: '0 = show all items',
  },
  {
    id: 'show_images',
    label: 'Show Images',
    type: 'checkbox',
    category: 'content',
    defaultValue: DEFAULT_CONFIG.show_images,
    description: 'Display feed images',
  },
  {
    id: 'lazy_load_images',
    label: 'Lazy Load Images',
    type: 'checkbox',
    category: 'content',
    defaultValue: DEFAULT_CONFIG.lazy_load_images,
    description: 'Load images as needed',
    dependency: 'show_images',
    dependencyValue: true,
  },

  // === NAVIGATION ===
  {
    id: 'show_navigation',
    label: 'Show Navigation Arrows',
    type: 'checkbox',
    category: 'navigation',
    defaultValue: DEFAULT_CONFIG.show_navigation,
    description: 'Show prev/next buttons',
  },
  {
    id: 'show_indicators',
    label: 'Show Indicators',
    type: 'checkbox',
    category: 'navigation',
    defaultValue: DEFAULT_CONFIG.show_indicators,
    description: 'Show dot indicators',
  },
  {
    id: 'keyboard_navigation',
    label: 'Keyboard Navigation',
    type: 'checkbox',
    category: 'navigation',
    defaultValue: DEFAULT_CONFIG.keyboard_navigation,
    description: 'Enable arrow key controls',
  },

  // === MODAL ===
  {
    id: 'open_in_modal',
    label: 'Open in Modal',
    type: 'checkbox',
    category: 'modal',
    defaultValue: DEFAULT_CONFIG.open_in_modal,
    description: 'Open links in modal overlay',
  },
  {
    id: 'modal_type',
    label: 'Modal Type',
    type: 'select',
    category: 'modal',
    defaultValue: DEFAULT_CONFIG.modal_type,
    dependency: 'open_in_modal',
    dependencyValue: true,
    options: [
      { value: 'custom', label: 'Custom Modal (iframe)' },
      { value: 'ha-dialog', label: 'HA Dialog Integration' },
      { value: 'none', label: 'Direct External Link' },
    ],
  },
  {
    id: 'modal_size',
    label: 'Modal Size',
    type: 'select',
    category: 'modal',
    defaultValue: DEFAULT_CONFIG.modal_size,
    dependency: 'open_in_modal',
    dependencyValue: true,
    options: Object.keys(MODAL_SIZES).map(size => ({
      value: size,
      label: size.charAt(0).toUpperCase() + size.slice(1),
    })),
  },
  {
    id: 'modal_width',
    label: 'Custom Width',
    type: 'text',
    category: 'modal',
    defaultValue: DEFAULT_CONFIG.modal_width,
    dependency: 'open_in_modal',
    dependencyValue: true,
    description: 'e.g. "800px" or "80%"',
  },
  {
    id: 'modal_height',
    label: 'Custom Height',
    type: 'text',
    category: 'modal',
    defaultValue: DEFAULT_CONFIG.modal_height,
    dependency: 'open_in_modal',
    dependencyValue: true,
    description: 'e.g. "600px" or "80%"',
  },
  {
    id: 'modal_animation',
    label: 'Animation',
    type: 'select',
    category: 'modal',
    defaultValue: DEFAULT_CONFIG.modal_animation,
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
    id: 'modal_close_on_backdrop',
    label: 'Close on Backdrop Click',
    type: 'checkbox',
    category: 'modal',
    defaultValue: DEFAULT_CONFIG.modal_close_on_backdrop,
    dependency: 'open_in_modal',
    dependencyValue: true,
  },
  {
    id: 'modal_show_close_button',
    label: 'Show Close Button',
    type: 'checkbox',
    category: 'modal',
    defaultValue: DEFAULT_CONFIG.modal_show_close_button,
    dependency: 'open_in_modal',
    dependencyValue: true,
  },
  {
    id: 'modal_close_on_esc',
    label: 'Close on ESC Key',
    type: 'checkbox',
    category: 'modal',
    defaultValue: DEFAULT_CONFIG.modal_close_on_esc,
    dependency: 'open_in_modal',
    dependencyValue: true,
  },
  {
    id: 'modal_show_loading',
    label: 'Show Loading Spinner',
    type: 'checkbox',
    category: 'modal',
    defaultValue: DEFAULT_CONFIG.modal_show_loading,
    dependency: 'open_in_modal',
    dependencyValue: true,
  },
  {
    id: 'modal_iframe_sandbox',
    label: 'Enable iframe Sandbox',
    type: 'checkbox',
    category: 'modal',
    defaultValue: DEFAULT_CONFIG.modal_iframe_sandbox,
    dependency: 'modal_type',
    dependencyValue: 'custom',
    description: 'Security: Restrict iframe permissions',
  },
  {
    id: 'modal_fallback_to_external',
    label: 'Fallback to External Link',
    type: 'checkbox',
    category: 'modal',
    defaultValue: DEFAULT_CONFIG.modal_fallback_to_external,
    dependency: 'open_in_modal',
    dependencyValue: true,
    description: 'Open externally on CORS errors',
  },

  // === PERFORMANCE ===
  {
    id: 'performance_warning',
    label: 'Performance Warning Threshold',
    type: 'number',
    category: 'performance',
    min: 5,
    max: 100,
    step: 5,
    defaultValue: DEFAULT_CONFIG.performance_warning,
    description: 'Warn if feed has more items than this',
  },

  // === ADVANCED ===
  {
    id: 'style',
    label: 'Custom CSS',
    type: 'textarea',
    category: 'advanced',
    description: 'Custom CSS styles for the card',
    defaultValue: '',
  },
];

/**
 * Group controls by category
 */
export function getControlsByCategory(): Map<string, ControlDefinition[]> {
  const categories = new Map<string, ControlDefinition[]>();

  CONFIG_SCHEMA.forEach(control => {
    if (!categories.has(control.category)) {
      categories.set(control.category, []);
    }
    categories.get(control.category)!.push(control);
  });

  return categories;
}

/**
 * Get category display names
 */
export const CATEGORY_LABELS: Record<string, string> = {
  basic: 'Basic Settings',
  layout: 'Layout & Grid',
  carousel: 'Carousel',
  content: 'Content',
  navigation: 'Navigation',
  modal: 'Modal Settings',
  performance: 'Performance',
  advanced: 'Advanced',
};

/**
 * Generate HTML for a single control
 */
export function generateControlHTML(control: ControlDefinition): string {
  const hasDescription = control.description ? `<small>${control.description}</small>` : '';

  switch (control.type) {
    case 'checkbox':
      return `
        <div class="control-group" data-control="${control.id}" ${control.dependency ? `data-dependency="${control.dependency}" data-dependency-value="${control.dependencyValue}"` : ''}>
          <label>
            <input type="checkbox" id="${control.id}" ${control.defaultValue ? 'checked' : ''}>
            ${control.label}
          </label>
          ${hasDescription}
        </div>
      `;

    case 'select':
      const options = control.options
        ?.map(
          opt =>
            `<option value="${opt.value}" ${opt.value === control.defaultValue ? 'selected' : ''}>${opt.label}</option>`
        )
        .join('');
      return `
        <div class="control-group" data-control="${control.id}" ${control.dependency ? `data-dependency="${control.dependency}" data-dependency-value="${control.dependencyValue}"` : ''}>
          <label>${control.label}</label>
          <select id="${control.id}">
            ${options}
          </select>
          ${hasDescription}
        </div>
      `;

    case 'number':
      return `
        <div class="control-group" data-control="${control.id}" ${control.dependency ? `data-dependency="${control.dependency}" data-dependency-value="${control.dependencyValue}"` : ''}>
          <label>${control.label}</label>
          <input type="number" id="${control.id}" 
                 value="${control.defaultValue}" 
                 ${control.min !== undefined ? `min="${control.min}"` : ''}
                 ${control.max !== undefined ? `max="${control.max}"` : ''}
                 ${control.step !== undefined ? `step="${control.step}"` : ''}>
          ${hasDescription}
        </div>
      `;

    case 'textarea':
      return `
        <div class="control-group" data-control="${control.id}" ${control.dependency ? `data-dependency="${control.dependency}" data-dependency-value="${control.dependencyValue}"` : ''}>
          <label>${control.label}</label>
          <textarea id="${control.id}" rows="4">${control.defaultValue || ''}</textarea>
          ${hasDescription}
        </div>
      `;

    case 'text':
    default:
      return `
        <div class="control-group" data-control="${control.id}" ${control.dependency ? `data-dependency="${control.dependency}" data-dependency-value="${control.dependencyValue}"` : ''}>
          <label>${control.label}</label>
          <input type="text" id="${control.id}" value="${control.defaultValue || ''}" placeholder="${control.description || ''}">
          ${hasDescription}
        </div>
      `;
  }
}

/**
 * Generate HTML for all controls grouped by category
 */
export function generateAllControlsHTML(): string {
  const categorized = getControlsByCategory();
  let html = '';

  // Define category order
  const categoryOrder = [
    'basic',
    'layout',
    'carousel',
    'content',
    'navigation',
    'modal',
    'performance',
    'advanced',
  ];

  categoryOrder.forEach(categoryKey => {
    const controls = categorized.get(categoryKey);
    if (!controls || controls.length === 0) return;

    const categoryLabel = CATEGORY_LABELS[categoryKey] || categoryKey;

    html += `
      <div class="config-section" data-category="${categoryKey}">
        <h3 class="section-title">${categoryLabel}</h3>
        ${controls.map(control => generateControlHTML(control)).join('\n')}
      </div>
    `;
  });

  return html;
}

/**
 * Get all control IDs for event binding
 */
export function getAllControlIds(): string[] {
  return CONFIG_SCHEMA.map(c => c.id);
}

/**
 * Get control definition by ID
 */
export function getControlById(id: string): ControlDefinition | undefined {
  return CONFIG_SCHEMA.find(c => c.id === id);
}

/**
 * Check if a control should be visible based on dependencies
 */
export function isControlVisible(controlId: string, currentConfig: any): boolean {
  const control = getControlById(controlId);
  if (!control || !control.dependency) return true;

  const dependencyValue = currentConfig[control.dependency];
  return dependencyValue === control.dependencyValue;
}

/**
 * Update control visibility based on current config
 */
export function updateControlVisibility(currentConfig: any): void {
  CONFIG_SCHEMA.forEach(control => {
    if (!control.dependency) return;

    const element = document.querySelector(`[data-control="${control.id}"]`) as HTMLElement;
    if (!element) return;

    const isVisible = isControlVisible(control.id, currentConfig);
    element.style.display = isVisible ? '' : 'none';
  });
}

/**
 * Dynamic UI Generator for Dev Environment
 *
 * This script automatically generates and injects control UI elements
 * based on the configuration schema. It keeps the HTML clean and ensures
 * that new config options automatically get UI controls.
 */

import {
  CONFIG_SCHEMA,
  CATEGORY_LABELS,
  getControlsByCategory,
  generateControlHTML,
  getAllControlIds,
  updateControlVisibility,
  isControlVisible,
} from './config-generator.ts';

/**
 * Inject all controls into the DOM
 */
export function injectControls(containerId: string = 'dynamicControls'): void {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container #${containerId} not found`);
    return;
  }

  const categorized = getControlsByCategory();
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

  let html = '';

  categoryOrder.forEach(categoryKey => {
    const controls = categorized.get(categoryKey);
    if (!controls || controls.length === 0) return;

    const categoryLabel = CATEGORY_LABELS[categoryKey] || categoryKey;

    html += `
      <div class="control-section" data-category="${categoryKey}">
        <h3>${categoryLabel}</h3>
        ${controls.map(control => generateControlHTML(control)).join('\n')}
      </div>
    `;
  });

  container.innerHTML = html;
}

/**
 * Attach event listeners to all controls
 */
export function attachControlListeners(callback: (id: string, value: any) => void): void {
  const controlIds = getAllControlIds();

  controlIds.forEach(id => {
    const element = document.getElementById(id) as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    if (!element) return;

    const eventType =
      element.type === 'checkbox' ? 'change' : element.type === 'number' ? 'input' : 'change';

    element.addEventListener(eventType, () => {
      let value: any;

      if (element.type === 'checkbox') {
        value = (element as HTMLInputElement).checked;
      } else if (element.type === 'number') {
        value = parseInt((element as HTMLInputElement).value);
      } else {
        value = element.value;
      }

      callback(id, value);
    });
  });
}

/**
 * Update all control values from a config object
 */
export function updateControlValues(config: Record<string, any>): void {
  Object.keys(config).forEach(key => {
    const element = document.getElementById(key) as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    if (!element) return;

    if (element.type === 'checkbox') {
      (element as HTMLInputElement).checked = !!config[key];
    } else if (element.type === 'number') {
      (element as HTMLInputElement).value = String(config[key] || 0);
    } else {
      element.value = String(config[key] || '');
    }
  });
}

/**
 * Get current values from all controls
 */
export function getControlValues(): Record<string, any> {
  const config: Record<string, any> = {};
  const controlIds = getAllControlIds();

  controlIds.forEach(id => {
    const element = document.getElementById(id) as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    if (!element) return;

    if (element.type === 'checkbox') {
      config[id] = (element as HTMLInputElement).checked;
    } else if (element.type === 'number') {
      config[id] = parseInt((element as HTMLInputElement).value) || 0;
    } else {
      config[id] = element.value;
    }
  });

  return config;
}

/**
 * Setup dependency tracking for controls
 * Automatically shows/hides controls based on dependencies
 */
export function setupDependencyTracking(): void {
  const controlIds = getAllControlIds();

  controlIds.forEach(id => {
    const element = document.getElementById(id);
    if (!element) return;

    element.addEventListener('change', () => {
      const currentConfig = getControlValues();
      updateControlVisibility(currentConfig);
    });
  });

  // Initial visibility update
  const currentConfig = getControlValues();
  updateControlVisibility(currentConfig);
}

/**
 * Add preset configurations
 */
export const PRESETS = {
  default: {
    label: 'Default',
    config: {
      aspect_ratio: '16:9',
      image_layout: 'background',
      slide_duration_sec: 5,
      transition: 'slide-vertical',
      auto_play: true,
      pause_on_hover: true,
      row_limit: 0,
      show_images: true,
      lazy_load_images: true,
      show_navigation: true,
      show_indicators: true,
      keyboard_navigation: true,
      open_in_modal: true,
      modal_type: 'custom',
      modal_size: 'medium',
    },
  },
  minimal: {
    label: 'Minimal (No Controls)',
    config: {
      aspect_ratio: '1:1',
      image_layout: 'background',
      slide_duration_sec: 8,
      transition: 'fade',
      auto_play: true,
      pause_on_hover: false,
      show_navigation: false,
      show_indicators: false,
      keyboard_navigation: true,
      open_in_modal: false,
    },
  },
  'split-layout': {
    label: 'Split Layout',
    config: {
      aspect_ratio: '4:3',
      image_layout: 'split',
      slide_duration_sec: 6,
      transition: 'slide-horizontal',
      auto_play: true,
      pause_on_hover: true,
      show_navigation: true,
      show_indicators: true,
      open_in_modal: true,
      modal_type: 'none',
    },
  },
  'modal-showcase': {
    label: 'Modal Showcase',
    config: {
      aspect_ratio: '16:9',
      image_layout: 'background',
      slide_duration_sec: 5,
      transition: 'fade',
      auto_play: true,
      open_in_modal: true,
      modal_type: 'custom',
      modal_size: 'large',
      modal_animation: 'slide-up',
      modal_show_loading: true,
      modal_close_on_backdrop: true,
      modal_show_close_button: true,
    },
  },
  performance: {
    label: 'Performance Optimized',
    config: {
      aspect_ratio: '16:9',
      image_layout: 'background',
      slide_duration_sec: 5,
      transition: 'fade',
      auto_play: true,
      row_limit: 10,
      lazy_load_images: true,
      performance_warning: 15,
      open_in_modal: false,
    },
  },
};

/**
 * Load a preset configuration
 */
export function loadPreset(presetName: string): Record<string, any> | null {
  const preset = PRESETS[presetName as keyof typeof PRESETS];
  if (!preset) return null;

  return preset.config;
}

/**
 * Get preset options for a select dropdown
 */
export function getPresetOptions(): Array<{ value: string; label: string }> {
  return [
    { value: '', label: 'Select Preset...' },
    ...Object.entries(PRESETS).map(([key, preset]) => ({
      value: key,
      label: preset.label,
    })),
  ];
}

/**
 * Initialize the dynamic UI system
 */
export function initializeDynamicUI(config: {
  containerId?: string;
  onConfigChange?: (config: Record<string, any>) => void;
  initialConfig?: Record<string, any>;
}) {
  const { containerId = 'dynamicControls', onConfigChange, initialConfig } = config;

  // Step 1: Inject controls
  console.log('📝 Injecting dynamic controls...');
  injectControls(containerId);

  // Step 2: Set initial values
  if (initialConfig) {
    console.log('⚙️ Setting initial config values...');
    updateControlValues(initialConfig);
  }

  // Step 3: Setup dependency tracking
  console.log('🔗 Setting up dependency tracking...');
  setupDependencyTracking();

  // Step 4: Attach listeners
  if (onConfigChange) {
    console.log('👂 Attaching change listeners...');
    attachControlListeners((id, value) => {
      const fullConfig = getControlValues();
      onConfigChange(fullConfig);
    });
  }

  console.log('✅ Dynamic UI initialized successfully!');
  console.log(`📊 Total controls: ${getAllControlIds().length}`);
  console.log(`📁 Categories: ${Object.keys(CATEGORY_LABELS).length}`);
}

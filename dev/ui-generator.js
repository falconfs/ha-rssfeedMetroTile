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
} from './config-generator.js';

// Re-export CATEGORY_LABELS so it's available to index.html
export { CATEGORY_LABELS, getAllControlIds };

/**
 * Inject all controls into the DOM
 * @param {string} containerId
 */
export function injectControls(containerId = 'dynamicControls') {
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
 * @param {(id: string, value: any) => void} callback
 */
export function attachControlListeners(callback) {
  const controlIds = getAllControlIds();

  controlIds.forEach(id => {
    const element = document.getElementById(id);
    if (!element) return;

    const eventType =
      element.type === 'checkbox' ? 'change' : element.type === 'number' ? 'input' : 'change';

    element.addEventListener(eventType, () => {
      let value;

      if (element.type === 'checkbox') {
        value = element.checked;
      } else if (element.type === 'number') {
        value = parseInt(element.value);
      } else {
        value = element.value;
      }

      callback(id, value);
    });
  });
}

/**
 * Update all control values from a config object
 * @param {Record<string, any>} config
 */
export function updateControlValues(config) {
  Object.keys(config).forEach(key => {
    const element = document.getElementById(key);
    if (!element) return;

    if (element.type === 'checkbox') {
      element.checked = !!config[key];
    } else if (element.type === 'number') {
      element.value = String(config[key] || 0);
    } else {
      element.value = String(config[key] || '');
    }
  });
}

/**
 * Get current values from all controls
 * @returns {Record<string, any>}
 */
export function getControlValues() {
  const config = {};
  const controlIds = getAllControlIds();

  controlIds.forEach(id => {
    const element = document.getElementById(id);
    if (!element) return;

    if (element.type === 'checkbox') {
      config[id] = element.checked;
    } else if (element.type === 'number') {
      config[id] = parseInt(element.value) || 0;
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
export function setupDependencyTracking() {
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
 * @param {string} presetName
 * @returns {Record<string, any> | null}
 */
export function loadPreset(presetName) {
  const preset = PRESETS[presetName];
  if (!preset) return null;

  return preset.config;
}

/**
 * Get preset options for a select dropdown
 * @returns {Array<{value: string, label: string}>}
 */
export function getPresetOptions() {
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
 * @param {Object} config
 * @param {string} [config.containerId='dynamicControls']
 * @param {(config: Record<string, any>) => void} [config.onConfigChange]
 * @param {Record<string, any>} [config.initialConfig]
 */
export function initializeDynamicUI(config) {
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

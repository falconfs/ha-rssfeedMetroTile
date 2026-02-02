/**
 * EXAMPLE: How to integrate dynamic controls into index.html
 *
 * This is a simplified example showing the key changes needed
 * to use the new dynamic configuration system.
 */

// ============================================
// 1. HTML Changes (Simplified structure)
// ============================================

/*
BEFORE - Manual HTML (100+ lines of controls):

<div class="control-section">
  <h3>Layout</h3>
  <div class="control-group">
    <label>Aspect Ratio</label>
    <select id="aspect_ratio">
      <option value="1:1">Square</option>
      <option value="16:9">Widescreen</option>
      ...
    </select>
  </div>
  <div class="control-group">
    <label>Image Layout</label>
    <select id="image_layout">
      ...
    </select>
  </div>
  ... (repeat for every option)
</div>


AFTER - Dynamic injection (3 lines):

<div class="tab-content" data-tab-content="config">
  <!-- Controls are injected here automatically -->
  <div id="dynamicControls"></div>
</div>
*/

// ============================================
// 2. JavaScript Changes (in <script> section)
// ============================================

// BEFORE - Manual initialization:
/*
function initializeControls() {
  const inputs = [
    'entity',
    'aspect_ratio',
    'image_layout',
    'slide_duration_sec',
    'transition',
    'auto_play',
    'pause_on_hover',
    'row_limit',
    'show_images',
    'lazy_load_images',
    'show_navigation',
    'show_indicators',
    'keyboard_navigation',
    'grid_rows',
    'grid_columns',
    'performance_warning',
    'style',
  ];

  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    if (el.type === 'checkbox') {
      el.addEventListener('change', () => updateConfigFromControls(id, el.checked));
    } else if (el.type === 'number') {
      el.addEventListener('input', () => updateConfigFromControls(id, parseInt(el.value)));
    } else {
      el.addEventListener('change', () => updateConfigFromControls(id, el.value));
    }
  });
}
*/

// AFTER - Dynamic initialization:
import { initializeDynamicUI, updateControlValues, getControlValues } from './ui-generator.ts';
import { DEFAULT_CONFIG } from '../src/constants.ts';

// Initialize once - handles everything automatically
window.addEventListener('DOMContentLoaded', () => {
  initializeMockData();

  // NEW: Single function call replaces all manual setup
  initializeDynamicUI({
    containerId: 'dynamicControls',
    initialConfig: { ...DEFAULT_CONFIG, entity: 'sensor.die_zeit' },
    onConfigChange: config => {
      // Called whenever any control changes
      configState = config;
      createCards();
      updateStatusDisplay();
      updateYAMLEditor(config);
    },
  });

  initializeYAMLEditor();
  initializeTabs();
  initializeViewModes();
  initializeThemes();
  loadFromURL();
});

// ============================================
// 3. Update from external changes (e.g., YAML editor)
// ============================================

// BEFORE - Manual updates:
/*
function updateControlsFromYAML(config) {
  document.getElementById('entity').value = config.entity || '';
  document.getElementById('aspect_ratio').value = config.aspect_ratio || '';
  document.getElementById('slide_duration_sec').value = config.slide_duration_sec || 5;
  document.getElementById('auto_play').checked = config.auto_play !== false;
  // ... repeat for every control
}
*/

// AFTER - One function call:
function updateControlsFromYAML(config) {
  updateControlValues(config);
}

// ============================================
// 4. Get current config
// ============================================

// BEFORE - Manual collection:
/*
function getCurrentConfig() {
  return {
    entity: document.getElementById('entity').value,
    aspect_ratio: document.getElementById('aspect_ratio').value,
    slide_duration_sec: parseInt(document.getElementById('slide_duration_sec').value),
    auto_play: document.getElementById('auto_play').checked,
    // ... repeat for every control
  };
}
*/

// AFTER - One function call:
function getCurrentConfig() {
  return getControlValues();
}

// ============================================
// 5. Preset loading
// ============================================

// BEFORE - Manual preset configs:
/*
const presets = {
  default: {
    entity: 'sensor.die_zeit',
    aspect_ratio: '16:9',
    slide_duration_sec: 5,
    // ... etc
  }
};

function loadPreset(name) {
  const preset = presets[name];
  document.getElementById('entity').value = preset.entity;
  document.getElementById('aspect_ratio').value = preset.aspect_ratio;
  // ... etc
}
*/

// AFTER - Automatic:
import { loadPreset, getPresetOptions } from './ui-generator.ts';

// Populate preset dropdown (optional, can be static in HTML)
const presetSelect = document.getElementById('preset');
getPresetOptions().forEach(opt => {
  const option = document.createElement('option');
  option.value = opt.value;
  option.textContent = opt.label;
  presetSelect.appendChild(option);
});

// Load preset
document.getElementById('preset').addEventListener('change', e => {
  const presetConfig = loadPreset(e.target.value);
  if (presetConfig) {
    updateControlValues(presetConfig);
    // Trigger change event to update cards
    configState = getControlValues();
    createCards();
  }
});

// ============================================
// SUMMARY OF BENEFITS
// ============================================

/*
✅ BEFORE: 
   - 500+ lines of manual HTML
   - 100+ lines of manual JS wiring
   - Must update in 3 places when adding options
   - Easy to forget controls
   - No dependency management

✅ AFTER:
   - 3 lines of HTML (<div id="dynamicControls"></div>)
   - 10 lines of JS (one initializeDynamicUI() call)
   - Add options in ONE place (config-generator.ts)
   - Automatic UI generation
   - Built-in dependency management
   - Always in sync with TypeScript types
*/

// ============================================
// ADDING A NEW OPTION (Example)
// ============================================

/*
To add a new "show_title" checkbox option:

1. Add to src/types.ts:
   export interface CardConfig {
     show_title?: boolean;
   }

2. Add to src/constants.ts:
   export const DEFAULT_CONFIG = {
     show_title: true,
   };

3. Add to dev/config-generator.ts:
   {
     id: 'show_title',
     label: 'Show Title',
     type: 'checkbox',
     category: 'content',
     defaultValue: DEFAULT_CONFIG.show_title,
     description: 'Display feed item titles'
   }

4. DONE! The control automatically appears in dev environment.
   No HTML changes needed! 🎉
*/

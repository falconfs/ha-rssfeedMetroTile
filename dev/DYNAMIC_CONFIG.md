# Dev Environment - Dynamic Configuration System

## 🎯 Overview

The dev environment now uses a **fully dynamic configuration system** that automatically generates UI controls from the TypeScript type definitions. This means:

- ✅ **No manual HTML editing** - Controls are generated automatically
- ✅ **Always in sync** - New config options automatically get UI
- ✅ **Type-safe** - Uses the same types as the main codebase
- ✅ **Self-documenting** - Descriptions come from the schema
- ✅ **Dependency-aware** - Controls show/hide based on other values

---

## 🏗️ Architecture

### File Structure

```
dev/
├── index.html              # Main HTML (minimal, uses dynamic injection)
├── mock-data.ts            # Mock RSS feed data
├── config-generator.ts     # NEW: Config schema & HTML generation
├── ui-generator.ts         # NEW: Dynamic UI injection & event handling
├── README.md              # This file
└── SUMMARY.md             # Usage examples
```

### How It Works

```
┌─────────────────────┐
│  src/types.ts       │  TypeScript types
│  src/constants.ts   │  Default values & options
└──────┬──────────────┘
       │ imports
       ▼
┌─────────────────────┐
│ config-generator.ts │  Schema definition
│                     │  - Control types
│                     │  - Categories
│                     │  - Dependencies
│                     │  - Options
└──────┬──────────────┘
       │ used by
       ▼
┌─────────────────────┐
│  ui-generator.ts    │  Dynamic UI
│                     │  - Inject HTML
│                     │  - Attach listeners
│                     │  - Handle dependencies
└──────┬──────────────┘
       │ renders
       ▼
┌─────────────────────┐
│   index.html        │  Clean HTML
│                     │  <div id="dynamicControls"></div>
└─────────────────────┘
```

---

## 📝 Adding New Config Options

### Step 1: Add to TypeScript Types (if needed)

```typescript
// src/types.ts
export interface CardConfig {
  // ... existing fields
  my_new_option?: boolean; // ← Add new field
}
```

### Step 2: Add Default Value

```typescript
// src/constants.ts
export const DEFAULT_CONFIG: Partial<CardConfig> = {
  // ... existing defaults
  my_new_option: true, // ← Add default
};
```

### Step 3: Add to Config Schema

```typescript
// dev/config-generator.ts - CONFIG_SCHEMA array
{
  id: 'my_new_option',
  label: 'My New Option',
  type: 'checkbox',  // or 'select', 'number', 'text', 'textarea'
  category: 'advanced',  // 'basic', 'layout', 'carousel', etc.
  defaultValue: DEFAULT_CONFIG.my_new_option,
  description: 'Enable my awesome new feature',

  // Optional: Show only if another option is set
  dependency: 'some_other_option',
  dependencyValue: true
}
```

### Step 4: That's It! 🎉

The dev environment will automatically:

- Generate the HTML control
- Place it in the correct category
- Handle value changes
- Update visibility based on dependencies
- Include it in YAML export

---

## 🎛️ Control Types

### Checkbox

```typescript
{
  id: 'auto_play',
  type: 'checkbox',
  label: 'Auto Play',
  category: 'carousel',
  defaultValue: true,
  description: 'Automatically advance slides'
}
```

### Select Dropdown

```typescript
{
  id: 'transition',
  type: 'select',
  label: 'Transition Effect',
  category: 'carousel',
  defaultValue: 'slide-vertical',
  options: [
    { value: 'slide-vertical', label: 'Slide Vertical' },
    { value: 'slide-horizontal', label: 'Slide Horizontal' },
    { value: 'fade', label: 'Fade' }
  ]
}
```

### Number Input

```typescript
{
  id: 'slide_duration_sec',
  type: 'number',
  label: 'Slide Duration',
  category: 'carousel',
  min: 1,
  max: 60,
  step: 1,
  defaultValue: 5,
  description: 'Seconds per slide'
}
```

### Text Input

```typescript
{
  id: 'modal_width',
  type: 'text',
  label: 'Custom Width',
  category: 'modal',
  defaultValue: '',
  description: 'e.g. "800px" or "80%"'
}
```

### Textarea

```typescript
{
  id: 'style',
  type: 'textarea',
  label: 'Custom CSS',
  category: 'advanced',
  defaultValue: '',
  description: 'Custom styles for the card'
}
```

---

## 🔗 Dependencies

Controls can be shown/hidden based on other control values:

```typescript
{
  id: 'modal_size',
  label: 'Modal Size',
  type: 'select',
  category: 'modal',

  // Only show when open_in_modal is true
  dependency: 'open_in_modal',
  dependencyValue: true,

  options: [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ]
}
```

---

## 📁 Categories

Controls are grouped into categories:

| Category      | Purpose                             |
| ------------- | ----------------------------------- |
| `basic`       | Entity selection and basic settings |
| `layout`      | Aspect ratio, grid, image layout    |
| `carousel`    | Animation, timing, auto-play        |
| `content`     | What content to show                |
| `navigation`  | Arrows, indicators, keyboard        |
| `modal`       | Modal view settings                 |
| `performance` | Performance optimizations           |
| `advanced`    | Custom CSS, experimental features   |

Add new categories in `CATEGORY_LABELS`:

```typescript
export const CATEGORY_LABELS: Record<string, string> = {
  basic: 'Basic Settings',
  // ... existing
  my_category: 'My Custom Category', // ← Add here
};
```

---

## 🎨 Usage in HTML

### Minimal HTML Structure

```html
<div class="left-panel">
  <!-- Preset Selector (optional) -->
  <div class="control-section">
    <h3>Quick Start</h3>
    <select id="preset">
      <option value="">Select Preset...</option>
    </select>
  </div>

  <!-- Dynamic controls injected here -->
  <div id="dynamicControls"></div>
</div>
```

### JavaScript Initialization

```javascript
import { initializeDynamicUI, loadPreset } from './ui-generator.ts';
import { DEFAULT_CONFIG } from '../src/constants.ts';

// Initialize with callback
initializeDynamicUI({
  containerId: 'dynamicControls',
  initialConfig: DEFAULT_CONFIG,
  onConfigChange: config => {
    console.log('Config changed:', config);
    updateCards(config);
    updateYAML(config);
  },
});

// Handle preset selection
document.getElementById('preset').addEventListener('change', e => {
  const presetConfig = loadPreset(e.target.value);
  if (presetConfig) {
    updateControlValues(presetConfig);
  }
});
```

---

## 🧪 Testing

### Verify All Controls Generated

```javascript
import { getAllControlIds } from './ui-generator.ts';

console.log('Total controls:', getAllControlIds().length);
// Should match CONFIG_SCHEMA.length
```

### Test Dependency System

```javascript
import { isControlVisible } from './config-generator.ts';

const config = { open_in_modal: false };
const shouldShow = isControlVisible('modal_size', config);
console.log('modal_size visible:', shouldShow); // false
```

---

## 📊 Benefits

### Before (Manual HTML)

```html
<!-- Had to manually add controls -->
<div class="control-group">
  <label>My Option</label>
  <input type="checkbox" id="my_option" />
</div>

<!-- And manually wire up events -->
<script>
  document.getElementById('my_option').addEventListener('change', ...);
</script>

<!-- And manually update YAML -->
<!-- And manually handle visibility -->
<!-- And keep everything in sync! 😰 -->
```

### After (Dynamic System)

```typescript
// Just add to schema
{
  id: 'my_option',
  label: 'My Option',
  type: 'checkbox',
  category: 'advanced',
  defaultValue: false
}
// Done! Everything else is automatic ✨
```

---

## 🚀 Advanced Features

### Custom Option Generation

Automatically pull options from constants:

```typescript
import { MODAL_SIZES } from '../src/constants';

{
  id: 'modal_size',
  type: 'select',
  options: Object.keys(MODAL_SIZES).map(size => ({
    value: size,
    label: size.charAt(0).toUpperCase() + size.slice(1)
  }))
}
```

### Conditional Defaults

```typescript
{
  id: 'lazy_load_images',
  type: 'checkbox',
  defaultValue: DEFAULT_CONFIG.lazy_load_images,
  dependency: 'show_images',
  dependencyValue: true  // Only visible when images are shown
}
```

---

## 🔧 Maintenance

### When Adding New Features

1. Add TypeScript type
2. Add default constant
3. Add to CONFIG_SCHEMA
4. Test in dev environment
5. Commit changes

That's it! The dev UI updates automatically.

### When Removing Features

1. Remove from TypeScript types
2. Remove from constants
3. Remove from CONFIG_SCHEMA
4. Dev UI automatically updates

No orphaned HTML controls! 🎯

---

## 📚 Examples

See `SUMMARY.md` for complete usage examples and patterns.

---

## 💡 Tips

1. **Group related options** - Use categories to organize
2. **Add descriptions** - Help users understand each option
3. **Use dependencies** - Hide irrelevant options
4. **Test presets** - Verify common configurations work
5. **Keep schema clean** - Remove unused options

---

## 🐛 Troubleshooting

### Control not appearing?

- Check `CONFIG_SCHEMA` has entry for the control
- Verify `defaultValue` is set
- Check if `dependency` condition is met

### Value not updating?

- Verify control `id` matches config key
- Check event listener is attached
- Look for console errors

### Dependencies not working?

- Ensure dependency field exists in schema
- Verify `dependencyValue` matches control value type
- Call `updateControlVisibility()` after config changes

---

**Last Updated:** 2024-02-02  
**Version:** 2.1.0

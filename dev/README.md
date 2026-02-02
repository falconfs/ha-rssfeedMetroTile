# Development Environment - User Guide

## 🎉 NEW: Dynamic Configuration System

**The dev environment now uses automatically generated UI controls!**

✨ **What does this mean?**

- Controls are generated from TypeScript types
- New config options automatically get UI
- No manual HTML editing needed
- Always in sync with the main codebase

📚 **See:** [DYNAMIC_CONFIG.md](./DYNAMIC_CONFIG.md) for details

---

## 🚀 Quick Start

### Start Development Server

```bash
# Option 1: Only Vite (fast UI updates)
npm run dev

# Option 2: Vite + Rollup Watch (HMR for src/ changes)
npm run dev:hmr
```

Then open: **http://localhost:3000**

---

## ✨ Features

### 1. **Professional Split-View Layout**

- **Left Panel**: Configuration controls & YAML editor
- **Right Panel**: Live card preview with grid simulator
- Resizable and mobile-responsive

### 2. **Dynamic Configuration Controls** (30+ Options)

**Automatically generated from source code!**

All Home Assistant editor options available:

- ✅ **Basic**: Entity selection (14 mock entities)
- ✅ **Layout**: Aspect ratio, height, image layout, grid
- ✅ **Carousel**: Duration, transition, auto-play, pause
- ✅ **Content**: Row limit, images, lazy loading
- ✅ **Navigation**: Arrows, dots, keyboard
- ✅ **Modal**: Type, size, animation, settings (NEW v2.1.0!)
- ✅ **Performance**: Warnings, optimization
- ✅ **Advanced**: Custom CSS

**When you add a new config option to `src/types.ts`, it automatically appears here!** 🎯

### 3. **YAML Editor with Syntax Highlighting**

- **CodeMirror-powered** professional editor
- **Two-way sync**: Changes in controls → YAML updates, YAML edits → controls update
- **Live validation**: Error highlighting
- **Quick Actions**: Format, Copy, Reset
- **Copy/Paste**: From HA Dashboard YAML configs

### 4. **Grid Layout Simulator**

Test how your card looks in different grid sizes:

- **9 Presets**: 1×1, 2×1, 2×2, 3×2, 4×2, 6×2, 4×3, 6×3
- **Custom sizes**: Free input for rows/columns
- **Dynamic resizing**: Card adapts to grid size in real-time

### 5. **View Modes**

- **📱 Single View**: Focus on one configuration
- **⚖️ Compare View**: Side-by-side comparison (Main vs Variant)
- **⊞ Grid View (2×2)**: 4 cards with different presets simultaneously

### 6. **HA Theme Simulator**

Test card appearance with different Home Assistant themes:

- Default (Light/Dark)
- Blue, Red, Green, Purple
- High Contrast
- Custom theme builder (coming soon)

### 7. **20 Quick Presets**

Load pre-configured test scenarios instantly:

- **Standard**: Default, Square, Widescreen, Split
- **Content Tests**: No Images, Empty Feed, Fast Carousel
- **Edge Cases**: Long Titles, No Descriptions, Old Dates
- **Image Tests**: Mixed Images, Broken Images, Slow Loading
- **Error States**: Unavailable, Missing Data, Malformed Data
- **Performance**: 50+ items test

### 8. **Enhanced Mock Data** (14 Entities)

Comprehensive test scenarios:

- `sensor.die_zeit` - 10 regular items
- `sensor.test_feed` - 5 items
- `sensor.empty_feed` - Empty (error handling)
- `sensor.no_images` - Text-only feed
- `sensor.long_titles` - Overflow testing
- `sensor.no_description` - Layout testing
- `sensor.old_dates` - Date formatting (years ago)
- `sensor.mixed_images` - Some broken, some valid
- `sensor.broken_images` - All broken (fallback testing)
- `sensor.slow_images` - 2s delay (lazy loading test)
- `sensor.many_items` - 50 items (performance warning)
- `sensor.unavailable` - Unavailable entity state
- `sensor.missing_entries` - Missing `entries` attribute
- `sensor.malformed_data` - Invalid data type

### 9. **Hot Module Reload (HMR)**

Edit `src/*.ts` files → Rollup rebuilds → Vite reloads → Card updates automatically!

```bash
# Start HMR mode
npm run dev:hmr
```

Changes detected in **~2 seconds**!

### 10. **Developer Tools**

- **Config Status**: Live summary of current configuration
- **Quick Actions**:
  - 📋 Copy YAML to clipboard
  - 🔄 Reset to default config
  - 🔗 Share config via URL
  - 💾 Export config as JSON
- **Toast Notifications**: Visual feedback for all actions
- **URL State Persistence**: Shareable configuration URLs

---

## 📖 Usage Guide

### Basic Workflow

1. **Start Dev Server**

   ```bash
   npm run dev:hmr
   ```

2. **Select Entity** (Left Panel → Config Tab)
   - Choose from 14 mock entities
   - Try edge cases like `sensor.broken_images`

3. **Adjust Settings**
   - Change layout, carousel, navigation options
   - See live updates in preview

4. **Test Grid Sizes**
   - Select grid preset (e.g., "6×2 Full Width")
   - Or enter custom rows/columns

5. **Try Different Themes**
   - Switch between 7 HA themes
   - See how card adapts to colors

6. **View Modes**
   - Single: Focus on current config
   - Compare: Test variations side-by-side
   - Grid: View 4 presets simultaneously

### YAML Workflow

1. **Switch to YAML Tab**
2. **Paste Config from HA Dashboard**
   ```yaml
   type: custom:rssfeed-metro-tile
   entity: sensor.my_feed
   aspect_ratio: '16:9'
   transition: fade
   ```
3. **Edit directly** - Controls update automatically
4. **Copy YAML** - Use in Home Assistant

### Quick Preset Testing

1. **Load Preset** (Config Tab → Quick Presets)
2. **Try these scenarios**:
   - "Performance Test" - 50 items, shows warning
   - "Broken Images" - Tests fallback UI
   - "Empty Feed" - Shows empty state message
   - "Minimal" - No controls, clean look

### Comparison Testing

1. **Switch to Compare View**
2. **Left Card**: Your main config
3. **Right Card**: Automatic variant (different aspect ratio)
4. **Compare visually**: Transitions, layouts, etc.

### Share Configuration

1. **Adjust settings** to desired config
2. **Click "Share (URL)"**
3. **URL copied** with encoded config
4. **Share with team** - They load your exact config

---

## 🔧 Keyboard Shortcuts

| Key            | Action                   |
| -------------- | ------------------------ |
| `Ctrl/Cmd + K` | Focus YAML editor        |
| `Ctrl/Cmd + F` | Format YAML              |
| `Ctrl/Cmd + C` | Copy YAML (when focused) |

---

## 🎯 Testing Scenarios

### Test Empty/Error States

1. Select `sensor.empty_feed`
2. → Should show "No feed items" message

### Test Image Fallbacks

1. Select `sensor.broken_images`
2. Enable "Show Images"
3. → Should show placeholder/fallback

### Test Performance Warning

1. Select `sensor.many_items` (50 items)
2. Set Performance Warning: 20
3. → Should show warning message

### Test Lazy Loading

1. Select `sensor.slow_images`
2. Enable "Lazy Load Images"
3. → Images load progressively

### Test Long Content

1. Select `sensor.long_titles`
2. Increase Tile Height: 400px
3. → Text should wrap/truncate properly

### Test Different Transitions

1. Set Transition: "Fade"
2. → Smooth fade effect
3. Change to "Slide Horizontal"
4. → Slides left/right

### Test Grid Layouts

1. Select Grid Preset: "2×2"
2. → Card shrinks to small square
3. Select "6×2"
4. → Card expands to full width

### Test Themes

1. Select Theme: "Dark"
2. → Card switches to dark background
3. Select "High Contrast"
4. → Bright colors, high visibility

---

## 📊 Mock Data Reference

### Entity Details

| Entity                   | Items | Special Features                  |
| ------------------------ | ----- | --------------------------------- |
| `sensor.die_zeit`        | 10    | Regular feed with images          |
| `sensor.test_feed`       | 5     | Small feed for quick tests        |
| `sensor.empty_feed`      | 0     | Empty state testing               |
| `sensor.no_images`       | 8     | Text-only (no image links)        |
| `sensor.long_titles`     | 8     | Very long titles (overflow test)  |
| `sensor.no_description`  | 8     | Only titles, no descriptions      |
| `sensor.old_dates`       | 8     | Dates years ago (formatting test) |
| `sensor.mixed_images`    | 9     | Every 3rd image is broken         |
| `sensor.broken_images`   | 5     | All images return 404             |
| `sensor.slow_images`     | 5     | 2 second delay per image          |
| `sensor.many_items`      | 50    | Performance warning trigger       |
| `sensor.unavailable`     | 0     | Entity state = "unavailable"      |
| `sensor.missing_entries` | 0     | Missing `entries` attribute       |
| `sensor.malformed_data`  | 0     | `entries` is string, not array    |

### Preset Configurations

| Preset          | Description                 |
| --------------- | --------------------------- |
| `default`       | 5s slide-vertical, 10 items |
| `square`        | 1:1 aspect, fade transition |
| `widescreen`    | 16:9, horizontal slide      |
| `split`         | 4:3, split image layout     |
| `noImages`      | Uses entity with no images  |
| `empty`         | Empty feed entity           |
| `fast`          | 2s slide duration           |
| `minimal`       | No controls, clean          |
| `longTitles`    | 400px height, long text     |
| `noDescription` | Only titles                 |
| `oldDates`      | Years-old dates             |
| `mixedImages`   | Some broken images          |
| `brokenImages`  | All broken images           |
| `slowImages`    | Slow loading test           |
| `performance`   | 50 items, warning at 20     |
| `unavailable`   | Error state                 |
| `missingData`   | Missing entries             |
| `malformed`     | Wrong data type             |

---

## 🛠️ Troubleshooting

### Card doesn't load

- **Check console** for errors
- **Rebuild**: `npm run build`
- **Clear cache**: Hard refresh (Ctrl+Shift+R)

### YAML errors

- **Check syntax**: Format button highlights issues
- **Validate types**: Numbers shouldn't be quoted
- **Reset**: Use Reset button to start fresh

### Theme not applying

- **Refresh page** after theme change
- **Check CSS vars**: Open DevTools → Inspect element

### Grid size not working

- **Select preset first** before custom input
- **Check card wrapper width** in DevTools

### HMR not working

- **Make sure** both processes are running:
  ```bash
  npm run dev:hmr
  ```
- **Check console** for Rollup/Vite logs

---

## 🚀 Advanced Tips

### Custom Theme Testing

1. Open DevTools → Elements
2. Inspect `:root` element
3. Manually edit CSS variables
4. Test card appearance

### Test Extreme Cases

- **10,000px height**: See what breaks
- **1×1 grid, 16:9 aspect**: Stress test layout
- **All options OFF**: Minimal card testing

### Export/Import Workflow

1. **Develop in dev environment**
2. **Export JSON** when happy
3. **Convert to YAML** (or paste directly)
4. **Use in Home Assistant**

### Debugging

- Enable "Show Debug Info" (Advanced tab)
- Check console for detailed logs
- Inspect card element in DevTools

---

## 📝 Notes

- **Performance**: 50+ items may be slow (intentional for warning test)
- **Network**: Slow/broken images use external services (deelay.me, broken-url.invalid)
- **Storage**: Config persisted in URL, not localStorage
- **Mobile**: Layout stacks vertically on small screens

---

## 🎓 Learning Resources

- **Home Assistant Lovelace Docs**: https://www.home-assistant.io/dashboards/
- **Lit Framework**: https://lit.dev/
- **YAML Syntax**: https://yaml.org/
- **CodeMirror**: https://codemirror.net/

---

## 🤝 Contributing

When developing new features:

1. Test in dev environment first
2. Try all presets and edge cases
3. Test on mobile (responsive view)
4. Verify YAML sync works
5. Run E2E tests: `npm run test:e2e`

---

**Enjoy the enhanced development experience!** 🎉

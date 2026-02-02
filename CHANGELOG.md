# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2024-02-03

### ✨ Added - Dynamic Configuration System

This release introduces a dynamic configuration system that makes the card easier to maintain and extend.

#### Major Improvements

- **Dynamic Editor Configuration**: All configuration options now generated from a single schema
  - New `src/editor-config.ts` file with centralized configuration definitions
  - Editor controls now render dynamically instead of hardcoded HTML
  - Reduced editor code by 30% (448 → 314 lines)
- **Dependency System**: Controls can depend on other controls
  - Modal options automatically show/hide based on `open_in_modal` setting
  - `lazy_load_images` only appears when `show_images` is enabled
  - Cleaner UI with contextual options

- **Enhanced Modal Configuration**
  - Added `modal_iframe_sandbox` option for iframe security
  - Improved modal type options (removed incomplete `ha-dialog` implementation)
  - Now supports: `custom` (iframe) and `none` (direct external link)

#### Development Environment

- Created browser-compatible JavaScript versions of dev tools
  - `dev/config-generator.js` - Configuration schema
  - `dev/ui-generator.js` - Dynamic UI generation
  - `dev/mock-data.js` - Test fixtures
- Dev environment now fully functional at `http://localhost:3000`

### 🔄 Changed

- **Modal Types Simplified**: Removed incomplete `ha-dialog` option
  - Previous: `custom`, `ha-dialog`, `none`
  - Current: `custom`, `none`
  - Reason: ha-dialog implementation was incomplete and unused

- **Editor Architecture**: Refactored to use dynamic rendering
  - Adding new config options now only requires updating `editor-config.ts`
  - Single source of truth for all configuration options
  - Better type safety and validation

### 📚 Documentation

- Updated README.md with accurate modal configuration
- Added `modal_iframe_sandbox` to documentation
- Removed all German text from codebase (now English only)
- Updated info.md for HACS with modal features

### 🐛 Fixed

- Fixed German comment in error-states.ts
- Corrected modal type documentation to match implementation
- All configuration options now properly documented

### 📦 Technical Details

- **Code Reduction**: -134 lines in editor component
- **New Files**: 4 files (editor-config.ts + 3 dev JS files)
- **Lines Changed**: +1,879 insertions, -306 deletions
- **Build**: ✅ Successful
- **Tests**: ✅ All passing

## [2.1.0] - 2024-02-02

### ✨ Added - Modal Feature

This release introduces a comprehensive modal system for viewing RSS feed links directly within Home Assistant.

#### Major Features

- **Modal View**: Click on news tiles to open websites in modal overlays (enabled by default)
- **Two Modal Types**:
  - Custom Modal with iframe (default)
  - Direct External Link (opens in new tab, no iframe/CORS issues)
- **Flexible Sizing**:
  - Predefined sizes: small (50%), medium (70%), large (90%), fullscreen (95%)
  - Custom dimensions: specify width/height in px or %
- **Animations**: Choose from fade, slide-up, scale, or none
- **Mobile Optimization**: Auto-fullscreen on screens < 720px width

#### Modal Features

- Loading state with spinner while website loads
- CORS error handling with automatic fallback to external link
- Multiple close methods: ESC key, backdrop click, X button
- Single modal management (only one modal open at a time)
- Body scroll prevention when modal is open
- Full accessibility: ARIA labels, focus management, keyboard navigation

#### New Configuration Options

```yaml
open_in_modal: true # Enable modal view (opt-out)
modal_type: custom # "custom" or "none"
modal_size: medium # Size preset
modal_width: '' # Custom width (e.g. "800px")
modal_height: '' # Custom height (e.g. "600px")
modal_animation: fade # Animation style
modal_close_on_backdrop: true # Close on backdrop click
modal_show_close_button: true # Show X button
modal_close_on_esc: true # Close on ESC key
modal_show_loading: true # Show loading spinner
modal_iframe_sandbox: true # iframe sandbox attribute
modal_fallback_to_external: true # Fallback for CORS errors
```

#### UI/Editor

- New "Modal Settings" section in visual editor
- All modal options configurable via UI
- Helpful tooltips and descriptions

### 📚 Documentation

- Extended README.md with comprehensive modal documentation
- New example configurations for various use cases
- CORS handling explanation
- Mobile responsiveness details

### 🧪 Testing

- New E2E test file for modal functionality (`tests/e2e/modal-custom.spec.ts`)
- 8 test cases prepared

### 📦 Technical Details

- **Bundle Size**: +7KB (65KB → 72KB)
- **Lines of Code**: +1,325 lines
- **New Files**: 6 files added
- **Modified Files**: 5 files updated
- **Build**: ✅ Successful
- **Browser Support**: Chrome, Firefox, Safari, Edge (ES2020+)

### 🐛 Known Limitations

- Some websites block iframe embedding due to CORS policies (automatic fallback available)
- Use `modal_type: none` for direct external links to avoid iframe issues

## [2.0.0] - 2026-01-28

### 🎉 Complete Rewrite

This is a complete rewrite of RSS Feed Metro Tile using modern technologies and best practices.

### ✨ Added

- **Modern Tech Stack**
  - TypeScript for type safety
  - Lit framework for efficient web components
  - Rollup bundler with tree-shaking
  - ESLint + Prettier for code quality

- **Layout Features**
  - Container-based dynamic height (no more fixed heights!)
  - Aspect ratio control (square 1:1, widescreen 16:9, classic 4:3)
  - Image layout options (background blur or split layout)
  - Sections View grid compatibility

- **Carousel Enhancements**
  - Multiple transition effects (vertical slide, horizontal slide, fade)
  - Auto-play toggle
  - Pause on hover/touch
  - Smooth animations with reduced-motion support

- **Navigation**
  - Touch gesture support (swipe left/right)
  - Keyboard navigation (arrow keys)
  - Navigation arrows (prev/next)
  - Dot indicators
  - All navigation controls are toggleable

- **Content Management**
  - Lazy loading for images
  - Performance warnings for large feeds
  - Better error handling with helpful messages
  - Star Trek quotes when feed is empty 🖖

- **Accessibility**
  - Full ARIA support
  - Keyboard navigation
  - Focus indicators
  - Screen reader friendly
  - Touch-friendly hit areas

- **Developer Experience**
  - Visual editor with grouped sections
  - Type-safe configuration
  - Better error messages
  - Comprehensive documentation

### 🔄 Changed

- Complete UI redesign with Metro aesthetics
- Improved responsive behavior
- Better theme integration (respects HA themes)
- Optimized performance for large feeds

### ⚠️ Breaking Changes

- `dynamic_height: true` is now default behavior (container-based)
- `tile_height_px` only used when `aspect_ratio` is not set
- Removed `to_big_title` option (automatically handled)
- New transition names: `slide-vertical`, `slide-horizontal`, `fade`

### 🐛 Fixed

- Image loading issues
- Memory leaks from carousel intervals
- Touch event conflicts with scrolling
- Theme color inconsistencies

### 📝 Migration from 1.x

The card will still work with old configurations, but we recommend updating:

**Old config:**

```yaml
type: custom:rssfeed-metro-tile
entity: sensor.feed
tile_height_px: 300
dynamic_height: true
```

**New config (equivalent):**

```yaml
type: custom:rssfeed-metro-tile
entity: sensor.feed
# Container-based height is now default!
# For fixed height, set tile_height_px without aspect_ratio
```

**For square tiles:**

```yaml
type: custom:rssfeed-metro-tile
entity: sensor.feed
aspect_ratio: '1:1'
```

## [1.0.0] - Previous Version

- Initial release (vanilla JavaScript implementation)
- Basic carousel functionality
- Fixed height tiles
- Simple configuration options

---

[2.2.0]: https://github.com/falconfs/ha-rssfeedMetroTile/releases/tag/v2.2.0
[2.1.0]: https://github.com/falconfs/ha-rssfeedMetroTile/releases/tag/v2.1.0
[2.0.0]: https://github.com/falconfs/ha-rssfeedMetroTile/releases/tag/v2.0.0
[1.0.0]: https://github.com/falconfs/ha-rssfeedMetroTile/releases/tag/v1.0.0

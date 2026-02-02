# RSS Feed Metro Tile - Developer Guide

## Project Overview

Home Assistant Lovelace dashboard card that displays RSS feed entries as animated Metro-style tiles. This is a HACS-compatible custom card that cycles through feed items with customizable transitions and layouts.

**Current Version:** 2.2.0  
**Status:** Production Ready  
**Last Updated:** 2024-02-03

## Tech Stack

### Current Implementation

- **TypeScript**: Full type safety and modern JavaScript features
- **Lit**: Efficient web components framework
- **Rollup**: Module bundling with tree-shaking
- **Vite**: Development server with HMR
- **ESLint + Prettier**: Code quality and formatting
- **Playwright**: E2E testing
- **Vitest**: Unit testing
- **HACS**: Home Assistant Community Store integration

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- ES2020+ features required

## Project Structure

```
ha-rssfeedMetroTile/
├── src/
│   ├── rssfeed-metro-tile.ts         # Main card component (Lit)
│   ├── rssfeed-metro-tile-editor.ts  # Visual editor (Dynamic UI)
│   ├── editor-config.ts               # Editor configuration schema ⭐ NEW
│   ├── types.ts                       # TypeScript interfaces
│   ├── constants.ts                   # Configuration defaults
│   ├── components/
│   │   ├── custom-modal.ts            # Custom modal component
│   │   └── ha-dialog-wrapper.ts       # HA dialog integration
│   ├── utils/
│   │   ├── feed-parser.ts             # RSS feed data processing
│   │   ├── carousel.ts                # Slide animation logic
│   │   ├── modal-controller.ts        # Modal state management
│   │   ├── touch-handler.ts           # Touch/swipe gestures
│   │   ├── image-loader.ts            # Lazy image loading
│   │   └── error-messages.ts          # Error handling
│   └── styles/
│       ├── base.ts                    # Core styles
│       ├── layouts.ts                 # Layout styles
│       ├── controls.ts                # Navigation controls
│       ├── modal.ts                   # Modal styles
│       └── error-states.ts            # Error state styles
├── dev/                               # Development environment
│   ├── index.html                     # Dev preview UI
│   ├── config-generator.js            # Dynamic config schema
│   ├── ui-generator.js                # Dynamic UI generation
│   ├── mock-data.js                   # Test fixtures
│   └── README.md                      # Dev environment docs
├── tests/
│   ├── e2e/                           # Playwright E2E tests
│   └── helpers/                       # Test utilities
├── dist/                              # Build output (HACS compatible)
│   └── rssfeed-metro-tile.js          # Bundled card (72KB)
├── hacs.json                          # HACS metadata
├── info.md                            # HACS description
├── CHANGELOG.md                       # Version history
├── package.json
├── tsconfig.json
├── rollup.config.js
├── vite.config.ts
└── README.md
```

## Core Features

### Card Configuration

```yaml
type: custom:rssfeed-metro-tile
entity: sensor.rss_feed

# Layout
aspect_ratio: '16:9' # "1:1", "16:9", "4:3" or empty
image_layout: background # "background" or "split"

# Carousel
slide_duration_sec: 5
transition: slide-vertical # "slide-vertical", "slide-horizontal", "fade"
auto_play: true
pause_on_hover: true

# Content
row_limit: 10
show_images: true
lazy_load_images: true

# Navigation
show_navigation: true
show_indicators: true
keyboard_navigation: true

# Modal
open_in_modal: true
modal_type: custom # "custom" or "none"
modal_size: medium # "small", "medium", "large", "fullscreen"
modal_animation: fade

# Grid (Sections View)
grid_rows: 4
grid_columns: 4

# Advanced
performance_warning: 20
style: '/* custom CSS */'
```

### Key Components

1. **Main Card** (`rssfeed-metro-tile`)
   - Extends `LitElement`
   - Reactive properties with `@property()` decorators
   - Shadow DOM with scoped styles
   - Automatic carousel with configurable timing
   - Touch/swipe gesture support
   - Keyboard navigation
   - Modal integration

2. **Visual Editor** (`rssfeed-metro-tile-editor`)
   - Dynamic configuration UI
   - Generates controls from `editor-config.ts` schema
   - Dependency-based control visibility
   - Entity picker with autocomplete
   - Real-time config updates
   - Grouped sections for organization

3. **Editor Configuration** (`editor-config.ts`) ⭐ NEW
   - Centralized schema for all config options
   - EditorControl interface defines control types
   - Category organization
   - Dependency system for conditional controls
   - Single source of truth

4. **Feed Parser**
   - Extracts `entries` from HA sensor attributes
   - Handles images from `links` array
   - Supports `title`, `description`, `summary`, `published`
   - Performance warnings for large feeds

5. **Carousel System**
   - Multiple transition effects (slide-vertical, slide-horizontal, fade)
   - Touch gesture handling with swipe detection
   - Countdown timer display
   - Auto-play with pause on hover
   - Keyboard navigation (arrow keys)

6. **Modal System** ⭐ NEW
   - Custom modal with iframe
   - Flexible sizing (predefined + custom dimensions)
   - Multiple animations (fade, slide-up, scale, none)
   - CORS error handling with automatic fallback
   - Mobile optimization (auto-fullscreen)
   - Accessibility (ARIA, keyboard navigation)

## Development Workflow

### Setup

```bash
npm install
npm run build          # Production build
npm run dev            # Development server with HMR
```

### Development Server

```bash
npm run dev            # Starts Vite dev server on http://localhost:3000
```

The dev environment provides:

- Live preview with mock RSS data
- Dynamic configuration controls
- Config preview (YAML/JSON)
- Theme switcher (light/dark)
- Grid presets for sections view
- No Home Assistant required for testing

### Testing

```bash
npm test                      # Run unit tests
npm run test:watch            # Watch mode
npm run test:coverage         # Coverage report
npm run test:e2e              # E2E tests (Playwright)
npm run test:e2e:ui           # E2E with UI
npm run test:e2e:debug        # E2E debug mode
```

### Code Quality

```bash
npm run lint          # ESLint
npm run format        # Prettier
npm run type-check    # TypeScript validation
```

### Building

```bash
npm run build         # Production build
npm run build:dev     # Development build with sourcemaps
```

## Best Practices

### TypeScript

- Use strict mode (`strict: true`)
- Define interfaces for all configs and state
- Use utility types (`Partial<T>`, `Required<T>`, etc.)
- Avoid `any` - use `unknown` and type guards instead

### Lit Components

```typescript
@customElement('rssfeed-metro-tile')
class RssfeedMetroTile extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) config?: CardConfig;
  @state() private _feedItems: FeedItem[] = [];
  @state() private _currentIndex = 0;

  setConfig(config: CardConfig): void {
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  protected render(): TemplateResult {
    return html`...`;
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Setup
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    // Cleanup intervals, event listeners
  }
}
```

### Dynamic Configuration System ⭐ NEW

Adding new configuration options is now simple:

```typescript
// 1. Add to src/editor-config.ts
export const EDITOR_CONTROLS: EditorControl[] = [
  // ... existing controls
  {
    id: 'new_option',
    label: 'New Option',
    type: 'checkbox', // or 'text', 'number', 'select', 'textarea'
    category: 'content', // or 'basic', 'layout', 'carousel', etc.
    helper: 'This is a helpful description',
    dependency: 'show_images', // Optional: only show if show_images is true
    dependencyValue: true,
  },
];

// 2. Add to src/types.ts
export interface CardConfig extends LovelaceCardConfig {
  // ... existing properties
  new_option?: boolean;
}

// 3. Add to src/constants.ts
export const DEFAULT_CONFIG: Partial<CardConfig> = {
  // ... existing defaults
  new_option: true,
};

// 4. Use in main component
// Access via this._config.new_option
// That's it! Editor UI updates automatically.
```

### State Management

- Use `@state()` for internal reactive state
- Use `@property()` for public API
- Avoid direct DOM manipulation
- Leverage Lit's reactive update lifecycle

### Styling

- Use `css` tagged template literals
- Respect Home Assistant theme variables:
  - `var(--ha-card-background)`
  - `var(--primary-text-color)`
  - `var(--card-background-color)`
- Support dark/light themes automatically

### Performance

- Debounce/throttle carousel updates
- Use `requestAnimationFrame` for animations
- Clean up intervals in `disconnectedCallback()`
- Lazy load images with `loading="lazy"`
- Use `will-change` CSS for animated properties
- Limit DOM manipulations during transitions

### Error Handling

- Validate config in `setConfig()`
- Provide helpful error messages (see `ERROR_MESSAGES` in constants)
- Handle missing entities gracefully
- Log warnings for deprecated options
- Show Star Trek quotes for empty feeds 🖖

## HACS Integration

### Required Files

1. **hacs.json**

   ```json
   {
     "name": "RSS Feed Metro Tile",
     "render_readme": true,
     "filename": "rssfeed-metro-tile.js"
   }
   ```

2. **info.md** - Short description for HACS UI

3. **README.md** - Full documentation with:
   - Installation instructions
   - Configuration examples
   - Screenshots
   - Troubleshooting

### Release Checklist

- [ ] Version bump in `package.json`
- [ ] Version bump in `src/constants.ts`
- [ ] Build production bundle: `npm run build`
- [ ] Test in HA instance
- [ ] Update CHANGELOG.md with new version
- [ ] Commit changes with version tag
- [ ] Create GitHub release with tag (e.g., `v2.2.0`)
- [ ] HACS auto-detects new release

## Common Tasks

### Adding New Config Option

**The Dynamic Way (Recommended):**

1. **Add to `src/editor-config.ts`:**

```typescript
{
  id: 'show_author',
  label: 'Show Author Name',
  type: 'checkbox',
  category: 'content',
}
```

2. **Add to `src/types.ts`:**

```typescript
export interface CardConfig extends LovelaceCardConfig {
  // ...
  show_author?: boolean;
}
```

3. **Add to `src/constants.ts`:**

```typescript
export const DEFAULT_CONFIG: Partial<CardConfig> = {
  // ...
  show_author: false,
};
```

4. **Implement in main component:**

```typescript
${this._config.show_author ? html`<div>${item.author}</div>` : ''}
```

5. **Update README.md** with configuration example

That's it! The editor UI updates automatically.

### Adding Modal Type or Animation

Modal options are defined in `src/constants.ts`:

```typescript
export const MODAL_ANIMATIONS = {
  'slide-down': {
    enter: 'slideDown 0.3s ease-out',
    exit: 'slideUp 0.2s ease-in',
  },
  // Add keyframes in src/styles/modal.ts
} as const;
```

Then add CSS keyframes in `src/styles/modal.ts`.

### Adding Transition Effect

1. Add to `src/constants.ts`:

```typescript
export const SUPPORTED_TRANSITIONS = [
  'slide-vertical',
  'slide-horizontal',
  'fade',
  'zoom', // NEW
] as const;
```

2. Update type in `src/types.ts`:

```typescript
export type TransitionType = 'slide-vertical' | 'slide-horizontal' | 'fade' | 'zoom';
```

3. Implement transition in `src/utils/carousel.ts`

4. Editor dropdown updates automatically (pulls from constants)

### Testing Locally with Development Server

```bash
# Start dev server
npm run dev

# Open http://localhost:3000
```

Features:

- Mock RSS feed data with realistic entries
- All configuration controls functional
- Theme switcher (light/dark)
- Grid layout presets
- Config preview (YAML/JSON)
- No Home Assistant installation needed

### Testing in Home Assistant

1. Build with `npm run build` (creates `dist/rssfeed-metro-tile.js`)
2. Copy to `<HA>/www/rssfeed-metro-tile.js`
3. Add to Lovelace resources:

```yaml
resources:
  - url: /local/rssfeed-metro-tile.js?v=2.2.0
    type: module
```

4. Clear browser cache (Ctrl+F5)
5. Add card to dashboard
6. Use browser DevTools for debugging

## Migration Notes

### From 1.x to 2.x (Vanilla JS to Lit + TypeScript)

#### Breaking Changes

- ES Modules instead of IIFE
- TypeScript types required for development
- Lit lifecycle methods replace vanilla WC
- Config validation is stricter
- `dynamic_height: true` is now default (container-based)
- `tile_height_px` only used when `aspect_ratio` is not set

#### Compatibility

- Maintains same config schema where possible
- Supports old `style` property for custom CSS
- Keeps `entity` as primary config
- Preserves carousel behavior
- Old configs mostly work without changes

### Version 2.2.0 Changes

- Removed incomplete `ha-dialog` modal type
- Added `modal_iframe_sandbox` configuration
- Editor now uses dynamic configuration system
- All text is English only (removed German comments)
- Modal types: `custom` (iframe) or `none` (direct link)

## Resources

- [Home Assistant Frontend](https://developers.home-assistant.io/docs/frontend/)
- [Lit Documentation](https://lit.dev/docs/)
- [HACS Documentation](https://hacs.xyz/docs/publish/start)
- [Custom Card Helpers](https://github.com/custom-cards/custom-card-helpers)

## Architecture Principles

### Separation of Concerns

- **Component** (`src/rssfeed-metro-tile.ts`): UI rendering and user interaction
- **Editor** (`src/rssfeed-metro-tile-editor.ts`): Configuration UI (dynamic)
- **Config Schema** (`src/editor-config.ts`): Configuration definitions ⭐ NEW
- **Utils** (`src/utils/`): Business logic (feed parsing, carousel, modal, etc.)
- **Types** (`src/types.ts`): Contracts and interfaces
- **Constants** (`src/constants.ts`): Configuration defaults and options
- **Styles** (`src/styles/`): Component styles (base, layouts, controls, modal, errors)
- **Components** (`src/components/`): Reusable components (modal, dialogs)

### Reactive Data Flow

```
HA State Change → hass setter → _feedItems update → render()
Config Change → setConfig() → reactive properties → render()
Modal Open → modal-controller → CustomModal component → iframe load
Touch Event → touch-handler → carousel.goNext() → slide transition
```

### Dynamic Configuration System ⭐ NEW

```
editor-config.ts (Schema)
    ↓
getControlsByCategory()
    ↓
Editor.render() → Dynamic UI
    ↓
User Changes Config
    ↓
fireEvent('config-changed')
    ↓
Main Card Updates
```

Benefits:

- Single source of truth for all config options
- Adding new options requires minimal code changes
- Automatic UI generation with dependency handling
- Type-safe configuration throughout
  HA State Change → hass setter → \_feed update → render()
  Config Change → setConfig() → reactive properties → render()

```

### Testability
- Pure functions in utils (easy to unit test)
- Mock Home Assistant objects for testing
- Test carousel timing logic independently
- E2E tests with Playwright for user interactions
- Visual regression tests for styles
- Development environment for manual testing

## Recent Updates (v2.2.0)

### Dynamic Configuration System
- Centralized configuration schema in `editor-config.ts`
- Editor generates UI dynamically from schema
- Dependency system for conditional controls
- Reduced editor code by 30% (448 → 314 lines)

### Modal Improvements
- Added `modal_iframe_sandbox` security option
- Simplified modal types to `custom` and `none`
- Removed incomplete `ha-dialog` implementation
- Better documentation and examples

### Code Quality
- All text now in English only
- Improved maintainability with single source of truth
- Better type safety throughout
- Comprehensive documentation

---

**Note**: This project prioritizes modern web standards, maintainability, and Home Assistant ecosystem compatibility. When in doubt, follow existing HA card patterns and Lit best practices.

**Version**: 2.2.0
**Author**: falconfs
**License**: MIT
**Repository**: https://github.com/falconfs/ha-rssfeedMetroTile
```

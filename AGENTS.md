# RSS Feed Metro Tile - Developer Guide

## Project Overview
Home Assistant Lovelace dashboard card that displays RSS feed entries as animated Metro-style tiles. This is a HACS-compatible custom card that cycles through feed items with customizable transitions and layouts.

## Tech Stack

### Current (Legacy - `/old`)
- Vanilla JavaScript (ES6+)
- Web Components API
- Shadow DOM
- Custom Elements

### Planned (Modern Implementation)
- **TypeScript**: Type safety and better DX
- **Lit**: Lightweight web components framework
- **Rollup/Vite**: Modern bundling with tree-shaking
- **ESLint + Prettier**: Code quality and formatting
- **Jest/Vitest**: Unit testing
- **HACS**: Home Assistant Community Store integration

## Project Structure

```
ha-rssfeedMetroTile/
├── src/
│   ├── rssfeed-metro-tile.ts         # Main card component
│   ├── rssfeed-metro-tile-editor.ts  # Visual editor component
│   ├── types.ts                       # TypeScript interfaces
│   ├── constants.ts                   # Configuration defaults
│   └── utils/
│       ├── feed-parser.ts             # RSS feed data processing
│       ├── carousel.ts                # Slide animation logic
│       └── styles.ts                  # Styled components
├── test/
│   └── *.test.ts                      # Unit tests
├── dist/                              # Build output (HACS compatible)
│   └── rssfeed-metro-tile.js
├── old/                               # Legacy implementation (reference only)
├── hacs.json                          # HACS metadata
├── package.json
├── tsconfig.json
├── rollup.config.js / vite.config.ts
└── README.md
```

## Core Features

### Card Configuration
```yaml
type: custom:rssfeed-metro-tile
entity: sensor.rss_feed
tile_height_px: 300
slide_duration_sec: 5
show_images: true
row_limit: 10
dynamic_height: true
style: "/* custom CSS */"
```

### Key Components
1. **Main Card** (`rssfeed-metro-tile`)
   - Extends `LitElement`
   - Reactive properties with `@property()` decorators
   - Shadow DOM with scoped styles
   - Automatic carousel with configurable timing

2. **Visual Editor** (`rssfeed-metro-tile-editor`)
   - WYSIWYG configuration interface
   - Entity picker with autocomplete
   - Real-time preview updates

3. **Feed Parser**
   - Extracts `entries` from HA sensor attributes
   - Handles images from `links` array
   - Supports `title`, `description`, `summary`, `published`

4. **Carousel System**
   - Vertical slide transitions
   - Countdown timer display
   - Automatic loop with interval management

## Development Workflow

### Setup
```bash
npm install
npm run build
npm run dev  # Watch mode with hot reload
```

### Testing
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
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

### Lit Components
```typescript
@customElement('rssfeed-metro-tile')
class RssfeedMetroTile extends LitElement {
  @property({ type: Object }) hass?: HomeAssistant;
  @property({ type: Object }) config?: CardConfig;
  @state() private _feed: FeedItem[] = [];
  
  setConfig(config: CardConfig): void { }
  
  render() {
    return html`...`;
  }
}
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

### Error Handling
- Validate config in `setConfig()`
- Provide helpful error messages
- Handle missing entities gracefully
- Log warnings for deprecated options

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
- [ ] Build production bundle
- [ ] Test in HA instance
- [ ] Update CHANGELOG.md
- [ ] Create GitHub release with tag
- [ ] HACS auto-detects new release

## Common Tasks

### Adding New Config Option
1. Add to `types.ts` interface
2. Update `constants.ts` defaults
3. Add editor field in `rssfeed-metro-tile-editor.ts`
4. Implement logic in main component
5. Update README with example

### Debugging in Home Assistant
1. Build with `npm run build:dev` (includes sourcemaps)
2. Copy `dist/rssfeed-metro-tile.js` to `<HA>/www/`
3. Add to dashboard as custom card
4. Open browser DevTools → Sources
5. Set breakpoints in mapped TypeScript files

### Testing Locally
```javascript
// Mock Home Assistant object
const mockHass = {
  states: {
    'sensor.rss_feed': {
      attributes: {
        entries: [/* feed items */]
      }
    }
  }
};
```

## Migration Notes (Old → New)

### Breaking Changes
- ES Modules instead of IIFE
- TypeScript types required
- Lit lifecycle methods replace vanilla WC
- Config validation strictness

### Compatibility
- Maintain same config schema
- Support old `style` property for custom CSS
- Keep `entity` as primary config
- Preserve carousel behavior

## Resources
- [Home Assistant Frontend](https://developers.home-assistant.io/docs/frontend/)
- [Lit Documentation](https://lit.dev/docs/)
- [HACS Documentation](https://hacs.xyz/docs/publish/start)
- [Custom Card Helpers](https://github.com/custom-cards/custom-card-helpers)

## Architecture Principles

### Separation of Concerns
- **Component**: UI rendering and user interaction
- **Utils**: Business logic (feed parsing, carousel)
- **Types**: Contracts and interfaces
- **Constants**: Configuration and defaults

### Reactive Data Flow
```
HA State Change → hass setter → _feed update → render()
Config Change → setConfig() → reactive properties → render()
```

### Testability
- Pure functions in utils (easy to test)
- Mock Home Assistant objects
- Test carousel timing logic independently
- Visual regression tests for styles

---

**Note**: This project prioritizes modern web standards, maintainability, and Home Assistant ecosystem compatibility. When in doubt, follow existing HA card patterns and Lit best practices.

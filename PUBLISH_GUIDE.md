# Publishing Guide - RSS Feed Metro Tile v2.1.0

## ✅ Completed Steps

- [x] Version updated to 2.1.0
- [x] All metadata updated (author, repository URLs)
- [x] Git repository initialized
- [x] Initial commit created (53 files, 16,130+ lines)
- [x] Build tested and working

**Commit Hash:** `0c0a93c`  
**Commit Message:** "feat: RSS Feed Metro Tile v2.1.0 with Modal Feature"

---

## 📋 Next Steps: Publish to GitHub

### Step 1: Create GitHub Repository

1. **Go to GitHub:**
   - Navigate to https://github.com/falconfs
   - Click "+" → "New repository"

2. **Repository Settings:**

   ```
   Repository name: ha-rssfeedMetroTile
   Description: RSS Feed Metro Tile for Home Assistant - Modern carousel with modal view
   Visibility: Public ✓

   DO NOT initialize with:
   [ ] README
   [ ] .gitignore
   [ ] License
   (We already have these files)
   ```

3. **Create repository**

---

### Step 2: Push Code to GitHub

After creating the repository, run these commands:

```bash
# Add remote origin
git remote add origin https://github.com/falconfs/ha-rssfeedMetroTile.git

# Verify remote
git remote -v

# Push to main branch
git push -u origin main
```

**Expected output:**

```
Enumerating objects: 65, done.
Counting objects: 100% (65/65), done.
...
To https://github.com/falconfs/ha-rssfeedMetroTile.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

### Step 3: Create Release v2.1.0

#### 3.1 Build Distribution File

```bash
# Build the production bundle
npm run build

# Verify output
ls -lh dist/rssfeed-metro-tile.js
# Should show: 72KB
```

#### 3.2 Create Release on GitHub

1. **Go to repository on GitHub**
2. **Click "Releases" → "Create a new release"**

3. **Release Settings:**

   ```
   Tag version: v2.1.0
   Release title: Version 2.1.0 - Modal Feature
   Target: main
   ```

4. **Release Description** (copy from CHANGELOG.md):

````markdown
# RSS Feed Metro Tile v2.1.0

## 🎉 Major Feature: Modal View

This release introduces a comprehensive modal system for viewing RSS feed links directly within Home Assistant!

### ✨ Modal Features

- **View links in overlays** - No more leaving your dashboard
- **Three modal types:**
  - Custom Modal with iframe (default)
  - Home Assistant Dialog integration
  - Direct external link (for CORS-blocked sites)
- **Flexible sizing:**
  - Predefined: small (50%), medium (70%), large (90%), fullscreen (95%)
  - Custom: specify width/height in px or %
  - Mobile: Auto-fullscreen on screens < 720px
- **Smooth animations:** fade, slide-up, scale, or none
- **Smart error handling:** CORS detection with automatic fallback
- **Full accessibility:** ARIA labels, keyboard navigation, focus management

### 🛠️ Configuration Options

```yaml
open_in_modal: true # Enable modal (default: true)
modal_type: custom # "custom", "ha-dialog", or "none"
modal_size: medium # "small", "medium", "large", "fullscreen"
modal_width: '' # Custom width (e.g. "800px")
modal_height: '' # Custom height (e.g. "600px")
modal_animation: fade # "fade", "slide-up", "scale", "none"
modal_close_on_backdrop: true # Close on backdrop click
modal_show_close_button: true # Show X button
modal_close_on_esc: true # Close on ESC key
modal_show_loading: true # Show loading spinner
modal_iframe_sandbox: true # iframe sandbox attribute
modal_fallback_to_external: true # Auto-open externally on error
```
````

### 📦 Installation

**Via HACS (Recommended):**

1. Open HACS → Frontend
2. Click "+" → "Custom repositories"
3. Add: `https://github.com/falconfs/ha-rssfeedMetroTile`
4. Search for "RSS Feed Metro Tile"
5. Click Install

**Manual:**

1. Download `rssfeed-metro-tile.js` from this release
2. Copy to `/config/www/rssfeed-metro-tile.js`
3. Add resource in Settings → Dashboards → Resources

### 🚀 Quick Start

```yaml
type: custom:rssfeed-metro-tile
entity: sensor.your_rss_feed
modal_type: none # Recommended for most sites (no CORS issues!)
```

### 📝 What's Changed

#### Added

- Modal component with iframe support
- Home Assistant dialog integration
- Three modal types for different use cases
- Comprehensive modal configuration options
- Loading states and error handling
- Mobile-optimized modal sizing
- Keyboard navigation (ESC to close)
- Focus management for accessibility

#### Changed

- Links now open in modal by default (opt-out via `open_in_modal: false`)
- Editor UI enhanced with "Modal Settings" section

#### Fixed

- CORS error handling improved
- No more console errors from iframe access attempts

### 📚 Documentation

- [Full README](https://github.com/falconfs/ha-rssfeedMetroTile#readme)
- [CORS Fix Details](https://github.com/falconfs/ha-rssfeedMetroTile/blob/main/CORS_FIX.md)
- [Configuration Guide](https://github.com/falconfs/ha-rssfeedMetroTile#configuration)

### 🐛 Known Issues

- LSP warnings for unused private methods (for future implementation)
- Test helpers need integration (tests not yet active)

### 💬 Feedback

- [Report Issues](https://github.com/falconfs/ha-rssfeedMetroTile/issues)
- [Discussions](https://github.com/falconfs/ha-rssfeedMetroTile/discussions)

**Full Changelog:** https://github.com/falconfs/ha-rssfeedMetroTile/blob/main/CHANGELOG.md

````

5. **Attach Files:**
   - Click "Attach binaries by dropping them here"
   - Upload: `dist/rssfeed-metro-tile.js`

6. **Publish release** ✓

---

### Step 4: HACS Integration

The repository is already HACS-ready with `hacs.json`. Users can add it as a custom repository:

**User Instructions:**
1. HACS → Frontend → ⋮ Menu → Custom repositories
2. Add repository: `https://github.com/falconfs/ha-rssfeedMetroTile`
3. Category: Lovelace
4. Click "Add"

**Optional: Submit to HACS Default Repositories**
- Follow: https://hacs.xyz/docs/publish/start/
- Requirements: 10+ stars, active maintenance
- This makes it searchable without manual URL entry

---

### Step 5: Verify Installation

After publishing, test the installation:

1. **Clear local dev environment:**
   ```bash
   npm run build
````

2. **Copy to Home Assistant:**

   ```bash
   # Copy dist/rssfeed-metro-tile.js to your HA instance
   # Example (adjust path for your setup):
   scp dist/rssfeed-metro-tile.js user@homeassistant:/config/www/
   ```

3. **Add to Home Assistant:**
   - Settings → Dashboards → Resources
   - Add resource:
     - URL: `/local/rssfeed-metro-tile.js`
     - Type: JavaScript module

4. **Test on Dashboard:**

   ```yaml
   type: custom:rssfeed-metro-tile
   entity: sensor.YOUR_RSS_FEED
   modal_type: none # or "custom" to test modals
   ```

5. **Verify:**
   - Card loads without errors
   - Console shows: "Version: 2.1.0"
   - Clicking news opens modal (or new tab if modal_type: none)
   - Editor UI shows all modal options

---

## 📊 Project Statistics

**Repository:**

- 53 files
- 16,130+ lines of code
- TypeScript, Lit 3.1, Modern build tooling

**Features:**

- Carousel with 3 transition types
- 2 image layout modes
- Modal system with 3 types
- 30+ configuration options
- Full visual editor
- Touch gesture support
- Accessibility compliant
- E2E test suite

**Bundle Size:**

- Production: 72KB (minified)
- Gzipped: ~20KB (estimated)

---

## 🔧 Maintenance Commands

```bash
# Development
npm run dev              # Start dev server with HMR
npm run build:watch      # Watch mode for building

# Testing
npm run lint             # Run ESLint
npm run type-check       # TypeScript validation
npm test                 # Run unit tests
npm run test:e2e         # Run E2E tests

# Building
npm run build            # Production build
npm run build:dev        # Development build (unminified)

# Formatting
npm run format           # Format with Prettier
```

---

## 📄 License

MIT License - See LICENSE file

---

## 🎯 Success Checklist

Before announcing the release:

- [ ] GitHub repository created and public
- [ ] Code pushed to main branch
- [ ] Release v2.1.0 published with binary
- [ ] README displays correctly on GitHub
- [ ] Installation tested in real Home Assistant
- [ ] Modal features verified working
- [ ] No console errors in browser
- [ ] Editor UI loads and works
- [ ] Documentation is complete

---

## 🚀 Announcement Templates

### Home Assistant Community Forum

```markdown
# RSS Feed Metro Tile v2.1.0 - Now with Modal View! 🎉

I'm excited to announce the release of RSS Feed Metro Tile v2.1.0!

**New Feature:** View RSS feed links in modal overlays directly in your dashboard!

🔗 GitHub: https://github.com/falconfs/ha-rssfeedMetroTile
📦 Install via HACS or manual download

Key features:

- Modern Metro-style carousel
- Touch gestures & keyboard navigation
- Modal view with 3 types (new!)
- Responsive design
- Full visual editor

[Screenshot or demo GIF here]

Feedback welcome!
```

### Reddit r/homeassistant

```markdown
[Custom Card] RSS Feed Metro Tile v2.1.0 - Modal View Feature

Just released a major update to my RSS Feed Metro Tile custom card!

New in v2.1.0:

- Click news tiles to view in modal overlay (no leaving dashboard!)
- 3 modal types: custom iframe, HA dialog, direct link
- CORS-friendly fallback
- Mobile optimized

GitHub: https://github.com/falconfs/ha-rssfeedMetroTile

Let me know what you think!
```

---

## 🎬 Next Actions

**Immediate:**

1. Create GitHub repository
2. Push code
3. Create v2.1.0 release
4. Test installation

**Soon:** 5. Create demo video/GIF 6. Announce on HA forums 7. Monitor for issues 8. Respond to feedback

**Future:**

- Add to HACS default (requires 10+ stars)
- Create YouTube tutorial
- Blog post about development
- Plan v2.2.0 features

---

**Status:** Ready to publish! 🚀  
**Last updated:** 2024-02-02

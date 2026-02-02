# RSS Feed Metro Tile

Display RSS feed entries as beautiful, animated Metro-style tiles in your Home Assistant dashboard.

## Features

- 🎨 Modern Metro-style design
- 📱 Fully responsive (desktop, tablet, mobile)
- 👆 Touch gestures and keyboard navigation
- 🎬 Multiple transition effects
- 🖼️ Flexible image layouts
- 📐 Aspect ratio control (square, widescreen, etc.)
- 🌙 Theme-aware (light/dark mode)
- ♿ Fully accessible

## Quick Start

1. Install via HACS
2. Add a Feedreader sensor to your `configuration.yaml`:

```yaml
feedreader:
  urls:
    - https://www.home-assistant.io/atom.xml
```

3. Add the card to your dashboard:

```yaml
type: custom:rssfeed-metro-tile
entity: sensor.home_assistant_blog
```

## Configuration

All configuration can be done through the visual editor or YAML:

- **Layout**: Choose aspect ratio (square, widescreen) or dynamic height
- **Carousel**: Configure slide duration, transitions, and auto-play
- **Content**: Control which feed items to show and how images are displayed
- **Navigation**: Enable/disable arrows, indicators, and keyboard controls

For detailed documentation, visit the [GitHub repository](https://github.com/florianschmidt/ha-rssfeedMetroTile).

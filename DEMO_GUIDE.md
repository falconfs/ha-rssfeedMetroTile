# Demo Dashboard Installation Guide

## 📋 Voraussetzungen

1. **RSS Feed Metro Tile Card installiert** (siehe README.md)
2. **RSS Feed Sensor konfiguriert**

## 🔧 RSS Feed Sensor Setup

Füge zu deiner `configuration.yaml` hinzu:

```yaml
feedreader:
  urls:
    - https://www.zeit.de/index
  scan_interval:
    minutes: 30
```

Nach dem Neustart von Home Assistant sollte der Sensor `sensor.die_zeit` verfügbar sein.

Alternativ kannst du auch andere RSS Feeds nutzen:

```yaml
feedreader:
  urls:
    # Deutsche Feeds
    - https://www.tagesschau.de/xml/rss2/
    - https://www.heise.de/rss/heise-atom.xml
    - https://www.spiegel.de/schlagzeilen/index.rss
    
    # Internationale Feeds
    - https://www.home-assistant.io/atom.xml
    - https://news.ycombinator.com/rss
    - https://www.reddit.com/.rss
```

## 📱 Dashboard Hinzufügen

### Methode 1: Über die UI (Empfohlen)

1. Gehe zu **Einstellungen** → **Dashboards**
2. Klicke auf **+ DASHBOARD HINZUFÜGEN**
3. Wähle **Von YAML-Datei erstellen**
4. Kopiere den Inhalt von `demo-dashboard.yaml`
5. Füge ihn ein und speichere

### Methode 2: Als Dashboard-Datei

1. Kopiere `demo-dashboard.yaml` nach `<config>/dashboards/`
2. Füge zu deiner `configuration.yaml` hinzu:

```yaml
lovelace:
  mode: storage
  dashboards:
    rssfeed-demo:
      mode: yaml
      title: RSS Feed Demo
      icon: mdi:rss
      show_in_sidebar: true
      filename: dashboards/demo-dashboard.yaml
```

3. Starte Home Assistant neu

## 📊 Dashboard Overview

Das Demo-Dashboard enthält **36 verschiedene Konfigurationen** über **8 Views**:

### View 1: Overview (3 Cards)
- **Card 1**: Basic - Default Settings
- **Card 2**: Square Tile (1:1) - Fade Transition
- **Card 3**: Widescreen (16:9) - Horizontal Slide

### View 2: Image Layouts (3 Cards)
- **Card 4**: Background Layout (Blur)
- **Card 5**: Split Layout (Image Top, Text Bottom)
- **Card 6**: Text Only (No Images)

### View 3: Carousel Settings (3 Cards)
- **Card 7**: Fast Carousel (3s)
- **Card 8**: Slow Carousel (10s)
- **Card 9**: Manual Navigation Only

### View 4: Navigation Controls (4 Cards)
- **Card 10**: Full Navigation (Arrows + Dots + Keyboard)
- **Card 11**: Navigation Arrows Only
- **Card 12**: Dot Indicators Only
- **Card 13**: Minimal - No Visible Controls

### View 5: Content Settings (4 Cards)
- **Card 14**: Limited Feed (5 Items)
- **Card 15**: Mini Feed (3 Items)
- **Card 16**: All Items (Performance Warning)
- **Card 17**: Eager Image Loading

### View 6: Fixed Height (3 Cards)
- **Card 18**: Small Tile (200px)
- **Card 19**: Medium Tile (350px)
- **Card 20**: Large Tile (500px)

### View 7: Advanced Styling (3 Cards)
- **Card 21**: Custom CSS - Blue Theme
- **Card 22**: Custom CSS - Green Theme
- **Card 23**: Custom Dark Mode Style

### View 8: Grid Layouts (4 Cards)
- **Card 24**: Square Grid Item (4x4)
- **Card 25**: Wide Grid Item (4x6)
- **Card 26**: Tall Grid Item (6x4)
- **Card 27**: Large Grid Item (6x6)

### View 9: Special Configs (4 Cards)
- **Card 28**: News Ticker Style
- **Card 29**: Magazine Style
- **Card 30**: Minimal Widget
- **Card 31**: Interactive Dashboard

### View 10: Comparison (6 Cards)
- **Cards 32-34**: Transition Comparison (Vertical, Horizontal, Fade)
- **Cards 35-36**: Layout Comparison (Background, Split)

## 🎨 Anpassungen

### Entity ändern

Wenn dein RSS Feed Sensor einen anderen Namen hat, ersetze alle Vorkommen von `sensor.die_zeit` mit deinem Entity-Namen:

```bash
# In demo-dashboard.yaml
sed -i 's/sensor.die_zeit/sensor.dein_feed/g' demo-dashboard.yaml
```

Oder manuell in der Datei suchen und ersetzen.

### Individuelle Cards verwenden

Du musst nicht das gesamte Dashboard verwenden. Kopiere einfach die gewünschten Card-Konfigurationen aus `demo-dashboard.yaml` in dein eigenes Dashboard.

Beispiel - nur eine Card hinzufügen:

```yaml
# In deinem Dashboard
- type: custom:rssfeed-metro-tile
  entity: sensor.die_zeit
  title: "Mein News Feed"
  aspect_ratio: "1:1"
  transition: fade
  slide_duration_sec: 7
```

## 🧪 Testing

Nach dem Hinzufügen des Dashboards:

1. Navigiere zum neuen Dashboard
2. Teste verschiedene Views
3. Interagiere mit den Cards:
   - **Hover/Touch**: Pausiert den Carousel
   - **Swipe**: Links/Rechts zum Navigieren
   - **Pfeiltasten**: Navigation (wenn enabled)
   - **Klick auf Dots**: Springe zu Slide
   - **Klick auf Arrows**: Vor/Zurück

## 🐛 Troubleshooting

### Entity nicht gefunden

**Problem**: "Entity sensor.die_zeit not found"

**Lösung**:
1. Prüfe ob Feedreader läuft: Developer Tools → States → suche nach `sensor.`
2. Warte 30 Minuten nach Config-Änderung (scan_interval)
3. Starte Home Assistant neu
4. Prüfe Logs: Settings → System → Logs

### Card lädt nicht

**Problem**: Card wird nicht angezeigt

**Lösung**:
1. Leere Browser-Cache (Ctrl+F5)
2. Prüfe ob Ressource geladen: Developer Tools → Network → nach `rssfeed-metro-tile.js` filtern
3. Prüfe Browser Console auf Fehler (F12)

### Bilder werden nicht angezeigt

**Problem**: Nur Text, keine Bilder

**Lösung**:
1. Prüfe ob Feed Bilder hat: Developer Tools → States → `sensor.die_zeit` → attributes → entries → links
2. Setze `show_images: true` (ist aber default)
3. Prüfe CORS-Einstellungen wenn externe Bilder

### Performance-Probleme

**Problem**: Dashboard langsam

**Lösung**:
1. Reduziere `row_limit` auf 5-10 Items
2. Erhöhe `slide_duration_sec`
3. Aktiviere `lazy_load_images: true` (ist default)
4. Deaktiviere nicht benötigte Views

## 💡 Best Practices

### Für News Feeds
```yaml
transition: slide-horizontal
slide_duration_sec: 4
image_layout: split
row_limit: 10
show_navigation: true
```

### Für Blog Posts
```yaml
transition: fade
slide_duration_sec: 8
image_layout: background
row_limit: 5
show_indicators: true
```

### Für Minimal Widget
```yaml
aspect_ratio: "1:1"
transition: fade
show_navigation: false
show_indicators: false
auto_play: true
image_layout: background
```

## 📝 Weitere Anpassungen

### Custom CSS Beispiele

**Größere Schrift:**
```yaml
style: |
  .slide-title { font-size: 2em; }
  .slide-description { font-size: 1.2em; }
```

**Andere Farben:**
```yaml
style: |
  .slide-title { color: #FF5722; }
  .timer-bubble { background: #FF5722; }
```

**Abgerundete Ecken:**
```yaml
style: |
  .carousel-wrapper { border-radius: 16px; }
```

## 🎯 Empfohlene Starter-Konfiguration

Wenn du neu startest, empfehle ich diese 3 Cards für dein Haupt-Dashboard:

```yaml
# Card 1: Haupt-Feed mit voller Navigation
- type: custom:rssfeed-metro-tile
  entity: sensor.die_zeit
  aspect_ratio: "16:9"
  transition: slide-vertical
  slide_duration_sec: 6
  show_navigation: true
  show_indicators: true
  row_limit: 10

# Card 2: Kompakter Feed
- type: custom:rssfeed-metro-tile
  entity: sensor.die_zeit
  aspect_ratio: "1:1"
  transition: fade
  slide_duration_sec: 5
  show_navigation: false
  show_indicators: true
  row_limit: 5

# Card 3: Minimal Widget
- type: custom:rssfeed-metro-tile
  entity: sensor.die_zeit
  aspect_ratio: "4:3"
  image_layout: split
  transition: slide-horizontal
  show_navigation: false
  show_indicators: false
  row_limit: 8
```

## 📚 Weiterführende Links

- [README.md](README.md) - Vollständige Dokumentation
- [CHANGELOG.md](CHANGELOG.md) - Versionshistorie
- [AGENTS.md](AGENTS.md) - Entwickler-Guide

---

Viel Spaß mit dem Demo-Dashboard! 🎉

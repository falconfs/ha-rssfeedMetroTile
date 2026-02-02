# CORS Fix - Implementation Summary

## 🎯 Problem

Beim Versuch, Webseiten in einem iframe zu laden, tritt ein CORS-Fehler auf:

```
SecurityError: Failed to read a named property 'document' from 'Window':
Blocked a frame with origin "https://www.zeit.de" from accessing a cross-origin frame.
```

**Ursache:** Wir haben versucht, auf `iframe.contentDocument` zuzugreifen, um CORS-Probleme zu erkennen. Dies wirft selbst einen CORS-Fehler, wenn die Website iframe-Embedding blockiert.

## ✅ Lösung

### 1. **CORS-Erkennung entfernt**

- Removed unsafe `contentDocument` access
- iframe lädt nun passiv ohne JavaScript-Zugriff
- Browser zeigt eigene Fehlerseite bei CORS-Problemen

### 2. **Neue Option: Direct External Link**

- `modal_type: none` hinzugefügt
- Öffnet Links direkt in neuem Tab
- **Keine iframe-Probleme!**
- Empfohlen für Seiten mit CORS-Beschränkungen

### 3. **Vereinfachtes Error Handling**

- iframe `@error` Event triggert Fallback
- Automatische externe Öffnung nach 2s (wenn konfiguriert)
- Manuelle "Open in New Tab" Button

## 📝 Geänderte Dateien

### `src/types.ts`

```typescript
// Vorher
export type ModalType = 'custom' | 'ha-dialog';

// Nachher
export type ModalType = 'custom' | 'ha-dialog' | 'none';
```

### `src/components/custom-modal.ts`

- Entfernt: `_checkForCORSError()` Methode
- Entfernt: `contentDocument` Zugriff
- Vereinfacht: `_handleIframeLoad()` - keine CORS-Prüfung mehr
- Verbessert: `_handleIframeError()` - behandelt beide Error-Typen

### `src/rssfeed-metro-tile.ts`

```typescript
// Neue Logik in _handleSlideClick()
if (modalType === 'none') {
  event.preventDefault();
  event.stopPropagation();
  window.open(item.link, '_blank', 'noopener,noreferrer');
  return;
}
```

### `src/rssfeed-metro-tile-editor.ts`

```html
<!-- Neue Option -->
<mwc-list-item value="none"> Direct External Link (No Modal) </mwc-list-item>
```

### `src/utils/modal-controller.ts`

```typescript
// Typ erweitert
private _type: 'custom' | 'ha-dialog' | 'none';
public setType(type: 'custom' | 'ha-dialog' | 'none'): void
export function getModalType(...): 'custom' | 'ha-dialog' | 'none'
```

### `README.md`

- Dokumentiert: `modal_type: none` Option
- Hinzugefügt: CORS-Lösungsstrategien
- Beispiel für Direct External Link

## 🎨 Verwendung

### Empfohlene Konfiguration (keine CORS-Probleme)

```yaml
type: custom:rssfeed-metro-tile
entity: sensor.news_feed
modal_type: none # Direct external link
```

### Für Sites die iframes erlauben

```yaml
type: custom:rssfeed-metro-tile
entity: sensor.news_feed
modal_type: custom # Default - versucht iframe
modal_fallback_to_external: true # Fallback bei Fehler
```

### Modal komplett deaktivieren

```yaml
type: custom:rssfeed-metro-tile
entity: sensor.news_feed
open_in_modal: false # Nutzt normale <a> Links
```

## ✅ Testen

1. **Build erfolgreich:**

   ```bash
   npm run build
   # ✅ Created dist/rssfeed-metro-tile.js
   ```

2. **Test mit Zeit.de (blockiert iframes):**
   - Option 1: `modal_type: none` ✅ Öffnet direkt extern
   - Option 2: `modal_type: custom` → Error → Auto-Fallback ✅
3. **Test mit iframe-freundlichen Sites:**
   - `modal_type: custom` ✅ Lädt in Modal
   - Keine CORS-Fehler mehr im Console

## 📊 Vergleich

### Vorher

- ❌ CORS-Fehler im Console bei jedem iframe-Load
- ❌ JavaScript-Exception bei Access auf contentDocument
- ❌ Keine Option für direkte externe Links

### Nachher

- ✅ Keine CORS-Fehler durch JavaScript
- ✅ Browser handhabt iframe-Errors selbst
- ✅ Neue Option: `modal_type: none` für direkte Links
- ✅ Sauberer Code ohne unsichere DOM-Zugriffe

## 🚀 Deployment

```bash
npm run build
# Datei nach Home Assistant kopieren
# Browser-Cache leeren (Ctrl+F5)
```

## 📚 Dokumentation

Alle Änderungen sind dokumentiert in:

- README.md (Modal Features Sektion)
- Inline Code-Kommentare
- TypeScript Types

---

**Status:** ✅ Completed  
**Build:** ✅ Successful  
**Console Errors:** ✅ Fixed  
**Date:** 2024-02-02

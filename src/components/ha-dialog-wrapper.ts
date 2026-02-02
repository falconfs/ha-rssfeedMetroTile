import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { ModalConfig } from '../types';

/**
 * Home Assistant Dialog Wrapper
 * Provides integration with Home Assistant's dialog system
 */
export class HADialogWrapper {
  constructor(
    private element: HTMLElement,
    private hass: HomeAssistant,
    private config: ModalConfig
  ) {}

  /**
   * Open a dialog using Home Assistant's dialog system
   */
  public open(url: string, title: string): void {
    // Try multiple approaches for maximum compatibility

    // Approach 1: Use fire-dom-event for browser_mod compatibility
    this._openWithFireDomEvent(url, title);

    // Approach 2: Fallback to hass-action event
    // This is handled by the timeout below
    setTimeout(() => {
      if (!this._isDialogOpen()) {
        this._openWithHassAction(url, title);
      }
    }, 100);
  }

  /**
   * Close the dialog
   * Note: This is limited as we don't have direct control over HA dialogs
   */
  public close(): void {
    // Attempt to close by dispatching a close event
    try {
      const event = new CustomEvent('close-dialog', {
        bubbles: true,
        composed: true,
      });
      this.element.dispatchEvent(event);
    } catch (e) {
      console.warn('Could not close HA dialog:', e);
    }
  }

  /**
   * Check if a dialog is currently open
   */
  private _isDialogOpen(): boolean {
    // Check if there's a dialog in the DOM
    const dialog = document.querySelector('ha-dialog, ha-more-info-dialog, browser-mod-popup');
    return !!dialog;
  }

  /**
   * Open using fire-dom-event (browser_mod compatible)
   */
  private _openWithFireDomEvent(url: string, title: string): void {
    try {
      // Use type assertion to bypass TypeScript checking for custom events
      (fireEvent as any)(this.element, 'fire-dom-event', {
        browser_mod: {
          service: 'browser_mod.popup',
          data: {
            title: title || 'RSS Feed',
            size: this._mapSizeToHASize(this.config.size),
            dismissable: this.config.closeOnBackdrop,
            timeout: 0,
            content: {
              type: 'iframe',
              url: url,
              aspect_ratio: '16x9',
            },
          },
        },
      });
    } catch (e) {
      console.warn('fire-dom-event approach failed:', e);
    }
  }

  /**
   * Open using hass-action event
   */
  private _openWithHassAction(url: string, _title: string): void {
    try {
      const event = new CustomEvent('hass-action', {
        bubbles: true,
        composed: true,
        detail: {
          config: {
            action: 'url',
            url_path: url,
            navigation_path: url,
          },
          action: 'tap',
        },
      });
      this.element.dispatchEvent(event);
    } catch (e) {
      console.warn('hass-action approach failed:', e);
    }
  }

  /**
   * Map our size to HA/browser_mod size
   */
  private _mapSizeToHASize(size: string): string {
    switch (size) {
      case 'small':
        return 'normal';
      case 'medium':
        return 'wide';
      case 'large':
        return 'fullscreen';
      case 'fullscreen':
        return 'fullscreen';
      default:
        return 'wide';
    }
  }

  /**
   * Alternative: Open using show-dialog event
   * This is used by some HA components
   * TODO: Implement this as a fallback option in future versions
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _openWithShowDialog(url: string, title: string): void {
    try {
      const event = new CustomEvent('show-dialog', {
        bubbles: true,
        composed: true,
        detail: {
          dialogTag: 'ha-dialog',
          dialogImport: () => Promise.resolve(),
          dialogParams: {
            title: title || 'RSS Feed',
            content: html`<iframe
              src="${url}"
              style="width: 100%; height: 80vh; border: none;"
            ></iframe>`,
            large: this.config.size === 'large' || this.config.size === 'fullscreen',
          },
        },
      });
      this.element.dispatchEvent(event);
    } catch (e) {
      console.warn('show-dialog approach failed:', e);
    }
  }

  /**
   * Check if browser_mod is available
   */
  private _isBrowserModAvailable(): boolean {
    return !!(this.hass.services && this.hass.services['browser_mod']);
  }

  /**
   * Call browser_mod service directly
   * TODO: Implement this as a fallback option in future versions
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async _callBrowserModService(url: string, title: string): Promise<void> {
    if (!this._isBrowserModAvailable()) {
      console.warn('browser_mod not available');
      return;
    }

    try {
      await this.hass.callService('browser_mod', 'popup', {
        title: title || 'RSS Feed',
        size: this._mapSizeToHASize(this.config.size),
        dismissable: this.config.closeOnBackdrop,
        content: {
          type: 'iframe',
          url: url,
          aspect_ratio: '16x9',
        },
      });
    } catch (e) {
      console.error('Failed to call browser_mod service:', e);
    }
  }
}

// Helper to import html template literal if needed
function html(strings: TemplateStringsArray, ...values: any[]): string {
  return strings.reduce((result, str, i) => result + str + (values[i] || ''), '');
}

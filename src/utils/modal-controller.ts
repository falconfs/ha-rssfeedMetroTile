import { HomeAssistant } from 'custom-card-helpers';
import { CardConfig, ModalConfig } from '../types';
import { RssfeedModal } from '../components/custom-modal';
import { HADialogWrapper } from '../components/ha-dialog-wrapper';

/**
 * Modal Controller
 * Manages modal instances and ensures only one modal is open at a time
 */
export class ModalController {
  private static _activeModal: ModalController | null = null;
  private _customModal?: RssfeedModal;
  private _haDialog?: HADialogWrapper;
  private _type: 'custom' | 'ha-dialog' | 'none';

  constructor(
    private element: HTMLElement,
    private config: ModalConfig,
    private hass?: HomeAssistant
  ) {
    this._type = 'custom'; // Default to custom
  }

  /**
   * Set the modal type
   */
  public setType(type: 'custom' | 'ha-dialog' | 'none'): void {
    this._type = type;
  }

  /**
   * Open the modal
   */
  public open(url: string, title: string): void {
    // Close any existing active modal first
    if (ModalController._activeModal && ModalController._activeModal !== this) {
      ModalController._activeModal.close();
    }

    // Set this as the active modal
    ModalController._activeModal = this;

    // Open based on type
    if (this._type === 'custom') {
      this._openCustomModal(url, title);
    } else {
      this._openHADialog(url, title);
    }
  }

  /**
   * Close the modal
   */
  public close(): void {
    if (this._customModal) {
      this._customModal.close();
    }

    if (this._haDialog) {
      this._haDialog.close();
    }

    // Clear active modal if it's this one
    if (ModalController._activeModal === this) {
      ModalController._activeModal = null;
    }
  }

  /**
   * Check if modal is open
   */
  public isOpen(): boolean {
    if (this._customModal) {
      return this._customModal.isOpen();
    }
    return false;
  }

  /**
   * Cleanup and destroy the controller
   */
  public destroy(): void {
    this.close();

    if (this._customModal && this._customModal.parentElement) {
      this._customModal.remove();
    }

    this._customModal = undefined;
    this._haDialog = undefined;

    if (ModalController._activeModal === this) {
      ModalController._activeModal = null;
    }
  }

  /**
   * Open custom modal
   */
  private _openCustomModal(url: string, title: string): void {
    // Create modal if it doesn't exist
    if (!this._customModal) {
      this._customModal = document.createElement('rssfeed-modal') as RssfeedModal;
      this._customModal.config = this.config;

      // Listen for close events
      this._customModal.addEventListener('modal-closed', () => {
        if (ModalController._activeModal === this) {
          ModalController._activeModal = null;
        }
      });

      // Append to body for proper z-index stacking
      document.body.appendChild(this._customModal);
    }

    // Open the modal
    this._customModal.open(url, title);
  }

  /**
   * Open HA dialog
   */
  private _openHADialog(url: string, title: string): void {
    if (!this.hass) {
      console.warn('Home Assistant instance not available for HA dialog');
      // Fallback to custom modal
      this._openCustomModal(url, title);
      return;
    }

    // Create dialog wrapper if it doesn't exist
    if (!this._haDialog) {
      this._haDialog = new HADialogWrapper(this.element, this.hass, this.config);
    }

    // Open the dialog
    this._haDialog.open(url, title);
  }

  /**
   * Get the currently active modal controller
   */
  public static getActiveModal(): ModalController | null {
    return ModalController._activeModal;
  }

  /**
   * Close any active modal
   */
  public static closeActiveModal(): void {
    if (ModalController._activeModal) {
      ModalController._activeModal.close();
    }
  }
}

/**
 * Create a ModalConfig from CardConfig
 */
export function createModalConfig(cardConfig: CardConfig): ModalConfig {
  return {
    url: '',
    title: '',
    size: cardConfig.modal_size || 'medium',
    width: cardConfig.modal_width,
    height: cardConfig.modal_height,
    animation: cardConfig.modal_animation || 'fade',
    closeOnBackdrop: cardConfig.modal_close_on_backdrop !== false,
    showCloseButton: cardConfig.modal_show_close_button !== false,
    closeOnEsc: cardConfig.modal_close_on_esc !== false,
    showLoading: cardConfig.modal_show_loading !== false,
    iframeSandbox: cardConfig.modal_iframe_sandbox !== false,
    fallbackToExternal: cardConfig.modal_fallback_to_external !== false,
  };
}

/**
 * Check if modal should be used based on config
 */
export function shouldUseModal(config: CardConfig): boolean {
  return config.open_in_modal !== false;
}

/**
 * Get the modal type from config
 */
export function getModalType(config: CardConfig): 'custom' | 'ha-dialog' | 'none' {
  return config.modal_type || 'custom';
}

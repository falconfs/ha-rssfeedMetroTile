import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import { ModalConfig, ModalState } from '../types';
import { MODAL_SIZES } from '../constants';
import { modalStyles } from '../styles/modal';

@customElement('rssfeed-modal')
export class RssfeedModal extends LitElement {
  @property({ type: Object }) config!: ModalConfig;
  @state() private _state: ModalState = {
    isOpen: false,
    isLoading: false,
    hasError: false,
  };
  @state() private _isClosing = false;

  private _keydownHandler?: (e: KeyboardEvent) => void;
  private _iframeLoadTimeout?: number;

  static styles = modalStyles;

  connectedCallback(): void {
    super.connectedCallback();
    this._setupKeyboardHandler();
    this._preventBodyScroll();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._cleanupKeyboardHandler();
    this._allowBodyScroll();
    if (this._iframeLoadTimeout) {
      window.clearTimeout(this._iframeLoadTimeout);
    }
  }

  public open(url: string, title: string): void {
    this._state = {
      isOpen: true,
      isLoading: this.config.showLoading,
      hasError: false,
      url,
      title,
    };
    this._isClosing = false;

    // Set timeout for iframe loading (10 seconds)
    if (this.config.showLoading) {
      this._iframeLoadTimeout = window.setTimeout(() => {
        if (this._state.isLoading) {
          this._handleLoadTimeout();
        }
      }, 10000);
    }

    // Focus management
    this.updateComplete.then(() => {
      const container = this.shadowRoot?.querySelector('.modal-container') as HTMLElement;
      container?.focus();
    });
  }

  public close(): void {
    if (!this._state.isOpen) return;

    this._isClosing = true;

    // Wait for animation to complete
    const animationDuration = this.config.animation === 'none' ? 0 : 200;
    setTimeout(() => {
      this._state = {
        isOpen: false,
        isLoading: false,
        hasError: false,
      };
      this._isClosing = false;

      // Dispatch close event
      this.dispatchEvent(
        new CustomEvent('modal-closed', {
          bubbles: true,
          composed: true,
        })
      );
    }, animationDuration);
  }

  public isOpen(): boolean {
    return this._state.isOpen;
  }

  private _setupKeyboardHandler(): void {
    if (!this.config.closeOnEsc) return;

    this._keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this._state.isOpen) {
        e.preventDefault();
        this.close();
      }
    };

    document.addEventListener('keydown', this._keydownHandler);
  }

  private _cleanupKeyboardHandler(): void {
    if (this._keydownHandler) {
      document.removeEventListener('keydown', this._keydownHandler);
      this._keydownHandler = undefined;
    }
  }

  private _preventBodyScroll(): void {
    document.body.classList.add('modal-open');
  }

  private _allowBodyScroll(): void {
    document.body.classList.remove('modal-open');
  }

  private _handleBackdropClick(e: MouseEvent): void {
    if (!this.config.closeOnBackdrop) return;

    const target = e.target as HTMLElement;
    if (target.classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  private _handleCloseClick(): void {
    this.close();
  }

  private _handleIframeLoad(): void {
    if (this._iframeLoadTimeout) {
      window.clearTimeout(this._iframeLoadTimeout);
    }

    // Simply mark as loaded - we can't reliably detect CORS without triggering errors
    // The iframe will either load successfully or the browser will show its own error message
    this._state = { ...this._state, isLoading: false, hasError: false };
  }

  private _handleIframeError(): void {
    if (this._iframeLoadTimeout) {
      window.clearTimeout(this._iframeLoadTimeout);
    }

    // iframe failed to load - could be CORS or network error
    // Show error with option to open externally
    this._state = {
      ...this._state,
      isLoading: false,
      hasError: true,
      errorType: 'cors', // Assume CORS since it's the most common issue
    };

    // Auto-open externally if configured
    if (this.config.fallbackToExternal) {
      setTimeout(() => {
        this._openExternal();
        this.close();
      }, 2000);
    }
  }

  private _handleLoadTimeout(): void {
    // Loading took too long
    this._state = {
      ...this._state,
      isLoading: false,
      hasError: true,
      errorType: 'network',
    };
  }

  private _openExternal(): void {
    if (this._state.url) {
      window.open(this._state.url, '_blank', 'noopener,noreferrer');
    }
  }

  private _getErrorMessage(): string {
    switch (this._state.errorType) {
      case 'cors':
        return 'This website cannot be displayed in a frame due to security restrictions. Opening in a new tab...';
      case 'network':
        return 'Failed to load the website. Please check your internet connection.';
      default:
        return 'An error occurred while loading the website.';
    }
  }

  private _getModalSize(): { width: string; height: string } {
    // Check viewport width for mobile
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 720) {
      return MODAL_SIZES.fullscreen;
    }

    // Custom sizes have priority
    if (this.config.width && this.config.height) {
      return { width: this.config.width, height: this.config.height };
    }

    // Predefined size
    return MODAL_SIZES[this.config.size];
  }

  protected render(): TemplateResult {
    if (!this._state.isOpen) {
      return html``;
    }

    const backdropClasses = {
      'modal-backdrop': true,
      [`modal-animation-${this.config.animation}`]: true,
      closing: this._isClosing,
    };

    const containerClasses = {
      'modal-container': true,
      [`size-${this.config.size}`]: !this.config.width,
    };

    const modalSize = this._getModalSize();
    const containerStyle =
      this.config.width && this.config.height
        ? {
            width: modalSize.width,
            height: modalSize.height,
          }
        : {};

    const iframeClasses = {
      'modal-iframe': true,
      hidden: this._state.isLoading || this._state.hasError,
    };

    const sandboxAttrs = this.config.iframeSandbox
      ? 'allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation'
      : '';

    return html`
      <div
        class=${classMap(backdropClasses)}
        @click=${this._handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          class=${classMap(containerClasses)}
          style=${styleMap(containerStyle)}
          tabindex="-1"
          @click=${(e: Event) => e.stopPropagation()}
        >
          <!-- Header -->
          <div class="modal-header">
            <h2 id="modal-title" class="modal-title">${this._state.title || 'RSS Feed'}</h2>
            ${this.config.showCloseButton
              ? html`
                  <button
                    class="modal-close-button"
                    @click=${this._handleCloseClick}
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                `
              : ''}
          </div>

          <!-- Body -->
          <div class="modal-body">
            ${this._state.isLoading ? this._renderLoading() : ''}
            ${this._state.hasError ? this._renderError() : ''}
            <iframe
              class=${classMap(iframeClasses)}
              src="${this._state.url}"
              title="${this._state.title || 'RSS Feed Content'}"
              sandbox="${sandboxAttrs}"
              @load=${this._handleIframeLoad}
              @error=${this._handleIframeError}
            ></iframe>
          </div>
        </div>
      </div>
    `;
  }

  private _renderLoading(): TemplateResult {
    return html`
      <div class="modal-loading">
        <ha-circular-progress active></ha-circular-progress>
        <p class="modal-loading-text">Loading website...</p>
      </div>
    `;
  }

  private _renderError(): TemplateResult {
    return html`
      <div class="modal-error">
        <div class="modal-error-icon">⚠️</div>
        <h3 class="modal-error-title">Cannot Load Website</h3>
        <p class="modal-error-message">${this._getErrorMessage()}</p>
        ${!this.config.fallbackToExternal || this._state.errorType !== 'cors'
          ? html`
              <button class="modal-error-button" @click=${this._openExternal}>
                Open in New Tab
              </button>
            `
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rssfeed-modal': RssfeedModal;
  }
}

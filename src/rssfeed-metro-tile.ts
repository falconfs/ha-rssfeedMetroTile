import { LitElement, html, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { HomeAssistant } from 'custom-card-helpers';

import { CardConfig, FeedItem, CarouselState, ErrorState } from './types';
import { DEFAULT_CONFIG, VERSION } from './constants';
import { CarouselController } from './utils/carousel';
import { TouchHandler } from './utils/touch-handler';
import {
  validateEntity,
  getRandomStarTrekQuote,
  shouldShowPerformanceWarning,
} from './utils/error-messages';
import { extractFeed, getSlideImage, formatPublishedDate } from './utils/feed-parser';
import { calculateAspectPadding, shouldUseAspectRatio } from './utils/aspect-ratio';
import {
  ModalController,
  createModalConfig,
  shouldUseModal,
  getModalType,
} from './utils/modal-controller';

import { baseStyles } from './styles/base';
import { backgroundLayoutStyles, splitLayoutStyles } from './styles/layouts';
import { slideVerticalStyles, slideHorizontalStyles, fadeStyles } from './styles/transitions';
import { controlStyles } from './styles/controls';
import { errorStateStyles } from './styles/error-states';

// Import modal component
import './components/custom-modal';

// Import editor (will be bundled together)
import './rssfeed-metro-tile-editor';

console.log(
  `%cRSSFeed Metro Tile\n%cVersion: ${VERSION}`,
  'color: rebeccapurple; font-weight: bold;',
  ''
);

@customElement('rssfeed-metro-tile')
export class RssfeedMetroTile extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: CardConfig;
  @state() private _feed: FeedItem[] = [];
  @state() private _carouselState: CarouselState = {
    currentIndex: 0,
    timeRemaining: 0,
    isPaused: false,
    totalSlides: 0,
  };
  @state() private _errorState: ErrorState = { type: 'none', message: '' };
  @state() private _performanceWarning: string | null = null;

  @query('.carousel-wrapper') private _carouselWrapper?: HTMLElement;

  private _carousel?: CarouselController;
  private _touchHandler?: TouchHandler;
  private _isHovering = false;
  private _modalController?: ModalController;

  static styles = [
    baseStyles,
    backgroundLayoutStyles,
    splitLayoutStyles,
    slideVerticalStyles,
    slideHorizontalStyles,
    fadeStyles,
    controlStyles,
    errorStateStyles,
  ];

  // Required for HA card interface
  public setConfig(config: CardConfig): void {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }

    // Merge with defaults
    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
    };

    // Legacy support
    if (config.dynamic_height && !config.aspect_ratio) {
      console.warn(
        'dynamic_height is deprecated. Card now uses container-based height by default.'
      );
    }
  }

  public getCardSize(): number {
    if (!this._config) return 1;

    if (shouldUseAspectRatio(this._config)) {
      const padding = calculateAspectPadding(this._config.aspect_ratio);
      return Math.ceil(padding / 50);
    }

    // Default size when no aspect ratio is set
    return 6;
  }

  public static getStubConfig(): CardConfig {
    return {
      type: 'custom:rssfeed-metro-tile',
      entity: '',
      ...DEFAULT_CONFIG,
    };
  }

  public static getConfigElement() {
    return document.createElement('rssfeed-metro-tile-editor');
  }

  // Lifecycle: Check for property changes
  protected willUpdate(changedProps: PropertyValues): void {
    super.willUpdate(changedProps);

    if (!this.hass || !this._config) return;

    // Validate entity and extract feed
    if (changedProps.has('hass') || changedProps.has('_config')) {
      this._errorState = validateEntity(this.hass, this._config.entity);

      if (this._errorState.type === 'none') {
        const newFeed = extractFeed(this.hass, this._config.entity, this._config.row_limit || 0);

        // Check if feed changed
        if (JSON.stringify(newFeed) !== JSON.stringify(this._feed)) {
          this._feed = newFeed;

          // Performance warning
          this._performanceWarning = shouldShowPerformanceWarning(
            this._feed.length,
            this._config.performance_warning || 20
          );

          // Update carousel
          if (this._carousel) {
            this._carousel.updateLength(this._feed.length);
          }
        }
      }
    }
  }

  // Lifecycle: After render, setup carousel and touch
  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (changedProps.has('_feed') && this._feed.length > 0) {
      this._setupCarousel();
      this._setupTouchHandler();
      this._setupKeyboardNavigation();
    }

    // Setup modal controller when config changes
    if (changedProps.has('_config') && this._config) {
      this._setupModalController();
    }
  }

  // Lifecycle: Cleanup
  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._cleanupCarousel();
    this._cleanupTouchHandler();
    this._cleanupKeyboardNavigation();
    this._cleanupModalController();
  }

  // Modal setup
  private _setupModalController(): void {
    if (!this._config) return;

    this._cleanupModalController();

    // Only create if modal is enabled
    if (shouldUseModal(this._config)) {
      const modalConfig = createModalConfig(this._config);
      this._modalController = new ModalController(this, modalConfig, this.hass);
      this._modalController.setType(getModalType(this._config));
    }
  }

  private _cleanupModalController(): void {
    if (this._modalController) {
      this._modalController.destroy();
      this._modalController = undefined;
    }
  }

  // Carousel setup
  private _setupCarousel(): void {
    this._cleanupCarousel();

    if (!this._feed.length || !this._config) return;

    this._carousel = new CarouselController(
      this._config.slide_duration_sec || 5,
      this._feed.length,
      (state: CarouselState) => {
        // Create a new object to trigger Lit's reactivity
        this._carouselState = { ...state };
      }
    );

    if (this._config.auto_play) {
      this._carousel.start();
    }
  }

  private _cleanupCarousel(): void {
    if (this._carousel) {
      this._carousel.stop();
      this._carousel = undefined;
    }
  }

  // Touch handler setup
  private _setupTouchHandler(): void {
    if (!this._carouselWrapper || !this._config) return;

    this._cleanupTouchHandler();

    this._touchHandler = new TouchHandler(
      this._carouselWrapper,
      () => this._handleNext(),
      () => this._handlePrevious(),
      () => this._handleSwipeStart(),
      () => this._handleSwipeEnd()
    );
  }

  private _cleanupTouchHandler(): void {
    if (this._touchHandler) {
      this._touchHandler.destroy();
      this._touchHandler = undefined;
    }
  }

  // Keyboard navigation
  private _setupKeyboardNavigation(): void {
    if (!this._config?.keyboard_navigation) return;
    document.addEventListener('keydown', this._handleKeyDown);
  }

  private _cleanupKeyboardNavigation(): void {
    document.removeEventListener('keydown', this._handleKeyDown);
  }

  private _handleKeyDown = (e: KeyboardEvent): void => {
    if (!this._config?.keyboard_navigation) return;

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        this._handlePrevious();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        this._handleNext();
        break;
    }
  };

  // Navigation handlers
  private _handlePrevious(): void {
    if (this._carousel) {
      this._carousel.previous();
    }
  }

  private _handleNext(): void {
    if (this._carousel) {
      this._carousel.next();
    }
  }

  private _handleGoTo(index: number): void {
    if (this._carousel) {
      this._carousel.goTo(index);
    }
  }

  private _handleSwipeStart(): void {
    if (this._config?.pause_on_hover && this._carousel) {
      this._carousel.pause();
    }
  }

  private _handleSwipeEnd(): void {
    if (this._config?.pause_on_hover && this._carousel && !this._isHovering) {
      this._carousel.resume();
    }
  }

  // Hover handlers
  private _handleMouseEnter(): void {
    this._isHovering = true;
    if (this._config?.pause_on_hover && this._carousel) {
      this._carousel.pause();
    }
  }

  private _handleMouseLeave(): void {
    this._isHovering = false;
    if (this._config?.pause_on_hover && this._carousel) {
      this._carousel.resume();
    }
  }

  // Slide click handler (for modal)
  private _handleSlideClick(item: FeedItem, event: MouseEvent): void {
    if (!this._config || !shouldUseModal(this._config)) {
      // Modal disabled, let default behavior happen (link opens in new tab)
      return;
    }

    const modalType = getModalType(this._config);

    // If modal type is 'none', open directly in new tab
    if (modalType === 'none') {
      event.preventDefault();
      event.stopPropagation();
      window.open(item.link, '_blank', 'noopener,noreferrer');
      return;
    }

    // Prevent default link behavior
    event.preventDefault();
    event.stopPropagation();

    // Open modal
    if (this._modalController && item.link) {
      this._modalController.open(item.link, item.title || 'RSS Feed');
    }
  }

  // Render methods
  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }

    // Error state
    if (this._errorState.type !== 'none') {
      return this._renderError();
    }

    // Empty feed state
    if (this._feed.length === 0) {
      return this._renderEmpty();
    }

    return this._renderCarousel();
  }

  private _renderError(): TemplateResult {
    return html`
      <ha-card>
        <div class="error-container">
          <div class="error-icon">⚠️</div>
          <div class="error-title">Configuration Error</div>
          <div class="error-message">${this._errorState.message}</div>
          ${this._errorState.details
            ? html`<div class="error-details">${this._errorState.details}</div>`
            : ''}
        </div>
      </ha-card>
    `;
  }

  private _renderEmpty(): TemplateResult {
    const quote = getRandomStarTrekQuote();

    return html`
      <ha-card>
        <div class="empty-container">
          <div class="empty-icon">📡</div>
          <div class="empty-title">No Feed Items</div>
          <div class="empty-message">The feed is currently empty.</div>
          <div class="star-trek-quote">
            <div class="star-trek-quote-text">"${quote.quote}"</div>
            <div class="star-trek-quote-author">— ${quote.author}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _renderCarousel(): TemplateResult {
    const useAspectRatio = shouldUseAspectRatio(this._config!);
    const aspectPadding = useAspectRatio ? calculateAspectPadding(this._config!.aspect_ratio) : 0;

    const containerClasses = {
      'aspect-ratio-box': useAspectRatio,
      'fixed-height': !useAspectRatio,
    };

    const containerStyle = useAspectRatio ? { '--aspect-ratio-padding': `${aspectPadding}%` } : {};

    return html`
      ${useAspectRatio
        ? html`<style>
            :host {
              --aspect-ratio-padding: ${aspectPadding}%;
            }
          </style>`
        : ''}
      <ha-card>
        <div class=${classMap(containerClasses)} style=${styleMap(containerStyle)}>
          <div class="content">
            ${this._renderCarouselContent()}
            ${this._performanceWarning
              ? html`<div class="performance-warning">${this._performanceWarning}</div>`
              : ''}
          </div>
        </div>
      </ha-card>
    `;
  }

  private _renderCarouselContent(): TemplateResult {
    const wrapperClasses = {
      'carousel-wrapper': true,
      [`layout-${this._config!.image_layout}`]: true,
      [`transition-${this._config!.transition}`]: true,
    };

    return html`
      <div
        class=${classMap(wrapperClasses)}
        tabindex="0"
        role="region"
        aria-label="RSS Feed Carousel"
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
      >
        ${this._renderSlides()} ${this._renderControls()}
      </div>
    `;
  }

  private _renderSlides(): TemplateResult {
    const { currentIndex } = this._carouselState;
    const transition = this._config!.transition || 'slide-vertical';

    let carouselStyle: any = {};

    if (transition === 'slide-vertical') {
      carouselStyle = {
        transform: `translateY(-${currentIndex * 100}%)`,
      };
    } else if (transition === 'slide-horizontal') {
      carouselStyle = {
        transform: `translateX(-${currentIndex * 100}%)`,
      };
    }

    return html`
      <div class="carousel" style=${styleMap(carouselStyle)}>
        ${this._feed.map((item, index) => this._renderSlide(item, index))}
      </div>
    `;
  }

  private _renderSlide(item: FeedItem, index: number): TemplateResult {
    const { currentIndex } = this._carouselState;
    const isActive = index === currentIndex;
    const transition = this._config!.transition || 'slide-vertical';

    const slideClasses = {
      slide: true,
      active: isActive && transition === 'fade',
    };

    const imageSrc = getSlideImage(item);
    const showImage = this._config!.show_images !== false && !!imageSrc;

    const useModal = shouldUseModal(this._config!);

    // Combine styles
    const slideStyle = {
      cursor: useModal ? 'pointer' : 'default',
    };

    return html`
      <div
        class=${classMap(slideClasses)}
        style=${styleMap(slideStyle)}
        @click=${(e: MouseEvent) => this._handleSlideClick(item, e)}
      >
        ${this._renderSlideImage(imageSrc, showImage)}
        <div class="slide-content">
          ${useModal
            ? html`
                <div>
                  ${item.title ? html`<h3 class="slide-title">${item.title}</h3>` : ''}
                  ${item.description || item.summary
                    ? html`<p class="slide-description">${item.description || item.summary}</p>`
                    : ''}
                  ${item.published
                    ? html`<small class="slide-date">${formatPublishedDate(item.published)}</small>`
                    : ''}
                </div>
              `
            : html`
                <a href="${item.link}" target="_blank" rel="noopener noreferrer">
                  ${item.title ? html`<h3 class="slide-title">${item.title}</h3>` : ''}
                  ${item.description || item.summary
                    ? html`<p class="slide-description">${item.description || item.summary}</p>`
                    : ''}
                  ${item.published
                    ? html`<small class="slide-date">${formatPublishedDate(item.published)}</small>`
                    : ''}
                </a>
              `}
        </div>
      </div>
    `;
  }

  private _renderSlideImage(imageSrc: string | null, showImage: boolean): TemplateResult {
    if (!showImage || !imageSrc) {
      return html`<div class="slide-image-fallback"></div>`;
    }

    const lazyLoad = this._config!.lazy_load_images !== false;
    const loadingAttr = lazyLoad ? 'lazy' : 'eager';

    return html`
      <img
        class="slide-image"
        src="${imageSrc}"
        alt=""
        loading="${loadingAttr}"
        @error=${this._handleImageError}
      />
    `;
  }

  private _handleImageError(e: Event): void {
    const img = e.target as HTMLImageElement;
    const fallback = img.parentElement?.querySelector('.slide-image-fallback');

    if (!fallback) {
      const div = document.createElement('div');
      div.className = 'slide-image-fallback';
      img.parentElement?.appendChild(div);
    }

    img.style.display = 'none';
  }

  private _renderControls(): TemplateResult {
    const { timeRemaining, isPaused } = this._carouselState;
    const showNav = this._config!.show_navigation;
    const showIndicators = this._config!.show_indicators;
    const transition = this._config!.transition || 'slide-vertical';

    // Use vertical arrows for vertical transition, horizontal arrows for others
    const prevIcon = transition === 'slide-vertical' ? '∧' : '‹';
    const nextIcon = transition === 'slide-vertical' ? '∨' : '›';

    return html`
      ${showNav
        ? html`
            <button
              class="navigation-button prev"
              @click=${this._handlePrevious}
              aria-label="Previous slide"
            >
              ${prevIcon}
            </button>
            <button
              class="navigation-button next"
              @click=${this._handleNext}
              aria-label="Next slide"
            >
              ${nextIcon}
            </button>
          `
        : ''}
      ${showIndicators ? this._renderIndicators() : ''}
      <div class="timer-bubble ${isPaused ? 'paused' : ''}">${timeRemaining}</div>
    `;
  }

  private _renderIndicators(): TemplateResult {
    const { currentIndex } = this._carouselState;
    const totalSlides = this._feed.length;

    return html`
      <div class="indicators">
        ${Array.from({ length: totalSlides }, (_, i) => {
          const isActive = i === currentIndex;
          return html`
            <button
              class="indicator ${isActive ? 'active' : ''}"
              @click=${() => this._handleGoTo(i)}
              aria-label="Go to slide ${i + 1}"
            ></button>
          `;
        })}
      </div>
    `;
  }
}

// Register for card picker
declare global {
  interface HTMLElementTagNameMap {
    'rssfeed-metro-tile': RssfeedMetroTile;
  }

  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'rssfeed-metro-tile',
  name: 'RSS Feed Metro Tile',
  description: 'Display RSS feed entries as animated Metro-style tiles',
  preview: true,
});

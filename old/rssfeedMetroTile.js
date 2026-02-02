console.log(`%crssfeed-metro-tile\n%cVersion: ${'0.0.1'}`, 'color: rebeccapurple; font-weight: bold;', '');

const HTML_TAG = "rssfeed-metro-tile";

class rssfeedMetroTile extends HTMLElement {
  DEFAULT_OPTIONS = {
    slide_duration_sec: 5,
    row_limit: 0,
    show_images: true,
    entity: '',
    dynamic_height: true,
    tile_height_px: 300,
    to_big_title: 50,
    style: ''
  };

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.currentIndex = 0;
    this.interval = null;
    this.config = null;
    this.feed = [];
    this.tile = null;
    this.tileId = HTML_TAG;
  }


  setConfig(config) {
    this.config = config;
    this.validateConfig();

    this.config = this.initializeConfig();
    const style = this.createStyleElement();

    const tile = this.createTile(style);
    this.renderTile(tile);
  }

  set hass(hass) {
    const feed = this.getFeed(this.config, hass);

    if(!this.feed.length){
      if(this.config.dynamic_height){
        const ele = this.shadowRoot.querySelector('div:has(hui-card)');
        // const currentHeight = ele.offsetHeight;
        // this.config.tile_height_px = currentHeight;
      }
    }

    if (JSON.stringify(feed) !== JSON.stringify(this.feed)) {
      this.feed = feed;
      const slides = this.createSlidesFromFeed();
      this.updateCarousel(slides);
    }
  }

  validateConfig() {
    if (!this.config.entity) throw new Error(
      `Please define an entity! Possible other options: ${Object.entries(this.DEFAULT_OPTIONS).map(([key, value]) => `${key}: ${value}`).join(', ')}
    `);
    if (this.config.tile_height_px < 150) throw new Error('Tile height must be at least 150px');
    if (this.config.tile_height_px < 200) {
      console.warn('Tile height is less than 200px, description will not be shown');
    }
  }

  initializeConfig() {
    return Object.assign(this.DEFAULT_OPTIONS, this.config);
  }

  createStyleElement() {
    const style = document.createElement('style');
    style.textContent = this.getStyle(this.config);
    if (this.config.style) style.textContent += this.config.style;
    return style;
  }

  createTile(style) {
    const tile = document.createElement('ha-slide');
    const content = this.createContent();

    tile.appendChild(content);
    tile.appendChild(style);
    return tile;
  }

  createContent() {
    const content = document.createElement('div');
    content.className = 'carousel-wrapper';
    content.id = this.generateTileId();
    this.tileId = content.id;

    const carousel = document.createElement('div');
    carousel.className = 'carousel';
    carousel.id = 'MetroCarousel';

    const durationBubble = this.createDurationBubble();

    content.appendChild(carousel);
    content.appendChild(durationBubble);
    return content;
  }

  createDurationBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'slide-duration-bubble';
    bubble.textContent = `${this.config.slide_duration_sec}`;
    return bubble;
  }

  generateTileId() {
    return `${this.config.entity.replace('.', '-')}-${HTML_TAG}`;
  }

  renderTile(tile) {
    const root = this.shadowRoot;
    if (root.lastChild) root.removeChild(root.lastChild);
    root.appendChild(tile);
  }

  getCardSize() {
    return 1;
  }

  updateCarousel(slides) {
    this.tile = this.shadowRoot.querySelector(`#${this.tileId}`);
    const carousel = this.tile.querySelector('.carousel');
    carousel.innerHTML = '';
    slides.forEach(slide => carousel.appendChild(slide));
    this.autostartCarousel(this.currentIndex, slides.length, carousel);
  }

  autostartCarousel(currentIndex, length, carousel) {
    if (this.interval) clearInterval(this.interval);

    let remainingTime = this.config.slide_duration_sec;

    const updateDurationBubble = () => {
      const bubble = this.tile.querySelector('.slide-duration-bubble');
      if (bubble) bubble.textContent = `${remainingTime}`;
    };

    const showNextSlide = () => {
      currentIndex = (currentIndex + 1) % length;
      carousel.style.top = `-${currentIndex * this.config.tile_height_px}px`;
      remainingTime = this.config.slide_duration_sec;
      updateDurationBubble();
    };

    updateDurationBubble();
    this.interval = setInterval(() => {
      remainingTime -= 1;
      if (remainingTime <= 0) {
        showNextSlide();
      } else {
        updateDurationBubble();
      }
    }, 1000);
  }

  getFeed(config, hass) {
    const entity = config.entity;
    if (!hass.states[entity]) {
      throw new Error(`Entity ${entity} not found`);
    }

    let feed = hass.states[config.entity].attributes;
    if (feed.hasOwnProperty('entries')) {
      feed = feed.entries;
    }

    const rowLimit = config.row_limit ? config.row_limit : Object.keys(feed).length;

    return feed.slice(0, rowLimit);
  }

  createSlidesFromFeed() {
    return this.feed.map((item) => this.createSlide(item));
  }

  createSlide(item) {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';

    const slideImage = this.getSlideImage(item);
    const slideTitle = this.getSlideTitle(item);
    const slideDescription = this.getSlideDescription(item, slideTitle);
    const slidePublished = this.getSlidePublished(item);

    slide.innerHTML = `
      <div class="slide">
        ${slideImage}
        <div class="slide-wrapper">
          <a class="slide-content" href="${item.link}" target="_blank">
            ${slideTitle}
            ${slideDescription}
            ${slidePublished}
          </a>
        </div>
      </div>
    `;
    return slide;
  }

  getSlideImage(item) {
    const imageObject = item.links.find(link => link.type.includes('image'));
    if (imageObject && this.config.show_images) {
      return `<img class="slide-image" src="${imageObject.href}" alt="" />`;
    }
    return '';
  }

  getSlideTitle(item) {
    return item.title ? `<div class="slide-title">${item.title}</div>` : '';
  }

  getSlideDescription(item, slideTitle) {
    const isTitleTooBig = slideTitle.length > this.config.to_big_title_count && this.config.tile_height_px < 250;
    if ((item.description || item.summary) && this.config.tile_height_px >= 200 && !isTitleTooBig) {
      return `<p class="slide-description">${item.description || item.summary}</p>`;
    }
    return '';
  }

  getSlidePublished(item) {
    return item.published ? `<small class="slide-date">${item.published}</small>` : '';
  }

  getStyle(config) {
    const tileHeight = config.tile_height_px;
    return `
    .carousel-wrapper {
        background: var(--ha-card-background, var(--card-background-color, #fff));
        width: 100%;
        height: ${tileHeight}px;
        overflow: hidden;
        position: relative;
        font-family: 'Segoe UI', sans-serif;
    }

    .carousel {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        transition: top 0.6s ease-in-out;
    }

    .carousel-slide {
        width: 100%;
        height: ${tileHeight}px;
        position: relative;
        background-size: cover;
        background-position: center;
        color: white;
        box-sizing: border-box;
    }

    .slide {
        position: relative;
        height: 100%;
    }
    
    .slide-image {
        width: 100%;
        height: ${tileHeight}px;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        filter: brightness(0.5) blur(5px);
    }
    
    .slide-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: end;
      position: absolute;
      top: 0;
      left: 0;
    }
    
    .slide-content {
        z-index: 2;
        padding: 8px;
    }
    
    .slide a {
        color: white !important;
        text-decoration: none !important;
        max-height: ${tileHeight}px;
    }

    .carousel-wrapper .slide-title {
        margin: 0;
        font-size: 2em;
        line-height: 1em;
    }

    .carousel-overlay p {
        margin: 5px 0 0;
        font-size: 0.9em;
    }

    /* Style for the duration bubble */
    .slide-duration-bubble {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        height: 10px;
        width: 10px;
        padding: 5px 5px;
        border-radius: 99px;
        font-size: 0.6em;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
    }
  `;
  }

  static getConfigElement() {
    return document.createElement(`${HTML_TAG}-editor`);
  }
}

customElements.define(HTML_TAG, rssfeedMetroTile);

customElements.define(`${HTML_TAG}-editor`, class extends HTMLElement {
  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  setConfig(config) {
    const defaultConfig = (new rssfeedMetroTile()).DEFAULT_OPTIONS;
    this._config = Object.assign({}, defaultConfig, config);
    this.render();
  }

  render() {
    if (!this._config || !this._hass) return;

    this.innerHTML = ''; // Clear existing content
    const container = this.createContainer();

    const sensorEntities = Object.keys(this._hass.states).filter((entity) =>
      entity.startsWith('sensor.')
    );

    const fields = [
      { label: 'Entity', type: 'autocomplete', key: 'entity' },
      { label: 'Dynamic Height', type: 'checkbox', key: 'dynamic_height' },
      { label: 'Tile Height (px)', type: 'number', key: 'tile_height_px' },
      { label: 'Slide Duration (sec)', type: 'number', key: 'slide_duration_sec' },
      { label: 'Show Images', type: 'checkbox', key: 'show_images' },
      { label: 'Row Limit', type: 'number', key: 'row_limit' },
      { label: 'Custom CSS Style', type: 'textarea', key: 'style' },
    ];

    fields.forEach((field) => {
      const inputField = this.createInputField(field, sensorEntities);
      container.appendChild(inputField);
    });

    this.appendChild(container);
  }

  createContainer() {
    const container = document.createElement('div');
    container.className = 'card-config';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';
    container.style.padding = '16px';
    container.style.border = '1px solid #ddd';
    container.style.borderRadius = '8px';
    return container;
  }

  createInputField(field, sensorEntities) {
    const wrapper = document.createElement('div');
    wrapper.className = 'input-field';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';

    const label = document.createElement('label');
    label.textContent = field.label;
    label.style.fontWeight = 'bold';
    label.style.marginBottom = '4px';
    label.style.color = '#333';
    wrapper.appendChild(label);

    let input;
    switch (field.type) {
      case 'autocomplete':
        input = document.createElement('input');
        input.setAttribute('list', 'sensor-entities');
        input.value = this._config[field.key] || '';
        input.dataset.key = field.key;

        const datalist = document.createElement('datalist');
        datalist.id = 'sensor-entities';
        sensorEntities.forEach((entity) => {
          const option = document.createElement('option');
          option.value = entity;
          datalist.appendChild(option);
        });
        wrapper.appendChild(datalist);
        break;

      case 'checkbox':
        input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = !!this._config[field.key];
        input.dataset.key = field.key;
        break;

      case 'textarea':
        input = document.createElement('textarea');
        input.dataset.key = field.key;
        input.value = this._config[field.key] || '';
        break;

      default:
        input = document.createElement('input');
        input.type = field.type;
        input.value = this._config[field.key] || '';
        input.dataset.key = field.key;
        break;
    }

    input.style.padding = '8px';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '4px';
    input.style.fontSize = '14px';
    if (field.type === 'checkbox') {
      input.style.width = 'auto';
      input.style.marginTop = '8px';
    }

    input.addEventListener('change', this._valueChanged.bind(this));
    wrapper.appendChild(input);

    return wrapper;
  }

  _valueChanged(event) {
    const target = event.target;
    const key = target.dataset.key;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    if (value === '' || value === undefined) {
      delete this._config[key];
    } else {
      this._config[key] = value;
    }

    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
  }
});

window.customCards = window.customCards || [];
window.customCards.push({
  type: "rssfeed-metro-tile",
  name: "RSS Feed Metro Tile",
  preview: true,
  description: "The RSS Feed Metro Tile generate slides with data from sensor that provides data as a list of attributes.",
});


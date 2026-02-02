import { LitElement, html, css } from 'lit';
import { fireEvent } from 'custom-card-helpers';

export class RssfeedMetroTileEditor extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  setConfig(config) {
    this._config = { ...config };
  }

  get _entity() {
    return this._config?.entity || '';
  }

  get _tile_height_px() {
    return this._config?.tile_height_px || 300;
  }

  get _slide_duration_sec() {
    return this._config?.slide_duration_sec || 5;
  }

  get _show_images() {
    return this._config?.show_images !== false;
  }

  get _row_limit() {
    return this._config?.row_limit || 0;
  }

  get _style() {
    return this._config?.style || '';
  }

  render() {
    if (!this.hass) {
      return html``;
    }

    return html`
      <div class="card-config">
        <ha-entity-picker
          label="Entity"
          .hass="${this.hass}"
          .value="${this._entity}"
          .configValue="${'entity'}"
          @value-changed="${this._valueChanged}"
          allow-custom-entity
        ></ha-entity-picker>
        <paper-input
          label="Tile Height (px)"
          type="number"
          .value="${this._tile_height_px}"
          .configValue="${'tile_height_px'}"
          @value-changed="${this._valueChanged}"
        ></paper-input>
        <paper-input
          label="Slide Duration (sec)"
          type="number"
          .value="${this._slide_duration_sec}"
          .configValue="${'slide_duration_sec'}"
          @value-changed="${this._valueChanged}"
        ></paper-input>
        <ha-formfield label="Show Images">
          <ha-switch
            .checked="${this._show_images}"
            .configValue="${'show_images'}"
            @change="${this._valueChanged}"
          ></ha-switch>
        </ha-formfield>
        <paper-input
          label="Row Limit"
          type="number"
          .value="${this._row_limit}"
          .configValue="${'row_limit'}"
          @value-changed="${this._valueChanged}"
        ></paper-input>
        <paper-textarea
          label="Custom CSS Style"
          .value="${this._style}"
          .configValue="${'style'}"
          @value-changed="${this._valueChanged}"
        ></paper-textarea>
      </div>
    `;
  }

  _valueChanged(ev) {
    if (!this._config || !this.hass) return;

    const target = ev.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    if (this._config[target.configValue] === value) return;

    if (value === '') {
      delete this._config[target.configValue];
    } else {
      this._config = { ...this._config, [target.configValue]: value };
    }

    fireEvent(this, 'config-changed', { config: this._config });
  }

  static get styles() {
    return css`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    `;
  }
}
import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fireEvent, HomeAssistant } from 'custom-card-helpers';
import { CardConfig } from './types';
import { DEFAULT_CONFIG } from './constants';

@customElement('rssfeed-metro-tile-editor')
export class RssfeedMetroTileEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: CardConfig;

  public setConfig(config: CardConfig): void {
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <!-- Entity Section -->
        <div class="config-section">
          <h3 class="section-title">Entity</h3>
          <ha-entity-picker
            label="RSS Feed Entity"
            .hass=${this.hass}
            .value=${this._config.entity}
            .configValue=${'entity'}
            @value-changed=${this._valueChanged}
            allow-custom-entity
            .includeDomains=${['sensor']}
          ></ha-entity-picker>
        </div>

        <!-- Layout Section -->
        <div class="config-section">
          <h3 class="section-title">Layout</h3>

          <ha-select
            label="Aspect Ratio"
            .value=${this._config.aspect_ratio || '16:9'}
            .configValue=${'aspect_ratio'}
            @selected=${this._valueChanged}
            @closed=${(e: Event) => e.stopPropagation()}
          >
            <mwc-list-item value="1:1">Square (1:1)</mwc-list-item>
            <mwc-list-item value="16:9">Widescreen (16:9)</mwc-list-item>
            <mwc-list-item value="4:3">Classic (4:3)</mwc-list-item>
          </ha-select>

          <ha-select
            label="Image Layout"
            .value=${this._config.image_layout}
            .configValue=${'image_layout'}
            @selected=${this._valueChanged}
            @closed=${(e: Event) => e.stopPropagation()}
          >
            <mwc-list-item value="background">Background with Blur</mwc-list-item>
            <mwc-list-item value="split">Split (Image Top, Text Bottom)</mwc-list-item>
          </ha-select>
        </div>

        <!-- Carousel Section -->
        <div class="config-section">
          <h3 class="section-title">Carousel</h3>

          <ha-textfield
            label="Slide Duration (seconds)"
            type="number"
            min="1"
            max="60"
            .value=${this._config.slide_duration_sec}
            .configValue=${'slide_duration_sec'}
            @input=${this._valueChanged}
          ></ha-textfield>

          <ha-select
            label="Transition Effect"
            .value=${this._config.transition}
            .configValue=${'transition'}
            @selected=${this._valueChanged}
            @closed=${(e: Event) => e.stopPropagation()}
          >
            <mwc-list-item value="slide-vertical">Slide Vertical</mwc-list-item>
            <mwc-list-item value="slide-horizontal">Slide Horizontal</mwc-list-item>
            <mwc-list-item value="fade">Fade</mwc-list-item>
          </ha-select>

          <ha-formfield label="Auto Play">
            <ha-switch
              .checked=${this._config.auto_play !== false}
              .configValue=${'auto_play'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Pause on Hover/Touch">
            <ha-switch
              .checked=${this._config.pause_on_hover !== false}
              .configValue=${'pause_on_hover'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <!-- Content Section -->
        <div class="config-section">
          <h3 class="section-title">Content</h3>

          <ha-textfield
            label="Row Limit (0 = all)"
            type="number"
            min="0"
            max="100"
            .value=${this._config.row_limit}
            .configValue=${'row_limit'}
            @input=${this._valueChanged}
          ></ha-textfield>

          <ha-formfield label="Show Images">
            <ha-switch
              .checked=${this._config.show_images !== false}
              .configValue=${'show_images'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Lazy Load Images">
            <ha-switch
              .checked=${this._config.lazy_load_images !== false}
              .configValue=${'lazy_load_images'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <!-- Navigation Section -->
        <div class="config-section">
          <h3 class="section-title">Navigation</h3>

          <ha-formfield label="Show Navigation Arrows">
            <ha-switch
              .checked=${this._config.show_navigation !== false}
              .configValue=${'show_navigation'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Indicators (Dots)">
            <ha-switch
              .checked=${this._config.show_indicators !== false}
              .configValue=${'show_indicators'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Keyboard Navigation">
            <ha-switch
              .checked=${this._config.keyboard_navigation !== false}
              .configValue=${'keyboard_navigation'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <!-- Grid Section (Sections View) -->
        <div class="config-section">
          <h3 class="section-title">Grid Layout (Sections View)</h3>

          <div class="grid-inputs">
            <ha-textfield
              label="Grid Rows"
              type="number"
              min="1"
              max="12"
              .value=${this._config.grid_rows}
              .configValue=${'grid_rows'}
              @input=${this._valueChanged}
            ></ha-textfield>

            <ha-textfield
              label="Grid Columns"
              type="number"
              min="1"
              max="12"
              .value=${this._config.grid_columns}
              .configValue=${'grid_columns'}
              @input=${this._valueChanged}
            ></ha-textfield>
          </div>
        </div>

        <!-- Modal Section -->
        <div class="config-section">
          <h3 class="section-title">Modal Settings</h3>

          <ha-formfield label="Open Links in Modal">
            <ha-switch
              .checked=${this._config.open_in_modal !== false}
              .configValue=${'open_in_modal'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-select
            label="Modal Type"
            .value=${this._config.modal_type || 'custom'}
            .configValue=${'modal_type'}
            @selected=${this._valueChanged}
            @closed=${(e: Event) => e.stopPropagation()}
          >
            <mwc-list-item value="custom">Custom Modal (iframe)</mwc-list-item>
            <mwc-list-item value="ha-dialog">Home Assistant Dialog</mwc-list-item>
            <mwc-list-item value="none">Direct External Link (No Modal)</mwc-list-item>
          </ha-select>

          <ha-select
            label="Modal Size"
            .value=${this._config.modal_size || 'medium'}
            .configValue=${'modal_size'}
            @selected=${this._valueChanged}
            @closed=${(e: Event) => e.stopPropagation()}
          >
            <mwc-list-item value="small">Small (50%)</mwc-list-item>
            <mwc-list-item value="medium">Medium (70%)</mwc-list-item>
            <mwc-list-item value="large">Large (90%)</mwc-list-item>
            <mwc-list-item value="fullscreen">Fullscreen (95%)</mwc-list-item>
          </ha-select>

          <ha-select
            label="Animation"
            .value=${this._config.modal_animation || 'fade'}
            .configValue=${'modal_animation'}
            @selected=${this._valueChanged}
            @closed=${(e: Event) => e.stopPropagation()}
          >
            <mwc-list-item value="fade">Fade</mwc-list-item>
            <mwc-list-item value="slide-up">Slide Up</mwc-list-item>
            <mwc-list-item value="scale">Scale</mwc-list-item>
            <mwc-list-item value="none">None</mwc-list-item>
          </ha-select>

          <div class="grid-inputs">
            <ha-textfield
              label="Custom Width (optional)"
              .value=${this._config.modal_width || ''}
              .configValue=${'modal_width'}
              @input=${this._valueChanged}
              helper="e.g. 800px or 80%"
            ></ha-textfield>

            <ha-textfield
              label="Custom Height (optional)"
              .value=${this._config.modal_height || ''}
              .configValue=${'modal_height'}
              @input=${this._valueChanged}
              helper="e.g. 600px or 70%"
            ></ha-textfield>
          </div>

          <ha-formfield label="Show Loading Spinner">
            <ha-switch
              .checked=${this._config.modal_show_loading !== false}
              .configValue=${'modal_show_loading'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Fallback to External Link (CORS)">
            <ha-switch
              .checked=${this._config.modal_fallback_to_external !== false}
              .configValue=${'modal_fallback_to_external'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Close on Backdrop Click">
            <ha-switch
              .checked=${this._config.modal_close_on_backdrop !== false}
              .configValue=${'modal_close_on_backdrop'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Close Button">
            <ha-switch
              .checked=${this._config.modal_show_close_button !== false}
              .configValue=${'modal_show_close_button'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Close on ESC Key">
            <ha-switch
              .checked=${this._config.modal_close_on_esc !== false}
              .configValue=${'modal_close_on_esc'}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        </div>

        <!-- Advanced Section -->
        <details class="config-section">
          <summary class="section-title">Advanced</summary>

          <ha-textfield
            label="Performance Warning Threshold"
            type="number"
            min="5"
            max="100"
            .value=${this._config.performance_warning}
            .configValue=${'performance_warning'}
            @input=${this._valueChanged}
            helper="Show warning when feed has more items than this"
          ></ha-textfield>

          <ha-textarea
            label="Custom CSS"
            .value=${this._config.style || ''}
            .configValue=${'style'}
            @input=${this._valueChanged}
            rows="5"
            helper="Advanced: Add custom CSS styles"
          ></ha-textarea>
        </details>
      </div>
    `;
  }

  private _valueChanged(ev: CustomEvent | Event): void {
    if (!this._config || !this.hass) {
      return;
    }

    const target = ev.target as any;
    const configValue = target.configValue;

    if (!configValue) {
      return;
    }

    let value: any;

    if (target.type === 'checkbox' || target.tagName === 'HA-SWITCH') {
      value = target.checked;
    } else if (target.type === 'number') {
      value = Number(target.value);
    } else if (target.tagName === 'HA-SELECT') {
      value = target.value;
    } else {
      value = target.value;
    }

    // Don't update if value hasn't changed
    if ((this._config as any)[configValue] === value) {
      return;
    }

    // Update config
    const newConfig: any = {
      ...this._config,
      [configValue]: value,
    };

    // Remove empty values
    if (value === '' || value === undefined) {
      delete newConfig[configValue];
    }

    this._config = newConfig as CardConfig;

    // Fire config changed event
    fireEvent(this, 'config-changed', { config: this._config });
  }

  static styles = css`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .config-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
      background: var(--secondary-background-color);
      border-radius: 8px;
    }

    .section-title {
      margin: 0 0 8px 0;
      font-size: 14px;
      font-weight: 600;
      color: var(--primary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    details.config-section {
      cursor: pointer;
    }

    details.config-section summary {
      cursor: pointer;
      user-select: none;
    }

    ha-entity-picker,
    ha-textfield,
    ha-select,
    ha-textarea,
    ha-formfield {
      display: block;
      width: 100%;
    }

    ha-formfield {
      margin: 8px 0;
    }

    .grid-inputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    /* Mobile responsive */
    @media (max-width: 600px) {
      .config-section {
        padding: 12px;
      }

      .grid-inputs {
        grid-template-columns: 1fr;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'rssfeed-metro-tile-editor': RssfeedMetroTileEditor;
  }
}

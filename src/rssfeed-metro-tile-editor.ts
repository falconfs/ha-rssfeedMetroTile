import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fireEvent, HomeAssistant } from 'custom-card-helpers';
import { CardConfig } from './types';
import { DEFAULT_CONFIG } from './constants';
import {
  EDITOR_CATEGORIES,
  EditorControl,
  getControlsByCategory,
  isControlVisible,
} from './editor-config';

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

    const categories = getControlsByCategory();

    return html`
      <div class="card-config">
        ${Array.from(categories.entries()).map(([categoryKey, controls]) =>
          this._renderSection(categoryKey, controls)
        )}
      </div>
    `;
  }

  /**
   * Render a config section with its controls
   */
  private _renderSection(categoryKey: string, controls: EditorControl[]): TemplateResult {
    const label = EDITOR_CATEGORIES[categoryKey];
    const visibleControls = controls.filter(c => isControlVisible(c, this._config!));

    // Special handling for Advanced section - render as collapsible <details>
    if (categoryKey === 'advanced') {
      return html`
        <details class="config-section">
          <summary class="section-title">${label}</summary>
          ${visibleControls.map(control => this._renderControl(control))}
        </details>
      `;
    }

    // Special handling for Grid section - render grid inputs in a grid layout
    if (categoryKey === 'grid') {
      return html`
        <div class="config-section">
          <h3 class="section-title">${label}</h3>
          <div class="grid-inputs">
            ${visibleControls.map(control => this._renderControl(control))}
          </div>
        </div>
      `;
    }

    // Check if this section has modal_width and modal_height together
    const hasModalDimensions =
      categoryKey === 'modal' &&
      visibleControls.some(c => c.id === 'modal_width') &&
      visibleControls.some(c => c.id === 'modal_height');

    if (hasModalDimensions) {
      // Render modal section with special grid layout for width/height
      const dimensionControls = visibleControls.filter(
        c => c.id === 'modal_width' || c.id === 'modal_height'
      );
      const otherControls = visibleControls.filter(
        c => c.id !== 'modal_width' && c.id !== 'modal_height'
      );

      return html`
        <div class="config-section">
          <h3 class="section-title">${label}</h3>
          ${otherControls.map(control => {
            // Insert grid dimensions after modal_size
            if (control.id === 'modal_size') {
              return html`
                ${this._renderControl(control)}
                <div class="grid-inputs">
                  ${dimensionControls.map(dc => this._renderControl(dc))}
                </div>
              `;
            }
            return this._renderControl(control);
          })}
        </div>
      `;
    }

    // Standard section rendering
    return html`
      <div class="config-section">
        <h3 class="section-title">${label}</h3>
        ${visibleControls.map(control => this._renderControl(control))}
      </div>
    `;
  }

  /**
   * Render an individual control based on its type
   */
  private _renderControl(control: EditorControl): TemplateResult {
    const configValue = (this._config as any)?.[control.id];

    switch (control.type) {
      case 'entity-picker':
        return html`
          <ha-entity-picker
            label=${control.label}
            .hass=${this.hass}
            .value=${configValue}
            .configValue=${control.id}
            @value-changed=${this._valueChanged}
            allow-custom-entity
            .includeDomains=${control.includeDomains || []}
          ></ha-entity-picker>
        `;

      case 'text':
        return html`
          <ha-textfield
            label=${control.label}
            .value=${configValue || ''}
            .configValue=${control.id}
            @input=${this._valueChanged}
            helper=${control.helper || ''}
          ></ha-textfield>
        `;

      case 'number':
        return html`
          <ha-textfield
            label=${control.label}
            type="number"
            min=${control.min ?? 0}
            max=${control.max ?? 100}
            .value=${configValue ?? control.min ?? 0}
            .configValue=${control.id}
            @input=${this._valueChanged}
            helper=${control.helper || ''}
          ></ha-textfield>
        `;

      case 'checkbox':
        return html`
          <ha-formfield label=${control.label}>
            <ha-switch
              .checked=${configValue !== false}
              .configValue=${control.id}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        `;

      case 'select':
        return html`
          <ha-select
            label=${control.label}
            .value=${configValue ?? control.options?.[0]?.value ?? ''}
            .configValue=${control.id}
            @selected=${this._valueChanged}
            @closed=${(e: Event) => e.stopPropagation()}
          >
            ${control.options?.map(
              opt => html`<mwc-list-item value=${opt.value}>${opt.label}</mwc-list-item>`
            )}
          </ha-select>
        `;

      case 'textarea':
        return html`
          <ha-textarea
            label=${control.label}
            .value=${configValue || ''}
            .configValue=${control.id}
            @input=${this._valueChanged}
            rows="5"
            helper=${control.helper || ''}
          ></ha-textarea>
        `;

      default:
        return html``;
    }
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

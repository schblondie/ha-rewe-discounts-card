class ReweDiscountsCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    setConfig(config) {
        if (!config.entity) {
            throw new Error('Please define a REWE entity in your card configuration.');
        }
        this.config = {
            title: 'REWE Angebote',
            show_images: true,
            ...config
        };
    }

    set hass(hass) {
        const entity = hass.states[this.config.entity];
        if (!entity) {
            this.shadowRoot.innerHTML = `
        <ha-card>
          <div class="card-content error">Entity not found: ${this.config.entity}</div>
        </ha-card>
      `;
            return;
        }

        this.render(entity);
    }

    render(entity) {
        const offers = entity.attributes.offers || entity.attributes.discounts || entity.attributes.items || [];
        const grouped = {};
        offers.forEach(offer => {
            const category = offer.category || offer.category_name || 'Weitere Angebote';
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(offer);
        });

        const cardTitle = this.config.title || entity.attributes.friendly_name || 'REWE Angebote';

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        ha-card {
          padding: 16px;
          background: var(--ha-card-background, var(--card-background-color, white));
          border-radius: var(--ha-card-border-radius, 12px);
          box-shadow: var(--ha-card-box-shadow, none);
          color: var(--primary-text-color, #212121);
          font-family: var(--paper-font-body1_-_font-family);
        }
        .card-header {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .category-group {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          width: 100%;
          clear: both;
        }
        .category-title {
          font-size: 1.05rem;
          font-weight: 700;
          margin: 12px 0 8px 0;
          padding-bottom: 4px;
          border-bottom: 1px solid var(--divider-color, #e0e0e0);
          color: var(--primary-text-color);
        }
        .offers-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }
        .offer-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background: var(--secondary-background-color, #f9f9f9);
          border-radius: 8px;
          box-sizing: border-box;
          width: 100%;
        }
        .offer-image {
          width: 48px;
          height: 48px;
          object-fit: contain;
          flex-shrink: 0;
          background: #ffffff;
          border-radius: 6px;
          padding: 2px;
        }
        .offer-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          min-width: 0;
        }
        .offer-title {
          font-size: 0.95rem;
          font-weight: 500;
          line-height: 1.2;
          word-break: break-word;
        }
        .offer-subtitle {
          font-size: 0.8rem;
          color: var(--secondary-text-color, #757575);
          margin-top: 2px;
        }
        .offer-price-container {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex-shrink: 0;
          margin-left: auto;
        }
        .offer-price {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--primary-color, #cc071e);
        }
        .offer-old-price {
          font-size: 0.8rem;
          text-decoration: line-through;
          color: var(--secondary-text-color, #9e9e9e);
        }
        .error {
          color: var(--error-color, #db4437);
        }
      </style>

      <ha-card>
        <div class="card-header">${cardTitle}</div>
        <div class="card-content">
          ${Object.keys(grouped).length === 0 ? '<p>Keine aktuellen Angebote verfügbar.</p>' : ''}
          ${Object.entries(grouped).map(([category, items]) => `
            <div class="category-group">
              <div class="category-title">${category}</div>
              <div class="offers-list">
                ${items.map(item => `
                  <div class="offer-item">
                    ${this.config.show_images && (item.image || item.image_url) ? `
                      <img class="offer-image" src="${item.image || item.image_url}" alt="${item.title || item.name || ''}" loading="lazy" />
                    ` : ''}
                    <div class="offer-details">
                      <div class="offer-title">${item.title || item.name || 'Angebot'}</div>
                      ${item.subtitle || item.description ? `<div class="offer-subtitle">${item.subtitle || item.description}</div>` : ''}
                    </div>
                    ${item.price || item.current_price ? `
                      <div class="offer-price-container">
                        <span class="offer-price">${item.price || item.current_price} €</span>
                        ${item.old_price || item.regular_price ? `<span class="offer-old-price">${item.old_price || item.regular_price} €</span>` : ''}
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </ha-card>
    `;
    }

    getCardSize() {
        return 4;
    }
    static async getConfigElement() {
        return document.createElement('ha-rewe-discounts-card-editor');
    }

    static getStubConfig(hass, entities) {
        const reweEntity = entities.find(e => e.startsWith('sensor.rewe') || e.includes('rewe'));
        return {
            entity: reweEntity || '',
            title: 'REWE Angebote',
            show_images: true,
            enable_search: false,
            compact_view: false
        };
    }
}

class ReweDiscountsCardEditor extends HTMLElement {
    setConfig(config) {
        this._config = config;
        this.render();
    }

    set hass(hass) {
        this._hass = hass;
        this.render();
    }

    _valueChanged(ev) {
        if (!this._config || !this._hass) return;
        const newConfig = ev.detail.value;

        // Dispatch config-changed event for Lovelace to save
        const event = new CustomEvent('config-changed', {
            detail: { config: newConfig },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
    }

    render() {
        if (!this._hass || !this._config) return;

        if (!this._form) {
            this._form = document.createElement('ha-form');
            this._form.hass = this._hass;
            this._form.addEventListener('value-changed', this._valueChanged.bind(this));
            this.appendChild(this._form);
        }

        this._form.hass = this._hass;
        this._form.data = this._config;

        // ha-form schema using standard Home Assistant selectors
        this._form.schema = [
            {
                name: 'entity',
                label: 'REWE Entity',
                required: true,
                selector: {
                    entity: {
                        domain: ['sensor', 'binary_sensor']
                    }
                }
            },
            {
                name: 'title',
                label: 'Card Title',
                selector: { text: {} }
            },
            {
                name: '',
                type: 'grid',
                schema: [
                    {
                        name: 'show_images',
                        label: 'Show Images',
                        selector: { boolean: {} }
                    },
                    {
                        name: 'enable_search',
                        label: 'Show Search Bar',
                        selector: { boolean: {} }
                    },
                    {
                        name: 'compact_view',
                        label: 'Compact Grid Mode',
                        selector: { boolean: {} }
                    }
                ]
            }
        ];
    }
}

customElements.define('ha-rewe-discounts-card', ReweDiscountsCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'ha-rewe-discounts-card',
  name: 'REWE Discounts Card',
  description: 'A custom card displaying REWE weekly market discounts cleanly grouped by category.'
});
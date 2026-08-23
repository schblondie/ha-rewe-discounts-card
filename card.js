/**
 * REWE Discounts Card for Home Assistant Lovelace
 * Repository: schblondie/ha-rewe-discounts-card
 */

class ReweDiscountsCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._filterText = '';
        this._categoryOpenState = {};
    }

    static async getConfigElement() {
        return document.createElement('ha-rewe-discounts-card-editor');
    }

    static getStubConfig(hass, entities) {
        const reweEntity = entities.find(
            (e) => e.startsWith('sensor.rewe') || e.includes('rewe')
        );
        return {
            entity: reweEntity || '',
            title: 'REWE Angebote',
            show_images: true,
            enable_search: true,
            collapsible_categories: true,
            categories_open_by_default: true,
            category_filter_mode: 'none',
            category_filter_categories: [],
            enable_todo: false,
            todo_entity: ''
        };
    }

    setConfig(config) {
        if (!config.entity) {
            throw new Error('Please define a REWE entity in the card configuration.');
        }
        this.config = {
            title: 'REWE Angebote',
            show_images: true,
            enable_search: true,
            collapsible_categories: true,
            categories_open_by_default: true,
            category_filter_mode: 'none',
            category_filter_categories: [],
            enable_todo: false,
            todo_entity: '',
            ...config
        };
    }

    set hass(hass) {
        this._hass = hass;
      if (this.shadowRoot.activeElement?.classList.contains('search-input')) {
        return;
      }
        this.render();
    }

    _addItemToTodo(e, itemName) {
        e.stopPropagation();
        if (!this._hass) return;

        if (this.config.todo_entity) {
            this._hass.callService('todo', 'add_item', {
                entity_id: this.config.todo_entity,
                item: itemName
            });
        } else {
            this._hass.callService('shopping_list', 'add_item', {
                name: itemName
            });
        }

        const btn = e.currentTarget;
        btn.classList.add('added');
        setTimeout(() => btn.classList.remove('added'), 1200);
    }

    _onSearchInput(e) {
        this._filterText = e.target.value.toLowerCase().trim();
        this.render();
    }

    render() {
        if (!this._hass || !this.config) return;

        const activeElement = this.shadowRoot.activeElement;
        const previousSearchInput = this.shadowRoot.querySelector('.search-input');
        const searchWasFocused = activeElement?.classList.contains('search-input');
        const selectionStart = searchWasFocused ? activeElement.selectionStart : null;
        const selectionEnd = searchWasFocused ? activeElement.selectionEnd : null;

        const entity = this._hass.states[this.config.entity];
        if (!entity) {
            this.shadowRoot.innerHTML = `
        <ha-card>
          <div class="card-content error">
            Entity not found: <code>${this.config.entity}</code>
          </div>
        </ha-card>
      `;
            return;
        }

        const rawOffers =
            entity.attributes.discounts ||
            entity.attributes.offers ||
            entity.attributes.items ||
            entity.attributes.data ||
            [];

        const filteredOffers = rawOffers.filter((item) => {
          const category = item.category || item.category_name || 'Weitere Angebote';
          const filterCategories = this.config.category_filter_categories || [];
          if (
            this.config.category_filter_mode === 'blacklist' &&
            filterCategories.includes(category)
          ) {
            return false;
          }
          if (
            this.config.category_filter_mode === 'whitelist' &&
            !filterCategories.includes(category)
          ) {
            return false;
          }
            if (!this._filterText) return true;
            const title = (item.title || item.name || item.product || '').toLowerCase();
            const cat = (item.category || item.category_name || '').toLowerCase();
            const desc = (item.description || item.subtitle || item.base_price || '').toLowerCase();
            return (
                title.includes(this._filterText) ||
                cat.includes(this._filterText) ||
                desc.includes(this._filterText)
            );
        });

        const grouped = {};
        filteredOffers.forEach((item) => {
            const cat = item.category || item.category_name || 'Weitere Angebote';
            if (!grouped[cat]) {
                grouped[cat] = [];
            }
            grouped[cat].push(item);
        });

        const cardTitle =
            this.config.title || entity.attributes.friendly_name || 'REWE Angebote';

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        ha-card {
          padding: 16px;
          background: var(--ha-card-background, var(--card-background-color, #ffffff));
          border-radius: var(--ha-card-border-radius, 12px);
          box-shadow: var(--ha-card-box-shadow, none);
          color: var(--primary-text-color, #212121);
          font-family: var(--paper-font-body1_-_font-family, sans-serif);
          box-sizing: border-box;
        }
        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: var(--primary-text-color);
        }
        .search-container {
          margin-bottom: 16px;
        }
        .search-input {
          width: 100%;
          padding: 9px 14px;
          border-radius: 8px;
          border: 1px solid var(--divider-color, #e0e0e0);
          background: var(--secondary-background-color, #f4f4f4);
          color: var(--primary-text-color);
          box-sizing: border-box;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .search-input:focus {
          border-color: var(--primary-color, #cc071e);
        }
        .category-group {
          margin-bottom: 14px;
          width: 100%;
          clear: both;
        }
        .category-group summary {
          cursor: pointer;
          user-select: none;
          outline: none;
          font-size: 1.05rem;
          font-weight: 700;
          padding: 6px 0;
          border-bottom: 1px solid var(--divider-color, #e0e0e0);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--primary-text-color);
        }
        .category-group:not([open]) summary {
          border-bottom: none;
          margin-bottom: 0;
        }
        .category-title-static {
          font-size: 1.05rem;
          font-weight: 700;
          padding-bottom: 4px;
          border-bottom: 1px solid var(--divider-color, #e0e0e0);
          margin: 12px 0 8px 0;
          color: var(--primary-text-color);
        }
        .badge-count {
          font-size: 0.75rem;
          background: var(--secondary-background-color, #e0e0e0);
          color: var(--secondary-text-color, #666);
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 500;
        }
        .offers-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          margin-top: 6px;
        }
        .offer-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: var(--secondary-background-color, #f8f9fa);
          border-radius: 8px;
          box-sizing: border-box;
          width: 100%;
          transition: background-color 0.15s ease;
        }
        .offer-item:hover {
          background: var(--table-row-alternative-background-color, #efefef);
        }
        .offer-image {
          width: 50px;
          height: 50px;
          object-fit: contain;
          flex-shrink: 0;
          background: #ffffff;
          border-radius: 6px;
          padding: 2px;
        }
        .offer-image-placeholder {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: 4px;
          box-sizing: border-box;
          background: var(--secondary-background-color, #f4f4f4);
          border-radius: 6px;
          color: var(--secondary-text-color, #757575);
          font-size: 0.7rem;
          font-weight: 600;
          line-height: 1.1;
          text-align: center;
          word-break: break-word;
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
          font-weight: 600;
          line-height: 1.25;
          word-break: break-word;
          color: var(--primary-text-color);
        }
        .offer-subtitle {
          font-size: 0.8rem;
          color: var(--secondary-text-color, #757575);
          margin-top: 3px;
        }
        .offer-price-container {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          flex-shrink: 0;
          margin-left: auto;
          text-align: right;
        }
        .offer-price {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--primary-color, #cc071e);
        }
        .offer-old-price {
          font-size: 0.8rem;
          text-decoration: line-through;
          color: var(--secondary-text-color, #9e9e9e);
        }
        .btn-add-todo {
          background: transparent;
          border: 1px solid var(--divider-color, #ccc);
          color: var(--primary-text-color);
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          margin-left: 8px;
          transition: all 0.2s ease;
        }
        .btn-add-todo:hover {
          background: var(--primary-color, #cc071e);
          border-color: var(--primary-color, #cc071e);
          color: #ffffff;
        }
        .btn-add-todo.added {
          background: #4caf50 !important;
          border-color: #4caf50 !important;
          color: #ffffff !important;
          transform: scale(1.1);
        }
        .no-results {
          padding: 16px 0;
          text-align: center;
          color: var(--secondary-text-color);
          font-style: italic;
        }
        .error {
          color: var(--error-color, #db4437);
        }
      </style>

      <ha-card>
        <div class="card-header">
          <span>${cardTitle}</span>
          <span class="badge-count">${filteredOffers.length} Angebote</span>
        </div>

        ${this.config.enable_search
                ? `
          <div class="search-container">
            <input 
              type="text" 
              class="search-input" 
              placeholder="Angebote durchsuchen..." 
              value="${this._filterText}" 
            />
          </div>
        `
                : ''
            }

        <div class="card-content">
          ${Object.keys(grouped).length === 0
                ? `<div class="no-results">Keine aktuellen Angebote gefunden.</div>`
                : ''
            }

          ${Object.entries(grouped)
                .map(([category, items]) => {
                    const categoryHtml = `
              <div class="offers-list">
                ${items
                            .map((item) => {
                                const itemName = item.title || item.name || item.product || item.base_price || 'Angebot';
                                const imgUrl = item.picture_link;
                                const price = item.price || item.current_price;
                                const oldPrice = item.old_price || item.regular_price;
                                const subtitle = item.subtitle || item.description || item.base_price;
                                const displayPrice =
                                  typeof price === 'string' && price.includes('€')
                                    ? price
                                    : price
                                    ? `${price} €`
                                    : '';
                                const displayOldPrice =
                                  typeof oldPrice === 'string' && oldPrice.includes('€')
                                    ? oldPrice
                                    : oldPrice
                                    ? `${oldPrice} €`
                                    : '';

                                return `
                    <div class="offer-item">
                      ${this.config.show_images &&
                                        imgUrl &&
                                        typeof imgUrl === 'string' &&
                                        imgUrl.trim() !== ''
                                        ? `<img class="offer-image" src="${imgUrl}" alt="" loading="lazy" onerror="this.remove()" />`
                                        : this.config.show_images
                                        ? `<div class="offer-image-placeholder">${itemName}</div>`
                                        : ''
                                    }

                      <div class="offer-details">
                        <div class="offer-title">${itemName}</div>
                        ${subtitle ? `<div class="offer-subtitle">${subtitle}</div>` : ''}
                      </div>

                      ${displayPrice
                                        ? `
                        <div class="offer-price-container">
                          <span class="offer-price">${displayPrice}</span>
                          ${displayOldPrice ? `<span class="offer-old-price">${displayOldPrice}</span>` : ''}
                        </div>
                      `
                                        : ''
                                    }

                      ${this.config.enable_todo
                                        ? `
                        <button class="btn-add-todo" title="Zur Einkaufsliste hinzufügen" data-item="${encodeURIComponent(itemName)}">
                          <svg style="width:18px;height:18px" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                          </svg>
                        </button>
                      `
                                        : ''
                                    }
                    </div>
                  `;
                            })
                            .join('')}
              </div>
            `;

                    if (this.config.collapsible_categories) {
                        return `
                  <details class="category-group" data-category="${encodeURIComponent(category)}" ${
                        this._categoryOpenState[category] ?? this.config.categories_open_by_default
                          ? 'open'
                          : ''
                      }>
                  <summary>
                    <span>${category}</span>
                    <span class="badge-count">${items.length}</span>
                  </summary>
                  ${categoryHtml}
                </details>
              `;
                    } else {
                        return `
                <div class="category-group">
                  <div class="category-title-static">${category} (${items.length})</div>
                  ${categoryHtml}
                </div>
              `;
                    }
                })
                .join('')}
        </div>
      </ha-card>
    `;

        if (this.config.enable_search) {
          let searchInput = this.shadowRoot.querySelector('.search-input');
            if (searchInput) {
            if (previousSearchInput) {
              searchInput.replaceWith(previousSearchInput);
              searchInput = previousSearchInput;
              searchInput.value = this._filterText;
            }
            if (!searchInput._reweInputListener) {
              searchInput.addEventListener('input', this._onSearchInput.bind(this));
              searchInput._reweInputListener = true;
            }
            if (searchWasFocused) {
              searchInput.focus();
              searchInput.setSelectionRange(selectionStart, selectionEnd);
            }
            }
        }

        if (this.config.collapsible_categories) {
          this.shadowRoot.querySelectorAll('.category-group').forEach((categoryGroup) => {
            categoryGroup.addEventListener('toggle', () => {
              const category = decodeURIComponent(categoryGroup.dataset.category);
              this._categoryOpenState[category] = categoryGroup.open;
            });
          });
        }

        if (this.config.enable_todo) {
            const buttons = this.shadowRoot.querySelectorAll('.btn-add-todo');
            buttons.forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    const itemName = decodeURIComponent(btn.getAttribute('data-item'));
                    this._addItemToTodo(e, itemName);
                });
            });
        }
    }

    getCardSize() {
        return 6;
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
            this._form.addEventListener('value-changed', this._valueChanged.bind(this));
            this.appendChild(this._form);
        }

        this._form.hass = this._hass;
        this._form.data = this._config;

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
                        label: 'Show Product Images',
                        selector: { boolean: {} }
                    },
                    {
                        name: 'enable_search',
                        label: 'Enable Live Search Bar',
                        selector: { boolean: {} }
                    },
                    {
                        name: 'collapsible_categories',
                        label: 'Collapsible Category Accordions',
                        selector: { boolean: {} }
                    },
                      {
                        name: 'categories_open_by_default',
                        label: 'Categories Open by Default',
                        selector: { boolean: {} }
                      },
                      {
                        name: 'category_filter_mode',
                        label: 'Category Filter Mode',
                        selector: {
                          select: {
                            options: [
                              { value: 'none', label: 'Show all categories' },
                              { value: 'blacklist', label: 'Blacklist selected categories' },
                              { value: 'whitelist', label: 'Whitelist selected categories' }
                            ],
                            mode: 'dropdown'
                          }
                        }
                      },
                      {
                        name: 'category_filter_categories',
                        label: 'Filtered Categories',
                        selector: {
                          select: {
                            multiple: true,
                            options: this._getCategories()
                          }
                        }
                      },
                    {
                        name: 'enable_todo',
                        label: 'Enable Add-to-List Button',
                        selector: { boolean: {} }
                    }
                ]
            },
            {
                name: 'todo_entity',
                label: 'Target Todo Entity (Optional)',
                helper: 'Leave empty to use the default Home Assistant shopping list',
                selector: {
                    entity: {
                        domain: 'todo'
                    }
                }
            }
        ];
    }

      _getCategories() {
        if (!this._hass || !this._config) return [];

        const entity = this._hass.states[this._config.entity];
        if (!entity) return [];

        const offers =
          entity.attributes.discounts ||
          entity.attributes.offers ||
          entity.attributes.items ||
          entity.attributes.data ||
          [];
        return [...new Set(
          offers.map((item) => item.category || item.category_name || 'Weitere Angebote')
        )].sort();
      }
}

customElements.define('ha-rewe-discounts-card', ReweDiscountsCard);
customElements.define('ha-rewe-discounts-card-editor', ReweDiscountsCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
    type: 'ha-rewe-discounts-card',
    name: 'REWE Discounts Card',
    description:
        'A custom Lovelace card for browsing weekly REWE discounts with search, image handling, and shopping list integration.'
});
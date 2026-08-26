/**
 * Discounts Card for Home Assistant Lovelace
 * Repository: schblondie/discounts-card
 */

import en from '../translations/en.json';
import de from '../translations/de.json';
import cardStyles from '../styles/card.css';

const languages = { en, de };

function localize(key, hass) {
  const lang = hass?.locale?.language || hass?.language || 'en';
  const keys = key.split('.');
  const getNested = (obj) => keys.reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
  return getNested(languages[lang]) ?? getNested(languages.en) ?? key;
}

const formatPrice = (val) => {
  if (val === null || val === undefined || val === '') return '';
  const str = String(val).trim();
  return /[\€\$\£]/.test(str) ? str : `${str} €`;
};

class DiscountsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._filterQuery = '';
    this._categoryOpenState = {};
    this._searchRestoreCategoryState = null;
    this._hasSkeleton = false;
  }

  static async getConfigElement() {
    return document.createElement('discounts-card-editor');
  }

  static getStubConfig(hass, entities) {
    const supermarketEntity = entities?.find(
      (e) =>
        e.startsWith('sensor.rewe') ||
        e.includes('rewe') ||
        e.startsWith('sensor.edeka') ||
        e.includes('edeka') ||
        e.startsWith('sensor.lidl') ||
        e.includes('lidl') ||
        e.startsWith('sensor.aldi') ||
        e.includes('aldi') ||
        e.startsWith('sensor.norma') ||
        e.includes('norma') ||
        e.includes('discount') ||
        e.includes('offer')
    ) || '';

    const entLower = supermarketEntity.toLowerCase();
    let defaultTitle = localize('default.title', hass);

    if (entLower.includes('rewe')) defaultTitle = localize('rewe.title', hass);
    else if (entLower.includes('edeka')) defaultTitle = localize('edeka.title', hass);
    else if (entLower.includes('lidl')) defaultTitle = localize('lidl.title', hass);
    else if (entLower.includes('aldi')) defaultTitle = localize('aldi.title', hass);
    else if (entLower.includes('norma')) defaultTitle = localize('norma.title', hass);

    return {
      entity: supermarketEntity,
      title: defaultTitle,
      show_images: true,
      enable_search: true,
      collapsible_categories: true,
      categories_open_by_default: true,
      filter_mode: 'none',
      filter_categories: [],
      enable_todo: false,
      todo_entity: '',
      logo: true,
      price: false
    };
  }

  setConfig(config) {
    const showConfig = config.show || {};
    const logoSetting =
      config.logo ??
      config.rewe_logo ??
      showConfig.logo ??
      showConfig.rewe_logo ??
      true;

    this.config = {
      show_images: true,
      enable_search: true,
      collapsible_categories: true,
      categories_open_by_default: true,
      filter_mode: 'none',
      filter_categories: [],
      enable_todo: false,
      todo_entity: '',
      logo: logoSetting,
      price: config.price ?? showConfig.price ?? false,
      ...config
    };

    this._hasSkeleton = false;
    if (this._hass) {
      this.render();
    }
  }

  set hass(hass) {
    const oldEntity = this.config?.entity ? this._hass?.states[this.config.entity] : null;
    const newEntity = this.config?.entity ? hass.states[this.config.entity] : null;
    this._hass = hass;

    if (this._hasSkeleton && oldEntity === newEntity) {
      return;
    }
    this.render();
  }

  _addItemToTodo(e, itemName, itemPrice = '') {
    e.stopPropagation();
    if (!this._hass) return;

    const formattedItemName = this._formatTodoItemName(itemName, itemPrice);

    if (this.config.todo_entity) {
      this._hass.callService('todo', 'add_item', {
        entity_id: this.config.todo_entity,
        item: formattedItemName
      });
    } else {
      this._hass.callService('shopping_list', 'add_item', {
        name: formattedItemName
      });
    }

    const btn = e.currentTarget;
    btn.classList.add('added');
    setTimeout(() => btn.classList.remove('added'), 1200);
  }

  _formatTodoItemName(itemName, itemPrice) {
    const storeLabel = this._detectStoreLabel();
    const suffix = this.config.logo !== false && storeLabel ? ` (${storeLabel})` : '';
    const baseName = `${itemName}${suffix}`;
    if (!this.config.price || !itemPrice) {
      return baseName;
    }
    return `${baseName} - ${itemPrice}`;
  }

  _detectStoreLabel() {
    const entityId = (this.config?.entity || '').toLowerCase();
    const friendlyName = (
      this._hass?.states?.[this.config?.entity]?.attributes?.friendly_name || ''
    ).toLowerCase();
    const source = `${entityId} ${friendlyName}`;

    if (source.includes('aldi')) return 'ALDI';
    if (source.includes('edeka')) return 'EDEKA';
    if (source.includes('lidl')) return 'LIDL';
    if (source.includes('norma')) return 'NORMA';
    if (source.includes('rewe')) return 'REWE';
    return '';
  }

  _onSearchInput(e) {
    const nextFilterQuery = e.target.value.toLowerCase().trim();
    const hadActiveSearch = this._filterQuery.length > 0;
    const hasActiveSearch = nextFilterQuery.length > 0;

    if (!hadActiveSearch && hasActiveSearch) {
      this._searchRestoreCategoryState = { ...this._categoryOpenState };
    }

    if (!hasActiveSearch && this._searchRestoreCategoryState) {
      this._categoryOpenState = { ...this._searchRestoreCategoryState };
      this._searchRestoreCategoryState = null;
    } else if (hadActiveSearch && !hasActiveSearch) {
      this._categoryOpenState = {};
    }

    this._filterQuery = nextFilterQuery;
    this._updateOffersList();
  }

  _escapeHtml(value) {
    if (value === null || value === undefined) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  _sanitizeImageUrl(url) {
    if (typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (!trimmed) return '';

    try {
      const parsed = new URL(trimmed, window.location.origin);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return parsed.href;
      }
    } catch {
      return '';
    }
    return '';
  }

  render() {
    if (!this._hass || !this.config) return;

    if (!this.config.entity) {
      this._hasSkeleton = false;
      this.shadowRoot.innerHTML = `
        <ha-card style="padding: 16px;">
          <div style="color: var(--secondary-text-color);">
            Please select an entity in the card configuration editor.
          </div>
        </ha-card>
      `;
      return;
    }

    const entity = this._hass.states[this.config.entity];
    if (!entity) {
      this._hasSkeleton = false;
      this.shadowRoot.innerHTML = `
        <ha-card style="padding: 16px;">
          <div class="card-content error" style="color: var(--error-color, #db4437);">
            Entity not found: <code>${this._escapeHtml(this.config.entity)}</code>
          </div>
        </ha-card>
      `;
      return;
    }

    if (!this._hasSkeleton) {
      this._renderSkeleton(entity);
      this._hasSkeleton = true;
    }

    this._updateOffersList();
  }

  _renderSkeleton(entity) {
    const storeLabel = this._detectStoreLabel();
    const fallbackTitle = storeLabel
      ? `${storeLabel} ${localize('default.title', this._hass)}`
      : localize('default.title', this._hass);
    const cardTitle =
      this.config.title && this.config.title.trim() !== ''
        ? this.config.title
        : entity.attributes?.friendly_name || fallbackTitle;

    const safeCardTitle = this._escapeHtml(cardTitle);

    this.shadowRoot.innerHTML = `
      <style>
        ${cardStyles}
      </style>

      <ha-card>
        <div class="card-header">
          <span>${safeCardTitle}</span>
          <span class="badge-count header-badge">0 ${localize('default.offers', this._hass)}</span>
        </div>

        ${this.config.enable_search
        ? `
              <div class="search-container">
                <input
                  type="text"
                  class="search-input"
                  placeholder="${this._escapeHtml(localize('default.search', this._hass))}"
                  aria-label="${this._escapeHtml(localize('default.search', this._hass))}"
                />
              </div>
            `
        : ''
      }

        <div class="card-content"></div>
      </ha-card>
    `;

    if (this.config.enable_search) {
      const searchInput = this.shadowRoot.querySelector('.search-input');
      if (searchInput) {
        searchInput.addEventListener('input', this._onSearchInput.bind(this));
      }
    }
  }
  _getItemProps(item) {
    const name =
      item.product ||
      item.title ||
      item.name ||
      item.brand ||
      item.article ||
      localize('default.offer', this._hass);

    const image =
      item.picture_link ||
      item.picture ||
      item.image_url ||
      item.image ||
      item.photo ||
      '';

    const price = item.price || item.current_price || '';
    const oldPrice = item.old_price || item.regular_price || '';

    let subtitle = item.subtitle || item.description || item.base_price || '';
    if (!subtitle && item.packaging) {
      subtitle = item.packaging.split('\n')[0];
    } else if (!subtitle && item.price_per_unit) {
      subtitle = item.price_per_unit;
    } else if (!subtitle && item.brand && item.brand !== name) {
      subtitle = item.brand;
    }

    const validInfo = item.valid_until || item.valid_date || item.valid_from || '';
    if (validInfo) {
      subtitle = subtitle ? `${subtitle} • ${validInfo}` : validInfo;
    }

    const category =
      item.category ||
      item.category_name ||
      item.section ||
      localize('default.other_offers', this._hass);

    return { name, image, price, oldPrice, subtitle, category };
  }
  _updateOffersList() {
    const entity = this._hass?.states[this.config.entity];
    const contentContainer = this.shadowRoot.querySelector('.card-content');
    const headerBadge = this.shadowRoot.querySelector('.header-badge');
    if (!entity || !contentContainer) return;

    const rawOffers =
      entity.attributes.discounts ||
      entity.attributes.offers ||
      entity.attributes.items ||
      entity.attributes.products ||
      entity.attributes.articles ||
      entity.attributes.entries ||
      entity.attributes.data ||
      entity.attributes.coupons ||
      (Array.isArray(entity.attributes) ? entity.attributes : []) ||
      [];

    const filteredOffers = rawOffers.filter((item) => {
      if (!item || typeof item !== 'object') return false;
      const { name, category, subtitle } = this._getItemProps(item);
      const filterCategories = this.config.filter_categories || [];

      if (this.config.filter_mode === 'blacklist' && filterCategories.includes(category)) {
        return false;
      }
      if (this.config.filter_mode === 'whitelist' && !filterCategories.includes(category)) {
        return false;
      }
      if (!this._filterQuery) return true;

      const q = this._filterQuery;
      return (
        name.toLowerCase().includes(q) ||
        category.toLowerCase().includes(q) ||
        subtitle.toLowerCase().includes(q)
      );
    });

    if (headerBadge) {
      headerBadge.textContent = `${filteredOffers.length} ${localize('default.offers', this._hass)}`;
    }

    const grouped = {};
    filteredOffers.forEach((item) => {
      const { category } = this._getItemProps(item);
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(item);
    });

    if (Object.keys(grouped).length === 0) {
      contentContainer.innerHTML = `<div class="no-results">${localize('default.no_offers', this._hass)}</div>`;
      return;
    }

    contentContainer.innerHTML = Object.entries(grouped)
      .map(([category, items]) => {
        const safeCategory = this._escapeHtml(category);
        const categoryHtml = `
          <div class="offers-list">
            ${items
            .map((item) => {
              const { name, image, price, oldPrice, subtitle } = this._getItemProps(item);
              const sanitizedImgUrl = this._sanitizeImageUrl(image);
              const displayPrice = formatPrice(price);
              const displayOldPrice = formatPrice(oldPrice);
              const safeName = this._escapeHtml(name);
              const safeImgUrl = this._escapeHtml(sanitizedImgUrl);
              const safeSubtitle = this._escapeHtml(subtitle);
              const safeDisplayPrice = this._escapeHtml(displayPrice);
              const safeDisplayOldPrice = this._escapeHtml(displayOldPrice);

              return `
                  <div class="offer-item">
                    ${this.config.show_images && sanitizedImgUrl
                  ? `<img
                          class="offer-image"
                          src="${safeImgUrl}"
                          alt="${safeName}"
                          loading="lazy"
                          referrerpolicy="no-referrer"
                          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                        />
                        <div class="offer-image-placeholder" style="display: none;">${safeName}</div>`
                  : this.config.show_images
                    ? `<div class="offer-image-placeholder">${safeName}</div>`
                    : ''
                }
                    <div class="offer-details">
                      <div class="offer-title">${safeName}</div>
                      ${subtitle ? `<div class="offer-subtitle">${safeSubtitle}</div>` : ''}
                    </div>

                    ${displayPrice
                  ? `
                          <div class="offer-price-container">
                            <span class="offer-price">${safeDisplayPrice}</span>
                            ${displayOldPrice ? `<span class="offer-old-price">${safeDisplayOldPrice}</span>` : ''}
                          </div>
                        `
                  : ''
                }

                    ${this.config.enable_todo
                  ? `
                          <button class="btn-add-todo" title="${localize('default.add_to_shopping_list', this._hass)}" data-item="${encodeURIComponent(name)}" data-price="${encodeURIComponent(displayPrice || '')}">
                            <svg style="width:18px;height:18px" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19,13H13V19H11V13H5V11H13V11H19V13Z" />
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
          const isOpen =
            this._filterQuery.length > 0
              ? true
              : this._categoryOpenState[category] ?? this.config.categories_open_by_default;
          return `
            <details class="category-group" data-category="${encodeURIComponent(category)}" ${isOpen ? 'open' : ''}>
              <summary>
                <span>${safeCategory}</span>
                <span class="badge-count">${items.length}</span>
              </summary>
              ${categoryHtml}
            </details>
          `;
        }
        return `
          <div class="category-group">
            <div class="category-title-static">${safeCategory} (${items.length})</div>
            ${categoryHtml}
          </div>
        `;
      })
      .join('');

    if (this.config.collapsible_categories) {
      contentContainer.querySelectorAll('.category-group').forEach((categoryGroup) => {
        categoryGroup.addEventListener('toggle', () => {
          if (this._filterQuery.length > 0) return;
          const category = decodeURIComponent(categoryGroup.dataset.category);
          this._categoryOpenState[category] = categoryGroup.open;
        });
      });
    }

    if (this.config.enable_todo) {
      contentContainer.querySelectorAll('.btn-add-todo').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const itemName = decodeURIComponent(btn.getAttribute('data-item'));
          const itemPrice = decodeURIComponent(btn.getAttribute('data-price') || '');
          this._addItemToTodo(e, itemName, itemPrice);
        });
      });
    }
  }

  getCardSize() {
    return 6;
  }
}

class DiscountsCardEditor extends HTMLElement {
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
    const newConfig = { ...ev.detail.value };

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

    this._form.computeLabel = (schema) => {
      return (
        localize(`config.${schema.name}`, this._hass) ||
        localize(`config.filter.${schema.name}`, this._hass) ||
        localize(`config.todo.${schema.name}`, this._hass) ||
        schema.name
      );
    };

    this._form.schema = [
      {
        name: 'entity',
        required: true,
        selector: {
          entity: { domain: ['sensor', 'binary_sensor'] }
        }
      },
      {
        name: 'title',
        selector: { text: {} }
      },
      {
        name: '',
        type: 'grid',
        schema: [
          { name: 'show_images', selector: { boolean: {} } },
          { name: 'enable_search', selector: { boolean: {} } },
          { name: 'collapsible_categories', selector: { boolean: {} } },
          { name: 'categories_open_by_default', selector: { boolean: {} } }
        ]
      },
      {
        name: 'filter',
        type: 'expandable',
        schema: [
          {
            name: 'filter_mode',
            selector: {
              select: {
                options: [
                  { value: 'none', label: localize('config.filter_modes.none', this._hass) },
                  { value: 'blacklist', label: localize('config.filter_modes.blacklist', this._hass) },
                  { value: 'whitelist', label: localize('config.filter_modes.whitelist', this._hass) }
                ],
                mode: 'dropdown'
              }
            }
          },
          {
            name: 'filter_categories',
            selector: {
              select: {
                multiple: true,
                options: this._getCategories()
              }
            }
          }
        ]
      },
      {
        name: 'todo',
        type: 'expandable',
        schema: [
          { name: 'todo_enabled', selector: { boolean: {} } },
          { name: 'todo_entity', selector: { entity: { domain: 'todo' } } },
          { name: 'todo_logo', selector: { boolean: {} } },
          { name: 'todo_price', selector: { boolean: {} } }
        ]
      }
    ];
  }

  _getCategories() {
    if (!this._hass || !this._config?.entity) return [];

    const entity = this._hass.states[this._config.entity];
    if (!entity?.attributes) return [];

    const offers =
      entity.attributes.discounts ||
      entity.attributes.offers ||
      entity.attributes.items ||
      entity.attributes.data ||
      entity.attributes.coupons ||
      [];

    const categories = [
      ...new Set(
        offers.map((item) => item.category || item.category_name || localize('default.other_offers', this._hass))
      )
    ].sort();

    return categories.map((cat) => ({ value: cat, label: cat }));
  }
}

if (!customElements.get('discounts-card-editor')) {
  customElements.define('discounts-card-editor', DiscountsCardEditor);
}
if (!customElements.get('discounts-card')) {
  customElements.define('discounts-card', DiscountsCard);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'discounts-card',
  name: 'Discounts Card',
  description:
    'A custom Lovelace card for browsing weekly supermarket discounts with search, image handling, and shopping list integration.'
});
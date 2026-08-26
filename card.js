var aldi$1 = {
	title: "Aldi Offers"
};
var edeka$1 = {
	title: "EDEKA Offers"
};
var lidl$1 = {
	title: "LIDL Offers"
};
var norma$1 = {
	title: "Norma Offers"
};
var rewe$1 = {
	title: "REWE Offers"
};
var config$1 = {
	entity: "Supermarket",
	title: "Card Title (optional)",
	show_images: "Show Product Images",
	enable_search: "Enable Search Functionality",
	collapsible_categories: "Collapsible Categories",
	categories_open_by_default: "Categories Open by Default",
	filter: "Filter Categories",
	filter_mode: "Filter Mode for Categories",
	filter_modes: {
		none: "Show All Categories",
		blacklist: "Hide Selected Categories",
		whitelist: "Show Only Selected Categories"
	},
	filter_categories: "Categories to Filter (Selection)",
	todo: "Shopping List",
	todo_enabled: "Enable Shopping List",
	todo_entity: "Shopping List Entity (optional)",
	todo_logo: "Append Supermarket Name to Shopping List",
	todo_price: "Append Price to Shopping List"
};
var en = {
	"default": {
	title: "Title",
	search: "Search offers",
	offer: "Offer",
	offers: "Offers",
	no_offers: "No current offers found",
	other_offers: "Other offers",
	add_to_shopping_list: "Add to shopping list"
},
	aldi: aldi$1,
	edeka: edeka$1,
	lidl: lidl$1,
	norma: norma$1,
	rewe: rewe$1,
	config: config$1
};

var aldi = {
	title: "Aldi Angebote"
};
var edeka = {
	title: "EDEKA Angebote"
};
var lidl = {
	title: "LIDL Angebote"
};
var norma = {
	title: "Norma Angebote"
};
var rewe = {
	title: "REWE Angebote"
};
var config = {
	entity: "Supermarkt",
	title: "Kartenüberschrift (optional)",
	show_images: "Produktbilder anzeigen",
	enable_search: "Suchfunktion aktivieren",
	collapsible_categories: "Kategorien einklappbar",
	categories_open_by_default: "Kategorien standardmäßig geöffnet",
	filter: "Kategorien filtern",
	filter_mode: "Filtermodus für Kategorien",
	filter_modes: {
		none: "Zeige alle Kategorien",
		blacklist: "Verberge ausgewählte Kategorien",
		whitelist: "Zeige nur ausgewählte Kategorien"
	},
	filter_categories: "Zu filternde Kategorien (Auswahl)",
	todo: "Einkaufsliste",
	todo_enabled: "Einkaufsliste aktivieren",
	todo_entity: "Einkaufsliste Entität (optional)",
	todo_logo: "Füge den Namen des Supermarkts in der Einkaufsliste an",
	todo_price: "Füge den Preis an die Einkaufsliste an"
};
var de = {
	"default": {
	title: "Angebote",
	search: "Angebote durchsuchen",
	offer: "Angebot",
	offers: "Angebote",
	no_offers: "Keine aktuellen Angebote gefunden",
	other_offers: "Weitere Angebote",
	add_to_shopping_list: "Zur Einkaufsliste hinzufügen"
},
	aldi: aldi,
	edeka: edeka,
	lidl: lidl,
	norma: norma,
	rewe: rewe,
	config: config
};

var cardStyles = ":host {\n  display: block;\n}\n\nha-card {\n  padding: 16px;\n  background: var(--ha-card-background, var(--card-background-color, #ffffff));\n  border-radius: var(--ha-card-border-radius, 12px);\n  box-shadow: var(--ha-card-box-shadow, none);\n  color: var(--primary-text-color, #212121);\n  font-family: var(--paper-font-body1_-_font-family, sans-serif);\n  box-sizing: border-box;\n}\n\n.card-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 1.25rem;\n  font-weight: 600;\n  margin-bottom: 12px;\n  color: var(--primary-text-color);\n}\n\n.search-container {\n  margin-bottom: 16px;\n}\n\n.search-input {\n  width: 100%;\n  padding: 9px 14px;\n  border-radius: 8px;\n  border: 1px solid var(--divider-color, #e0e0e0);\n  background: var(--secondary-background-color, #f4f4f4);\n  color: var(--primary-text-color);\n  box-sizing: border-box;\n  font-size: 0.95rem;\n  outline: none;\n  transition: border-color 0.2s ease;\n}\n\n.search-input:focus {\n  border-color: var(--primary-color, #cc071e);\n}\n\n.category-group {\n  margin-bottom: 14px;\n  width: 100%;\n  clear: both;\n}\n\n.category-group summary {\n  cursor: pointer;\n  user-select: none;\n  outline: none;\n  font-size: 1.05rem;\n  font-weight: 700;\n  padding: 6px 0;\n  border-bottom: 1px solid var(--divider-color, #e0e0e0);\n  margin-bottom: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  color: var(--primary-text-color);\n}\n\n.category-group:not([open]) summary {\n  border-bottom: none;\n  margin-bottom: 0;\n}\n\n.category-title-static {\n  font-size: 1.05rem;\n  font-weight: 700;\n  padding-bottom: 4px;\n  border-bottom: 1px solid var(--divider-color, #e0e0e0);\n  margin: 12px 0 8px 0;\n  color: var(--primary-text-color);\n}\n\n.badge-count {\n  font-size: 0.75rem;\n  background: var(--secondary-background-color, #e0e0e0);\n  color: var(--secondary-text-color, #666);\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-weight: 500;\n}\n\n.offers-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  width: 100%;\n  margin-top: 6px;\n}\n\n.offer-item {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 12px;\n  background: var(--secondary-background-color, #f8f9fa);\n  border-radius: 8px;\n  box-sizing: border-box;\n  width: 100%;\n  transition: background-color 0.15s ease;\n}\n\n.offer-item:hover {\n  background: var(--table-row-alternative-background-color, #efefef);\n}\n\n.offer-image {\n  width: 50px;\n  height: 50px;\n  object-fit: contain;\n  flex-shrink: 0;\n  background: #ffffff;\n  border-radius: 6px;\n  padding: 2px;\n}\n\n.offer-image-placeholder {\n  width: 50px;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  padding: 4px;\n  box-sizing: border-box;\n  background: var(--secondary-background-color, #f4f4f4);\n  border-radius: 6px;\n  color: var(--secondary-text-color, #757575);\n  font-size: 0.7rem;\n  font-weight: 600;\n  line-height: 1.1;\n  text-align: center;\n  word-break: break-word;\n}\n\n.offer-details {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  flex: 1;\n  min-width: 0;\n}\n\n.offer-title {\n  font-size: 0.95rem;\n  font-weight: 600;\n  line-height: 1.25;\n  word-break: break-word;\n  color: var(--primary-text-color);\n}\n\n.offer-subtitle {\n  font-size: 0.8rem;\n  color: var(--secondary-text-color, #757575);\n  margin-top: 3px;\n}\n\n.offer-price-container {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  flex-shrink: 0;\n  margin-left: auto;\n  text-align: right;\n}\n\n.offer-price {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: var(--primary-color, #cc071e);\n}\n\n.offer-old-price {\n  font-size: 0.8rem;\n  text-decoration: line-through;\n  color: var(--secondary-text-color, #9e9e9e);\n}\n\n.btn-add-todo {\n  background: transparent;\n  border: 1px solid var(--divider-color, #ccc);\n  color: var(--primary-text-color);\n  border-radius: 50%;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  flex-shrink: 0;\n  margin-left: 8px;\n  transition: all 0.2s ease;\n}\n\n.btn-add-todo:hover {\n  background: var(--primary-color, #cc071e);\n  border-color: var(--primary-color, #cc071e);\n  color: #ffffff;\n}\n\n.btn-add-todo.added {\n  background: #4caf50 !important;\n  border-color: #4caf50 !important;\n  color: #ffffff !important;\n  transform: scale(1.1);\n}\n\n.no-results {\n  padding: 16px 0;\n  text-align: center;\n  color: var(--secondary-text-color);\n  font-style: italic;\n}";

/**
 * Discounts Card for Home Assistant Lovelace
 * Repository: schblondie/discounts-card
 */


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

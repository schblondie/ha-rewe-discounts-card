/**
 * Discounts Card for Home Assistant Lovelace
 * Repository: schblondie/discounts-card
 */
import { DiscountsCardEditor } from './editor.js';
import {
  localize,
  detectStoreLabel,
  formatTodoItemName,
  escapeHtml,
  parseMultiplier,
  normalizeOffer,
  debounce,
  matchesFilterCategory
} from './utils.js';
import {
  fetchTodoCounts,
  updateTodoQuantity,
  clearStoreTodoItems
} from './todo.js';
import {
  renderTodoControlsHtml,
  renderCategoryGroups,
  renderSkeletonHtml,
  renderSvg,
  ICONS
} from './templates.js';

class DiscountsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._filterQuery = '';
    this._filterTodoOnly = false;
    this._categoryOpenState = {};
    this._hasSkeleton = false;
    this._menuOpen = false;
    this._selectedStoreIndices = new Set([0]);
    this._rawOffersCache = {};
    this._todoItemCounts = {};
    this._customStoreTodoItems = {};
    this._customInputVisibility = {};
    this._customInputValues = {};
    this._customInputSelections = {};
    this._focusedCustomInputStore = null;
    this._debouncedOffersUpdate = debounce(() => this._updateOffersList(), 120);
    this._onDocClick = (e) => {
      if (!this._menuOpen) return;
      const path = e.composedPath();
      const container = this.shadowRoot?.querySelector('.burger-menu-container');
      if (container && !path.includes(container)) {
        this._menuOpen = false;
        this._renderDropdownMenu();
      }
    };
  }

  connectedCallback() {
    document.addEventListener('click', this._onDocClick);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._onDocClick);
  }

  static async getConfigElement() {
    return document.createElement('discounts-card-editor');
  }

  static getStubConfig(hass, entities) {
    const supermarketEntities = entities?.filter(
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
    ) || [];
    const selectedEntities = supermarketEntities.slice(0, 3).map((ent) => ({
      entity: ent,
      title: '',
      default_selected: true,
      default_currency: '',
      subcategory_separator: '',
      category_groups: [],
      filter_mode: 'none',
      filter_categories: []
    }));
    return {
      title: '',
      entities: selectedEntities.length > 0 ? selectedEntities : [{ entity: '', title: '', default_selected: true, default_currency: '', subcategory_separator: '', category_groups: [], filter_mode: 'none', filter_categories: [] }],
      show_images: true,
      enable_search: true,
      collapsible_categories: true,
      categories_open_by_default: true,
      todo: {
        todo_enabled: false,
        todo_entity: '',
        todo_price: false,
        only_show_todo: false,
        category_layout: 'keep'
      }
    };
  }

  setConfig(config) {
    const showConfig = config.show || {};
    const todoConfig = config.todo || {};
    let normalizedEntities = [];
    if (Array.isArray(config.entities)) {
      normalizedEntities = config.entities.map((item) => {
        if (typeof item === 'string') {
          return {
            entity: item,
            title: '',
            default_currency: '',
            subcategory_separator: '',
            category_groups: [],
            default_selected: true,
            filter_mode: 'none',
            filter_categories: []
          };
        }
        return {
          entity: item.entity || '',
          title: item.title || '',
          default_currency: item.default_currency || '',
          subcategory_separator: item.subcategory_separator || '',
          category_groups: Array.isArray(item.category_groups) ? item.category_groups : [],
          default_selected: item.default_selected !== false,
          filter_mode: item.filter_mode || 'none',
          filter_categories: item.filter_categories || []
        };
      });
    } else if (config.entity) {
      normalizedEntities = [
        {
          entity: config.entity,
          title: config.title || '',
          default_currency: config.default_currency || '',
          subcategory_separator: config.subcategory_separator || '',
          category_groups: Array.isArray(config.category_groups) ? config.category_groups : [],
          default_selected: true,
          filter_mode: 'none',
          filter_categories: []
        }
      ];
    }

    const priceSetting =
      todoConfig.todo_price ??
      config.todo_price ??
      config.price ??
      showConfig.price ??
      false;

    this.config = {
      title: config.title || '',
      show_images: true,
      enable_search: true,
      collapsible_categories: true,
      categories_open_by_default: true,
      ...config,
      entities: normalizedEntities,
      todo: {
        todo_enabled: todoConfig.todo_enabled ?? config.enable_todo ?? config.todo_enabled ?? false,
        todo_entity: todoConfig.todo_entity ?? config.todo_entity ?? '',
        todo_price: priceSetting,
        only_show_todo: todoConfig.only_show_todo ?? config.only_show_todo ?? false,
        category_layout: todoConfig.category_layout ?? config.todo_category_layout ?? 'keep'
      }
    };

    const preselected = [];
    this.config.entities.forEach((s, idx) => {
      if (s.default_selected !== false) preselected.push(idx);
    });
    this._selectedStoreIndices = new Set(preselected.length > 0 ? preselected : [0]);

    if (this._filterTodoOnly === false && this.config.todo?.only_show_todo) {
      this._filterTodoOnly = true;
    }
    this._hasSkeleton = false;
    this._rawOffersCache = {};
    if (this._hass) this.render();
  }

  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;
    if (!this._hasSkeleton) {
      this.render();
      return;
    }
    if (!oldHass) {
      this._invalidateOffersCache();
      this._fetchTodoCounts().then(() => {
        this._updateHeaderTitle();
        this._updateOffersList();
      });
      return;
    }
    const todoEntity = this.config?.todo?.todo_entity;
    const storeEntities = (this.config?.entities || []).map((e) => e.entity);
    const offersChanged = storeEntities.some((id) => oldHass.states[id] !== hass.states[id]);
    const todoChanged = todoEntity ? oldHass.states[todoEntity] !== hass.states[todoEntity] : true;
    if (offersChanged) {
      this._invalidateOffersCache();
      this._fetchTodoCounts().then(() => {
        this._updateHeaderTitle();
        this._updateOffersList();
      });
    } else if (todoChanged && this.config?.todo?.todo_enabled) {
      this._fetchTodoCounts().then(() => {
        this._patchTodoElementsOnly();
      });
    }
  }

  _invalidateOffersCache() {
    this._rawOffersCache = {};
  }

  _getItemTodoCount(item, entityId) {
    if (!this.config.todo?.todo_enabled) return 0;
    const formattedName = formatTodoItemName(item._name, item._displayPrice, entityId || item._storeEntity, this.config, this._hass);
    const targetKey = parseMultiplier(formattedName).base.toLowerCase();
    return this._todoItemCounts[targetKey] || 0;
  }

  async _fetchTodoCounts() {
    const { counts, customStoreTodoItems } = await fetchTodoCounts(
      this._hass,
      this.config,
      (entityId) => this._getRawOffersForEntity(entityId)
    );
    this._todoItemCounts = counts;
    this._customStoreTodoItems = customStoreTodoItems;
  }

  async _updateTodoQuantity(itemName, itemPrice = '', mode = 'inc', customCount = null, entityId = '') {
    await updateTodoQuantity(this._hass, this.config, itemName, itemPrice, mode, customCount, entityId);
    await this._fetchTodoCounts();
    this._patchTodoElementsOnly();
  }

  async _clearStoreTodoItems(storeEntity) {
    const storeConf = this.config.entities.find((s) => s.entity === storeEntity) || { entity: storeEntity };
    const storeTitle = this._getStoreTitle(storeConf);
    let confirmMessage = localize('default.remove_all_from_shopping_list', this._hass);
    confirmMessage = confirmMessage.replace('{storeTitle}', `"${storeTitle}"`);
    if (!window.confirm(confirmMessage)) return;
    const storeOffers = this._getRawOffersForEntity(storeEntity);
    const customOffers = this._customStoreTodoItems?.[storeEntity] || [];
    await clearStoreTodoItems(this._hass, this.config, storeEntity, storeOffers, customOffers);
    await this._fetchTodoCounts();
    this._updateOffersList();
  }

  _patchTodoElementsOnly() {
    const root = this.shadowRoot;
    if (!root) return;
    this._updateHeaderAndCategoryBadges();
    root.querySelectorAll('.offer-item').forEach((el) => {
      const todoContainer = el.querySelector('.todo-btn-container');
      if (!todoContainer) return;
      const name = decodeURIComponent(todoContainer.dataset.item || '');
      const price = decodeURIComponent(todoContainer.dataset.price || '');
      const entityId = decodeURIComponent(todoContainer.dataset.entity || '');
      const count = this._getItemTodoCount({ _name: name, _displayPrice: price }, entityId);
      todoContainer.innerHTML = renderTodoControlsHtml(name, price, count, entityId, this._hass);
    });
    if (this._filterTodoOnly) {
      this._updateOffersList();
    }
  }

  _getStoreTitle(storeConf) {
    if (!storeConf) return localize('default.title', this._hass);
    if (storeConf.title && storeConf.title.trim() !== '') return storeConf.title;
    const entState = this._hass?.states[storeConf.entity];
    const storeLabel = detectStoreLabel(storeConf.entity, this._hass);
    return entState?.attributes?.friendly_name || (storeLabel ? `${storeLabel} ${localize('default.title', this._hass)}` : localize('default.title', this._hass));
  }

  async render() {
    if (!this._hass || !this.config) return;
    if (!this.config.entities || this.config.entities.length === 0) {
      this._hasSkeleton = false;
      this.shadowRoot.innerHTML = `
        <ha-card style="padding: 16px;">
          <div style="color: var(--secondary-text-color);">Please configure at least one entity.</div>
        </ha-card>
      `;
      return;
    }
    if (!this._hasSkeleton) {
      this._renderSkeleton();
      this._hasSkeleton = true;
    }
    await this._fetchTodoCounts();
    this._updateHeaderTitle();
    this._updateOffersList();
  }

  _renderSkeleton() {
    this.shadowRoot.innerHTML = renderSkeletonHtml(
      this.config,
      this._hass,
      this._filterQuery,
      this._filterTodoOnly
    );
    if (this.config.enable_search) {
      const searchInput = this.shadowRoot.querySelector('.search-input');
      const clearBtn = this.shadowRoot.querySelector('.btn-clear-search');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          this._filterQuery = (e.target.value || '').toLowerCase().trim();
          if (clearBtn) clearBtn.style.display = e.target.value ? 'flex' : 'none';
          this._debouncedOffersUpdate();
        });
      }
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          this._filterQuery = '';
          if (searchInput) searchInput.value = '';
          clearBtn.style.display = 'none';
          this._updateOffersList();
        });
      }
    }
    if (this.config.todo?.todo_enabled) {
      const filterBtn = this.shadowRoot.querySelector('.btn-filter-todo');
      if (filterBtn) {
        filterBtn.addEventListener('click', () => {
          this._filterTodoOnly = !this._filterTodoOnly;
          filterBtn.classList.toggle('active', this._filterTodoOnly);
          this._updateOffersList();
        });
      }
    }
    const burgerBtn = this.shadowRoot.querySelector('.btn-burger-menu');
    if (burgerBtn) {
      burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this._menuOpen = !this._menuOpen;
        this._renderDropdownMenu();
      });
    }
    const contentContainer = this.shadowRoot.querySelector('.card-content');
    if (contentContainer) {
      contentContainer.addEventListener(
        'error',
        (e) => {
          if (e.target?.classList?.contains('offer-image')) {
            e.target.style.display = 'none';
            if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex';
          }
        },
        true
      );
      contentContainer.addEventListener('focusin', (e) => {
        if (e.target?.classList?.contains('custom-item-input')) {
          const row = e.target.closest('.custom-input-row');
          this._focusedCustomInputStore = decodeURIComponent(row?.dataset.store || '');
        }
      });
      const handleCaret = (e) => {
        if (e.target?.classList?.contains('custom-item-input')) {
          const row = e.target.closest('.custom-input-row');
          const storeEntity = decodeURIComponent(row?.dataset.store || '');
          this._customInputValues[storeEntity] = e.target.value;
          this._customInputSelections[storeEntity] = {
            start: e.target.selectionStart,
            end: e.target.selectionEnd
          };
        }
      };
      contentContainer.addEventListener('input', handleCaret);
      contentContainer.addEventListener('keyup', handleCaret);
      contentContainer.addEventListener('click', handleCaret);
      contentContainer.addEventListener('select', handleCaret);
      contentContainer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target?.classList?.contains('custom-item-input')) {
          const row = e.target.closest('.custom-input-row');
          const btn = row?.querySelector('.btn-confirm-custom-todo');
          btn?.click();
        }
      });
      contentContainer.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.btn-add-todo');
        const decBtn = e.target.closest('.btn-dec-todo');
        const countBadge = e.target.closest('.todo-count-badge');
        const clearStoreBtn = e.target.closest('.btn-clear-store-todo');
        const addCustomBtn = e.target.closest('.btn-add-custom-todo');
        const confirmCustomBtn = e.target.closest('.btn-confirm-custom-todo');
        if (clearStoreBtn) {
          e.stopPropagation();
          const storeEntity = decodeURIComponent(clearStoreBtn.dataset.store || '');
          this._clearStoreTodoItems(storeEntity);
          return;
        }
        if (addCustomBtn) {
          e.stopPropagation();
          const storeEntity = decodeURIComponent(addCustomBtn.dataset.store || '');
          this._customInputVisibility[storeEntity] = !this._customInputVisibility[storeEntity];
          const inputRow = this.shadowRoot.querySelector(`.custom-input-row[data-store="${encodeURIComponent(storeEntity)}"]`);
          if (inputRow) {
            const isVisible = Boolean(this._customInputVisibility[storeEntity]);
            inputRow.style.display = isVisible ? 'flex' : 'none';
            if (isVisible) {
              const textInput = inputRow.querySelector('input');
              setTimeout(() => textInput?.focus(), 50);
            }
          }
          return;
        }
        if (confirmCustomBtn) {
          e.stopPropagation();
          const storeEntity = decodeURIComponent(confirmCustomBtn.dataset.store || '');
          const inputRow = this.shadowRoot.querySelector(`.custom-input-row[data-store="${encodeURIComponent(storeEntity)}"]`);
          const textInput = inputRow?.querySelector('input');
          const val = (textInput?.value || this._customInputValues[storeEntity] || '').trim();
          if (val) {
            if (textInput) textInput.value = '';
            this._customInputValues[storeEntity] = '';
            this._customInputSelections[storeEntity] = null;
            this._focusedCustomInputStore = storeEntity;
            this._updateTodoQuantity(val, '', 'inc', null, storeEntity);
          }
          return;
        }
        if (addBtn) {
          e.stopPropagation();
          const itemName = decodeURIComponent(addBtn.dataset.item);
          const itemPrice = decodeURIComponent(addBtn.dataset.price || '');
          const entityId = decodeURIComponent(addBtn.dataset.entity || '');
          addBtn.classList.add('added');
          setTimeout(() => addBtn.classList.remove('added'), 600);
          this._updateTodoQuantity(itemName, itemPrice, 'inc', null, entityId);
          return;
        }
        if (decBtn) {
          e.stopPropagation();
          const itemName = decodeURIComponent(decBtn.dataset.item);
          const itemPrice = decodeURIComponent(decBtn.dataset.price || '');
          const entityId = decodeURIComponent(decBtn.dataset.entity || '');
          this._updateTodoQuantity(itemName, itemPrice, 'dec', null, entityId);
          return;
        }
        if (countBadge) {
          e.stopPropagation();
          const itemName = decodeURIComponent(countBadge.dataset.item);
          const itemPrice = decodeURIComponent(countBadge.dataset.price || '');
          const entityId = decodeURIComponent(countBadge.dataset.entity || '');
          const currentCount = parseInt(countBadge.dataset.count, 10) || 1;
          let promptLabel = localize('default.quantity_prompt', this._hass);
          promptLabel = promptLabel.replace('{item}', itemName);
          const input = window.prompt(promptLabel, currentCount);
          if (input !== null) {
            const parsed = parseInt(input.trim(), 10);
            if (!isNaN(parsed)) {
              this._updateTodoQuantity(itemName, itemPrice, 'set', Math.max(0, parsed), entityId);
            }
          }
        }
      });
    }
  }

  _toggleStoreSelection(idx) {
    if (idx === 'all') {
      if (this._selectedStoreIndices.size === this.config.entities.length) {
        this._selectedStoreIndices.clear();
        this._selectedStoreIndices.add(0);
      } else {
        this._selectedStoreIndices = new Set(this.config.entities.map((_, i) => i));
      }
    } else {
      if (this._selectedStoreIndices.has(idx)) {
        if (this._selectedStoreIndices.size > 1) this._selectedStoreIndices.delete(idx);
      } else {
        this._selectedStoreIndices.add(idx);
      }
    }
    this._renderDropdownMenu();
    this._updateHeaderTitle();
    this._updateOffersList();
  }

  _renderDropdownMenu() {
    const dropdown = this.shadowRoot.querySelector('.dropdown-menu');
    if (!dropdown) return;
    dropdown.classList.toggle('open', this._menuOpen);
    if (!this._menuOpen) return;
    const allSelected = this._selectedStoreIndices.size === this.config.entities.length;
    dropdown.innerHTML = `
      <div class="dropdown-item ${allSelected ? 'active' : ''}" data-index="all">
        <span class="menu-icon ${allSelected ? 'check-icon' : 'menu-icon-spacer'}">
          ${allSelected ? renderSvg(ICONS.check) : ''}
        </span>
        <span class="menu-label" style="font-weight: 600;">${localize('default.all_stores', this._hass)}</span>
      </div>
      <div class="menu-divider"></div>
      ${this.config.entities
        .map((store, idx) => {
          const isSelected = this._selectedStoreIndices.has(idx);
          return `
            <div class="dropdown-item ${isSelected ? 'active' : ''}" data-index="${idx}">
              <span class="menu-icon ${isSelected ? 'check-icon' : 'menu-icon-spacer'}">
                ${isSelected ? renderSvg(ICONS.check) : ''}
              </span>
              <span class="menu-label">${escapeHtml(this._getStoreTitle(store))}</span>
            </div>
          `;
        })
        .join('')}
    `;
    dropdown.querySelectorAll('.dropdown-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const rawIdx = e.currentTarget.dataset.index;
        const idx = rawIdx === 'all' ? 'all' : parseInt(rawIdx, 10);
        this._toggleStoreSelection(idx);
      });
    });
  }

  _updateHeaderTitle() {
    const titleEl = this.shadowRoot.querySelector('.card-title');
    if (!titleEl) return;
    const totalStores = (this.config.entities || []).length;
    const selectedCount = this._selectedStoreIndices.size;
    if (this._filterQuery.length > 0) {
      titleEl.textContent = `${localize('default.search_results', this._hass)} (${selectedCount === totalStores ? localize('default.all_stores', this._hass) : selectedCount + ' ' + localize('default.stores', this._hass)})`;
      return;
    }
    if (this.config.title && this.config.title.trim() !== '') {
      titleEl.textContent = this.config.title;
      return;
    }
    if (totalStores === 1 || selectedCount === 1) {
      const singleIdx = Array.from(this._selectedStoreIndices)[0] || 0;
      titleEl.textContent = this._getStoreTitle(this.config.entities[singleIdx]);
    } else if (selectedCount === totalStores) {
      titleEl.textContent = localize('default.all_stores', this._hass);
    } else {
      titleEl.textContent = `${selectedCount} ${localize('default.stores', this._hass)}`;
    }
  }

  _getRawOffersForEntity(entityId) {
    if (this._rawOffersCache[entityId]) return this._rawOffersCache[entityId];
    const entity = this._hass?.states[entityId];
    if (!entity) return [];
    const storeConf = (this.config?.entities || []).find((s) => s.entity === entityId) || { entity: entityId };
    const offers =
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
    const normalized = offers.map((o) => normalizeOffer(o, entityId, this._hass, storeConf));
    this._rawOffersCache[entityId] = normalized;
    return normalized;
  }

  _updateOffersList() {
    const contentContainer = this.shadowRoot.querySelector('.card-content');
    if (!contentContainer) return;
    this._updateHeaderTitle();
    const isSearchMode = this._filterQuery.length > 0;
    let rawOffers = [];
    this.config.entities.forEach((s, idx) => {
      if (this._selectedStoreIndices.has(idx)) {
        const storeOffers = this._getRawOffersForEntity(s.entity);
        const customItems = this._customStoreTodoItems?.[s.entity] || [];
        rawOffers.push(...storeOffers, ...customItems);
      }
    });

    const filteredOffers = rawOffers.filter((item) => {
      if (!item) return false;
      const storeEntity = item._storeEntity || '';
      const storeConf = this.config.entities?.find((s) => s.entity === storeEntity);
      const filterMode = storeConf?.filter_mode || 'none';
      const filterCategories = storeConf?.filter_categories || [];

      const matchesFilter = filterCategories.some((entry) =>
        matchesFilterCategory(item._category, entry) ||
        (item.category && matchesFilterCategory(item.category, entry))
      );

      if (filterMode === 'blacklist' && matchesFilter) return false;
      if (filterMode === 'whitelist' && filterCategories.length > 0 && !matchesFilter) return false;

      if (this._filterTodoOnly && this._getItemTodoCount(item, storeEntity) <= 0) return false;
      if (!this._filterQuery) return true;
      return item._searchKey.includes(this._filterQuery);
    });

    this._updateHeaderAndCategoryBadges();
    if (filteredOffers.length === 0) {
      contentContainer.innerHTML = `<div class="no-results">${localize('default.no_offers', this._hass)}</div>`;
      return;
    }

    const storeGrouped = {};
    filteredOffers.forEach((item) => {
      const ent = item._storeEntity || '';
      if (!storeGrouped[ent]) storeGrouped[ent] = [];
      storeGrouped[ent].push(item);
    });

    contentContainer.innerHTML = Object.entries(storeGrouped)
      .map(([storeEntity, items]) => {
        const storeConf = this.config.entities.find((s) => s.entity === storeEntity) || { entity: storeEntity };
        const storeTitle = this._getStoreTitle(storeConf);
        const storeTodoCount = items.filter((item) => this._getItemTodoCount(item, storeEntity) > 0).length;
        const isCustomInputVisible = Boolean(this._customInputVisibility[storeEntity]);
        const customInputValue = this._customInputValues[storeEntity] || '';
        return `
        <div class="store-section" data-store="${encodeURIComponent(storeEntity)}">
          <div class="store-section-header">
            <span class="store-section-title">${escapeHtml(storeTitle)}</span>
            <div class="store-header-actions">
            ${this.config.todo?.todo_enabled && storeTodoCount > 0
            ? `
                  <button class="btn-store-action btn-clear-store-todo" title="${localize('default.clear_shopping_list', this._hass)}" data-store="${encodeURIComponent(storeEntity)}">
                    ${renderSvg(ICONS.trash)}
                  </button>
                `
            : ''
          }
            ${this.config.todo?.todo_enabled
            ? `
                  <button class="btn-store-action btn-add-custom-todo" title="${localize('default.add_custom_item', this._hass)}" data-store="${encodeURIComponent(storeEntity)}">
                    ${renderSvg(ICONS.plus)}
                  </button>
                `
            : ''
          }
              <span class="badge-count">
                ${items.length}${this.config.todo?.todo_enabled && storeTodoCount > 0 ? ` <span class="badge-todo-total">(${storeTodoCount}  )</span>` : ''}
              </span>
            </div>
          </div>
          <div class="custom-input-row" data-store="${encodeURIComponent(storeEntity)}" style="display: ${isCustomInputVisible ? 'flex' : 'none'};">
            <input type="text" placeholder="${localize('default.add_custom_item_placeholder', this._hass)}..." class="custom-item-input" value="${escapeHtml(customInputValue)}" />
            <button class="btn-confirm-custom-todo" data-store="${encodeURIComponent(storeEntity)}" title="${localize('default.add_custom_item', this._hass)}">
              ${renderSvg(ICONS.check)}
            </button>
          </div>
          ${renderCategoryGroups(
            items,
            storeEntity,
            this.config,
            this._hass,
            isSearchMode,
            this._filterTodoOnly,
            this._categoryOpenState,
            (it, ent) => this._getItemTodoCount(it, ent)
          )}
        </div>
      `;
      })
      .join('');

    if (this._focusedCustomInputStore && this._customInputVisibility[this._focusedCustomInputStore]) {
      const activeRow = contentContainer.querySelector(
        `.custom-input-row[data-store="${encodeURIComponent(this._focusedCustomInputStore)}"]`
      );
      const activeInput = activeRow?.querySelector('input');
      if (activeInput) {
        setTimeout(() => {
          activeInput.focus();
          const sel = this._customInputSelections[this._focusedCustomInputStore];
          if (sel && typeof sel.start === 'number' && typeof sel.end === 'number') {
            activeInput.setSelectionRange(sel.start, sel.end);
          } else {
            const len = activeInput.value.length;
            activeInput.setSelectionRange(len, len);
          }
        }, 0);
      }
    }

    if (this.config.collapsible_categories) {
      contentContainer.querySelectorAll('.category-group').forEach((categoryGroup) => {
        categoryGroup.addEventListener('toggle', () => {
          if (this._filterQuery.length > 0 || this._filterTodoOnly) return;
          const category = decodeURIComponent(categoryGroup.dataset.category);
          const store = decodeURIComponent(categoryGroup.dataset.store || '');
          this._categoryOpenState[`${store}_${category}`] = categoryGroup.open;
        });
      });
    }
  }

  _updateHeaderAndCategoryBadges() {
    this._updateHeaderTitle();
    let rawOffers = [];
    this.config.entities.forEach((s, idx) => {
      if (this._selectedStoreIndices.has(idx)) {
        rawOffers.push(...this._getRawOffersForEntity(s.entity));
        const customItems = this._customStoreTodoItems?.[s.entity] || [];
        rawOffers.push(...customItems);
      }
    });
    const totalTodoCount = rawOffers.filter((item) => this._getItemTodoCount(item, item._storeEntity) > 0).length;
    const headerBadge = this.shadowRoot.querySelector('.header-badge');
    if (headerBadge) {
      const offersLabel = localize('default.offers', this._hass);
      headerBadge.innerHTML = `
        ${rawOffers.length} ${offersLabel}${this.config.todo?.todo_enabled && totalTodoCount > 0 ? ` <span class="badge-todo-total">(${totalTodoCount} 🛒)</span>` : ''}
      `;
    }
    const storeSections = this.shadowRoot.querySelectorAll('.store-section');
    storeSections.forEach((section) => {
      const storeEntity = decodeURIComponent(section.dataset.store || '');
      const storeConf = this.config.entities.find((s) => s.entity === storeEntity) || { entity: storeEntity };
      const titleEl = section.querySelector('.store-section-title');
      if (titleEl) titleEl.textContent = this._getStoreTitle(storeConf);
      const storeOffers = this._getRawOffersForEntity(storeEntity);
      const customItems = this._customStoreTodoItems?.[storeEntity] || [];
      const allItems = [...storeOffers, ...customItems];
      const storeTodoCount = allItems.filter((item) => this._getItemTodoCount(item, storeEntity) > 0).length;
      const badgeEl = section.querySelector('.store-header-actions .badge-count');
      if (badgeEl) {
        badgeEl.innerHTML = `
          ${allItems.length}${this.config.todo?.todo_enabled && storeTodoCount > 0 ? ` <span class="badge-todo-total">(${storeTodoCount} 🛒)</span>` : ''}
        `;
      }
      const clearBtn = section.querySelector('.btn-clear-store-todo');
      if (clearBtn) {
        clearBtn.style.display = (this.config.todo?.todo_enabled && storeTodoCount > 0) ? '' : 'none';
      }
    });
    const categoryGroups = this.shadowRoot.querySelectorAll('.category-group');
    categoryGroups.forEach((group) => {
      const badge = group.querySelector('summary .badge-count, .category-title-static .badge-count');
      if (!badge) return;
      const totalItems = group.querySelectorAll('.offer-item').length;
      const activeTodoItems = group.querySelectorAll('.todo-count-badge').length;
      badge.innerHTML = `
        ${totalItems}${this.config.todo?.todo_enabled && activeTodoItems > 0 ? ` <span class="badge-todo-total">(${activeTodoItems} 🛒)</span>` : ''}
      `;
    });
  }

  getCardSize() {
    return 6;
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
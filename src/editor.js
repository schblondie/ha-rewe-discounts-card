import { localize } from './utils.js';

export class DiscountsCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...config };
    if (!Array.isArray(this._config.entities)) {
      this._config.entities = this._config.entity
        ? [{ entity: this._config.entity, title: '', default_selected: true, filter_mode: 'none', filter_categories: [] }]
        : [];
    }
    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  _valueChanged(ev) {
    if (!this._config || !this._hass) return;
    const newConfig = { ...this._config, ...ev.detail.value };

    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  _moveStore(fromIndex, toIndex) {
    const entities = [...(this._config.entities || [])];
    if (toIndex < 0 || toIndex >= entities.length) return;

    const openStates = this._storeCards?.map((c) => c.itemPanel?.expanded ?? false) || [];
    const [movedState] = openStates.splice(fromIndex, 1);
    openStates.splice(toIndex, 0, movedState);
    this._pendingOpenStates = openStates;

    const [moved] = entities.splice(fromIndex, 1);
    entities.splice(toIndex, 0, moved);
    this._storeCards = null;
    this._valueChanged({ detail: { value: { entities } } });
  }

  _addStore() {
    const entities = [
      ...(this._config.entities || []),
      { entity: '', title: '', default_selected: true, filter_mode: 'none', filter_categories: [] }
    ];
    this._valueChanged({ detail: { value: { entities } } });
  }

  _removeStore(index) {
    const entities = [...(this._config.entities || [])];
    entities.splice(index, 1);
    this._valueChanged({ detail: { value: { entities } } });
  }

  _handleDragStart(e, idx) {
    this._draggedIndex = idx;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(idx));
    e.currentTarget.style.opacity = '0.4';
  }

  _handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.style.borderTop = '2px solid var(--primary-color, #03a9f4)';
  }

  _handleDragLeave(e) {
    e.currentTarget.style.borderTop = '';
  }

  _handleDrop(e, toIdx) {
    e.preventDefault();
    e.currentTarget.style.borderTop = '';
    const fromIdx = this._draggedIndex;
    if (fromIdx !== null && fromIdx !== undefined && fromIdx !== toIdx) {
      this._moveStore(fromIdx, toIdx);
    }
    this._draggedIndex = null;
  }

  _handleDragEnd(e) {
    e.currentTarget.style.opacity = '1';
    e.currentTarget.style.borderTop = '';
    this._draggedIndex = null;
  }

  _getStoreHeader(store, idx) {
    if (store.title && store.title.trim()) return store.title;
    const entState = this._hass?.states[store.entity];
    return entState?.attributes?.friendly_name || `${localize('default.stores', this._hass)} ${idx + 1}`;
  }

  _getStoreCategories(entityId) {
    if (!this._hass || !entityId) return [];
    const entity = this._hass.states[entityId];
    const offers =
      entity?.attributes?.discounts ||
      entity?.attributes?.offers ||
      entity?.attributes?.items ||
      entity?.attributes?.products ||
      entity?.attributes?.articles ||
      entity?.attributes?.entries ||
      entity?.attributes?.data ||
      entity?.attributes?.coupons ||
      (Array.isArray(entity?.attributes) ? entity.attributes : []) ||
      [];

    const categories = new Set();
    offers.forEach((item) => {
      const cat = item.category || item.category_name || item.section;
      if (cat) categories.add(cat);
    });

    return [...categories].sort().map((cat) => ({ value: cat, label: cat }));
  }

  _renderStoresEditor() {
    const entities = this._config.entities || [];
    const mainWasExpanded = this._mainStorePanel ? this._mainStorePanel.expanded : true;

    if (!this._mainStorePanel || this._storeCards?.length !== entities.length) {
      this._storesContainer.innerHTML = '';

      this._mainStorePanel = document.createElement('ha-expansion-panel');
      this._mainStorePanel.setAttribute('outlined', '');
      this._mainStorePanel.header = `${localize('default.stores', this._hass)} (${entities.length})`;
      this._mainStorePanel.expanded = this._mainExpanded ?? mainWasExpanded;
      this._mainStorePanel.style.cssText = '--expansion-panel-content-padding: 8px 12px 12px;';
      this._mainStorePanel.addEventListener('expanded-changed', (e) => {
        this._mainExpanded = e.detail?.expanded ?? this._mainStorePanel.expanded;
      });

      this._listEl = document.createElement('div');
      this._listEl.style.cssText = 'display: flex; flex-direction: column; gap: 6px;';
      this._mainStorePanel.appendChild(this._listEl);

      this._storeCards = [];

      entities.forEach((s, idx) => {
        const itemPanel = document.createElement('ha-expansion-panel');
        itemPanel.setAttribute('outlined', '');
        itemPanel.setAttribute('draggable', 'true');
        itemPanel.expanded = this._pendingOpenStates?.[idx] ?? false;
        itemPanel.style.cssText = `
          --expansion-panel-summary-padding: 0 8px;
          --expansion-panel-content-padding: 0 12px 12px;
          margin: 0 !important;
          border-radius: 8px;
          transition: opacity 0.15s ease, border-top 0.15s ease;
        `;

        itemPanel.addEventListener('dragstart', (e) => {
          if (['INPUT', 'SELECT', 'HA-FORM', 'BUTTON'].includes(e.target.tagName)) {
            e.preventDefault();
            return;
          }
          const currentIdx = this._storeCards.findIndex((c) => c.itemPanel === itemPanel);
          this._handleDragStart(e, currentIdx);
        });
        itemPanel.addEventListener('dragover', (e) => this._handleDragOver(e));
        itemPanel.addEventListener('dragleave', (e) => this._handleDragLeave(e));
        itemPanel.addEventListener('drop', (e) => {
          const currentIdx = this._storeCards.findIndex((c) => c.itemPanel === itemPanel);
          this._handleDrop(e, currentIdx);
        });
        itemPanel.addEventListener('dragend', (e) => this._handleDragEnd(e));

        const headerEl = document.createElement('div');
        headerEl.slot = 'header';
        headerEl.style.cssText = 'display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 8px; min-height: 48px;';

        const headerLeft = document.createElement('div');
        headerLeft.style.cssText = 'display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;';

        const storeIcon = document.createElement('ha-svg-icon');
        storeIcon.path = 'M19,6H17V4A2,2 0 0,0 15,2H9A2,2 0 0,0 7,4V6H5A2,2 0 0,0 3,8V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V8A2,2 0 0,0 19,6M9,4H15V6H9V4M19,19H5V8H19V19Z';
        storeIcon.style.cssText = 'width: 20px; height: 20px; color: var(--secondary-text-color); flex-shrink: 0;';

        const titleText = document.createElement('div');
        titleText.style.cssText = 'font-weight: 500; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
        titleText.textContent = this._getStoreHeader(s, idx);

        headerLeft.appendChild(storeIcon);
        headerLeft.appendChild(titleText);

        const headerRight = document.createElement('div');
        headerRight.style.cssText = 'display: flex; align-items: center; gap: 2px; flex-shrink: 0;';

        const moveUpBtn = document.createElement('ha-icon-button');
        moveUpBtn.path = 'M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z';
        moveUpBtn.disabled = idx === 0;
        moveUpBtn.style.cssText = '--mdc-icon-button-size: 32px; --mdc-icon-size: 18px; color: var(--secondary-text-color);';
        moveUpBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this._moveStore(idx, idx - 1);
        });

        const moveDownBtn = document.createElement('ha-icon-button');
        moveDownBtn.path = 'M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z';
        moveDownBtn.disabled = idx === entities.length - 1;
        moveDownBtn.style.cssText = '--mdc-icon-button-size: 32px; --mdc-icon-size: 18px; color: var(--secondary-text-color);';
        moveDownBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this._moveStore(idx, idx + 1);
        });

        const delBtn = document.createElement('ha-icon-button');
        delBtn.path = 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z';
        delBtn.style.cssText = '--mdc-icon-button-size: 32px; --mdc-icon-size: 18px;';
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const currentIdx = this._storeCards.findIndex((c) => c.itemPanel === itemPanel);
          this._storeCards = null;
          this._removeStore(currentIdx);
        });

        headerRight.appendChild(moveUpBtn);
        headerRight.appendChild(moveDownBtn);
        headerRight.appendChild(delBtn);

        headerEl.appendChild(headerLeft);
        headerEl.appendChild(headerRight);
        itemPanel.appendChild(headerEl);

        const content = document.createElement('div');
        content.style.cssText = 'padding-top: 8px; display: flex; flex-direction: column; gap: 8px;';

        const storeForm = document.createElement('ha-form');
        storeForm.hass = this._hass;
        storeForm.schema = [
          {
            name: 'entity',
            required: true,
            selector: { entity: { domain: ['sensor', 'binary_sensor'] } }
          },
          {
            name: 'title',
            selector: { text: {} }
          },
          {
            name: 'default_selected',
            selector: { boolean: {} }
          },
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
                options: this._getStoreCategories(s.entity)
              }
            }
          }
        ];
        storeForm.computeLabel = (schema) => {
          if (schema.name === 'entity') return localize('config.entity', this._hass);
          if (schema.name === 'title') return localize('config.title', this._hass);
          if (schema.name === 'default_selected') return localize('config.default_selected', this._hass);
          if (schema.name === 'filter_mode') return localize('config.filter_mode', this._hass) || localize('config.filter.filter_mode', this._hass);
          if (schema.name === 'filter_categories') return localize('config.filter_categories', this._hass) || localize('config.filter.filter_categories', this._hass);
          return schema.name;
        };

        storeForm.addEventListener('value-changed', (ev) => {
          ev.stopPropagation();
          const currentIdx = this._storeCards.findIndex((c) => c.itemPanel === itemPanel);
          const updated = ev.detail.value;
          const currentEntities = [...(this._config.entities || [])];
          currentEntities[currentIdx] = {
            entity: updated.entity || '',
            title: updated.title || '',
            default_selected: updated.default_selected !== false,
            filter_mode: updated.filter_mode || 'none',
            filter_categories: updated.filter_categories || []
          };
          this._valueChanged({ detail: { value: { entities: currentEntities } } });
        });

        content.appendChild(storeForm);
        itemPanel.appendChild(content);

        this._listEl.appendChild(itemPanel);
        this._storeCards.push({ itemPanel, titleText, storeForm });
      });

      this._pendingOpenStates = null;

      const addBtn = document.createElement('ha-button');
      addBtn.setAttribute('outlined', '');
      addBtn.style.cssText = 'display: block; width: 100%; margin-top: 8px;';
      addBtn.innerHTML = `
        <ha-svg-icon slot="icon" path="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></ha-svg-icon>
        ${localize('default.add_store', this._hass)}
      `;
      addBtn.addEventListener('click', () => {
        this._storeCards = null;
        this._addStore();
      });
      this._mainStorePanel.appendChild(addBtn);

      this._storesContainer.appendChild(this._mainStorePanel);
    }

    if (this._mainStorePanel) {
      this._mainStorePanel.header = `${localize('default.stores', this._hass)} (${entities.length})`;
    }

    entities.forEach((s, idx) => {
      const item = this._storeCards[idx];
      if (item) {
        item.titleText.textContent = this._getStoreHeader(s, idx);
        item.storeForm.hass = this._hass;
        item.storeForm.data = {
          entity: s.entity || '',
          title: s.title || '',
          default_selected: s.default_selected !== false,
          filter_mode: s.filter_mode || 'none',
          filter_categories: s.filter_categories || []
        };
      }
    });
  }

  render() {
    if (!this._hass || !this._config) return;

    if (!this._initialized) {
      this.innerHTML = `
        <div class="editor-form-top"></div>
        <div class="editor-stores-container" style="margin: 16px 0;"></div>
        <div class="editor-form-bottom"></div>
      `;
      this._topFormContainer = this.querySelector('.editor-form-top');
      this._storesContainer = this.querySelector('.editor-stores-container');
      this._bottomFormContainer = this.querySelector('.editor-form-bottom');

      this._formTop = document.createElement('ha-form');
      this._formTop.addEventListener('value-changed', this._valueChanged.bind(this));
      this._topFormContainer.appendChild(this._formTop);

      this._formBottom = document.createElement('ha-form');
      this._formBottom.addEventListener('value-changed', this._valueChanged.bind(this));
      this._bottomFormContainer.appendChild(this._formBottom);

      this._initialized = true;
    }

    this._renderStoresEditor();

    const computeLabel = (schema) => {
      if (schema.name === 'title') return localize('config.title', this._hass);
      if (schema.name === 'stores') return localize('default.stores', this._hass);
      return (
        localize(`config.${schema.name}`, this._hass) ||
        localize(`config.todo.${schema.name}`, this._hass) ||
        schema.name
      );
    };

    this._formTop.hass = this._hass;
    this._formTop.data = this._config;
    this._formTop.computeLabel = computeLabel;
    this._formTop.schema = [
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
      }
    ];

    this._formBottom.hass = this._hass;
    this._formBottom.data = this._config;
    this._formBottom.computeLabel = computeLabel;
    this._formBottom.schema = [
      {
        name: 'todo',
        type: 'expandable',
        schema: [
          { name: 'todo_enabled', selector: { boolean: {} } },
          { name: 'todo_entity', selector: { entity: { domain: 'todo' } } },
          { name: 'todo_price', selector: { boolean: {} } },
          { name: 'only_show_todo', selector: { boolean: {} } },
          {
            name: 'category_layout',
            selector: {
              select: {
                options: [
                  { value: 'keep', label: localize('config.category_layout_keep', this._hass) },
                  { value: 'always_open', label: localize('config.category_layout_always_open', this._hass) },
                  { value: 'flat', label: localize('config.category_layout_flat', this._hass) }
                ],
                mode: 'dropdown'
              }
            }
          }
        ]
      }
    ];
  }
}
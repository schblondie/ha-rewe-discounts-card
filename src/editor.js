import { localize, resolveCategoryGroup, escapeHtml } from './utils.js';

function isElementFocused(container) {
  if (!container) return false;
  let el = document.activeElement;
  while (el) {
    if (el === container || (container.contains && container.contains(el))) {
      return true;
    }
    el = el.shadowRoot ? el.shadowRoot.activeElement : null;
  }
  return false;
}

export class DiscountsCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...config };
    if (!Array.isArray(this._config.entities)) {
      this._config.entities = this._config.entity
        ? [{ entity: this._config.entity, title: '', default_selected: true, default_currency: '', subcategory_separator: '', category_groups: [], filter_mode: 'none', filter_categories: [] }]
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
      {
        entity: '',
        title: '',
        default_selected: true,
        default_currency: '',
        subcategory_separator: '',
        category_groups: [],
        filter_mode: 'none',
        filter_categories: []
      }
    ];
    this._storeCards = null;
    this._valueChanged({ detail: { value: { entities } } });
  }

  _removeStore(index) {
    const entities = [...(this._config.entities || [])];
    entities.splice(index, 1);
    this._storeCards = null;
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

  _getStoreCategories(entityId, storeConf = null) {
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
    const separator = storeConf?.subcategory_separator;
    offers.forEach((item) => {
      const rawCat = item.category || item.category_name || item.section;
      let cat = rawCat;
      if (cat) {
        if (separator && typeof separator === 'string' && separator.trim() !== '' && cat.includes(separator)) {
          const parts = cat.split(separator);
          if (parts[0] && parts[0].trim()) cat = parts[0].trim();
        }
        if (storeConf?.category_groups?.length) {
          cat = resolveCategoryGroup(cat, storeConf.category_groups, rawCat);
        }
        categories.add(cat);
      }
    });

    const options = [...categories].sort().map((cat) => ({ value: cat, label: cat }));

    (storeConf?.filter_categories || []).forEach((cat) => {
      if ((cat.startsWith('Regex: ') || cat.startsWith('Includes: ')) && !options.some((o) => o.value === cat)) {
        options.unshift({ value: cat, label: cat });
      }
    });

    return options;
  }

  _getGroupMemberOptions(storeConf, group) {
    if (!this._hass || !storeConf.entity) return [];
    const ent = this._hass.states[storeConf.entity];
    const offers = ent?.attributes?.discounts || ent?.attributes?.offers || ent?.attributes?.items || ent?.attributes?.products || ent?.attributes?.articles || ent?.attributes?.entries || ent?.attributes?.data || ent?.attributes?.coupons || (Array.isArray(ent?.attributes) ? ent.attributes : []) || [];
    const set = new Set();
    offers.forEach((item) => {
      const raw = item.category || item.category_name || item.section;
      if (raw) {
        set.add(raw);
        if (storeConf.subcategory_separator && raw.includes(storeConf.subcategory_separator)) {
          const parts = raw.split(storeConf.subcategory_separator);
          if (parts[0]?.trim()) set.add(parts[0].trim());
          if (parts[1]?.trim()) set.add(parts[1].trim());
        }
      }
    });
    const options = [...set].sort().map((c) => ({ value: c, label: c }));
    (group.members || []).forEach((m) => {
      if ((m.startsWith('Regex: ') || m.startsWith('Includes: ')) && !options.some((o) => o.value === m)) {
        options.unshift({ value: m, label: m });
      }
    });
    return options;
  }

  _renderStoresEditor() {
    const entities = this._config.entities || [];
    const mainWasExpanded = this._mainStorePanel ? this._mainStorePanel.expanded : true;
    this._pendingGroupOpenStates = this._pendingGroupOpenStates || {};

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
          { name: 'entity', required: true, selector: { entity: { domain: ['sensor', 'binary_sensor'] } } },
          { name: 'title', selector: { text: {} } },
          { name: 'default_selected', selector: { boolean: {} } },
          { name: 'default_currency', selector: { text: {} } },
          { name: 'subcategory_separator', selector: { text: {} } },
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
                options: this._getStoreCategories(s.entity, s)
              }
            }
          }
        ];

        storeForm.computeLabel = (schema) => {
          if (schema.name === 'entity') return localize('config.entity', this._hass);
          if (schema.name === 'title') return localize('config.title', this._hass);
          if (schema.name === 'default_selected') return localize('config.default_selected', this._hass);
          if (schema.name === 'default_currency') return localize('config.default_currency', this._hass) || 'Default Currency';
          if (schema.name === 'subcategory_separator') return localize('config.subcategory_separator', this._hass) || 'Subcategory Separator';
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
            ...currentEntities[currentIdx],
            entity: updated.entity || '',
            title: updated.title || '',
            default_selected: updated.default_selected !== false,
            default_currency: updated.default_currency || '',
            subcategory_separator: updated.subcategory_separator || '',
            filter_mode: updated.filter_mode || 'none',
            filter_categories: updated.filter_categories || []
          };
          this._valueChanged({ detail: { value: { entities: currentEntities } } });
        });
        content.appendChild(storeForm);

        // Subcategory Filter Input
        const filterInputRow = document.createElement('div');
        filterInputRow.style.cssText = 'display: flex; gap: 8px; margin-top: 4px; align-items: center;';
        filterInputRow.innerHTML = `
          <input
            type="text"
            placeholder="${localize('config.add_filter_pattern', this._hass) || 'Add filter (e.g. Non-Food or ^Textil.*)'}"
            style="flex: 1; height: 40px; padding: 0 12px; background: var(--input-fill-color, var(--secondary-background-color, rgba(255, 255, 255, 0.05))); color: var(--primary-text-color); border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15)); border-radius: 4px; font-size: 14px; outline: none; box-sizing: border-box;"
          />
          <ha-button outlined style="flex-shrink: 0;">
            <ha-svg-icon slot="icon" path="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></ha-svg-icon>
            ${localize('default.add', this._hass) || 'Add'}
          </ha-button>
        `;
        const filterInput = filterInputRow.querySelector('input');
        const filterBtn = filterInputRow.querySelector('ha-button');

        const addPattern = () => {
          const val = (filterInput.value || '').trim();
          if (!val) return;
          const isRegex = /^\/.*\/[a-z]*$/i.test(val) || /[\\^$.*+?()[\]{}|]/.test(val);
          const entry = isRegex ? `Regex: ${val}` : `Includes: ${val}`;
          filterInput.value = '';

          const currentIdx = this._storeCards.findIndex((c) => c.itemPanel === itemPanel);
          const currentEntities = [...(this._config.entities || [])];
          const prevCategories = currentEntities[currentIdx]?.filter_categories || [];

          if (!prevCategories.includes(entry)) {
            currentEntities[currentIdx] = {
              ...currentEntities[currentIdx],
              filter_categories: [...prevCategories, entry]
            };
            this._valueChanged({ detail: { value: { entities: currentEntities } } });
          }
        };

        filterInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            addPattern();
          }
        });
        filterBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          addPattern();
        });
        content.appendChild(filterInputRow);

        // Group container
        const groupsContainer = document.createElement('div');
        groupsContainer.style.cssText = 'margin-top: 12px; display: flex; flex-direction: column; gap: 8px;';

        const groupsList = document.createElement('div');
        groupsList.style.cssText = 'display: flex; flex-direction: column; gap: 6px;';
        groupsContainer.appendChild(groupsList);

        const addGroupBtn = document.createElement('ha-button');
        addGroupBtn.setAttribute('outlined', '');
        addGroupBtn.style.cssText = 'width: 100%;';
        addGroupBtn.innerHTML = `
          <ha-svg-icon slot="icon" path="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></ha-svg-icon>
          ${localize('config.add_group', this._hass) || 'Add Group'}
        `;
        addGroupBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const currentIdx = this._storeCards.findIndex((c) => c.itemPanel === itemPanel);
          if (currentIdx === -1) return;
          const currentEntities = [...(this._config.entities || [])];
          const store = currentEntities[currentIdx] || {};
          const updatedGroups = [...(store.category_groups || [])];
          const newGIdx = updatedGroups.length;
          updatedGroups.push({ name: '', members: [] });
          currentEntities[currentIdx] = { ...store, category_groups: updatedGroups };
          this._pendingGroupOpenStates[`${currentIdx}_${newGIdx}`] = true;
          this._valueChanged({ detail: { value: { entities: currentEntities } } });
        });
        groupsContainer.appendChild(addGroupBtn);
        content.appendChild(groupsContainer);

        const renderGroups = (storeConf) => {
          const currentIdx = this._storeCards.findIndex((c) => c.itemPanel === itemPanel);
          const groups = storeConf.category_groups || [];
          groupsList._groupCards = groupsList._groupCards || [];

          if (groupsList._groupCards.length !== groups.length) {
            const existingPanels = groupsList.querySelectorAll('.group-panel');
            existingPanels.forEach((p, gIdx) => {
              this._pendingGroupOpenStates[`${currentIdx}_${gIdx}`] = p.expanded;
            });

            groupsList.innerHTML = '';
            groupsList._groupCards = [];

            groups.forEach((group, gIdx) => {
              const gPanel = document.createElement('ha-expansion-panel');
              gPanel.className = 'group-panel';
              gPanel.setAttribute('outlined', '');
              gPanel.style.cssText = '--expansion-panel-summary-padding: 0 8px; --expansion-panel-content-padding: 8px 12px 12px; margin: 0 !important; border-radius: 6px;';
              gPanel.expanded = this._pendingGroupOpenStates[`${currentIdx}_${gIdx}`] ?? false;
              gPanel.addEventListener('expanded-changed', (e) => {
                this._pendingGroupOpenStates[`${currentIdx}_${gIdx}`] = e.detail?.expanded ?? gPanel.expanded;
              });

              const gHeader = document.createElement('div');
              gHeader.slot = 'header';
              gHeader.style.cssText = 'display: flex; align-items: center; justify-content: space-between; width: 100%; min-height: 40px;';
              const titleSpan = document.createElement('span');
              titleSpan.style.cssText = 'font-weight: 500; font-size: 13px;';
              titleSpan.textContent = `${group.name || `Group ${gIdx + 1}`} (${(group.members || []).length})`;
              const delBtn = document.createElement('ha-icon-button');
              delBtn.path = 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z';
              delBtn.style.cssText = '--mdc-icon-button-size: 28px; --mdc-icon-size: 16px;';
              delBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const nowIdx = this._storeCards.findIndex((c) => c.itemPanel === itemPanel);
                const currentEntities = [...(this._config.entities || [])];
                const updatedGroups = [...(currentEntities[nowIdx]?.category_groups || [])];
                updatedGroups.splice(gIdx, 1);
                currentEntities[nowIdx] = { ...currentEntities[nowIdx], category_groups: updatedGroups };
                this._valueChanged({ detail: { value: { entities: currentEntities } } });
              });
              gHeader.appendChild(titleSpan);
              gHeader.appendChild(delBtn);
              gPanel.appendChild(gHeader);

              const gContent = document.createElement('div');
              gContent.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

              const memberOptions = this._getGroupMemberOptions(storeConf, group);

              const gForm = document.createElement('ha-form');
              gForm.hass = this._hass;
              gForm.data = { name: group.name || '', members: group.members || [] };
              gForm.schema = [
                { name: 'name', selector: { text: {} } },
                { name: 'members', selector: { select: { multiple: true, options: memberOptions } } }
              ];
              gForm.computeLabel = (sch) => (sch.name === 'name' ? `${localize('config.group_name', this._hass) || 'Group Name'}` : `${localize('config.group_members', this._hass) || 'Group Members'}`);
              gForm.addEventListener('value-changed', (ev) => {
                ev.stopPropagation();
                const val = ev.detail.value;
                const nowIdx = this._storeCards.findIndex((c) => c.itemPanel === itemPanel);
                const currentEntities = [...(this._config.entities || [])];
                const updatedGroups = [...(currentEntities[nowIdx]?.category_groups || [])];
                updatedGroups[gIdx] = { name: val.name || '', members: val.members || [] };
                currentEntities[nowIdx] = { ...currentEntities[nowIdx], category_groups: updatedGroups };
                this._valueChanged({ detail: { value: { entities: currentEntities } } });
              });
              gContent.appendChild(gForm);

              const memberInputRow = document.createElement('div');
              memberInputRow.style.cssText = 'display: flex; gap: 6px; align-items: center;';
              memberInputRow.innerHTML = `
                <input
                  type="text"
                  placeholder="${localize('config.add_group_member', this._hass) || 'Add group member (e.g. Non-Food or ^Textil.*)'}"
                  style="flex: 1; height: 36px; padding: 0 10px; background: var(--input-fill-color, var(--secondary-background-color, rgba(255, 255, 255, 0.05))); color: var(--primary-text-color); border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15)); border-radius: 4px; font-size: 13px; outline: none; box-sizing: border-box;"
                />
                <ha-button outlined style="flex-shrink: 0; --mdc-button-horizontal-padding: 8px;">${localize('default.add', this._hass) || 'Add'}</ha-button>
              `;

              const mInput = memberInputRow.querySelector('input');
              const mBtn = memberInputRow.querySelector('ha-button');
              const addMember = () => {
                const val = (mInput.value || '').trim();
                if (!val) return;
                const isRegex = /^\/.*\/[a-z]*$/i.test(val) || /[\\^$.*+?()[\]{}|]/.test(val);
                const entry = isRegex ? `Regex: ${val}` : `Includes: ${val}`;
                mInput.value = '';

                const nowIdx = this._storeCards.findIndex((c) => c.itemPanel === itemPanel);
                const currentEntities = [...(this._config.entities || [])];
                const updatedGroups = [...(currentEntities[nowIdx]?.category_groups || [])];
                const prevMembers = updatedGroups[gIdx]?.members || [];

                if (!prevMembers.includes(entry)) {
                  updatedGroups[gIdx] = { ...updatedGroups[gIdx], members: [...prevMembers, entry] };
                  currentEntities[nowIdx] = { ...currentEntities[nowIdx], category_groups: updatedGroups };
                  this._pendingGroupOpenStates[`${nowIdx}_${gIdx}`] = true;
                  this._valueChanged({ detail: { value: { entities: currentEntities } } });
                }
              };

              mInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  e.stopPropagation();
                  addMember();
                }
              });
              mBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                addMember();
              });

              gContent.appendChild(memberInputRow);
              gPanel.appendChild(gContent);
              groupsList.appendChild(gPanel);

              groupsList._groupCards.push({ gPanel, titleSpan, gForm, memberOptions });
            });
          } else {
            groups.forEach((group, gIdx) => {
              const gCard = groupsList._groupCards[gIdx];
              if (!gCard) return;
              gCard.titleSpan.textContent = `${group.name || `Group ${gIdx + 1}`} (${(group.members || []).length})`;
              gCard.gForm.hass = this._hass;

              const newMemberOptions = this._getGroupMemberOptions(storeConf, group);
              if (JSON.stringify(gCard.memberOptions) !== JSON.stringify(newMemberOptions)) {
                gCard.memberOptions = newMemberOptions;
                gCard.gForm.schema = [
                  { name: 'name', selector: { text: {} } },
                  { name: 'members', selector: { select: { multiple: true, options: newMemberOptions } } }
                ];
              }

              if (!isElementFocused(gCard.gForm)) {
                const currentData = { name: group.name || '', members: group.members || [] };
                if (JSON.stringify(gCard.gForm.data) !== JSON.stringify(currentData)) {
                  gCard.gForm.data = currentData;
                }
              }
            });
          }
        };

        itemPanel.appendChild(content);
        this._listEl.appendChild(itemPanel);
        this._storeCards.push({ itemPanel, titleText, storeForm, renderGroups });
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

        const catFieldIdx = item.storeForm.schema.findIndex((sch) => sch.name === 'filter_categories');
        if (catFieldIdx !== -1) {
          const oldOptions = item.storeForm.schema[catFieldIdx]?.selector?.select?.options;
          const newOptions = this._getStoreCategories(s.entity, s);
          if (JSON.stringify(oldOptions) !== JSON.stringify(newOptions)) {
            const schema = [...item.storeForm.schema];
            schema[catFieldIdx] = {
              ...schema[catFieldIdx],
              selector: {
                select: {
                  multiple: true,
                  options: newOptions
                }
              }
            };
            item.storeForm.schema = schema;
          }
        }

        if (!isElementFocused(item.storeForm)) {
          const formData = {
            entity: s.entity || '',
            title: s.title || '',
            default_selected: s.default_selected !== false,
            default_currency: s.default_currency || '',
            subcategory_separator: s.subcategory_separator || '',
            filter_mode: s.filter_mode || 'none',
            filter_categories: s.filter_categories || []
          };
          if (JSON.stringify(item.storeForm.data) !== JSON.stringify(formData)) {
            item.storeForm.data = formData;
          }
        }

        item.renderGroups(s);
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
    if (!isElementFocused(this._formTop)) {
      this._formTop.data = this._config;
    }
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
    if (!isElementFocused(this._formBottom)) {
      this._formBottom.data = this._config;
    }
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
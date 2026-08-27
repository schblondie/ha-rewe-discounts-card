import cardStyles from '../styles/card.css';
import { localize, detectStoreLabel, escapeHtml, sanitizeImageUrl, brokenImageUrls } from './utils.js';

export const ICONS = {
  plus: 'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z',
  minus: 'M19,13H5V11H19V13Z',
  trash: 'M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z',
  check: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z',
  burger: 'M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z',
  search: 'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z',
  close: 'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z',
  cart: 'M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z',
  placeholder: 'M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V18H18V20H20V14M20,4H4V6H20V4Z'
};

export function renderSvg(path) {
  return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="${path}"/></svg>`;
}

export function renderTodoControlsHtml(name, price, count, entityId = '', hass = null) {
  const safeItem = encodeURIComponent(name);
  const safePrice = encodeURIComponent(price || '');
  const safeEntity = encodeURIComponent(entityId || '');

  if (count <= 0) {
    return `
      <button class="btn-todo-action btn-add-todo" title="${localize('default.add_to_shopping_list', hass)}" data-item="${safeItem}" data-price="${safePrice}" data-entity="${safeEntity}">
        ${renderSvg(ICONS.plus)}
      </button>
    `;
  }

  const decTitle = count === 1 ? localize('default.remove', hass) : localize('default.decrease', hass);

  return `
    <button class="btn-todo-action btn-dec-todo" title="${decTitle}" data-item="${safeItem}" data-price="${safePrice}" data-entity="${safeEntity}">
      ${renderSvg(count === 1 ? ICONS.trash : ICONS.minus)}
    </button>
    <button class="todo-count-badge" title="${localize('default.set_quantity', hass)}" data-item="${safeItem}" data-price="${safePrice}" data-count="${count}" data-entity="${safeEntity}">
      ${count}x
    </button>
    <button class="btn-todo-action btn-add-todo" title="${localize('default.add_to_shopping_list', hass)}" data-item="${safeItem}" data-price="${safePrice}" data-entity="${safeEntity}">
      ${renderSvg(ICONS.plus)}
    </button>
  `;
}

export function renderOfferItemHtml(item, config, hass, filterQuery, getItemTodoCount) {
  const sanitizedImgUrl = sanitizeImageUrl(item._image);
  const safeName = escapeHtml(item._name);
  const safeImgUrl = escapeHtml(sanitizedImgUrl);
  const safeSubtitle = escapeHtml(item._subtitle);
  const safeDisplayPrice = escapeHtml(item._displayPrice);
  const safeDisplayOldPrice = escapeHtml(item._displayOldPrice);
  const storeEntity = item._storeEntity || config.entities[0]?.entity;
  const storeLabel = detectStoreLabel(storeEntity, hass);
  const existingCount = getItemTodoCount(item, storeEntity);
  const isBroken = !sanitizedImgUrl || brokenImageUrls.has(sanitizedImgUrl);

  return `
    <div class="offer-item">
      ${config.show_images && !isBroken
      ? `
            <img
              class="offer-image"
              src="${safeImgUrl}"
              data-src="${safeImgUrl}"
              alt="${safeName}"
              loading="lazy"
              referrerpolicy="no-referrer"
              onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';"
            />
            <div class="offer-image-placeholder" style="display: none;">${renderSvg(ICONS.placeholder)}</div>
          `
      : config.show_images
        ? `<div class="offer-image-placeholder">${renderSvg(ICONS.placeholder)}</div>`
        : ''
    }

      <div class="offer-details">
        <div class="offer-title">
          ${safeName}
          ${filterQuery.length > 0 && storeLabel ? `<span class="store-tag">${storeLabel}</span>` : ''}
        </div>
        ${item._subtitle ? `<div class="offer-subtitle">${safeSubtitle}</div>` : ''}
      </div>

      ${item._displayPrice
      ? `
            <div class="offer-price-container">
              <span class="offer-price">${safeDisplayPrice}</span>
              ${item._displayOldPrice ? `<span class="offer-old-price">${safeDisplayOldPrice}</span>` : ''}
            </div>
          `
      : ''
    }

      ${config.todo?.todo_enabled
      ? `
            <div class="todo-btn-container" data-item="${encodeURIComponent(item._name)}" data-price="${encodeURIComponent(item._displayPrice || '')}" data-entity="${encodeURIComponent(storeEntity || '')}">
              ${renderTodoControlsHtml(item._name, item._displayPrice, existingCount, storeEntity, hass)}
            </div>
          `
      : ''
    }
    </div>
  `;
}

export function renderCategoryGroups(items, storeEntity, config, hass, isSearchMode, filterTodoOnly, categoryOpenState, getItemTodoCount) {
  const todoCategoryLayout = config.todo?.category_layout || 'keep';

  if (filterTodoOnly && todoCategoryLayout === 'flat') {
    return `
      <div class="offers-list flat-list">
        ${items.map((item) => renderOfferItemHtml(item, config, hass, isSearchMode ? 'active' : '', getItemTodoCount)).join('')}
      </div>
    `;
  }

  const grouped = {};
  items.forEach((item) => {
    const cat = item._category;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  });

  return Object.entries(grouped)
    .map(([category, catItems]) => {
      const safeCategory = escapeHtml(category);
      const catTodoCount = catItems.filter((item) => getItemTodoCount(item, storeEntity) > 0).length;
      const categoryHtml = `
        <div class="offers-list">
          ${catItems.map((item) => renderOfferItemHtml(item, config, hass, isSearchMode ? 'active' : '', getItemTodoCount)).join('')}
        </div>
      `;

      const forceOpen = (filterTodoOnly && todoCategoryLayout === 'always_open') || isSearchMode;

      if (config.collapsible_categories) {
        const isOpen = forceOpen || (categoryOpenState[`${storeEntity}_${category}`] ?? config.categories_open_by_default);
        return `
          <details class="category-group" data-category="${encodeURIComponent(category)}" data-store="${encodeURIComponent(storeEntity)}" ${isOpen ? 'open' : ''}>
            <summary>
              <span>${safeCategory}</span>
              <span class="badge-count">
                ${catItems.length}${config.todo?.todo_enabled && catTodoCount > 0 ? ` <span class="badge-todo-total">(${catTodoCount} 🛒)</span>` : ''}
              </span>
            </summary>
            ${categoryHtml}
          </details>
        `;
      }

      return `
        <div class="category-group">
          <div class="category-title-static">
            <span>${safeCategory}</span>
            <span class="badge-count">
              ${catItems.length}${config.todo?.todo_enabled && catTodoCount > 0 ? ` <span class="badge-todo-total">(${catTodoCount} 🛒)</span>` : ''}
            </span>
          </div>
          ${categoryHtml}
        </div>
      `;
    })
    .join('');
}

export function renderSkeletonHtml(config, hass, filterQuery, filterTodoOnly) {
  const hasMultipleStores = (config.entities || []).length > 1;

  return `
    <style>
      ${cardStyles}
      .search-wrapper { position: relative; display: flex; align-items: center; width: 100%; }
      .btn-clear-search {
        position: absolute; right: 8px; background: transparent; border: none; cursor: pointer;
        padding: 4px; display: none; align-items: center; justify-content: center; color: var(--secondary-text-color);
      }
      .btn-clear-search svg { width: 18px; height: 18px; }
    </style>

    <ha-card>
      <div class="card-header">
        <div class="header-left">
          ${hasMultipleStores
      ? `
                <div class="burger-menu-container">
                  <button class="btn-burger-menu" title="${escapeHtml(localize('default.select_store', hass))}" aria-label="${escapeHtml(localize('default.select_store', hass))}">
                    ${renderSvg(ICONS.burger)}
                  </button>
                  <div class="dropdown-menu"></div>
                </div>
              `
      : ''
    }
          <span class="card-title"></span>
        </div>
        <div class="header-badge-container">
          <span class="badge-count header-badge">0 ${localize('default.offers', hass)}</span>
        </div>
      </div>

      ${config.enable_search || config.todo?.todo_enabled
      ? `
            <div class="search-container">
              ${config.enable_search
        ? `
                    <div class="search-wrapper">
                      <span class="search-icon">${renderSvg(ICONS.search)}</span>
                      <input
                        type="text"
                        class="search-input"
                        placeholder="${escapeHtml(localize('default.search', hass))}"
                        value="${escapeHtml(filterQuery)}"
                      />
                      <button class="btn-clear-search" style="${filterQuery ? 'display: flex;' : 'display: none;'}" title="${escapeHtml(localize('default.clear_search', hass))}">
                        ${renderSvg(ICONS.close)}
                      </button>
                    </div>
                  `
        : '<div style="flex:1;"></div>'
      }
              ${config.todo?.todo_enabled
        ? `
                    <button class="btn-filter-todo ${filterTodoOnly ? 'active' : ''}" title="${escapeHtml(localize('default.change_to_todo', hass))}" aria-label="${escapeHtml(localize('default.filter_todo', hass))}">
                      ${renderSvg(ICONS.cart)}
                    </button>
                  `
        : ''
      }
            </div>
          `
      : ''
    }

      <div class="card-content"></div>
    </ha-card>
  `;
}
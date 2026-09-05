import en from '../translations/en.json';
import de from '../translations/de.json';

export const languages = { en, de };
export const brokenImageUrls = new Set();

export function localize(key, hass) {
  const lang = hass?.locale?.language || hass?.language || 'en';
  const keys = key.split('.');
  const getNested = (obj) => keys.reduce((o, k) => (o && o[k] !== undefined ? o[k] : null), obj);
  return getNested(languages[lang]) ?? getNested(languages.en) ?? key;
}

export function formatPrice(val, defaultCurrency = '') {
  if (val === null || val === undefined || val === '') return '';
  const str = String(val).trim();
  const currency = typeof defaultCurrency === 'string' ? defaultCurrency.trim() : '';
  if (!currency) return str;

  const hasUnit = /[^\d.,\s]/.test(str);
  return hasUnit ? str : `${str} ${currency}`.trim();
}

export function parseMultiplier(str) {
  if (!str) return { count: 1, base: '' };
  const match = String(str).match(/^(\d+)x\s*(.+)$/i);
  return match
    ? { count: parseInt(match[1], 10), base: match[2].trim() }
    : { count: 1, base: String(str).trim() };
}

export function matchesFilterCategory(category, filterEntry) {
  if (!category || !filterEntry) return false;
  const cat = String(category).trim();

  if (filterEntry.startsWith('Regex: ')) {
    const pattern = filterEntry.slice(7).trim();
    const literal = pattern.match(/^\/(.+)\/([a-z]*)$/i);
    try {
      const reg = literal ? new RegExp(literal[1], literal[2] || 'i') : new RegExp(pattern, 'i');
      return reg.test(cat);
    } catch {
      return false;
    }
  }

  if (filterEntry.startsWith('Includes: ')) {
    const term = filterEntry.slice(10).trim().toLowerCase();
    return cat.toLowerCase().includes(term);
  }

  return cat.toLowerCase() === String(filterEntry).trim().toLowerCase();
}

export function resolveCategoryGroup(category, categoryGroups = [], rawCategory = '') {
  if (!category || !Array.isArray(categoryGroups)) return category;
  for (const group of categoryGroups) {
    if (!group.name || !Array.isArray(group.members)) continue;
    const matches = group.members.some((member) =>
      matchesFilterCategory(category, member) ||
      (rawCategory && matchesFilterCategory(rawCategory, member))
    );
    if (matches) return group.name.trim();
  }
  return category;
}

export function detectStoreLabel(entityId = '', hass = null) {
  const ent = (entityId || '').toLowerCase();
  const friendlyName = (hass?.states?.[entityId]?.attributes?.friendly_name || '').toLowerCase();
  const source = `${ent} ${friendlyName}`;
  if (source.includes('aldi')) return 'ALDI';
  if (source.includes('edeka')) return 'EDEKA';
  if (source.includes('lidl')) return 'LIDL';
  if (source.includes('norma')) return 'NORMA';
  if (source.includes('rewe')) return 'REWE';
  return '';
}

export function formatTodoItemName(itemName, itemPrice, entityId = '', config = {}, hass = null) {
  const storeLabel = detectStoreLabel(entityId, hass);
  const suffix = storeLabel ? ` (${storeLabel})` : '';
  const baseName = `${itemName}${suffix}`;
  return !config.todo?.todo_price || !itemPrice ? baseName : `${baseName} - ${itemPrice}`;
}

export function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sanitizeImageUrl(url) {
  if (typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  try {
    const parsed = new URL(trimmed, window.location.origin);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? parsed.href : '';
  } catch {
    return '';
  }
}

export function normalizeOffer(item, storeEntity, hass = null, storeConf = null) {
  const name =
    item.product ||
    item.title ||
    item.name ||
    item.brand ||
    item.article ||
    localize('default.offer', hass);
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

  const rawCategory =
    item.category ||
    item.category_name ||
    item.section ||
    localize('default.other_offers', hass);

  let category = rawCategory;
  const sep = storeConf?.subcategory_separator;
  if (typeof sep === 'string' && sep.trim() !== '' && typeof category === 'string' && category.includes(sep)) {
    const parts = category.split(sep);
    if (parts[0] && parts[0].trim()) {
      category = parts[0].trim();
    }
  }

  if (storeConf?.category_groups?.length) {
    category = resolveCategoryGroup(category, storeConf.category_groups, rawCategory);
  }

  const defaultCurrency = typeof storeConf?.default_currency === 'string' ? storeConf.default_currency.trim() : '';

  return {
    ...item,
    _storeEntity: storeEntity,
    _name: name,
    _image: image,
    _price: price,
    _displayPrice: formatPrice(price, defaultCurrency),
    _oldPrice: oldPrice,
    _displayOldPrice: formatPrice(oldPrice, defaultCurrency),
    _subtitle: subtitle,
    _category: category,
    _searchKey: `${name} ${category} ${subtitle}`.toLowerCase()
  };
}

export function debounce(fn, ms = 120) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), ms);
  };
}
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

export function formatPrice(val) {
  if (val === null || val === undefined || val === '') return '';
  const str = String(val).trim();
  return /[\€\$\£]/.test(str) ? str : `${str} €`;
}

export function parseMultiplier(str) {
  if (!str) return { count: 1, base: '' };
  const match = String(str).match(/^(\d+)x\s*(.+)$/i);
  return match
    ? { count: parseInt(match[1], 10), base: match[2].trim() }
    : { count: 1, base: String(str).trim() };
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

export function normalizeOffer(item, storeEntity, hass = null) {
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

  const validInfo = item.valid_until || item.valid_date || item.valid_from || '';
  if (validInfo) {
    subtitle = subtitle ? `${subtitle} • ${validInfo}` : validInfo;
  }

  const category =
    item.category ||
    item.category_name ||
    item.section ||
    localize('default.other_offers', hass);

  return {
    ...item,
    _storeEntity: storeEntity,
    _name: name,
    _image: image,
    _price: price,
    _displayPrice: formatPrice(price),
    _oldPrice: oldPrice,
    _displayOldPrice: formatPrice(oldPrice),
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
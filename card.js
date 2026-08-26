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
	title: "Display name (optional)",
	default_selected: "Selected by default",
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
	todo_price: "Append Price to Shopping List",
	only_show_todo: "Show Shopping List On Load",
	category_layout: "Shopping List Behavior",
	category_layout_keep: "Keep Category Behavior",
	category_layout_always_open: "Always Open Category Layout",
	category_layout_flat: "Remove Category Layout",
	move_up: "Move Up",
	move_down: "Move Down"
};
var en = {
	"default": {
	title: "Title",
	search: "Search offers",
	offer: "Offer",
	offers: "Offers",
	no_offers: "No current offers found",
	other_offers: "Other offers",
	add_to_shopping_list: "Add to shopping list",
	all_stores: "All Stores",
	stores: "Stores",
	store: "Store",
	add_custom_item: "Add custom item",
	clear_shopping_list: "Clear shopping list",
	add_custom_item_placeholder: "Item name...",
	change_to_todo: "Switch between shopping list and offers",
	remove_store: "Remove supermarket",
	add_store: "Add supermarket",
	select_store: "Select supermarkets",
	remove_all_from_shopping_list: "Do you want to remove all items for {storeTitle} from the shopping list?",
	custom_items: "Custom items",
	search_results: "Search results"
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
	title: "Anzeigename (optional)",
	default_selected: "Standardmäßig ausgewählt",
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
	todo_price: "Füge den Preis an die Einkaufsliste an",
	only_show_todo: "Einkaufsliste bei Laden anzeigen",
	category_layout: "Verhalten der Einkaufsliste",
	category_layout_keep: "Behalte das Verhalten der Kategorien bei",
	category_layout_always_open: "Kategorien immer geöffnet",
	category_layout_flat: "Keine Kategorisierung der Angebote",
	move_up: "Nach oben verschieben",
	move_down: "Nach unten verschieben"
};
var de = {
	"default": {
	title: "Angebote",
	search: "Angebote durchsuchen",
	offer: "Angebot",
	offers: "Angebote",
	no_offers: "Keine aktuellen Angebote gefunden",
	other_offers: "Weitere Angebote",
	add_to_shopping_list: "Zur Einkaufsliste hinzufügen",
	all_stores: "Alle Märkte",
	stores: "Märkte",
	store: "Markt",
	add_custom_item: "Benutzerdefinierten Artikel hinzufügen",
	clear_shopping_list: "Einkaufsliste leeren",
	add_custom_item_placeholder: "Artikelname...",
	change_to_todo: "Zwischen Einkaufsliste und Angeboten wechseln",
	remove_store: "Supermarkt entfernen",
	add_store: "Supermarkt hinzufügen",
	select_store: "Supermärkte auswählen",
	remove_all_from_shopping_list: "Möchtest du alle Artikel für {storeTitle} von der Einkaufsliste entfernen?",
	custom_items: "Eigene Artikel",
	search_results: "Suchergebnisse"
},
	aldi: aldi,
	edeka: edeka,
	lidl: lidl,
	norma: norma,
	rewe: rewe,
	config: config
};

var cardStyles = ":host {\r\n  display: block;\r\n}\r\n\r\nha-card {\r\n  overflow: visible;\r\n  position: relative;\r\n}\r\n\r\n/* Card Header */\r\n.card-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 16px 16px 8px 16px;\r\n  box-sizing: border-box;\r\n  min-height: 48px;\r\n}\r\n\r\n.header-left {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  flex: 1;\r\n  min-width: 0;\r\n}\r\n\r\n.card-title {\r\n  font-size: var(--ha-card-header-font-size, 24px);\r\n  font-weight: 500;\r\n  color: var(--ha-card-header-color, var(--primary-text-color));\r\n  line-height: 1.2;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n.header-badge-container {\r\n  display: flex;\r\n  align-items: center;\r\n  flex-shrink: 0;\r\n  margin-left: 12px;\r\n}\r\n\r\n/* Unified Badge Pills */\r\n.badge-count {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 4px;\r\n  font-size: 11px;\r\n  font-weight: 600;\r\n  color: var(--secondary-text-color);\r\n  background: var(--secondary-background-color, rgba(255, 255, 255, 0.08));\r\n  padding: 2px 8px;\r\n  border-radius: 12px;\r\n  line-height: 1.4;\r\n  white-space: nowrap;\r\n}\r\n\r\n.badge-todo-total {\r\n  color: var(--primary-color, #03a9f4);\r\n  font-weight: 700;\r\n}\r\n\r\n/* Burger Menu */\r\n.burger-menu-container {\r\n  position: relative;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.btn-burger-menu {\r\n  background: none;\r\n  border: none;\r\n  cursor: pointer;\r\n  padding: 6px;\r\n  width: 36px;\r\n  height: 36px;\r\n  border-radius: 50%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: var(--primary-text-color);\r\n  transition: background-color 0.15s ease;\r\n}\r\n\r\n.btn-burger-menu svg {\r\n  width: 22px;\r\n  height: 22px;\r\n}\r\n\r\n.btn-burger-menu:hover {\r\n  background: var(--secondary-background-color, rgba(255, 255, 255, 0.1));\r\n}\r\n\r\n.dropdown-menu {\r\n  display: none;\r\n  position: absolute;\r\n  top: calc(100% + 6px);\r\n  left: 0;\r\n  background: var(--ha-card-background, var(--card-background-color, #1e1e1e));\r\n  border-radius: var(--ha-card-border-radius, 8px);\r\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);\r\n  border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));\r\n  z-index: 1000;\r\n  min-width: 220px;\r\n  padding: 6px 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.dropdown-menu.open {\r\n  display: block;\r\n}\r\n\r\n.menu-divider {\r\n  display: block;\r\n  height: 1px;\r\n  width: 100%;\r\n  background: var(--divider-color, rgba(255, 255, 255, 0.15));\r\n  margin: 6px 0;\r\n}\r\n\r\n.dropdown-item {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  padding: 10px 16px;\r\n  font-size: 14px;\r\n  cursor: pointer;\r\n  color: var(--primary-text-color);\r\n  user-select: none;\r\n  transition: background-color 0.15s ease;\r\n}\r\n\r\n.dropdown-item:hover {\r\n  background-color: var(--secondary-background-color, rgba(255, 255, 255, 0.08));\r\n}\r\n\r\n.dropdown-item.active {\r\n  color: var(--primary-color, #03a9f4);\r\n  font-weight: 500;\r\n}\r\n\r\n.menu-icon {\r\n  width: 20px;\r\n  height: 20px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.menu-icon svg {\r\n  width: 18px;\r\n  height: 18px;\r\n}\r\n\r\n.check-icon {\r\n  color: var(--primary-color, #03a9f4);\r\n}\r\n\r\n.menu-icon-spacer {\r\n  width: 20px;\r\n  height: 20px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.menu-label {\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n\r\n/* Search Container */\r\n.search-container {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 8px 16px 12px 16px;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.search-wrapper {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  flex: 1;\r\n  width: 100%;\r\n}\r\n\r\n.search-icon {\r\n  position: absolute;\r\n  left: 12px;\r\n  width: 20px;\r\n  height: 20px;\r\n  color: var(--secondary-text-color);\r\n  pointer-events: none;\r\n}\r\n\r\n.search-input {\r\n  width: 100%;\r\n  height: 42px;\r\n  padding: 0 12px 0 40px;\r\n  background: var(--input-fill-color, var(--secondary-background-color, rgba(255, 255, 255, 0.05)));\r\n  color: var(--primary-text-color);\r\n  border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));\r\n  border-radius: var(--ha-card-border-radius, 8px);\r\n  font-size: 14px;\r\n  outline: none;\r\n  box-sizing: border-box;\r\n  transition: border-color 0.2s ease;\r\n}\r\n\r\n.search-input:focus {\r\n  border-color: var(--primary-color, #03a9f4);\r\n}\r\n\r\n.btn-filter-todo {\r\n  background: var(--input-fill-color, var(--secondary-background-color, rgba(255, 255, 255, 0.05)));\r\n  border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));\r\n  color: var(--secondary-text-color);\r\n  cursor: pointer;\r\n  width: 42px;\r\n  height: 42px;\r\n  border-radius: var(--ha-card-border-radius, 8px);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  flex-shrink: 0;\r\n  transition: all 0.2s ease;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.btn-filter-todo svg {\r\n  width: 20px;\r\n  height: 20px;\r\n}\r\n\r\n.btn-filter-todo:hover {\r\n  background: var(--secondary-background-color, rgba(255, 255, 255, 0.1));\r\n  color: var(--primary-text-color);\r\n}\r\n\r\n.btn-filter-todo.active {\r\n  background: var(--primary-color, #03a9f4);\r\n  color: #fff;\r\n  border-color: var(--primary-color, #03a9f4);\r\n}\r\n\r\n/* Store Header */\r\n.card-content {\r\n  padding: 0 16px 16px 16px;\r\n}\r\n\r\n.store-section {\r\n  margin-bottom: 16px;\r\n}\r\n\r\n.store-section-header {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 10px 12px;\r\n  background: var(--secondary-background-color, rgba(255, 255, 255, 0.04));\r\n  border-radius: 8px;\r\n  margin: 12px 0 8px 0;\r\n  border-left: 3px solid var(--primary-color, #03a9f4);\r\n}\r\n\r\n.store-section-title {\r\n  font-size: 15px;\r\n  font-weight: 600;\r\n  color: var(--primary-color, #03a9f4);\r\n}\r\n\r\n.store-header-actions {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.btn-store-action {\r\n  background: none;\r\n  border: none;\r\n  cursor: pointer;\r\n  padding: 4px;\r\n  width: 28px;\r\n  height: 28px;\r\n  border-radius: 50%;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: var(--secondary-text-color);\r\n  transition: all 0.15s ease;\r\n}\r\n\r\n.btn-store-action svg {\r\n  width: 18px;\r\n  height: 18px;\r\n}\r\n\r\n.btn-add-custom-todo:hover {\r\n  color: var(--primary-color, #03a9f4);\r\n  background: var(--secondary-background-color, rgba(255, 255, 255, 0.1));\r\n}\r\n\r\n.btn-clear-store-todo:hover {\r\n  color: var(--error-color, #db4437);\r\n  background: var(--secondary-background-color, rgba(255, 255, 255, 0.1));\r\n}\r\n\r\n/* Inline Custom Item Input */\r\n.custom-input-row {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 6px 0 10px 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.custom-item-input {\r\n  flex: 1;\r\n  height: 36px;\r\n  padding: 0 12px;\r\n  background: var(--input-fill-color, var(--secondary-background-color, rgba(255, 255, 255, 0.05)));\r\n  color: var(--primary-text-color);\r\n  border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.15));\r\n  border-radius: 6px;\r\n  font-size: 13px;\r\n  outline: none;\r\n}\r\n\r\n.custom-item-input:focus {\r\n  border-color: var(--primary-color, #03a9f4);\r\n}\r\n\r\n.btn-confirm-custom-todo {\r\n  background: var(--primary-color, #03a9f4);\r\n  color: #fff;\r\n  border: none;\r\n  border-radius: 6px;\r\n  width: 36px;\r\n  height: 36px;\r\n  cursor: pointer;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  transition: opacity 0.15s ease;\r\n}\r\n\r\n.btn-confirm-custom-todo:hover {\r\n  opacity: 0.9;\r\n}\r\n\r\n.btn-confirm-custom-todo svg {\r\n  width: 18px;\r\n  height: 18px;\r\n}\r\n\r\n/* Category Groups */\r\n.category-group {\r\n  margin-bottom: 6px;\r\n}\r\n\r\nsummary,\r\n.category-title-static {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  font-size: 13px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  padding: 8px 4px;\r\n  user-select: none;\r\n  color: var(--primary-text-color);\r\n}\r\n\r\n/* Offers List & Item Card */\r\n.offers-list {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 8px;\r\n  padding: 4px 0 8px 0;\r\n}\r\n\r\n.offer-item {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  padding: 8px 10px;\r\n  border-radius: 8px;\r\n  background: var(--secondary-background-color, rgba(255, 255, 255, 0.03));\r\n  border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.05));\r\n}\r\n\r\n.offer-image {\r\n  width: 44px;\r\n  height: 44px;\r\n  object-fit: contain;\r\n  border-radius: 6px;\r\n  background: #fff;\r\n  padding: 2px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.offer-image-placeholder {\r\n  width: 44px;\r\n  height: 44px;\r\n  background: var(--secondary-background-color, rgba(255, 255, 255, 0.06));\r\n  border-radius: 6px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: var(--secondary-text-color);\r\n  flex-shrink: 0;\r\n}\r\n\r\n.offer-image-placeholder svg {\r\n  width: 22px;\r\n  height: 22px;\r\n  opacity: 0.6;\r\n}\r\n\r\n.offer-details {\r\n  flex: 1;\r\n  min-width: 0;\r\n}\r\n\r\n.offer-title {\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  color: var(--primary-text-color);\r\n  line-height: 1.3;\r\n}\r\n\r\n.store-tag {\r\n  font-size: 10px;\r\n  font-weight: 600;\r\n  background: var(--secondary-background-color, rgba(255, 255, 255, 0.12));\r\n  padding: 1px 5px;\r\n  border-radius: 4px;\r\n  margin-left: 6px;\r\n  color: var(--secondary-text-color);\r\n}\r\n\r\n.offer-subtitle {\r\n  font-size: 12px;\r\n  color: var(--secondary-text-color);\r\n  margin-top: 2px;\r\n}\r\n\r\n.offer-price-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: flex-end;\r\n  margin-right: 6px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.offer-price {\r\n  font-size: 14px;\r\n  font-weight: 700;\r\n  color: var(--primary-color, #03a9f4);\r\n}\r\n\r\n.offer-old-price {\r\n  font-size: 11px;\r\n  text-decoration: line-through;\r\n  color: var(--secondary-text-color);\r\n}\r\n\r\n/* Item Action Controls */\r\n.todo-btn-container {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 4px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.btn-todo-action {\r\n  background: none;\r\n  border: none;\r\n  outline: none;\r\n  box-shadow: none;\r\n  cursor: pointer;\r\n  padding: 4px;\r\n  width: 28px;\r\n  height: 28px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  color: var(--secondary-text-color);\r\n  border-radius: 50%;\r\n  transition: all 0.15s ease;\r\n}\r\n\r\n.btn-todo-action svg {\r\n  width: 18px;\r\n  height: 18px;\r\n}\r\n\r\n.btn-todo-action:hover {\r\n  background: var(--secondary-background-color, rgba(255, 255, 255, 0.1));\r\n  color: var(--primary-text-color);\r\n}\r\n\r\n.btn-add-todo.added {\r\n  color: var(--success-color, #4caf50);\r\n  transform: scale(1.15);\r\n}\r\n\r\n.todo-count-badge {\r\n  background: var(--primary-color, #03a9f4);\r\n  color: #fff;\r\n  border: none;\r\n  font-size: 11px;\r\n  font-weight: 700;\r\n  padding: 2px 7px;\r\n  border-radius: 10px;\r\n  line-height: 1.2;\r\n  cursor: pointer;\r\n}\r\n\r\n.no-results {\r\n  padding: 24px 16px;\r\n  text-align: center;\r\n  color: var(--secondary-text-color);\r\n  font-size: 14px;\r\n}\r\n";

/**
 * Discounts Card for Home Assistant Lovelace
 * Repository: schblondie/discounts-card
 */


const languages = { en, de };
const brokenImageUrls = new Set();

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
    this._filterTodoOnly = false;
    this._categoryOpenState = {};
    this._hasSkeleton = false;
    this._todoItemCounts = {};
    this._customStoreTodoItems = {};
    this._selectedStoreIndices = new Set([0]);
    this._menuOpen = false;
    this._customInputVisibility = {};
    this._customInputValues = {};
    this._focusedCustomInputStore = null;
    this._customInputSelections = {};

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
      filter_mode: 'none',
      filter_categories: []
    }));

    return {
      title: '',
      entities: selectedEntities.length > 0 ? selectedEntities : [{ entity: '', title: '', default_selected: true, filter_mode: 'none', filter_categories: [] }],
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
            default_selected: true,
            filter_mode: 'none',
            filter_categories: []
          };
        }
        return {
          entity: item.entity || '',
          title: item.title || '',
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
        todo_enabled:
          todoConfig.todo_enabled ??
          config.enable_todo ??
          config.todo_enabled ??
          false,
        todo_entity:
          todoConfig.todo_entity ??
          config.todo_entity ??
          '',
        todo_price: priceSetting,
        only_show_todo:
          todoConfig.only_show_todo ??
          config.only_show_todo ??
          false,
        category_layout:
          todoConfig.category_layout ??
          config.todo_category_layout ??
          'keep'
      }
    };

    const preselected = [];
    this.config.entities.forEach((s, idx) => {
      if (s.default_selected !== false) {
        preselected.push(idx);
      }
    });
    this._selectedStoreIndices = new Set(preselected.length > 0 ? preselected : [0]);

    if (this._filterTodoOnly === false && this.config.todo?.only_show_todo) {
      this._filterTodoOnly = true;
    }

    this._hasSkeleton = false;
    if (this._hass) {
      this.render();
    }
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._hasSkeleton) {
      this.render();
    } else {
      this._fetchTodoCounts().then(() => {
        this._updateHeaderTitle();
        this._updateOffersList();
      });
    }
  }

  _parseMultiplier(str) {
    if (!str) return { count: 1, base: '' };
    const match = String(str).match(/^(\d+)x\s*(.+)$/i);
    return match
      ? { count: parseInt(match[1], 10), base: match[2].trim() }
      : { count: 1, base: String(str).trim() };
  }

  _detectStoreLabel(entityId = '') {
    const ent = (entityId || '').toLowerCase();
    const friendlyName = (this._hass?.states?.[entityId]?.attributes?.friendly_name || '').toLowerCase();
    const source = `${ent} ${friendlyName}`;

    if (source.includes('aldi')) return 'ALDI';
    if (source.includes('edeka')) return 'EDEKA';
    if (source.includes('lidl')) return 'LIDL';
    if (source.includes('norma')) return 'NORMA';
    if (source.includes('rewe')) return 'REWE';
    return '';
  }

  _formatTodoItemName(itemName, itemPrice, entityId = '') {
    const storeLabel = this._detectStoreLabel(entityId);
    const suffix = storeLabel ? ` (${storeLabel})` : '';
    const baseName = `${itemName}${suffix}`;
    if (!this.config.todo?.todo_price || !itemPrice) {
      return baseName;
    }
    return `${baseName} - ${itemPrice}`;
  }

  _getItemTodoCount(item, entityId) {
    if (!this.config.todo?.todo_enabled) return 0;
    const { name, price } = this._getItemProps(item);
    const displayPrice = formatPrice(price);
    const formattedName = this._formatTodoItemName(name, displayPrice, entityId || item._storeEntity);
    const targetKey = this._parseMultiplier(formattedName).base.toLowerCase();
    return this._todoItemCounts[targetKey] || 0;
  }

  async _fetchTodoCounts() {
    if (!this._hass || !this.config?.todo?.todo_enabled) {
      this._todoItemCounts = {};
      this._customStoreTodoItems = {};
      return;
    }

    const todoEntity = this.config.todo.todo_entity;
    const counts = {};
    const rawList = [];

    try {
      if (todoEntity) {
        const res = await this._hass.callWS({
          type: 'todo/item/list',
          entity_id: todoEntity
        });
        (res?.items || []).forEach((item) => {
          if (item.status !== 'completed') {
            const { count, base } = this._parseMultiplier(item.summary);
            const key = base.toLowerCase();
            counts[key] = (counts[key] || 0) + count;
            rawList.push({ summary: item.summary, uid: item.uid, count, base });
          }
        });
      } else {
        const items = (await this._hass.callWS({ type: 'shopping_list/items' })) || [];
        items.forEach((item) => {
          if (!item.complete) {
            const { count, base } = this._parseMultiplier(item.name);
            const key = base.toLowerCase();
            counts[key] = (counts[key] || 0) + count;
            rawList.push({ summary: item.name, id: item.id, count, base });
          }
        });
      }

      this._todoItemCounts = counts;

      const customItems = {};
      this.config.entities.forEach((s) => {
        customItems[s.entity] = [];
        const label = this._detectStoreLabel(s.entity).toLowerCase();
        const sensorOffers = this._getRawOffersForEntity(s.entity);
        const sensorNames = new Set(
          sensorOffers.map((o) => {
            const { name, price } = this._getItemProps(o);
            const fmt = this._formatTodoItemName(name, formatPrice(price), s.entity);
            return this._parseMultiplier(fmt).base.toLowerCase();
          })
        );

        rawList.forEach((todo) => {
          const baseLower = todo.base.toLowerCase();
          const matchesStore = label ? baseLower.includes(`(${label})`) : false;
          if ((matchesStore || this.config.entities.length === 1) && !sensorNames.has(baseLower)) {
            let cleanName = todo.base;
            if (label) cleanName = cleanName.replace(new RegExp(`\\s*\\(${label}\\)`, 'i'), '').trim();
            customItems[s.entity].push({
              title: cleanName,
              category: localize('default.custom_items', this._hass),
              price: '',
              _storeEntity: s.entity,
              _isCustom: true
            });
          }
        });
      });

      this._customStoreTodoItems = customItems;
    } catch {
      this._todoItemCounts = {};
      this._customStoreTodoItems = {};
    }
  }

  async _updateTodoQuantity(itemName, itemPrice = '', mode = 'inc', customCount = null, entityId = '') {
    if (!this._hass) return;

    const formattedItemName = this._formatTodoItemName(itemName, itemPrice, entityId);
    const todoEntity = this.config.todo?.todo_entity;
    const target = this._parseMultiplier(formattedItemName);

    try {
      if (todoEntity) {
        const res = await this._hass.callWS({
          type: 'todo/item/list',
          entity_id: todoEntity
        });
        const items = res?.items || [];
        const existing = items.find(
          (i) =>
            i.status !== 'completed' &&
            this._parseMultiplier(i.summary).base.toLowerCase() === target.base.toLowerCase()
        );

        if (existing) {
          const current = this._parseMultiplier(existing.summary);
          let nextCount = current.count;

          if (mode === 'inc') nextCount += 1;
          else if (mode === 'dec') nextCount -= 1;
          else if (mode === 'set') nextCount = customCount;

          if (nextCount <= 0) {
            await this._hass.callService('todo', 'remove_item', {
              entity_id: todoEntity,
              item: [existing.uid]
            });
          } else {
            const newSummary = nextCount > 1 ? `${nextCount}x ${current.base}` : current.base;
            await this._hass.callService('todo', 'update_item', {
              entity_id: todoEntity,
              item: existing.uid,
              rename: newSummary
            });
          }
        } else if (mode === 'inc' || (mode === 'set' && customCount > 0)) {
          const count = mode === 'set' ? customCount : 1;
          const initialName = count > 1 ? `${count}x ${target.base}` : target.base;
          await this._hass.callService('todo', 'add_item', {
            entity_id: todoEntity,
            item: initialName
          });
        }
      } else {
        const items = (await this._hass.callWS({ type: 'shopping_list/items' })) || [];
        const existing = items.find(
          (i) =>
            !i.complete &&
            this._parseMultiplier(i.name).base.toLowerCase() === target.base.toLowerCase()
        );

        if (existing) {
          const current = this._parseMultiplier(existing.name);
          let nextCount = current.count;

          if (mode === 'inc') nextCount += 1;
          else if (mode === 'dec') nextCount -= 1;
          else if (mode === 'set') nextCount = customCount;

          if (nextCount <= 0) {
            await this._hass.callWS({
              type: 'shopping_list/remove_item',
              item_id: existing.id
            });
          } else {
            const newName = nextCount > 1 ? `${nextCount}x ${current.base}` : current.base;
            await this._hass.callWS({
              type: 'shopping_list/update_item',
              item_id: existing.id,
              name: newName
            });
          }
        } else if (mode === 'inc' || (mode === 'set' && customCount > 0)) {
          const count = mode === 'set' ? customCount : 1;
          const initialName = count > 1 ? `${count}x ${target.base}` : target.base;
          await this._hass.callService('shopping_list', 'add_item', {
            name: initialName
          });
        }
      }

      await this._fetchTodoCounts();
      this._updateOffersList();
    } catch (err) {
      console.error('Failed to update shopping list:', err);
    }
  }

  async _clearStoreTodoItems(storeEntity) {
    if (!this._hass || !this.config.todo?.todo_enabled) return;

    const storeConf = this.config.entities.find((s) => s.entity === storeEntity) || { entity: storeEntity };
    const storeTitle = this._getStoreTitle(storeConf);
    let confirmMessage = localize('default.remove_all_from_shopping_list', this._hass);
    confirmMessage = confirmMessage.replace('{storeTitle}', `"${storeTitle}"`);
    if (!window.confirm(confirmMessage)) return;

    const storeOffers = this._getRawOffersForEntity(storeEntity);
    const customOffers = this._customStoreTodoItems?.[storeEntity] || [];
    const allStoreOffers = [...storeOffers, ...customOffers];

    const storeKeys = new Set(
      allStoreOffers.map((item) => {
        const { name, price } = this._getItemProps(item);
        const displayPrice = formatPrice(price);
        const formattedName = this._formatTodoItemName(name, displayPrice, storeEntity);
        return this._parseMultiplier(formattedName).base.toLowerCase();
      })
    );

    const todoEntity = this.config.todo?.todo_entity;

    try {
      if (todoEntity) {
        const res = await this._hass.callWS({ type: 'todo/item/list', entity_id: todoEntity });
        const items = res?.items || [];
        const uidsToRemove = items
          .filter((i) => i.status !== 'completed' && storeKeys.has(this._parseMultiplier(i.summary).base.toLowerCase()))
          .map((i) => i.uid);

        if (uidsToRemove.length > 0) {
          await this._hass.callService('todo', 'remove_item', {
            entity_id: todoEntity,
            item: uidsToRemove
          });
        }
      } else {
        const items = (await this._hass.callWS({ type: 'shopping_list/items' })) || [];
        const toRemove = items.filter(
          (i) => !i.complete && storeKeys.has(this._parseMultiplier(i.name).base.toLowerCase())
        );
        for (const item of toRemove) {
          await this._hass.callWS({ type: 'shopping_list/remove_item', item_id: item.id });
        }
      }

      await this._fetchTodoCounts();
      this._updateOffersList();
    } catch (err) {
      console.error('Failed to clear store shopping list items:', err);
    }
  }

  _renderTodoControlsHtml(name, price, count, entityId = '') {
    const safeItem = encodeURIComponent(name);
    const safePrice = encodeURIComponent(price || '');
    const safeEntity = encodeURIComponent(entityId || '');

    if (count <= 0) {
      return `
        <button class="btn-todo-action btn-add-todo" title="${localize('default.add_to_shopping_list', this._hass)}" data-item="${safeItem}" data-price="${safePrice}" data-entity="${safeEntity}">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </svg>
        </button>
      `;
    }

    return `
      <button class="btn-todo-action btn-dec-todo" title="${count === 1 ? 'Remove' : 'Decrease'}" data-item="${safeItem}" data-price="${safePrice}" data-entity="${safeEntity}">
        <svg viewBox="0 0 24 24" fill="currentColor">
          ${count === 1
        ? `<path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />`
        : `<path d="M19,13H5V11H19V13Z" />`
      }
        </svg>
      </button>
      <button class="todo-count-badge" title="Menge ändern" data-item="${safeItem}" data-price="${safePrice}" data-count="${count}" data-entity="${safeEntity}">
        ${count}x
      </button>
      <button class="btn-todo-action btn-add-todo" title="${localize('default.add_to_shopping_list', this._hass)}" data-item="${safeItem}" data-price="${safePrice}" data-entity="${safeEntity}">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </svg>
      </button>
    `;
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

  _getStoreTitle(storeConf) {
    if (!storeConf) return localize('default.title', this._hass);
    if (storeConf.title && storeConf.title.trim() !== '') return storeConf.title;
    const entState = this._hass?.states[storeConf.entity];
    const storeLabel = this._detectStoreLabel(storeConf.entity);
    return (
      entState?.attributes?.friendly_name ||
      (storeLabel ? `${storeLabel} ${localize('default.title', this._hass)}` : localize('default.title', this._hass))
    );
  }

  async render() {
    if (!this._hass || !this.config) return;

    if (!this.config.entities || this.config.entities.length === 0) {
      this._hasSkeleton = false;
      this.shadowRoot.innerHTML = `
        <ha-card style="padding: 16px;">
          <div style="color: var(--secondary-text-color);">
            Please configure at least one entity.
          </div>
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
    const hasMultipleStores = (this.config.entities || []).length > 1;

    this.shadowRoot.innerHTML = `
      <style>
        ${cardStyles}
        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }
        .btn-clear-search {
          position: absolute;
          right: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: none;
          align-items: center;
          justify-content: center;
          color: var(--secondary-text-color);
        }
        .btn-clear-search svg {
          width: 18px;
          height: 18px;
        }
      </style>

      <ha-card>
        <div class="card-header">
          <div class="header-left">
            ${hasMultipleStores
        ? `
                  <div class="burger-menu-container">
                    <button class="btn-burger-menu" title="${this._escapeHtml(localize('default.select_store', this._hass))}" aria-label="${this._escapeHtml(localize('default.select_store', this._hass))}">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
                      </svg>
                    </button>
                    <div class="dropdown-menu"></div>
                  </div>
                `
        : ''
      }
            <span class="card-title"></span>
          </div>
          <div class="header-badge-container">
            <span class="badge-count header-badge">0 ${localize('default.offers', this._hass)}</span>
          </div>
        </div>

        ${this.config.enable_search || this.config.todo?.todo_enabled
        ? `
              <div class="search-container">
                ${this.config.enable_search
          ? `
                      <div class="search-wrapper">
                        <svg class="search-icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
                        </svg>
                        <input
                          type="text"
                          class="search-input"
                          placeholder="${this._escapeHtml(localize('default.search', this._hass))}"
                          value="${this._escapeHtml(this._filterQuery)}"
                        />
                        <button class="btn-clear-search" style="${this._filterQuery ? 'display: flex;' : 'display: none;'}" title="Clear">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                          </svg>
                        </button>
                      </div>
                    `
          : '<div style="flex:1;"></div>'
        }
                ${this.config.todo?.todo_enabled
          ? `
                      <button class="btn-filter-todo ${this._filterTodoOnly ? 'active' : ''}" title="${this._escapeHtml(localize('default.change_to_todo', this._hass))}" aria-label="${this._escapeHtml(localize('default.filter_todo', this._hass))}">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
                        </svg>
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

    if (this.config.enable_search) {
      const searchInput = this.shadowRoot.querySelector('.search-input');
      const clearBtn = this.shadowRoot.querySelector('.btn-clear-search');

      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          this._filterQuery = (e.target.value || '').toLowerCase().trim();
          if (clearBtn) {
            clearBtn.style.display = e.target.value ? 'flex' : 'none';
          }
          this._updateOffersList();
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
            const rawSrc = e.target.getAttribute('data-src') || e.target.src;
            if (rawSrc) brokenImageUrls.add(rawSrc);
            if (e.target.src) brokenImageUrls.add(e.target.src);
            e.target.style.display = 'none';
            if (e.target.nextElementSibling) {
              e.target.nextElementSibling.style.display = 'flex';
            }
          }
        },
        true
      );
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
        this._focusedCustomInputStore = null;
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
          const input = window.prompt(`Menge für "${itemName}":`, currentCount);
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
        if (this._selectedStoreIndices.size > 1) {
          this._selectedStoreIndices.delete(idx);
        }
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
          ${allSelected
        ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>`
        : ''
      }
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
                ${isSelected
              ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>`
              : ''
            }
              </span>
              <span class="menu-label">${this._escapeHtml(this._getStoreTitle(store))}</span>
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

  _renderOfferItemHtml(item) {
    const { name, image, price, oldPrice, subtitle } = this._getItemProps(item);
    const sanitizedImgUrl = this._sanitizeImageUrl(image);
    const displayPrice = formatPrice(price);
    const displayOldPrice = formatPrice(oldPrice);
    const safeName = this._escapeHtml(name);
    const safeImgUrl = this._escapeHtml(sanitizedImgUrl);
    const safeSubtitle = this._escapeHtml(subtitle);
    const safeDisplayPrice = this._escapeHtml(displayPrice);
    const safeDisplayOldPrice = this._escapeHtml(displayOldPrice);
    const storeEntity = item._storeEntity || this.config.entities[0]?.entity;
    const storeLabel = this._detectStoreLabel(storeEntity);
    const existingCount = this._getItemTodoCount(item, storeEntity);
    const isBroken = !sanitizedImgUrl || brokenImageUrls.has(sanitizedImgUrl);

    return `
      <div class="offer-item">
        ${this.config.show_images && !isBroken
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
              <div class="offer-image-placeholder" style="display: none;">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V18H18V20H20V14M20,4H4V6H20V4Z"/></svg>
              </div>
            `
        : this.config.show_images
          ? `
                <div class="offer-image-placeholder">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V18H18V20H20V14M20,4H4V6H20V4Z"/></svg>
                </div>
              `
          : ''
      }

        <div class="offer-details">
          <div class="offer-title">
            ${safeName}
            ${this._filterQuery.length > 0 && storeLabel ? `<span class="store-tag">${storeLabel}</span>` : ''}
          </div>
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

        ${this.config.todo?.todo_enabled
        ? `
              <div class="todo-btn-container" data-item="${encodeURIComponent(name)}" data-price="${encodeURIComponent(displayPrice || '')}" data-entity="${encodeURIComponent(storeEntity || '')}">
                ${this._renderTodoControlsHtml(name, displayPrice, existingCount, storeEntity)}
              </div>
            `
        : ''
      }
      </div>
    `;
  }

  _getRawOffersForEntity(entityId) {
    const entity = this._hass?.states[entityId];
    if (!entity) return [];
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

    return offers.map((o) => ({ ...o, _storeEntity: entityId }));
  }

  _renderCategoryGroups(items, storeEntity, isSearchMode = false) {
    const todoCategoryLayout = this.config.todo?.category_layout || 'keep';
    const isFlatMode = this._filterTodoOnly && todoCategoryLayout === 'flat';

    if (isFlatMode) {
      return `
        <div class="offers-list flat-list">
          ${items.map((item) => this._renderOfferItemHtml(item)).join('')}
        </div>
      `;
    }

    const grouped = {};
    items.forEach((item) => {
      const { category } = this._getItemProps(item);
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(item);
    });

    return Object.entries(grouped)
      .map(([category, catItems]) => {
        const safeCategory = this._escapeHtml(category);
        const catTodoCount = catItems.filter((item) => this._getItemTodoCount(item, storeEntity) > 0).length;
        const categoryHtml = `
          <div class="offers-list">
            ${catItems.map((item) => this._renderOfferItemHtml(item)).join('')}
          </div>
        `;

        const forceOpen =
          (this._filterTodoOnly && todoCategoryLayout === 'always_open') ||
          (isSearchMode && this._filterQuery.length > 0);

        if (this.config.collapsible_categories) {
          const isOpen =
            forceOpen ||
            (this._categoryOpenState[`${storeEntity}_${category}`] ?? this.config.categories_open_by_default);

          return `
            <details class="category-group" data-category="${encodeURIComponent(category)}" data-store="${encodeURIComponent(storeEntity)}" ${isOpen ? 'open' : ''}>
              <summary>
                <span>${safeCategory}</span>
                <span class="badge-count">
                  ${catItems.length}${this.config.todo?.todo_enabled && catTodoCount > 0 ? ` <span class="badge-todo-total">(${catTodoCount} 🛒)</span>` : ''}
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
                ${catItems.length}${this.config.todo?.todo_enabled && catTodoCount > 0 ? ` <span class="badge-todo-total">(${catTodoCount} 🛒)</span>` : ''}
              </span>
            </div>
            ${categoryHtml}
          </div>
        `;
      })
      .join('');
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
      if (!item || typeof item !== 'object') return false;
      const { name, category, subtitle } = this._getItemProps(item);
      const storeEntity = item._storeEntity || '';
      const storeConf = this.config.entities.find((s) => s.entity === storeEntity);

      const filterMode = storeConf?.filter_mode || 'none';
      const filterCategories = storeConf?.filter_categories || [];

      if (filterMode === 'blacklist' && filterCategories.includes(category)) return false;
      if (filterMode === 'whitelist' && !filterCategories.includes(category)) return false;
      if (this._filterTodoOnly && this._getItemTodoCount(item, storeEntity) <= 0) return false;
      if (!this._filterQuery) return true;

      const q = this._filterQuery;
      return (
        name.toLowerCase().includes(q) ||
        category.toLowerCase().includes(q) ||
        subtitle.toLowerCase().includes(q)
      );
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
              <span class="store-section-title">${this._escapeHtml(storeTitle)}</span>
              <div class="store-header-actions">
              ${this.config.todo?.todo_enabled && storeTodoCount > 0
            ? `
                    <button class="btn-store-action btn-clear-store-todo" title="${localize('default.clear_shopping_list', this._hass)}" data-store="${encodeURIComponent(storeEntity)}">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                      </svg>
                    </button>
                  `
            : ''
          }
              ${this.config.todo?.todo_enabled
            ? `
                    <button class="btn-store-action btn-add-custom-todo" title="${localize('default.add_custom_item', this._hass)}" data-store="${encodeURIComponent(storeEntity)}">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                      </svg>
                    </button>
                  `
            : ''
          }
                <span class="badge-count">
                  ${items.length}${this.config.todo?.todo_enabled && storeTodoCount > 0 ? ` <span class="badge-todo-total">(${storeTodoCount} 🛒)</span>` : ''}
                </span>
              </div>
            </div>

            <div class="custom-input-row" data-store="${encodeURIComponent(storeEntity)}" style="display: ${isCustomInputVisible ? 'flex' : 'none'};">
              <input type="text" placeholder="${localize('default.add_custom_item_placeholder', this._hass)}..." class="custom-item-input" value="${this._escapeHtml(customInputValue)}" />
              <button class="btn-confirm-custom-todo" data-store="${encodeURIComponent(storeEntity)}" title="${localize('default.add_custom_item', this._hass)}">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                </svg>
              </button>
            </div>

            ${this._renderCategoryGroups(items, storeEntity, isSearchMode)}
          </div>
        `;
      })
      .join('');

    contentContainer.querySelectorAll('.custom-item-input').forEach((input) => {
      const row = input.closest('.custom-input-row');
      const storeEntity = decodeURIComponent(row?.dataset.store || '');

      const saveCaret = (e) => {
        this._customInputSelections[storeEntity] = {
          start: e.target.selectionStart,
          end: e.target.selectionEnd
        };
      };

      input.addEventListener('focus', () => {
        this._focusedCustomInputStore = storeEntity;
      });
      input.addEventListener('input', (e) => {
        this._customInputValues[storeEntity] = e.target.value;
        saveCaret(e);
      });
      input.addEventListener('keyup', saveCaret);
      input.addEventListener('click', saveCaret);
      input.addEventListener('select', saveCaret);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const btn = row?.querySelector('.btn-confirm-custom-todo');
          btn?.click();
        }
      });
    });

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
  }
  _updateHeaderAndCategoryBadges() {
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

class DiscountsCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...config };
    if (!Array.isArray(this._config.entities)) {
      this._config.entities = this._config.entity ? [{ entity: this._config.entity, title: '', default_selected: true, filter_mode: 'none', filter_categories: [] }] : [];
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

  _updateStore(index, key, val) {
    const entities = [...(this._config.entities || [])];
    entities[index] = { ...entities[index], [key]: val };
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

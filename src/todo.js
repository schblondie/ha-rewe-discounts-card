import {
  localize,
  parseMultiplier,
  detectStoreLabel,
  formatTodoItemName,
  normalizeOffer
} from './utils.js';

export async function fetchTodoCounts(hass, config, getRawOffersForEntity) {
  if (!hass || !config?.todo?.todo_enabled) {
    return { counts: {}, customStoreTodoItems: {} };
  }
  const todoEntity = config.todo.todo_entity;
  const counts = {};
  const rawList = [];
  try {
    if (todoEntity) {
      const res = await hass.callWS({ type: 'todo/item/list', entity_id: todoEntity });
      (res?.items || []).forEach((item) => {
        if (item.status !== 'completed') {
          const { count, base } = parseMultiplier(item.summary);
          const key = base.toLowerCase();
          counts[key] = (counts[key] || 0) + count;
          rawList.push({ summary: item.summary, uid: item.uid, count, base });
        }
      });
    } else {
      const items = (await hass.callWS({ type: 'shopping_list/items' })) || [];
      items.forEach((item) => {
        if (!item.complete) {
          const { count, base } = parseMultiplier(item.name);
          const key = base.toLowerCase();
          counts[key] = (counts[key] || 0) + count;
          rawList.push({ summary: item.name, id: item.id, count, base });
        }
      });
    }
    const customStoreTodoItems = {};
    (config.entities || []).forEach((s) => {
      customStoreTodoItems[s.entity] = [];
      const label = detectStoreLabel(s.entity, hass).toLowerCase();
      const sensorOffers = getRawOffersForEntity(s.entity);
      const sensorNames = new Set(
        sensorOffers.map((o) => {
          const fmt = formatTodoItemName(o._name, o._displayPrice, s.entity, config, hass);
          return parseMultiplier(fmt).base.toLowerCase();
        })
      );
      rawList.forEach((todo) => {
        const baseLower = todo.base.toLowerCase();
        const matchesStore = label ? baseLower.includes(`(${label})`) : false;
        if ((matchesStore || config.entities.length === 1) && !sensorNames.has(baseLower)) {
          let cleanName = todo.base;
          if (label) cleanName = cleanName.replace(new RegExp(`\\s*\\(${label}\\)`, 'i'), '').trim();
          customStoreTodoItems[s.entity].push(
            normalizeOffer(
              {
                title: cleanName,
                category: localize('default.custom_items', hass),
                price: '',
                _isCustom: true
              },
              s.entity,
              hass,
              s
            )
          );
        }
      });
    });
    return { counts, customStoreTodoItems };
  } catch (err) {
    console.error('Failed to fetch todo list:', err);
    return { counts: {}, customStoreTodoItems: {} };
  }
}

export async function updateTodoQuantity(hass, config, itemName, itemPrice = '', mode = 'inc', customCount = null, entityId = '') {
  if (!hass) return;
  const formattedItemName = formatTodoItemName(itemName, itemPrice, entityId, config, hass);
  const todoEntity = config.todo?.todo_entity;
  const target = parseMultiplier(formattedItemName);
  try {
    if (todoEntity) {
      const res = await hass.callWS({ type: 'todo/item/list', entity_id: todoEntity });
      const items = res?.items || [];
      const existing = items.find(
        (i) => i.status !== 'completed' && parseMultiplier(i.summary).base.toLowerCase() === target.base.toLowerCase()
      );
      if (existing) {
        const current = parseMultiplier(existing.summary);
        let nextCount = mode === 'inc' ? current.count + 1 : mode === 'dec' ? current.count - 1 : customCount;
        if (nextCount <= 0) {
          await hass.callService('todo', 'remove_item', { entity_id: todoEntity, item: [existing.uid] });
        } else {
          const newSummary = nextCount > 1 ? `${nextCount}x ${current.base}` : current.base;
          await hass.callService('todo', 'update_item', { entity_id: todoEntity, item: existing.uid, rename: newSummary });
        }
      } else if (mode === 'inc' || (mode === 'set' && customCount > 0)) {
        const count = mode === 'set' ? customCount : 1;
        await hass.callService('todo', 'add_item', {
          entity_id: todoEntity,
          item: count > 1 ? `${count}x ${target.base}` : target.base
        });
      }
    } else {
      const items = (await hass.callWS({ type: 'shopping_list/items' })) || [];
      const existing = items.find(
        (i) => !i.complete && parseMultiplier(i.name).base.toLowerCase() === target.base.toLowerCase()
      );
      if (existing) {
        const current = parseMultiplier(existing.name);
        let nextCount = mode === 'inc' ? current.count + 1 : mode === 'dec' ? current.count - 1 : customCount;
        if (nextCount <= 0) {
          await hass.callWS({ type: 'shopping_list/remove_item', item_id: existing.id });
        } else {
          const newName = nextCount > 1 ? `${nextCount}x ${current.base}` : current.base;
          await hass.callWS({ type: 'shopping_list/update_item', item_id: existing.id, name: newName });
        }
      } else if (mode === 'inc' || (mode === 'set' && customCount > 0)) {
        const count = mode === 'set' ? customCount : 1;
        await hass.callService('shopping_list', 'add_item', {
          name: count > 1 ? `${count}x ${target.base}` : target.base
        });
      }
    }
  } catch (err) {
    console.error('Failed to update shopping list item quantity:', err);
  }
}

export async function clearStoreTodoItems(hass, config, storeEntity, storeOffers, customOffers) {
  if (!hass || !config.todo?.todo_enabled) return;
  const allStoreOffers = [...storeOffers, ...customOffers];
  const storeKeys = new Set(
    allStoreOffers.map((item) => {
      const formattedName = formatTodoItemName(item._name, item._displayPrice, storeEntity, config, hass);
      return parseMultiplier(formattedName).base.toLowerCase();
    })
  );
  const todoEntity = config.todo?.todo_entity;
  try {
    if (todoEntity) {
      const res = await hass.callWS({ type: 'todo/item/list', entity_id: todoEntity });
      const uidsToRemove = (res?.items || [])
        .filter((i) => i.status !== 'completed' && storeKeys.has(parseMultiplier(i.summary).base.toLowerCase()))
        .map((i) => i.uid);
      if (uidsToRemove.length > 0) {
        await hass.callService('todo', 'remove_item', { entity_id: todoEntity, item: uidsToRemove });
      }
    } else {
      const items = (await hass.callWS({ type: 'shopping_list/items' })) || [];
      const toRemove = items.filter((i) => !i.complete && storeKeys.has(parseMultiplier(i.name).base.toLowerCase()));
      for (const item of toRemove) {
        await hass.callWS({ type: 'shopping_list/remove_item', item_id: item.id });
      }
    }
  } catch (err) {
    console.error('Failed to clear store shopping list items:', err);
  }
}
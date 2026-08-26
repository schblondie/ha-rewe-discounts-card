# discounts-card
A Lovelace card for Home Assistant to browse weekly supermarket discounts, compare offers across multiple stores, and sync items to your shopping list.

## Requirements

Requires one or more of the following integrations:
- [REWE Discounts Integration](https://github.com/FaserF/ha-rewe)
- [Edeka Discounts Integration](https://github.com/FaserF/ha-edeka)
- [Lidl Discounts Integration](https://github.com/FaserF/ha-lidl)
- [Aldi Discounts Integration](https://github.com/FaserF/ha-aldi)
- [Norma Discounts Integration](https://github.com/FaserF/ha-norma)

## Features

- **Multi-Store Support**: Configure multiple supermarkets and switch or combine views via header dropdown.
- **Store Sorting & Management**: Reorder stores via drag-and-drop in GUI editor.
- **Custom Items**: Add store-tagged custom items directly to your shopping list.
- **Store Clear**: One-click cleanup of items per supermarket.
- **Search & Filter**: Live product search grouped by supermarket and category.
- **To-Do / Shopping List Integration**: Quantity controls (+ / - / exact amount prompt) and dedicated list-only filter view.
- **Collapsible Categories**: Custom default open/closed states and layout modes (keep, always open, flat list).

## Installation

### HACS (Recommended)

1. Open HACS > **Custom repositories**.
2. Add `https://github.com/schblondie/discounts-card` with category `Lovelace`.
3. Search for **Discounts Card** and click **Download**.
4. Add card via UI editor or YAML dashboard.

---

## Configuration

### Main Options

| Name | Type | Requirement | Default | Description |
|---|---|---|---|---|
| `type` | string | **Required** | | `custom:discounts-card` |
| `entities` | list | **Required** | | List of supermarket sensor objects (or entity IDs) |
| `title` | string | **Optional** | | Card header title override |
| `show_images` | boolean | **Optional** | `true` | Show product images (falls back to placeholder icon on missing/broken images) |
| `enable_search` | boolean | **Optional** | `true` | Show search bar |
| `collapsible_categories` | boolean | **Optional** | `true` | Enable expandable category groups |
| `categories_open_by_default` | boolean | **Optional** | `true` | Expand categories on initial load |
| `filter` | object | **Optional** | | Category filter configuration |
| `todo` | object | **Optional** | | Shopping list integration options |

### `entities` Object Structure

| Name | Type | Requirement | Default | Description |
|---|---|---|---|---|
| `entity` | string | **Required** | | Sensor entity ID (e.g. `sensor.rewe_offers`) |
| `title` | string | **Optional** | | Custom name override for the store |
| `default_selected` | boolean | **Optional** | `true` | Preselect store on load |

### `filter` Options

| Name | Type | Requirement | Default | Description |
|---|---|---|---|---|
| `filter_mode` | string | **Optional** | `none` | Filter mode: `none`, `blacklist`, or `whitelist` |
| `filter_categories` | list | **Optional** | `[]` | List of category names to include/exclude |

### `todo` Options

| Name | Type | Requirement | Default | Description |
|---|---|---|---|---|
| `todo_enabled` | boolean | **Optional** | `false` | Enable shopping list buttons & badges |
| `todo_entity` | string | **Optional** | | Target `todo` entity ID (defaults to HA Shopping List integration if omitted) |
| `todo_price` | boolean | **Optional** | `false` | Append price to item summary |
| `only_show_todo` | boolean | **Optional** | `false` | Filter list to show only items currently on shopping list |
| `category_layout` | string | **Optional** | `keep` | Layout mode when filtering by shopping list: `keep`, `always_open`, or `flat` |

> **Note on Backward Compatibility**: Legacy single-sensor format (`entity: sensor.rewe`), root-level `category_filter_mode`, `category_filter_categories`, `enable_todo`, and `todo_entity` remain fully supported.

---

## Examples

### Multi-Store Setup with Shopping List

```yaml
type: custom:discounts-card
title: Wochenangebote
entities:
  - entity: sensor.rewe_offers
    title: REWE
    default_selected: true
  - entity: sensor.edeka_offers
    title: Edeka
    default_selected: true
  - entity: sensor.norma_offers
    title: Norma
    default_selected: false
show_images: true
enable_search: true
collapsible_categories: true
categories_open_by_default: true
filter:
  filter_mode: blacklist
  filter_categories:
    - Non-Food
    - Tabakwaren
todo:
  todo_enabled: true
  todo_entity: todo.einkaufsliste
  todo_price: false
  only_show_todo: false
  category_layout: keep
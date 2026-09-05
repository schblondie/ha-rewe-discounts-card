# discounts-card
A Lovelace card for Home Assistant to browse weekly supermarket discounts, compare offers across multiple stores, and sync items to your shopping list.

Supports both **Visual UI Editor (GUI)** and **Manual YAML Configuration**.

---
![Card Overview](/pictures/card.png)
## Features
* Having multiple supermarkets combined in one card
* Search trough offers (of multiple) supermarkets
* Ability to add items to a shopping list (can be enabled/disabled)
* When the supermarket provides categories:
  * Black/Whitelisting categories (via pattern, regex or provided categories)
  * Grouping categories together (via pattern, regex or provided categories)
  

### Shopping List
![Shopping List](/pictures/shopping_list.png)


## Requirements

Requires one or more discount sensor integrations:
- [REWE Discounts Integration](https://github.com/FaserF/ha-rewe)
- [Edeka Discounts Integration](https://github.com/FaserF/ha-edeka)
- [Lidl Discounts Integration](https://github.com/FaserF/ha-lidl)
- [Aldi Discounts Integration](https://github.com/FaserF/ha-aldi)
- [Norma Discounts Integration](https://github.com/FaserF/ha-norma)

## Features

- **Full GUI Editor**: Configure stores, reorder with drag & drop, select categories, and manage groups without touching YAML.
- **Multi-Store Switcher**: Toggle individual supermarkets or merge all stores in a unified view.
- **Subcategory Stripping**: Define delimiter (e.g. ` - `) to strip subcategories and prevent split duplicates.
- **Category Merging (Groups)**: Combine related categories (e.g. juices + soda into "Getränke").
- **Regex & Pattern Filtering**: Blacklist or whitelist by exact category, substring (`Includes: x`), or regex (`Regex: x`).
- **Default Currency Fallback**: Fix missing price units (e.g. Edeka sensor offers missing `€`).
- **Shopping List / Todo Sync**: Increment, decrement, or set custom item quantities; add store-tagged manual items; clear per store.
- **Search & Filter**: Real-time offer search by product, brand, or category.

---

## Installation

### HACS (Recommended)

1. Open HACS > **Custom repositories**.
2. Add repository `https://github.com/schblondie/discounts-card` with category `Dashboard` (or `Lovelace`).
3. Search for **Discounts Card** and click **Download**.
4. Reload browser. Add via UI card picker or Dashboard YAML.

---

## GUI Editor Setup

1. Click **Edit Dashboard** > **Add Card** > **Discounts Card**.
2. Expand **Stores** to add, remove, or reorder supermarkets via drag & drop.
3. Set **Default Currency** (e.g. `€`) and **Subcategory Separator** (e.g. ` - `) per store.
4. Use **Add filter** to append pattern filters (`Includes: ...` or `Regex: ...`) directly to category dropdown.
5. Click **Add Category Group** to merge multiple categories under a custom parent category.

<!-- Screenshot 3: Category Groups Editor -->
<!-- Suggested Screenshot: Expanded "Category Groups" section showing a group with name "Getränke" and member chips -->
### Editor
![Discounts Card Overview](/pictures/editor.png)

## YAML Configuration

### Main Card Options

| Name                         | Type    | Requirement  | Default | Description                                    |
| ---------------------------- | ------- | ------------ | ------- | ---------------------------------------------- |
| `type`                       | string  | **Required** |         | `custom:discounts-card`                        |
| `entities`                   | list    | **Required** |         | List of store configurations (see table below) |
| `title`                      | string  | **Optional** |         | Card header title override                     |
| `show_images`                | boolean | **Optional** | `true`  | Show product images                            |
| `enable_search`              | boolean | **Optional** | `true`  | Show search bar                                |
| `collapsible_categories`     | boolean | **Optional** | `true`  | Allow collapsing category sections             |
| `categories_open_by_default` | boolean | **Optional** | `true`  | Open category groups on card load              |
| `todo`                       | object  | **Optional** |         | Shopping list integration config               |

---

### `entities` Store Object

| Name                    | Type    | Requirement  | Default | Description                                              |
| ----------------------- | ------- | ------------ | ------- | -------------------------------------------------------- |
| `entity`                | string  | **Required** |         | Sensor entity ID (e.g. `sensor.edeka_offers`)            |
| `title`                 | string  | **Optional** |         | Display name override                                    |
| `default_selected`      | boolean | **Optional** | `true`  | Select store on initial card load                        |
| `default_currency`      | string  | **Optional** | `""`    | Fallback currency if sensor omits unit (e.g. `€`)        |
| `subcategory_separator` | string  | **Optional** | `""`    | Delimiter to extract top-level category (e.g. ` - `)     |
| `filter_mode`           | string  | **Optional** | `none`  | `none`, `blacklist`, or `whitelist`                      |
| `filter_categories`     | list    | **Optional** | `[]`    | Exact categories, `Includes: <str>`, or `Regex: <regex>` |
| `category_groups`       | list    | **Optional** | `[]`    | Custom groups combining categories (see below)           |

---

### `category_groups` Object

| Name      | Type   | Requirement  | Default | Description                                                                           |
| --------- | ------ | ------------ | ------- | ------------------------------------------------------------------------------------- |
| `name`    | string | **Required** |         | Display name for the merged category                                                  |
| `members` | list   | **Required** | `[]`    | Categories to combine. Accepts exact names, `Includes: <text>`, or `Regex: <pattern>` |

---

### Category Filter & Group Patterns

Categories in `filter_categories` and `category_groups.members` support 3 formats:

- **Exact Match**: `Fleisch & Geflügel`
- **Substring Match**: `Includes: textil` (matches `Damen-Textilien`, `Heimtextilien`, etc.)
- **Regex Match**: `Regex: ^(Bio|Obst).*` or `/^Bio/i`

---

### `todo` Options

| Name              | Type    | Requirement  | Default | Description                                                                                   |
| ----------------- | ------- | ------------ | ------- | --------------------------------------------------------------------------------------------- |
| `todo_enabled`    | boolean | **Optional** | `false` | Enable shopping list counter & sync buttons                                                   |
| `todo_entity`     | string  | **Optional** |         | Target `todo` entity (e.g. `todo.shopping_list`). Defaults to native Shopping List if omitted |
| `todo_price`      | boolean | **Optional** | `false` | Append price to item summary on todo list                                                     |
| `only_show_todo`  | boolean | **Optional** | `false` | Default card view to shopping list items only                                                 |
| `category_layout` | string  | **Optional** | `keep`  | Shopping list view layout: `keep`, `always_open`, or `flat`                                   |

---

## Full Example (YAML)

```yaml
type: custom:discounts-card
title: Wochenangebote
entities:
  - entity: sensor.edeka_offers
    title: EDEKA
    default_selected: true
    default_currency: "€"
    subcategory_separator: " - "
    filter_mode: blacklist
    filter_categories:
      - "Non-Food"
      - "Includes: drogerie"
      - "Regex: ^Tabak.*"
    category_groups:
      - name: "Getränke & Säfte"
        members:
          - "Erfrischungsgetränke"
          - "Includes: saft"
          - "Regex: ^(Bier|Wein).*"

  - entity: sensor.aldi_nord_offers
    title: ALDI Nord
    default_selected: true
    subcategory_separator: " - "
    filter_mode: whitelist
    filter_categories:
      - "Obst & Gemüse"
      - "Frische & Kühlung"

  - entity: sensor.rewe_offers
    title: REWE
    default_selected: false

show_images: true
enable_search: true
collapsible_categories: true
categories_open_by_default: false

todo:
  todo_enabled: true
  todo_entity: todo.einkaufsliste
  todo_price: true
  only_show_todo: false
  category_layout: flat
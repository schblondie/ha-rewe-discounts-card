# discounts-card
A card to display the discounts from the REWE or Edeka sensor with the ability to add them to the shopping list.

## Requirements

Requires the [REWE Discounts Integration](https://github.com/FaserF/ha-rewe) and/or [Edeka Discounts Integration](https://github.com/FaserF/ha-edeka) to be installed and configured.

## Installation

If you have [HACS](https://hacs.xyz/), you can install this card by adding this repository to the custom repositories in the HACS settings.

1. Add `https://github.com/schblondie/ha-rewe-discounts-card` as a custom repository in HACS.

2. Install the `Discounts Card` from the HACS store.

3. Add the card to your Lovelace configuration.

## Configuration

This card shows as addable card in the Lovelace configuration.

### Options

| Name            | Type    | Requirement  | Default | Description                                                                                                                                                                       |
| --------------- | ------- | ------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`          | string  | **Required** |         | `custom:discounts-card`                                                                                                                                                           |
| `entity`        | string  | **Required** |         | Discount sensor (`sensor.rewe_` or `sensor.edeka_`)                                                                                                                                             ||
| `show_images`                  | boolean | **Optional** | `true`  | Show product images or text placeholders when `picture_link` is missing                                                                                                           |
| `enable_search`                | boolean | **Optional** | `true`  | Show the live search bar                                                                                                                                                           |
| `collapsible_categories`       | boolean | **Optional** | `true`  | Allow categories to be collapsed                                                                                                                                                  |
| `categories_open_by_default`   | boolean | **Optional** | `true`  | Open categories by default                                                                                                                                                         |
| `category_filter_mode`         | string  | **Optional** | `none`   | Category filtering mode: `none`, `blacklist`, or `whitelist`                                                                                                                     |
| `category_filter_categories`   | list    | **Optional** | `[]`    | Categories used by the selected filter mode                                                                                                                                       |
| `enable_todo`                  | boolean | **Optional** | `false` | Show buttons for adding products to a todo list                                                                                                                                   |
| `todo_entity`                  | string  | **Optional** |         | Todo entity to use; otherwise the default shopping list is used                                                                                                                  |

Category names are loaded from the configured entity for the GUI editor. They can also be entered directly in YAML.
### Shopping list

| Name            | Type    | Requirement  | Default | Description                                                                                                                                                                       |
| --------------- | ------- | ------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | 
| `enable_todo`   | boolean | **Optional** | `false` | Show buttons for adding products to a todo list                                                                                                                                   |
| `todo_entity`   | string  | **Optional** |         | Todo entity to use; otherwise the default Home Assistant shopping list is used                                                                                                   |
| `logo`     | boolean | **Optional** | `true`  | Show the name of the supermarket behind the product in the shopping list                                                                                                                               |
| `price`         | boolean | **Optional** | `false` | Show the price of the product in the shopping list                                                                                                                                |

Legacy `show.rewe_logo` and `show.price` are still supported for backward compatibility. Legacy `show.border` is not supported.

### Example

```yaml
type: custom:discounts-card
entity: sensor.rewe_4040708
show_images: true
categories_open_by_default: false
category_filter_mode: blacklist
category_filter_categories:
  - Top-Angebote in deinem Markt
enable_todo: true
todo_entity: todo.shopping_list

```

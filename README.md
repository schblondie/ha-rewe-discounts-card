# ha-rewe-discounts-card
A card to display the discounts from the REWE sensor with the ability to add them to the shopping list.

## Requirements

Requires the [REWE Discounts Integration](https://github.com/FaserF/ha-rewe) to be installed and configured.

## Installation

If you have [HACS](https://hacs.xyz/), you can install this card by adding this repository to the custom repositories in the HACS settings.

1. Add `https://github.com/schblondie/ha-rewe-discounts-card` as a custom repository in HACS.

2. Install the `REWE Discounts Card` from the HACS store.

3. Add the card to your Lovelace configuration.

## Configuration

This card shows as addable card in the Lovelace configuration. You can add it to your Lovelace configuration and configure it from there.
The card has a rudimentary GUI configuration. You can configure it from there.
I'm working on better GUI following the Lovelace style guide.

### Options

| Name            | Type    | Requirement  | Default | Description                                                                                                                                                                       |
| --------------- | ------- | ------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`          | string  | **Required** |         | `custom:discounts-card`                                                                                                                                                           |
| `entity`        | string  | **Required** |         | Rewe discount sensor (`sensor.rewe_`)                                                                                                                                             |
| `shopping_list` | string  | **Required** |         | Shopping list to add items to                                                                                                                                                     |
| `language`      | string  | **Optional** | `de`    | Language of the card (en, de)                                                                                                                                                     |
| `color`         | string  | **Optional** | #4CAF50 | Color of the add to shopping list button (HEX or string)                                                                                                                          |
| `show`          | object  | **Optional** |         | See [Show](#show)                                                                                                                                                                 |
| `exclude`       | list    | **Optional** |         | List of product categories to be excluded from the list                                                                                                                           |
### Show

| Name            | Type    | Requirement  | Default | Description                                                                                                                                                                       |
| --------------- | ------- | ------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `border`        | boolean | **Optional** | `true`  | Show border around the products                                                                                                                                                   |
| `rewe_logo`     | boolean | **Optional** | `true`  | Show (Rewe) behind the product in the shopping list                                                                                                                               |
| `price`         | boolean | **Optional** | `false` | Show the price of the product in the shopping list                                                                                                                                |

### Example

```yaml
type: custom:discounts-card
entity: sensor.rewe_4040708
shopping_list: todo.shopping_list
color: ''
language: de
show:
  border: true
  rewe: true
  price: false

```

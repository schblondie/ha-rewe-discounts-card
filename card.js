class CustomProductCard extends HTMLElement {

    static getConfigElement() {
        return document.createElement('discounts-card-editor');
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    setConfig(config) {
        // Create a new object to store the modified configuration
        const newConfig = Object.assign({}, config);
        newConfig.type = 'custom:discounts-card';
        if (!newConfig.entity || !newConfig.entity.startsWith('sensor.rewe')) {
            throw new Error('You need to specify the entity of the REWE sensor.');
        }
        if (!newConfig.shopping_list || !newConfig.shopping_list.startsWith('todo.')) {
            throw new Error('You need to specify the entity of the shopping list.');
        }
        if (!newConfig.color) {
            newConfig.color = '#4CAF50'; // Default color
        }
        if (!newConfig.language) {
            newConfig.language = 'de'; // Default language
        }       
        if (!newConfig.show) {
            newConfig.show = {};
            newConfig.show.border = true;
            newConfig.show.rewe = true;
            newConfig.show.price = false;
        }
        this.config = newConfig;
    }

    getRoot() {
        let element = this;
        while (element.ownerDocument) {
            element = element.ownerDocument
            if (!element.ownerDocument) {
                return element;
            }
        }
        return null;
    }

    async fetchData() {
        try {
            if (!this.hass) {
                throw new Error('Home Assistant object is not available.');
            }
            const stateObj = this.hass.states[this.config.entity];
            if (!stateObj) {
                throw new Error('Entity not found.');
            }
            const attributes = stateObj.attributes;
            const discountList = attributes['discounts'];
            if (!discountList || !Array.isArray(discountList)) {
                throw new Error('The discount list attribute is not found or is not an array.');
            }
            this.render(discountList);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    render(products) {
        const categories = {};

        products.forEach(product => {
            let category = product.category || 'Keine Kategorie';
            // Replace '-' with space and capitalize first letter of each word
            category = category.replace(/-/g, ' ').replace(/\b(?!und)\w/g, l => l.toUpperCase());
            // Replace 'ue', 'ae', 'oe' with their corresponding umlaut characters
            category = category.replace(/ue/g, 'ü').replace(/ae/g, 'ä').replace(/oe/g, 'ö');
            if (!categories[category]) {
                categories[category] = {
                    products: [],
                    image: product.picture_link // Store the first product image as category image
                };
            }
            categories[category].products.push(product);
        });

        const template = document.createElement('template');
        template.innerHTML = `
        <style>
        .product-card {
            margin-top: 20px;
        }
        .category {
            margin-bottom: 20px;
        }
        .category-title {
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            font-size: 20px;
        }
        .products {
            margin-top: 10px;
            display: none;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            grid-gap: 10px;
        }
        .products.active {
            display: grid;
        }
        .product {
            border: ${this.config.show.border ? '1px solid #f0f0f0' : 'none'};
            border-radius: 20px;
            padding: 10px;
            display: flex;
            flex-direction: column;
        }
        .product-title {
            font-weight: bold;
            align-self: center;
            text-align: center;
            display: flex;
            justify-content: center;
        }
        .product-img {
            align-self: center;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        .product-price {
            font-weight: bold;
            color: ${this.config.color};
        }
        .product-button {
            margin-top: auto;
            padding: 5px 10px;
            border-radius: 5px;
            background-color: ${this.config.color};
            color: white;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .product-price-box {
            background-color: #f0f0f0; /* Different color for the price box */
            padding: 3px 8px;
            border-radius: 3px;
            color: ${this.config.color};
        }
        .category-image {
            width: 50px; /* Adjust image size as needed */
            height: 50px;
            margin-right: 10px; /* Add spacing between image and text */
        }
    </style>

    <div class="product-card">
        ${Object.entries(categories).map(([category, { products, image }]) => `
            <div class="category">
                <div class="category-title">
                    <img class="category-image" src="${image}" alt="${category}"> ${category}
                </div>
                <div class="products">
                ${products.map(product => `
                    <div class="product">
                        <div class="product-title">${product.product}</div>
                        <div class="product-img">
                            <img src="${product.picture_link}" alt="${product.product}" width="100">
                        </div>
                        <button class="product-button" data-name="${product.product}${this.config.show.rewe === true ? ' (REWE)' : ''}${this.config.show.price === true ? ` [${product.price}€]` : ''}">
                            ${this.config.language === 'de' ? 'Zum Einkaufszettel hinzufügen' : 'Add to shopping list'}
                            <span class="product-price-box">${product.price}€</span> <!-- Price in a separate box -->
                        </button>
                    </div>
                `).join('')}
                </div>
            </div>
        `).join('')}
    </div>

        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.addListeners();
    }


    addListeners() {
        const buttons = this.shadowRoot.querySelectorAll('button');
        const categoryTitles = this.shadowRoot.querySelectorAll('.category-title');
        categoryTitles.forEach(title => {
            title.addEventListener('click', () => {
                title.nextElementSibling.classList.toggle('active');
            });
        });
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.getAttribute('data-name');
                const shoppingList = this.config.shopping_list;

                this.hass.callService(
                    'todo', 
                    'add_item',
                    {
                        entity_id: shoppingList,
                        item: productName
                    },
                );
                console.log(`Added ${productName} to ${shoppingList} shopping list.`);
            });
        });
    }

    connectedCallback() {
        this.addEventListener('config-changed', (event) => {
            this.setConfig(event.detail.config);
        });
        if (!this.rendered) {
            this.fetchData();
            this.rendered = true;
        }
    }
}

customElements.define('discounts-card', CustomProductCard);


class CustomProductCardEditor extends HTMLElement {
    setConfig(config) {
        // Create GUI for configuring the custom card
        this.config = config;
        this.render();
    }

    static getStubConfig() {
        return {
            color: '#4CAF50',
            language: 'de',
            show: {
                border: true,
                rewe: true,
                price: false
            }
        };
    }
    configChanged(newConfig) {
        const event = new Event("config-changed", {
            bubbles: true,
            composed: true,
        });
        event.detail = { config: this.getConfig() };
        this.dispatchEvent(event);
    }

    getConfig() {
        return {
            type: 'custom:discounts-card',
            entity: this.querySelector("#entityInput").value,
            shopping_list: this.querySelector("#shoppingListInput").value,
            color: this.querySelector("#colorInput").value,
            language: this.querySelector("#languageInput").value,
            show: {
                border: this.querySelector("#toggleBorder").checked,
                rewe: this.querySelector("#toggleStoreInfo").checked,
                price: this.querySelector("#togglePriceInfo").checked
            },
        };
    }

    static getConfigElement() {
        return document.createElement('div');
    }

    render() {
        this.innerHTML = `
            <style>
                /* Define Home Assistant style */
                :host {
                    display: block;
                    padding: 8px;
                    font-size: 14px;
                    font-family: var(--paper-font-body1_-_font-family);
                    color: var(--primary-text-color);
                }
                label {
                    display: block;
                    margin-bottom: 4px;
                }
                input[type="text"], input[type="checkbox"] {
                    margin-bottom: 8px;
                }
            </style>
            <label for="entityInput">Entity:</label>
            <input id="entityInput" type="text" value="${this.config.entity || ''}">
            <br>
            <label for="shoppingListInput">Shopping List:</label>
            <input id="shoppingListInput" type="text" value="${this.config.shopping_list || ''}">
            <br>
            <label for="colorInput">Color:</label>
            <input id="colorInput" type="text" value="${this.config.color || ''}">
            <br>
            <label for="languageInput">Language:</label>
            <select id="languageInput" type="text" value="${this.config.language || ''}">
                <option value="de">German</option>
                <option value="en">English</option>
            </select>
            <label for="toggleBorder">Show border around products</label>
            <input id="toggleBorder" type="checkbox" ${this.config.show.border ? 'checked' : ''}>
            <br>
            <label for="toggleStoreInfo">Show (Rewe) after product in shopping list </label>
            <input id="toggleStoreInfo" type="checkbox" ${this.config.show.rewe ? ' checked' : ''}>
            <br>
            <label for="togglePriceInfo">Show price in shopping list</label>
            <input id="togglePriceInfo" type="checkbox" ${this.config.show.price ? ' checked' : ''}>
            <br>
        `;
        this.querySelector("#entityInput").addEventListener('input', () => this.configChanged());
        this.querySelector("#shoppingListInput").addEventListener('input', () => this.configChanged());
        this.querySelector("#colorInput").addEventListener('input', () => this.configChanged());
        this.querySelector("#languageInput").addEventListener('input', () => this.configChanged());
        this.querySelector("#toggleBorder").addEventListener('change', () => this.configChanged());
        this.querySelector("#toggleStoreInfo").addEventListener('change', () => this.configChanged());
        this.querySelector("#togglePriceInfo").addEventListener('change', () => this.configChanged());
    }
}

customElements.define('discounts-card-editor', CustomProductCardEditor);
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'discounts-card',
    name: 'Discounts Card',
    preview: './preview.png',
    description: 'A card to display the discounts from the REWE sensor and add them to the shopping list.',
});
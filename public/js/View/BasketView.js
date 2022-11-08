import ItemView from "../View/ItemView.js";

class BasketView {
    #items;
    #itemsDiv;
    #total = 0;

    constructor(itemList, parentElemName) {
        let parentElem = $(parentElemName);
        parentElem.empty();
        parentElem.append(`<div id="items"></div>`);
        this.#itemsDiv = $("#items");

        this.#items = [];
        itemList.forEach((item, x) => {
            this.#items.push(new ItemView(item, this.#itemsDiv));
            this.#total += item.price * item.amount;
        });

        parentElem.append(`<div id="itotal"><p>Total: ${this.#total} Ft</p></div>`);
    }
}

export default BasketView;
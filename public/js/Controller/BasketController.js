import BasketModel from "../Model/BasketModel.js";
import BasketView from "../View/BasketView.js";

class BasketController {
    #model;

    constructor() {
        this.#model = new BasketModel();

        $("#basket").on("click", ()=>{
            this.showBasket();
        });
    }

    showBasket() {
        let items = this.#model.getDisplayItems();
        new BasketView(items, "main");
    }

    addItem(item) {
        this.#model.addItem(item.id);
    }

    decreaseItem(item) {
        this.#model.decreaseItem(item.id);
    }

    removeItem(item) {
        this.#model.removeItem(item.id);
    }

    updateDisplayItems(books) {
        this.#model.updateDisplayItems(books);
    }
}

export default BasketController;
class ItemView {
    #item
    #div
    #decreaseButton
    #unbuyButton

    constructor(book, pElement) {
        this.#item = book;
        console.log(this.#item);
        pElement.append(`
        <div class="item">
            <h3>${this.#item.title}</h3><br>
            <h4>${this.#item.author}</h4><br>
            <p>${this.#item.price} Ft x ${this.#item.amount} =</p><br>
            <p>${this.#item.price * this.#item.amount} Ft</p><br>
            <button id="decrease${this.#item.id}">Remove</button><button id="unbuy${this.#item.id}">Remove All</button>
        </div>
        `);

        this.#div = pElement.children(".item:last-child");
        this.#decreaseButton = $(`#decrease${this.#item.id}`);
        this.#unbuyButton = $(`#unbuy${this.#item.id}`);


        this.#decreaseButton.on("click", () => {
            this.clickDecreaseButtonEvent();
        })

        this.#unbuyButton.on("click", () => {
            this.clickUnbuyButtonEvent();
        })
    }

    clickDecreaseButtonEvent() {
        window.dispatchEvent(
            new CustomEvent("decrease", {detail:(this.#item)})
        );
    }

    clickUnbuyButtonEvent() {
        window.dispatchEvent(
            new CustomEvent("unbuy", {detail:(this.#item)})
        );
    }
}

export default ItemView;
class BookUserView {
    #book
    #div
    #buyButton

    constructor(book, pElement, x) {
        this.#book = book;
        console.log(this.#book);
        pElement.append(`
        <div class="book">
            <h3>${this.#book.title}</h3><br>
            <h4>${this.#book.author}</h4><br>
            <p>${this.#book.price} Ft</p><button id="buy${this.#book.id}">Buy</button>
        </div>
        `);

        this.#div = pElement.children(".book:last-child");
        this.#buyButton = $(`#buy${this.#book.id}`);


        this.#buyButton.on("click", () => {
            this.clickBuyButtonEvent();
        })
    }

    clickBuyButtonEvent() {
        window.dispatchEvent(
            new CustomEvent("buy", {detail:(this.#book)})
        );
    }
}

export default BookUserView;
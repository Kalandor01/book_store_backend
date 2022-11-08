
class BookAdminView {
    #book;
    #row;
    #modButton;
    #delButton;
    #finishModButton;
    #finishNewButton;
    #cancelButton;

    constructor(book, pElement, x) {
        this.#book = book;
        this.#book.x = x;
        // console.log(this.#book);
        pElement.append(`<tr>
        <td>${this.#book.id}</td>
        <td>${this.#book.title}</td>
        <td>${this.#book.author}</td>
        <td>${this.#book.price}</td>
        <td><button id="mod${this.#book.id}">Edit</button></td>
        <td><button id="del${this.#book.id}">Delete</button></td>
        </tr>`);

        this.#row = pElement.children("tr:last-child");
        this.#modButton = $(`#mod${this.#book.id}`);
        this.#delButton = $(`#del${this.#book.id}`);


        this.#modButton.on("click", () => {
            this.clickModButtonEvent();
        })

        this.#delButton.on("click", () => {
            this.clickDelButtonEvent();
        })
    }

    clickModButtonEvent() {
        window.dispatchEvent(
            new CustomEvent("mod", {detail:(this.#book)})
        );
    }

    clickFinModButtonEvent() {
        //prepare data
        this.#book.title = $(`input[name="title"]`).val();
        this.#book.author = $(`input[name="author"]`).val();
        this.#book.price = $(`input[name="price"]`).val();

        window.dispatchEvent(
            new CustomEvent("finmod", {detail:(this.#book)})
        );
    }

    clickFinNewButtonEvent() {
        //prepare data
        this.#book.id = $(`input[name="id"]`).val();
        this.#book.title = $(`input[name="title"]`).val();
        this.#book.author = $(`input[name="author"]`).val();
        this.#book.price = $(`input[name="price"]`).val();

        window.dispatchEvent(
            new CustomEvent("finnew", {detail:(this.#book)})
        );
    }

    clickCancelButtonEvent() {
        window.dispatchEvent(
            new CustomEvent("cancel", {})
        );
    }

    clickDelButtonEvent() {
        window.dispatchEvent(
            new CustomEvent("del", {detail:(this.#book)})
        );
    }

    getBook()
    {
        return this.#book;
    }

    editMode() {
        this.#row.empty();
        this.#row.append(`
        <td>${this.#book.id}</td>
        <td><input type="text" name="title" value="${this.#book.title}"></td>
        <td><input type="text" name="author" value="${this.#book.author}"></td>
        <td><input type="number" name="price" value="${this.#book.price}"></td>
        <td><button id="finMod${this.#book.id}">Finish edit</button></td>
        <td><button id="cancel">Cancel</button></td>
        `);

        this.#finishModButton = $(`#finMod${this.#book.id}`);
        this.#cancelButton = $(`#cancel`);

        this.#finishModButton.on("click", () => {
            this.clickFinModButtonEvent();
        })

        this.#cancelButton.on("click", () => {
            this.clickCancelButtonEvent();
        })
    }

    newMode() {
        this.#row.empty();
        this.#row.append(`
        <td><input type="text" name="id"></td>
        <td><input type="text" name="title"></td>
        <td><input type="text" name="author"></td>
        <td><input type="number" name="price"></td>
        <td><button id="new">Create</button></td>
        <td><button id="cancel">Cancel</button></td>
        `);

        this.#finishNewButton = $(`#new`);
        this.#cancelButton = $(`#cancel`);

        this.#finishNewButton.on("click", () => {
            this.clickFinNewButtonEvent();
        })

        this.#cancelButton.on("click", () => {
            this.clickCancelButtonEvent();
        })
    }
}

export default BookAdminView;
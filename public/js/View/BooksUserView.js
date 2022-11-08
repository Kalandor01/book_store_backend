import BookUserView from "../View/BookUserView.js";

class BooksUserView {
    #booksDiv
    #books

    constructor(booksList, parentElemName) {
        let parentElem = $(parentElemName);
        parentElem.empty();
        parentElem.append(`<div id="books"></div>`);
        this.#booksDiv = $("#books");

        this.#books = [];
        booksList.forEach((book, x) => {
            this.#books.push(new BookUserView(book, this.#booksDiv, x));
        });
    }
}

export default BooksUserView;
import BooksAdminView from "../View/BooksAdminView.js";
import BooksUserView from "../View/BooksUserView.js";
import BookModel from "../Model/BookModel.js";
import BasketController from "../Controller/BasketController.js";

class BookController {
    #endpoint
    #bookModel
    #basket

    constructor() {
        const token = $('meta[name="csrf-token"]').attr("content");
        console.log(token);
        this.#endpoint = "/books";
        this.#bookModel = new BookModel(token);
        this.#basket = new BasketController();

        $("#admin").on("click", ()=>{
            this.#bookModel.getData(this.#endpoint, this.getBooksAdminData);
        });
        $("#public").on("click", ()=>{
            this.#bookModel.getData(this.#endpoint, this.getBooksUserData);
            // this.getBooksUserData(this.#bookModel.getBooks());
        });


        $(window).on("new", (evt) => {
            let books = this.#bookModel.getBooks();
            let view = new BooksAdminView(books, "main");
            view.newBook();
        })

        $(window).on("finnew", (evt) => {
            this.#bookModel.newBook(evt.detail);
            this.#bookModel.newData(this.#endpoint, evt.detail);
            //show books
            let books = this.#bookModel.getBooks();
            new BooksAdminView(books, "main");
        })

        $(window).on("mod", (evt) => {
            let books = this.#bookModel.getBooks();
            let view = new BooksAdminView(books, "main");
            view.editBook(evt.detail);
        })

        $(window).on("finmod", (evt) => {
            this.#bookModel.modBook(evt.detail);
            this.#bookModel.modData(this.#endpoint + "/" + evt.detail.id, evt.detail);
            //show books
            let books = this.#bookModel.getBooks();
            new BooksAdminView(books, "main");
        })

        $(window).on("cancel", (evt) => {
            this.#bookModel.cancel();
            //show books
            let books = this.#bookModel.getBooks();
            new BooksAdminView(books, "main");
        })

        $(window).on("del", (evt) => {
            this.#bookModel.delBook(evt.detail);
            this.#bookModel.delData(this.#endpoint + "/" + evt.detail.id);
            //show books
            let books = this.#bookModel.getBooks();
            new BooksAdminView(books, "main");
        })

        $(window).on("buy", (evt) => {
            this.#bookModel.buyBook(evt.detail);
            this.#basket.addItem(evt.detail);
            //update basket + show books
            let books = this.#bookModel.getBooks();
            this.#basket.updateDisplayItems(books);
            new BooksUserView(books, "main");
        })

        $(window).on("decrease", (evt) => {
            this.#bookModel.decreaseBook(evt.detail);
            this.#basket.decreaseItem(evt.detail);
            //show basket
            let books = this.#bookModel.getBooks();
            this.#basket.updateDisplayItems(books);
            this.#basket.showBasket();
        })

        $(window).on("unbuy", (evt) => {
            this.#bookModel.unbuyBook(evt.detail);
            this.#basket.removeItem(evt.detail);
            //show basket
            let books = this.#bookModel.getBooks();
            this.#basket.updateDisplayItems(books);
            this.#basket.showBasket();
        })
    }

    getBooksAdminData(bookList) {
        console.log(bookList);
        new BooksAdminView(bookList, "main");
    }

    getBooksUserData(bookList) {
        console.log(bookList);
        new BooksUserView(bookList, "main");
    }
}

export default BookController;

class BookModel {
    #token
    #booksList;

    constructor(token) {
        this.#token = token;
        this.#booksList = [];
    }

    getData(endPoint, callback) {
        fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': this.#token,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                this.#booksList = this.#processBooksData(data);
                // console.log(this.#booksList);
                callback(this.#booksList);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    #processBooksData(books) {
        let pBooks = []
        books.forEach(book => {
            pBooks.push({
                "id":book.id,
                "title":book.cim,
                "author":book.szerzo,
                "price":book.ar
            })
        });
        return pBooks
    }

    // setData(endPoint, callback) {
    //     fetch(endPoint, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(this.#booksList),
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log('Success:', data);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
    // }

    #findBook(bookId) {
        let bookIndex = -1;
        for (let x = 0; x < this.#booksList.length; x++)
        {
            if (this.#booksList[x].id == bookId) {
                bookIndex = x;
                break;
            }
        }
        return bookIndex;
    }

    getBooks() {
        return this.#booksList;
    }

    newBook(book) {
        let bookIndex = this.#findBook(book.id);
        if (bookIndex == -1)
        {
            this.#booksList.push(book);

            console.log("new " + book.id);
            console.log(book);
        }
        else
        {
            console.log("id already exists");
        }
    }

    modBook(book) {
        let bookIndex = this.#findBook(book.id);
        if (bookIndex != -1)
        {
            this.#booksList[bookIndex] = book;
        }
        console.log("mod " + book.id);
        console.log(book);
    }

    cancel() {
        console.log("cancel");
    }

    delBook(book) {
        console.log("del " + book.id);
        console.log(this.#booksList.splice(book.x, 1));
    }

    buyBook(book) {
        console.log("buy " + book.id);
    }

    decreaseBook(book) {
        console.log("decrease " + book.id);
    }

    unbuyBook(book) {
        console.log("unbuy " + book.id);
    }
}

export default BookModel;
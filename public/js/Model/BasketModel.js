
class BasketModel {
    #items;
    #displayItems;

    constructor() {
        this.#items = [];
    }

    #findItem(fid) {
        let itemIndex = -1;
        for (let x = 0; x < this.#items.length; x++)
        {
            if (this.#items[x].id == fid) {
                itemIndex = x;
                break;
            }
        }
        return itemIndex;
    }

    addItem(id) {
        let itemIndex = this.#findItem(id);
        if (itemIndex == -1)
        {
            this.#items.push({"id":id, "amount":1});
        }
        else
        {
            this.#items[itemIndex].amount++;
        }
    }

    decreaseItem(id) {
        let itemIndex = this.#findItem(id);
        if (itemIndex != -1)
        {
            let fitem = this.#items[itemIndex];
            if (fitem.amount > 1)
            {
                fitem.amount--;
            }
            else
            {
                this.removeItem(fitem);
            }
        }
    }

    removeItem(id) {
        let itemIndex = this.#findItem(id);
        if (itemIndex != -1)
        {
            this.#items.splice(itemIndex, 1);
        }
    }

    getItems() {
        return this.#items;
    }

    getDisplayItems() {
        return this.#displayItems;
    }

    updateDisplayItems(bookList) {
        this.#displayItems = [];
        this.#items.forEach(item => {
            let x = 0;
            while(x < bookList.length && item.id != bookList[x].id) {
                x++;
            }
            if(x < bookList.length) {
                this.#displayItems.push({
                    "id":item.id,
                    "title":bookList[x].title,
                    "author":bookList[x].author,
                    "price":bookList[x].price,
                    "amount":item.amount
                })
            }
        });
    }
}

export default BasketModel;
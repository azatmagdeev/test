export class Manager {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.items = [];
    }

    getData(success) {
        const data = localStorage.getItem('data');

        if (data === null) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `${this.apiUrl}`);
            xhr.addEventListener('load', () => {
                this.items = JSON.parse(xhr.responseText).LPU;
                success(this.items);
            });
            xhr.send();
        }
        this.items = JSON.parse(data);
        success(this.items)
    }

    addItem(full_name, address, phone, callback) {

        const temp_arr = [...this.items];
        temp_arr.sort((a, b) => b.id - a.id);
        const id = Number(temp_arr[0].id) + 1;

        const item = {id: String(id), full_name, address, phone};
        this.items.push(item);
        this.saveItems();
        // console.log('manager.items after adding', this.items);
        callback(item)
    }

    deleteItem(index) {
        this.items.splice(index - 1, 1);
        this.saveItems();
        // console.log('manager.items after removing', this.items);
    }

    updateItem(item) {
        const index = this.items.findIndex(el => el.id === item.id);
        this.items[index] = item;
        this.saveItems();
        // console.log('manager.items after updating', this.items);
    }

    saveItems() {
        localStorage.setItem('data', JSON.stringify(this.items));
    }
}
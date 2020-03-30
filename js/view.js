export class View {
    constructor(addButton, form, root, manager) {
        this.addButton = addButton;
        this.form = form;
        this.root = root;
        this.manager = manager;
        this.currentRowIndex = null;
        this.currentItem = {};
        this.isNew = false;
        this.init()
    }

    init() {
        this.table = document.createElement('table');
        this.root.appendChild(this.table);

        this.form.elements.cancel.addEventListener('click', e => {
            e.preventDefault();
            this.form.style.display = 'none';
            this.form.full_name.value =
                this.form.address.value =
                    this.form.phone.value = '';
            this.currentRowIndex = null;
            this.currentItem = {};
        });

        this.form.elements.enter.addEventListener('click', (e) => {
            e.preventDefault();
            this.form.style.display = 'none';
            this.isNew ? this.addNewItem()
                : this.updateRow(this.currentRowIndex, this.currentItem);
        });

        this.addButton.addEventListener('click', () => {
            this.isNew = true;
            this.showForm({
                full_name: '',
                address: '',
                phone: ''
            });
        });

        this.onloadData();
    }

    onloadData() {
        this.manager.getData(items => {
            this.showTable(items)
        })
    }

    showTable(items) {
        this.table.innerHTML = `<thead>
                            <th>Наименование</th>
                            <th>Адрес</th>
                            <th>Телефон</th>
                            <th></th>
                            <th></th>
                            </thead>`;
        items.map(item => {
            const tRow = document.createElement('tr');
            this.table.appendChild(tRow);
            this.drawTableRow(item, tRow, ()=>{});
        })
    }

    drawTableRow(item, tRow, callback) {
        tRow.innerHTML = `<td>${item.full_name}</td>
                              <td>${item.address}</td>
                              <td>${item.phone}</td>
                              <td><button id="updButton"><img src="../img/update.png" alt="Изменить" height="20px"></button></td>
                              <td><button id="delButton"><img src="../img/delete.png" alt="Изменить" height="20px"></button></td>`;
        callback();

        const updButton = tRow.querySelector('#updButton');
        const delButton = tRow.querySelector('#delButton');

        updButton.addEventListener('click', () => {
            this.isNew = false;
            this.currentRowIndex = tRow.rowIndex;
            this.currentItem = item;
            this.showForm(item)
        });

        delButton.addEventListener('click', () => {
            const areYouSure = confirm('Удалить объект. Вы уверены?');
            if(areYouSure) {
                this.manager.deleteItem(tRow.rowIndex);
                this.table.removeChild(tRow);
            }
        })
    }

    showForm(item) {
        this.form.style.display = 'block';

        this.form.elements.full_name.value = item.full_name;
        this.form.elements.address.value = item.address;
        this.form.elements.phone.value = item.phone;
    }

    addNewItem() {
        this.manager.addItem(
            this.form.full_name.value,
            this.form.address.value,
            this.form.phone.value, item =>{
                const tRow = document.createElement('tr');
                this.table.appendChild(tRow);
                this.drawTableRow(item, tRow, ()=>{
                    alert('Объект добавлен!')
                });
            }
        )
    }

    updateRow(index, item) {
        item.full_name = this.form.elements.full_name.value;
        item.address = this.form.elements.address.value;
        item.phone = this.form.elements.phone.value;

        this.manager.updateItem(item);

        this.table.rows[index].innerHTML = '';
        this.drawTableRow(item, this.table.rows[index],()=>{
            alert("Объект обновлён!")
        });
    }
}


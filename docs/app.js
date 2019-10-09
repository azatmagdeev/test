const table = document.querySelector('#table');
const addBtn = document.querySelector('#addBtn');
const nameEl = document.querySelector('#name');
const addressEl = document.querySelector('#address');
const phoneEl = document.querySelector('#phone');
const textarea = document.querySelector('#textarea');
const data = localStorage.getItem('data');
const items = JSON.parse(data);

if (data === null) {
    const xhr = new XMLHttpRequest;
    xhr.open('GET', 'lpu.json');
    xhr.addEventListener('load', () => {
        const items = (JSON.parse(xhr.responseText)).LPU;
        localStorage.setItem('data', JSON.stringify(items));
        showItems(items);
    });
    xhr.send();
} else {
    showItems(items);
}

addBtn.addEventListener('click', e => {
    e.preventDefault();
    if (nameEl.value !== '' && addressEl.value !== '') {
        addItem(nameEl.value, addressEl.value, phoneEl.value);
        nameEl.value = addressEl.value = phoneEl.value = '';
    }
});

textarea.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        textarea.style.display = 'none';
        const {cellIndex} = e.target.parentElement;
        const {rowIndex} = e.target.parentElement.parentElement;
        updateData(rowIndex - 1, cellIndex, textarea.value)
    }
});

window.addEventListener('click', (e) => {
    e.target !== textarea ? textarea.style.display = 'none' : null
});

function updateData(index, propIndex, value) {
    propIndex === 0 ? items[index].full_name = value :
        propIndex === 1 ? items[index].address = value :
            items[index].phone = value;
    localStorage.setItem('data', JSON.stringify(items));
    showItems(items)
}

function showItems(items) {
    table.innerHTML = '';
    items.map((o) => {
        const tr = document.createElement('tr');

        buildTableData(o.full_name, tr);
        buildTableData(o.address, tr);
        buildTableData(o.phone, tr);

        const tRemove = document.createElement('td');
        const xBtn = document.createElement('button');
        xBtn.textContent = '✖';
        xBtn.className = 'btn btn-danger m-2';
        xBtn.addEventListener('click', () => removeItem(o, items));
        tRemove.appendChild(xBtn);
        tr.appendChild(tRemove);

        table.appendChild(tr)
    });
}

function addItem(full_name, address, phone) {
    const item = {full_name, address, phone};
    items.unshift(item);
    localStorage.setItem('data', JSON.stringify(items));
    showItems(items);
}

function removeItem(item, items) {
    items.find((value, index) => {
        if (value === item) {
            items.splice(index, 1);
            localStorage.setItem('data', JSON.stringify(items));
            showItems(items);
        }
    })
}

function buildTableData(prop, tr) {
    const td = document.createElement('td');
    td.textContent = prop;
    td.style.position = 'relative';
    td.style.width = '33%';
    tr.appendChild(td);
    td.addEventListener('dblclick', (e) => {
        console.log(e);
        showTextarea(td, prop)
    });
    td.addEventListener('touchstart',e=>{
        console.log(e);
        showTextarea(td, prop)
    })

    return td;
}

function showTextarea(td, prop) {
    td.appendChild(textarea);
    textarea.style.display = 'block';
    textarea.value = prop;
    textarea.autofocus = true;
}




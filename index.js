let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');


openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});


let products = [
    {
        id: 1,
        name: 'Radiant Cut Halo',
        image: 'one.jpg',
        price: 253532
    },
    {
        id: 2,
        name: 'Tibetan Silver Ring',
        image: 'seven.jpg',
        price: 324423
    },
    {
        id: 3,
        name: 'Blue Spinel Watch',
        image: 'four.jpg',
        price: 232223
    },
    {
        id: 4,
        name: 'Silver Hamsa Bracelet',
        image: 'five.jpg',
        price: 354265
    },
    {
        id: 5,
        name: 'Rose Gold Halo Ring',
        image: 'six.jpg',
        price: 425554
    },
    {
        id: 6,
        name: ' Pendant Necklace',
        image: 'three.jpg',
        price: 162023
    }
];


let listCards = [];


function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="images/${value.image}" class="product-image">
            <div class="title">${value.name}</div>
            <div class="price">R${(value.price / 100).toFixed(2)}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    });
}


initApp();


function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    } else {
        listCards[key].quantity++;
    }
    reloadCard();
}


function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice += value.price * value.quantity;
        count += value.quantity;
        if (value!= null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="images/${value.image}"/></div>
                <div>${value.name}</div>
                <div>Price: R${(value.price / 100).toFixed(2)}</div>`; 
            newDiv.innerHTML += `
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = `Total: R${(totalPrice / 100).toFixed(2)}`; 
    quantity.innerText = count;
}


function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
    }
    reloadCard();
}
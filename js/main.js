const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];

const renderProduct = (title, price) => {
    return `<div class="product-item">
                <img  class="products-item-img" src="https://placehold.it/200x150/015666">
                <h3 class="products-item-name">${title}</h3>
                <p class="products-item-price">${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.title, item.price));
    document.querySelector('.products').innerHTML = productsList.join("");
};

renderPage(products);
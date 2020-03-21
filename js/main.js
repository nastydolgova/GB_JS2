'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        cartItems: [],
        filtered: [],
        imgCart: 'https://placehold.it/50x100',
        products: [],
        imgProduct: 'https://placehold.it/200x150/015666'
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        addProduct(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                       let find = this.cartItems.find(el => el.id_product === item.id_product);
                       if(find){
                           find.quantity++;
                       } else {
                           const prod = Object.assign({quantity: 1}, item);//создание нового объекта на основе двух, указанных в параметрах
                           this.cartItems.push(prod)
                       }
                    }
                })
        },
        remove(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
        filter(){
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents){
                    this.$data.cartItems.push(item);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            })
    }

});


//// let getRequest = (url) => {
////     return new Promise((resolve,reject) =>{
////         let xhr = new XMLHttpRequest();
////         xhr.open("GET", url, true);
////         xhr.onreadystatechange = () => {
////         if(xhr.readyState === 4){
////             if(xhr.status !== 200){
////                 reject('Error');
////             } else {
////                 resolve(xhr.responseText);
////             }
////         }
////     };
////     xhr.send();
////     });
////     
//// };
////
////getRequest('test.json').then(data => {
////    
////})
//
//
//class List {
//    constructor(url, container, list = list2){
//        this.container = container;
//        this.list = list;
//        this.url = url;
//        this.goods = [];
//        this.allProducts = [];
//        this._init();
//    }
//    getJson(url){
//        return fetch(url ? url : `${API + this.url}`)
//            .then(result => result.json())
//            .catch(error => {
//                console.log(error);
//            })
//    }
//    handleData(data){
//        this.goods = [...data];
//        this.render();
//    }
//    calcSum(){
//        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//    }
//    render(){
//        const block = document.querySelector(this.container);
//        for (let product of this.goods){
//            const productObj = new this.list[this.constructor.name](product);
//            console.log(productObj);
//            this.allProducts.push(productObj);
//            block.insertAdjacentHTML('beforeend', productObj.render());
//        }
//    }
//    _init(){
//        return false
//    }
//}
//
//class Item{
//    constructor(el, img = 'https://placehold.it/200x150/015666'){
//        this.product_name = el.product_name;
//        this.price = el.price;
//        this.id_product = el.id_product;
//        this.img = img;
//    }
//    render(){
//        return `<div class="product-item" data-id="${this.id_product}">
//                        <img src="${this.img}" alt="Some img" class="products-item-img">
//                        <div class="desc">
//                        <h3 class="products-item-name">${this.product_name}</h3>
//                        <p class="products-item-price">${this.price}</p>
//                        <button class="buy-btn" data-id="${this.id_product}" 
//                                                data-name="${this.product_name}" 
//                                                data-price="${this.price}">Купить</button>
//                 </div>
//                </div>`
//    }
//}
//
//
//class ProductsList extends List{
//    constructor(cart, container = '.products', url = "/catalogData.json"){
//        super(url, container);
//        this.cart = cart;
//        this.getJson()
//            .then(data => this.handleData(data));
//    }
//    _init(){
//        document.querySelector(this.container).addEventListener('click', e => {
//            if(e.target.classList.contains('buy-btn')){
//                this.cart.addProduct(e.target);
//            }
//        });
//        
//    }
//}
//
//
//class ProductItem extends Item{}
//
//class Cart extends List{
//    constructor(container = ".cart-block", url = "/getBasket.json"){
//        super(url, container);
//        this.getJson()
//            .then(data => {
//                this.handleData(data.contents);
//            });
//    }
//    addProduct(element){
//        this.getJson(`${API}/addToBasket.json`)
//            .then(data => {
//                if(data.result === 1){
//                    let productId = +element.dataset['id'];
//                    let find = this.allProducts.find(product => product.id_product === productId);
//                    if(find){
//                        find.quantity++;
//                        this._updateCart(find);
//                    } else {
//                        let product = {
//                            id_product: productId,
//                            price: +element.dataset['price'],
//                            product_name: element.dataset['name'],
//                            quantity: 1
//                        };
//                        this.goods = [product];
//                        this.render();
//                    }
//                } else {
//                    alert('Error');
//                }
//            })
//    }
//    removeProduct(element){
//        this.getJson(`${API}/deleteFromBasket.json`)
//            .then(data => {
//                if(data.result === 1){
//                    let productId = +element.dataset['id'];
//                    let find = this.allProducts.find(product => product.id_product === productId);
//                    if(find.quantity > 1){
//                        find.quantity--;
//                        this._updateCart(find);
//                    } else {
//                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
//                    }
//                } else {
//                    alert('Error');
//                }
//            })
//    }
//    _updateCart(product){
//       let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//       block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
//       block.querySelector('.product-price').textContent = `$${product.quantity*product.price}`;
//    }
//    _init(){
//        document.querySelector('.btn-cart').addEventListener('click', () => {
//            document.querySelector(this.container).classList.toggle('invisible');
//        });
//        document.querySelector(this.container).addEventListener('click', e => {
//           if(e.target.classList.contains('del-btn')){
//               this.removeProduct(e.target);
//           }
//        })
//    }
//
//}
//
//class CartItem extends Item{
//    constructor(el, img = 'https://placehold.it/50x100/015666'){
//        super(el, img);
//        this.quantity = el.quantity;
//    }
//    render(){
//    return `<div class="cart-item" data-id="${this.id_product}">
//            <div class="product-bio">
//            <img src="${this.img}" alt="Some image">
//            <div class="product-desc">
//            <p class="product-title">${this.product_name}</p>
//            <p class="product-quantity">Quantity: ${this.quantity}</p>
//        <p class="product-single-price">$${this.price} each</p>
//        </div>
//        </div>
//        <div class="right-block">
//            <p class="product-price">$${this.quantity*this.price}</p>
//            <button class="del-btn" data-id="${this.id_product}">&times;</button>
//        </div>
//        </div>`
//    }
//}
//const list2 = {
//    ProductsList: ProductItem,
//    Cart: CartItem
//};
//
//let cart = new Cart();
//let products = new ProductsList(cart);
//
////class ProductsList{
////    constructor(container = '.products'){
////        this.container = container;
////        this.goods = [];
////        this.allProducts = [];
////        this._getProducts()
////            .then(data => {
////                this.goods = [...data];
////                this.render()
////            });
////    }
////    _getProducts(){
////        return fetch(`${API}/catalogData.json`)
////            .then(result => result.json())
////            .catch(error => {
////                console.log(error);
////            })
////    }
////    calcSum(){
////        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
////    }
////    render() {
////        const block = document.querySelector(this.container);
////        for(let product of this.goods){
////            const productObj = new ProductItem(product);
////            this.allProducts.push(productObj);
////            block.insertAdjacentHTML('beforeend',productObj.render())
////        }
////    }
////    
//////    checkPrice(){
//////        let total = 0;
//////        this.goods.forEach(el => {
//////            total +=el.price;
//////        })
//////        console.log(`Сумма всех товаров ${total}`);
//////    }
////}
////
////
////
////class ProductItem{
////	constructor(product, img = 'https://placehold.it/200x150/015666'){
////		this.title = product.title;
////		this.price = product.price;
////		this.id = product.id;
////		this.img = img;
////		
////	}
////	
////	render(){
////		 return `<div class="product-item" data-id="${this.id}">
////                    <div class="product-item">
////                        <img src="${this.img}" alt="Some img">
////                        <h3 class="products-item-name">${this.title}</h3>
////                        <p class="products-item-price">${this.price}</p>
////                        <button class="buy-btn">Купить</button>
////                    </div>
////                 </div>`
////	}
////}
////
////let list = new ProductsList();
////list.render();
//////list.checkPrice();
////
////
////class cart{
////    constructor(container = '.cart-block'){
////        this.container = container;
////        this.items = [];
////        this.total = 0;
////        this.sum = 0;
////    }
////    addProduct(){
////            
////        };
////    deleteProduct(){
////            
////        };
////    checkTotal(){
////        
////    };
////    checkSum(){
////        
////    };
////    render(){
////            
////        };
////    } 
////    
////    
////    
////    
//    
//    
//    
//    
//    
//    
//    
//    
//    
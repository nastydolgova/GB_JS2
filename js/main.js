class ProductsList{
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
    } 
    
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend',productObj.render())
        }
    }
    
    checkPrice(){
        let total = 0;
        this.goods.forEach(el => {
            total +=el.price;
        })
        console.log(`Сумма всех товаров ${total}`);
    }
}



class ProductItem{
	constructor(product, img = 'https://placehold.it/200x150/015666'){
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
		this.img = img;
		
	}
	
	render(){
		 return `<div class="product-item">
                <img src="${this.img}" alt="Some img">
                <h3 class="products-item-name">${this.title}</h3>
                <p class="products-item-price">${this.price}</p>
                <button class="buy-btn">Купить</button>
                 </div>`
	}
}

let list = new ProductsList();
list.render();
list.checkPrice();


class cart{
    constructor(container = '.cart-block'){
        this.container = container;
        this.items = [];
        this.total = 0;
        this.sum = 0;
    }
    addProduct(){
            
        };
    deleteProduct(){
            
        };
    checkTotal(){
        
    };
    checkSum(){
        
    };
    render(){
            
        };
    } 
    
    
    
    
    
    
    
    
    
    
    
    
    
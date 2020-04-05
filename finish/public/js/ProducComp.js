Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
//            imgCatalog: 'https://placehold.it/250x200',
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'ig');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product v-for="item of filtered" :key="item.id_product" :img="item.image" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
    <div class="product-item">
                <img :src="img" alt="Some img" class="product-item-img" width="250px">
                <div class="desc">
                    <h3  class="product-item-title">{{product.product_name}}</h3>
					<span class="product-item=span">{{product.product_cat}}</span>
                    <p class="product-item-price">{{product.price}} $</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Buy</button>
                </div>
            </div>
    `
})
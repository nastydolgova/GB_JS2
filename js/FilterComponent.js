Vue.component('filter_el', {
    data () {
        return {
            userSearch: ''
        }
    },
    template: `
    <form action="#" class="search-form" @submit.prevent='$parent.$refs.products.filter(userSearch)'>
        <input class="main-header-form-search" placeholder="Поиск" type="search" v-model="userSearch">
    </form>
    `
})
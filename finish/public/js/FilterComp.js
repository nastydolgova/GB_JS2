Vue.component('filter-el', {
    data() {
        return {
            userSearch: ''
        }
    },
    template: `
    <form action="#" class="search-form" @submit.prevent='$parent.$refs.products.filter(userSearch)'>
    <input class="main-header-form-search" type="search" v-model="userSearch">
    </form>
    `
})

const filter_el = {
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
}

//<input class="main-header-form-search" placeholder="Поиск" type="search" v-model="userSearch">

//        <input type="text" class="search-field" v-model='userSearch'>
//        <button class="btn-search" type="submit">
//            <i class="fas fa-search"></i>
//        </button>
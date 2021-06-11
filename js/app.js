

Vue.component('dashboard',{
    template : '<div>dashboard</div>'
})

Vue.component('login',{
    template : '<div>you need to login</div>'
})

Vue.component('profile',{
    template : '<div>profile</div>'
})

Vue.component('landing-page',{
    template : '<div>landing page</div>'
})
Vue.component('loading-page',{
    template : '<div>loading app</div>'
})

const routes = [
    {
      path: '/',
      component: 'dashboard'
    }
]


const router = new VueRouter({
    routes: routes
})

Vue.use(Vuex)
const store = new Vuex.Store({
    state : {
        isLoggedIn : false,
        loading : false,

    },
    mutations : {

    }
})

var app = new Vue({
    router,
    store,
    el: '#app',
    data: {
        text : 'hello people'
    }
})


const routes = [
    {
      path: '/',
      component: 'dashboard'
    },
]

const store = new Vuex.Store({
    state : {
    }
})

var app = new Vue({
    el: '#app',
    store,
    router,
    data: {
    }
})

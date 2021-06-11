
Vue.use(VueRouter)
Vue.component('dashboard',{
    template : '<div> <nav-bar></nav-bar> <br> <div class="row container"> <div class="col-4 container"> <h6>Quick tools</h6> <tools></tools></div> <div class="col-8 container"><h6>dashboard</h6>  <router-view class="dash container"></router-view></div> </div>'
})

Vue.component('login',{
    data :function() {
        return{
            password : '',
            workId : ''
        }
    },
    methods: {
        login : function(){
            store.commit('login',true)
        }
    },
    template : '<div> <form class="col-md-6 col-10 alert log"> <h2>OpenLab</h2><p>Sign into your openlab account</p> <hr><div class="form-group"> <label for="workid">Work Id</label> <input v-model="workId" type="text" class="form-control" id="workid" aria-describedby="workid" placeholder="work id"> <small id="workid" class="form-text text-muted">enter your work id.</small> </div> <div class="form-group"><br> <label for="InputPassword1">Password</label> <input v-model="password" type="password" class="form-control" id="InputPassword1" placeholder="Password"> </div> <br><button type="button" @click="login()" class="btn btn-success">Sign in</button> </form></div>'
})
Vue.component('main-view',{
    template : '<div> <br><h4>Welcome to openlab</h4> <hr> <tasks></tasks></div>'
})

Vue.component('tasks',{
    template : '<div> <div class="row" > <div class="col-6 it" v-for="a in 3"> <div class="card "> <div class="card-header"> Send Email </div> <div class="card-body"> <blockquote class="blockquote mb-0"> <p>send message to john</p> <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> </blockquote>  <button class="btn btn-success">close job</button> </div></div> </div></div></div>'
})

Vue.component('tools',{
    template : '<ul class="list-group list-group-flush"> <li class="list-group-item">Cras justo odio</li> <li class="list-group-item">Dapibus ac facilisis in</li> <li class="list-group-item">Morbi leo risus</li> <li class="list-group-item">Porta ac consectetur ac</li> <li class="list-group-item">Vestibulum at eros</li> </ul>'
})
Vue.component('profile',{
    template : '<div>profile</div>'
})

Vue.component('nav-bar',{
    template : '<div>    <nav class="navbar navbar-expand-lg navbar-light bg-light"> <div class="container-fluid"> <router-link class="navbar-brand" to="/dashboard/home" >OpenLab</router-link> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navbarNav"> <ul class="navbar-nav"> <li class="nav-item"> <router-link class="navbar-brand" to="/dashboard/profile" >Profile</router-link> </li> <li class="nav-item"> <router-link class="navbar-brand" to="/dashboard/create" >Create</router-link> </li> <li class="nav-item"> <router-link class="navbar-brand" to="/dashboard/organisation" >OpenLab</router-link> </li> </ul> </div> </div> </nav></div>'
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
        component: 'main-view'
    },
    {
        path: '/dashboard/home',
        component : 'main-view'
    },
    {
        path: '/dashboard/profile',
        component: 'profile'
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
        login (state,value){
            state.isLoggedIn = value;
        }
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

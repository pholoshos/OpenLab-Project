
Vue.use(VueRouter)
Vue.component('dashboard',{
    template : '<div> <nav-bar></nav-bar> <br> <div class="row container"> <div class="col-md-4 tls container">  <h6><tools-icon></tools-icon> Quick tools</h6> <tools></tools></div> <div class="col-md-8  container"><h6> <dash-icon></dash-icon> dashboard</h6>  <router-view class="dash container"></router-view></div> </div>'
})
Vue.component('tools-icon',{
    template : '<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M7.875 2.292a.125.125 0 00-.032.018A7.24 7.24 0 004.75 8.25a7.247 7.247 0 003.654 6.297c.57.327.982.955.941 1.682v.002l-.317 6.058a.75.75 0 11-1.498-.078l.317-6.062v-.004c.006-.09-.047-.215-.188-.296A8.747 8.747 0 013.25 8.25a8.74 8.74 0 013.732-7.169 1.547 1.547 0 011.709-.064c.484.292.809.835.809 1.46v4.714a.25.25 0 00.119.213l2.25 1.385c.08.05.182.05.262 0l2.25-1.385a.25.25 0 00.119-.213V2.478c0-.626.325-1.169.81-1.461a1.547 1.547 0 011.708.064 8.74 8.74 0 013.732 7.17 8.747 8.747 0 01-4.41 7.598c-.14.081-.193.206-.188.296v.004l.318 6.062a.75.75 0 11-1.498.078l-.317-6.058v-.002c-.041-.727.37-1.355.94-1.682A7.247 7.247 0 0019.25 8.25a7.24 7.24 0 00-3.093-5.94.125.125 0 00-.032-.018l-.01-.001c-.003 0-.014 0-.031.01-.036.022-.084.079-.084.177V7.19a1.75 1.75 0 01-.833 1.49l-2.25 1.385a1.75 1.75 0 01-1.834 0l-2.25-1.384A1.75 1.75 0 018 7.192V2.477c0-.098-.048-.155-.084-.176a.062.062 0 00-.031-.011l-.01.001z"></path></svg>'
})
Vue.component('dash-icon',{
    template : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 000-1.5h-7a.25.25 0 01-.25-.25V3.75z"></path><path d="M6.25 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm-.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm16.28 4.53a.75.75 0 10-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z"></path></svg>'
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
    template : '<div> <div class="row" > <div class="col-md-6 it" v-for="a in 3"> <div class="card "> <div class="card-header"> Send Email </div> <div class="card-body"> <blockquote class="blockquote mb-0"> <p>send message to john</p> <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> </blockquote>  <button class="btn btn-success">close job</button> </div></div> </div></div></div>'
})

Vue.component('tools',{
    template : '<ul class="list-group list-group-flush"> <li class="list-group-item">Cras justo odio</li> <li class="list-group-item">Dapibus ac facilisis in</li> <li class="list-group-item">Morbi leo risus</li> <li class="list-group-item">Porta ac consectetur ac</li> <li class="list-group-item">Vestibulum at eros</li> </ul>'
})
Vue.component('profile',{
    template : '<div>profile</div>'
})

Vue.component('nav-bar',{
    template : '<div>    <nav class="navbar navbar-expand-lg navbar-dark bg-dark"> <div class="container-fluid"> <router-link class="navbar-brand" to="/dashboard/home" >OpenLab</router-link> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navbarNav"> <ul class="navbar-nav"> <li class="nav-item"> <router-link class="navbar-brand" to="/dashboard/profile" >Profile</router-link> </li> <li class="nav-item"> <router-link class="navbar-brand" to="/dashboard/create" >Create</router-link> </li> <li class="nav-item"> <router-link class="navbar-brand" to="/dashboard/organisation" >OpenLab</router-link> </li> </ul> </div> </div> </nav></div>'
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

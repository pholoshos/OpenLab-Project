
Vue.use(VueRouter)
Vue.component('dashboard',{
    data : function(){
        return{
            title : '',
        }
    },
    methods: {
        createNewJob : function(){
            store.commit('addTitle',this.title);
            router.push({ path: '/dashboard/createTask' })
        }
    },
    template : '<div> <nav-bar></nav-bar> <br> <div class="row container"> <div class="col-md-4 tls container">  <h6>Quick tools</h6> <input class="form-control" v-model="title" placeholder="Enter your job title"></input><button class="btn btn-secondary" @click="createNewJob()">Create Job</button> <hr> <tools></tools></div> <div class="col-md-8  container"><h6> <dash-icon></dash-icon> dashboard</h6>  <router-view class="dash container"></router-view></div> </div>'
})
Vue.component('tools-icon',{
    template : '<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M7.875 2.292a.125.125 0 00-.032.018A7.24 7.24 0 004.75 8.25a7.247 7.247 0 003.654 6.297c.57.327.982.955.941 1.682v.002l-.317 6.058a.75.75 0 11-1.498-.078l.317-6.062v-.004c.006-.09-.047-.215-.188-.296A8.747 8.747 0 013.25 8.25a8.74 8.74 0 013.732-7.169 1.547 1.547 0 011.709-.064c.484.292.809.835.809 1.46v4.714a.25.25 0 00.119.213l2.25 1.385c.08.05.182.05.262 0l2.25-1.385a.25.25 0 00.119-.213V2.478c0-.626.325-1.169.81-1.461a1.547 1.547 0 011.708.064 8.74 8.74 0 013.732 7.17 8.747 8.747 0 01-4.41 7.598c-.14.081-.193.206-.188.296v.004l.318 6.062a.75.75 0 11-1.498.078l-.317-6.058v-.002c-.041-.727.37-1.355.94-1.682A7.247 7.247 0 0019.25 8.25a7.24 7.24 0 00-3.093-5.94.125.125 0 00-.032-.018l-.01-.001c-.003 0-.014 0-.031.01-.036.022-.084.079-.084.177V7.19a1.75 1.75 0 01-.833 1.49l-2.25 1.385a1.75 1.75 0 01-1.834 0l-2.25-1.384A1.75 1.75 0 018 7.192V2.477c0-.098-.048-.155-.084-.176a.062.062 0 00-.031-.011l-.01.001z"></path></svg>'
})
Vue.component('dash-icon',{
    template : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3.5 3.75a.25.25 0 01.25-.25h13.5a.25.25 0 01.25.25v10a.75.75 0 001.5 0v-10A1.75 1.75 0 0017.25 2H3.75A1.75 1.75 0 002 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 000-1.5h-7a.25.25 0 01-.25-.25V3.75z"></path><path d="M6.25 7a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm-.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75zm16.28 4.53a.75.75 0 10-1.06-1.06l-4.97 4.97-1.97-1.97a.75.75 0 10-1.06 1.06l2.5 2.5a.75.75 0 001.06 0l5.5-5.5z"></path></svg>'
})

Vue.component('loading-item',{
    template : '<div class="loadingio-spinner-wedges-3h1sjibkbht"><div class="ldio-d917io5x8e"> <div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div> </div></div>'
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
           store.commit('doneLoading',true)
            setTimeout(function(){
                store.commit('doneLoading',false);
                store.commit('login',true)
            },1000)
        }
    },
    template : '<div> <form class="col-md-6 col-10 alert log"> <h2>OpenLab</h2><p>Sign into your openlab account</p> <hr><div class="form-group"> <label for="workid">Work Id</label> <input v-model="workId" type="text" class="form-control" id="workid" aria-describedby="workid" placeholder="work id"> <small id="workid" class="form-text text-muted">enter your work id.</small> </div> <div class="form-group"><br> <label for="InputPassword1">Password</label> <input v-model="password" type="password" class="form-control" id="InputPassword1" placeholder="Password"> </div> <br><button type="button" @click="login()" class="btn btn-success">Sign in</button> </form></div>'
})
Vue.component('main-view',{
    template : '<div> <br><h4>Welcome to openlab</h4> <hr> <tasks></tasks></div>'
})

Vue.component('manage-employees',{
    template : '<div>manage employees</div>'
})

Vue.component('tasks',{
    template : '<div> <div class="row" > <div class="col-md-6 it" v-for="a in 3"> <div class="card "> <div class="card-header"> Send Email </div> <div class="card-body"> <blockquote class="blockquote mb-0"> <p>send message to john</p> <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> </blockquote>  <button class="btn btn-success">close job</button> </div></div> </div></div></div>'
})

Vue.component('tools',{
    template : '<ul class="list-group list-group-flush"> <li  class="list-group-item"><router-link class="link" to="/dashboard/manage/employees">Manage Employees</router-link></li> <li class="list-group-item">more</li> <li class="list-group-item">Manage tasks</li> <li class="list-group-item">notice board</li>  </ul>'
})
Vue.component('create-job',{

    template : ' <div> <input ><input></div>'
})
Vue.component('profile',{
    template : '<div>profile</div>'
})

Vue.component('creating-task',{
    template : '<div> <br> <h4>Creating task : <div class="alert alert-secondary">{{$store.state.taskTitle}}</div></h4>  <p>Add your tasks details below</p> <hr>  <label>Task description</label> <input class="form-control"></input>  <br> <label>Employee id</label><input class="form-control" placeholder="employee"></input> <br> <button class="btn btn-success" >Create</button> <br><br></div>'
})

Vue.component('nav-bar',{
    template : '<div>    <nav class="navbar navbar-expand-lg navbar-dark bg-dark"> <div class="container-fluid"> <router-link class="navbar-brand" to="/dashboard/home" >OpenLab</router-link> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navbarNav"> <ul class="navbar-nav"> <li class="nav-item"> <router-link class="navbar-brand" to="/dashboard/profile" >Profile</router-link> </li> <li class="nav-item"> <router-link class="navbar-brand" to="/dashboard/create" >Create</router-link> </li> <li class="nav-item"> <router-link class="navbar-brand" to="/dashboard/organisation" >OpenLab</router-link> </li> </ul> </div> </div> </nav></div>'
})

Vue.component('landing-page',{
    template : '<div>landing page</div>'
})
Vue.component('loading-page',{
    template : '<div><loading-screen></loading-screen></div>'
})

Vue.component('loading-screen',{
    mounted() {

    },
    template : '<div style="align-items: center;text-align: center;margin: 15%;"> <div style="background-color:rgb(57, 57, 57)" class="loadingio-spinner-wedges-a1kf65dids"><div class="ldio-4d3gymeqpee"> <div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div> </div></div>  </div>'
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
    },
    {
        path : '/dashboard/createtask',
        component : 'creating-task'
    },
    {
        path : '/dashboard/manage/employees',
        component : 'manage-employees'
    }
]


const router = new VueRouter({
    routes: routes
})

Vue.use(Vuex)
const store = new Vuex.Store({
    state : {
        isLoggedIn : true,
        loading :  false,
        taskTitle  : ''

    },
    mutations : {
        login (state,value){
            state.isLoggedIn = value;
        },
        doneLoading(state,value){
            state.loading = value;
        },
        addTitle(state,value){
            state.taskTitle = value;
        }
    }
})


var app = new Vue({
    router,
    store,
    el: '#app',
    data: {
        text : 'hello people'
    },
    methods: {
        stoploading: function(){
            
        }
    },
    mounted() {
        const self = this;
        setTimeout(function(){
            store.commit('doneLoading',false);
        },1000)
        
    },
})

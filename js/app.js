
function checkData(item, limit){
    var len = item.length;
    return !(len < limit);
}
function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
};

function selectOption (a){
    let sel = a.options[a.selectedIndex].text;
    return sel;
}


function gotResults(message) {
    setTimeout(function(){
        store.commit('isLoading',false);
        var notification = alertify.notify(message, '', 10, function(){  console.log('dismissed'); });
    },1000)
}
function viewReset() {
    counter = 0;
}
function viewResetTasks() {
    counter2 = 0;
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
var counter = 0;
var counter2 = 0;

async function updateEmployees() {
    counter += 1;
    if(counter == 1){
        try{
 
            var url = "http://localhost/OpenLab-Project/data/index.php/api/getEmployees";
            store.commit('isLoading',true);
            await axios.get(url,{
                params : {
                    workId : store.state.account.id,
                    authkey : store.state.account.authkey
                }
            }).then(function(response){
                if(response.data.res == "correct"){
                    counter = counter +1;
                    store.commit("updateEmployees",response.data.employees);
                    gotResults('done!');
                }else{
                    gotResults('error getting results!');
                }
            })
        }catch{
            gotResults("something went wrong,try again");
    
        }
    }
    
}
async function updateTasks() {
    counter2 += 1;
    if(counter2 == 1){
        try{
 
            var url = "http://localhost/OpenLab-Project/data/index.php/api/getTasks";
            store.commit('isLoading',true);
            await axios.get(url,{
                params : {
                    workId : store.state.account.id,
                    authkey : store.state.account.authkey,
                    author : store.state.account.name,
                    name : store.state.account.id,

                }
            }).then(function(response){
                if(response.data.res == "correct"){
                    counter2 = counter2 +1;
                    store.commit("updateTasks",response.data.tasks);
                    gotResults('done!');
                }else{
                    gotResults('error getting results!');
                }
            })
        }catch(err){
            gotResults(err.message);
    
        }
    }
    
}
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
    template : '<div> <nav-bar></nav-bar> <br> <div class="row container"> <div class="col-md-4 tls container">  <h6>Quick tools</h6> <input class="form-control" v-model="title" placeholder="Enter your job title"></input><button class="btn btn-secondary" @click="createNewJob()">Create Job</button> <hr> <tools></tools></div> <div class="col-md-8 space  container"><h6> <dash-icon></dash-icon> dashboard</h6>  <router-view class="dash container"></router-view><br></div> <br> </div></div>'
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
Vue.component('create-employee',{
    data : function(){
        return{
            phone : '0720648709',
            email : 'example@email.com',
            password  : '12345678',
            workId : randomString(10),
            position : 'worker',
            name : 'default name'
        }
    },
    methods: {
        create : async function(){
            const self = this;
            var check = checkData(self.phone,10) && checkData(self.password,8) && checkData(self.email,5) &&checkData(self.workId,8) &&checkData(self.name,2) && checkData(self.position,3); 
            if(check == true){
                try{
                    store.commit('isLoading',true);
                    var createUrl = "http://localhost/OpenLab-Project/data/index.php/api/addEmployee";
                    await axios.get(createUrl,{
                        params : {
                            phone : self.phone,
                            email : self.email,
                            password : self.password,
                            position : self.position,
                            name : self.name,
                            accountWorkId : self.workId,
                            workId : store.state.account.id,
                            authkey : store.state.account.authkey
                            
                        }

                    }).then(function(response){
                        if(response.data.res == "correct"){
                            gotResults("done!");
                        }else{
                            gotResults('failed to add!');
                        }
                    })
                }catch{
                    gotResults("something went wrong!");
                }

            }
        }
    },
    template : '<div>  <h4>New Employeeeee </h4> <p>Add your tasks details below</p> <hr>  <label>Employee Name</label> <input class="form-control" v-model="name" placeholder="name"></input>  <br> <label>Email Address</label><input class="form-control" v-model="email" placeholder="email address"></input> <br><label>Password</label><input class="form-control"  placeholder="password" v-model="password"></input> <br><label>Phone number</label><input class="form-control" v-model="phone" placeholder="phone"></input> <br> <label>Work Id</label><input v-model="workId" class="form-control" placeholder="work id"></input> <br> <label>Position</label><input v-model="position" class="form-control" placeholder="position"></input> <br> <button class="btn btn-success" @click="create()">Create</button> <br><br></div>'
})

Vue.component('login',{
    data :function() {
        return{
            password : '',
            workId : '',
            warning : '..',
            authUrl : 'http://localhost/OpenLab-Project/data/index.php/api/auth'
        }
    },
    mounted() {
        //this.login2();
    },
    methods: {
      login : async function(){
            const self = this;
            
            if(checkData(self.workId,8)&&checkData(self.password,8)){
                try{
                    store.commit('isLoading',true)
                    await axios.get(self.authUrl,{
                        params:{
                            workId : self.workId,
                            password : self.password
                        }
                    }).then(function(response){
                        if(response.data.res == "correct"){
                            console.log(response.data);
                            store.commit('updateAccount',response.data);
                            document.cookie = "id="+ response.data.id +"; SameSite = None; Secure";
                            document.cookie = "authkey="+ response.data.authkey +"; SameSite = None; Secure";
                            setTimeout(function(){
                                store.commit('isLoading',false);
                                store.commit('login',true)
                            },2000)
                        }else{
                            //failed to login
                            
                            setTimeout(function(){
                                store.commit('isLoading',false);
                                store.commit('login',false)
                            },1000)
                            console.log('hello')
                            var notification = alertify.notify('Error: check your details', '', 10, function(){  console.log('dismissed'); });
                            
                            
                        }
                    })
    
                }catch{
                    var notification = alertify.notify('Error: check your internet', '', 10, function(){  console.log('dismissed'); });
                }
            }else{
                var notification = alertify.notify('Error: enter a valid work id and password', '', 10, function(){  console.log('dismissed'); });
            }

        
        }
    },
    template : '<div> <form class="col-md-6 col-10 alert log"> <h2>OpenLab</h2><p>Sign into your openlab account</p> <hr> <div class="form-group"> <label for="workid">Work Id</label> <input v-model="workId" type="text" class="form-control" id="workid" aria-describedby="workid" placeholder="work id"> <small id="workid" class="form-text text-muted">enter your work id.</small> </div> <div class="form-group"><br> <label for="InputPassword1">Password</label> <input v-model="password" type="password" class="form-control" id="InputPassword1" placeholder="Password"> </div> <br><button type="button" @click="login()" class="btn btn-success">Sign in</button> </form></div>'
})
Vue.component('main-view',{
    template : '<div> <br><h4>Welcome to openlab</h4> <hr> <tasks></tasks></div>'
})

Vue.component('manage-employees',{
    mounted() {
        updateEmployees();
    },
    data : function(){
        return{
            view : 1,
            accountType : 'manager'
        }
    },
    methods: {
        options : function(i){
            viewReset();
            const self = this;
            self.view  = i;
        },
        
    },
    template : '<div class="container" v-if="$store.state.account.account == accountType ">  <div> <br> <h4>Manage employees</h4> <button class="btn btn-secondary" @click="options(2)">Add</button> <button class="btn btn-secondary" @click="options(1)">View</button> <button class="btn btn-secondary" @click="options(3)">Delete</button>  <hr>  <view-employee v-if="view== 1"></view-employee> <create-employee v-if="view == 2"></create-employee> <delete-employee v-if="view == 3"></delete-employee>  <br></div> <br></div>'
})
Vue.component('view-employee',{

    methods: {
   
    },
    template : '<div><table class="table"> <thead class="thead-dark"> <tr> <th scope="col">employee id</th> <th scope="col">Name</th> <th scope="col">Phone</th> <th scope="col">email address</th> </tr> </thead> <tbody> <tr v-for="a in $store.state.employees"> <th scope="row">{{a.work_id}}</th> <td>{{a.name}}</td> <td>{{a.phone}}</td> <td>{{a.email}}</td> </tr> </tbody> </table></div>'
})

Vue.component('delete-employee',{
    methods: {
        deleteEmployee: async function(workId){
            console.log(workId)
            if(checkData(workId,7)){
                try{
                    store.commit('isLoading',true);
                    var url = "http://localhost/OpenLab-Project/data/index.php/api/deleteEmployee";
                    await axios.get(url,{
                        params : {
                            deleteWorkId : workId,
                            workId : store.state.account.id,
                            authkey : store.state.account.authkey,
                            
                        }
                    }).then(function(response) {
                        if(response.data.res == "correct"){
                            store.commit('updateEmployees',response.data.employees);
                            gotResults("done!");

                        }else{
                            gotResults("error,failed!");
                        }
                    })
                }catch(err){
                    gotResults(err.message);
                }
            }
        }
    },
    template : '<div> <h6>Delete Employee</h6> <table class="table"> <thead class="thead-dark"> <tr> <th scope="col">employee id</th> <th scope="col">Name</th><th scope="col">option</th></tr> </thead> <tbody> <tr v-for="a in $store.state.employees"> <th scope="row">{{a.work_id}}</th> <td>{{a.name}}</td><td><button class="btn btn-danger" @click="deleteEmployee(a.work_id)">x</button></td> </tr> </tbody> </table> <br>  </div>'
})


Vue.component('tasks',{
    beforeMount(){
        updateTasks();
    },
    template : '<div> <div class="row" > <div class="col-md-6 it" v-for="a in $store.state.tasks"> <div class="card "> <div class="card-header"> {{a.title}} </div> <div class="card-body"> <blockquote class="blockquote mb-0"> <p>{{a.description}}</p> <footer class="blockquote-footer">by {{a.author}}, <cite title="Source Title">for {{a.user}}.</cite></footer> </blockquote>  <button class="btn btn-success">close job</button> </div></div> </div></div></div>'
})

Vue.component('notice-view',{
    data : function(){
        return{
            view : 1
        }
    },
    methods: {
        options : function(i){
            const self = this;
            self.view = i;
        }
    },
    template : '<div> <br> <h4>Notifications</h4> <p>know whats going on</p><div><button @click="options(1)" class="btn btn-secondary">View</button>  <button @click="options(2)" class="btn btn-secondary">New Notification</button>  </div><hr> <notifications v-if="view ==1"></notifications> <create-notification v-if="view == 2"> </create-notification> </div>'
})

Vue.component('create-notification',{
    template : '<div><h4>Create notification</h4>  <div> <label>Enter your title</label><input class="form-control" placeholder="enter title"> <br> <label>Enter your title</label><input class="form-control" placeholder="enter body"></div> <button class="btn btn-success">Create</button> <br><br> </div>'
})

Vue.component('notifications',{
    template : '<div> <div class="row" > <div class="col-md-6 it" v-for="a in 3"> <div class="card "> <div class="card-header"> Alert </div> <div class="card-body"> <blockquote class="blockquote mb-0"> <p>send message to john</p> <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> </blockquote>   </div></div> </div></div></div>'
})

Vue.component('tools',{
    methods: {
        signOut : function(){
            store.commit('isLoading',true);
            document.cookie = "id="+ "0" +"; SameSite = None; Secure";
            document.cookie = "authkey="+ "0" +"; SameSite = None; Secure";
            setTimeout(function(){
                store.commit('isLoading',false);
                store.commit('login',false)
            },2000)
        }
    },
    template : '<ul class="list-group list-group-flush"> <li  class="list-group-item"><router-link class="link" to="/dashboard/manage/employees">Manage Employees</router-link></li> <li class="list-group-item"><router-link to="/app/info" class="link"> tips and info</router-link></li> <li class="list-group-item"><router-link class="link" to="/dashboard/manage/tasks">Manage tasks</router-link></li> <li class="list-group-item"><router-link class="link" to="/dashboard/notice">notice board</router-link></li> <li  class="list-group-item"><a @click="signOut()">Sign Out</a></li> </ul>'
})
Vue.component('create-job',{

    template : ' <div> <input ><input></div>'
})
Vue.component('profile',{
    data : function(){
        return{
            account : store.state.account.name,
            email : store.state.account.email,
            phone : store.state.account.phone
        }
    },
    template : '<div><br> <h4>Profile</h4> <hr> <p>Account name : {{account}}</p> <p>Email address: {{email}}</p> <p>Phone Number : {{phone}}</p> <br> <br><br></div>'
})

Vue.component('creating-task',{
    beforeMount(){
        updateEmployees();
    },
    data : function(){
        return{
            description : 'default description',
           
        }
    },
    methods: {
        createTask : async function(){
            const self = this;
            viewResetTasks();
            var e = document.getElementById('employees');
            var employeeFor = selectOption(e);
            var url = "http://localhost/OpenLab-Project/data/index.php/api/createTask";
            try{
                await axios.get(url,{
                    params : {
                        workId : store.state.account.id,

                        authkey : store.state.account.authkey,
                        employeeFor : employeeFor,
                        description : self.description,
                        title : store.state.taskTitle,
                        
                    }
                }).then(function(response){
                    if(response.data.res == "correct"){
                        gotResults("successfully created!");
                    }else{
                        gotResults('failed to create!')
                    }
                })
            }catch{
                gotResults('something bad happenned!');
            }
        }
    },
    template : '<div> <br> <h4>Creating task : <div class="alert alert-secondary">{{$store.state.taskTitle}}</div></h4>  <p>Add your tasks details below</p> <hr>  <label>Task description</label> <input v-model="description" class="form-control" placeholder="description"></input>  <br> <label>Employee id</label><select id="employees" class="form-select"><option v-for="a in $store.state.employees">{{a.name}}</option> </select><br> <button class="btn btn-success" @click="createTask()" >Create</button> <br><br></div>'
})

Vue.component('nav-bar',{
    template : '<div>    <nav class="navbar navbar-expand-lg navbar-dark bg-dark"> <div class="container-fluid"> <router-link class="navbar-brand" to="/dashboard/home" >OpenLab</router-link> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navbarNav"> <ul class="navbar-nav"> <li class="nav-item"> <router-link class="navbar-brand" to="/dashboard/profile" >Profile</router-link> </li> </ul> </div> </div> </nav></div>'
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

Vue.component('info',{
    template : '<div> <br> <h4>App info and tips</h4> <p>Learn more about openlab</p> <hr>  <br></div>'
})

Vue.component('manage-tasks',{
    beforeMount(){
        updateTasks();
    },
    data : function(){
        return {
            view : 1
        }
    },
    methods: {
        options: function(i){
            const self = this;
            self.view = i;
        }
    },
    template : '<div> <br> <h4>Manage your tasks</h4>  <p>select your tasks</p> <button class="btn btn-secondary" @click="options(1)">View</button> <button class="btn btn-secondary" @click="options(2)">Delete</button>  <hr> <delete-task  v-if="view ==2"></delete-task>  <view-task v-if="view ==1"></view-task> <br><br> </div>'
})

Vue.component('delete-task',{
    template : '<div> <h4>Delete tasks</h4> <table class="table"> <thead class="thead-dark"> <tr> <th scope="col">Task</th> <th scope="col">for</th><th scope="col">option</th></tr> </thead> <tbody> <tr v-for="a in $store.state.tasks"> <th scope="row">{{a.title}}</th> <td>{{a.user}}</td><td><button class="btn btn-danger">x</button></td> </tr> </tbody> </table> </div>'
})
Vue.component('add-tasks',{
    template : '<div>add</div>'
})

Vue.component('view-task',{
    template : '<div> <h6>viewing tasks</h6> <table class="table"> <thead class="thead-dark"> <tr> <th scope="col">Task</th> <th scope="col">for</th><th scope="col">description</th></tr> </thead> <tbody> <tr v-for="a in $store.state.tasks"> <th scope="row">{{a.title}}</th> <td>{{a.user}}</td><td>{{a.description}}</td> </tr> </tbody> </table>  </div>'
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
        path: '/dashboard/notice',
        component : 'notice-view'
    },
    {
        path: '/dashboard/profile',
        component: 'profile'
    },
    {
        path: '/dashboard/manage/tasks',
        component: 'manage-tasks'
    },
    {
        path: '/app/info',
        component: 'info'
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
        isLoggedIn : false,
        loading : true,
        taskTitle  : '',
        account : null,
        tasks : null,
        notifications : null,
        employees : null,


    },
    mutations : {
        login (state,value){
            state.isLoggedIn = value;
        },
        updateAccount(state,value){
            state.account = value;
        },
        updateEmployees(state,value){
            state.employees = value;
        },
        updateTasks(state,value){
            state.tasks = value;
        },
        updateNotifications(state,value){
            state.notifications = value;
        },
        isLoading(state,value){
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
        login2 : async function() {
            if(getCookie("authkey",8)){
                try{
                    store.commit('isLoading',true)
                    await axios.get("http://localhost/OpenLab-Project/data/index.php/api/second_auth",{
                        params:{
                            authkey : getCookie("authkey"),
                            workId : getCookie("id")
                        }
                    }).then(function(response){
                        if(response.data.res == "correct"){
                            console.log(response.data);
                            
                            store.commit('updateAccount',response.data);
                            document.cookie = "id="+ response.data.id +"; SameSite = None; Secure";
                            document.cookie = "authkey="+ response.data.authkey +"; SameSite = None; Secure";
                            setTimeout(function(){
                                store.commit('isLoading',false);
                                store.commit('login',true)
                            },2000)
                            
                        }else{
                            //failed to login
                            store.commit('isLoading',false);
                            store.commit('login',false)
                            //console.log('hello')
                            //var notification = alertify.notify('Error: check your details', '', 10, function(){  console.log('dismissed'); });
                            
                            
                        }
                    })
                }catch{
                    store.commit('isLoading',false);
                    store.commit('login',false)
                }
            }else{
                store.commit('isLoading',false);
                store.commit('login',false)
            }
        },
  
    },
    mounted() {
        this.login2()
    },
})

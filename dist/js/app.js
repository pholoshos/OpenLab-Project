//const { default: axios } = require("axios");


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

async function getNotifications(){
    var url = "https://openlabprojects.herokuapp.com/notifications/get";
    await axios.post(url,{
        authkey : store.state.account.authkey,
        _id :store.state.account._id,
        department : store.state.account.department
    }).then((response)=>{
        if(response.data){
            store.commit('updateNotifications',response.data)
            gotResults("done!")
            
        }else{
            gotResults("error!")
        }
        
    })
}

async function updateEmployees() {
    counter += 1;
    if(counter == 1){
        try{
            var url = "";
            var data = null;
            if(store.state.account.account == "admin"){
                url = "https://openlabprojects.herokuapp.com/account/all";

            }else{
                url = "https://openlabprojects.herokuapp.com/account/department";
            }
            store.commit('isLoading',true);
            await axios.post(url,{
                  
                    _id : store.state.account._id,
                    department : store.state.account.department,
                    authkey : store.state.account.authkey
                
            }).then(function(response){
                if(response.data){
                    counter = counter +1;
                    store.commit("updateEmployees",response.data);
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
            var url = "";
            var data = null;
            if(store.state.account.account == "admin"){
                data = {              
                    _id : store.state.account._id,
                    authkey : store.state.account.authkey,
                }
                url = "https://openlabprojects.herokuapp.com/task/admin";
            }else{
                data = {              
                    _id : store.state.account._id,
                    authkey : store.state.account.authkey,
                    status : 'incomplete'
                }
                url = "https://openlabprojects.herokuapp.com/task/all"; 
            }
            
            store.commit('isLoading',true);
            await axios.post(url,data).then(function(response){
                if(response.data){
                    counter2 = counter2 +1;
                    store.commit("updateTasks",response.data);
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
            account : 'admin'
        }
    },
    methods: {
        createNewJob : function(){
            store.commit('addTitle',this.title);
            router.push({ path: '/dashboard/createTask' })
        }
    },
    template : '<div> <nav-bar></nav-bar> <br> <div class="row container"> <div class="col-md-4 tls container" v-if="$store.state.account.account == account">  <h6>Quick tools</h6> <input class="form-control" v-model="title" placeholder="Enter your job title"></input><button class="btn btn-secondary" @click="createNewJob()">Create Job</button> <hr> <tools></tools></div> <div  v-if="$store.state.account.account != account" class="col-md-4"> <h6>Quick Tools</h6> <hr> <employee-tools></employee-tools> </div> <div class="col-md-8 space  container"><h6> <dash-icon></dash-icon> dashboard</h6> <hr> <router-view class="dash container"></router-view><br></div> <br> </div></div>'
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
            email : '',
            password  : '12345678',
            workId : randomString(10),
            position : 'worker',
            name : 'default name',
            department : 'general'
        }
    },
    methods: {
        create : async function(){
            const self = this;
            var check = checkData(self.phone,10) && checkData(self.password,8) && checkData(self.email,5) &&checkData(self.workId,8) &&checkData(self.name,2) && checkData(self.position,3); 
            if(check == true){
                try{
                    store.commit('isLoading',true);
                    var createUrl = "https://openlabprojects.herokuapp.com/account/create";
                    await axios.post(createUrl,{
                        
                            phone : self.phone,
                            emailAddress : self.email,
                            department : self.department,

                            password : self.password,
                            position : self.position,
                            name : self.name,
                            workId : self.workId,
                            _id : store.state.account._id,
                            authkey : store.state.account.authkey
                            
                        

                    }).then(function(response){
                        if(response.data){
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
    template : '<div>  <h4>New Employee </h4> <p>Add your tasks details below</p> <hr>  <label>Employee Name</label> <input class="form-control" v-model="name" placeholder="name"></input>  <br> <label>Email Address</label><input class="form-control" v-model="email" placeholder="email address"></input>  <br> <label>department</label><input class="form-control" v-model="department" placeholder="department name"></input>   <br><label>Password</label><input class="form-control"  placeholder="password" v-model="password"></input> <br><label>Phone number</label><input class="form-control" v-model="phone" placeholder="phone"></input> <br> <label>Work Id</label><input v-model="workId" class="form-control" placeholder="work id"></input> <br> <label>Position</label><input v-model="position" class="form-control" placeholder="position"></input> <br> <button class="btn btn-success" @click="create()">Create</button> <br><br></div>'
})

Vue.component('login',{
    data :function() {
        return{
            password : '',
            workId : '',
            warning : '..',
            authUrl : 'https://openlabprojects.herokuapp.com/auth/login'
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
                    await axios.post(self.authUrl,{
                            workId : self.workId,
                            password : self.password
                        
                    }).then(function(response){
                        if(response.data != null){
                            console.log(response.data);
                            store.commit('updateAccount',response.data);
                            document.cookie = "id="+ response.data._id +"; SameSite = None; Secure";
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
                    setTimeout(function(){
                        store.commit('isLoading',false);
                        store.commit('login',false)
                    },1000)
                    var notification = alertify.notify('failed!', '', 10, function(){  console.log('dismissed'); });
                }
            }else{
                var notification = alertify.notify('Error: enter a valid work id and password', '', 10, function(){  console.log('dismissed'); });
            }

        
        }
    },
    template : '<div> <form class="col-md-6 col-10 alert log"> <h2>OpenLab</h2><p>Sign into your openlab account</p> <hr> <div class="form-group"> <label for="workid">Work Id</label> <input v-model="workId" type="text" class="form-control" id="workid" aria-describedby="workid" placeholder="work id"> <small id="workid" class="form-text text-muted">enter your work id.</small> </div> <div class="form-group"><br> <label for="InputPassword1">Password</label> <input v-model="password" type="password" class="form-control" id="InputPassword1" placeholder="Password"> </div> <br><button type="button" @click="login()" class="btn btn-success">Sign in</button> </form></div>'
})
Vue.component('main-view',{
    template : '<div> <br><h4>Welcome to openlab</h4> <p>Your incomplete tasks are listed below</p> <hr> <tasks></tasks></div>'
})

Vue.component('manage-employees',{
    mounted() {
        updateEmployees();
    },
    data : function(){
        return{
            view : 1,
            accountType : 'admin'
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
    template : '<div><table class="table"> <thead class="thead-dark"> <tr> <th scope="col">employee id</th> <th scope="col">Name</th> <th scope="col">Phone</th> <th scope="col">email address</th> </tr> </thead> <tbody> <tr v-for="a in $store.state.employees"  v-if="a._id != $store.state.account._id"> <th scope="row">{{a.workId}}</th> <td>{{a.name}} ({{a.status}})</td> <td>{{a.phone}}</td> <td>{{a.emailAddress}}</td> </tr> </tbody> </table></div>'
})

Vue.component('delete-employee',{
    methods: {
        deleteEmployee: async function(a){
            
            if(checkData(a._id,7)){
                try{
                    store.commit('isLoading',true);
                    var url = "https://openlabprojects.herokuapp.com/account/delete";
                    await axios.post(url,{
                        
                            userId : a._id,
                            _id : store.state.account._id,
                            authkey : store.state.account.authkey,
                            
                        
                    }).then(function(response) {
                        if(response.data){
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
    template : '<div> <h6>Delete Employee</h6> <table class="table"> <thead class="thead-dark"> <tr> <th scope="col">employee id</th> <th scope="col">Name</th><th scope="col">option</th></tr> </thead> <tbody> <tr v-for="a in $store.state.employees" v-if="a._id != $store.state.account._id"> <th scope="row">{{a.workId}}</th> <td>{{a.name}}</td><td><button class="btn btn-danger" @click="deleteEmployee(a)">x</button></td> </tr> </tbody> </table> <br>  </div>'
})


Vue.component('tasks',{
    beforeMount(){
        updateTasks();
    },
    data : function(){
        return{
            complete :'complete'
        }
    },
    methods : {
        completeTask : function(a){
            var url = "https://openlabprojects.herokuapp.com/task/complete";
            try{
                store.commit('isLoading',true);
                axios.post(url,{
                    authkey : store.state.account.authkey,
                    _id : store.state.account._id,
                    taskId : a._id,
                    emailAddress : a.authorEmail,
                }).then((response)=>{
                    if(response.data){
                        store.commit('updateTasks',response.data);
                        store.commit('isLoading',false);
                    }else{
                        store.commit('isLoading',false);
                    }
                })
            }catch{
                store.commit('isLoading',false);
                store.commit('isLoading',false);
            }
        }
    },
    template : '<div> <div class="row" > <div class="col-md-6 it" v-for="a in $store.state.tasks" v-if="a.recipient == $store.state.account._id && a.status != complete "> <div class="card "> <div class="card-header"> {{a.title}} </div> <div class="card-body"> <blockquote class="blockquote mb-0"> <p>{{a.description}}</p> <br> <footer class="blockquote-footer">From {{a.authorName}}, <small title="Source Title">for {{a.recipientName}}.<hr> created {{a.date}}</small></footer> </blockquote>  <button @click="completeTask(a)" class="btn btn-success">I am Done!</button> </div></div> </div></div></div>'
})
Vue.component('employee-tools',{
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
    template : '<ul class="list-group list-group-flush"> <li class="list-group-item"><router-link to="/app/info" class="link"> tips and info</router-link></li> <li class="list-group-item"><router-link class="link" to="/dashboard/home">Your tasks</router-link></li> <li class="list-group-item"><router-link class="link" to="/dashboard/people">People</router-link></li> <li class="list-group-item"><router-link class="link" to="/dashboard/notice">notice board</router-link></li> <li  class="list-group-item"><a @click="signOut()">Sign Out</a></li> </ul>'
})
Vue.component('view-people',{
    mounted(){
        updateEmployees();
    },
    data : function(){
        return{
            inComplete : 'busy'
        }
    },
    template : '<div> <br><h4>Viewing people</h4> <p>list of people in your workplace</p>  <hr>    <table class="table"> <thead class="thead-dark"> <tr> <th scope="col">availability</th> <th scope="col">Name</th> <th scope="col">Phone</th> <th scope="col">email address</th> </tr> </thead> <tbody> <tr v-for="a in $store.state.employees" > <th scope="row"> <p v-if="a.status != inComplete" style="color:green">({{a.status}})</p> <p v-if="a.status == inComplete" style="color:red">({{a.status}})</p></th> <td>{{a.name}}</td> <td>{{a.phone}}</td> <td>{{a.emailAddress}}</td> </tr> </tbody> </table> <br> </div>'
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
            
        },
    },
    mounted(){
        getNotifications();
    },
    template : '<div> <br> <h4>Notifications</h4> <p>know whats going on</p><div><button @click="options(1)" class="btn btn-secondary">View</button>  <button @click="options(2)" class="btn btn-secondary">New Notification</button>  <button @click="options(3)" class="btn btn-secondary">Delete</button>  </div><hr> <notifications v-if="view ==1"></notifications> <create-notification v-if="view == 2"> </create-notification> <delete-notifications v-if=" view == 3"></delete-notifications> </div>'
})

Vue.component('delete-notifications',{
    data : function(){
        return {

        }
    },
    methods : {
        deleteNoti: async function(a){
            
            if(checkData(a._id,7)){
                try{
                    store.commit('isLoading',true);
                    var url = "https://openlabprojects.herokuapp.com/notifications/delete";
                    await axios.post(url,{
                        
                            notificationId : a._id,
                            _id : store.state.account._id,
                            authkey : store.state.account.authkey,
                            
                        
                    }).then(function(response) {
                        if(response.data){
                            getNotifications();
                            gotResults("done!");
                            setTimeout(function(){
                                store.commit('isLoading',false);

                            },1000)

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
    template : '<div>  <table class="table"> <thead class="thead-dark"> <tr> <th scope="col">title</th> <th scope="col">description</th><th scope="col">option</th></tr> </thead> <tbody> <tr  v-for="a in $store.state.notifications" v-if="a.author == $store.state.account._id"> <th scope="row">{{a.title}}</th> <td>{{a.description}}</td><td><button class="btn btn-danger" @click="deleteNoti(a)">x</button></td> </tr> </tbody> </table> <br> </div>'
})

Vue.component('create-notification',{
    data : function(){
        return{
            title : '',
            description : '',

        }
    },
    methods : {
        createNotification : function(){
            const self = this;
            if(self.title.length > 2 && self.description.length > 2){
                var url = "https://openlabprojects.herokuapp.com/notifications/create"
                store.commit('isLoading',true);
                axios.post(url,{
                    department : store.state.account.department,
                    _id : store.state.account._id,
                    authkey : store.state.account.authkey,
                    description : self.description,
                    title : self.title,
                    author : store.state.account._id,
                    authorName : store.state.account.name,
                }).then((response)=>{
                    if(response.data){
                        getNotifications();
                        self.title = "",
                        self.description = ""
                        setTimeout(function(){
                            store.commit('isLoading',false);
                            gotResults("done")
                        },2000)
                        
                    }else{
                        gotResults("failed!")
                    }
                })
            }
        }
    },
    template : '<div><h4>Create notification</h4>  <div> <label>Enter your title</label><input class="form-control" placeholder="enter title" v-model="title"> <br> <label>Enter description</label><input v-model="description" class="form-control" placeholder="enter body"></div> <button @click="createNotification()" class="btn btn-success">Create</button> <br><br> </div>'
})

Vue.component('notifications',{
    template : '<div> <div class="row" > <div class="col-md-6 it" v-for="a in $store.state.notifications"> <div class="card "> <div class="card-header"> {{a.title}} </div> <div class="card-body"> <blockquote class="blockquote mb-0"> <p>{{a.description}}</p> <footer class="blockquote-footer"> {{a.authorName}} <hr> <small> {{a.date}}</small></footer> </blockquote>   </div></div> </div></div></div>'
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
            email : store.state.account.emailAddress,
            phone : store.state.account.phone,
            status : store.state.account.status,
            position : store.state.account.position,
            department : store.state.account.department,
            workId : store.state.account.workId
        }
    },
    methods : {
         setAvailability : async function(a){
            try{
                var url = "https://openlabprojects.herokuapp.com/account/availability" ;
                var availability = ""
                if(a == 0){
                    availability = "busy"
                }if(a == 1){
                    var availability = "available"
                }
                store.commit('isLoading',true)
                await axios.post(url,{
                    authkey : store.state.account.authkey,
                    _id : store.state.account._id,
                    status : availability,
                }).then((response)=>{
                    if(response.data){
                        store.commit('updateAccount',response.data);
                        store.commit('isLoading',false);
                    }else{
                        store.commit('isLoading',false)
                    }
                })
            }catch{
                store.commit('isLoading',false)
            }
        }
    },
    template : '<div><br> <h4>Profile</h4> <hr><p>Status : {{status}}</p> <button @click="setAvailability(1)" class="btn btn-success">I am Available</button> or <button @click="setAvailability(0)" class="btn btn-danger">not available</button> <hr> <p>Account name : {{account}}</p> <p>Email address: {{email}}</p> <p>Department : {{department}}</p> <p>Phone Number : {{phone}}</p> <p>Position : {{position}}</p>  <br> <br><br></div>'
})

Vue.component('creating-task',{
    beforeMount(){
        updateEmployees();
    },
    data : function(){
        return{
            description : 'default description',
            selectedEmployee : null,
           
        }
    },
    methods: {
        selectPerson : function(a){
            const self = this;
            self.selectedEmployee = a;
            console.log(a.name);
        },
        createTask : async function(){
            const self = this;
            viewResetTasks();
            
            var url = "https://openlabprojects.herokuapp.com/task/new";
            if(store.state.taskTitle.length > 2){
                try{
                    store.commit('isLoading',true)
                    await axios.post(url,{
                        
                            _id : store.state.account._id,
                            authkey : store.state.account.authkey,
                            recipientName : self.selectedEmployee.name,
                            recipient : self.selectedEmployee._id,
                            author : store.state.account._id,
                            authorName : store.state.account.name,
                            emailAddress : self.selectedEmployee.emailAddress,
                            description : self.description,
                            title : store.state.taskTitle,
                            authorEmail : store.state.account.emailAddress,
                            
                        
                    }).then(function(response){
                        if(response.data){
                            gotResults("successfully created!");
                            store.commit('isLoading',false);
                            store.state.taskTitle = "";
                        }else{
                            gotResults('failed to create!')
                            store.commit('isLoading',false);
                        }
                    })
                }catch(e){
                    gotResults('something bad happenned!');
                    store.commit('isLoading',false);
                    console.log(e);
                }
            }

        }
    },
    template : '<div> <br> <h4>Creating task : <div class="alert alert-secondary">{{$store.state.taskTitle}}</div></h4>  <p>Add your tasks details below</p> <hr>  <label>Task description</label> <input v-model="description" class="form-control" placeholder="description"></input>  <br> <label>Employee id</label><select id="employees" class="form-select"><option  v-for="a in $store.state.employees" @click="selectPerson(a)">{{a.name}}  ({{a.status}})</option> </select><br> <button class="btn btn-success" @click="createTask()" >Create</button> <br><br></div>'
})

Vue.component('nav-bar',{
    data : function(){
        return{
            status : store.state.account.status,
            isBusy : 'busy',
        }
    },
    methods : {
        changeStatus : function(){
            
        }
    },
    template : '<div>    <nav class="navbar navbar-expand-lg navbar-dark bg-dark"> <div class="container-fluid"> <router-link class="navbar-brand" to="/dashboard/home" ><img height="28" style="margin-bottom:5px;" src="./logo.png"> OPENLAB</router-link> <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button> <div class="collapse navbar-collapse" id="navbarNav"> <ul class="navbar-nav"> <li class="nav-item"> <router-link class="ln" to="/dashboard/profile" >Profile</router-link> </li><li class=" navbar-item" style="color:green" v-if="status != isBusy ">Status({{status}})</li> <li class=" navbar-item" style="color:red" v-if="status == isBusy ">Status({{status}})</li></ul> </div> </div> </nav></div>'
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
    methods :{
        deleteTask : function(a){
            
            if(a._id.length > 1){
                
                try{
                    console.log(a)
                    var url = "https://openlabprojects.herokuapp.com/task/delete";
                    store.commit('isLoading',true)
                    axios.post(url,{
                        taskId : a._id,
                        _id : store.state.account._id,
                        authkey : store.state.account.authkey
                    
                    }).then((response)=>{
                        if(response.data){
                            store.commit('updateTasks',response.data)
                            setTimeout(function(){
                                store.commit('isLoading',false);
                               
                            },2000)
                            
                        }else{
                            store.commit('isLoading',false)
                        }
                    })
                }catch{
                    store.commit('isLoading',false)
                }
            }
        }
    },
    data : function(){
        return{
            inComplete : 'incomplete'
        }
    },

    template : '<div> <h4>Delete tasks</h4> <table class="table"> <thead class="thead-dark"> <tr> <th scope="col">Task</th> <th scope="col">for</th><th scope="col">option</th></tr> </thead> <tbody> <tr v-for="a in $store.state.tasks"> <th scope="row">{{a.title}}  <p v-if="a.status != inComplete" style="color:green">({{a.status}})</p> <p v-if="a.status == inComplete" style="color:red">({{a.status}})</p></th> <td>{{a.recipientName}}</td><td><button @click="deleteTask(a)"  class="btn btn-danger">x</button></td> </tr> </tbody> </table> </div>'
})
Vue.component('add-tasks',{
    template : '<div>add</div>'
})

Vue.component('view-task',{
    data : function(){
        return{
            isComplete : 'incomplete'

        }
    },
    template : '<div> <h6>viewing tasks</h6> <table class="table"> <thead class="thead-dark"> <tr> <th scope="col">Task</th> <th scope="col">for</th><th scope="col">description</th></tr> </thead> <tbody> <tr v-for="a in $store.state.tasks"> <th scope="row">{{a.title}} <p v-if="a.status != isComplete" style="color:green">({{a.status}})</p> <p v-if="a.status == isComplete" style="color:red">({{a.status}})</p></th> <td>{{a.recipientName}}</td><td>{{a.description}}</td> </tr> </tbody> </table>  </div>'
})
Vue.component('user-tasks',{
    template : '<div><h1>tasks</h1></div>'
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
    },
    {
        path : '/dashboard/people',
        component : 'view-people'
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
            if(getCookie("authkey") != null){
                try{
                    store.commit('isLoading',true)
                    await axios.post("https://openlabprojects.herokuapp.com/auth",{
                        
                            authkey : getCookie("authkey"),
                            _id : getCookie("id")
                       
                    }).then(function(response){
                        if(response.data){
                            console.log(response.data);
                            
                            store.commit('updateAccount',response.data);
                            document.cookie = "id="+ response.data._id +"; SameSite = None; Secure";
                            document.cookie = "authkey="+ response.data.authkey +"; SameSite = None; Secure";
                            getNotifications()
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

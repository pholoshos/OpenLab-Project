const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv/config');

const serveStatic = require("serve-static")

const path = require('path');
app = express();
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes  related stuff
const accountRoute = require('./routes/account')
app.use('/account',accountRoute)

const tasksRoute = require('./routes/tasks')
app.use('/task',tasksRoute)

const authRoute = require('./routes/auth')
app.use('/auth',authRoute)

const usersRoute = require('./routes/users')
app.use('/users',usersRoute)

const notificationRoute = require('./routes/notifications')
app.use('/notifications',notificationRoute)



//serve the html pages
app.use(serveStatic(path.join(__dirname, 'dist')))

//connect to database
mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,   })   
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));


//get the port number
const port = process.env.PORT || 3000;

//then listen to the port, will be http://localhost:3000
app.listen(port,()=>{
    console.log('running on port 3000')
});


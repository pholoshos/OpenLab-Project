const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const serveStatic = require("serve-static")
const path = require('path');
app = express();


//routes for account related stuff
const accountRoute = require('./routes/account')
app.use('/account',accountRoute)

//serve the html pages
app.use(serveStatic(path.join(__dirname, 'dist')))

//connect to database
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true },()=>{
    console.log('connected');
});

//get the port number
const port = process.env.PORT || 3000;

//then listen to the port, will be http://localhost:3000
app.listen(port,()=>{
    console.log('running on port 3000')
});


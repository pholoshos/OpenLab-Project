const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
app = express();

const accountRoute = require('./routes/account')
app.use('/account',accountRoute)
app.use(serveStatic(path.join(__dirname, 'dist')))
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('running on port 3000')
});


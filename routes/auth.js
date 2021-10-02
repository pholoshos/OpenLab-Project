const express = require('express');
const { post } = require('./tasks');
const router = express.Router();


router.get('/',(req,res)=>{
    res.send('auth');
    
})
router.post('/login',(req,res) =>{
    res.send('you are login in');
    
})



module.exports = router;
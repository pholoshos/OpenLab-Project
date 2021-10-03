const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/',(req,res)=>{
    res.send('account');
});

router.post('/create',(req,res)=>{
    
    const user = new User({
        workId : req.body.workId,
        emailAddress : req.body.emailAddress,
        phone : req.body.bio,
        position : req.body.password,
        department : req.body.department,
        password : req.body.password,
        name : req.body.name,
        
    })

    User.create(user,(err,user)=>{
        if(err){
            res.status(404).json('user not found: '+err);
        }else{
            res.json({mess : 'done!'})
        }
    })
})
router.get('/all',(req,res)=>{
   const data = {
       
   }
});

router.get('/department',(req,res)=>{
   
});

router.get('/position',(req,res)=>{
   
});


module.exports = router;
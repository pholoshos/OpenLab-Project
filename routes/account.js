const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/',(req,res)=>{
    res.send('account');
});

router.post('/create',(req,res)=>{

    const data = {
        authkey  : req.body.authkey,
        _id: req.body._id,
        account : 'admin',
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){
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
        }else{
            res.status(500).json("error")
        }
    })

})
router.get('/all',(req,res)=>{
    const data = {
        authkey  : req.body.authkey,
        _id: req.body._id
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){
            User.find({},'emailAddress position department name workId phone status',(err,accounts)=>{
                if(!err){
                    res.json(accounts);
                }else{
                    res.status(500).json('error')
                }
            })
        }else{
            res.status(500).json('error')
        }
    })

});

router.get('/department',(req,res)=>{
    const data = {
        authkey  : req.body.authkey,
        _id: req.body._id
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){
            const newData = {
                department : req.body.department
            }
            User.find(newData,'emailAddress position department name workId phone status',(err,accounts)=>{
                if(!err){
                    res.json(accounts);
                }else{
                    res.status(500).json('error')
                }
            })
        }else{
            res.status(500).json('error')
        }
    })
});

router.get('/position',(req,res)=>{
    const data = {
        authkey  : req.body.authkey,
        _id: req.body._id
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){
            const newData = {
                position : req.body.position
            }
            User.find(newData,'emailAddress position department name workId phone status',(err,accounts)=>{
                if(!err){
                    res.json(accounts);
                }else{
                    res.status(500).json('error')
                }
            })
        }else{
            res.status(500).json('error')
        }
    })
});

router.get('/available',(req,res)=>{
    const data = {
        authkey  : req.body.authkey,
        _id: req.body._id
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){
            const newData = {
                status : 'available'
            }
            User.find(newData,'emailAddress position department name workId phone status',(err,accounts)=>{
                if(!err){
                    res.json(accounts);
                }else{
                    res.status(500).json('error')
                }
            })
        }else{
            res.status(500).json('error')
        }
    })
});

router.get('/busy',(req,res)=>{
    const data = {
        authkey  : req.body.authkey,
        _id: req.body._id
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){
            const newData = {
                status : 'busy'

            }
            User.find(newData,'emailAddress position department name workId phone status',(err,accounts)=>{
                if(!err){
                    res.json(accounts);
                }else{
                    res.status(500).json('error')
                }
            })
        }else{
            res.status(500).json('error')
        }
    })
});


module.exports = router;
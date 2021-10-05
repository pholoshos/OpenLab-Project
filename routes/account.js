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
                account : "user"
                
            })
        
            User.create(user,(err,user)=>{
                if(err){
                    res.status(404).json('error: '+err);
                }else{
                    res.json({mess : 'done!'})
                }
            })
        }else{
            res.status(500).json("error")
        }
    })

})
router.post('/all',(req,res)=>{
    const data = {
        _id : req.body._id,
        authkey  : req.body.authkey,
        
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){
            User.find({},'emailAddress position department name workId phone status',(err,accounts)=>{
                if(!err){
                    res.json(accounts);
                }else{
                    res.status(500).json(err)
                }
            })
        }else{
            res.status(500).json(foundUser +" - for: "+data._id+" .")
        }
    })

});

router.post('/department',(req,res)=>{
    const data = {
        authkey  : req.body.authkey,
        _id: req.body._id
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){
            const newData = {
                department : req.body.department
            }
            User.find(newData,'emailAddress position department name workId status  phone ',(err,accounts)=>{
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
router.post('/delete',(req,res)=>{
    if(req.body.userId != req.body._id){
        const data = {
            authkey  : req.body.authkey,
            _id: req.body._id,
            account : 'admin'
        }
        User.exists(data,(err,foundUser)=>{
            if(!err && foundUser){
                const userData = {
                    _id : req.body.userId,
                    
                }
                User.deleteOne(userData,(err)=>{
                    if(!err){
                        res.json({results: 'done'})
                    }else{
                        res.status(500).json('failed')
                    }
                })
            }else{
                res.status(500).json('eror');
            }
        })
    }else{
        res.status(500).json("cant delete your own account");
    }

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


router.post('/available',(req,res)=>{
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

router.post('/busy',(req,res)=>{
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

router.post('/availability',(req,res)=>{
    const data = {
        authkey  : req.body.authkey,
        _id: req.body._id
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){
            const newData = {
                authkey : req.body.authkey,
                _id : req.body._id
            }
            User.updateOne(newData,{
                status : req.body.status
            }, (err)=>{
                if(err){
                    res.status(500).json('something went wrong');
                    //return false;
                }
            })
            User.findOne(data,'workId name authkey emailAddress account status phone department position _id',(err,user)=>{
                if(err){
                    res.status(500).json('something went wrong');
                    //return false;
                }else{
                    res.json(user);
                    
                }
            })
        }else{
            res.status(500).json('error')
        }
    })
});


module.exports = router;
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notifications');
const User = require('../models/User');


router.post('/delete',(req,res)=>{
    const data = {
        authkey  : req.body.authkey,
        _id: req.body._id
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){
            const notDat = {
                _id : req.body.notificationId
            }
            Notification.deleteOne(notDat,(err)=>{
                if(!err){
                    Notification.find({department : req.body.department},(err,notifications)=>{
                        if(!err){
                            res.json(notifications);
                        }else{
                            res.status(500).json("error");
                        }
                    })
                }else{
                    res.status(500).json("error");
                }
            })
        }else{
            res.status(500).json("error");
        }
    })

});

router.post('/get',(req,res)=>{
    const data = {
        authkey  : req.body.authkey,
        _id: req.body._id
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){

            Notification.find({department : req.body.department},(err,notifications)=>{
                if(!err){
                    res.json(notifications);
                }else{
                    res.status(500).json("error");
                }
            })
        }else{
            res.status(500).json('eror');
        }
    })
});

router.post('/create',(req,res)=>{
    const data =   {
        _id : req.body._id,
        authkey : req.body.authkey,
        
    }
    User.exists(data,(err,userFound)=>{
        if(err){
            res.json(500).json('error!');
        }else{
            const notification = new Notification({
                title : req.body.title,
                description : req.body.description,
                author : req.body.author,  
                department : req.body.department, 
                authorName : req.body.authorName,  
            })
            Notification.create(notification,(err,notif)=>{
                if(err){
                    res.status(500).json("error");
                }else{
                    res.json({results : 'done'})
                }
            })
        }
    })
});

module.exports = router;
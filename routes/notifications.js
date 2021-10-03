const express = require('express');
const router = express.Router();
const Notification = require('../models/Notifications');


router.get('/delete',(req,res)=>{
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
                    res.json("done");
                }else{
                    res.status(500).json("error");
                }
            })
        }else{
            res.status(500).json("error");
        }
    })

});

router.get('/',(req,res)=>{
    const data = {
        authkey  : req.body.authkey,
        _id: req.body._id
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){

            Notification.find({},(err,notifications)=>{
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

router.post('/',(req,res)=>{
    const data =   {
        _id : req.body._id,
        authkey : req.body.authkey,
        position : 'admin'
    }
    User.exists(data,(err,userFound)=>{
        if(err){
            res.json(500).json('error!');
        }else{
            const notification = new Notification({
                title : req.body.title,
                description : req.body.description,
                author : req.body.author,     
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
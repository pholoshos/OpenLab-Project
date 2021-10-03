const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const router = express.Router();



router.get('/',(req,res)=>{
    res.send('get');
});

router.get('/all',(req,res)=>{
    const data = {
        authkey  : req.body.authkey,
        _id: req.body._id
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){
            const taskData = {
                recipient : req.body._id,
                status :  req.body.status,
            }
            Task.find(taskData,(err,tasks)=>{
                if(!err){
                    res.json(tasks);
                }else{
                    res.status(500).json("error");
                }
            })
        }else{
            res.status(500).json('eror');
        }
    })
});


router.post('/new',(req,res)=>{
    const data =   {
        _id : req.body._id,
        authkey : req.body.authkey,
        position : 'admin'
    }
    User.exists(data,(err,userFound)=>{
        if(err && !userFound){
            res.json(500).json('error!');
        }else{
            const task = new Task({
                title : req.body.title,
                description : req.body.description,
                author : req.body.author,
                recipientName : req.body.recipientName,
                recipient : req.body.recipient,
        
        
            })
            Task.create(task,(err,task)=>{
                if(err){
                    res.status(500).json(err);
                }else{
                    res.json({results : 'done'})
                }
            })
        }
    })
});

router.post('/delete',(req,res)=>{
    const data = {
        authkey  : req.body.authkey,
        _id: req.body._id
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){
            const taskData = {
                _id : req.body.taskId,
                author : req.body._id,
            }
            Task.deleteOne(taskData,(err)=>{
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

});

router.post('/edit',(req,res)=>{
    res.send('edit');
});

router.post('/complete',(req,res)=>{
    const data = {
        authkey  : req.body.authkey,
        _id: req.body._id
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){
            const taskData = {
                _id : req.body.taskId,
                
            }
            Task.findOneAndUpdate(taskData,{status: 'complete'},(err,isDone)=>{
                if(!err){
                    res.json({results :'done'});
                }else{
                    res.status(500).json('error')
                }
            })
        }else{
            res.status(500).json('eror');
        }
    })

});


const  checkUser = (data)=>{
   
    User.exists(data,(err,foundUser)=>{
       if(!err&&foundUser){
            return true;
       }else{
           return false;
       }
    })
    
    
}


module.exports = router;
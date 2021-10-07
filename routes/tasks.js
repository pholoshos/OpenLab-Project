const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const router = express.Router();

const mailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


router.get('/',(req,res)=>{
    res.send('get');
});

router.post('/all',(req,res)=>{
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

router.post('/admin',(req,res)=>{
    const data = {
        authkey  : req.body.authkey,
        _id: req.body._id
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){
            const taskData = {
                author : req.body._id,
                
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
                authorName : req.body.authorName,
                description : req.body.description,
                author : req.body.author,
                recipientName : req.body.recipientName,
                recipient : req.body.recipient,
                authorEmail : req.body.authorEmail,
        
        
            })
            Task.create(task,(err,task)=>{
                if(err){
                    res.status(500).json(err);
                }else{
                    res.json({results : 'done'})
                    sendMessage(req,res,3)
                }
            })
        }
    })
});

router.post('/delete',(req,res)=>{
    const data = {
        authkey  : req.body.authkey,
        _id: req.body._id,
        account : 'admin'
    }
    User.exists(data,(err,foundUser)=>{
        if(!err && foundUser){
            const taskData = {
                _id : req.body.taskId,
                author : req.body._id,
            }
            Task.deleteOne(taskData,(err)=>{
                if(!err){
                    
                }else{
                    res.status(500).json('failed')
                }
            })
            var findData = {
                author : req.body._id,
            }
            Task.find(findData,(err,tasks)=>{
                if(!err){
                    res.json(tasks);
                }else{
                    res.status(500).json(err);
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
            Task.findOneAndUpdate(taskData,{status: 'complete'},(err,tasks)=>{
                if(!err){
                    res.json(tasks);
                    sendMessage(req,res,4)
                }else{
                    res.status(500).json('error')
                }
            })
        }else{
            res.status(500).json('eror');
        }
    })

});

//send email
//send email
const sendMessage = (req,res,op)=>{

    var data = "";
    var sub = ""
    if(op == 1){
        sub = "Openlab Account Activated!"
        data = '<p>Hello , someone has created an account for you on openlab, here are the login details.</p> <h4>Work ID is: </h4>'+req.body.workId+'<h4>Password:</h4>'+req.body.password+"<br><small>for more info goto <a href='https://openlabprojects.herokuapp.com/'>https://openlabprojects.herokuapp.com/</a></small>";
    }if(op == 2){
        sub = "Openlab account terminated!"
        data = "<p>Notification!</p><h4>Your openlab account has been closed. you will nolonger have access  to openlab</h4> <br><small>for more info goto <a href='https://openlabprojects.herokuapp.com/'>https://openlabprojects.herokuapp.com/</a></small>"
    }if(op == 3){
        sub = "New Task From "+req.body.authorName+" on Openlab"
        data = "<h4>You have A new Task from "+req.body.authorName+"</h4><p> task description : "+req.body.description+" </p> <br><small>for more info goto <a href='https://openlabprojects.herokuapp.com/'>https://openlabprojects.herokuapp.com/</a></small>"
    }
    if(op == 4){
        sub = " "+req.body.authorName+" has completed Task on Openlab"
        data = "<h4>You have A new Task from "+req.body.authorName+"</h4><p> task description : "+req.body.description+" </p> <br><small>for more info goto <a href='https://openlabprojects.herokuapp.com/'>https://openlabprojects.herokuapp.com/</a></small>"
    }


    var transporter = mailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'openlabprojects@gmail.com',
          pass: 'Victor03@'
        }
      }));
      
      var mailOptions = {
        from: 'openlabprojects@gmail.com',
        to: req.body.emailAddress,
        subject: sub,
        html: data
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    //res.json("done")
    
}
    


module.exports = router;

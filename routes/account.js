const express = require('express');
const router = express.Router();
const mailer = require('nodemailer');
const User = require('../models/User');
var smtpTransport = require('nodemailer-smtp-transport');

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
                phone : req.body.phone,
                position : req.body.position,
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
                    sendMessage(req.res,1)
                }
            })
        }else{
            res.status(500).json("error")
        }
    })

})
router.post('/sendMessage',(req,res)=>{
    sendMessage(req,res,1);
});

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
                        sendMessage(req,res,2)
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
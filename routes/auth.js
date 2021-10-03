const express = require('express');
const { post } = require('./tasks');
const router = express.Router();
const random = require('../logic/random');

const User = require('../models/User');


// auth with password and email (primary)
router.post('/login',(req,res)=>{
    
    const data = {
        workId : req.body.workId,
        password : req.body.password
    };
    check(data,0,res);


});

//for auth with authkey and id (secondary)

router.post('/',(req,res)=>{
    const authData = {
        authkey : req.body.authkey,
        _id : req.body._id,
    }
    check(authData,1,res);
    

});



//used for both authentification using email and password
// and auth using authkey and account id

const check = async (data,op,res)=>{
    const rand =  random(30);
    await User.exists(data,(err,userFound)=>{
         if(err){
             res.status(404).json('user error');
             return false;
         }else{
             if(userFound){
                 if(op == 0){
   
                     User.updateOne(data,{
                         authkey : rand
                     }, (err)=>{
                         if(err){
                             res.status(500).json('something went wrong');
                             return false;
                         }
                     })
                  
                 }
                 User.findOne(data,'workId name authkey emailAddress phone department position _id',(err,user)=>{
                     if(err){
                         res.status(500).json('something went wrong');
                         return false;
                     }else{
                         if(op == 3){
                             return true;
                         }else{
                             res.json(user);
                         }
                         
                     }
                 })
 
             }else{
                 res.status(404).json('user not found');
                 if(op == 3){
                     return false;
                 }
             }
         }
     })
 }



module.exports = router;
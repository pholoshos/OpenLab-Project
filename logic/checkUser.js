
const User= require('../models/User');

const  checkUser = (data)=>{
   
    User.exists(data,(err,foundUser)=>{
       if(!err,foundUser){
            return true;
       }else{
           return false;
       }
    })
    
    
}

module.exports = checkUser;
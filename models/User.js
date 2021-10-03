
const mongoose = require('mongoose');
const random = require('../logic/random');


const UserSchema = mongoose.Schema({
    username : {
        type : String,
        lowercase: true,
        required : true,
    },
    workId : {
        required : true,
        type : String
    },
    name : {
        required : true,
        type : String,
    },
    password : {
        required : true,
        type : String,
    },
    authkey : {
        required: true,
        type : String,
        default : random(12),

    },
    emailAddress: {
        required : true,
        type : String,
        required : true,

    },
    position : {
        type : String,
        required : false,
        default : 'not set'
    },
    department : {
        type : String,
        default : 'any',
        required : false,
    },
    phone : {
        type : String,
        required : false,
    }
});

module.exports = mongoose.model('User',UserSchema);
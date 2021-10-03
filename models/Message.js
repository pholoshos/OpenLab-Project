const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    recipient : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now,

    },
    status : {
        type : String,
        default : 'closed'
    }
});

module.exports = mongoose.model('Message',MessageSchema);
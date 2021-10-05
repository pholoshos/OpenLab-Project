const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    author : {
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
    department : {
        type : String,
        required : true,
    },
    authorName : {
        type : String,
        required : true,
    }

});

module.exports = mongoose.model('Notification',NotificationSchema);
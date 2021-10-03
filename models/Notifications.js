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

    }

});

module.exports = mongoose.model('Notification',NotificationSchema);
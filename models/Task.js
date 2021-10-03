const mongoose = require('mongoose');

const TasksSchema = mongoose.Schema({
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
    recipientName : {
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
        default : 'incomplete'
    }
});

module.exports = mongoose.model('Task',TasksSchema);
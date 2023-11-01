const mongoose = require('mongoose');

const {Schema} = mongoose;

const TaskSchema = new Schema({
    email : {
        type : "String",
        required : true
    },
    task:{
        type : "String",
        required : true
    },
    status :{
        type : Boolean,
        default : false
    }
});

const taskModel = mongoose.model('tasks', TaskSchema);

module.exports = { taskModel};
const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    name : String,
    phone: String,
    password: String
});

const TaskSchema = new Schema({
    username : {
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

const userModel = mongoose.model('users',userSchema);
const taskModel = mongoose.model('tasks', TaskSchema);

module.exports = {userModel, taskModel};
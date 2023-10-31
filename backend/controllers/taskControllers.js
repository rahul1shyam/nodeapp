
const {taskModel} = require('../models/taskSchema');


const addTask = async (req,res) =>{
    const {username, task} = req.body;
    console.log("addtask");
    
    if(!username || !task){
        return res.status(400).json({"error" : "Please fill required fields"});
    }
    try {        
        console.log('before adding');
        await taskModel({
            username : username,
            task : task,
            status : false
        }).save();
        console.log('added');
        return res.sendStatus(200);   
    } catch (error) {
        console.log('error');
        return res.status(400).json({"err" : error});
    }
}

const removeTask = async (req,res) =>{
    console.log(req.params.id);
    const id = req.params.id;

    try {
        await taskModel.deleteOne({_id : id});
        console.log("removed");
        return res.sendStatus(200);
    } catch (error) {
        console.log('error');
        return res.status(400).json({"err" : error});
    }
}

const getTask = async (req,res) =>{
    const user = "rahul";
    
    try {
        
         
    } catch (error) {
        console.log('error');
        return res.status(400).json({"err" : error});
    }
}
module.exports = {addTask,removeTask};

const {taskModel} = require('../models/taskSchema');
const  {getFromCatch, saveInCatch, deleteKey} = require('../db/redisConnect');

const addTask = async (req,res) =>{
    const {task} = req.body;
    const email = req.email;
    console.log("addtask");
    console.log(req.email);
    if(!email || !task){
        return res.status(400).json({"error" : "Please fill required fields"});
    }
    try {        
        console.log('before adding');
        await taskModel({
            email : email,
            task : task,
            status : false
        }).save();

        await deleteKey(req.email);
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
        await deleteKey(req.email);

        console.log("removed");
        return res.sendStatus(200);
    } catch (error) {
        console.log('error');
        return res.status(400).json({"err" : error});
    }
}

const getTask = async (req,res) =>{
    try {
        const data = await getFromCatch(req.email);
        
        console.log(data.status);
        if(data.status=="CATCH HIT"){
            console.log("data was in catch");
            return res.status(200).json(data);
        }
        console.log("tasks");

        const tasks = await taskModel.find({email: req.email});
        await saveInCatch(req.email, tasks);
        console.log("data was not in the catch");
        return res.status(200).json(tasks);
    } catch (error) {
        console.log('error1');
        return res.status(400).json({"err" : error});
    }
}
module.exports = {addTask,removeTask,getTask};
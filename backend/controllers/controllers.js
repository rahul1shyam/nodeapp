
const {userModel,taskModel} = require('../models/schema');

const login = (req,res)=>{
    const {name, pass} = req.body;
    console.log(name,pass);

    //we can make password encrypted so that no one can see it, 
    console.log('at login');
    
    //authentication code, checking in database, and validating the credentials

    return res.sendStatus(200);
}

const register = (req ,res)=>{
    const {name, phone} = req.body;
    console.log(name,phone);

    //1. strong password checker
    //2. encrytping password
    //3. validating the detail are not in the database already, if not add them to the database.

    console.log('at register');
    return res.status(200).json({"name" : name, "phone" : phone});
}

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
module.exports = {login, register,addTask,removeTask};
const jwt = require('jsonwebtoken'); 
const {userModel} = require('../models/userSchema');
const { encryptUser } = require('./auth');

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

const login = async (req,res)=>{
    const {email,password} = req.body;
    
    if(!email || !password){
        console.log("missing fields");
        return res.status(400).json({"error " : "Please fill all the required fields"});
    }
    
    if(!(await validateEmail(email))){
        console.log('invalid email');
        return res.status(400).json({"error" : "Enter Valid Email Address"});
    }
    const doesExistEmail = await userModel.findOne({email : email});


    if(!doesExistEmail){
        console.log('Email not registered');
        return res.status(400).json({"error" : "Email Address not registered"});
    }
    
    if(!doesExistEmail.password.match(password)){
        return res.status(401).json({"error" : "Wrong password"});
    }

    const userToken = await encryptUser(doesExistEmail); 
    
    res.cookie("jwt",userToken);

    console.log(`SuccessFully logged in as ${doesExistEmail.name}`);

    return res.status(200).send({success : true, jwt : req.cookies.jwt});
}

const register = async (req ,res) => {
    const {name,email, password} = req.body;
    
    if(!name || !email || !password){
        console.log("missing fields");
        return res.status(400).json({"error " : "Please fill all the required fields"});
    }
    
    if(!(await validateEmail(email))){
        console.log('invalid email');
        return res.status(400).json({"error" : "Enter Valid Email Address"});
    }
    
    //checking if the email is already in our database or not
    
    const doesExistEmail = await userModel.findOne({email : email});

    if(doesExistEmail){
        console.log('already exist email');
        return res.status(400).json({"error" : "Email Address already in use"});
    }

    if(password.length<6){
        console.log('weak password atleast 6 characters are required');
        return res.status(400).json({"error" : "Password length should be atleast 6"});
    }

    try {
       await userModel({
            name : name,
            email : email,
            password : password
        }).save();
        
        return res.status(201).send("Registration Successfull");

    } catch (error) {
        return res.status(400).send(error);
    }

}


module.exports = {login, register};
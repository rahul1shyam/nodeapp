const jwt = require('jsonwebtoken'); 
const userModel = require('../models/userSchema');

require('dotenv').config({path : "config/.env"})

const encryptUser = async (user) =>{

    const user_new = {
        name : user.name,
        email : user.email
    };
    try {
        const token =  await jwt.sign(user_new, process.env.JWT_SECRET_TOKEN);
        return token;
    } catch (error) {
        console.log(error);
    }
};

const auth = async(req,res,next) =>{

    try {
        
        const token = req.cookies.jwt;
        if(!token){
            console.log("here");
            return res.status(401).json({message : "Unauthorized user"});
        }else{

            const user = await jwt.verify(token, process.env.JWT_SECRET_TOKEN);
            req.email = user.email;
            console.log(req.email);
            req.name = user.name;
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message : "Unauthorized user"});
    }

}
module.exports = {encryptUser,auth};
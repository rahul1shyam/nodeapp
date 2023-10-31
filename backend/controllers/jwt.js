const jwt = require('jsonwebtoken'); 
const userModel = require('../models/userSchema');

require('dotenv').config({path : "config/.env"})

const encryptUser = async (user) =>{
    console.log("encrypting user")

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

const decryptUser = async (token)=>{
    return await jwt.verify(token, process.env.JWT_SECRET_TOKEN);
}
module.exports = {encryptUser,decryptUser};
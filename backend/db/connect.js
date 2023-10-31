const mongoose = require('mongoose');

const uri = "mongodb+srv://rahul:waVTPF8n4QiYZCR5@cluster0.9szshx2.mongodb.net/";

const connectDB = async ()=>{
    await mongoose.connect(uri);
    console.log('db connected');
};

module.exports = connectDB;
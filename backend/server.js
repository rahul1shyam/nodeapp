const express = require('express');
const app = express();
const {userModel,taskModel} = require('./models/schema');
const connectDB = require('./db/connect');

connectDB();



require('dotenv').config({path : "config/.env"})
//middle ware

app.use(express.json());
app.use('/', require('./routes/routes'));

//server config
PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`App is running on port ${PORT}`));



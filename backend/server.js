const express = require('express');
const app = express();
const connectDB = require('./db/mongoDBconnect');

connectDB();
require('dotenv').config({path : "config/.env"});
//middle ware


const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());
app.use('/', userRoutes);
app.use('/', taskRoutes);

//server config
PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`App is running on port ${PORT}`));



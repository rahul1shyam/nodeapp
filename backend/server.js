const express = require('express');
const app = express();
const connectDB = require('./db/mongoDBconnect');
const connectRedis = require('./db/redisConnect');
const cookieParser = require('cookie-parser');

connectDB();


require('dotenv').config({path : "config/.env"});
//middle ware
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(cookieParser())
app.use(express.json());
app.use('/', userRoutes);
app.use('/', taskRoutes);

//server config
PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`App is running on port ${PORT}`));



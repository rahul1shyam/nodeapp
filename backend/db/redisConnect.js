
const redis = require('redis');
require('dotenv').config({path : "../config/.env"});

const getFromCatch = async (key)=>{

    try {
        console.log('Connecting Redis');
        const client = await redis.createClient(process.env.REDIS_HOST, process.env.REDIS_PORT);
        
        client.on('error', (err)=>{
            console.error(err.message)
        })
        await client.connect();
        console.log(key);
        const data = await client.get(key);
    
        if(data!=null){
            return {'status' : "CATCH HIT" , 'data' : JSON.parse(data)};
        }
        return {'status' : "CATCH MISS" , 'data' : null};

    } catch (error) {
        console.log(error);
    }
}

const saveInCatch = async (key, data) =>{
    
    try {
        const client = await redis.createClient(process.env.REDIS_HOST, process.env.REDIS_PORT);
        client.on('error', (err)=>{
            console.error(err.message)
        })
        await client.connect();
        const redisValue = JSON.stringify(data);
        client.set(key, redisValue, function(err, reply) {
            console.log(reply);
        });

    } catch (error) {
        console.log(error);        
    }
}


module.exports = {getFromCatch, saveInCatch};
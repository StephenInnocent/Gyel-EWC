const {MongoClient} = require("mongodb");
const mongoose = require("mongoose");

async function connectDB(connectionString){
    try{
        const client = new MongoClient(connectionString);

        await client.connect();
        await mongoose.connect(connectionString);
        
        if(process.env.NODE_ENV == "Production"){
            console.log(`Production Database running @${client.options.srvHost}`);
        } else{
            console.log(`Development Database running @${client.options.srvHost}`);
        }
    }catch(e){
        console.error(e);
        console.log(`An error ocurred while connecting to the DB`);
    }
}

module.exports = {
    connectDB
}
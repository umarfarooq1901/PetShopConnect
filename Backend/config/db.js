const mongoose = require('mongoose');
const {config} = require('dotenv');
config({path: './.env'})
const dbPort = process.env.DB_PORT;
const connectDb = async()=>{
    try {
        await mongoose.connect(`${dbPort}/petShop`);
        console.log('Db Connected successfully!');
        
        
    } catch (error) {
        console.log('Error while connecting to the Db', error);
        
    }
}

module.exports = connectDb;
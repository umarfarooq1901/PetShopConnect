const express = require('express');
const connectDb = require('./config/db')
const {config} = require('dotenv');
config({path: './.env'});

const port = process.env.PORT;

// dataBase Connection call
connectDb();

// Initialize the app
const app = express();

// Middleware to handle JSON (if needed)
app.use(express.json());


app.get('/', ((req, res)=>{res.send('Hello from the PetShop Server!')}));


// (Listening on port)
app.listen(port, ()=>{
    console.log('Server Connected Successfully!');
});



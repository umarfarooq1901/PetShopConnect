const express = require('express');
const connectDb = require('./config/db')
const {config} = require('dotenv');
config({path: './.env'});



const port = process.env.PORT || 3000;   // Fallback to port 3000 if not defined;

// dataBase Connection call
connectDb();

// Initialize the app
const app = express();

// Middleware to handle JSON (if needed)
app.use(express.json());


app.get('/', ((req, res)=>{res.send('Hello from the PetShop Server!')}));

// User Routes
const userRoute = require('./routes/user/userRoute');
app.use('/user',userRoute);



// petshop routes




// (Listening on port)
app.listen(port, ()=>{
    console.log('Server Connected Successfully!');
});



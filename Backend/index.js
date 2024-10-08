const express = require('express');
const cookieParser = require('cookie-parser')
const connectDb = require('./config/db')
const cors = require('cors')
const {config} = require('dotenv');
config({path: './.env'});



const port = process.env.PORT || 3000;   // Fallback to port 3000 if not defined;

// dataBase Connection call
connectDb();

// Initialize the app
const app = express();

// Middleware to handle JSON, cookieParser (if needed)
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend origin
    credentials: true,               // Allow credentials (cookies)
  };
  
  app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.get('/', ((req, res)=>{res.send('Hello from the PetShop Server!')}));



// admin Routes
const adminRoutes = require('./routes/admin/adminRoutes');
app.use('/admin', adminRoutes);

// User Routes
const userRoute = require('./routes/user/userRoute');
app.use('/user',userRoute);



// petshop routes
const petShopRoute = require('./routes/petShop/petShopRoute');
app.use('/petshop', petShopRoute);

// products route
const productRoute = require('./routes/petShop/products/productRoute');
app.use('/petshop', productRoute);

//service route
const serviceRoute = require ('./routes/petShop/services/serviceRoute');
app.use('/petshop' , serviceRoute);



// cart Route
const cartRoute = require('./routes/user/cartRoute');
app.use('/user', cartRoute)



// order route
const orderRoute = require('./routes/petShop/orders/orderRoute');
app.use('/order', orderRoute);


// (Listening on port)
app.listen(port, ()=>{
    console.log('Server Connected Successfully!');
});



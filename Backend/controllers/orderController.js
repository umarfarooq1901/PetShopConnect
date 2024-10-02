const Order = require('../models/orderModel');
const User = require('../models/userModel');
const PetShop = require('../models/petShopModel');
const Product = require('../models/productModel');
const Service = require('../models/serviceModel');


const createOrder = async(req, res)=>{
    try {

      
          

        
    } catch (error) {
        console.log('Error while creating the order', error);
        return res.status(500).json({message: 'Internal Server Error!'})
        
    }
}



module.exports = createOrder

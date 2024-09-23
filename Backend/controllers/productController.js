const PetShop = require('../models/petShopModel');
const User = require('../models/userModel');


const addProductController = async(req, res)=>{
    try {
        console.log('product added successfully!');
        
        
    } catch (error) {
        console.log('Server error while adding the product', error);
        return res.status(500).json({message: 'Internal Server Error!'})
        
    }
}
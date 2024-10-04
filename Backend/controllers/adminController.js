const PetShop = require('../models/petShopModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Service = require('../models/serviceModel');
const Order = require('../models/orderModel');


// Admin verifies a petshop

const verifyPetShop = async(req, res)=>{
    try {
        const {petshopId} = req.params;

        // find the petshop by ID and verify it
        const petshop = await PetShop.findById(petshopId);
        if(!petshop){
            return res.status(404).json({message: 'petshop not found!'})
        }
        petshop.isVerified = true;
        await petshop.save();

        // update user's verification status
        await User.findByIdAndUpdate(petshop.ownerId, {
            verificationStatus: 'approved',
        });
        res.status(200).json({message: 'Petshop verified successfully', petshop})
        
    } catch (error) {
     
        res.status(500).json({message: 'Internal server error', error});
        
    }
}


// get All unverified petshops (for admin to review)

const getPendingPetShops = async(req,res)=>{
    try {
        const pendingShops = await PetShop.find({isVerified: false});
        if(!pendingShops){
            return res.status(404).json({message: 'There are no petshops whose verification is pending!'})
        }
        res.status(200).json({pendingShops});
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
}

// admin rejects a  petshop

const rejectPetShop = async(req,res)=>{
    try {
        const {petshopId} = req.params;
        
          const petshop = await PetShop.findById(petshopId);
          if(!petshop){
              return res.status(404).json({message: 'petshop not found!'})
          }

          // Remove the pet shop from the database
                await PetShop.findByIdAndDelete(petshopId);

                // update the user's verification status
                await User.findByIdAndUpdate(petshop.ownerId,{
                    verificationStatus: 'rejected',
                });
                res.status(200).json({ message: "Pet shop rejected and removed successfully" });
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
}

// Admin manages users (view all users)
    const getAllUsers = async(req, res)=>{
        try {
            const users = await User.find();
            if(!users){
                return res.status(404).json({message: 'No users found!'})
            }

            return res.status(200).json({message: users})
            
        } catch (error) {
            res.status(500).json({message: 'Internal server error', error});
        }
    }

    // Admin deletes a user (e.g., if they violate rules)

    const deleteUser = async(req, res)=>{
        try {
            const {userId} = req.params;

            // delete user by ID
            const user = await User.findByIdAndDelete(userId);
            if(!user){
                return res.status(404).json({message: 'User not found!'})
            }

            res.status(200).json({message: 'User deleted successfully!'})
            
        } catch (error) {
            res.status(500).json({message: 'Internal server error', error});
        }
    }


// Admin manages products (view all products)
const getAllProducts = async(req, res)=>{
    try {
        const products = await Product.find().populate('petShop', 'shopName'); // Populating pet shop details
        if(!products){
            return res.status(404).json({message: 'No products found!'})
        }
        return res.status(200).json({message: 'products fetched successfully', products})
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
}

 // Admin deletes a product (e.g., if it's inappropriate)

 const deleteProduct = async(req, res)=>{
    try {
        const {productId} = req.params;
        const product = await Product.findByIdAndDelete(productId);
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found!' });
        }
        res.status(200).json({ message: "Product deleted successfully", product});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
 }

 // Admin manages services (view all services)

 const getAllServices = async(req, res)=>{
    try {
        const services = await Service.find().populate('petShop', 'shopName');
        if (services.length === 0) {
            return res.status(404).json({ message: 'No services found!' });
        }
        return res.status(200).json({message: "All services fetched successfully!", services});
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
 }

 // Admin deletes a service (e.g., if it's inappropriate)
 const deleteService = async(req, res)=>{
    try {
        const {serviceId} = req.params;
        const service = await Product.findByIdAndDelete(serviceId);
        if(!service){
            return res.status(404).json({message: 'Service not found'})
        }
        res.status(200).json({ message: "Service deleted successfully", service});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error});
    }
 }


    // Admin reviews orders

    const getAllOrders = async(req, res)=>{
        try {

            const orders = await Order.find();
            if(!orders){
                return res.status(404).json({message: 'No orders available'})
            }
            return res.status(200).json({message: 'All orders fetched successfully!', orders})
            
        } catch (error) {
            res.status(500).json({message: 'Internal server error', error});
        }
    }

module.exports = {verifyPetShop, getPendingPetShops, rejectPetShop, getAllUsers, deleteUser, getAllProducts, deleteProduct, getAllServices, deleteService, getAllOrders}



// What Each Function Does:
// verifyPetShop: Admin verifies a pet shop by updating the isVerified field and also updates the verificationStatus of the pet shop owner in the User model.

// getPendingPetShops: Admin can view all pet shops that are pending verification.

// rejectPetShop: Admin can reject and remove a pet shop. It deletes the pet shop from the database and updates the user’s verificationStatus to rejected.

// getAllUsers: Allows admin to view all users.

// deleteUser: Allows admin to delete users from the platform.

// getAllProducts:  Lists all products, with each product’s associated pet shop.

// deleteProduct: Admin can delete products from the database if necessary.

// getAllServices: Lists all services, with each service’s associated pet shop.

// deleteService: Admin can delete inappropriate or unwanted services.

// getAllOrders: Allows admin to view all orders placed by customers.
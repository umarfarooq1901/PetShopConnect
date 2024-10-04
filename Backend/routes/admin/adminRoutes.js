const express = require('express');
const router = express.Router();
const adminAuth = require('../../middlewares/Authentication/adminAuth');
const adminController = require('../../controllers/adminController');



// verify a petshop
router.put('/verify-petshop/:petshopId', adminAuth, adminController.verifyPetShop);

// Get all unverified pet shops

router.get('/pending-petshops', adminAuth, adminController.getPendingPetShops);

// Reject and remove a pet shop
router.delete('/reject-petshop/:petShopId', adminAuth, adminController.rejectPetShop);

// Get all users
router.get('/getAllUsers', adminAuth, adminController.getAllUsers);

// Delete a user
router.delete('/deleteUser/:userId', adminAuth, adminController.deleteUser);

// Get all products
router.get('/products', adminAuth, adminController.getAllProducts);

// Delete a product
router.delete('/products/:productId', adminAuth, adminController.deleteProduct);

// Get all services
router.get('/services', adminAuth, adminController.getAllServices);

// Delete a service
router.delete('/services/:serviceId', adminAuth, adminController.deleteService);

// Get all orders
router.get('/orders', adminAuth, adminController.getAllOrders);

module.exports = router;

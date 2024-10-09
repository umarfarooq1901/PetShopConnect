const express = require('express');
const router = express.Router();
const userAuthentication = require('../../middlewares/Authentication/userAuth')
const adminAuth = require('../../middlewares/Authentication/adminAuth');
const adminController = require('../../controllers/adminController');




// verify a petshop
router.put('/verify-petshop/:petshopId',userAuthentication, adminAuth, adminController.verifyPetShop);

// Get all unverified pet shops

router.get('/pending-petshops',userAuthentication, adminAuth, adminController.getPendingPetShops);
router.get('/getAllpetshops',userAuthentication, adminAuth, adminController.getAllpetshops);

// Reject and remove a pet shop
router.delete('/reject-petshop/:petshopId',userAuthentication, adminAuth, adminController.rejectPetShop);

// Get all users
router.get('/getAllUsers',userAuthentication, adminAuth, adminController.getAllUsers);

// Delete a user
router.delete('/deleteUser/:userId',userAuthentication, adminAuth, adminController.deleteUser);

// Get all products
router.get('/products',userAuthentication, adminAuth, adminController.getAllProducts);

// Delete a product
router.delete('/products/:productId',userAuthentication, adminAuth, adminController.deleteProduct);

// Get all services
router.get('/services',userAuthentication, adminAuth, adminController.getAllServices);

// Delete a service
router.delete('/services/:serviceId',userAuthentication, adminAuth, adminController.deleteService);

// Get all orders
router.get('/orders',userAuthentication, adminAuth, adminController.getAllOrders);

module.exports = router;

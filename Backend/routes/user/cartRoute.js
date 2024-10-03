const express = require('express');
const router = express.Router();

const userAuthentication = require('../../middlewares/Authentication/userAuth');
const {addToCart, removeFromCart} = require('../../controllers/cartController');

// add to cart route
router.post('/addtocart/product/:productId', userAuthentication, addToCart); // For products
router.post('/addtocart/service/:serviceId', userAuthentication, addToCart); // For services


// remove from cart
router.delete('/removefromcart/product/:productId', userAuthentication, removeFromCart); // For products
router.delete('/removefromcart/service/:serviceId', userAuthentication, removeFromCart); // For services



module.exports = router
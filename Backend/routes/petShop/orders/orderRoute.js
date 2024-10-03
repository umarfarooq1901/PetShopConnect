const express = require('express');
const router = express.Router();

const {createCartOrder, createOrder} = require('../../../controllers/orderController')
const userAuthentication = require('../../../middlewares/Authentication/userAuth');
const petShopAuth = require('../../../middlewares/Authentication/petShopAuth');

// Route for creating an order from cart
router.post('/createcartorder', userAuthentication,petShopAuth, createCartOrder);


// route for creating an direct order product/service
router.post('/createorder/:_id?/:_serviceId', userAuthentication, petShopAuth, createOrder);


module.exports = router; // Export the router

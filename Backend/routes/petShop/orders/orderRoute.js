const express = require('express');
const router = express.Router();

const createOrder = require('../../../controllers/orderController'); // Make sure this path is correct
const userAuthentication = require('../../../middlewares/Authentication/userAuth');

// Route for creating an order
router.post('/createorder', userAuthentication, createOrder);

module.exports = router; // Export the router

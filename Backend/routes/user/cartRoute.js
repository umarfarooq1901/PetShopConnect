const express = require('express');
const router = express.Router();

const userAuthentication = require('../../middlewares/Authentication/userAuth');
const {addToCart, removeFromCart} = require('../../controllers/cartController');

// add to cart route
router.post('/addtocart/:_id', userAuthentication,addToCart);

// remove from cart
router.delete('/removefromcart/:_id', userAuthentication,removeFromCart);


module.exports = router
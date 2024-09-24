// routes/petShop/products/productRoute.js
const express = require('express');
const router = express.Router();
const {multerProductUpload} = require('../../../middlewares/multer/multer')
const petShopAuth = require('../../../middlewares/Authentication/petShopAuth')
const addProductController = require('../../../controllers/productController');

// Define the POST route with the controller function as a callback
router.post('/addProduct', petShopAuth, multerProductUpload, addProductController);

module.exports = router;

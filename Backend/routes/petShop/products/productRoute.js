// routes/petShop/products/productRoute.js
const express = require('express');
const router = express.Router();
const {multerProductUpload} = require('../../../middlewares/multer/multer')
const petShopAuth = require('../../../middlewares/Authentication/petShopAuth')
const {addProductController, deleteProductController} = require('../../../controllers/productController');

// Define the POST route with the controller function as a callback
router.post('/addProduct', petShopAuth, multerProductUpload, addProductController);
router.delete('/deleteProduct/:_id',petShopAuth, deleteProductController);

module.exports = router;

// routes/petShop/products/productRoute.js
const express = require('express');
const router = express.Router();
const {multerProductUpload} = require('../../../middlewares/multer/multer')
const petShopAuth = require('../../../middlewares/Authentication/petShopAuth')
const {addProductController, deleteProductController, updateProductController, getAllProducts, getSingleProduct} = require('../../../controllers/productController');

// Define the POST route with the controller function as a callback
router.post('/addProduct', petShopAuth, multerProductUpload, addProductController);
router.delete('/deleteProduct/:_id',petShopAuth, deleteProductController);
router.put('/updateProduct/:_id',petShopAuth, updateProductController);
router.get('/getAllProducts', petShopAuth, getAllProducts);


router.get('/getSingleProduct/:_id', petShopAuth,getSingleProduct );

module.exports = router;

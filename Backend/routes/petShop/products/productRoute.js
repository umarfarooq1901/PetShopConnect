const express = require('express');
const router = express.Router();


const petShopAuth = require('../../../middlewares/Authentication/petShopAuth');
const {addProductController} = require('../../../controllers/productController');

router.post('/addProduct', petShopAuth, addProductController);
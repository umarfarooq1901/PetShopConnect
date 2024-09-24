const express = require('express');
const router = express.Router();
const petshopAuth = require('../../../middlewares/Authentication/petShopAuth');
const {addServiceController} = require('../../../controllers/serviceController');
router.post('/addService', petshopAuth ,addServiceController)





const express = require('express');
const router = express.Router();
const multerUpload = require('../../middlewares/multer/multer');
const {petShopRegController, petShopLoginController} = require('../../controllers/petShopController')

router.post('/register',multerUpload, petShopRegController);
router.post('/login', petShopLoginController);


module.exports = router


// // Admin verifies a Pet Shop (PUT request)
// router.put('/admin/verify-petshop/:petShopId', verifyPetShop);





// // Pet Shop owners can add products, services, etc. (protected by middleware)
// router.post('/petshop/add-product', checkPetShopVerified, addProductController);
// router.post('/petshop/add-service', checkPetShopVerified, addServiceController);
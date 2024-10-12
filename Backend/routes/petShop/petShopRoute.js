const express = require('express');
const router = express.Router();
const {multerAadharUpload} = require('../../middlewares/multer/multer');
const petShopAuth = require('../../middlewares/Authentication/petShopAuth');
const {petShopRegController, petShopDeleteController, petShopUpdateController} = require('../../controllers/petShopController')

router.post('/register',multerAadharUpload, petShopRegController);

router.delete('/delete', petShopAuth, petShopDeleteController);
router.put('/updateDetails', petShopAuth, petShopUpdateController);
// New Authorization Route
router.get('/authorize', petShopAuth, (req, res) => {
    // If the middleware has successfully verified the token,
    // it will reach this point.
    res.status(200).json({ message: 'Authorized petshop', petshop: req.petshop });
});

// logout route
router.get('/logout', (req, res)=>{
    try {
        const {petshopToken} = req.cookies;
        if(petshopToken){
            res.clearCookie('petshopToken');
            res.status(200).json({message: 'Logout Successfully!'})
        }
    } catch (error) {
        console.log(error);
        
    }
})


module.exports = router


// // Admin verifies a Pet Shop (PUT request)
// router.put('/admin/verify-petshop/:petShopId', verifyPetShop);





// // Pet Shop owners can add products, services, etc. (protected by middleware)
// router.post('/petshop/add-product', checkPetShopVerified, addProductController);
// router.post('/petshop/add-service', checkPetShopVerified, addServiceController);
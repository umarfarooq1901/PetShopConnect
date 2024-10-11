const express = require("express");
const router = express.Router();
const userAuthentication = require('../../middlewares/Authentication/userAuth');
const {userSignupController, userLoginController, userDeleteController, userEditController} = require('../../controllers/userControllers');




router.post('/signup', userSignupController);
router.post('/login', userLoginController);
router.delete('/delete', userAuthentication, userDeleteController);
router.put('/update', userAuthentication, userEditController);


// user logut
router.get('/logout', (req, res)=>{
    try {
        const {authToken} = req.cookies;
        if(authToken){
            res.clearCookie('authToken');
            res.status(200).json({message: 'Logout Successfully!'})
        }
    } catch (error) {
        console.log(error);
        
    }
})





module.exports = router;

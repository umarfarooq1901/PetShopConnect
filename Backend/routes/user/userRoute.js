const express = require("express");
const router = express.Router();
const {userSignupController, userLoginController, userDeleteController, userEditController} = require('../../controllers/userControllers');

const userAuthentication = require('../../middlewares/Authentication/userAuth')



router.post('/signup', userSignupController);
router.post('/login', userLoginController);
router.delete('/delete', userAuthentication, userDeleteController);
router.put('/update', userAuthentication, userEditController);





module.exports = router;

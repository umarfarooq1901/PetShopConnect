const express = require("express");
const router = express.Router();
const {userSignupController, userLoginController, userDeleteController} = require('../../controllers/userControllers');

const userAuthentication = require('../../middlewares/Authentication/userAuth')



router.post('/signup', userSignupController);
router.post('/login', userLoginController);
router.delete('/delete/:_id', userAuthentication, userDeleteController);





module.exports = router;

const express = require('express');
const router = express.Router();
const {userSignupController} = require('../../controllers/userControllers');
const {userLoginController}= require('../../controllers/userControllers');



router.post('/signup', userSignupController);
router.post('/login', userLoginController);





module.exports = router;
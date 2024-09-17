const express = require('express');
const router = express.Router();
const {userSignupController} = require('../../controllers/userControllers');



router.post('/signup', userSignupController);



module.exports = router;
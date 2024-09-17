const express = require("express");
const router = express.Router();
const {
  userSignupController,
  userLoginController,
  userDeleteController,
} = require("../../controllers/userControllers");

router.post("/signup", userSignupController);
router.post("/login", userLoginController);
router.delete("/delete", userDeleteController);

module.exports = router;

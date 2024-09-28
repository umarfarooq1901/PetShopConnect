const express = require("express");
const router = express.Router();
const petShopAuth = require("../../../middlewares/Authentication/petShopAuth");
const {
  addServiceController,
  deleteServiceController,
  updateServiceController,
  getAllServicesController,
<<<<<<< HEAD
  getOneServiceController,
=======
  getSingleServiceController
>>>>>>> 279ebeccfb0393b9bcd06b31ccfd5361f874ddf3
} = require("../../../controllers/serviceController");

router.post("/addService", petShopAuth, addServiceController);
router.delete(
  "/deleteService/:serviceId",
  petShopAuth,
  deleteServiceController
);
router.put("/updateService/:serviceId", petShopAuth, updateServiceController);
router.get("/getallservices", petShopAuth, getAllServicesController);
<<<<<<< HEAD
router.get("/getoneService/:serviceId", petShopAuth, getOneServiceController);
=======
router.get("/getsingleservice/:serviceId", petShopAuth, getSingleServiceController);

>>>>>>> 279ebeccfb0393b9bcd06b31ccfd5361f874ddf3
module.exports = router;

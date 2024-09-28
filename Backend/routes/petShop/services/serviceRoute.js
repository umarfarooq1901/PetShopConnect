const express = require("express");
const router = express.Router();
const petShopAuth = require("../../../middlewares/Authentication/petShopAuth");
const {
  addServiceController,
  deleteServiceController,
  updateServiceController,
  getAllServicesController,
  getSingleServiceController
} = require("../../../controllers/serviceController");

router.post("/addService", petShopAuth, addServiceController);
router.delete(
  "/deleteService/:serviceId",
  petShopAuth,
  deleteServiceController
);
router.put("/updateService/:serviceId", petShopAuth, updateServiceController);
router.get("/getallservices", petShopAuth, getAllServicesController);
router.get("/getsingleservice/:serviceId", petShopAuth, getSingleServiceController);

module.exports = router;

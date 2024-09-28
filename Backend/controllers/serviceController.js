const PetShop = require("../models/petShopModel");
const Service = require("../models/serviceModel");

const addServiceController = async (req, res) => {
  try {
    const { petshopId } = req.petshop;

    const { serviceName, description, price, serviceType } = req.body;

    // Input validation
    if (!serviceName || !description || !price || !serviceType) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if pet shop exists
    const petShop = await PetShop.findById(petshopId);
    if (!petShop) {
      return res.status(404).json({ message: "Pet shop not found!" });
    }

    // Create service
    const newService = await Service.create({
      serviceName,
      description,
      price,
      serviceType,
      petShop: petshopId,
    });

    petShop.services.push(newService._id);
    await petShop.save();

    return res.status(201).json({ message: "Service added successfully!" });
  } catch (error) {
    console.log("Error while adding service:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete service controller:
const deleteServiceController = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { petshopId } = req.petshop;

    const findPetShop = await PetShop.findById(petshopId);
    if(!findPetShop){
      return res.status(404).json({message: 'Petshop not registered with us!'})
    }


    const service = await Service.findByIdAndDelete(serviceId);

    if (!service) {
      return res
        .status(404)
        .json({ message: "Service not found or unauthorized!" });
    }

    // Remove the service from the pet shop's services array
    await PetShop.findByIdAndUpdate(petshopId, {
      $pull: { services: serviceId },
    });

    return res.status(200).json({ message: "Service deleted successfully!" });
  } catch (error) {
    console.error("Error deleting service:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Service Controler:
const updateServiceController = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { petshopId } = req.petshop;
    const { serviceName, description, price, serviceType } = req.body;
    if (!petshopId) {
      return res
        .status(404)
        .json({ message: "Unauthorized to delete this service!" });
    }

    
    const findService = await Service.findById(serviceId);
    if(!findService){
      return res.status(404).json({message: 'Servive not found'})
    }
    const updateService = await Service.findByIdAndUpdate(
      serviceId,
      {
        serviceName,
        description,
        price,
        serviceType,
      },
      { new: true, runValidators: true }
    );

    if (!updateService) {
      return res.status(404).json({ message: "Service not found!" });
    }

    return res
      .status(200)
      .json({ message: "Service updated successfully!", updateService });
  } catch (error) {
    console.error("Error updating service:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// // Get All Services Controller:

const getAllServicesController = async (req, res) => {
  try {
    const { petshopId } = req.petshop;

    // Find all services for the pet shop
    const services = await Service.find({ petShop: petshopId });

    if (services.length === 0) {
      return res.status(404).json({ message: "No services found! " });
    }

    return res
      .status(200)
      .json({ message: "Services retrieved Successfully!", services });
  } catch (error) {
    console.error("Error getting services:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Get One Service Controller:

const getOneServiceController = async (req, res) => {
  try {
    const { serviceId } = req.params; // The ID of the service from the request parameters
    const { petshopId } = req.petshop; // The ID of the pet shop from the request object

    // Find the service by its ID and ensure it belongs to the correct pet shop
    const service = await Service.findOne({
      _id: serviceId,
      petShop: petshopId,
    });

    if (!service) {
      return res
        .status(404)
        .json({ message: "Service not Found or unauthorised Acess!" });
    }

    return res
      .status(200)
      .json({ message: "Service retrived successfully", service });
  } catch (error) {
    console.error("Error retrieving service:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  addServiceController,
  deleteServiceController,
  updateServiceController,
  getAllServicesController,
  getOneServiceController,
};

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
        .json({ message: "Service not found!" });
    }

    // Remove the service from the pet shop's services array
    // await PetShop.findByIdAndUpdate(petshopId, {
    //   $pull: { services: serviceId },
    // });

    const index =  findPetShop.services.findIndex((service)=> service.toString()===serviceId);
    if(index> -1){
         findPetShop.services.splice(index, 1);
        await findPetShop.save();
    }

    return res.status(200).json({ message: "Service deleted successfully!", service});
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
        .json({ message: "Unauthorized to update this service!" });
    }

    // Find the current service to retrieve existing values
    const findService = await Service.findById(serviceId);
    if (!findService) {
      return res.status(404).json({ message: "Service not found!" });
    }

    const updateService = await Service.findByIdAndUpdate(
      serviceId,
      {
        // Fallback logic for updating service details
        serviceName: serviceName || findService.serviceName,
        description: description || findService.description,
        price:       price       ||  findService.price, 
        serviceType: serviceType || findService.serviceType,
      },
      { new: true, runValidators: true }
    );

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


const getSingleServiceController = async (req, res) => {
  try {
    const { petshopId } = req.petshop; // Extract petshopId from middleware
    const { serviceId } = req.params; // Correctly extract serviceId from req.params

    // Find the PetShop by ID
    const findPetshop = await PetShop.findById(petshopId);
    if (!findPetshop) {
      return res.status(404).json({ message: 'Petshop not registered yet!' });
    }

    // Find the service by ID
    const findService = await Service.findById(serviceId);
    if (!findService) {
      return res.status(404).json({ message: 'Service not found!' });
    }

    // Return success response with the found service
    return res.status(200).json({ message: 'Service retrieved successfully!', service: findService });
  } catch (error) {
    console.log('Error while fetching the service:', error);
    return res.status(500).json({ message: 'Internal server error!' });
  }
};


module.exports = {
  addServiceController,
  deleteServiceController,
  updateServiceController,
  getAllServicesController,
  getSingleServiceController
};

const PetShop = require("../models/petShopModel");
const Service = require("../models/serviceModel");

const addServiceController = async (req, res) => {
  try {
    const { petshopId } = req.petshop;
    const { serviceName, serviceDescription, price, serviceType } = req.body;

    //input validationn
    if (!serviceName || !serviceDescription || !price || !serviceType) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    //check if petshop exists
    const petShop = await PetShop.findById(petshopId);
    if (!petShop) {
      return res.status(404).json({ message: "Pet shop not found!" });
    }

    // Create service

    const newService = await Service.create({
      serviceName,
      serviceDescription,
      price,
      serviceType,
      petShop: petshopId,
    });

    if (!newService){
        return res.status(404).json({ message: "Error while creating new service!", newService });
    }

    petShop.services.push(newServive._id);
    await petShop.save();

    return res.status(201).json({ message: "Service added succesfully!" });
  } catch (error) {
    console.log('error while adding service', error);
  }
};




//Delete service controller 

// const deleteServiceController = async (req,)
module.exports = { addServiceController };

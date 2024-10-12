const PetShop = require("../models/petShopModel");
const Product = require("../models/productModel");
const cloudinary = require("cloudinary").v2;
const { config } = require("dotenv");
config({ path: "./.env" });

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Add product controller
const addProductController = async (req, res) => {
  try {

    const { petShopId } = req.petshop;
    
console.log('Request Body:', req.body); // Log request body
    console.log('Request Files:', req.files); // Log uploaded files
    const {
      productName,
      productDescription,
      productPrice,
      productQuantity,
      productWeight,
      category,
      subCategory,
    } = req.body;
    const productImages = req.files;

    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productQuantity ||
      !category ||
      !subCategory ||
      !productImages ||
      productImages.length === 0
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const checkPetShop = await PetShop.findById(petShopId);
    if (!checkPetShop) {
      return res
        .status(404)
        .json({ message: "Pet shop not found, you need to register!" });
    }

    const folderPath = "petshop-folder/petshop-products";

    // here we are uploading the image on cloudinary one by one instead uploading all the images at once
    // const uploadedImages = [];
    // const imagePublicId = [];

    // for (const file of productImages) {
    //   const result = await cloudinary.uploader.upload(file.path, {
    //     folder: folderPath,
    //   });

    //   if (result) {
    //     uploadedImages.push(result.secure_url); // Store the URL of the uploaded image
    //     imagePublicId.push(result.public_id);
    //   } else {
    //     return res.status(500).json({
    //       message: "Error while uploading one of the product images!",
    //     });
    //   }
    // }

    // we better use concurrency to upload the images on cloudinary (Concurrency means being able to manage multiple tasks at the same time)
     // Upload images concurrently using Promise.all
     const uploadPromise = productImages.map((file)=>{
       return cloudinary.uploader.upload(file.path, {
          folder: folderPath
        })
     });

     const results = await Promise.all(uploadPromise);


   // Store uploaded images URLs and public IDs
   const uploadedImages = results.map(result => result.secure_url);
   const imagePublicId = results.map(result => result.public_id);

    const newProduct = await Product.create({
      productName,
      productDescription,
      productPrice,
      productQuantity,
      productWeight,
      category,
      subCategory,
      images: uploadedImages, // Add all uploaded image URLs
      imagePublicId: imagePublicId,
      petShop: petShopId, // Associate the product with the pet shop
    });

    checkPetShop.products.push(newProduct._id);
    await checkPetShop.save();

    return res
      .status(201)
      .json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    console.error("Server error while adding the product:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Delete the products by petshop

const deleteProductController = async (req, res) => {
  try {
    const { petShopId } = req.petshop;
    const { _id } = req.params;

    const checkPetShop = await PetShop.findById(petShopId);
    if (!checkPetShop) {
      return res
        .status(404)
        .json({ message: "Pet shop not found, you need to register first!" });
    }

    const deleteProduct = await Product.findByIdAndDelete(_id);
    if (!deleteProduct) {
      return res.status(404).json({ message: "Product not found!" });
    }

    // Delete associated images from Cloudinary
    // this method deletes the images in cloudinary one by one
    // for (const image of deleteProduct.imagePublicId) {
    //   await cloudinary.uploader.destroy(image);
    // }
          // Delete associated images from Cloudinary concurrently
          const deleteImagePromise = deleteProduct.imagePublicId.map((imageId)=>{
            return cloudinary.uploader.destroy(imageId);
          });

          await Promise.all(deleteImagePromise);

    // Remove the product from the pet shop's product list
    const index = checkPetShop.products.findIndex(
      (product) => product.toString() === _id
    );
    if (index > -1) {
      checkPetShop.products.splice(index, 1);
      await checkPetShop.save();
    }

    return res
      .status(200)
      .json({ message: "Product deleted successfully!", deleteProduct });
  } catch (error) {
    console.log("Error while deleting the product", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

// update the products by petshop

const updateProductController = async (req, res) => {
  try {
    const { petShopId } = req.petshop;
    const { _id } = req.params;
    const {
      productName,
      productDescription,
      productPrice,
      productQuantity,
      category,
      subCategory,
    } = req.body;

    const checkPetShop = await PetShop.findById(petShopId);
    if (!checkPetShop) {
      return res.status(404).json({ message: "Petshop not found!" });
    }

    const findProduct = await Product.findById(_id);
    if (!findProduct) {
      return res.status(404).json({ message: "Product not found!" });
    }

    const updateProduct = await Product.findByIdAndUpdate(
      _id,
      {
        // fallback logic Use the new name if it exists, otherwise, use the current name.
        productName: productName || findProduct.productName,
        productDescription: productDescription || findProduct.productDescription,
        productPrice: productPrice || findProduct.productPrice,
        productQuantity: productQuantity || findProduct.productQuantity,
        category: category || findProduct.category,
        subCategory: subCategory || findProduct.subCategory,
      },
      { new: true, runValidators: true }
    );

    if (!updateProduct) {
      return res
        .status(500)
        .json({ message: "Server error while updating the details!" });
    }

    return res
      .status(200)
      .json({ message: "Product updated successfully!", updateProduct });
  } catch (error) {
    console.log("Error while updating the product", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

// get all products
const getAllProducts = async (req, res) => {
  try {
    const  {petShopId}  = req.petshop;
    const findPetshop = await PetShop.findById(petShopId);
    if (!findPetshop) {
      return res.status(404).json({ message: "Petshop Not Found!" });
    }
    const products = await Product.find({ petshopId : petShopId});
    console.log("this is products", products);

      // Calculate the product count
      const countProducts = products.length
      if (countProducts === 0) {
        return res.status(200).json({ message: 'No products available!', countProducts});
      }


    return res
      .status(200)
      .json({ message: "Products fetched successfully!",countProducts, products });
  } catch (error) {
    console.log("Error while fetching the products", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

// get one product
const getSingleProduct = async (req, res) => {
  try {
    const { petshopId } = req.petshop;
    const { _id } = req.params;
    const findPetshop = await PetShop.findById(petshopId);
    if (!findPetshop) {
      return res.status(404).json({ message: "Petshop not found!" });
    }
    const findProduct = await Product.findById(_id);
    if (!findProduct) {
      return res.status(404).json({ message: "Product not found!" });
    }
    return res
      .status(200)
      .json({ message: "Product fetched successfully", findProduct });
  } catch (error) {
    console.log("Error while fetching the product", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

// Exporting the controller
module.exports = {
  addProductController,
  deleteProductController,
  updateProductController,
  getAllProducts,
  getSingleProduct,
};

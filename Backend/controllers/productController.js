const PetShop = require('../models/petShopModel');
const Product = require('../models/productModel');
const cloudinary = require('cloudinary').v2;
const { config } = require('dotenv');
config({ path: './.env' });

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});



// Add product controller
const addProductController = async (req, res) => {
    try {
        const { petshopId } = req.petshop; // petshopId comes from a verified pet shop

        const { productName, productDescription, productPrice, productQuantity, category, subCategory } = req.body;
        const productImages = req.files;

        // Check if all fields are present
        if (!productName || !productDescription || !productPrice || !productQuantity || !category || !subCategory || !productImages || productImages.length === 0) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        // Check if the pet shop exists
        const checkPetShop = await PetShop.findById(petshopId);
        if (!checkPetShop) {
            return res.status(404).json({ message: 'Pet shop not found, you need to register!' });
        }

        // Upload product images to Cloudinary
        const folderPath = 'petshop-folder/petshop-products';
        const uploadedImages = [];
        // const ImagePublicId = [];

        for (const file of productImages) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: folderPath

            });

            if (result) {
                uploadedImages.push(result.secure_url); // Store the URL of the uploaded image
                // ImagePublicId.push(result.public_id);

            } else {
                return res.status(500).json({ message: 'Error while uploading one of the product images!' });
            }
        }

        // Create a new product
        const newProduct = await Product.create({
            productName,
            productDescription,
            productPrice,
            productQuantity,
            category,
            subCategory,
            images: uploadedImages, // Add all uploaded image URLs to the images array
            petShop: petshopId,  // Associate the product with the pet shop
        });

        if (!newProduct) {
            return res.status(500).json({ message: 'Error while creating the product!' });
        }

        // Add the newly created product to the pet shop's product list
        checkPetShop.products.push(newProduct._id);
        await checkPetShop.save();

        return res.status(201).json({ message: 'Product added successfully!', product: newProduct });
    } catch (error) {
        console.error('Server error while adding the product:', error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

    // Delete the products by petshop

    const deleteProductController = async(req, res)=>{
        try {
            const {petshopId} = req.petshop;
            const {_id} = req.params;

           const checkPetShop = await PetShop.findById(petshopId);
           if(!checkPetShop){
            return res.status(404).json({message: 'Petshop not found, You need to register first!'})
           }

            const deleteProduct = await Product.findByIdAndDelete(_id);
            if(!deleteProduct){
               
                return res.status(400).json({message: 'Some error while deleting the product'});
            }

                const index = checkPetShop.products.findIndex((product)=> product._id.toString() === _id)

                if(index > -1){

                     checkPetShop.products.splice(index , 1)
                         await checkPetShop.save();
                        //  await cloudinary.uploader.destroy()
                         return res.status(200).json({message: 'Product Deleted Succusfully!'})
                }             
            
        } catch (error) {
            console.log('Error while deleting the product', error);
            res.status(500).json({message: 'Internal server error!'})
            
        }
}



// Exporting the controller
module.exports = {addProductController, deleteProductController};

const User = require('../models/userModel');
const PetShop = require('../models/petShopModel');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {config} = require('dotenv');
config({path: './.env'});

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


const petShopRegController = async(req, res)=>{
    try {
        const { shopName, ownerId, contact, shopAddress, bankDetails} = req.body;
        // console.log(req.body)
        const aadharCard = req.file?.path; // Ensure file upload was successful
        // console.log(req.file)
            // Input validation
            if (!shopName || !ownerId || !contact || !shopAddress || !bankDetails || !aadharCard) {
                return res.status(400).json({ message: "All required fields must be filled!" });
            }
                // Check if owner (User) exists in User collection
            const user = await User.findById(ownerId);
            if(!user){
                return res.status(404).json({ message: 'Owner (User) not found!' });
            }
                // Check if this user already has a PetShop
            const alreadyPetShop = await PetShop.findOne({ ownerId }); // Find by ownerId
            if(alreadyPetShop){
                return res.status(409).json({message: 'PetShop already registered for this owner!'});
            }

             // Upload Aadhar card image to Cloudinary
                const folderPath = 'petshop-folder/pethop-aadhar';
                const aadharUpload = await cloudinary.uploader.upload(aadharCard,{
                    folder: folderPath
                });
                if(!aadharUpload){
                    return res.status(500).json({message: 'Server error while uploading the Aadhar image!'})
                }
                const aadharImgUrl = aadharUpload.secure_url;

            // Create new PetShop, but with `isVerified` set to `false` initially
            const newPetShop  = await PetShop.create({
                shopName, 
                ownerId, 
                contact, 
                shopAddress, 
                bankDetails, 
                aadharCard: aadharImgUrl, // Store the image URL in the model
                isVerified: false // Pet shop is pending admin verification
            });

            if(!newPetShop){
                return res.status(202).json({message: 'Error occurred while creating the PetShop!'});
            }

             // After successful registration, update the user's role to "petshop"
             user.role = 'petshop';
             await user.save();  // Save the updated user
              // Send response to the user
            return res.status(200).json({message: 'Thanks for registering with us. Your PetShop has been created successfully! An admin will verify your details shortly.'})
            
    } catch (error) {
        console.error('Error registering pet shop:', error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}



// Login controller for PetShop owner

const petShopLoginController = async(req,res)=>{
    try {
        const secretKey = process.env.SECRET_KEY;
        const {email, password} = req.body; 
        // validate inputs

        if(!email || !password){
            return res.status(400).json({message:'Email and Password are required!'})
        }

        // check if the user exists in the user model

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: 'User Not Found!'});
        }

        // check if the user has a registered petshop
        const petshop = await PetShop.findOne({ownerId: user._id});
        if(!petshop){
            return res.status(404).json({message: 'Petshop not found for this user!'})
        }
        
        // verify petshop
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: 'Incorrect Password!'})
        }

        // Generate JWT Token
        const token = jwt.sign({id: user._id, petshopId: petshop._id}, secretKey);
        if(!token){
            return res.status(500).json({message: 'Some Server Error, Please try again!'})
        }

        // send the token in response
        res.cookie('petshopToken', token,{
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,  //7 days
            sameSite: 'Strict',  //helps perotect against csrf attacks
        });
        // Send a success response
        return res.status(200).json({message: 'Login Successfully!', token});
    } catch (error) {
        console.error('Error logging in pet shop owner:', error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}



    // PetShop Delete Controller

    const petShopDeleteController = async(req, res)=>{
        try {

            const { petshopId } = req.petshop; // Extract petshopId from the decoded token

            // Find and delete the petshop
            const petshop = await PetShop.findByIdAndDelete(petshopId);
            if(!petshop){
                return res.status(404).json({message: 'Petshop Not Found!'});
            }

            return res.status(200).json({message: 'Petshop Deleted Successfully!'});
            
        }catch (error) {
            console.error('Error while deleting the pet shop:', error);
            res.status(500).json({ message: 'Internal Server Error!' });
        }
    }


      // PetShop Edit Controller

      const petShopUpdateController = async(req, res)=>{
        try {
            const {petshopId} = req.petshop;

            const {shopName, contact, shopAddress, bankDetails} = req.body;

            // check if the petshop exists
            const findPetshop = await PetShop.findById(petshopId);

            if(!findPetshop){
                return res.status(404).json({message: 'Petshop Not Found!'})
            }
             
            const updatePetshop = await PetShop.findByIdAndUpdate(petshopId,{
                // FallBack Logic
                shopName: shopName || findPetshop.shopName,
                contact: contact || findPetshop.contact,
                shopAddress: shopAddress || findPetshop.shopAddress,
                bankDetails: bankDetails  || findPetshop.bankDetails
            },{new: true, runValidators: true}); // Return the updated document and validate fields


                if(!updatePetshop){
                    return res.status(500).json({ message: 'Error while updating petshop details!' });
                }
                return res.status(200).json({ message: 'Petshop Details Updated Successfully!' });
            
        } catch (error) {
            console.error('Server Error while Updating the details:', error);
            res.status(500).json({ message: 'Internal Server Error!' });
        }
      }

module.exports = {petShopRegController, petShopLoginController, petShopDeleteController, petShopUpdateController};



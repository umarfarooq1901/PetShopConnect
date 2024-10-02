const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  productWeight:{
      type: String
  },
  category: {
    type: String, // Example: 'Food', 'Accessories', 'Grooming', etc.
    required: true,
  },
  subCategory: {
    type: String, // Example: 'Dog Food', 'Cat Toys', 'Shampoo', etc.
    required: true,
  },
  petShop: {
    type: Schema.Types.ObjectId,
    ref: "PetShop", // Reference to the PetShop model
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    }
  ],
  imagePublicId:[
    {
    type: String,
  }
],

reviews : [
  {
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      review : {type : String},
      star : {type : Number}
  }
],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);

// {
//   url: {
//     type: String, // URL for the product image
//   },
//   public_id: {
//     type: String, // Public ID for the image in Cloudinary
//   }
// }
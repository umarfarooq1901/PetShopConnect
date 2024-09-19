const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    petShop: { 
      type: Schema.Types.ObjectId, 
      ref: 'PetShop', 
      required: true 
    }, // Reference to PetShop that owns the product
    imageUrl: { type: String }, // URL of the product image
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Product', productSchema);
  
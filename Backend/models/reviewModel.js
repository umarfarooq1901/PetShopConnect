const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    customer: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    product: { 
      type: Schema.Types.ObjectId, 
      ref: 'Product' 
    }, 
    // Reference to product (optional)
    service: { 
      type: Schema.Types.ObjectId, 
      ref: 'Service' 
    }, 
    // Reference to service (optional)
    petShop: { 
      type: Schema.Types.ObjectId, 
      ref: 'PetShop' 
    }, 
    // Reference to pet shop (optional)
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Review', reviewSchema);
  

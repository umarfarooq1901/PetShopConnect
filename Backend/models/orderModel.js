const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const orderSchema = new Schema({
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    petShop: {
      type: Schema.Types.ObjectId,
      ref: 'PetShop',
      required: true
    },
    products: [{
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true }
    }],
    services: [{
      service: { type: Schema.Types.ObjectId, ref: 'Service' },
      type: {
        type: String,
        enum: ['home', 'shop'], // Home service or shop visit
        required: true
      },
      appointmentDate: { type: Date } // Optional: if it’s a scheduled service
    }],
    totalPrice: { type: Number, required: true },
    deliveryAddress: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    },
    status: {
      type: String,
      enum: ['processing', 'shipped', 'delivered', 'completed', 'cancelled'],
      default: 'processing'
    },
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Order', orderSchema);
  
  
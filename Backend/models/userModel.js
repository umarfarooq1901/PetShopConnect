const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { 
    type: String, 
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'petShop', 'admin'], 
    default: 'customer'
  },
  contact: {
    type: String,
    required: true
  },
  address: {
    type: String,
  },
  petshop: {
    type: Schema.Types.ObjectId,
    ref: 'PetShop', // Refers to the PetShop model
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending' // Pet shop accounts will be 'pending' initially
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);

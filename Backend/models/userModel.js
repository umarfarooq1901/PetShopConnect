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
    enum: ['customer', 'petshop', 'admin'], 
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

  productCart:[
    {
      productId: {type:Schema.Types.ObjectId, ref: 'Product'},
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      weight:{
        type:String,
       
      },
      price: {
        type: Number,
        required: true,
      },

    },

  
  ],

  serviceCart:[
    {
      
        serviceId: {type:Schema.Types.ObjectId, ref: 'Service'},
        price: {
          type: Number,
          required: true,
        }
      
    }
  ],

  orderPlaced:[
      {
        type:Schema.Types.ObjectId,
        ref: 'Order'
      }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);

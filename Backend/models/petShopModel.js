const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petShopSchema = new Schema({
  
    shopName: {
    type: String,
    required: true,
  },

  ownerName: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  contact: {
    type: String,
    required: true,
  },

  shopAddress: {
    type : String,
    required : true,
  },
  bankDetails: {
    bankName : {type: String , required : true},
    accountNumber :{type: String, required: true},
    ifscCode : {type : String, required: true},

  },

  adharCard: {
    type: String,
    reuired: true,
  },

 // Reference to the services provided by pet shops
  services: [{
    type : Schema.Types.ObjectId,
    ref : "Service"
  }],
//Reference to the products provided by petshops
  products: [{
      type : Schema.Types.ObjectId,
    ref : "Product"
  }],
//Reference to the products provided by petshops
  pets:[{
      type : Schema.Types.ObjectId,
    ref : "Pet"
  }],


  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('PetShop', petShopSchema)

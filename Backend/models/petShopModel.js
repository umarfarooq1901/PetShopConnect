const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petShopSchema = new Schema({
  shopName: {
    type: String,
    required: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Linking the user (owner) of the shop
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  shopAddress: {
    type: String,
    required: true,
  },
  bankDetails: {
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
  },
  aadharCard: {
    type: String,
    required: true, // URL of the uploaded Aadhar card image
  },
  isVerified: {
    type: Boolean,
    default: false, // New field to track admin verification
  },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  pets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pet", // Assuming "Pet" is another schema
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PetShop", petShopSchema);

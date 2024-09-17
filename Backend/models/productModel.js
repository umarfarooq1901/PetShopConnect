const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },

  petShop: {
    type: mongoose.Schema.type,
    ref: "petShop",
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  category: {
    type: String,
    enum: ["Food", "Toys", "Accessories", "Vaccination", "Grooming", "Mating"],
    required: true,
  },

  description: {
    type: String,
    trim: true,
  },

  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
  },

  animalType: {
    type: String,
    enum: ["Dog", "Cat"],
    required: true,
  },

  imageUrl: String,

  createdAt: {
    type: "Date",
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);

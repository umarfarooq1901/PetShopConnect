const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: { type: String, required: true }, // For instance, Grooming, Mating, etc.
  type: {
    type: String,
    enum: ["home", "shop"],
    // Home services or visit to the pet shop
    required: true,
  },
  description: { type: String },
  price: { type: Number, required: true },
  petShop: {
    type: Schema.Types.ObjectId,
    ref: "PetShop",
    required: true,
  },
  // Reference to PetShop that offers the service

  imageUrl: { type: String }, // Optional image URL for the service
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Service", serviceSchema);

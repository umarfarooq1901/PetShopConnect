const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model (customer who placed the order)
    required: true,
  },
  petShop: {
    type: Schema.Types.ObjectId,
    ref: "PetShop", // Reference to the PetShop model (where the order was placed)
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product", // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],

  services: [
    {
      service: {
        type: Schema.Types.ObjectId,
        ref: "Service", // Reference to the service model
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },

  orderStatus: {
    type: String,
    enum: ["pending", "processed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre("save", function (next) {
  //.pre-save indicates that this middelware should run before teh "save" opearton occurs.
  this.updatedAt = Date.now(); //this refers to the current order document that si about to be saved.
  next(); //next: This is a callback function that you must call when your middleware function is done.
});

module.exports = mongoose.model("Order", orderSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (customer who wrote the review)
        required: true
    },
    petShop: {
        type: Schema.Types.ObjectId,
        ref: 'PetShop', // Reference to the PetShop model (the shop being reviewed)
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model (the product being reviewed, if applicable)
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order', // Reference to the Order model (the order related to the review)
        required: true
    },
   
    comment: {
        type: String,
        required: true,
        trim: true
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5 // Rating from 1 to 5 stars
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// // Middleware to update the `updatedAt` field before saving:
// reviewSchema.pre('save', function (next) {
//     this.updatedAt = Date.now();
//     next();
// });

module.exports = mongoose.model('Review', reviewSchema);

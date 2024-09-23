const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {type: String, required: true},
    productDescription: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    petShop: {
        type: Schema.Types.ObjectId,
        ref: 'PetShop',
        required: true

    },
    imageUrl: {type: String, required: true},
    createdAt: {
        type: Date, 
        default: Date.now}
});

module.exports = mongoose.model('Product', productSchema);
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Service = require('../models/serviceModel');


// Add to Cart Logic
const addToCart = async (req, res) => {
    try {
        const { _id } = req.user; // User ID from logged-in user
        const { productId, serviceId } = req.params; // Product or Service ID from route params
        const { quantity, weight, serviceType } = req.body; // Quantity, weight, and serviceType from request body

        const user = await User.findById(_id); // Find the user
        if (!user) {
            return res.status(404).json({ message: 'Kindly register!' });
        }

        let updated = false; // Flag to check if something was updated

        // For products
        if (productId) {
            const product = await Product.findById(productId); // Find the product
            if (!product) {
                return res.status(404).json({ message: 'Product not found!' });
            }

            const parsedQuantity = parseInt(quantity, 10);
            if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
                return res.status(400).json({ message: 'Invalid quantity!' });
            }

            // Check if product is already in the user's cart
            const cartItemIndex = user.productCart.findIndex((item) => item.productId.toString() === productId);
            if (cartItemIndex > -1) {
                // Product is already in the cart, update the quantity
                user.productCart[cartItemIndex].quantity += parsedQuantity;
                updated = true; // Set updated flag
            } else {
                // Add new product to the cart
                user.productCart.push({
                    productId: product._id,
                    quantity: parsedQuantity,
                    weight: weight || 1, // Ensure default weight if none provided
                    price: product.productPrice || 0, // Ensure price is valid
                });
                updated = true; // Set updated flag
            }
        }

        // For services
        if (serviceId) {
            const service = await Service.findById(serviceId); // Find the service
            if (!service) {
                return res.status(404).json({ message: 'Service not found!' });
            }

            const servicePrice = service.price|| 0;
            if (!servicePrice) {
                return res.status(400).json({ message: 'Service price is missing or invalid!' });
            }

            // Check if the service type (home or visit) is provided
            if (!["home", "visit"].includes(serviceType)) {
                return res.status(400).json({ message: 'Invalid service type. Choose either "home" or "visit".' });
            }

            // Add the service to the serviceCart
            user.serviceCart.push({
                serviceId: service._id,
                price: servicePrice,
                serviceType: serviceType, // Either "home" or "visit"
            });
            updated = true; // Set updated flag
        }

        // Calculate the total cart value for products and services
        if (updated) {
            user.cartValue = user.productCart.reduce((acc, item) => acc + (item.quantity * item.price || 0), 0) +
                             user.serviceCart.reduce((acc, item) => acc + (item.price || 0), 0);
        }

        await user.save(); // Save the updated user data
        return res.status(200).json({ message: 'Item added to cart successfully!', cart: { products: user.productCart, services: user.serviceCart } });

    } catch (error) {
        console.log('Error while adding item to the cart', error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};


// Remove from Cart Logic
const removeFromCart = async (req, res) => {
    try {
        const { _id } = req.user; // User ID from logged-in user
        const { productId, serviceId } = req.params; // Product or Service ID from route params

        const user = await User.findById(_id); // Find the user
        if (!user) {
            return res.status(404).json({ message: 'Kindly register!' });
        }

        // Flag to check if an item was removed
        let updated = false;

        // For removing a product
        if (productId) {
            const cartItemIndex = user.productCart.findIndex((item) => item.productId.toString() === productId);
            if (cartItemIndex === -1) {
                return res.status(404).json({ message: 'Product not found in cart!' });
            }

            // Remove the product from the cart
            user.productCart.splice(cartItemIndex, 1);
            updated = true; // Set updated flag
        }

        // For removing a service
        if (serviceId) {
            const serviceItemIndex = user.serviceCart.findIndex((item) => item.serviceId.toString() === serviceId);
            if (serviceItemIndex === -1) {
                return res.status(404).json({ message: 'Service not found in cart!' });
            }

            // Remove the service from the cart
            user.serviceCart.splice(serviceItemIndex, 1);
            updated = true; // Set updated flag
        }

        // Recalculate the total cart value for products and services if updated
        if (updated) {
            user.cartValue = user.productCart.reduce((acc, item) => acc + item.quantity * item.price, 0) +
                             user.serviceCart.reduce((acc, item) => acc + item.price, 0);
        }

        await user.save(); // Save the updated user data
        return res.status(200).json({ message: 'Item removed from cart successfully!', cart: { products: user.productCart, services: user.serviceCart } });

    } catch (error) {
        console.log('Error while removing item from the cart', error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};

module.exports = { addToCart, removeFromCart };

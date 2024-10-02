const User = require('../models/userModel');
const Product = require('../models/productModel');

// Add to Cart Logic
const addToCart = async (req, res) => {
  try {
    const { _id } = req.user; // User ID from logged-in user
    const  productId  = req.params._id; // Product ID from route params
    const { quantity, weight } = req.body; // Quantity and weight from request body

    const user = await User.findById(_id); // Find the user
    if (!user) {
      return res.status(404).json({ message: 'Kindly register!' });
    }

    const product = await Product.findById(productId); // Find the product
    if (!product) {
      return res.status(404).json({ message: 'Product not found!' });
    }

    // Check if product is already in the user's cart
    const cartItemIndex = user.productCart.findIndex((item) => item.productId.toString() === productId);

    if (cartItemIndex > -1) {
      // Product is already in the cart, update the quantity
      user.productCart[cartItemIndex].quantity += parseInt(quantity);
    } else {
      // Add new product to the cart
      user.productCart.push({
        productId: product._id,
        quantity: parseInt(quantity),
        weight: weight,
        price: product.productPrice,
      });
    }

    // Calculate the total cart value
    user.cartValue = user.productCart.reduce((acc, item) => acc + item.quantity * item.price, 0);

    await user.save(); // Save the updated user data
    return res.status(200).json({ message: 'Product added to cart successfully!', cart: user.productCart });


  } catch (error) {
    console.log('Error while adding item to the cart', error);
    return res.status(500).json({ message: 'Internal Server Error!' });
  }
};

// Remove from Cart Logic
const removeFromCart = async (req, res) => {
  try {
    const { _id } = req.user; // User ID from logged-in user
    const  productId  = req.params._id; // Product ID from route params

    const user = await User.findById(_id); // Find the user
    if (!user) {
      return res.status(404).json({ message: 'Kindly register!' });
    }

    const cartItemIndex = user.productCart.findIndex((item) => item.productId.toString() === productId);
    if (cartItemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart!' });
    }

    // Remove the product from the cart
    user.productCart.splice(cartItemIndex, 1);

    // Recalculate the total cart value
    user.cartValue = user.productCart.reduce((acc, item) => acc + item.quantity * item.price, 0);

    await user.save(); // Save the updated user data
    return res.status(200).json({ message: 'Product removed from cart successfully!', cart: user.productCart });

  } catch (error) {
    console.log('Error while removing item from the cart', error);
    return res.status(500).json({ message: 'Internal Server Error!' });
  }
};

module.exports = { addToCart, removeFromCart };

const Order = require('../models/orderModel');
const User = require('../models/userModel');
const PetShop = require('../models/petShopModel');
const Product = require('../models/productModel');
const Service = require('../models/serviceModel');



// Direct order
const createOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const productId = req.params._id;  // Product ID
        const serviceId = req.params._serviceId;  // Service ID
        const { petshopId } = req.petshop;
        const { quantity, weight, serviceType } = req.body;  // Service type: 'home' or 'visit'

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Please log in!' });
        }

        // Initialize order fields
        let totalAmount = 0;
        const orderItems = {};
        const petshop = await PetShop.findById(petshopId);
        if (!petshop) {
            return res.status(404).json({ message: 'Pet shop not found!' });
        }

        // If productId is provided, add the product to the order
        if (productId) {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found!' });
            }
            orderItems.products = [
                {
                    productId: product._id,
                    quantity: quantity,
                    weight: weight,
                    price: product.productPrice,
                },
            ];
            totalAmount += product.productPrice * quantity; // Calculate the product price
        }

        // If serviceId is provided, add the service to the order
        if (serviceId) {
            const service = await Service.findById(serviceId);
            if (!service) {
                return res.status(404).json({ message: 'Service not found!' });
            }

            //    // Check if the service has a valid price
            //    if (!service.price || isNaN(service.price)) {
            //     return res.status(400).json({ message: 'Service price is missing or invalid!' });
            // }
            orderItems.services = [
                {
                    serviceId: service._id,
                    serviceType: serviceType,  // 'home' or 'visit'
                    price: service.price,
                },
            ];
            totalAmount += service.price; // Add service price
        }

        // If neither product nor service was selected
        if (!productId && !serviceId) {
            return res.status(400).json({ message: 'Please select a product or a service.' });
        }

        // Create a new order
        const newOrder = new Order({
            customer: userId,
            petShop: petshopId,
            products: orderItems.products || [],  // Add products only if available
            services: orderItems.services || [],  // Add services only if available
            totalAmount: totalAmount,
            paymentStatus: 'pending',
            orderStatus: 'pending',
        });

        // Save the order to the database
        await newOrder.save();

        return res.status(201).json({ message: 'Order created successfully!', order: newOrder });
    } catch (error) {
        console.log('Error while creating the order:', error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
};




// from cart order
const createCartOrder = async (req, res) => {
    try {
      const userId = req.user._id;
      const { petshopId } = req.petshop;
      const petshop = await PetShop.findById(petshopId);
  
      const user = await User.findById(userId);
  
      if (!user || (user.productCart.length === 0 && user.serviceCart.length === 0)) {
        return res.status(404).json({ message: 'Your cart is empty!' });
      }
  
      let totalAmount = 0;
  
      // Fetch products in parallel
      const productPromise = user.productCart.map(async (cartItem) => {
        const product = await Product.findById(cartItem.productId);
        if (!product) {
          throw new Error(`Product with ID ${cartItem.productId} is unavailable`);
        }
        const itemTotal = cartItem.price * cartItem.quantity;
        totalAmount += itemTotal;
  
        return {
          productId: product._id,
          quantity: cartItem.quantity,
          weight: cartItem.weight,
          price: cartItem.price,
        };
      });
  
      // Fetch services in parallel
      const servicePromise = user.serviceCart.map(async (cartService) => {
        const services = await Service.findById(cartService.serviceId);
        if (!services) {
          throw new Error(`Service with ID ${cartService.serviceId} is unavailable`);
        }
  
        totalAmount += cartService.price;
  
        return {
          serviceId: services._id,
          price: cartService.price,
          serviceType: cartService.serviceType, // Assuming serviceType is saved in the cart
        };
      });
  
      // Resolve all products and services promises concurrently
      const [productsInCart, servicesInCart] = await Promise.all([
        Promise.all(productPromise),
        Promise.all(servicePromise),
      ]);
  
      // Create new order
      const newOrder = new Order({
        customer: userId,
        petShop: petshopId,
        products: productsInCart.length > 0 ? productsInCart : undefined,
        services: servicesInCart.length > 0 ? servicesInCart : undefined,
        totalAmount,
        paymentStatus: 'pending',
        orderStatus: 'pending',
      });
  
      const savedOrder = await newOrder.save();
  
      if (!savedOrder) {
        return res.status(500).json({ message: 'Some internal error occurred while saving your order!' });
      }
  
      // Push the new order to user and pet shop
      user.orderPlaced.push(savedOrder._id);
      petshop.orderReceived.push(savedOrder._id);
  
      // Clear the user's product and service cart
      user.productCart = [];
      user.serviceCart = [];
  
      // Save changes
      await user.save();
      await petshop.save();
  
      return res.status(200).json({ message: 'Order placed successfully!' });
    } catch (error) {
      console.error('Error while creating the order', error);
      return res.status(500).json({ message: 'Internal Server Error!' });
    }
  };
  



module.exports = {createOrder, createCartOrder}

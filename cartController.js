const Cart = require('../models/Cart');

// Add item to cart
const addItemToCart = async (req, res) => {
  const { productId, name, price, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = new Cart({
      user: req.user.id,
      items: [],
    });
  }

  const itemIndex = cart.items.findIndex((item) => item.productId === productId);

  if (itemIndex > -1) {
    // Update quantity if item exists in cart
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, name, price, quantity });
  }

  await cart.save();

  res.status(200).json(cart);
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
  const { productId } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (cart) {
    cart.items = cart.items.filter((item) => item.productId !== productId);
    await cart.save();
    res.status(200).json(cart);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
};

// Get cart items
const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });

  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Cart not found' });
  }
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  getCart,
};
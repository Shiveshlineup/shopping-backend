const express = require('express');
const { addItemToCart, removeItemFromCart, getCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', protect, addItemToCart);
router.post('/remove', protect, removeItemFromCart);
router.get('/', protect, getCart);

module.exports = router;
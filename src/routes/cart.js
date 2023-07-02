const express = require('express');
const { authenticateUser, isUser } = require('../middleware/auth');

const router = express.Router();
const {
  addCart,
  getAllCartByUserId,
  updateCart,
  deleteCart,
} = require('../services/cart-services');

router.post('/', authenticateUser, isUser, addCart);
router.get('/', authenticateUser, isUser, getAllCartByUserId);
router.put('/:cartId', authenticateUser, isUser, updateCart);
router.delete('/:cartId', authenticateUser, isUser, deleteCart);

module.exports = router;

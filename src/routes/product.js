const express = require('express');
const { authenticateUser, isAdmin } = require('../middleware/auth');

const router = express.Router();
const {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../services/product-services');

router.post('/', authenticateUser, isAdmin, addProduct);
router.get('/', authenticateUser, getProduct);
router.put('/', authenticateUser, isAdmin, updateProduct);
router.delete('/', authenticateUser, isAdmin, deleteProduct);

module.exports = router;

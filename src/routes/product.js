const express = require('express');
const { authenticateUser, isAdmin } = require('../middleware/auth');
const localUploadSerivce = require('../services/local-uploads-services');

const router = express.Router();
const {
  addProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} = require('../services/product-services');

router.post('/', authenticateUser, isAdmin, addProduct);
router.get('/:productId', getProductById);
router.get('/', getAllProduct);
router.put('/:productId', authenticateUser, isAdmin, updateProduct);
router.delete('/:productId', authenticateUser, isAdmin, deleteProduct);
router.post('/upload/:productId', authenticateUser, isAdmin, localUploadSerivce('products').single('img_product'), uploadProductImage);

module.exports = router;

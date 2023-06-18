const express = require('express');
const { authenticateUser, isAdmin } = require('../middleware/auth');

const router = express.Router();
const {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../services/category-services');

router.post('/', authenticateUser, isAdmin, addCategory);
router.get('/', getCategory);
router.put('/', authenticateUser, isAdmin, updateCategory);
router.delete('/', authenticateUser, isAdmin, deleteCategory);

module.exports = router;

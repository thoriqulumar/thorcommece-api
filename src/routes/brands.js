const express = require('express');
const { authenticateUser, isAdmin } = require('../middleware/auth');

const router = express.Router();
const {
  addBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} = require('../services/brands-services');

router.post('/', authenticateUser, isAdmin, addBrand);
router.get('/', getBrands);
router.put('/', authenticateUser, isAdmin, updateBrand);
router.delete('/', authenticateUser, isAdmin, deleteBrand);

module.exports = router;

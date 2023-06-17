const express = require('express');
const { authenticateUser, isUser } = require('../middleware/auth');

const router = express.Router();
const {
  getProfile,
  updateProfile,
} = require('../services/profile-services');

router.get('/:userId', authenticateUser, isUser, getProfile);
router.put('/update/:userId', authenticateUser, isUser, updateProfile);

module.exports = router;

/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const localUploadSerivce = require('../services/local-uploads-services');
const { authenticateUser, isUser } = require('../middleware/auth');

const router = express.Router();
const {
  getProfile,
  updateProfile,
  uploadProfileImage,
} = require('../services/profile-services');

router.get('/:userId', authenticateUser, isUser, getProfile);
router.put('/:userId', authenticateUser, isUser, updateProfile);
router.post('/upload/:userId', localUploadSerivce('profile').single('img_profile'), uploadProfileImage);

module.exports = router;

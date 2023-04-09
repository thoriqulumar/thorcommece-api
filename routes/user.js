const express = require('express');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();
const { refreshTokenService } = require('../services/refresh-services');
const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../services/user-services');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticateUser, logoutUser);
router.get('/refresh-token', refreshTokenService);

module.exports = router;

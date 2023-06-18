const express = require('express');

const router = express.Router();
const {
  registerUser,
} = require('../services/user-services');

router.post('/register', registerUser);

module.exports = router;

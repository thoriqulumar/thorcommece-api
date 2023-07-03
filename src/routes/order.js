const express = require('express');
const { authenticateUser, isUser } = require('../middleware/auth');

const router = express.Router();
const {
  order,
} = require('../services/order-services');

router.post('/', authenticateUser, isUser, order);

module.exports = router;

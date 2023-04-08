const express = require('express');
const { authenticateUser, isUser } = require('../middleware/auth');

const router = express.Router();
const {
  orderProduct,
} = require('../services/order-services');

router.post('/', authenticateUser, isUser, orderProduct);

module.exports = router;

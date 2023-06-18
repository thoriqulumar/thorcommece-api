const express = require('express');

const router = express.Router();

const {
  loginUser,
  logoutUser,
  refreshAuthentication,
} = require('../services/authentications-services');

router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.put('/refresh', refreshAuthentication);

module.exports = router;

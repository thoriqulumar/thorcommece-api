const express = require('express');

const router = express.Router();
const {
  registerUser,
} = require('../services/user-services');

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     tags:
 *       - User
 *     description: register new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *             example:
 *               username: johnjohn
 *               email: john@example.com
 *               password: johnpassword123
 *               role: user
 *     responses:
 *       201:
 *         description: success create new user
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               data:
 *                 type: object
 *             example:
 *               message: user succesfully created
 *               data:
 *                  id: id
 *                  username: username
 *                  email: email
 *                  role: role
 */
router.post('/register', registerUser);

module.exports = router;

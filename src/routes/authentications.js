const express = require('express');

const router = express.Router();

const {
  loginUser,
  logoutUser,
  refreshAuthentication,
} = require('../services/authentications-services');

/**
 * @swagger
 * /api/authentications/login:
 *   post:
 *     tags:
 *       - Authentications
 *     description: login user to get access token and refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: john@example.com
 *               password: johnpassword123
 *     responses:
 *       201:
 *         description: success login
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
 *               status: success
 *               data:
 *                  accessToken: accessToken
 *                  refreshToken: refreshToken
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/authentications/logout:
 *   post:
 *     tags:
 *       - Authentications
 *     description: logout user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: refreshToken
 *     responses:
 *       200:
 *         description: success logout
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               message:
 *                 type: object
 *             example:
 *               status: success
 *               message: logged out successfully
 */
router.post('/logout', logoutUser);

/**
 * @swagger
 * /api/authentications/refresh:
 *   put:
 *     tags:
 *       - Authentications
 *     description: use refresh token to get new access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *             example:
 *               refreshToken: refreshToken
 *     responses:
 *       201:
 *         description: success get new access token
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               message:
 *                 type: object
 *             example:
 *               status: success
 *               data:
 *                  accessToken: accessToken
 */
router.put('/refresh', refreshAuthentication);

module.exports = router;

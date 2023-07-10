const express = require('express');
const { authenticateUser, isAdmin } = require('../middleware/auth');

const router = express.Router();
const {
  addBrand,
  getBrands,
  updateBrand,
  deleteBrand,
} = require('../services/brands-services');
/**
 * @swagger
 * /api/brands/:
 *   post:
 *     tags:
 *       - Brands
 *     description: add new brand.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: apple
 *     responses:
 *       201:
 *         description: success create new brand
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
 *                  id: id
 *                  name: apple
 */
router.post('/', authenticateUser, isAdmin, addBrand);

/**
 * @swagger
 * /api/brands/:
 *   get:
 *     tags:
 *       - Brands
 *     description: get all brands.
 *     responses:
 *       200:
 *         description: get all brands
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               data:
 *                 type: array
 *             example:
 *               status: success
 *               data:
 *                  - id: id
 *                    name: apple
 *                  - id: id
 *                    name: google
 */
router.get('/', getBrands);

/**
 * @swagger
 * /api/brands/:
 *   put:
 *     tags:
 *       - Brands
 *     description: edit brand.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *             example:
 *               id: 1
 *               name: apple
 *     responses:
 *       201:
 *         description: success create edit brand
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               message:
 *                 type: string
 *             example:
 *               status: success
 *               message: brand succesfully updated
 */
router.put('/', authenticateUser, isAdmin, updateBrand);

/**
 * @swagger
 * /api/brands/:
 *   delete:
 *     tags:
 *       - Brands
 *     description: edit brand.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *             example:
 *               id: 1
 *     responses:
 *       201:
 *         description: success delete brand
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               message:
 *                 type: string
 *             example:
 *               status: success
 *               message: brand succesfully deleted
 */
router.delete('/', authenticateUser, isAdmin, deleteBrand);

module.exports = router;

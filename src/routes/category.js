const express = require('express');
const { authenticateUser, isAdmin } = require('../middleware/auth');

const router = express.Router();
const {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../services/category-services');
/**
 * @swagger
 * /api/category/:
 *   post:
 *     tags:
 *       - Category
 *     description: add new category.
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
 *         description: success create new category
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
router.post('/', authenticateUser, isAdmin, addCategory);

/**
 * @swagger
 * /api/category/:
 *   get:
 *     tags:
 *       - Category
 *     description: get all category.
 *     responses:
 *       200:
 *         description: get all category
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
router.get('/', getCategory);


/**
 * @swagger
 * /api/category/:
 *   put:
 *     tags:
 *       - Category
 *     description: edit category.
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
 *         description: success create edit category
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
 *               message: category succesfully updated
 */
router.put('/', authenticateUser, isAdmin, updateCategory);

/**
 * @swagger
 * /api/category/:
 *   delete:
 *     tags:
 *       - Category
 *     description: delete category.
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
 *         description: success delete category
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
 *               message: category succesfully deleted
 */
router.delete('/', authenticateUser, isAdmin, deleteCategory);

module.exports = router;

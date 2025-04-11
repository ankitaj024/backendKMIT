const express = require("express");
const cartController = express();
const verifyToken = require("../middleware/authMiddleware");
const {
  getData,
  postData,
  patchData,
  deleteData,
} = require("../services/cart.service");
const authoriseRoles = require("../middleware/authorizeRoles");
const ROLES = require("../middleware/roles");

/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: APIs for managing user cart
 */

/**
 * @swagger
 * /cart/:
 *   get:
 *     summary: Get cart items for the user
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched cart data
 *       401:
 *         description: Unauthorized
 */
cartController.get("/", verifyToken, authoriseRoles(ROLES.USER), getData);

/**
 * @swagger
 * /cart/:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 645a3f893b7c4e0012d2a1ab
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Item added to cart
 *       400:
 *         description: Invalid input
 */
cartController.post("/", verifyToken, authoriseRoles(ROLES.USER), postData);

/**
 * @swagger
 * /cart/:
 *   patch:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 645a3f893b7c4e0012d2a1ab
 *               quantity:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       400:
 *         description: Invalid request
 */
cartController.patch("/", verifyToken, authoriseRoles(ROLES.USER), patchData);

/**
 * @swagger
 * /cart/:
 *   delete:
 *     summary: Delete an item from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 645a3f893b7c4e0012d2a1ab
 *     responses:
 *       200:
 *         description: Item deleted from cart
 *       400:
 *         description: Invalid request
 */
cartController.delete("/", verifyToken, authoriseRoles(ROLES.USER), deleteData);

module.exports = cartController;

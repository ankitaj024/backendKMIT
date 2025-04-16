const express = require("express");
const orderController = express();

const {
  postData,
  getData,
  patchData,
  deleteData,
} = require("../services/orders.service");
const verifyToken = require("../middleware/authMiddleware");
const authoriseRoles = require("../middleware/authorizeRoles");
const ROLES = require("../middleware/roles");

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: APIs for managing user orders
 */

/**
 * @swagger
 * /orders/:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: 645a3f893b7c4e0012d2a1ab
 *                     quantity:
 *                       type: number
 *                       example: 2
 *               totalAmount:
 *                 type: number
 *                 example: 299.99
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Invalid order data
 */
orderController.post("/", verifyToken, authoriseRoles(ROLES.USER), postData);

/**
 * @swagger
 * /orders/:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved orders
 *       401:
 *         description: Unauthorized
 */
orderController.get("/", verifyToken, authoriseRoles(ROLES.USER), getData);

/**
 * @swagger
 * /orders/:
 *   patch:
 *     summary: Update an existing order (e.g., status)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: 642ab12345678a0012b3c456
 *               status:
 *                 type: string
 *                 example: delivered
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Invalid request
 */
orderController.patch("/", verifyToken, authoriseRoles(ROLES.USER), patchData);

/**
 * @swagger
 * /orders/:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: 642ab12345678a0012b3c456
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       400:
 *         description: Invalid request
 */
orderController.delete(
  "/",
  verifyToken,
  authoriseRoles(ROLES.USER),
  deleteData
);

module.exports = orderController;

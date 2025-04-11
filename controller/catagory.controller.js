const express = require("express");
const catagoryController = express();
const { getData, postData, patchData, deleteData } = require("../services/catagory.service");
const verifyToken = require("../middleware/authMiddleware");
const authoriseRoles = require("../middleware/authorizeRoles");
const ROLES = require("../middleware/roles");

/**
 * @swagger
 * tags:
 *   - name: Catagory
 *     description: APIs for managing product categories
 */

/**
 * @swagger
 * /catagory/:
 *   get:
 *     summary: Get all categories
 *     tags: [Catagory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *       401:
 *         description: Unauthorized
 */
catagoryController.get("/", verifyToken, authoriseRoles(ROLES.ADMIN), getData);

/**
 * @swagger
 * /catagory/:
 *   post:
 *     summary: Create a new category
 *     tags: [Catagory]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid input
 */
catagoryController.post("/", verifyToken, authoriseRoles(ROLES.ADMIN), postData);

/**
 * @swagger
 * /catagory/{id}:
 *   patch:
 *     summary: Update a category by ID
 *     tags: [Catagory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Electronics
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
catagoryController.patch("/:id", verifyToken, authoriseRoles(ROLES.ADMIN), patchData);

/**
 * @swagger
 * /catagory/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Catagory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
catagoryController.delete("/:id", verifyToken, authoriseRoles(ROLES.ADMIN), deleteData);

module.exports = catagoryController;

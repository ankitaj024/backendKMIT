const express = require("express");
const ROLES = require("../middleware/roles");
const {
  getData,
  postData,
  patchData,
  deleteData,
  searchMethod,
  loginMethod,
  paymentCreateMethod,
  bulkCreateEmployeesFromCSV,
} = require("../services/employee.service");
const verifyToken = require("../middleware/authMiddleware");
const { forgetPassword, verifyPassword } = require("../services/forget.password");
const updatePassword = require("../services/update.password");
const authoriseRoles = require("../middleware/authorizeRoles");

const employeeController = express();

/**
 * @swagger
 * /employee/all:
 *   get:
 *     summary: Get all employees (Admin only)
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of employees
 */
employeeController.get("/all", verifyToken, authoriseRoles(ROLES.ADMIN), getData);

/**
 * @swagger
 * /employee/create:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Employee created
 */
employeeController.post("/create", postData);

/**
 * @swagger
 * /employee/{id}:
 *   employee/patch:
 *     summary: Update an employee (Admin or User)
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Employee updated
 */
employeeController.patch("/:id", verifyToken, authoriseRoles(ROLES.ADMIN, ROLES.USER), patchData);

/**
 * @swagger
 * /employee/{id}:
 *   delete:
 *     summary: Delete an employee (Admin or User)
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted
 */
employeeController.delete("/:id", verifyToken, authoriseRoles(ROLES.ADMIN, ROLES.USER), deleteData);

/**
 * @swagger
 * /employee/search:
 *   get:
 *     summary: Search employees
 *     tags: [Employees]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
employeeController.get("/search", searchMethod);

/**
 * @swagger
 * /employee/login:
 *   post:
 *     summary: Login user
 *     tags: [Employees]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
employeeController.post("/login", loginMethod);

/**
 * @swagger
 * /employee/payment-create:
 *   post:
 *     summary: Create payment intent
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: Payment created
 */
employeeController.post("/payment-create", paymentCreateMethod);

/**
 * @swagger
 * /employee/forget-password:
 *   post:
 *     summary: Send forget password OTP
 *     tags: [Employees]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent
 */
employeeController.post("/forget-password", forgetPassword);

/**
 * @swagger
 * /employee/verify-password:
 *   post:
 *     summary: Verify OTP
 *     tags: [Employees]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp]
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified
 */
employeeController.post("/verify-password", verifyPassword);

/**
 * @swagger
 * /employee/update-password:
 *   post:
 *     summary: Update password
 *    tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password]
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 */
employeeController.post("/update-password", verifyToken, updatePassword);

/**
 * @swagger
 * /employee/csv:
 *   post:
 *     summary: Upload CSV to create multiple employees
 *     tags: [Employees]
 *     responses:
 *       201:
 *         description: Employees created from CSV
 */
employeeController.post("/csv", bulkCreateEmployeesFromCSV);

module.exports = employeeController;

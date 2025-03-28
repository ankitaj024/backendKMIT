const express = require("express");
const ROLES = require("../middleware/roles")
const {
  getData,
  postData,
  patchData,
  deleteData,
  searchMethod,
  loginMethod,
  paymentCreateMethod,
} = require("../services/employee.service");
const employeeController = express();
const verifyToken = require("../middleware/authMiddleware");
const { forgetPassword, verifyPassword } = require("../services/forget.password");
const updatePassword = require("../services/update.password");
const authoriseRoles = require("../middleware/authorizeRoles");

employeeController.get("/all", verifyToken, authoriseRoles(ROLES.ADMIN), getData);
employeeController.post("/create", postData);
employeeController.patch("/:id", verifyToken, authoriseRoles(ROLES.ADMIN, ROLES.USER), patchData);
employeeController.delete("/:id", verifyToken,authoriseRoles(ROLES.ADMIN, ROLES.USER), deleteData);
employeeController.get("/search", searchMethod);
employeeController.post("/login", loginMethod);
employeeController.post("/payment-create", paymentCreateMethod);
employeeController.post("/forget-password", forgetPassword)
employeeController.post("/verify-password", verifyPassword)
employeeController.post('/update-password', verifyToken, updatePassword)

module.exports = employeeController;

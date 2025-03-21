const express = require("express");
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

employeeController.get("/all", verifyToken, getData);
employeeController.post("/create", postData);
employeeController.patch("/:id", patchData);
employeeController.delete("/:id", deleteData);
employeeController.get("/search", searchMethod);
employeeController.post("/login", loginMethod);
employeeController.post("/payment-create", paymentCreateMethod);

module.exports = employeeController;

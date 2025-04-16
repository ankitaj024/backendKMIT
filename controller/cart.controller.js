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

cartController.get("/", verifyToken, authoriseRoles(ROLES.USER), getData);
cartController.post("/", verifyToken, authoriseRoles(ROLES.USER), postData);
cartController.patch("/", verifyToken, authoriseRoles(ROLES.USER), patchData);
cartController.delete("/", verifyToken, authoriseRoles(ROLES.USER), deleteData);

module.exports = cartController;

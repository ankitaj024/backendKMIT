const express = require("express");
const orderController = express();

const {postData,getData, patchData, deleteData} = require("../services/orders.service");
const verifyToken = require("../middleware/authMiddleware");
const authoriseRoles = require("../middleware/authorizeRoles");
const ROLES = require("../middleware/roles");


orderController.post("/",verifyToken, authoriseRoles(ROLES.USER), postData);
orderController.get("/" ,verifyToken,  authoriseRoles(ROLES.USER), getData)
orderController.patch("/" ,verifyToken, authoriseRoles(ROLES.USER), patchData)
orderController.delete("/", verifyToken, authoriseRoles(ROLES.USER), deleteData)


module.exports = orderController;
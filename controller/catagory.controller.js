const express = require("express");
const catagoryController = express();
const {getData, postData, patchData, deleteData} = require("../services/catagory.service");
const verifyToken = require("../middleware/authMiddleware");
const authoriseRoles = require("../middleware/authorizeRoles");
const ROLES = require("../middleware/roles");

catagoryController.get("/", verifyToken, authoriseRoles(ROLES.ADMIN), getData );
catagoryController.post("/" ,verifyToken,authoriseRoles(ROLES.ADMIN), postData)
catagoryController.patch("/:id",verifyToken, authoriseRoles(ROLES.ADMIN),patchData)
catagoryController.delete("/:id",verifyToken,authoriseRoles(ROLES.ADMIN), deleteData)

module.exports = catagoryController;

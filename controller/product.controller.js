const express = require("express");
const productController = express();
// const {getData, postData, patchData, deleteData} = require("../services/catagory.service")
const {
  postData,
  getData,
  patchData,
  deleteData,
  searchMethod,
} = require("../services/product.service");
const authoriseRoles = require("../middleware/authorizeRoles");
const ROLES = require("../middleware/roles");
const verifyToken = require("../middleware/authMiddleware");

productController.get("/", verifyToken, authoriseRoles(ROLES.ADMIN), getData);
productController.post("/", verifyToken, authoriseRoles(ROLES.ADMIN), postData);
productController.patch(
  "/:id",
  verifyToken,
  authoriseRoles(ROLES.ADMIN),
  patchData
);
productController.delete(
  "/:id",
  verifyToken,
  authoriseRoles(ROLES.ADMIN),
  deleteData
);
productController.get(
  "/:id",
  verifyToken,
  authoriseRoles(ROLES.ADMIN),
  searchMethod
);

module.exports = productController;

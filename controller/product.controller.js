const express = require("express");
const productController = express();
// const {getData, postData, patchData, deleteData} = require("../services/catagory.service")
const {postData, getData, patchData, deleteData, searchMethod} = require("../services/product.service")


productController.get("/", getData );
productController.post("/" , postData)
productController.patch("/:id", patchData)
productController.delete("/:id", deleteData)
productController.get("/:id", searchMethod)


module.exports = productController;
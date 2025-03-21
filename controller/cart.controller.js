const express = require("express");
const cartController = express();
const verifyToken = require("../middleware/authMiddleware")
const  {getData,postData,patchData,deleteData} = require("../services/cart.service")

cartController.get("/",verifyToken, getData );
cartController.post("/" ,verifyToken, postData)
cartController.patch("/:id", verifyToken, patchData)
cartController.delete("/:id", verifyToken, deleteData)


module.exports = cartController;
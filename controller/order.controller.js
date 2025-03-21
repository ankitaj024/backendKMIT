const express = require("express");
const orderController = express();

const {postData,getData, patchData, deleteData} = require("../services/orders.service");
const verifyToken = require("../middleware/authMiddleware")


orderController.post("/",verifyToken, postData);
orderController.get("/" ,verifyToken, getData)
orderController.patch("/:id", patchData)
orderController.delete("/:id", deleteData)


module.exports = orderController;
const express = require("express");
const catagoryController = express();
const {getData, postData, patchData, deleteData} = require("../services/catagory.service")

catagoryController.get("/", getData );
catagoryController.post("/" , postData)
catagoryController.patch("/:id", patchData)
catagoryController.delete("/:id", deleteData)

module.exports = catagoryController;

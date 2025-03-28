const express = require('express');
const { uploadFiles, deleteUpload } = require('../services/upload.service');
const uploadController = express();


uploadController.post("/", uploadFiles)
uploadController.delete("/", deleteUpload)

module.exports = uploadController;
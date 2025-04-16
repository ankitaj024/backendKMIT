const express = require('express');
const {subscribtionService, getSubscription, deleteSubscription} = require('../services/subscribtionService');
const verifyToken = require('../middleware/authMiddleware');
const subscribtionController = express();

subscribtionController.post("/", verifyToken, subscribtionService)
subscribtionController.get('/', getSubscription)
subscribtionController.delete('/', verifyToken,deleteSubscription)


module.exports = subscribtionController
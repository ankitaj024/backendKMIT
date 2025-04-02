const express = require('express');
const {subscribtionService, getSubscription, deleteSubscription} = require('../services/subscribtionService');
const subscribtionController = express();

subscribtionController.post("/", subscribtionService)
subscribtionController.get('/', getSubscription)
subscribtionController.delete('/', deleteSubscription)


module.exports = subscribtionController
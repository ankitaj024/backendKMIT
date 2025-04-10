const express = require('express');
const sendPushNotification = require('../services/pushNotification');
const PushNotificationController = express();


PushNotificationController.post("/", sendPushNotification)

module.exports = PushNotificationController;
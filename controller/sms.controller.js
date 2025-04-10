const express = require('express');
const sendSMS = require('../utils /smsModule');
const smsController = express();


smsController.post("/",sendSMS )

module.exports = smsController;
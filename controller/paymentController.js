const express = require('express');
const {paymentService, paymentDelete} = require('../services/paymentMethod');
const paymentController = express();

paymentController.post("/", paymentService)
paymentController.delete("/:id", paymentDelete )

module.exports = paymentController;
const express = require('express');
const {paymentService, paymentDelete} = require('../services/paymentMethod');
const verifyToken = require('../middleware/authMiddleware');
const paymentController = express();

paymentController.post("/", verifyToken, paymentService)
paymentController.delete("/:id", paymentDelete )

module.exports = paymentController;
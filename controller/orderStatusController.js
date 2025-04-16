const express = require('express');
const { orderStatusService } = require('../services/orderStatusService');
const orderStatusController = express();


orderStatusController.get("/",orderStatusService )

module.exports = orderStatusController
;
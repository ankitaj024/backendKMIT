const express = require("express");
const webHookSubscription = require("../services/webHookService");
const webHookController = express();
webHookController.use(express.raw({ type: "application/json" }));

webHookController.post("/", webHookSubscription)

module.exports = webHookController
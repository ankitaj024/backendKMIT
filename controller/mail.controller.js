const express = require("express");
const sendMail = require("../services/mail.service");
const mailController = express();


mailController.post("/", sendMail)

module.exports = mailController
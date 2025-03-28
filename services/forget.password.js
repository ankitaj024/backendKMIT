const employeeModel = require("../models/employee.model");
const sendMail = require("./mail.service");
const bcrypt = require("bcrypt");

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const Otp = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await employeeModel.findOneAndUpdate(
      { email },
      { otp: Otp },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .send({ status: 404, message: "No user found with this mail id" });
    }
    const mailData = {
      name: user.name,
      to: email,
      subject: "Otp recieved",
    };
    sendMail(mailData, Otp);
    res.status(200).send({ status: 200, message: "Otp send successfully" });
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message });
  }
};

const verifyPassword = async (req, res) => {
  try {
    let { email, otp, newPassword } = req.body;
    const user = await employeeModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ status: 404, message: "Invalid user" });
    }
    if (user.otp === otp) {
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(newPassword, salt);
      await employeeModel.findOneAndUpdate(
        { email },
        { password: newPassword, otp: null },
        { new: true }
      );
      res
        .status(200)
        .send({ status: 200, message: "Password Successfully Updated" });
    } else {
      res.status(404).send({ status: 404, message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message });
  }
};

module.exports = { forgetPassword, verifyPassword };

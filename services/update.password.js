const employeeModel = require("../models/employee.model");
const bcrypt = require("bcrypt");

const updatePassword = async (req, res) => {
    try{
  let { currentPassword, newPassword } = req.body;
  const id = req.userId;
  const user = await employeeModel.findOne({_id:id});
  if (!user) {
    return res
      .status(404)
      .send({ status: 200, message: "Invalid token or user" });
  }
  const verifyPassword = await bcrypt.compare(currentPassword, user.password);
  if (!verifyPassword) {
    return res
      .status(404)
      .send({ status: 400, message: "Invalid Current password " });
  }
  const salt = await bcrypt.genSalt(10);
  newPassword = await bcrypt.hash(newPassword, salt);
  await employeeModel.findOneAndUpdate({_id:id}, {password:newPassword});
  res.status(200).send({status:200, message:"Password Updated Succesfully"})
}
catch(error){
    res.status(500).send({status:500, message:error.message})
}
};

module.exports = updatePassword;

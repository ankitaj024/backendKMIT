const orderModel = require("../models/order.model");
const employeeModel = require("../models/employee.model");
const productModel = require("../models/product.model");
const { orderPayment } = require("./orderPayment");
const orderMail = require("./orderMail");
const sendSMS = require("../utils /smsModule");
const getData = async (req, res) => {
  try {
    const data = req.userId;
    const orderData = await orderModel.find({ userId: data });
    res.status(200).send({ status: 200, Data: orderData });
  } catch (e) {
    res.status(500);
    res.send(e);
  }
};

const postData = async (req, res) => {
  try {
    const data = req.body;
    const id = req.userId;
    const userId = await employeeModel.findById(id);
    if (!userId) {
      return res
        .status(404)
        .send({ status: 404, message: "Not such user found" });
    }
    let sum = 0;
    // let priceArray = []
    for (let item of data.items) {
      const product = await productModel.findById(item.productId);

      if (!product) {
        return res.status(404).send({
          status: 404,
          message: `Product not found: ${item.productId}`,
        });
      }
      let price = product.price;
      item.price = price;
      name = product.name;
      item.name = name;
      // priceArray.push(price)
      // console.log(name)
      sum = sum + price * item.quantity;
    }
    //   console.log(sum)
    const orderData = await orderModel.create({
      ...data,
      totalPrice: sum,
      userId: id,
    });
    const payment = await orderPayment(sum, "card", userId.customerId);
    // console.log(payment);
    let orderDataCheck;
    if (payment !== null) {
      orderDataCheck = await orderModel.findOneAndUpdate(
        { userId: id },
        { transactionId: payment, status: "payment Successfull" },
        { new: true }
      );
    } else {
      orderDataCheck = await orderModel.findOneAndUpdate(
        { userId: id },
        { transactionId: payment, status: "payment failed" },
        { new: true }
      );
    }
    // console.log(orderDataCheck)
    const plainObj = JSON.parse(JSON.stringify(orderData.items));
    const mailData = {
      name: userId.name,
      to: userId.email,
      subject: "Order Placed",
      orderId: orderData.id,
      totalPrice: sum,
      items: plainObj,
    };
    orderMail(mailData);
    const phoneNumber = "+91" + userId.phoneNumber;
    sendSMS(phoneNumber);
    res.status(201).send({
      status: 201,
      message: "Items added successfully",
      data: orderDataCheck,
      payment: payment,
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message });
  }
};
const patchData = async (req, res) => {
  try {
    const id = req.userId;
    const updatedData = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedOrder) {
      res
        .status(404)
        .send({ Status: 404, message: "order not found, please check id " });
    }
    res.send({
      status: 200,
      catagoryData: updatedData,
      message: "Order updated succesfuly",
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e.message,
    });
  }
};

const deleteData = async (req, res) => {
  try {
    const id = req.userId;
    // const updatedData = req.body;

    await orderModel.findByIdAndDelete(id);
    res.send({
      status: 200,
      message: "Order Deleted succesfuly",
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e.message,
    });
  }
};

module.exports = { getData, postData, patchData, deleteData };

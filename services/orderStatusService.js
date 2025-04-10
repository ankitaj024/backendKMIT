const orderModel = require("../models/order.model");

const orderStatusService = async (req, res) => {
  try {
    const { From, To, status } = req.query;
    const startDate = new Date(From);
    const endDate = new Date(To);
    let data;
    endDate.setHours(23, 59, 59, 999);
    if (status === "all") {
      data = await orderModel.find({
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      });
    } else {
      data = await orderModel.find({
        status: status,
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      });
    }
    let Revenue = 0;
    let count = 0;
    data.forEach((element) => {
      Revenue = Revenue + element.totalPrice;
      count++;
    });

    // console.log(Revenue)
    res.status(200).send({
      status: 200,
      Total: count,
      totalRevenue: Revenue,
      filterData: data,
    });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
};

module.exports = { orderStatusService };

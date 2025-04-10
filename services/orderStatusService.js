const orderModel = require("../models/order.model");

const orderStatusService = async (req, res) => {
  try {
    const {From, To , status} = req.query
    const startDate = new Date(From);
    const endDate = new Date(To);

    endDate.setHours(23, 59, 59, 999);

    const data = await orderModel.find({
      status: status,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    let Revenue = 0
     data.forEach((element)=>{
      Revenue = Revenue + element.totalPrice
    })

    console.log(Revenue)
    res.status(200).send({
      status: 200,
      totalRevenue:Revenue,
      filterData: data,
    });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
};

module.exports = { orderStatusService };

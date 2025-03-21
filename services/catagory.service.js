const catagoryModel = require("../models/catagories.model");

const getData = async (req, res) => {
  try {
    const catagoryData = await catagoryModel.find();
    res.send(catagoryData);
  } catch (e) {
    res.status(400);
    res.send(e);
  }
};

const postData = async (req, res) => {
  try {
    let data = req.body;
    let createdCatagory = await catagoryModel.create(data);
    // console.log(data);
    const object = {
      status: 201,
      catagoryData: createdCatagory,
      message: "Catagory Created Succesfully",
    };
    res.send(object);
  } catch (error) {
    res.status(400);
    const errorObject = {
      Status: 400,
      message: error.message,
    };
    // console.log(error.message)
    res.send(errorObject);
  }
};

const patchData = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedCatagory = await catagoryModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updatedCatagory) {
      res
        .status(404)
        .send({ Status: 404, message: "Catagory not found, please check id " });
    }
    res.send({
      status: 200,
      catagoryData: catagoryData,
      message: "Catagory updated succesfuly",
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
    const { id } = req.params;
    const updatedData = req.body;

    await catagoryModel.findByIdAndDelete(id);
    res.send({
      status: 200,
      message: "Catagory Deleted succesfuly",
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e.message,
    });
  }
};


module.exports = { getData, postData, deleteData, patchData };

const productModel = require("../models/product.model")
const catagoryModel = require("../models/catagories.model")


const getData = async (req, res) => {
  try {
    const ProductData = await productModel.find();
    res.status(200).send({status:20,Data:ProductData});
  } catch (e) {
    res.status(400);
    res.send(e);
  }
};


const postData = async (req,res)=>{
    try{
    const data = req.body;
    const catagory = await catagoryModel.findById(data.catagoryId);
    if(!catagory){
        return res.status(404).send({stats:404, message:"No such catagory available"})
    }
    const createProduct = await productModel.create(data);
    res.status(201).send({status:201, message:"Product added succesfully", ProductData: createProduct});
}
catch(error){
    res.status(404).send({status:404, message:error})
}
}

const patchData = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedproduct = await productModel.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
      if (!updatedproduct) {
        res
          .status(404)
          .send({ Status: 404, message: "Catagory not found, please check id " });
      }
      res.send({
        status: 200,
        catagoryData: updatedData,
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
  
      await productModel.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: "Catagory Deleted succesfuly",
        data:updatedData
      });
    } catch (e) {
      res.status(400).send({
        status: 400,
        message: e.message,
      });
    }
  };

  const searchMethod = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await productModel.find({catagoryId:id});
      // console.log(data)
      res.send({
        status: 200,
        message: "Search Successfully",
        data: data,
      });
    } catch (error) {
      res.status(500).send({ Status: 500, message: "Internal Error" });
    }
  };


module.exports = {getData, postData, patchData, deleteData, searchMethod}
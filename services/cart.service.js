const productModel = require("../models/product.model")
const employeeModel = require("../models/employee.model");
const cartModel = require("../models/cart.model")
const getData = async (req, res) => {
  try {
    const data = req.userId;
    // console.log(data)
    // const user = userData._id
    const cartData = await cartModel.find({userId:data});
    // console.log(cartData)
    res.status(200).send({status:200,Data:cartData});
  } catch (e) {
    res.status(500);
    res.send(e);
  }
};
const postData = async (req,res)=>{
    try{
        const data = req.body;
        const id = req.userId;
        // console.log(id)
        const productId = await productModel.findById(data.productId);
        // console.log(userId._id)
        if(!productId){
            return res.status(404).send({status:404, message:"Such product not found"})
        }
        const productPrice = productId.price
        // console.log(productPrice)
        const cartData = await cartModel.create({...data, userId:userId._id, price:productPrice});
        res.status(201).send({status:201, message:"Item added successfully", data:cartData})
    }
    catch(error){
        res.status(500).send({status:500, message:error})
    }
}
const patchData = async (req, res) => {
  try {
    const id = req.userId
    const updatedData = req.body;

    const UpdatedCart = await cartModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!UpdatedCart) {
      res
        .status(404)
        .send({ Status: 404, message: "Cart not found, please check id " });
    }
    res.send({
      status: 200,
      catagoryData: updatedData,
      message: "Cart updated succesfuly",
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
   const id = req.userId
    const updatedData = req.body;

    await cartModel.findByIdAndDelete(id);
    res.send({
      status: 200,
      message: "Cart Deleted succesfuly",
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e.message,
    });
  }
};



module.exports = {getData,postData,patchData,deleteData};

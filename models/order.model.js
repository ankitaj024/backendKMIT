const mongoose = require("mongoose");
mongoose.connect(process.env.dataBase);

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Employee",
      required: true,
    },
    totalPrice: {
      type: Number,
    },
    status: {
      type: String,
      required: true,
    },
    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Products",
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                static: true
            }
        }
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


module.exports = mongoose.model("Orders", orderSchema)
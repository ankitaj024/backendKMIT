const mongoose = require("mongoose");

mongoose.connect(process.env.dataBase);

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    catagoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Catagory",
        required:true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Products", productSchema)

const mongoose = require("mongoose");
mongoose.connect(process.env.dataBase);

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price:{
      type:Number,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


module.exports = mongoose.model("Cart", cartSchema);
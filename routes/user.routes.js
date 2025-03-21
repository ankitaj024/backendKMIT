const express = require("express");
const userRoute = express();
const employeeController = require("../controller/employee.controller")
const catagoryController = require("../controller/catagory.controller")
const productController = require("../controller/product.controller")
const cartController = require("../controller/cart.controller")
const orderController = require("../controller/order.controller")

userRoute.use("/employee" , employeeController );
userRoute.use("/catagory" , catagoryController );
userRoute.use("/products" , productController );
userRoute.use("/cart" , cartController );
userRoute.use("/orders" , orderController );

module.exports = userRoute
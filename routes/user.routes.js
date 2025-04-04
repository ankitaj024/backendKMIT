const express = require("express");
const userRoute = express();
const employeeController = require("../controller/employee.controller")
const catagoryController = require("../controller/catagory.controller")
const productController = require("../controller/product.controller")
const cartController = require("../controller/cart.controller")
const orderController = require("../controller/order.controller");
const uploadController = require("../controller/uploadController");
const mailController = require("../controller/mail.controller");
const googleController = require("../controller/googleAuth.controller");
const paymentController = require("../controller/paymentController");
const subscribtionController = require("../controller/subscribation.controller");
const webHookController = require("../controller/webHookController");
const calenderController = require("../controller/calenderController");


userRoute.use("/employee" , employeeController );
userRoute.use("/catagory" , catagoryController );
userRoute.use("/products" , productController );
userRoute.use("/cart" , cartController );
userRoute.use("/orders" , orderController );
userRoute.use("/upload" , uploadController );
userRoute.use("/mail" , mailController );
userRoute.use("/" , googleController );
userRoute.use("/payment", paymentController)
userRoute.use("/subscriptions", subscribtionController)
userRoute.use("/stripe-hook-update", webHookController)
userRoute.use("/google-calender", calenderController)



module.exports = userRoute
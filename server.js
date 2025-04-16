const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
// const path = require('path')
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
// const {CronJob} = require('cron')
dotenv.config();
const webHookController = require("./controller/webHookController");
const port = process.env.PORT
const app = express();
const userRoute = require("./routes/user.routes");
app.use("/stripe-hook-update", express.raw({ type: "application/json" }), webHookController);
app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static('uploads'));
app.use(express.json())
app.use(
    cors({
      origin: "*",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", userRoute )
// job = new CronJob("* * * * * *", ()=>{
//     console.log("cronJob")
// })

// // job.start();

app.listen(port || 3000, "0.0.0.0", () => {
    console.log(`Server is Running at ${port} Port`);
  });
  
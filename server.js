const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
const path = require('path')
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
app.use(cors());

app.use("/", userRoute )
// job = new CronJob("* * * * * *", ()=>{
//     console.log("cronJob")
// })

// // job.start();

app.listen(port, ()=>{
    console.log(`Server is Running at ${port} Port`)
    
})
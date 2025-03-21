const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");


dotenv.config();
const port = process.env.PORT
const app = express();
const userRoute = require("./routes/user.routes")
app.use(express.json())
app.use(cors());

app.use("/", userRoute )


app.listen(port, ()=>{
    console.log(`Server is Running at ${port} Port`)
})
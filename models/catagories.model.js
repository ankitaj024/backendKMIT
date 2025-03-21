const mongoose = require("mongoose")
mongoose.connect(process.env.dataBase);

const catagorySchema = mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true
        },
      
    },
    {
        timestamps: true,
        versionKey:false
    }
)

module.exports = mongoose.model("Catagory", catagorySchema);

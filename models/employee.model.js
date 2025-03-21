const mongoose = require("mongoose");

mongoose.connect(process.env.dataBase);

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [3, "Name must be at least 3 characters"],
            maxlength: [50, "Name must be at most 50 characters"]
        },
        email: {
            type: String,
        required: true,
        unique: true,  // ensures no duplicate emails
        validate: {
            validator: function (v) {
                // Regular expression for basic email validation
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"]

        },
        phoneNumber: {
            type: Number,
            required: [true, "Phone number is required"],
            // unique: true,
            validate: {
                validator: function (value) {
                    return /^\d{10}$/.test(value.toString());
                },
                message: "Phone number must be exactly 10 digits"
            }
        },
        address: {
            type: String,
            required: [true, "Address is required"],
            trim: true,
            minlength: [10, "Address must be at least 10 characters"]
        },
        gender: {
            type: String,
            // required: [true, "Gender is required"],
        },
    },
    {
        timestamps: true,
        versionKey:false
    },
);

module.exports = mongoose.model("Employee", employeeSchema);

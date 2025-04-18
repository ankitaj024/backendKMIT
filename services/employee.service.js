const employeeModel = require("../models/employee.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const sendMail = require("./mail.service");
const Stripe = require("stripe");
const createCalenderEvent = require("../utils /googleCalender");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const csv = require("csvtojson");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
// const { default: paymentLink } = require("razorpay/dist/types/paymentLink");
const getData = async (req, res) => {
  try {
    const emplyeeData = await employeeModel.find();
    const updatedData = emplyeeData.map((employee) => {
      return {
        ...employee.toObject(),
        img: `http://localhost:5000/users/${employee.img}`,
      };
    });
    res.send(updatedData);
  } catch (e) {
    res.status(400);
    res.send(e);
  }
};

const bulkCreateEmployeesFromCSV = async (req, res) => {
  try {
    const parentDir = path.resolve(__dirname, "..");
    const uploadPath = path.join(parentDir, "uploads", "csv");

    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadPath);
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });

    const upload = multer({
      storage,
      limits: { fileSize: 10 * 1024 * 1024 },
    }).single("file");

    
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ status: 400, message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ status: 400, message: "No file uploaded" });
      }

      const filePath = req.file.path;
      const jsonArray = await csv().fromFile(filePath);

      const createdEmployees = [];
      const failedEntries = [];

      for (const data of jsonArray) {
        try {
          if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
          }

          const customer = await stripe.customers.create({
            name: data.name,
            email: data.email,
          });

          data.customerId = customer.id;

          const createdEmployee = await employeeModel.create(data);
          createdEmployees.push(createdEmployee);
        } catch (err) {
          failedEntries.push({
            email: data.email,
            reason: err.message,
          });
        }
      }

      res.status(201).json({
        status: 201,
        message: `${createdEmployees.length} employees created successfully.`,
        created: createdEmployees,
        failed: failedEntries,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const postData = async (req, res) => {
  try {
    let data = req.body;
    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }
    const customer = await stripe.customers.create({
      name: data.name,
      email: data.email,
    });
    data.customerId = customer.id;
    let createdEmployee = await employeeModel.create(data);

    const mailData = {
      name: createdEmployee.name,
      to: createdEmployee.email,
      subject: "User Created",
    };
    sendMail(mailData);
    let eventDetails = {
      summary: "User Create",
      description: `Name : ${createdEmployee.name} and Email : ${createdEmployee.email}`,
      startDate: data.startDate,
      endDate: data.endDate,
    };
    await createCalenderEvent(eventDetails);

    res.status(201).send({
      status: 201,
      Employeedata: createdEmployee,
      message: "Employee Created Successfully",
    });
  } catch (error) {
    res.status(400).send({
      Status: 400,
      message: error.message,
    });
  }
};

const patchData = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updatedEmployee) {
      res
        .status(404)
        .send({ Status: 404, message: "Employee not found, please check id " });
    }
    res.send({
      status: 200,
      Employeedata: updatedEmployee,
      message: "Employee updated succesfuly",
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e.message,
    });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    await employeeModel.findByIdAndDelete(id);
    res.send({
      status: 200,
      message: "Employee Deleted succesfuly",
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e.message,
    });
  }
};

const searchMethod = async (req, res) => {
  try {
    const { search, page, limit } = req.query;
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 4;
    const skip = ((pageNumber || 1) - 1) * (limit || 4);
    let filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }
    const results = await employeeModel
      .find(filter)
      .skip(skip)
      .limit(limitNumber);
    const totalRecords = await employeeModel.countDocuments(filter);
    res.send({
      status: 200,
      message: "Search Successfully",
      data: {
        employee: results,
        totalFilteredData: totalRecords,
        currentpage: pageNumber,
        totalPages: Math.ceil(totalRecords / limitNumber),
      },
    });
  } catch (error) {
    res.status(500).send({ Status: 500, message: "Internal Error" });
  }
};

const loginMethod = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await employeeModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ Status: 404, message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ Status: 401, message: "Incorrect Password" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        customerId: user.customerId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );
    res.status(202).send({ Status: 202, message: "Login Successfully", token });
  } catch (e) {
    res.status(404).send({ Status: 404, message: e.message });
  }
};

const paymentCreateMethod = async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });
  try {
    const { amount, currency, orderId, email, contact } = req.body;
    const options = {
      amount: amount * 100,
      currency,
      receipt: orderId,
    };
    const createOrder = await razorpay.orders.create(options);
    const createPaymentLink = await razorpay.paymentLink.create({
      amount: amount * 100,
      currency: currency || "INR",
      customer: {
        email: email,
        contact: contact,
      },
      description: "Backend Payment",
      notify: { sms: true, email: true },
      callback_url: "http://localhost:5000/payment/verify",
      callback_method: "post",
    });

    res.status(200).send({
      status: 200,
      orderId: orderId.id,
      amount: orderId.amount,
      currency: orderId.currency,
    });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    const generateSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(razorpayOrderId + "|" + razorpayPaymentId)
      .digest("hex");
    if (generateSignature === razorpaySignature) {
      // Payment is verified
      res.status(200).send({ status: "success", message: "Payment verified" });
    } else {
      res.status(400).send({ status: "error", message: "Invalid signature" });
    }
  } catch (error) {}
};

module.exports = {
  getData,
  postData,
  patchData,
  deleteData,
  searchMethod,
  loginMethod,
  paymentCreateMethod,
  verifyPayment,
  bulkCreateEmployeesFromCSV,
};

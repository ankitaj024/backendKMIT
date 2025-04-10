const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASSWORD,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      partialsDir: path.resolve("./views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views/"),
  })
);

const orderMail = async ({ to, subject, name, orderId, totalPrice, items }) => {
  try {
    await transporter.sendMail({
      from: "noreply@gmail.com",
      to,
      subject,
      template: "order", 
      context: {
        name,
        orderId,
        totalPrice,
        items,
      },
      attachments: [
        {
          filename: "Hello.jpeg",
          path: "/home/keymouseit/Desktop/AssigmentBackend/uploads/users/1743077385247-download.jpeg",
          cid: "logo",
        },
      ],
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = orderMail;

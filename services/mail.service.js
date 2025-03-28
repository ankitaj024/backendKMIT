const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMail = async ({ to, subject, name }, otp = null) => {
  try {
    const parentDir = path.resolve(__dirname, "..");
    
    let templatePath;

    if (otp !== null) {
      templatePath = path.join(parentDir, "otpTemplate.html");
    } else {
      templatePath = path.join(parentDir, "emailTemplate.html");
    }

    if (!fs.existsSync(templatePath)) {
      throw new Error("Email template file not found");
    }

    let emailHtml = fs.readFileSync(templatePath, "utf-8");
    emailHtml = emailHtml.replace("{{name}}", name);

    if (otp !== null) {
      emailHtml = emailHtml.replace("{{otp}}", otp);
    }

    await transporter.sendMail({
      from: "noreply@gmail.com",
      to,
      subject,
      html: emailHtml,
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

module.exports = sendMail;

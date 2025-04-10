const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (to) => {
  try {
    await client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
      body:"Order Placed Successfully, please check your mail "
    });
    console.log("message send successfully");
  } catch (error) {
    console.log(error.message)
  }
};


module.exports = sendSMS
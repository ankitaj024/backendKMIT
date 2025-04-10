const messagebirdModule = require("messagebird");
const messageBirdClient = messagebirdModule.initClient(process.env.MESSAGEBIRD_API_KEY);

const sendSMSBird = async (req, res) => {
  try {
    const { to } = req.body;

    await messageBirdClient.messages.create(
      {
        originator: "YourBrand", // Must be registered in DLT if you're in India
        recipients: [to],
        body: "Hello from MessageBird & Node.js!",
      },
      (err, response) => {
        if (err) {
        //   console.error(" Error:", err.errors);
          return res.status(500).json({ error: err.errors });
        } else {
        //   console.log(" SMS sent:", response);
          return res.status(200).json({ message: "Message sent successfully", response });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = sendSMSBird;

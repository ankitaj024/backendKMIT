const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(path.join(__dirname, "..", " fcmServiceAccountKey.json"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const sendPushNotification = async (req, res) => {
  const { fcmToken } = req.body;

  const message = {
    token: fcmToken,
    notification: {
      title: "Hello",
      body: "This is a body content ",
      image:"https://placedog.net/600/400",
    },
    data: {
      my_key: 'my value',
      my_another_key: 'my another value',
    },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent with response:", response);
    res.status(200).json({ success: true, response });
  } catch (error) {
    console.error(" Error sending message:", error);
    res.status(500).json({ success: false, error });
  }
};

module.exports = sendPushNotification;

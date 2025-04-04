const Stripe = require("stripe");
const employeeModel = require("../models/employee.model");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const webHookSubscription = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      // console.log(subscription.customer)
      const customerId = subscription.customer;
      const user = await employeeModel.findOneAndUpdate(
        { customerId: customerId },
        {
          isSubscribe: false,
        }
      );
    }
    if (event.type === "customer.deleted") {
      const customerId = event.data.object.id;
      const user = await employeeModel.findOneAndUpdate(
        { customerId: customerId },
        {
          isSubscribe: false,
          customerId: null,
        }
      );
    }
    if (event.type === "refund.created") {
      const refund = event.data.object.status

    }

    res.status(200).send("Webhook received");
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send("Webhook Error");
  }
};

module.exports = webHookSubscription;

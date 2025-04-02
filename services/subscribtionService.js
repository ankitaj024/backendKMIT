const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const subscribtionService = async (req, res) => {
  try {
    const { customerId, priceId } = req.body;
    const subscribation = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
        },
      ],
    });
    res.status(201).send({ status: 201, subscriptions: subscribation });
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message });
  }
};

const getSubscription = async (req, res) => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      limit: 3,
    });

    res.status(200).send({ status: 200, data: subscriptions });
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const { subsId } = req.body;
    const subscriptionDelete = await stripe.subscriptions.cancel(subsId);
    res.status(200).send({ status: 200, message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message });
  }
};

module.exports = { subscribtionService, getSubscription , deleteSubscription};

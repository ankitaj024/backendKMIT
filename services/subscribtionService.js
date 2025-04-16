const Stripe = require("stripe");
const employeeModel = require("../models/employee.model");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const {CronJob} = require('cron')
const subscribtionService = async (req, res) => {
  try {
    const customerId = req.user.customerId
    const {priceId } = req.body;
    const subscribation = await stripe.subscriptions.create({
      customer: customerId,
      trial_period_days: 30, 
      items: [
        {
          price: priceId,
        },
      ],
    });
    if(subscribation.status=="active" || subscribation.status==="trialing"){
        const user = await employeeModel.findOneAndUpdate({customerId:customerId}, {isSubscribe:true});
    }
    res.status(201).send({ status: 201, subscriptions: subscribation.status });
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
    const customerId = req.user.customerId
    await stripe.subscriptions.cancel(subsId);
    await employeeModel.findOneAndUpdate({customerId:customerId}, {isSubscribe:false})
    res.status(200).send({ status: 200, message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message });
  }
};

const chronicJob = async () => {
  try {
    const customerId = "cus_S4GEKF8BVAuA7b";
    const subscriptions = await stripe.subscriptions.list({ limit: 100 });
    const customerSubscription = subscriptions.data.find(sub => sub.customer === customerId);
    if (!customerSubscription) {
     console.log("customer subscription not find ")
    }
    await stripe.subscriptions.cancel(customerSubscription.id);
    await employeeModel.findOneAndUpdate(
      { customerId: customerId },
      { isSubscribe: false }
    );
    console.log("subscription cancelled")
  } catch (error) {
    console.log(error.message)
  }
};

job = new CronJob("0 45 16 * * *", chronicJob)

job.start();



module.exports = { subscribtionService, getSubscription, deleteSubscription };

const Stripe = require("stripe");
const employeeModel = require("../models/employee.model");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentService = async (req, res) => {
  try {
    const customerId = req.user.customerId;
    // console.log(customerId)
    const { token, amount, currency, payment_method_types } =
      req.body;
    let chargeToken = token || null;

    // const customer = await stripe.customers.create({
    //   name: name,
    //   email: email,
    // });

    let paymentMethods = [];
    if (payment_method_types === "card") {
      paymentMethods = ["card"];
    } else if (payment_method_types === "upi") {
      paymentMethods = ["upi"];
    } else if (payment_method_types === "wallet") {
      paymentMethods = ["card", "upi", "link", "alipay", "wechat_pay"];
    } else {
      return res
        .status(400)
        .send({ status: 400, message: "Invalid payment method" });
    }

    if (chargeToken !== null) {
      const customerSource = await stripe.customers.paymentMethods(
        customerId,
        {
          source: token,
        }
      );

      const charge = await stripe.charges.create({
        amount: amount,
        currency: currency,
        source: token,
      });

      res.status(201).send({
        status: 201,
        message: "Customer Created",
        data: customer,
        source: customerSource,
        charge: charge,
      });
    } else {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: currency || "INR",
        payment_method_types: paymentMethods,
        customer: customerId,
      });
      const paymentMethod = await stripe.paymentMethods.create({
        type: "card",
        card: {
          token: "tok_visa",
        },
      });
      await stripe.paymentMethods.attach(paymentMethod.id, {
        customer: customerId,
      });
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethod.id,
        },
      });
      const paymentIntentConfirm = await stripe.paymentIntents.confirm(
        paymentIntent.id,
        {
          payment_method: paymentMethod.id,
        }
      );
      //   res.status(201).send({
      //     status: 201,
      //     clientSecret: paymentIntent.client_secret,
      //   });
      if (paymentIntentConfirm.status === "succeeded") {
        res.status(200).send({
          status: 200,
          message: "Payment successful",
          paymentIntent: paymentIntentConfirm,
        });
      } else {
        res.status(400).send({
          status: 400,
          message: "Payment failed",
          paymentIntent: paymentIntentConfirm,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ status: 500, message: error.message });
  }
};

const paymentDelete = async (req, res) => {
  const { id } = req.params;
  await stripe.customers.del(id);
};

module.exports = { paymentService, paymentDelete };

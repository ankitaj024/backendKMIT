const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const orderPayment = async (amount, payment_method_types, customerId) => {
  try {
    let paymentMethods = [];

    if (payment_method_types === "card") {
      paymentMethods = ["card"];
    } else if (payment_method_types === "upi") {
      paymentMethods = ["upi"];
    } else if (payment_method_types === "wallet") {
      paymentMethods = ["card", "upi", "link", "alipay", "wechat_pay"];
    } else {
      return "Invalid payment method type";
    }

    const savedMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });

    let paymentMethodId;

    if (savedMethods.data.length > 0) {
      paymentMethodId = savedMethods.data[0].id;
    } else {
      const newPaymentMethod = await stripe.paymentMethods.create({
        type: "card",
        card: {
          token: "tok_visa", 
        },
      });

      
      await stripe.paymentMethods.attach(newPaymentMethod.id, {
        customer: customerId,
      });

     
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: newPaymentMethod.id,
        },
      });

      paymentMethodId = newPaymentMethod.id;
    }

    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "INR",
      customer: customerId,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
    });

    if (paymentIntent.status === "succeeded") {
      return paymentIntent.latest_charge;
    } else {
      return null;
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = {orderPayment}
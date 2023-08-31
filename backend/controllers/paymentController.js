import { config } from "../config/config.js";
import { paymentModel } from "../models/paymentModel.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";

//check if user is paid or not
export const isPaid = async (req, res) => {
  try {
    //check if user id exist in payment model
    const userExist = await paymentModel.findOne({ user_id: req.user.id });

    res.json({ isPaid: userExist ? true : false });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong in Razorpay!" });
  }
};

// razorpay create order
export const createOrder = (razorpay) => async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100, // Amount in paise
      currency,
      receipt: "order_receipt", //optional
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong in Razorpay!" });
  }
};

// verify payment of razorpay and save payment details in db
export const verifyPayment = (razorpay) => async (req, res) => {
  try {
    const userId = req.user.id;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    //verification function
    const isSuccess = validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      razorpay_signature,
      config.RAZORPAY_KEY_SECRET
    );

    //get payment info from razorpay
    const paymentInfo = await razorpay.payments.fetch(razorpay_payment_id);

    //if verified true, save payment info
    if (isSuccess && paymentInfo) {
      if (razorpay_order_id && userId) {
        await paymentModel.create({
          user_id: userId,
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
          signature: razorpay_signature,
          payment_date: new Date(),
          amount: paymentInfo.amount,
          payment_method: paymentInfo.method,
        });
      }
    }
    res.json({ signatureIsValid: isSuccess });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "Something went wrong in Razorpay!",
      error: error.message,
    });
  }
};

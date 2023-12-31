import Razorpay from "razorpay";
import { config } from "./config.js";

//razorpay payment integration
export const connectRazorpay = () => {
  const razorpay = new Razorpay({
    key_id: config.RAZORPAY_KEY_ID,
    key_secret: config.RAZORPAY_KEY_SECRET,
  });
  return razorpay;
};

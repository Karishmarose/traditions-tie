import { Router } from "express";
import {
  createOrder,
  isPaid,
  verifyPayment,
} from "../controllers/paymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

export const paymentRoute = (razorpay) => {
  router.get("/", authMiddleware, isPaid); //to know if user is paid or not
  router.post("/create/orderId", createOrder(razorpay)); // create an order using razorpay
  router.post("/verify", authMiddleware, verifyPayment(razorpay)); //verify the payment

  return router;
};

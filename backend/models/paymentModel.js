import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: [true, "Please add payment amount"],
  },
  payment_method: {
    type: String,
    required: [true, "Please add payment method"],
  },
  payment_date: {
    type: Date,
    required: [true, "Please add payment date"],
  },
  order_id: {
    type: String,
    required: [true, "Please add payement transaction id"],
  },
  payment_id: {
    type: String,
    required: [true, "Please add payement transaction id"],
  },
  signature: {
    type: String,
    required: [true, "Please add payement transaction id"],
  },
});

export const paymentModel = mongoose.model("Payment", paymentSchema);

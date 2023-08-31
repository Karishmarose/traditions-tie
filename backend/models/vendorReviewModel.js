import mongoose from "mongoose";

const vendorReviewSchema = mongoose.Schema({
  vendor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  review: {
    type: String,
    required: [true, "Please add review"],
  },
});

export const vendorReviewModel = mongoose.model(
  "VendorReview",
  vendorReviewSchema
);

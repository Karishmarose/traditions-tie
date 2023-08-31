import mongoose from "mongoose";

const vendorSchema = mongoose.Schema({
  vendor_name: {
    type: String,
    required: [true, "Please add vendor name"],
  },
  vendor_type: {
    type: String,
    required: [true, "Please add vendor type"],
  },
  website: {
    type: String,
    required: [true, "Please add vendor website"],
  },
  mobile: {
    type: String,
    required: [true, "Please add vendor mobile"],
  },
  email: {
    type: String,
    required: [true, "Please add vendor email"],
  },
  reviews: [
    {
      type: String,
    },
  ],
});

export const vendorModel = mongoose.model("Vendor", vendorSchema);

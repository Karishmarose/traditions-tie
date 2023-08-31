import mongoose from "mongoose";

const coordinatorSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please add coordinator first name"],
  },
  last_name: {
    type: String,
    required: [true, "Please add  coordinator last name"],
  },
  email: {
    type: String,
    required: [true, "Please add  coordinator email"],
  },
  mobile: {
    type: String,
    required: [true, "Please add coordinator mobile"],
  },
  department: {
    type: String,
    required: [true, "Please add coordinator department"],
  },
});

export const coordinatorModel = mongoose.model(
  "Coordinator",
  coordinatorSchema
);

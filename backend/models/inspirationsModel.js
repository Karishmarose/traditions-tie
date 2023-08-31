import mongoose from "mongoose";

const inspirationSchema = mongoose.Schema({
  inspiration_type: {
    type: String,
    required: [true, "Please add inspiration type"],
  },
  title: {
    type: String,
    required: [true, "Please add inspiration title"],
  },
  description: {
    type: String,
    required: [true, "Please add tradition description"],
  },
});

export const inspirationModel = mongoose.model(
  "Inspiration",
  inspirationSchema
);

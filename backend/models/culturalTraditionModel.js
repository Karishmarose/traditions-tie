import mongoose from "mongoose";

const culturalTraditionSchema = mongoose.Schema({
  tradition_name: {
    type: String,
    required: [true, "Please add tradition name"],
  },
  description: {
    type: String,
    required: [true, "Please add tradition description"],
  },
  cultural_origin: {
    type: String,
    required: [true, "Please add cultural origin"],
  },
  religion: {
    type: String,
    required: [true, "Please add religion"],
  },
});

export const culturalTraditionModel = mongoose.model(
  "CulturalTradition",
  culturalTraditionSchema
);

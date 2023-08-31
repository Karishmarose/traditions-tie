import mongoose from "mongoose";

const foodRecommendationSchema = mongoose.Schema({
  cuisine_type: {
    type: String,
    required: [true, "Please add cuisine type"],
  },
  food_name: {
    type: String,
    required: [true, "Please add food name"],
  },
  description: {
    type: String,
    required: [true, "Please add description"],
  },
  cultural_origin: {
    type: String,
    required: [true, "Please add cultural origin"],
  },
});

export const foodRecommendationModel = mongoose.model(
  "FoodRecommendation",
  foodRecommendationSchema
);

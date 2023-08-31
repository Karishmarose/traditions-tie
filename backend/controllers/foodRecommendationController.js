import { foodRecommendationModel } from "../models/foodRecommendationModel.js";

export const getAllFoodRecommendation = async (req, res) => {
  try {
    const foodRecommendationList = await foodRecommendationModel.find({});
    res.json(foodRecommendationList);
  } catch (error) {
    res.status(400).json({ message: "foodRecommendation not found !" });
  }
};

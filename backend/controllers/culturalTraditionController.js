import { culturalTraditionModel } from "../models/culturalTraditionModel.js";

export const getAllCulturalTradition = async (req, res) => {
  try {
    const culturalTraditionList = await culturalTraditionModel.find({});
    res.json(culturalTraditionList);
  } catch (error) {
    res.status(400).json({ message: "culturalTraditions not found !" });
  }
};

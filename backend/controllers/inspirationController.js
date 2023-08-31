import { inspirationModel } from "../models/inspirationsModel.js";

export const getAllInspiration = async (req, res) => {
  try {
    const inspirationList = await inspirationModel.find({});
    res.json(inspirationList);
  } catch (error) {
    res.status(400).json({ message: "inspiration not found !" });
  }
};

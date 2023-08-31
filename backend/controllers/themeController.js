import { themeModel } from "../models/themeModel.js";

export const getAllTheme = async (req, res) => {
  try {
    const themeList = await themeModel.find({});
    res.json(themeList);
  } catch (error) {
    res.status(400).json({ message: "theme not found !" });
  }
};

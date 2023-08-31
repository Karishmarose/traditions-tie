import { coordinatorModel } from "../models/coordinatorModel.js";

export const getAllCoordinators = async (req, res) => {
  try {
    const coordinatorList = await coordinatorModel.find({});
    res.json(coordinatorList);
  } catch (error) {
    res.status(400).json({ message: "coordinators not found !" });
  }
};

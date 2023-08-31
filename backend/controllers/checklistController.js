import mongoose from "mongoose";
import { eventChecklistModel } from "../models/eventChecklistModel.js";

export const createChecklist = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { event_id, task_description, task_status, task_deadline } = req.body;

    if (!event_id || !task_description || !task_status || !task_deadline) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    await eventChecklistModel.create({
      user_id,
      event_id,
      task_description,
      task_status,
      task_deadline,
    });

    res
      .status(201)
      .json({ message: "Checklist created for the event successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const checklist_id = req.params.checklist_id;
    const { task_status } = req.body;

    if (!checklist_id || !task_status) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // Check if checklist_id is a valid ObjectId
    if (!mongoose.isValidObjectId(checklist_id)) {
      res.status(400);
      throw new Error("Invalid checklist ID");
    }

    const updatedChecklist = await eventChecklistModel.findByIdAndUpdate(
      checklist_id,
      { task_status },
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validation on update
      }
    );

    res.status(200).json(updatedChecklist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getChecklistByEvent = async (req, res) => {
  try {
    const event_id = req.params.event_id;

    // Check if event_id is a valid ObjectId
    if (!mongoose.isValidObjectId(event_id)) {
      res.status(400);
      throw new Error("Invalid event ID");
    }

    // Fetch checklist by event_id
    const checklist = await eventChecklistModel.find({ event_id });

    res.status(200).json(checklist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

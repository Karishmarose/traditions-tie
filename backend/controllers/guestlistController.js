import mongoose from "mongoose";
import { guestListModel } from "../models/guestListModel.js";

export const createGuest = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { event_id, guest_name, email, mobile, rsvp_status } = req.body;

    if (!event_id || !guest_name || !email || !mobile || !rsvp_status) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    await guestListModel.create({
      user_id,
      event_id,
      guest_name,
      email,
      mobile,
      rsvp_status,
    });

    res.status(201).json({ message: "Guest added for the event successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const guest_id = req.params.guest_id;
    const { rsvp_status } = req.body;

    if (!guest_id || !rsvp_status) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    //find and update guest rsvp status using guest id
    const updatedGuestlist = await guestListModel.findByIdAndUpdate(
      guest_id,
      { rsvp_status },
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validation on update
      }
    );

    res.status(200).json(updatedGuestlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getGuestlistByEvent = async (req, res) => {
  try {
    const event_id = req.params.event_id;

    // Check if event_id is a valid ObjectId
    if (!mongoose.isValidObjectId(event_id)) {
      res.status(400);
      throw new Error("Invalid event ID");
    }

    // Fetch guestlist by event_id
    const guestlist = await guestListModel.find({ event_id });

    res.status(200).json(guestlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

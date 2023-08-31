import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coordinator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coordinator",
    required: true,
  },
  wedding_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserWedding",
  },
  theme_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theme",
    required: false,
  },
  location: {
    type: String,
    required: [true, "Please add event location"],
  },
  event_date: {
    type: Date,
    required: [true, "Please add event date"],
  },
  event_type: {
    type: String,
    enum: ["Birthday", "Wedding", "Farewell", "Graduation"],
    required: [true, "Please add event type"],
  },
  guest_count: {
    type: Number,
    required: [true, "Please add guest count"],
  },
  vendors: [
    {
      vendor_type: String,
      vendor_id: mongoose.Schema.Types.ObjectId,
    },
  ],
});

export const eventModel = mongoose.model("Event", eventSchema);

import mongoose from "mongoose";

const eventChecklistSchema = mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  task_description: {
    type: String,
    required: [true, "Please add task description"],
  },
  task_status: {
    type: String,
    enum: ["todo", "completed"],
    required: [true, "Please add task status"],
  },
  task_deadline: {
    type: Date,
    required: [true, "Please add task deadline"],
  },
});

export const eventChecklistModel = mongoose.model(
  "EventChecklist",
  eventChecklistSchema
);

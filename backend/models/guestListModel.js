import mongoose from "mongoose";

const guestListSchema = mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  guest_name: {
    type: String,
    required: [true, "Please add guest name"],
  },
  email: {
    type: String,
    required: [true, "Please add guest email"],
  },
  mobile: {
    type: String,
    required: [true, "Please add guest mobile number"],
  },
  rsvp_status: {
    type: String,
    enum: ["Pending", "Accepted", "Declined"],
    required: [true, "Please add rsvp status"],
  },
});

export const guestListModel = mongoose.model("GuestList", guestListSchema);

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  user_name: {
    type: String,
    required: [true, "Please add a username"],
  },
  email_id: {
    type: String,
    required: [true, "Please add your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  first_name: {
    type: String,
    // required: [true, "Please add your first name"],
  },
  last_name: {
    type: String,
    // required: [true, "Please add your last name"],
  },
  mobile_number: {
    type: String,
    // required: [true, "Please add your mobile number"],
  },
  address_line1: {
    type: String,
    // required: [true, "Please add your address line 1"],
  },
  street: {
    type: String,
    // required: [true, "Please add your street"],
  },
  city: {
    type: String,
    // required: [true, "Please add your city"],
  },
  zipcode: {
    type: String,
    // required: [true, "Please add your zipcode"],
  },
});

export const userModel = mongoose.model("User", userSchema);

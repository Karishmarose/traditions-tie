import mongoose from "mongoose";

const userWeddingSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bride_first_name: {
    type: String,
    required: [true, "Please add bride first name"],
  },
  bride_last_name: {
    type: String,
    required: [true, "Please add bride last name"],
  },
  bride_email: {
    type: String,
    required: [true, "Please add bride email"],
  },
  bride_mobile: {
    type: String,
    required: [true, "Please add bride mobile number"],
  },
  bride_nationality: {
    type: String,
    required: [true, "Please add bride nationality"],
  },
  bride_cultural_origin: {
    type: String,
    required: [true, "Please add bride cultural origin"],
  },
  bride_religion: {
    type: String,
    required: [true, "Please add bride religion"],
  },
  bride_preferred_language: {
    type: String,
    required: [true, "Please add bride preferred language"],
  },
  groom_first_name: {
    type: String,
    required: [true, "Please add groom first name"],
  },
  groom_last_name: {
    type: String,
    required: [true, "Please add groom last name"],
  },
  groom_email: {
    type: String,
    required: [true, "Please add groom email"],
  },
  groom_mobile: {
    type: String,
    required: [true, "Please add groom mobile number"],
  },
  groom_nationality: {
    type: String,
    required: [true, "Please add groom nationality"],
  },
  groom_cultural_origin: {
    type: String,
    required: [true, "Please add groom cultural origin"],
  },
  groom_religion: {
    type: String,
    required: [true, "Please add groom religion"],
  },
  groom_preferred_language: {
    type: String,
    required: [true, "Please add groom preferred language"],
  },
});

export const userWeddingModel = mongoose.model(
  "UserWedding",
  userWeddingSchema
);

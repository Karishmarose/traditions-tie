import mongoose from "mongoose";

const themeSchema = mongoose.Schema({
  theme_name: {
    type: String,
    required: [true, "Please add theme name"],
  },
  description: {
    type: String,
    required: [true, "Please add theme description"],
  },
});

export const themeModel = mongoose.model("Theme", themeSchema);

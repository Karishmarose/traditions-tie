import mongoose from "mongoose";

export const disconnectDb = () => {
  mongoose.disconnect();
};

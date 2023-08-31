import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = () => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(config.MONGODB_URL)
    .then((conn) => {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    })
    .catch((error) => {
      console.error(`MongoDB Error: ${error.message}`);
      process.exit(1);
    });
};

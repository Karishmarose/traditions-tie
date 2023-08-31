//This file is used to add hard coded data to your mongo DB all at once
import { connectDB } from "./config/connectDb.js";
import { disconnectDb } from "./config/disconnectDb.js";
import { coordinatorData } from "./data/coordinatorData.js";
import { culturalTraditionsData } from "./data/culturalTraditionsData.js";
import { foodRecommendationData } from "./data/foodRecommendationData.js";
import { inspirationData } from "./data/inspirationData.js";
import { themeData } from "./data/themeData.js";
import { vendorData } from "./data/vendorData.js";
import { coordinatorModel } from "./models/coordinatorModel.js";
import { culturalTraditionModel } from "./models/culturalTraditionModel.js";
import { foodRecommendationModel } from "./models/foodRecommendationModel.js";
import { inspirationModel } from "./models/inspirationsModel.js";
import { themeModel } from "./models/themeModel.js";
import { vendorModel } from "./models/vendorModel.js";

// Connect to MongoDB
connectDB();
console.log("---DB connected---");

try {
  await coordinatorModel.insertMany(coordinatorData);
  console.log("coordinator added");

  await themeModel.insertMany(themeData);
  console.log("theme added");

  await inspirationModel.insertMany(inspirationData);
  console.log("inspiration added");

  await culturalTraditionModel.insertMany(culturalTraditionsData);
  console.log("culturalTraditions added");

  await vendorModel.insertMany(vendorData);
  console.log("vendor added");

  await foodRecommendationModel.insertMany(foodRecommendationData);
  console.log("foodRecommendation added");

  console.log("All data added successfully!");
} catch (err) {
  console.error("Something went wrong: ", err);
}
// Close the connection when done
disconnectDb();
console.log("---DB disconnected---");

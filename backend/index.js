import express from "express";
import cors from "cors";
import { config } from "./config/config.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import { connectDB } from "./config/connectDb.js";
import { userRoute } from "./routes/userRoute.js";
import { connectRazorpay } from "./config/connectRazorpay.js";
import { paymentRoute } from "./routes/paymentRoute.js";
import { coordinatorRoute } from "./routes/coordinatorRoute.js";
import { culturalTraditionRoute } from "./routes/culturalTraditionRoute.js";
import { foodRecommendationRoute } from "./routes/foodRecommendationRoute.js";
import { inspirationRoute } from "./routes/inspirationRoute.js";
import { themeRoute } from "./routes/themeRoute.js";
import { vendorRoute } from "./routes/vendorRoute.js";
import { eventRoute } from "./routes/eventRoute.js";
import { checklistRoute } from "./routes/checklistRoute.js";
import { guestlistRoute } from "./routes/guestlistRoute.js";

const app = express();
//connect to db
connectDB();
//connect razorpay payment gateway
const razorpay = connectRazorpay();
//enable cors
app.use(cors());
//enable json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the traditions tie backend!");
});

//users
app.use("/api/user", userRoute);
//payment
app.use("/api/payment", paymentRoute(razorpay));
//coordinator
app.use("/api/coordinator", coordinatorRoute);
//culturalTradition
app.use("/api/culturalTradition", culturalTraditionRoute);
//foodRecommendation
app.use("/api/foodRecommendation", foodRecommendationRoute);
//inspiration
app.use("/api/inspiration", inspirationRoute);
//theme
app.use("/api/theme", themeRoute);
//vendor
app.use("/api/vendor", vendorRoute);
//event
app.use("/api/event", eventRoute);
//event checklist
app.use("/api/checklist", checklistRoute);
//event guestlist
app.use("/api/guestlist", guestlistRoute);

//error handling
app.use(notFound);
app.use(errorHandler);

//start server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});

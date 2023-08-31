import { Router } from "express";
import { getAllFoodRecommendation } from "../controllers/foodRecommendationController.js";

const router = Router();

router.get("/", getAllFoodRecommendation);

export { router as foodRecommendationRoute };

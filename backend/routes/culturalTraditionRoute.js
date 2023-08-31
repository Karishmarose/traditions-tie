import { Router } from "express";
import { getAllCulturalTradition } from "../controllers/culturalTraditionController.js";

const router = Router();

router.get("/", getAllCulturalTradition);

export { router as culturalTraditionRoute };

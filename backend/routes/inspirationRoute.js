import { Router } from "express";
import { getAllInspiration } from "../controllers/inspirationController.js";

const router = Router();

router.get("/", getAllInspiration);

export { router as inspirationRoute };

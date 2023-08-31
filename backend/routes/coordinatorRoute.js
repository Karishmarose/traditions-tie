import { Router } from "express";
import { getAllCoordinators } from "../controllers/coordinatorController.js";

const router = Router();

router.get("/", getAllCoordinators);

export { router as coordinatorRoute };

import { Router } from "express";
import { createEvent, getAllEvent } from "../controllers/eventController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getAllEvent);
router.post("/", authMiddleware, createEvent);

export { router as eventRoute };

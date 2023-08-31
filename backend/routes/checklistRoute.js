import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createChecklist,
  getChecklistByEvent,
  updateStatus,
} from "../controllers/checklistController.js";

const router = Router();

router.post("/", authMiddleware, createChecklist); //create checklist in an event
router.put("/status/:checklist_id", updateStatus); //update status of checklist
router.get("/:event_id", getChecklistByEvent); //get all checklist of an event

export { router as checklistRoute };

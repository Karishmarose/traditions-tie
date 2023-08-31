import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createGuest,
  getGuestlistByEvent,
  updateStatus,
} from "../controllers/guestlistController.js";

const router = Router();

router.post("/", authMiddleware, createGuest); //create a guest in an event
router.put("/status/:guest_id", updateStatus); //update rsvp status of a guest in an event
router.get("/:event_id", getGuestlistByEvent); //get all guest in an event

export { router as guestlistRoute };

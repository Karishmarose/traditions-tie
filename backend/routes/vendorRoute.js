import { Router } from "express";
import { getAllVendor } from "../controllers/vendorController.js";

const router = Router();

router.get("/", getAllVendor);

export { router as vendorRoute };

import { Router } from "express";
import { getAllTheme } from "../controllers/themeController.js";

const router = Router();

router.get("/", getAllTheme);

export { router as themeRoute };

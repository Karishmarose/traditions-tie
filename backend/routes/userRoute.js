import { Router } from "express";
import {
  userLogin,
  userRegister,
  updateUserProfile,
  getUserProfile,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", userRegister); //user register
router.post("/login", userLogin); //user login
router.get("/profile", authMiddleware, getUserProfile); //get profile details of user
router.put("/profile", authMiddleware, updateUserProfile); //update  profile details of user

export { router as userRoute };

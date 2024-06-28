import express from "express";
import {
  getCurrentUser,
  updateCurrentUser,
  changePasswordCurrentUser,
  getUser,
} from "../controllers/user.controller.js";
import { userAuth, userAuthWithPassword } from "../middlewares/auth.middleware.js";

const router = express.Router();

// get current user profile
router.get("/profile", userAuth, getCurrentUser);

// update current user profile
router.put("/profile", userAuth, updateCurrentUser);

// change password for current user
router.put("/change-password", userAuthWithPassword, changePasswordCurrentUser)

// get other user profile by slug
router.get("/profile/:slug", getUser)

export default router;

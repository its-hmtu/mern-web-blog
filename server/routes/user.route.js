import express from "express";
import {
  getCurrentUser,
  updateCurrentUser,
  changePasswordCurrentUser,
  getUser,
  refreshToken,
  deleteUser,
  changeAvatar,
  followUser,
} from "../controllers/user.controller.js";
import { userAuth, userAuthWithPassword } from "../middlewares/auth.middleware.js";
import { upload } from "../config/google_drive.js";

const router = express.Router();

// get current user profile
router.get("/profile", userAuth, getCurrentUser);

// update current user profile
router.put("/profile/update", userAuth, updateCurrentUser);

// change password for current user
router.put("/change-password", userAuthWithPassword, changePasswordCurrentUser)

// get a single user profile by id
router.get("/profile/:id", getUser)

// refresh token
router.post("/refresh-token", refreshToken)

// change current user avatar
router.put("/change-avatar", userAuth, upload.single("avatar"),  changeAvatar)

// follow a user
router.put("/follow/:id", userAuth, followUser)

// delete current user account
router.delete("/:id", userAuth, deleteUser)

export default router;

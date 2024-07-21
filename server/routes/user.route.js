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
  blockUser,
  reportUser
} from "../controllers/user.controller.js";
import { verifyToken, verifyRole } from "../middlewares/auth.middleware.js";
import { upload } from "../config/firebase.js";

const router = express.Router();

// get current user profile
router.get("/me", verifyToken, getCurrentUser);

// update current user profile
router.put("/me/update", verifyToken, updateCurrentUser);

// change password for current user
router.put("/change-password", verifyToken, changePasswordCurrentUser)

// get a single user profile by id
router.get("/profile/:id", getUser)

// refresh token
router.get("/refresh-token", refreshToken)

// change current user avatar
router.put("/me/change-avatar", verifyToken, upload.single("avatar"),  changeAvatar)

// follow a user
router.put("/follow/:id", verifyToken, followUser)

// delete current user account
router.delete("/:id", verifyToken, deleteUser)

// block a user 
router.put("/block/:id", verifyToken, blockUser)

router.post("/report/:id", verifyToken, reportUser)

export default router;

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
  blockUser
} from "../controllers/user.controller.js";
import { userAuth, userAuthWithPassword } from "../middlewares/auth.middleware.js";
import { upload } from "../config/firebase.js";

const router = express.Router();

// get current user profile
router.get("/me", userAuth, getCurrentUser);

// update current user profile
router.put("/me/update", userAuth, updateCurrentUser);

// change password for current user
router.put("/change-password", userAuthWithPassword, changePasswordCurrentUser)

// get a single user profile by id
router.get("/profile/:id", getUser)

// refresh token
router.get("/refresh-token", refreshToken)

// change current user avatar
router.put("/me/change-avatar", userAuth, upload.single("avatar"),  changeAvatar)

// follow a user
router.put("/follow/:id", userAuth, followUser)

// delete current user account
router.delete("/:id", userAuth, deleteUser)

// block a user 
router.put("/block/:id", userAuth, blockUser)

export default router;

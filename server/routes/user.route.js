import express from "express";
import {
  getCurrentUser,
  updateCurrentUser,
  changePasswordCurrentUser,
  getUser,
  refreshToken,
  deleteUser,
} from "../controllers/user.controller.js";
import { userAuth, userAuthWithPassword } from "../middlewares/auth.middleware.js";

const router = express.Router();

// get current user profile
router.get("/profile", userAuth, getCurrentUser);

// update current user profile
router.put("/profile/update", userAuth, updateCurrentUser);

// change password for current user
router.put("/change-password", userAuthWithPassword, changePasswordCurrentUser)

// get a single user profile by id
router.get("/profile/:id", getUser)

router.post("/refresh-token", refreshToken)

router.delete("/:id", userAuth, )

export default router;

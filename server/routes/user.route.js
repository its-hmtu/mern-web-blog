import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/auth", authUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);

// protect middleware will check for the token in the header, verify it, and attach the user object to the request object
// only authenticated users can access the /profile route
router.route("/profile")
  .get(protect, getUser)
  .put(protect, updateUser);

export default router;

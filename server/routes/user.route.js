import express from "express";
import {
  getUser,
  updateUser,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// protect middleware will check for the token in the header, verify it, and attach the user object to the request object
// only authenticated users can access the /profile route
// router.get("/profile", protect, getCurrentUser);

export default router;

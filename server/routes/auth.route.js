import express from "express";
import {
  emailConfirmation,
  resendConfirmationEmail,
  login,
  register,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/confirmation/:token", emailConfirmation);

// resend email confirmation route
router.post("/resend", resendConfirmationEmail);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

export default router;

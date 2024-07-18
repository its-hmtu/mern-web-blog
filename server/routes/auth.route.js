import express from "express";
import {
  emailConfirmation,
  resendConfirmationEmail,
  login,
  loginWithGoogle,
  registerWithGoogle,
  register,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { userAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/login-google", loginWithGoogle);

router.post("/register-google", registerWithGoogle);

router.get("/logout",  userAuth, logout);

router.get("/confirmation/:token", emailConfirmation);

// resend email confirmation route
router.post("/resend", resendConfirmationEmail);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

export default router;

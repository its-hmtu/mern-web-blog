import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/genToken.js";
import { sendConfirmationEmail } from "../utils/mailer.js";

export const resendConfirmationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  } else {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }
      if (user.is_email_verified) {
        res.status(400).json({
          success: false,
          message: "Email already verified",
        });
        return;
      }

      try {
        await sendConfirmationEmail({
          userId: user._id,
          fullName: user.full_name,
          userEmail: user.email,
          subject: "Verify your email address",
          text: "Verify your email address",
        });

        res.status(200).json({
          success: true,
          message: "Email sent successfully",
        });
      } catch (e) {
        res.status(500);
        throw new Error(`Server error: ${e.message}`);
      }
    }
});

export const emailConfirmation = asyncHandler(async (req, res) => {
  const { token } = req.params;
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.EMAIL_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      if (user.email === decoded.userEmail) {
        user.is_email_verified = true;
        await user.save();
        res.redirect("http://127.0.0.1:5173/signin");
      }
    } catch (e) {
      if (e.name === "TokenExpiredError") {
        res.redirect("http://127.0.0.1:5173/register");
      } else {
        res.status(400);
        throw new Error("Invalid token");
      }
    }

  }
});

export const register = asyncHandler(async (req, res) => {
  const { full_name, user_name, email, password } = req.body;

  const isEmailUsed = await User.findOne({ email });
  const isUserNameUsed = await User.findOne({ user_name });

  if (isEmailUsed) {
    res.status(400);
    throw new Error("Email already in use");
  }

  if (isUserNameUsed) {
    res.status(400);
    throw new Error("Username already in use");
  }

  try {
    const user = await User.create({
      full_name,
      user_name,
      email,
      password,
    });
  
    const accessToken = generateAccessToken(user._id);
    generateRefreshToken(res, user._id);
  
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      access_token: accessToken,
    });
  
    await sendConfirmationEmail({
      userId: user._id,
      fullName: user.full_name,
      userEmail: user.email,
      subject: "Welcome to our community",
      text: "Welcome to our community",
    });
  } catch (e) {
    res.status(500);
    throw new Error(`Server error: ${e.message}`);
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (user.is_email_verified === false) {
      await sendConfirmationEmail({
        userId: user._id,
        fullName: user.full_name,
        userEmail: user.email,
        subject: "Verify your email address",
        text: "Verify your email address",
      });

      res.status(403).json({
        success: false,
        message: "Email not verified.",
      });

      return;
    }

    try {
      const accessToken = generateAccessToken(user._id);
      generateRefreshToken(res, user._id);
  
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        access_token: accessToken,
      });
    } catch (e) {
      res.status(500);
      throw new Error(`Server error: ${e.message}`);
    }
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const logout = asyncHandler(async (req, res) => {
  try {
    res.cookie("refesh_token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (e) {
    res.status(500);
    throw new Error(`Server error: ${e.message}`);
  }
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  try {
    await sendPasswordResetEmail({
      userId: user._id,
      fullName: user.full_name,
      userEmail: user.email,
      subject: "Reset your password",
      text: "Reset your password",
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (e) {
    res.status(500);
    throw new Error(`Server error: ${e.message}`);
  }
})

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.FORGOT_PASSWORD_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) {
        res.status(404).send("User not found");
        return;
      }
      
      user.password = newPassword;
      await user.save();
      
      res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });

    } catch (e) {
      if (e.name === "TokenExpiredError") {
        res.redirect("http://127.0.0.1:5173/register");
      }
      else {
        res.status(400);
        throw new Error("Invalid token");
      }
    }
  }
})

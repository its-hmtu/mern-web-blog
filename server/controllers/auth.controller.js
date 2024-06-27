import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/genToken.js";
import { sendConfirmationEmail } from "../utils/mailer.js";

const resendConfirmationEmail = asyncHandler(async (req, res) => {

})

const emailConfirmation = asyncHandler(async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.EMAIL_SECRET);

    // check if decoded token is expired
    console.log(decoded);

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    // if user with user id include email in user model
    // then set is_email_verified to true
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
});

const register = asyncHandler(async (req, res) => {
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
  const user = await User.create({
    full_name,
    user_name,
    email,
    password,
  });

  const accessToken = generateAccessToken(user._id);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    access_token: accessToken,
  });

  const mail = await sendConfirmationEmail({
    userId: user._id,
    fullName: user.full_name,
    userEmail: user.email,
    subject: "Welcome to our community",
    text: "Welcome to our community",
  });
});

const login = asyncHandler(async (req, res) => {
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
        message: "Email not verified, confirmation email sent."
      })
    }

    const accessToken = generateAccessToken(user._id);
    generateRefreshToken(res, user._id);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      access_token: accessToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie('refesh_token', "", {
    httpOnly: true,
    expires: new Date(0),
  });
})

export { register, login, logout, emailConfirmation };

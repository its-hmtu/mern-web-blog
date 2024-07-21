import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/genToken.js";
import { sendConfirmationEmail, sendPasswordResetEmail } from "../utils/mailer.js";
import {
  NotFound,
  BadRequest,
  Unauthorized,
  Forbidden,
  InternalServerError,
} from "../errors/index.js";
import { OAuth2Client } from "google-auth-library";
import crypto from 'crypto'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const resendConfirmationEmail = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      next(new BadRequest("Email is required"));
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        next(new NotFound("User not found"));
      }
      if (user.is_email_verified) {
        res.status(400).json({
          success: false,
          message: "Email already verified",
        });
        return;
      }
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
    }
  } catch (e) {
    next(new InternalServerError("Server error"));
  }
});

export const emailConfirmation = asyncHandler(async (req, res, next) => {
  try {
    const { token } = req.params;

    if (token) {
      const decoded = jwt.verify(token, process.env.EMAIL_SECRET);

      const user = await User.findById(decoded.userId);
      if (!user) {
        next(new NotFound("User not found"));
      }

      if (user.email === decoded.userEmail) {
        user.is_email_verified = true;
        await user.save();

        res.redirect("http://localhost:5173/email-verified");
      } else {
        res.redirect("http://localhost:5173/register");
      }
    } else {
      next(new BadRequest("Invalid token"));
    }
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      res.redirect("http://127.0.0.1:5173/signin");
      next(new Unauthorized("Token expired"));
    }

    next(new InternalServerError("Server error"));
  }
});

export const register = asyncHandler(async (req, res, next) => {
  try {
    const { full_name, user_name, email, password } = req.body;

    const isEmailUsed = await User.findOne({ email });
    const isUserNameUsed = await User.findOne({ user_name });

    if (isEmailUsed) {
      next(new BadRequest("Email already in use"));
      return;
    }

    if (isUserNameUsed) {
      next(new BadRequest("Username already in use"));
      return;
    }
    const user = await User.create({
      full_name,
      user_name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

    await sendConfirmationEmail({
      userId: user._id,
      fullName: user.full_name,
      userEmail: user.email,
      subject: "Welcome to our community",
      text: "Welcome to our community",
    });
  } catch (e) {
    if (e.name === "ValidationError") {
      // Extract error messages
      const messages = Object.values(e.errors).map((val) => val.message);
      next(new BadRequest(messages));
      return;
    }
    next(new InternalServerError("Server error"));
    return;
  }
});

export const login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // remove password from the response

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
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        domain: process.env.NODE_ENV === "production" ? "devcomunity.com" : "localhost",
        path: "/"
      });

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        access_token: accessToken,
        data: user,
      });
    } else {
      next(new Unauthorized("Invalid email or password"));
      return;
    }
  } catch (e) {
    if (e.name === "ValidationError") {
      // Extract error messages
      const messages = Object.values(e.errors).map((val) => val.message);
      // res.status(400);
      // throw new Error(messages);
      next(new BadRequest(messages));
    }
    // res.status(500);
    // throw new Error("Server error");
    next(new InternalServerError(`Server error ${e.message}`));
  }
});

export const registerWithGoogle = asyncHandler(async (req, res, next) => {
  try {
    const { token } = req.query;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    console.log(payload)

    let user = await User.findOne({email: payload.email})

    if (user) {
      return next(new BadRequest("User already exists!"))
    }

    let randomPassword = crypto.randomBytes(16).toString("hex")

    user = await User.create({
      email: payload.email,
      password: randomPassword,
      is_email_verified: payload.email_verified,
      profile_image_url: payload.picture,
      user_name: payload.name,
      full_name: `${payload.given_name} ${payload.family_name}`
    })

    res.status(200).json({
      success: true,
      message: "User registered successfully"
    })
  } catch (e) {
    next(new InternalServerError(e.message))
  }
})

export const loginWithGoogle = asyncHandler(async (req, res, next) => {
  try {
    const { token } = req.query;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    console.log(payload)

    const user = await User.findOne({email: payload.email})

    if (!user) {
      return next(new NotFound("User not found!"))
    }

    const accessToken = generateAccessToken(user._id)
    generateRefreshToken(res, user._id);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      access_token: accessToken
    })
  } catch (e) {
    next(new InternalServerError(e.message))
  }
})

export const logout = asyncHandler(async (req, res, next) => {
  try {
    // const user = await User.findById(req.user._id);

    // if (!user) {
    //   return next(new NotFound("User not found"));
    // }

    res.cookie("refresh_token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(0),
      domain: process.env.NODE_ENV === "production" ? "devcomunity.com" : "localhost",
      path: "/"
    });
    
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (e) {
    next(new InternalServerError("Server error"));
  }
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      next(new NotFound("User not found"));
    }
    // await sendPasswordResetEmail({
    //   userId: user._id,
    //   fullName: user.full_name,
    //   userEmail: user.email,
    //   subject: "Reset your password",
    //   text: "Reset your password",
    // });

    if (user.is_email_verified === false) {
      return next(new Forbidden("Email not verified"));
    }

    if (newPassword.length < 8) {
      return next(new BadRequest("Password must be at least 8 characters"));
    }

    if (newPassword && (await user.matchPassword(newPassword))) {
      return next(
        new BadRequest("New password cannot be the same as current password")
      );
    }

    user.password = newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.FORGOT_PASSWORD_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) {
        next(new NotFound("User not found"));
      }

      user.password = newPassword;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });
    } catch (e) {
      if (e.name === "TokenExpiredError") {
        res.redirect("http://localhost:5173/register");
      } else {
        next(new InternalServerError("Server error"));
      }
    }
  }
});

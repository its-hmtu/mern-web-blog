import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

export const userAuth = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      const user = await User.findById(decoded.userId).select(
        "-password -__v -refresh_token -access_token"
      );
      req.user = user;
      next();
    } catch (e) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const userAuthWithPassword = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      const user = await User.findById(decoded.userId);
      req.user = user;
      next();
    } catch (e) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const adminAuth = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      const user = await User.findById(decoded.userId);
      if (user && user.role === "admin") {
        req.user = user;
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized as an admin");
      }
    } catch (e) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
})

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import {
  NotFound,
  BadRequest,
  Unauthorized,
  Forbidden,
  InternalServerError
} from "../errors/index.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      const user = await User.findById(decoded.userId).select(
        "-password -__v -refresh_token -access_token"
      );
      req.user = user;
      // console.log(user);
      next();
    } catch (e) {
      next(new Unauthorized("Not authorized, token failed"))
    }
  } else {
    next(new Unauthorized("Not authorized, no token"))
  }
});

export const verifyRole = (role) => {
  return (req, res, next) => {
    if (req.user && role.includes(req.user.role)) {
      next();
    } else {
      return next(new Forbidden("Not authorized, role not allowed"));
    }
  }
}

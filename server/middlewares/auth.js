import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

      req.user = await User.findById(decoded.userId).select('-password');
    
      next()
    } catch(e) {
      res.status(401);
      throw new Error("Not authorized, invalid token")
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token")
  }
})

const adminAuth = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN, async function(err, user) {
      if (err) {
        return res.status(401).json({
          status: 'fail',
          message: 'Not authorized, token failed',
        });
      }
      const { id } = user;
      const this_user = await User.findById(id);
      if (this_user.is_admin) {
        next();
      } else {
        return res.status(401).json({
          status: 'fail',
          message: 'Not authorized, only admin can delete user',
        });
      }
    });
  } catch (e) {
    res.status(500).json({
      status: 'fail',
      message: e.message,
    });
  }
})

export { protect }
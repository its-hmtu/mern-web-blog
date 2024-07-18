import User from '../models/user.model.js'
import asyncHandler from 'express-async-handler'
import {
  NotFound, 
  Forbidden,
  InternalServerError,
  BadRequest,
  Unauthorized
} from '../errors/index.js'
// import { authorize, clearFiles } from '../config/google_drive.js'

export const makeAdmin = asyncHandler(async (req, res, next) => {
  try {
    const admin = req.user;
    const { id } = req.query;
    const user = await User.findById(id);

    if (user.role === 'admin') {
      return next(new BadRequest('User is already an admin'))
    }

    user.role = 'admin';
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'User is now an admin',
      data: user,
    })
  } catch (e) {
    next(new InternalServerError(e.message))
  } 
})

export const removeAdmin = asyncHandler(async (req, res, next) => {
  try {
    const admin = req.user;
    const { id } = req.query;
    const user = await
    User.findById(id);

    if (user.role === 'user') {
      return next(new BadRequest('User is not an admin'))
    }

    user.role = 'user';
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'User is no longer an admin',
      data: user,
    })
  } catch (e) {
    next(new InternalServerError(e.message))
  }
})

export const clearGoogleDrive = asyncHandler(async (req, res, next) => {
  try {
    const admin = req.user;

    // const auth = await authorize();

    // await clearFiles(auth);

    res.status(200).json({
      status: 'success',
      message: 'Google drive cleared',
    })
  } catch (e) {
    next(new InternalServerError(e.message))
  }
})

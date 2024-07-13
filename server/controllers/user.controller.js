import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import slugify from 'slugify'
import {
  NotFound, 
  BadRequest,
  Unauthorized,
  Forbidden,
  InternalServerError
} from '../errors/index.js'
import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../utils/genToken.js'
import { sendEmailNotification } from '../utils/mailer.js'

// @access Private
export const getUser = asyncHandler(async (req, res, next) => {
  const slug = req.params.id
  const user = await User.findById(id).select('-password -__v -refresh_token -access_token')

  if (!user) {
    return next(new NotFound("User not found"))
  }

  try {
    res.status(200).json({
      status: 'success',
      message: 'User found',
      data: user,
    })
  } catch (e) {
    next(new InternalServerError(e.message))
  }
})

// @access Private
export const updateCurrentUser = asyncHandler(async (req, res, next) => {
  const user = req.user
  const { full_name, user_name, email, profile_image_url, bio, location } = req.body

  try {
    if (full_name) user.full_name = full_name
    if (user_name) {
      user.user_name = user_name
      user.slug = slugify(user_name, { lower: true, strict: true })
    }
    if (email) user.email = email
    if (profile_image_url) user.profile_image_url = profile_image_url
    if (bio) user.bio = bio
    if (location) user.location = location

    await user.save()

    res.status(200).json({
      status: 'success',
      message: 'User updated',
      data: user,
    })
  } catch (e) {
    next(new InternalServerError(e.message))
  }
})

// @access Private 
export const getCurrentUser = asyncHandler(async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'User found',
      data: req.user,
    })

  } catch (e) {
    next(new InternalServerError(e.message))
  }
})

export const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const { code } = req.body;
    const deleteStr = `delete/${user.user_name}`;

    if (user._id === id || user.role === "admin") {
      if (user.role === "user") {
        if (code !== deleteStr) {
          return next(new Forbidden("Wrong string"));
        }
      } else {
        if (user.role === "admin") {
          const options = {
            userId: user._id,
            fullName: user.full_name,
            userEmail: user.email,
            subject: "Account deleted",
            text: `Your account has been deleted by an admin`
          }
          await sendEmailNotification(options);
          await User.findByIdAndDelete(id)
        } else {
          const options = {
            userId: user._id,
            fullName: user.full_name,
            userEmail: user.email,
            subject: "Account deleted",
            text: `Your account has been deleted`
          }

          await sendEmailNotification(options);
          await User.findByIdAndDelete(id)
        }
      }
    }
  } catch (e) {
    next(new InternalServerError(e.message))
  }
})

export const changePasswordCurrentUser = asyncHandler(async (req, res, next) => {
  const user = req.user;

  const { currentPassword, newPassword } = req.body;

  if (newPassword.length === 0) {
    // res.status(400);
    // throw new Error('Please provide a password');

    return next(new BadRequest("Please provide a password"));
  }

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    // res.status(400);
    // throw new Error('Wrong current password');
    
    return next(new BadRequest("Wrong current password"));
  }

  if (currentPassword === newPassword) {
    // res.status(400);
    // throw new Error('New password cannot be the same as current password');
    return next(new BadRequest("New password cannot be the same as current password"));
  }

  if (newPassword.length < 8) {
    // res.status(400);
    // throw new Error('Password must be at least 8 characters');
    return next(new BadRequest("Password must be at least 8 characters"));
  }

  try {
    user.password = newPassword;

    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password updated',
      data: user,
    });

  } catch (e) {
    // console.log(e)
    // res.status(500);
    // throw new Error(`Server error: ${e.message}`);

    next(new InternalServerError(`Server error ${e.message}`));
  }
});

export const refreshToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;
  console.log(refreshToken)

  if (!refreshToken) {
    return next(new Unauthorized('No refresh token provided'))
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
    const user = await User.findById(decoded.userId)
    if (!user) {
      return next(new NotFound('User not found'))
    }

    const newAccessToken = generateAccessToken(user._id)
    res.status(200).json({
      success: true,
      access_token: newAccessToken
    })
  } catch(e) {
    next(new Unauthorized('Invalid refresh token'))
  }
});
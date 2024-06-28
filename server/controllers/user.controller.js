import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import slugify from 'slugify'

// @access Private
export const getUser = asyncHandler(async (req, res) => {
  const slug = req.params.slug
  const user = await User.findOne({slug}).select('-password -__v -refresh_token -access_token')

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  try {
    res.status(200).json({
      status: 'success',
      message: 'User found',
      data: user,
    })
  } catch (e) {
    res.status(500)
    throw new Error(`Server error: ${e.message}`)
  }
})

// @access Private
export const updateCurrentUser = asyncHandler(async (req, res) => {
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
    res.status(500)
    throw new Error(`Server error: ${e.message}`)
  }
})

// @access Private 
export const getCurrentUser = asyncHandler(async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'User found',
      data: req.user,
    })

  } catch (e) {
    res.status(500)
    throw new Error(`Server error: ${e.message}`)
  }
})

export const changePasswordCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;

  const { currentPassword, newPassword } = req.body;

  if (newPassword.length === 0) {
    res.status(400);
    throw new Error('Please provide a password');
  }

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    res.status(400);
    throw new Error('Wrong current password');
  }

  if (currentPassword === newPassword) {
    res.status(400);
    throw new Error('New password cannot be the same as current password');
  }

  if (newPassword.length < 8) {
    res.status(400);
    throw new Error('Password must be at least 8 characters');
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
    res.status(500);
    throw new Error(`Server error: ${e.message}`);
  }
});
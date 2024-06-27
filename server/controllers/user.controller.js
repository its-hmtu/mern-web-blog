import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'

// @access Private
const getUser = asyncHandler(async (req, res) => {
})

// @access Private
const updateUser = asyncHandler(async (req, res) => {
})

export {
  getUser,
  updateUser
}
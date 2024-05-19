import asyncHandler from 'express-async-handler'
import genToken from "../utils/genToken.js"
import User from '../models/user.model.js'

const authUser = asyncHandler(async (req, res) => {
  // res.status(200).json({ message: 'Auth' })

  const {email, password} = req.body;

  const user = await User.findOne({email});

  if (user && (await user.matchPassword(password))) {
    genToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.username,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error('Invalid email or password')
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  const isUserExists = await User.findOne({email})

  if (isUserExists) {
    res.status(400);
    throw new Error("User already exists")
  }

  const user = await User.create({
    username, 
    email,
    password
  })

  if (user) {
    genToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.username,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })

  res.status(200).json({ message: 'User logged out' })
})

// @access Private
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    })
  } else {
    res.status(404);
    throw new Error('User not found')
  }
})

// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id) 

  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const updated = await user.save();

    res.status(200).json({
      _id: updated._id,
      username: updated.username,
      email: updated.email
    })
  } else {
    res.status(404);
    throw new Error('User not found')
  
  }
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUser,
  updateUser
}
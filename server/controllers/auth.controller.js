import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"

export const register = async (req, res, next) => {
  const { username, email, password } = req.body

  if (
    !username || 
    !email || 
    !password || 
    username.length === 0 || 
    email.length === 0 || 
    password.length === 0
  ) {
    // return res.status(401).json({
    //   status: 401,
    //   message: 'All fields are required'
    // })

    next(errorHandler(400, "All fields are required"))
  }

  const hashedPassword = await bcryptjs.hashSync(password, 10)

  const newUser = new User({
    username,
    email,
    password: hashedPassword
  })

  try {
    await newUser.save()
    res.json("Sign up successful!")
  } catch(e) {
    next(e)
  }
}
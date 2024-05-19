import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDb from './config/db.js'
import userRoutes from './routes/user.route.js'
import { notFound, errorHandler } from './middlewares/error.js'

dotenv.config()

connectDb()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
// app.use(cors())

app.use(cookieParser())

app.use('/api/users', userRoutes)

app.get("/", (req, res) => res.send("Server is ready!"))
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})


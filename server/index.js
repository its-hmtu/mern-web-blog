import express from 'express'
import path from 'path'
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

if (process.env.NODE_ENV === 'development') { // change to 'production' later
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, '/client/dist')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})


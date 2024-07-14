import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDb from './config/db.js'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import authRoutes from './routes/auth.route.js'
import uploadRoutes from './routes/upload.route.js'
import categoryRoutes from './routes/category.route.js'
import adminRoutes from './routes/admin.route.js'
import { notFound, errorHandler } from './middlewares/error.middleware.js'
import cors from 'cors'
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config()

connectDb()

const app = express()
const server = createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5000
const BASE_URL = '/v1'
const __dirname = path.resolve()

app.use((req, res, next) => {
  req.io = io
  next()
})

io.on('connection', (socket) => {
  console.log('A user connected');

  // When the client identifies itself, join a room with their user ID
  socket.on('identify', (userId) => {
    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cors())

app.use(cookieParser())

app.use(`${BASE_URL}/auth`, authRoutes)
app.use(`${BASE_URL}/users`, userRoutes)
app.use(`${BASE_URL}/posts`, postRoutes)
app.use(`${BASE_URL}/comments`, commentRoutes)
app.use(`${BASE_URL}/categories`, categoryRoutes)
app.use(`${BASE_URL}/admin`, adminRoutes)
app.use(`${BASE_URL}/upload`, uploadRoutes)

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use(notFound)
app.use(errorHandler)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})


// if (process.env.NODE_ENV === 'development' || !__dirname) { // change to 'production' later
//   app.use(express.static(path.join(__dirname, '/client/dist')))

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
//   })
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running...')
//   })
// }

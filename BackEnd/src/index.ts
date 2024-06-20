import express from 'express'
import usersRouter from './routes/users.routes'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { checkConnectionDB } from './middlewares/databaseConnect.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { UPLOAD_DIR } from './constants/dir'
import categoriesRouter from './routes/categories.routes'
import cors from 'cors'
import { roomHandler } from './socket.io/roomHandler'
import { connectDbSequelize } from './config/connection-database'
import User from './models/user.models'

require('dotenv').config()

const app = express()
const httpServer = createServer(app)

const port = process.env.PORT
initFolder()

app.use(express.urlencoded({ extended: true }))

// tạo folder upload

app.use(express.json())
const corsOptions = {
  origin: 'http://localhost:5000'
}

app.use(cors(corsOptions))
app.use(checkConnectionDB)

app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/AdCategories', categoriesRouter)
app.use('/uploads', express.static(UPLOAD_DIR)) // trỏ đến link chứa file

app.use(defaultErrorHandler)

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5000'
  }
})

io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`)
  roomHandler(socket, io)
  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`)
  })
})

httpServer.listen(port, async () => {
  try {
    await connectDbSequelize.authenticate()
    console.log(`Kết nối database thành công`)
    await connectDbSequelize.sync({ force: false, alter: true })
    //alter: true: Cập nhật cấu trúc bảng để phù hợp với mô hình mà không phá hủy dữ liệu hiện tại.
    //Điều này an toàn hơn so với force.
    console.log(`Example app listening on port ${port}`)
  } catch (error) {
    console.error('Kết nối database thất bại', error)
  }
})

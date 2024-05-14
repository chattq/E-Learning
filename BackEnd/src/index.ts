import express from 'express'
import usersRouter from './routes/users.routes'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { checkMariaDBConnection } from './middlewares/databaseConnect.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import path from 'path'
import { UPLOAD_DIR } from './constants/dir'
import categoriesRouter from './routes/categories.routes'
import cors from 'cors'
import { roomHandler } from './socket.io/roomHandler'

require('dotenv').config()

const app = express()
const httpServer = createServer(app)

const port = process.env.PORT
initFolder()
app.use(checkMariaDBConnection)
app.use(express.urlencoded({ extended: true }))

// tạo folder upload

app.use(express.json())
const corsOptions = {
  origin: 'http://localhost:5000'
}

app.use(cors(corsOptions))

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

const users: {
  [key: string]: {
    socket_id: string
  }
} = {}
const emailToSocketIdMap = new Map()
const socketidToEmailMap = new Map()
io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`)
  roomHandler(socket)

  // const user_id = socket.handshake.auth.id

  // users[user_id] = {
  //   socket_id: socket.id
  // }

  // console.log(users)
  // socket.on('message', (data) => {
  //   console.log('send', data)
  //   const recevier_socket_id = users[data.to].socket_id
  //   socket.to(recevier_socket_id).emit('recevier_message', {
  //     content: data.content,
  //     from: user_id
  //   })
  // })
  // console.log(`Socket Connected`, socket.id)
  // socket.on('room:join', (data) => {
  //   const { email, room } = data
  //   console.log(`user join`, email, 'room', room)
  //   emailToSocketIdMap.set(email, socket.id)
  //   socketidToEmailMap.set(socket.id, email)
  //   io.to(room).emit('user:joined', { email, id: socket.id })
  //   socket.join(room)
  //   io.to(socket.id).emit('room:join', data)
  // })

  // socket.on('user:call', ({ to, offer }) => {
  //   io.to(to).emit('incomming:call', { from: socket.id, offer })
  // })

  // socket.on('call:accepted', ({ to, ans }) => {
  //   io.to(to).emit('call:accepted', { from: socket.id, ans })
  // })

  // socket.on('peer:nego:needed', ({ to, offer }) => {
  //   console.log('peer:nego:needed', offer)
  //   io.to(to).emit('peer:nego:needed', { from: socket.id, offer })
  // })

  // socket.on('peer:nego:done', ({ to, ans }) => {
  //   console.log('peer:nego:done', ans)
  //   io.to(to).emit('peer:nego:final', { from: socket.id, ans })
  // })

  socket.on('disconnect', () => {
    // delete users[user_id]
    console.log(`user ${socket.id} disconnected`)
  })
})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

import express from 'express'
import usersRouter from './routes/users.routes'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { checkMariaDBConnection } from './middlewares/databaseConnect.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'

require('dotenv').config()

const app = express()
const httpServer = createServer(app)

const port = process.env.PORT
initFolder()
app.use(checkMariaDBConnection)
app.use(express.urlencoded())

// tạo folder upload

app.use(express.json())

app.use('/users', usersRouter)
app.use('/medias', mediasRouter)

app.use(defaultErrorHandler)

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

const users: {
  [key: string]: {
    socket_id: string
  }
} = {}
io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`)
  const user_id = socket.handshake.auth.id

  users[user_id] = {
    socket_id: socket.id
  }

  console.log(users)
  socket.on('message', (data) => {
    console.log('send', data)
    const recevier_socket_id = users[data.to].socket_id
    socket.to(recevier_socket_id).emit('recevier_message', {
      content: data.content,
      from: user_id
    })
  })
  socket.on('disconnect', () => {
    delete users[user_id]
    console.log(`user ${socket.id} disconnected`)
  })
})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

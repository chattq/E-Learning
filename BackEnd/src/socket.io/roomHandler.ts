import { Socket } from 'socket.io'
interface IRoomParams {
  roomId: string
  peerId: string
}

interface IJoinRoomParams extends IRoomParams {
  userName: string
}
const rooms: Record<string, Record<string, any>> = {}
export const roomHandler = (socket: Socket) => {
  const joinRoom = ({ roomId, peerId, userName }: IJoinRoomParams) => {
    if (!rooms[roomId]) rooms[roomId] = {}
    console.log(14, rooms[roomId])
  }

  socket.on('join-room', joinRoom)
}

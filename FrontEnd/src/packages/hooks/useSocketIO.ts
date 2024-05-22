import { Socket, io } from "socket.io-client";

export const useSocket = () => {
  const socket: Socket = io("http://localhost:4000");
  return {
    socket,
  };
};

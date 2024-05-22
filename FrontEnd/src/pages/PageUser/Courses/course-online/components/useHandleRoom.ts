import { useEffect, useState } from "react";

export const useHandlerRooms = () => {
  const [stream, setStream] = useState<MediaStream>();
  const [roomId, setRoomId] = useState<string>("");

  return {
    stream,
    setStream,
    setRoomId,
    roomId,
  };
};

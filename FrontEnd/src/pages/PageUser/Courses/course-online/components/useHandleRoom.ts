import { useEffect, useState } from "react";

export const useHandlerRooms = () => {
  const [stream, setStream] = useState<MediaStream>();
  const [roomId, setRoomId] = useState<string>("");
  useEffect(() => {
    // try {
    //   navigator.mediaDevices
    //     .getUserMedia({ video: true, audio: true })
    //     .then((stream) => {
    //       setStream(stream);
    //     });
    // } catch (error) {
    //   console.error(error);
    // }
  }, []);
  return {
    stream,
    setStream,
    setRoomId,
    roomId,
  };
};

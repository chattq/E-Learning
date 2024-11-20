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

export const mergeDataRoom = (data: any, data2: any) => {
  const data3 = data?.reduce((acc: any, item: any) => {
    // Tìm phần tử trong `data2` tương ứng với `peerId`
    const additionalData = data2?.find((d: any) => d.peerId === item.peerId);

    // Nếu tìm thấy, kết hợp các thuộc tính từ `data` và `data2`
    if (additionalData) {
      acc.push({ ...item, ...additionalData });
    }

    return acc;
  }, []);

  return data3;
};

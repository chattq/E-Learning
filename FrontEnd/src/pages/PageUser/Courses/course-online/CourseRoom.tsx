import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWindowSize } from "../../../../packages/hooks/useWindowSize";
import "./CourseRoom.scss";
import { useNavigate, useParams } from "react-router-dom";
import VideoPlayer from "../../../../packages/components/VideoPlayer/VideoPlayer";
import { useAtom, useAtomValue } from "jotai";
import { streamAtom } from "../../UserDasboard/store";
import { getProfileFromLS } from "../../../../utils/localStorageHandler";
import { useSocket } from "../../../../packages/hooks/useSocketIO";
import { RoomContext } from "../../../../packages/contexts/RoomContext";

import { ws } from "../../../../socketIO";
import { Bs0Square } from "react-icons/bs";
import {
  peerStreamsAtom,
  peersAtom,
} from "../../../../packages/store/peer-store";
import useRoom from "../../../../packages/hooks/useRoom";
import { nanoid } from "nanoid";
import { notification } from "antd";
import Peer from "peerjs";
import { usePeerService } from "../../../../packages/services/PeerService";
export const deleteKeyFromObject = (obj: any, key: any) => {
  delete obj[key];
  return obj;
};

export default function CourseRoom() {
  const { id } = useParams();

  const [listUser, setListUser] = useState([]);
  const [stream, setStream] = useState<MediaStream>();
  const [peerId, setPeerId] = useState<string>("");

  const [peers, setPeers] = useState({});
  const { peer } = usePeerService();

  useEffect(() => {
    peer.on("open", (id) => {
      setPeerId(id);
      ws.emit("join-room", {
        roomId: "20241405COURSEONLINE",
        peerId: id,
        userId: nanoid(),
      });
    });

    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            setPeers((prev: any) => ({
              ...prev,
              [call.peer]: { stream: remoteStream, peerId: call.peer },
            }));
          });
        });
    });

    ws.on("user-joined", ({ peerId: peerId, userId: userId }) => {
      // Tự động gọi khi người dùng kết nối
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          const call = peer.call(peerId, stream);
          call.on("stream", (remoteStream) => {
            setPeers((prev: any) => ({
              ...prev,
              [peerId]: { stream: remoteStream, peerId: peerId },
            }));
          });
        });
    });
  }, []);

  useEffect(() => {
    ws.on("list_users_rooms_online", (data: any) => {
      setListUser(data);
      console.log("list_users_rooms_online", data);
    });

    ws.on("new_user_join", (data: any) => {
      openNotification(data, "join");
      // console.log("new_user_join", data);
    });
    ws.on("user_leave_room", (data: any) => {
      openNotification(data, "leave");
    });

    return () => {
      ws.off("list_users_rooms_online", (data: any) => {});
      ws.off("new_user_join", (data: any) => {
        openNotification(data, "join");
      });
      ws.on("user_leave_room", (data: any) => {
        openNotification(data, "leave");
      });
    };
  }, []);

  const windowSize = useWindowSize();
  const videoRef = useRef<any>(null);
  const nav = useNavigate();

  const handleTogglePictureInPicture = () => {
    // if (document.pictureInPictureElement) {
    //   document.exitPictureInPicture().catch((error) => {
    //     console.error("Error exiting Picture-in-Picture mode:", error);
    //   });
    // } else if (
    //   videoRef.current &&
    //   videoRef.current !== document.pictureInPictureElement
    // ) {
    //   videoRef.current.requestPictureInPicture().catch((error) => {
    //     console.error("Error entering Picture-in-Picture mode:", error);
    //   });
    // }
  };

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (data: any, status: string) => {
    api["success"]({
      message: "Notification",
      description: `User ${data.userId} ${status} room ${data.roomId}`,
    });
  };

  console.log(125, peers);
  // console.log(37, stream);
  return (
    <div>
      <div className="h-[50px] bg-slate-500">
        <button onClick={handleTogglePictureInPicture}>
          Exit
          {/* {document.pictureInPictureElement
            ? "Exit Picture-in-Picture"
            : "Enter Picture-in-Picture"} */}
        </button>
      </div>
      <div className="flex layout_room_video">
        <div className="flex-1">
          {Object.values(deleteKeyFromObject(peers, peerId)).map(
            (item: any) => {
              return (
                <div key={item.peerId}>
                  <h1>{item.peerId}</h1>
                  <VideoPlayer className="h-full w-full" stream={item.stream} />
                </div>
              );
            }
          )}
          {/* <VideoPlayer className="h-full w-full" stream={stream} /> */}
        </div>
        <div className="bg-orange-200 w-[300px]">
          <div className="layout_chat">
            <h1>My Peer ID: {peerId}</h1>
            {listUser.map((item: any) => {
              return (
                <div
                  className="flex items-center justify-between"
                  style={{ width: "100%" }}>
                  <div className="text-[12px]">{item.userId}</div>
                </div>
              );
            })}
          </div>

          <VideoPlayer className="h-[150px] w-full" stream={stream} />
        </div>
      </div>
      {contextHolder}
    </div>
  );
}

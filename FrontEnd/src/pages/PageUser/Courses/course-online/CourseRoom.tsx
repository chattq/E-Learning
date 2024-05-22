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

export default function CourseRoom() {
  const { id } = useParams();

  // const { me, stream } = useRoom();
  const peers = useAtomValue(peersAtom);
  // const { stream, me } = useContext(RoomContext);
  // const { me, stream } = useRoom();
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    ws.on("list_users_rooms_online", (data: any) => {
      setListUser(data);
      console.log("list_users_rooms_online", data);
    });
    ws.on("new_user_join", (data: any) => {
      openNotification(data, "join");
    });
    ws.on("user_leave_room", (data: any) => {
      openNotification(data, "leave");
      console.log("user_leave_room", data);
    });
    return () => {
      ws.off("list_users_rooms_online", (data: any) => {
        console.log("list_users_rooms_online", data);
      });
      ws.off("new_user_join", (data: any) => {
        openNotification(data, "join");
      });
      ws.on("user_leave_room", (data: any) => {
        openNotification(data, "leave");
      });
    };
  }, []);
  // console.log("peers", peers);

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
      {Object.values(peers).map((item: any) => {
        return <VideoPlayer className="h-full w-full" stream={item.stream} />;
      })}
      <div className="flex layout_room_video">
        <div className="flex-1">
          {/* <VideoPlayer className="h-full w-full" stream={stream} /> */}
        </div>
        <div className="bg-orange-200 w-[300px]">
          <div className="layout_chat">
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
          {/* <VideoPlayer className="h-[150px] w-full" stream={stream} />
          <Bs0Square /> */}
        </div>
      </div>
      {contextHolder}
    </div>
  );
}

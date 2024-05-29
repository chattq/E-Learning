import React, { useEffect, useRef, useState } from "react";
import { useWindowSize } from "../../../../packages/hooks/useWindowSize";
import "./CourseRoom.scss";
import { useNavigate, useParams } from "react-router-dom";
import VideoPlayer from "../../../../packages/components/VideoPlayer/VideoPlayer";
import { ws } from "../../../../socketIO";
import { cloneDeep } from "lodash";
import { Bs0Square } from "react-icons/bs";

import { nanoid } from "nanoid";
import { Spin, notification } from "antd";
import Peer from "peerjs";

export const deleteKeyFromObject = (obj: any, key: any) => {
  delete obj[key];
  return obj;
};

export default function CourseRoom() {
  const { id } = useParams();
  const [spinning, setSpinning] = React.useState<boolean>(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicroPhoneOn, setIsMicrophoneOn] = useState(true);
  const [listUser, setListUser] = useState([]);
  const [stream, setStream] = useState<MediaStream>();
  const [peerId, setPeerId] = useState<string>("");

  const [peers, setPeers] = useState<any>({});

  const userID = nanoid();

  useEffect(() => {
    const peer = new Peer(nanoid());
    peer.on("open", (id) => {
      // setSpinning(true);
      setPeerId(id);
      ws.emit("join-room", {
        roomId: "20241405COURSEONLINE",
        peerId: id,
        userId: userID,
      });
    });

    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          // setSpinning(false);
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            setPeers((prev: any) => ({
              ...prev,
              [call.peer]: {
                stream: remoteStream,
                peerId: call.peer,
                isCameraOn: true,
                isMicroPhoneOn: true,
              },
            }));
          });
        });
    });

    ws.on("user-joined", ({ peerId: peerId, userId: userId }) => {
      // Tự động gọi khi người dùng kết nối
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          // setSpinning(false);
          const call = peer.call(peerId, stream);
          call.on("stream", (remoteStream) => {
            setPeers((prev: any) => ({
              ...prev,
              [peerId]: {
                stream: remoteStream,
                peerId: peerId,
                isCameraOn: true,
                isMicroPhoneOn: true,
              },
            }));
          });
        });
    });
  }, []);

  useEffect(() => {
    ws.on("list_users_rooms_online", (data: any) => {
      setListUser(data);
      // console.log("list_users_rooms_online", data);
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
      ws.off("toggle-camera");
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
  useEffect(() => {
    // mình cập nhật trạng thái camera của chính mình và mọi người có thể thấy là mình đã cập nhật trạng thái camera
    ws.on("update-camera-status", (data: any) => {
      // clone peers để không ảnh hưởng đến peers chính
      const updatePeer = cloneDeep(peers);
      // tìm peerID cần update trạng thái camera
      if (updatePeer[data.peerId]) {
        updatePeer[data.peerId].isCameraOn = data.isCameraOn;
        // nếu tìm thấy thì cập nhật trạng thái camera cho peers đó
        const videoTrack = updatePeer[data.peerId].stream.getVideoTracks()[0];
        videoTrack.enabled = data.isCameraOn;

        // set lại giá trị peers để cập nhật trạng thái đúng nhất
        setPeers(updatePeer);
      }
    });
    // mình cập nhật trạng thái audio của chính mình và mọi người có thể thấy là mình đã cập nhật trạng thái audio
    ws.on("update-microphone-status", (data: any) => {
      // clone peers để không ảnh hưởng đến peers chính
      const updatePeer = cloneDeep(peers);
      // tìm peerID cần update trạng thái audio
      if (updatePeer[data.peerId]) {
        // nếu tìm thấy thì cập nhật trạng thái audio cho peers đó
        updatePeer[data.peerId].isMicroPhoneOn = data.isMicroPhoneOn;
        const audioTrack = updatePeer[data.peerId].stream.getAudioTracks()[0];
        audioTrack.enabled = data.isMicroPhoneOn;
        // set lại giá trị peers để cập nhật trạng thái đúng nhất
        setPeers(updatePeer);
      }
    });

    // tắt tất cả camera của users
    ws.on("update-microphone-status", () => {
      if (stream) {
        const videoTrack = stream.getVideoTracks()[0];
        videoTrack.enabled = false;
        setIsCameraOn(false);
      }
    });
    return () => {
      ws.off("toggle-camera");
      ws.off("toggle-camera");
      ws.off("turn-off-camera");
    };
  }, [stream, peers]);

  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks()[0].enabled = !isCameraOn;
      setIsCameraOn(!isCameraOn);
      ws.emit("toggle-camera", {
        userID: userID,
        peerId: peerId,
        isCameraOn: !isCameraOn,
      });

      // cập nhật lại trạng thái của peer (các user)
      setPeers((prevPeers: any) => {
        const updatedPeers = cloneDeep(prevPeers);
        if (updatedPeers[peerId]) {
          updatedPeers[peerId].isCameraOn = !isCameraOn;
        }
        return updatedPeers;
      });
    }
  };

  const toggleMicrophone = () => {
    if (stream) {
      stream.getAudioTracks()[0].enabled = !isMicroPhoneOn;
      setIsMicrophoneOn(!isMicroPhoneOn);
      ws.emit("toggle-microphone", {
        userID: userID,
        peerId: peerId,
        isMicroPhoneOn: !isMicroPhoneOn,
      });
      setPeers((prevPeers: any) => {
        const updatedPeers = cloneDeep(prevPeers);
        if (updatedPeers[peerId]) {
          updatedPeers[peerId].isMicroPhoneOn = !isMicroPhoneOn;
        }
        return updatedPeers;
      });
    }
  };

  // tắt tất cả camera của user trong nhóm (chỉ người nào có quyền thì mới được dùng)
  const turnOffAllCameras = () => {
    ws.emit("turn-off-all-cameras");
  };
  console.log(125, peers);
  return (
    <div>
      <Spin spinning={spinning} fullscreen />
      <div className="h-[50px] bg-slate-500">
        <button onClick={handleTogglePictureInPicture}>
          Exit
          {/* {document.pictureInPictureElement
            ? "Exit Picture-in-Picture"
            : "Enter Picture-in-Picture"} */}
        </button>
        <div>
          <button onClick={toggleCamera} className="bg-neutral-700">
            {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
          </button>
          <button onClick={toggleMicrophone}>
            {isMicroPhoneOn ? "Turn Off Microphone" : "Turn On Microphone"}
          </button>
          <button onClick={turnOffAllCameras}>turnOffAllCameras</button>
        </div>
      </div>
      <div className="flex layout_room_video">
        <div className="flex-1">
          {Object.values(deleteKeyFromObject(peers, peerId)).map(
            (item: any) => {
              if (!item.isCameraOn) return null;
              return (
                <div key={item.peerId}>
                  <h1>{item.peerId}</h1>
                  <VideoPlayer className="h-full w-full" stream={item.stream} />
                </div>
              );
            }
          )}
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

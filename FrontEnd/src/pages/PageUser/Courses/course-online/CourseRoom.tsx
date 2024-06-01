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
import ListUserRoom from "./components/list-user-room";

export const deleteKeyFromObject = (obj: any, key: any) => {
  delete obj[key];
  return obj;
};

export default function CourseRoom() {
  const { id } = useParams();
  const [spinning, setSpinning] = React.useState<boolean>(false);
  const windowSize = useWindowSize();
  const videoRef = useRef<any>(null);
  const nav = useNavigate();
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicroPhoneOn, setIsMicrophoneOn] = useState(true);
  const [listUser, setListUser] = useState([]);
  const [stream, setStream] = useState<MediaStream>();
  const [peerId, setPeerId] = useState<string>("");
  const peerRef = useRef<Peer | any>(null);
  const [peers, setPeers] = useState<any>({});
  const [screenSharingId, setScreenSharingId] = useState<string>("");

  const userID = nanoid();

  useEffect(() => {
    const peer = new Peer(nanoid());

    peerRef.current = peer;
    peer.on("open", (id) => {
      setPeerId(id);
      ws.emit("join-room", {
        roomId: "20241405COURSEONLINE",
        peerId: id,
        userId: userID,
      });
    });
    const getMediaStream = () => {
      return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    };

    const handleCall = (call: any, stream: MediaStream) => {
      call.answer(stream);
      call.on("stream", (remoteStream: any) => {
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
    };

    getMediaStream().then((initialStream) => {
      setStream(initialStream);

      peer.on("call", (call) => handleCall(call, initialStream));

      ws.on("user-joined", ({ peerId, userId }) => {
        const call = peer.call(peerId, initialStream);
        handleCall(call, initialStream);
      });
    });

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
      ws.off("user-joined");
      ws.off("join-room");
      ws.off("list_users_rooms_online", (data: any) => {});
      ws.off("new_user_join", (data: any) => {
        openNotification(data, "join");
      });
      ws.on("user_leave_room", (data: any) => {
        openNotification(data, "leave");
      });
      peer.destroy();
    };
  }, []);

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
        console.log("data.peerId", data.peerId);
        // console.log(139, peerId);
        // console.log(141, stream);
        updatePeer[data.peerId].isCameraOn = data.isCameraOn;
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
    ws.on("turn-off-camera", () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setIsCameraOn(false);
      }
    });

    return () => {
      ws.off("turn-off-camera");
      ws.off("update-microphone-status");
      ws.off("update-camera-status");
    };
  }, [stream, peers]);

  const toggleCamera = () => {
    if (stream) {
      if (isCameraOn) {
        stream.getTracks().forEach((track) => track.stop());
        setIsCameraOn(false);
        ws.emit("toggle-camera", {
          userID: userID,
          peerId: peerId,
          isCameraOn: false,
        });
      } else {
        // logic để bật lại camera tạo ra 1 stream mới
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((newStream) => {
            setStream(newStream);
            setIsCameraOn(true);
            ws.emit("toggle-camera", {
              userID: userID,
              peerId: peerId,
              isCameraOn: true,
            });
            Object.values(peerRef.current?.connections).forEach(
              (connection: any) => {
                const videoTrack: any = newStream
                  ?.getTracks()
                  .find((track) => track.kind === "video");
                connection[0].peerConnection
                  .getSenders()
                  .find((sender: any) => sender.track.kind === "video")
                  .replaceTrack(videoTrack)
                  .catch((err: any) => console.error(err));
              }
            );
          });
      }
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
    }
  };

  // tắt tất cả camera của user trong nhóm (chỉ người nào có quyền thì mới được dùng)
  const turnOffAllCameras = () => {
    ws.emit("turn-off-all-cameras");
  };

  const switchStream = (stream: MediaStream) => {
    setScreenSharingId(peerRef.current?.id || "");
    Object.values(peerRef.current?.connections).forEach((connection: any) => {
      const videoTrack: any = stream
        ?.getTracks()
        .find((track) => track.kind === "video");
      connection[0].peerConnection
        .getSenders()
        .find((sender: any) => sender.track.kind === "video")
        .replaceTrack(videoTrack)
        .catch((err: any) => console.error(err));
    });
  };

  const shareScreen = () => {
    if (screenSharingId) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(switchStream);
    } else {
      navigator.mediaDevices.getDisplayMedia({}).then((stream) => {
        switchStream(stream);
        // setScreenStream(stream);
        setStream(stream);
      });
    }
  };
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
          <button onClick={shareScreen} className="bg-green-600">
            shareScreen
          </button>
        </div>
      </div>
      <div className="flex layout_room_video">
        <div className="flex-1">
          <ListUserRoom peers={peers} peerId={peerId} />
        </div>
        <div className="bg-orange-200 w-[300px]">
          <div className="layout_chat">
            <h1>My Peer ID: {peerId}</h1>
            {listUser.map((item: any) => {
              return (
                <div
                  className="flex items-center justify-between"
                  style={{ width: "100%" }}>
                  <div className="text-[12px]">{item.peerId}</div>
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

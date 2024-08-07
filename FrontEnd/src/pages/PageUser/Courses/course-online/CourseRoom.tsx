import React, { useCallback, useEffect, useRef, useState } from "react";
import { useWindowSize } from "../../../../packages/hooks/useWindowSize";
import "./CourseRoom.scss";
import { useNavigate, useParams } from "react-router-dom";
import VideoPlayer from "../../../../packages/components/VideoPlayer/VideoPlayer";
import { ws } from "../../../../socketIO";
import { cloneDeep } from "lodash";
import { MdPeopleAlt, MdScreenShare, MdStopScreenShare } from "react-icons/md";
import { HiMiniVideoCamera, HiMiniVideoCameraSlash } from "react-icons/hi2";
import { IoMdMic } from "react-icons/io";
import { BiSolidPhoneOff } from "react-icons/bi";
import { BsChatText, BsChatTextFill } from "react-icons/bs";
import { nanoid } from "nanoid";
import { Button, Spin, notification } from "antd";
import Peer from "peerjs";
import ListUserRoom from "./components/list-user-room";
import { MdMicOff } from "react-icons/md";
import ChatRoomCourse from "./components/ChatRoom/ChatRoomCourse";
import { MdOutlinePeopleAlt } from "react-icons/md";
import ListPeopleRoom from "./components/ListPeopleRoom/list-people-room";
import { match } from "ts-pattern";
import LayoutSideBar from "./components/LayoutSideBar";
import { PiRecordFill } from "react-icons/pi";

export const deleteKeyFromObject = (obj: any, key: any) => {
  delete obj[key];
  return obj;
};

export default function CourseRoom() {
  const { id } = useParams();
  const windowSize = useWindowSize();
  const nav = useNavigate();
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicroPhoneOn, setIsMicrophoneOn] = useState(true);
  const [seletedOption, setSeletedOption] = useState<string>("");
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

    // // Thêm sự kiện beforeunload để hiển thị thông báo khi người dùng rời trang
    // const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    //   event.preventDefault();
    //   event.returnValue = ""; // Hiển thị thông báo mặc định
    // };

    // window.addEventListener("beforeunload", handleBeforeUnload);

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
      // Xóa sự kiện beforeunload khi component unmount
      // window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleTogglePictureInPicture = () => {
    nav(-1);
    if (stream && isCameraOn) {
      stream.getTracks().forEach((track) => track.stop());
      setIsCameraOn(false);
      ws.emit("toggle-camera", {
        userID: userID,
        peerId: peerId,
        isCameraOn: false,
      });
    }
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

  const toggleCamera = useCallback(() => {
    if (stream) {
      if (isCameraOn) {
        const tracks = stream.getVideoTracks();
        tracks[0].stop();
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
            ws.emit("toggle-camera", {
              userID: userID,
              peerId: peerId,
              isCameraOn: true,
            });
            setIsCameraOn(true);
            setStream(newStream);
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
  }, [isCameraOn, stream, peerId]);

  const toggleMicrophone = useCallback(() => {
    if (stream) {
      if (isMicroPhoneOn) {
        const tracks = stream.getAudioTracks();
        tracks[0].stop();
        setIsMicrophoneOn(false);
        ws.emit("toggle-microphone", {
          userID: userID,
          peerId: peerId,
          isMicroPhoneOn: false,
        });
      } else {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((newStream) => {
            ws.emit("toggle-microphone", {
              userID: userID,
              peerId: peerId,
              isMicroPhoneOn: true,
            });
            setIsMicrophoneOn(true);
            setStream(newStream);
            Object.values(peerRef.current?.connections).forEach(
              (connection: any) => {
                const audioTrack: any = newStream
                  ?.getTracks()
                  .find((track) => track.kind === "audio");
                connection[0].peerConnection
                  .getSenders()
                  .find((sender: any) => sender.track.kind === "audio")
                  .replaceTrack(audioTrack)
                  .catch((err: any) => console.error(err));
              }
            );
          });
      }
    }
  }, [isMicroPhoneOn, stream, peerId]);

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

  const handleSelectedChat = useCallback(() => {
    setSeletedOption("chat");
  }, [seletedOption]);
  const handleSelectedPeople = useCallback(() => {
    setSeletedOption("people");
  }, [seletedOption]);
  const handleSelectedDisableSidebar = useCallback(
    (mode: string) => {
      setSeletedOption(mode);
    },
    [seletedOption]
  );

  return (
    <div>
      {/* <Spin spinning={spinning} fullscreen /> */}
      <div className="h-[55px] justify-between px-6 flex items-center bg-[#fff] border-b-[1px]">
        <button onClick={handleTogglePictureInPicture}>
          Exit
          {/* {document.pictureInPictureElement
            ? "Exit Picture-in-Picture"
            : "Enter Picture-in-Picture"} */}
        </button>
        <div className="flex items-center gap-7">
          <div className="flex gap-7 border-r-[2px] pr-7">
            <div
              className="cursor-pointer flex flex-col"
              onClick={() => handleSelectedDisableSidebar("disableChat")}>
              <div className="m-auto">
                <PiRecordFill size={20} />
              </div>
              <div className="text-[12px]">Record</div>
            </div>
            {seletedOption === "chat" ? (
              <div
                className="cursor-pointer flex flex-col"
                onClick={() => handleSelectedDisableSidebar("disableChat")}>
                <div className="m-auto">
                  <BsChatTextFill size={20} />
                </div>
                <div className="text-[12px]">Chat</div>
              </div>
            ) : (
              <div
                className="cursor-pointer flex flex-col"
                onClick={handleSelectedChat}>
                <div className="m-auto">
                  <BsChatText size={20} />
                </div>
                <div className="text-[12px]">Chat</div>
              </div>
            )}
            {seletedOption === "people" ? (
              <div
                className="cursor-pointer flex flex-col"
                onClick={() => handleSelectedDisableSidebar("disablePeople")}>
                <div className="m-auto">
                  <MdPeopleAlt size={20} />
                </div>
                <div className="text-[12px]">People</div>
              </div>
            ) : (
              <div
                className="cursor-pointer flex flex-col"
                onClick={handleSelectedPeople}>
                <div className="m-auto">
                  <MdOutlinePeopleAlt size={20} />
                </div>
                <div className="text-[12px]">People</div>
              </div>
            )}
          </div>
          <div className="cursor-pointer flex flex-col" onClick={toggleCamera}>
            <div className="m-auto">
              {!isCameraOn ? (
                <HiMiniVideoCameraSlash size={20} />
              ) : (
                <HiMiniVideoCamera size={20} />
              )}
            </div>
            <div className="text-[12px]">Camera</div>
          </div>
          <div
            className="cursor-pointer flex flex-col"
            onClick={toggleMicrophone}>
            <div className="m-auto">
              {!isMicroPhoneOn ? <MdMicOff size={20} /> : <IoMdMic size={20} />}
            </div>
            <div className="text-[12px]">Mic</div>
          </div>
          {/* <button onClick={turnOffAllCameras}>turnOffAllCameras</button> */}
          <div className="cursor-pointer flex flex-col">
            <div className="m-auto">
              {!isMicroPhoneOn ? (
                <MdStopScreenShare size={20} onClick={shareScreen} />
              ) : (
                <MdScreenShare size={20} onClick={shareScreen} />
              )}
            </div>
            <div className="text-[12px]">Share</div>
          </div>
          <div>
            <Button className="bg-[#df2727]">
              <div className="flex gap-2 items-center ">
                <div>
                  <BiSolidPhoneOff color="#fff" size={20} />
                </div>
                <span className="text-[#fff] font-bold">Rời đi</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex layout_room_video">
        <div className="flex-1">
          <ListUserRoom peers={peers} peerId={peerId} />
        </div>
        {match(seletedOption)
          .with("people", () => (
            <LayoutSideBar
              title="Mọi người"
              onClick={() => handleSelectedDisableSidebar("disablePeople")}>
              <ListPeopleRoom listUser={listUser} peerId={peerId} />
            </LayoutSideBar>
          ))
          .with("chat", () => (
            <LayoutSideBar
              title="Tin nhắn trong cuộc họp"
              onClick={() => handleSelectedDisableSidebar("disableChat")}>
              <ChatRoomCourse />
            </LayoutSideBar>
          ))
          .otherwise(() => (
            <></>
          ))}
      </div>
      {contextHolder}
    </div>
  );
}

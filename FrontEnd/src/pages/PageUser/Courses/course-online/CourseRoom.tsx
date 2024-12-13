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
import { Button, Dropdown, MenuProps, Spin, notification } from "antd";
import Peer from "peerjs";

import { MdMicOff } from "react-icons/md";
import ChatRoomCourse from "./components/ChatRoom/ChatRoomCourse";
import { MdOutlinePeopleAlt } from "react-icons/md";

import { match } from "ts-pattern";
import LayoutSideBar from "./components/LayoutSideBar";
import { PiRecordFill } from "react-icons/pi";
import { getProfileFromLS } from "../../../../utils/localStorageHandler";
import { HiDotsHorizontal } from "react-icons/hi";
import { profileStoreAtom } from "../../../../packages/store/permission-store";
import { useAtomValue, useSetAtom } from "jotai";
import { mergeDataRoom } from "./components/useHandleRoom";
import { randowStoreAtom } from "../../../../packages/store/random-store";
import { useConfigAPI } from "../../../../packages/api/config-api";
import { showErrorAtom } from "../../../../packages/ui/Error/error-store";
import { BiBadgeCheck } from "react-icons/bi";
import { ModalApprove } from "./components/ModalApprove/ModalApprove";
import ListPeopleRoom from "./components/ListPeopleRoom/list-people-room";
import ListUserRoom from "./components/list-user-room";

interface IMessage {
  userId: string;
  message: string;
  timestamp: number;
}

export const deleteKeyFromObject = (obj: any, key: any) => {
  delete obj[key];
  return obj;
};

export default function CourseRoom() {
  const { idCourse, createby } = useParams();
  const [approved, setApproved] = useState(false);

  const [status, setStatus] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const modalApproveRef = useRef<any>(null);

  const nav = useNavigate();
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicroPhoneOn, setIsMicrophoneOn] = useState(true);
  const [seletedOption, setSeletedOption] = useState<string>("");
  const [listUser, setListUser] = useState([]);
  const [dataRequestApproval, setDataRequestApproval] = useState<any>([]);
  const [stream, setStream] = useState<MediaStream>();
  const [peerId, setPeerId] = useState<string>("");
  const peerRef = useRef<Peer | any>(null);
  const [peers, setPeers] = useState<any>({});
  const [screenSharingId, setScreenSharingId] = useState<string>("");
  const profileUser = getProfileFromLS();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isToggleShareScreen, setIsToggleShareScreen] = useState(true);
  const [meStream, setMeStream] = useState<MediaStream>();
  const [toggleImgMe, setToggleImgMe] = useState<any>(false);

  const setShowError = useSetAtom(showErrorAtom);
  const [list_user_PeerId, setListUserPeerId] = useState<any>([]);

  // const userID = nanoid();
  useEffect(() => {
    ws.emit("join-room", {
      // roomId: "20241405COURSEONLINE",
      roomId: idCourse,
      peerId: "",
      userId: profileUser?.id,
      dataUser: profileUser,
      Approved:
        createby === profileUser?.id && profileUser?.role === "1"
          ? true
          : false,
    });
    if (createby === profileUser?.id && profileUser?.role === "1") {
      setApproved(true);
      setStatus("Approved");
      ws.on("get-list-user-approval", (data: any) => {
        setDataRequestApproval(data);
      });
      const getMediaStream = () => {
        return navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      };
      getMediaStream().then((initialStream) => {
        setMeStream(initialStream);
      });
    } else {
      ws.emit("request-approval", {
        roomId: idCourse,
        peerId: "",
        userId: profileUser?.id,
        dataUser: profileUser,
        Approved: false,
      });
      setStatus("Pending");
    }
    ws.on("approved-user", (data) => {
      if (data.includes(profileUser?.id)) {
        setApproved(true);
        setStatus("Approved");
      } else {
        setApproved(false);
      }
    });

    ws.on("list_users_rooms_online", (data: any) => {
      setListUser(data);
    });
    ws.on("request-reject-user", (data: any) => {
      if (data.includes(profileUser?.id)) {
        setStatus("Reject");
      }
      // openNotification(data, "join");
    });

    ws.on("list_user_peerId_rooms", (data: any) => {
      setListUserPeerId(data);
    });
    ws.on("user_leave_room", (data: any) => {
      openNotification(data, "leave");
    });
    ws.on("update-kick-user-other", (data) => {
      setListUserPeerId(
        list_user_PeerId?.filter((item: any) => item.userId !== data.userID)
      );
      if (profileUser?.id === data.userID) {
        nav(`/course/detail/${idCourse}`);
      }
    });
    return () => {
      ws.on("user_leave_room", (data: any) => {
        openNotification(data, "leave");
      });
      ws.off("update-kick-user-other");
    };
  }, []);

  useEffect(() => {
    if (!approved) {
      return;
    }
    const peer = new Peer();
    peerRef.current = peer;
    peer.on("open", (id) => {
      setPeerId(id);
      ws.emit("join-room-approval", {
        roomId: idCourse,
        peerId: id,
        userId: profileUser?.id,
        dataUser: profileUser,
        Approved: true,
      });
    });

    const getMediaStream = () => {
      return navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
    };
    getMediaStream().then((initialStream) => {
      setStream(initialStream);
      setToggleImgMe(true);
      setMeStream(initialStream);
      peer.on("call", (call) => handleCall(call, initialStream));

      ws.on("user-joined-approved", ({ peerId, userId }) => {
        const call = peer.call(peerId, initialStream);
        handleCall(call, initialStream);
      });
    });
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
    ws.on("receive-message", (data: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      ws.off("user-joined");
      ws.off("join-room");
      ws.off("list_users_rooms_online", (data: any) => console.log(data));

      ws.off("receive-message");
      peer.destroy();
    };
  }, [approved]);

  const handleTogglePictureInPicture = () => {
    if (stream && isCameraOn) {
      stream.getTracks().forEach((track) => track.stop());
      setIsCameraOn(false);
      nav(-1);
      ws.emit("toggle-camera", {
        userID: profileUser?.id,
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
    ws.on("update-camera-status-other", (data: any) => {
      // clone peers để không ảnh hưởng đến peers chính

      if (data.userID === profileUser?.id && stream) {
        const tracks = stream.getVideoTracks();
        tracks[0].stop();
        setIsCameraOn(false);
        const updatePeer = cloneDeep(peers);
        if (updatePeer[data.peerId]) {
          updatePeer[data.peerId].isCameraOn = data.isCameraOn;
          setPeers(updatePeer);
        }
      }
    });
    ws.on("update-micro-status-other", (data: any) => {
      // clone peers để không ảnh hưởng đến peers chính

      if (data.userID === profileUser?.id && stream) {
        const tracks = stream.getVideoTracks();
        tracks[0].stop();
        setIsMicrophoneOn(false);
        const updatePeer = cloneDeep(peers);
        if (updatePeer[data.peerId]) {
          updatePeer[data.peerId].isMicroPhoneOn = data.isMicroPhoneOn;
          setPeers(updatePeer);
        }
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
    ws.on("turn-off-camera", (data) => {
      if (data.filter((item: any) => item.peerId === peerId)) {
        turnOffCamera();
      }
    });
    // tắt tất cả mic của users
    ws.on("turn-off-mic", (data) => {
      if (data.filter((item: any) => item.peerId === peerId)) {
        turnOffMic();
      }
    });

    return () => {
      ws.off("turn-off-mic");
      ws.off("turn-off-camera");
      ws.off("update-microphone-status");
      ws.off("update-camera-status");
    };
  }, [stream, peers]);

  const toggleCamera = useCallback(() => {
    if (meStream) {
      if (isCameraOn) {
        const tracks = meStream.getVideoTracks();
        tracks[0].stop();
        setToggleImgMe(false);
        setIsCameraOn(false);
      } else {
        setToggleImgMe(true);
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((newStream) => {
            setIsCameraOn(true);
            setToggleImgMe(true);
            setMeStream(newStream);
          });
      }
    }
    if (stream) {
      if (isCameraOn) {
        const tracks = stream.getVideoTracks();
        tracks[0].stop();
        setIsCameraOn(false);
        ws.emit("toggle-camera", {
          userID: profileUser?.id,
          peerId: peerId,
          isCameraOn: false,
        });
      } else {
        // logic để bật lại camera tạo ra 1 stream mới
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((newStream) => {
            ws.emit("toggle-camera", {
              userID: profileUser?.id,
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
  }, [isCameraOn, stream, peerId, meStream]);

  const toggleMicrophone = useCallback(() => {
    if (meStream) {
      if (isMicroPhoneOn) {
        const tracks = meStream.getAudioTracks();
        tracks[0].stop();
        setIsMicrophoneOn(false);
      } else {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((newStream) => {
            setIsMicrophoneOn(true);
            setMeStream(newStream);
          });
      }
    }
    if (stream) {
      if (isMicroPhoneOn) {
        const tracks = stream.getAudioTracks();
        tracks[0].stop();
        setIsMicrophoneOn(false);
        ws.emit("toggle-microphone", {
          userID: profileUser?.id,
          peerId: peerId,
          isMicroPhoneOn: false,
        });
      } else {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((newStream) => {
            ws.emit("toggle-microphone", {
              userID: profileUser?.id,
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
  }, [isMicroPhoneOn, stream, peerId, meStream]);

  const turnOffCamera = () => {
    if (stream) {
      const tracks = stream.getVideoTracks();
      tracks[0].stop();
      setIsCameraOn(false);
      ws.emit("toggle-camera", {
        userID: profileUser?.id,
        peerId: peerId,
        isCameraOn: false,
      });
    }
  };
  const turnOffMic = () => {
    if (stream) {
      const tracks = stream.getAudioTracks();
      tracks[0].stop();
      setIsMicrophoneOn(false);
      ws.emit("toggle-microphone", {
        userID: profileUser?.id,
        peerId: peerId,
        isMicroPhoneOn: false,
      });
    }
  };
  const onTurnOffMicUser = (data: any) => {
    ws.emit("toggle-micro-other", {
      userID: data?.userId,
      peerId: data.peerId,
      isMicroPhoneOn: false,
      roomId: data.roomId,
    });
    const updatePeer = cloneDeep(peers);
    // tìm peerID cần update trạng thái audio
    if (updatePeer[data.peerId]) {
      // nếu tìm thấy thì cập nhật trạng thái audio cho peers đó
      updatePeer[data.peerId].isMicroPhoneOn = false;
      // set lại giá trị peers để cập nhật trạng thái đúng nhất
      setPeers(updatePeer);
    }
  };
  const onTurnOffCameraUserOther = (data: any) => {
    ws.emit("toggle-camera-other", {
      userID: data?.userId,
      peerId: data.peerId,
      isCameraOn: false,
      roomId: data.roomId,
    });
    const updatePeer = cloneDeep(peers);
    // tìm peerID cần update trạng thái audio
    if (updatePeer[data.peerId]) {
      // nếu tìm thấy thì cập nhật trạng thái audio cho peers đó
      updatePeer[data.peerId].isCameraOn = false;
      // set lại giá trị peers để cập nhật trạng thái đúng nhất
      setPeers(updatePeer);
    }
  };
  const onTurnKickUserOther = (data: any) => {
    ws.emit("kick-user-other", {
      userID: data?.userId,
      peerId: data.peerId,
      roomId: data.roomId,
    });
  };

  const switchStream = (stream: MediaStream) => {
    setScreenSharingId(peerRef.current?.id || "");
    console.log(298, peerRef.current?.connections);
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
        .then((stream) => {
          switchStream(stream);
          // setScreenStream(stream);
          setStream(stream);
        });
      setIsToggleShareScreen(false);
    } else {
      setIsToggleShareScreen(true);
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

  // tắt tất cả camera của user trong nhóm (chỉ người nào có quyền thì mới được dùng)
  const turnOffAllCameras = useCallback(() => {
    ws.emit("turn-off-all-cameras", listUser);
  }, [listUser]);
  const turnOffAllMic = useCallback(() => {
    ws.emit("turn-off-all-mic", listUser);
  }, [listUser]);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div>Tắt toàn bộ camera</div>,
      onClick: turnOffAllCameras,
    },
    {
      key: "2",
      label: <div>Tắt toàn bộ mic</div>,
      onClick: turnOffAllMic,
    },
  ];
  const [input, setInput] = useState("");

  const sendMessage = useCallback(
    ({ userID }: any) => {
      if (input.trim() === "") {
        alert("Message cannot be empty!");
        return;
      }
      const newMessage: IMessage = {
        userId: userID,
        message: input,
        timestamp: Date.now(),
      };
      console.log(368, userID);
      ws.emit("send-message", newMessage); // Gửi message lên server
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Thêm vào danh sách cục bộ
      setInput("");
    },
    [messages, input]
  );

  const handleApproval = () => {
    modalApproveRef.current.setOpenModal(dataRequestApproval);
  };
  console.log(
    "mergeDataRoom",
    mergeDataRoom(
      list_user_PeerId,
      Object.values(deleteKeyFromObject(peers, peerId))
    )
  );

  return (
    <div>
      {/* <Spin spinning={spinning} fullscreen /> */}
      {match(status)
        .with("Approved", () => {
          return (
            <>
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
                      onClick={() =>
                        handleSelectedDisableSidebar("disableChat")
                      }>
                      <div className="m-auto">
                        <PiRecordFill size={20} />
                      </div>
                      <div className="text-[12px]">Record</div>
                    </div>
                    {seletedOption === "chat" ? (
                      <div
                        className="cursor-pointer flex flex-col"
                        onClick={() =>
                          handleSelectedDisableSidebar("disableChat")
                        }>
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
                        onClick={() =>
                          handleSelectedDisableSidebar("disablePeople")
                        }>
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
                    <>
                      {profileUser?.role === "1" && (
                        <>
                          <div
                            className="cursor-pointer flex flex-col"
                            onClick={() => handleApproval()}>
                            <div className="m-auto">
                              <BiBadgeCheck size={20} />
                            </div>
                            <div className="text-[12px]">Duyệt</div>
                          </div>
                          <Dropdown
                            menu={{ items }}
                            align={{
                              offset: [-100, 10],
                            }}>
                            <div className="cursor-pointer flex flex-col">
                              <div className="m-auto">
                                <HiDotsHorizontal size={20} />
                              </div>
                              <div className="text-[12px]">More</div>
                            </div>
                          </Dropdown>
                        </>
                      )}
                    </>
                  </div>
                  <div
                    className="cursor-pointer flex flex-col"
                    onClick={toggleCamera}>
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
                      {!isMicroPhoneOn ? (
                        <MdMicOff size={20} />
                      ) : (
                        <IoMdMic size={20} />
                      )}
                    </div>
                    <div className="text-[12px]">Mic</div>
                  </div>
                  {/* <button onClick={turnOffAllCameras}>turnOffAllCameras</button> */}
                  <div
                    className="cursor-pointer flex flex-col"
                    onClick={shareScreen}>
                    <div className="m-auto">
                      {!isToggleShareScreen ? (
                        <MdStopScreenShare size={20} />
                      ) : (
                        <MdScreenShare size={20} />
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
                  <ListUserRoom
                    onTurnOffMicUser={onTurnOffMicUser}
                    onTurnOffCameraUserOther={onTurnOffCameraUserOther}
                    onTurnKickUserOther={onTurnKickUserOther}
                    peers={peers}
                    toggleImgMe={toggleImgMe}
                    peerId={peerId}
                    isOwner={
                      createby === profileUser?.id && profileUser?.role === "1"
                    }
                    listUser={mergeDataRoom(
                      list_user_PeerId,
                      Object.values(deleteKeyFromObject(peers, peerId))
                    )}
                    mestream={meStream}
                  />
                </div>
                {match(seletedOption)
                  .with("people", () => (
                    <LayoutSideBar
                      title="Mọi người"
                      onClick={() =>
                        handleSelectedDisableSidebar("disablePeople")
                      }>
                      <ListPeopleRoom
                        listUser={listUser}
                        profileUser={profileUser}
                        userID={profileUser?.id as string}
                      />
                    </LayoutSideBar>
                  ))
                  .with("chat", () => (
                    <LayoutSideBar
                      title="Tin nhắn trong cuộc họp"
                      onClick={() =>
                        handleSelectedDisableSidebar("disableChat")
                      }>
                      <ChatRoomCourse
                        // roomId="20241405COURSEONLINE"
                        roomId={idCourse as string}
                        messages={messages}
                        sendMessage={sendMessage}
                        setInput={setInput}
                        input={input}
                        userID={profileUser?.id as string}
                      />
                    </LayoutSideBar>
                  ))
                  .otherwise(() => (
                    <></>
                  ))}
              </div>
              {contextHolder}
              <ModalApprove
                ref={modalApproveRef}
                dataRequestApproval={dataRequestApproval}
              />
            </>
          );
        })
        .with("Reject", () => {
          return (
            <>
              <div className="flex justify-center items-center h-[100vh]">
                Giáo viên từ chối tham gia cuộc gọi từ bạn!
              </div>
            </>
          );
        })
        .with("Pending", () => {
          return (
            <>
              <div className="flex justify-center items-center h-[100vh]">
                Vui lòng đợi qua kết quả duyệt của giáo viên!
              </div>
            </>
          );
        })
        .otherwise(() => {
          return <></>;
        })}
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";

import { CardLayout } from "../../../../packages/ui/CardLayout/card-layout";
import { useNavigate } from "react-router-dom";
import RoomLayout from "../../../../packages/layouts/room-layout/room-layout";
import { useWindowSize } from "../../../../packages/hooks/useWindowSize";
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Input,
  Layout,
  Select,
  Space,
} from "antd";
import { BellFilled, PhoneOutlined } from "@ant-design/icons";
import { PopupCall } from "./popup-call/popup-call";

export default function CourseOnline() {
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  const [room, setRoom] = useState("");
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const { Header, Content } = Layout;
  const { Option } = Select;
  const popupCallRef = useRef<any>(null);
  const videoRef = useRef<any>(null);

  const handleSubmitForm = useCallback(
    (e: any) => {
      e.preventDefault();

      // socket.emit("room:join", { email, room });
    },
    [email, room]
  );

  const handleJoinRoom = useCallback(
    (data: any) => {
      const { email, room } = data;
      navigate(`/admin/Course_online/room/${room}`);
    },
    [navigate]
  );

  // useEffect(() => {
  //   socket.on("room:join", handleJoinRoom);
  //   return () => {
  //     socket.off("room:join", handleJoinRoom);
  //   };
  // }, [socket, handleJoinRoom]);
  const handleTogglePictureInPicture = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch((error) => {
        console.error("Error exiting Picture-in-Picture mode:", error);
      });
    } else if (
      videoRef.current &&
      videoRef.current !== document.pictureInPictureElement
    ) {
      videoRef.current.requestPictureInPicture().catch((error) => {
        console.error("Error entering Picture-in-Picture mode:", error);
      });
    }
  };

  return (
    <RoomLayout>
      <div className="flex">
        <div>
          <div
            style={{
              height: windowSize.height - 61,
            }}
            className="w-[350px] bg-slate-200"
          ></div>
        </div>
        <div>
          <Layout
            style={{
              width: windowSize.width - 350,
            }}
          >
            <Header
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "56px",
                backgroundColor: "#fff",
                lineHeight: "56px",
              }}
              className="box-shadow-header header-wrapper"
            >
              <Flex justify="">
                <Button
                  style={{
                    backgroundColor: "#714d4d",
                    color: "black",
                  }}
                  type="primary"
                  icon={<PhoneOutlined />}
                  onClick={() => console.log("A")}
                />
                <Select defaultValue="http://">
                  <Option value="http://">http://</Option>
                  <Option value="https://">https://</Option>
                </Select>
              </Flex>
              <Flex justify="">
                <Button
                  style={{
                    backgroundColor: "#714d4d",
                    color: "black",
                  }}
                  type="primary"
                  icon={<PhoneOutlined />}
                  onClick={() => popupCallRef.current.showPopup()}
                />
                <Select defaultValue="http://">
                  <Option value="http://">http://</Option>
                  <Option value="https://">https://</Option>
                </Select>
              </Flex>
            </Header>
            <Layout>
              <Layout className="Layout_content">
                <Content>
                  <div>
                    <video ref={videoRef} controls>
                      <source
                        src="https://www.w3schools.com/html/mov_bbb.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                    <button onClick={handleTogglePictureInPicture}>
                      {document.pictureInPictureElement
                        ? "Exit Picture-in-Picture"
                        : "Enter Picture-in-Picture"}
                    </button>
                  </div>
                  <div
                    style={{
                      width: "100%",
                    }}
                  >
                    <div>
                      <CardLayout>
                        <div>
                          <h1>Lobby</h1>
                          <form onSubmit={handleSubmitForm}>
                            <label htmlFor="email">Email ID</label>
                            <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <br />
                            <label htmlFor="room">Room Number</label>
                            <input
                              type="text"
                              id="room"
                              value={room}
                              onChange={(e) => setRoom(e.target.value)}
                            />
                            <br />
                            <button>Join</button>
                          </form>
                        </div>
                      </CardLayout>
                    </div>
                  </div>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </div>
      </div>
      <PopupCall ref={popupCallRef} />
    </RoomLayout>
  );
}

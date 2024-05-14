import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "../../../../packages/contexts/Socket";
import peer from "../../../../packages/hooks/peer";
import { useWindowSize } from "../../../../packages/hooks/useWindowSize";
import "./CourseRoom.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useHandlerRooms } from "./components/useHandleRoom";

export default function CourseRoom() {
  const socket = useSocket();
  const { id } = useParams();
  const { stream } = useHandlerRooms();

  useEffect(() => {
    if (stream) socket.emit("join-room", { roomId: id });
  }, [id, stream]);

  const windowSize = useWindowSize();
  const videoRef = useRef<any>(null);
  const nav = useNavigate();

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
    <div>
      <div className="h-[50px] bg-slate-500">
        <button onClick={handleTogglePictureInPicture}>
          {document.pictureInPictureElement
            ? "Exit Picture-in-Picture"
            : "Enter Picture-in-Picture"}
        </button>
      </div>
      <div className="flex layout_room_video">
        <div className="flex-1">
          <video ref={videoRef} controls className="h-full w-full">
            <source
              src="https://www.youtube.com/watch?v=iQBYrTjtBOE"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="bg-orange-200 w-[300px]">
          <div className="layout_chat"></div>
          <video ref={videoRef} controls className="h-[150px] w-full">
            <source
              src="https://www.youtube.com/watch?v=iQBYrTjtBOE"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

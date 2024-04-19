import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../../packages/contexts/Socket";
import AdminPageLayout from "../../../packages/layouts/admin-page-layout/admin-page-layout";
import { CardLayout } from "../../../packages/ui/CardLayout/card-layout";
import { useNavigate } from "react-router-dom";

export default function CourseOnline() {
  const socket = useSocket();
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e: any) => {
      e.preventDefault();

      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data: any) => {
      const { email, room } = data;
      navigate(`/admin/Course_online/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);
  return (
    <AdminPageLayout>
      <div className="px-4 pt-[14px] w-full">
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
    </AdminPageLayout>
  );
}

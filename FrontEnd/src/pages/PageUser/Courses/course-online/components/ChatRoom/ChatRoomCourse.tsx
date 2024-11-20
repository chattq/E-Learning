import React, { useState, useEffect, useRef, useCallback } from "react";
import "./style.scss";
import { nanoid } from "nanoid";

interface IMessage {
  userId: string;
  message: string;
  timestamp: number;
}

interface ChatRoomProps {
  messages: any; // Truyền userId qua props
  sendMessage: any; // Truyền userId qua props
  roomId: string; // Thêm roomId để tham gia đúng phòng
  setInput: any; // Thêm roomId để tham gia đúng phòng
  input: any; // Thêm roomId để tham gia đúng phòng
  userID: any; // Thêm roomId để tham gia đúng phòng
}

export default function ChatRoomCourse({
  messages,
  userID,
  sendMessage,
  setInput,
  input,
}: ChatRoomProps) {
  const messageEndRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage({ userID });
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  console.log(41, messages);
  console.log("userID", userID);
  return (
    <div className="chat-room-course">
      <div className="chat-room-messages">
        {messages.map((msg: any) => (
          <div
            key={nanoid()}
            className={`message ${
              msg.userId === userID ? "sent" : "received"
            }`}>
            <span className="user-id">{msg.userId}:</span>{" "}
            <span>{msg.message}</span>
            <div className="timestamp">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="chat-room-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./style.scss";
import { ws } from "../../../../../../socketIO";

interface IMessage {
  userId: string;
  message: string;
  timestamp: number;
}

export default function ChatRoomCourse() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ws.on("receive-message", (data: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      ws.off("receive-message");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const newMessage: IMessage = {
        userId: "yourUserId", // Thay bằng userId của bạn
        message: input,
        timestamp: Date.now(),
      };
      ws.emit("send-message", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-room-course">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <span className="user-id">{msg.userId}:</span>{" "}
            <span>{msg.message}</span>
            <div className="timestamp">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="input-container">
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

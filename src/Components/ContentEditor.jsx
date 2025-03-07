import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("https://socket-testing-backend.onrender.com/");

const ContentEditor = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    socket.emit("join-room", id);

    socket.on("update-content", (newContent) => {
      setContent(newContent);
    });

    return () => {
      socket.off("update-content");
    };
  }, [id]);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    socket.emit("update-content", { roomId: id, content: newContent });
  };

  return (
    <textarea
      value={content}
      onChange={handleChange}
      rows="10"
      cols="50"
      placeholder="Start typing..."
    />
  );
};

export default ContentEditor;

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("https://socket-testing-backend.onrender.com/", {
  autoConnect: false,
});

const ContentEditor = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const timeoutRef = useRef(null); 
  const isTypingRef = useRef(false); 

  useEffect(() => {
    if (!id) return;

    socket.connect();
    socket.emit("join-room", id);

    socket.on("update-content", (newContent) => {
      if (!isTypingRef.current) {
        setContent(newContent);
      }
    });

    return () => {
      socket.off("update-content");
      socket.disconnect();
    };
  }, [id]);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    isTypingRef.current = true;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      socket.emit("update-content", { roomId: id, content: newContent });
      isTypingRef.current = false;
    }, 300);
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

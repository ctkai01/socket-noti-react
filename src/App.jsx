// ChatComponent.jsx

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
// import { useSearchParams } from "react-router-dom";
const socket = io("http://localhost:3000"); // Replace with your WebSocket server URL
const a = 1
const b = 3;
const App = () => {
  const [messages, setMessages] = useState([])
  const urlParams = new URLSearchParams(window.location.search);
  // const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
// let [searchParams, setSearchParams] = useSearchParams();
console.log(messages);
  useEffect(() => {
    // Subscribe to the 'chat' event when component mounts
    socket.on("receive", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: message.text,
          from: message.from,
          to: message.to,
        },
      ]);
    });

    // Clean up event listener when component unmounts
    return () => {
      socket.off("chat");
    };
  }, []); // Empty dependency array to run only once

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      const a = socket.emit("chat", {
        text: inputMessage,
        from: urlParams.get("from"),
        to: urlParams.get("to"),
      }); // Emit 'chat' event with message
      console.log(a)
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: inputMessage,
          from: urlParams.get("from"),
          to: urlParams.get("from"),
        },
      ]);
      setInputMessage("");
    }
  };

  useEffect(() => {
    socket.emit("join", {
      userID: urlParams.get("from"),
    });
  }, [])
  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div style={{ 
            textAlign: message.from === urlParams.get("from") ? "right": "left"
          }} key={index}>{message.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default App;

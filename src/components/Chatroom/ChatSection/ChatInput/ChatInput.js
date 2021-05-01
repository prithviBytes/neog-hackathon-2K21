import { useState } from "react";

export default function ChatInput({ sendMessage }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(currentMessage);
    setCurrentMessage("");
  };
  return (
    <form className="chat-input-container" onSubmit={onSubmit}>
      <input
        className="chat-input"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      ></input>
      <button type="submit" className="chat-send-btn">
        Send
      </button>
    </form>
  );
}

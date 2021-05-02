import { useState } from "react";
import {AiOutlineSend} from "react-icons/ai"
import "./chatinput.css"
export default function ChatInput({ sendMessage }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(currentMessage);
    setCurrentMessage("");
  };
  return (
    <div className="chat-input-container">
      <form className="chat-input-form" onSubmit={onSubmit}>
        <div className="input-group">
          <input
            className="chat-input"
            value={currentMessage}
            placeholder="Send Message"
            onChange={(e) => setCurrentMessage(e.target.value)}
          ></input>
          <button type="submit" className="chat-send-btn">
            <AiOutlineSend className="input-group-icon" />
          </button>
        </div>
      </form>
    </div>
  );
}

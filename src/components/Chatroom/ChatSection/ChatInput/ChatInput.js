import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import Picker from "emoji-picker-react";
import "./chatinput.css";
export default function ChatInput({ sendMessage }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(currentMessage);
    setCurrentMessage("");
  };

  const onEmojiClick = (event, emojiObject) => {
    setCurrentMessage(currentMessage + emojiObject.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(function (state) {
      return !state;
    });
  };
  return (
    <div className="chat-input-container">
      <form className="chat-input-form" onSubmit={onSubmit}>
        <div className="input-group">
          <HiOutlineEmojiHappy
            className="emoji-button"
            onClick={toggleEmojiPicker}
          />
          <Picker
            onEmojiClick={onEmojiClick}
            pickerStyle={{
              display: showEmojiPicker ? "block" : "none",
              bottom: "6rem",
              position: "fixed",
              boxShadow: "none",
            }}
          />

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

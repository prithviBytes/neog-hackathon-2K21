import ChatInput from "./ChatInput/ChatInput";
import Chat from "./Chat/Chat";
import { BsFillPeopleFill } from "react-icons/bs";
import "./chatsection.css";
import { useEffect, useRef } from "react";
export default function ChatSection({ messages, sendMessage, members }) {
  // const currentUser = members[chatroomData.owner];
  const lastMessage = useRef();
  useEffect(() => {
    lastMessage.current && lastMessage.current.scrollIntoView();
  }, [messages]);

  return (
    <div className="Chat-container">
      <header className="Chat-header">
        <div>
          <h3 className="Chat-title">React-router-v6 sucks!</h3>
          <div className="Chat-header-button">
            <BsFillPeopleFill />
          </div>
        </div>
      </header>
      <div className="Messages-container">
        {Object.values(messages).map((message) => (
          <Chat message={message} members={members} key={message.id} />
        ))}
        <span ref={lastMessage}></span>
      </div>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}
{
  /* <ChatInput sendMessage={sendMessage} /> */
}
// {Object.values(messages).map((message) => (
//   <Chat text={message.text}></Chat>
// ))}

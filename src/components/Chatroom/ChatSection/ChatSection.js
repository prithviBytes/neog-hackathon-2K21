import ChatInput from "./ChatInput/ChatInput";
import Chat from "./Chat/Chat";
import { BsFillPeopleFill } from "react-icons/bs";
import "./chatsection.css";
export default function ChatSection({chatRoomData, messages, sendMessage, members }) {
  return (
    <div className="Chat-container">
      <header className="Chat-header">
        <div>
          <h3 className="Chat-title">{chatRoomData.title}</h3>
          <div className="Chat-header-button">
            <BsFillPeopleFill />
          </div>
        </div>
      </header>
      <div className="Messages-container">
        {Object.values(messages).map((message) => (
          <Chat message={message} members={members} />
        ))}
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

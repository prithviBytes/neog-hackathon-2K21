import ChatInput from "./ChatInput/ChatInput";
import Chat from "./Chat/Chat";
import { BsFillPeopleFill } from "react-icons/bs";
import "./chatsection.css";
import { useEffect, useRef, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
export default function ChatSection({
  messages,
  sendMessage,
  members,
  chatRoomData,
  toggleParticipantPanel,
}) {
  const lastMessage = useRef();
  useEffect(() => {
    lastMessage.current && lastMessage.current.scrollIntoView();
  }, [messages]);
  const { currentUser } = useContext(UserContext);
  const currentUserRole =
    members[currentUser.uid] && members[currentUser.uid].role;
  return (
    <div className="Chat-container">
      <header className="Chat-header">
        <div>
          <h3 className="Chat-title">{chatRoomData.title}</h3>
          <div className="Chat-header-button" onClick={toggleParticipantPanel}>
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
      {currentUserRole !== "AUDIANCE" && (
        <ChatInput sendMessage={sendMessage} />
      )}
    </div>
  );
}
{
  /* <ChatInput sendMessage={sendMessage} /> */
}
// {Object.values(messages).map((message) => (
//   <Chat text={message.text}></Chat>
// ))}

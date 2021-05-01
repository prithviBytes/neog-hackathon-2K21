import ChatInput from "./ChatInput/ChatInput";
import Chat from "./Chat/Chat";

export default function ChatSection({ messages, sendMessage }) {
  console.log("render", messages);

  return (
    <div className="chat-section">
      <h2>Messages</h2>
      {Object.values(messages).map((message) => (
        <Chat text={message.text}></Chat>
      ))}
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}

import moment from "moment";
import "./chat.css";
import Avatar from "../../../Avatar/Avatar";
export default function Chat({ message, members }) {
  if (Object.keys(members).length === 0 && members.constructor === Object) {
    return null;
  }
  const messageOwner = members[message.from];
  return (
    <div className="Message-container">
      <Avatar username={messageOwner.name} imgURL={undefined} />
      <div className="Message-content">
        <span className="Message-header">
          <span className="username">{messageOwner.name}</span>
          <span className="timestamp">
            {moment(message.timestamp).fromNow()}
          </span>
        </span>
        <p className="Message-text">{message.text}</p>
      </div>
    </div>
  );
}

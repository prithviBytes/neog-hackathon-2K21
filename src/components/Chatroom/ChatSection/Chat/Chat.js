import moment  from "moment"
import "./chat.css"
import Avatar from '../../../Avatar/Avatar'
import {userColors} from "../../../../constants"
export default function Chat({ message, members }) {
  if((Object.keys(members).length === 0 && members.constructor === Object)){
    return null
  }
  const messageOwner = members[message.from];
  let textColor = "";
  if(messageOwner.role === "OWNER"){
    textColor = userColors.owner
  }else if(messageOwner.role === "PARTICIPANT"){
    textColor = userColors.participants
  }else{
    textColor = userColors.others
  }
  return (
    <div className="Message-container">
      <Avatar username={messageOwner.name} imageURL={messageOwner.imageURL} avatarColor={messageOwner.avatarColor}/>
      <div className="Message-content">
        <span className="Message-header">
          <span style={{color: textColor}} className="username">{messageOwner.name}</span>
          <span className="timestamp">{moment(message.timestamp).fromNow()}</span>
        </span>
        <p className="Message-text">{message.text}</p>
      </div>
    </div>
  )
}

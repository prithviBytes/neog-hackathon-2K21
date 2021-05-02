import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./chatroom-card.css";
import Avatar from "../Avatar/Avatar";
import { AiFillWechat } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import fb, { db } from "../../firebase";

export default function ChatroomCard({ chatroom }) {
  const [owner, setOwner] = useState({});
  const [participants, setParticipants] = useState([]);
  const [messageCount, setMessageCount] = useState(1);
  const [participantCount, setParticipantCount] = useState(1);
  useEffect(() => {
    db.collection("chatrooms")
      .doc(chatroom.chatroomId)
      .collection("members")
      .where("role", "in", ["OWNER", "PARTICIPANT"])
      .get()
      .then((querySnapshot) => {
        const members = [];
        console.log(querySnapshot.size);
        querySnapshot.forEach((doc) => {
          const member = doc.data();
          if (member.role === "OWNER") {
            setOwner(member);
          } else {
            members.push(member);
          }
        });
        setParticipants(members);
        setParticipantCount(querySnapshot.size);
      });
    db.collection("chatrooms")
      .doc(chatroom.chatroomId)
      .collection("messages")
      .get()
      .then((querySnapshot) => {
        setMessageCount(querySnapshot.size);
      });
  }, []);
  console.log(owner);
  return (
    <Link to={`/chatroom/${chatroom.chatroomId}`} className="chatroom-card">
      <h3 className="chatroom-card-title">{chatroom.title}</h3>
      <div className="avatar-collection">
        {owner.name && (
          <Avatar
            username={owner.name}
            imageURL={owner.imageURL}
            avatarColor={owner.avatarColor}
            key={owner.uid}
          />
        )}
        {participants.map((participant) => {
          return (
            <Avatar
              username={participant.name}
              imageURL={participant.imageURL}
              avatarColor={participant.avatarColor}
              key={participant.uid}
            />
          );
        })}
      </div>
      <p className="chatroom-card-desc">
        {chatroom.description}
      </p>
      <div className="stats">
        <div className="stat-container">
          <span className="stat-count">{messageCount}</span>
          <AiFillWechat className="stat-icon" />
        </div>
        <div className="stat-container">
          <span className="stat-count">{participantCount} </span>
          <IoIosPeople className='stat-icon' />
        </div>
      </div>
      <p>- {owner.name}</p>
    </Link>
  );
}

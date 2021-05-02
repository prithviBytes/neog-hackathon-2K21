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
      .limit(6)
      .get()
      .then((querySnapshot) => {
        const members = [];
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
      <h3>{chatroom.title}</h3>
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
      <div>
        {messageCount} <AiFillWechat />
        {participantCount} <IoIosPeople />
      </div>
      <p>- {owner.name}</p>
    </Link>
  );
}

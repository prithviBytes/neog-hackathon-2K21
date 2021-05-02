import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ChatSection from "./ChatSection/ChatSection";
import ChatParticipants from "./ChatParticipants/ChatParticipants";
import {UserContext} from "../../context/UserContext"

import { db } from "../../firebase";

import "./chatroom.css";

export default function Chatroom() {
  const { id } = useParams();
  const {currentUser} = useContext(UserContext)

  const [messages, setMessages] = useState({});
  const [members, setMembers] = useState({});
  const [chatRoomData, setChatRoomData] = useState({});

  useEffect(() => {
    getChatRoomData();
    let chatRoomMessagesSnaphot = subscribeToChatRoomMessages();
    subscribeToChatRoomMembers();

    return () => {
      chatRoomMessagesSnaphot();
    };
  }, []);

  const sendMessage = (message) => {
    db.collection("chatrooms").doc(id).collection("messages").add({
      from: currentUser.uid,
      text: message,
      timestamp: new Date().valueOf(),
    });
  };

  const getChatRoomData = async () => {
    const chatRoomSnaphot = await db.collection("chatrooms").doc(id).get();

    setChatRoomData(chatRoomSnaphot.data());
  };

  const subscribeToChatRoomMessages = () => {
    const chatRoomMessagesSnaphot = db
      .collection("chatrooms")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        const messagesFromServer = {};
        snapshot.forEach((doc) => {
          messagesFromServer[doc.id] = doc.data();
        });
        setMessages(messagesFromServer);
      });

    return chatRoomMessagesSnaphot;
  };

  const subscribeToChatRoomMembers = () => {
    const chatRoomMemberSnaphot = db
      .collection("chatrooms")
      .doc(id)
      .collection("members")
      .onSnapshot((snapshot) => {
        const membersFromServer = {};
        snapshot.forEach((doc) => {
          membersFromServer[doc.id] = doc.data();
        });
        setMembers(membersFromServer);
      });

    return chatRoomMemberSnaphot;
  };

  return (
    <div className="chatroom">
      {
        (Object.keys(members).length === 0 && members.constructor === Object) ?
        (
          <></>
        ):(
          <>
          <ChatSection members={members} messages={messages} sendMessage={sendMessage} />
          <ChatParticipants members={members} />
          </>
        )
      }
    </div>
  );
}

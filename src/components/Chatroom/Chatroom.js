import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ChatSection from "./ChatSection/ChatSection";
import ChatParticipants from "./ChatParticipants/ChatParticipants";

import { db } from "../../firebase";

import "./chatroom.css";

export default function Chatroom() {
  const { id } = useParams();

  const [messages, setMessages] = useState({});
  const [members, setMembers] = useState({});
  const [chatRoomData, setChatRoomData] = useState({});

  console.log(messages);

  useEffect(() => {
    getChatRoomData();
    let chatRoomMessagesSnaphot = subscribeToChatRoomMessages();
    subscribeToChatRoomMembers();

    return () => {
      console.log("unsubscribe");
      chatRoomMessagesSnaphot();
    };
  }, []);

  const sendMessage = (message) => {
    db.collection("chatrooms").doc(id).collection("messages").add({
      from: "1",
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
        console.log({ messagesFromServer });
        setMessages(messagesFromServer);
      });

    return chatRoomMessagesSnaphot;
  };

  const subscribeToChatRoomMembers = async () => {
    const members = {};
    const chatRoomMemberSnaphot = db
      .collection("chatrooms")
      .doc(id)
      .collection("members")
      .orderBy("name")
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          members[doc.id] = doc.data();
        });
        setMembers(members);
      });

    return chatRoomMemberSnaphot;
  };

  return (
    <div className="chatroom">
      <ChatSection messages={messages} sendMessage={sendMessage} />
      <ChatParticipants members={members} />
    </div>
  );
}

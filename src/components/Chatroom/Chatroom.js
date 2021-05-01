import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ChatSection from "../ChatSection/ChatSection";

import fb, { db } from "../../firebase";

export default function Chatroom() {
  const { id } = useParams();

  const [messages, setMessages] = useState([]);

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

  const getChatRoomData = async () => {
    const chatRoomSnaphot = await db.collection("chatrooms").doc(id).get();

    console.log("details", chatRoomSnaphot.data());
  };

  const subscribeToChatRoomMessages = () => {
    const messages = [];
    const chatRoomMessagesSnaphot = db
      .collection("chatrooms")
      .doc(id)
      .collection("messages")
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          messages.push(doc.data());
        });
        console.log("here");
        setMessages(messages);
      });

    return chatRoomMessagesSnaphot;
  };

  const subscribeToChatRoomMembers = async () => {
    const members = [];
    const chatRoomMemberSnaphot = db
      .collection("chatrooms")
      .doc(id)
      .collection("members")
      .orderBy("name")
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          members.push(doc.data());
        });
      });

    return chatRoomMemberSnaphot;
  };

  return (
    <>
      <h2>Chatroom {id}</h2>
      <ChatSection messages={messages} />
    </>
  );
}

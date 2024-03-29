import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ChatSection from "./ChatSection/ChatSection";
import ChatParticipants from "./ChatParticipants/ChatParticipants";
import { UserContext } from "../../context/UserContext";

import { db } from "../../firebase";

import "./chatroom.css";

export default function Chatroom() {
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);

  const [showChatParticipantsPanel, setShowParticipantsPanel] = useState(
    screen.width > 768 ? true : false
  );
  const [messages, setMessages] = useState({});
  const [members, setMembers] = useState({});
  const [chatRoomData, setChatRoomData] = useState({});

  useEffect(() => {
    getChatRoomData();
    let chatRoomMessagesSnaphot = subscribeToChatRoomMessages();
    subscribeToChatRoomMembers();

    // return () => {
    //   console.log("unsubscribe");
    //   chatRoomMessagesSnaphot();
    // };
  }, []);

  const toggleParticipantPanel = () => {
    setShowParticipantsPanel(function (state) {
      return !state;
    });
  };

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
          messagesFromServer[doc.id]["id"] = doc.id;
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
          membersFromServer[doc.id]["id"] = doc.id;
        });
        setMembers(membersFromServer);
      });

    return chatRoomMemberSnaphot;
  };

  return (
    <div className="chatroom">
      {Object.keys(members).length === 0 && members.constructor === Object ? (
        <></>
      ) : (
        <>
          <ChatSection
            chatRoomData={chatRoomData}
            members={members}
            messages={messages}
            sendMessage={sendMessage}
            toggleParticipantPanel={toggleParticipantPanel}
          />
          <ChatParticipants
            members={members}
            chatroomId={id}
            showChatParticipantsPanel={showChatParticipantsPanel}
            chatRoomData={chatRoomData}
          />
        </>
      )}
    </div>
  );
}

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import fb, { db } from "../../firebase";
import ChatroomCard from "../ChatroomCard/ChatroomCard";
import "./home.css";

export default function Home() {
  const [userChatrooms, setUserChatrooms] = useState([]);
  const [otherChatrooms, setOtherChatrooms] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    currentUser &&
      currentUser.uid &&
      db
        .collection("users")
        .doc(currentUser.uid)
        .get()
        .then((querySnapshot) => {
          const chatrooms =
            querySnapshot.data() && querySnapshot.data().chatrooms;
          chatrooms &&
            chatrooms.length > 0 &&
            db
              .collection("chatrooms")
              .where(fb.firestore.FieldPath.documentId(), "in", chatrooms)
              .get()
              .then((querySnapshot) => {
                const chatroomsFromServer = [];
                querySnapshot.forEach((doc) => {
                  chatroomsFromServer.push({
                    ...doc.data(),
                    chatroomId: doc.id,
                  });
                });
                setUserChatrooms(chatroomsFromServer);
              });
          if (chatrooms && chatrooms.length > 0) {
            db.collection("chatrooms")
              .where(fb.firestore.FieldPath.documentId(), "not-in", chatrooms)
              .get()
              .then((querySnapshot) => {
                const chatroomsFromServer = [];
                querySnapshot.forEach((doc) => {
                  chatroomsFromServer.push({
                    ...doc.data(),
                    chatroomId: doc.id,
                  });
                });
                setOtherChatrooms(chatroomsFromServer);
              });
          } else {
            db.collection("chatrooms")
              .get()
              .then((querySnapshot) => {
                const chatroomsFromServer = [];
                querySnapshot.forEach((doc) => {
                  chatroomsFromServer.push({
                    ...doc.data(),
                    chatroomId: doc.id,
                  });
                });
                setOtherChatrooms(chatroomsFromServer);
              });
          }
        });
  }, [currentUser]);

  return (
    <div className="home">
      <h3 className="chatroom-subtitle">Your Collections</h3>
      <div className="card-collection-container">
        {userChatrooms.map((chatroom) => {
          return <ChatroomCard chatroom={chatroom} key={chatroom.chatroomId} />;
        })}
      </div>
      <h3 className="chatroom-subtitle">Explore</h3>
      <div className="card-collection-container">
        {otherChatrooms.map((chatroom) => {
          return <ChatroomCard chatroom={chatroom} key={chatroom.chatroomId} />;
        })}
      </div>
    </div>
  );
}

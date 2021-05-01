import Navbar from "../components/Navbar/Navbar";
import ChatroomForm from "../components/ChatroomForm/ChatroomForm";
import Chatroom from "../components/Chatroom/Chatroom";
import { Routes, Route } from "react-router-dom";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <div className="content">
        <Route path="/chatroom/new" element={<ChatroomForm />} />
        <Route path="/chatroom/:id" element={<Chatroom />} />
      </div>
    </>
  );
}

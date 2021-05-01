import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ChatroomForm from "./components/ChatroomForm/ChatroomForm";
import Chatroom from "./components/Chatroom/Chatroom";
import Auth from "./components/Auth/Auth";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/chatroom/new" element={<ChatroomForm />} />
          <Route path="/chatroom/:id" element={<Chatroom />} />
        </Routes>
      </div>
    </div>
  );
}
